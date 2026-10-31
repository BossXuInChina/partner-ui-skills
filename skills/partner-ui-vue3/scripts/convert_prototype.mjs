#!/usr/bin/env node
/** Static, deliberately non-runnable migration skeletons; never evaluates input HTML/JS. */
import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import {
  basename,
  dirname,
  isAbsolute,
  relative,
  resolve,
  sep,
} from "node:path";
import { fileURLToPath } from "node:url";
import { requireProjectTool } from "./tooling.mjs";

const ownFile = fileURLToPath(import.meta.url);
const packageNames = ["@workbench/ui-vue3", "huawei-partner-ai-ui"];
const fail = (message) => {
  throw new Error(message);
};
const propertyName = (ts, node) =>
  node &&
  (ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : undefined);
const unwrap = (ts, node) => {
  while (
    node &&
    (ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isNonNullExpression(node))
  )
    node = node.expression;
  return node;
};
function visitAll(ts, node, callback) {
  callback(node);
  ts.forEachChild(node, (child) => visitAll(ts, child, callback));
}
function editsTo(source, edits, start = 0, end = source.length) {
  const chosen = edits
    .filter((edit) => edit.start >= start && edit.end <= end)
    .sort((a, b) => a.start - b.start || b.end - a.end);
  let cursor = start,
    output = "";
  for (const edit of chosen) {
    if (edit.start < cursor) continue; // A removed declaration owns its nested edits.
    output += source.slice(cursor, edit.start) + edit.text;
    cursor = edit.end;
  }
  return output + source.slice(cursor, end);
}
function anchor(path) {
  if (/createChatSession|mockAgreementAdapter|mockStream/.test(path))
    return "chat";
  if (/chatRenderers|BubbleRenderers/.test(path)) return "renderers";
  if (/overlays/.test(path)) return "feedback";
  if (/welcomeIcon|navigate|openAgreement/.test(path)) return "navigation";
  if (/restyle/.test(path)) return "restyle";
  return "mount";
}
function parseHtml(html, parse) {
  const prefix = "<template>";
  const result = parse(prefix + html + "</template>", {
    filename: "prototype-input.vue",
  });
  if (result.errors.length)
    fail(
      "HTML_PARSE: " +
        result.errors.map((error) => error.message ?? error).join("; "),
    );
  const elements = [];
  const walk = (node) => {
    if (node.type === 1) elements.push(node);
    for (const child of node.children ?? []) walk(child);
  };
  walk(result.descriptor.template.ast);
  return { elements, offset: prefix.length };
}
const attribute = (node, name) =>
  node.props.find((prop) => prop.type === 6 && prop.name === name)?.value
    ?.content;
const innerText = (node) =>
  node.children.map((child) => child.content ?? "").join("");

/** Enumerate value exports from the installed public declaration entries, never runtime JS. */
export function loadPublicExports({ project = process.cwd(), lockFile } = {}) {
  const ts = requireProjectTool("typescript", project);
  const candidates = [
    resolve(dirname(ownFile), "../source.lock.json"),
    resolve(dirname(ownFile), "../../../source.lock.json"),
  ];
  const lockPath = lockFile ? resolve(lockFile) : candidates.find(existsSync);
  if (!lockPath)
    fail(
      "SOURCE_LOCK_REQUIRED: use the self-contained Skill with source.lock.json",
    );
  const lock = JSON.parse(readFileSync(lockPath, "utf8"));
  const options = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
    noEmit: true,
    types: [],
  };
  const from = resolve(project, "__prototype_public_types__.ts");
  const entries = {};
  const packages = [];
  for (const name of [...packageNames, "vue"]) {
    const entry = ts.resolveModuleName(name, from, options, ts.sys)
      .resolvedModule?.resolvedFileName;
    if (!entry || !/\.d\.[cm]?ts$/.test(entry))
      fail("PUBLIC_TYPES_REQUIRED: install the locked package " + name);
    entries[name] = entry;
    if (name === "vue") continue;
    let folder = dirname(entry);
    while (
      !existsSync(resolve(folder, "package.json")) &&
      dirname(folder) !== folder
    )
      folder = dirname(folder);
    const manifest = JSON.parse(
      readFileSync(resolve(folder, "package.json"), "utf8"),
    );
    const expected = lock.packages?.find((item) => item.name === name);
    const releasePath = manifest.exports?.["./release.json"];
    if (
      !expected ||
      manifest.name !== name ||
      manifest.version !== expected.version ||
      typeof releasePath !== "string"
    )
      fail("LOCK_IDENTITY_MISMATCH: " + name);
    const tarball =
      typeof expected.tarball === "string"
        ? resolve(dirname(lockPath), expected.tarball)
        : "";
    if (
      !tarball ||
      isAbsolute(expected.tarball) ||
      expected.tarball.split(/[\\/]/).includes("..") ||
      !/^[a-f0-9]{64}$/.test(expected.sha256 ?? "") ||
      createHash("sha256").update(readFileSync(tarball)).digest("hex") !==
        expected.sha256
    )
      fail("LOCK_TARBALL_MISMATCH: " + name);
    const releaseFile = resolve(folder, releasePath);
    if (
      relative(folder, releaseFile).startsWith(".." + sep) ||
      isAbsolute(relative(folder, releaseFile))
    )
      fail("PUBLIC_RELEASE_PATH_INVALID: " + name);
    const release = JSON.parse(readFileSync(releaseFile, "utf8"));
    if (
      release.packageName !== name ||
      release.version !== expected.version ||
      release.sourceCommit !== expected.sourceCommit
    )
      fail("LOCK_IDENTITY_MISMATCH: " + name);
    packages.push({
      name,
      version: manifest.version,
      sha256: expected.sha256,
      sourceCommit: release.sourceCommit,
      sourceHasLocalChanges: release.sourceHasLocalChanges ?? null,
    });
  }
  const program = ts.createProgram(Object.values(entries), options);
  const checker = program.getTypeChecker();
  const exportsByPackage = {};
  for (const [name, entry] of Object.entries(entries)) {
    const file = program.getSourceFile(entry);
    const symbol = file && checker.getSymbolAtLocation(file);
    if (!symbol) fail("PUBLIC_EXPORTS_UNAVAILABLE: " + name);
    exportsByPackage[name] = new Set(
      checker
        .getExportsOfModule(symbol)
        .filter((item) => {
          const actual =
            item.flags & ts.SymbolFlags.Alias
              ? checker.getAliasedSymbol(item)
              : item;
          return actual.flags & ts.SymbolFlags.Value;
        })
        .map((item) => item.name)
        .filter((name) => name !== "default"),
    );
  }
  return { exportsByPackage, packages };
}

/** Pure conversion result: Page.vue + a review report. Inject export sets for isolated tests. */
export function convertPrototype({
  html,
  filename = "prototype.html",
  exportsByPackage,
  packages = [],
  project = process.cwd(),
} = {}) {
  if (typeof html !== "string" || !html.trim())
    fail("INPUT_REQUIRED: provide nonempty partner-ui-pages HTML");
  if (!exportsByPackage) fail("PUBLIC_EXPORTS_REQUIRED");
  const ts = requireProjectTool("typescript", project);
  const { parse } = requireProjectTool("vue/compiler-sfc", project);
  const dom = parseHtml(html, parse);
  const scripts = dom.elements.filter((node) => node.tag === "script");
  const executable = scripts.filter(
    (node) =>
      !attribute(node, "src") &&
      (!attribute(node, "type") ||
        /^(?:module|(?:text|application)\/javascript)$/.test(
          attribute(node, "type"),
        )),
  );
  const source = executable.map(innerText).join("\n;\n");
  const file = ts.createSourceFile(
    "prototype-script.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  if (file.parseDiagnostics.length)
    fail(
      "SCRIPT_PARSE: " +
        file.parseDiagnostics
          .map((item) => ts.flattenDiagnosticMessageText(item.messageText, " "))
          .join("; "),
    );
  const host = ts.createCompilerHost({ noLib: true, noResolve: true });
  host.getSourceFile = (name) => (name === file.fileName ? file : undefined);
  const checker = ts
    .createProgram([file.fileName], { noLib: true, noResolve: true }, host)
    .getTypeChecker();
  const symbol = (node) =>
    ts.isIdentifier(node) && ts.isShorthandPropertyAssignment(node.parent)
      ? checker.getShorthandAssignmentValueSymbol(node.parent)
      : checker.getSymbolAtLocation(node);
  const aliases = new Map();
  const issues = [];
  const usages = [];
  const imports = new Map();
  const removals = new Set();
  const boundNames = new Set();
  visitAll(ts, file, (node) => {
    if (ts.isIdentifier(node)) boundNames.add(node.text);
  });
  let helper = "__prototypeMigrationRequired";
  while (boundNames.has(helper)) helper += "_";
  const importName = (moduleName, exported) => {
    const key = moduleName + ":" + exported;
    if (!imports.has(key)) {
      let local = "__vue_" + exported;
      while (boundNames.has(local)) local += "_";
      boundNames.add(local);
      imports.set(key, { moduleName, exported, local });
    }
    return imports.get(key).local;
  };
  const globalName = (node, name) =>
    ts.isIdentifier(node) && node.text === name && !symbol(node);
  function reference(node) {
    node = unwrap(ts, node);
    if (!node) return;
    if (ts.isIdentifier(node)) {
      if (globalName(node, "Vue")) return { namespace: "Vue", path: [] };
      if (globalName(node, "PartnerUI"))
        return { namespace: "PartnerUI", path: [] };
      return aliases.get(symbol(node));
    }
    if (
      ts.isPropertyAccessExpression(node) ||
      ts.isElementAccessExpression(node)
    ) {
      const base = unwrap(ts, node.expression);
      const key = ts.isPropertyAccessExpression(node)
        ? node.name.text
        : ts.isStringLiteralLike(node.argumentExpression)
          ? node.argumentExpression.text
          : "*";
      if (
        (globalName(base, "window") || globalName(base, "globalThis")) &&
        ["Vue", "PartnerUI"].includes(key)
      )
        return { namespace: key, path: [] };
      const parent = reference(base);
      if (parent) return { ...parent, path: [...parent.path, key] };
    }
  }
  // Resolve namespace and destructuring aliases by symbol, including chains and shadowing.
  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    visitAll(ts, file, (node) => {
      if (!ts.isVariableDeclaration(node) || !node.initializer) return;
      const ref = reference(node.initializer);
      if (!ref) return;
      if (ts.isIdentifier(node.name)) {
        const key = symbol(node.name);
        if (key && !aliases.has(key)) {
          aliases.set(key, ref);
          removals.add(node);
          changed = true;
        }
      } else if (
        ts.isObjectBindingPattern(node.name) &&
        ref.path.length === 0
      ) {
        const supported = node.name.elements.every(
          (item) =>
            !item.dotDotDotToken &&
            !item.initializer &&
            ts.isIdentifier(item.name) &&
            propertyName(ts, item.propertyName ?? item.name),
        );
        if (!supported) return;
        for (const item of node.name.elements) {
          const key = symbol(item.name);
          if (key && !aliases.has(key)) {
            aliases.set(key, {
              ...ref,
              path: [propertyName(ts, item.propertyName ?? item.name)],
            });
            changed = true;
          }
        }
        removals.add(node);
      }
    });
    if (!changed) break;
  }
  const mounts = [];
  visitAll(ts, file, (node) => {
    if (ts.isCallExpression(node)) {
      const ref = reference(node.expression);
      if (ref?.namespace === "PartnerUI" && ref.path.join(".") === "mount")
        mounts.push(node);
    }
  });
  if (mounts.length !== 1)
    fail("MOUNT_REQUIRED: expected exactly one static PartnerUI.mount call");
  const mount = mounts[0];
  if (!ts.isExpressionStatement(mount.parent) || mount.parent.parent !== file)
    fail("MOUNT_SCOPE: mount must be a top-level statement");
  const options = unwrap(ts, mount.arguments[1]);
  if (!options || !ts.isObjectLiteralExpression(options))
    fail("MOUNT_OPTIONS: expected a literal options object");
  const option = (name) =>
    options.properties.find((item) => propertyName(ts, item.name) === name);
  const templateOption = option("template");
  const selector =
    templateOption && ts.isPropertyAssignment(templateOption)
      ? unwrap(ts, templateOption.initializer)
      : undefined;
  if (
    !selector ||
    !ts.isStringLiteralLike(selector) ||
    !/^#[A-Za-z][\w-]*$/.test(selector.text)
  )
    fail("TEMPLATE_SELECTOR: expected a literal #template-id");
  const templateNodes = scripts.filter(
    (node) =>
      attribute(node, "type") === "text/x-template" &&
      attribute(node, "id") === selector.text.slice(1),
  );
  if (templateNodes.length !== 1)
    fail("TEMPLATE_REQUIRED: expected exactly one matching text/x-template");
  const setupOption = option("setup");
  const setup =
    setupOption &&
    (ts.isMethodDeclaration(setupOption)
      ? setupOption
      : ts.isPropertyAssignment(setupOption)
        ? unwrap(ts, setupOption.initializer)
        : undefined);
  if (
    !setup ||
    !(
      ts.isMethodDeclaration(setup) ||
      ts.isFunctionExpression(setup) ||
      ts.isArrowFunction(setup)
    ) ||
    !setup.body ||
    !ts.isBlock(setup.body)
  )
    fail("SETUP_REQUIRED: expected a setup function with a block body");
  if (setup.parameters.length)
    issues.push({
      code: "SETUP_PARAMETERS",
      detail:
        "Move setup props/context to typed defineProps/defineEmits manually.",
    });
  const bodyStart = setup.body.getStart(file) + 1,
    bodyEnd = setup.body.end - 1;
  const bodyEdits = [];
  const addIssue = (code, detail, node) =>
    issues.push({
      code,
      detail,
      ...(node
        ? {
            line:
              file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1,
          }
        : {}),
    });
  function unresolved(node, ref, location = "setup") {
    const path =
      ref.namespace + (ref.path.length ? "." + ref.path.join(".") : "");
    const todo = "TODO(conversion.md#" + anchor(path) + ")";
    usages.push({
      path,
      todo,
      location,
      line: file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1,
      source: node.getText(file),
    });
    addIssue(
      "PROTOTYPE_HELPER",
      todo + ": replace " + path + " with a typed product implementation.",
      node,
    );
    return `/* ${todo}: ${path} */ ${helper}(${JSON.stringify(path)})`;
  }
  function rewriteNode(
    node,
    edits,
    localSource = source,
    localFile = file,
    resolver = reference,
    location = "setup",
    baseOffset = 0,
  ) {
    if (
      ts.isIdentifier(node) &&
      (ts.isVariableDeclaration(node.parent) ||
        ts.isBindingElement(node.parent) ||
        ts.isParameter(node.parent) ||
        ts.isFunctionDeclaration(node.parent)) &&
      node.parent.name === node
    )
      return;
    const ref = resolver(node);
    // Only outermost property chains and identifier alias uses are replaced.
    if (
      ref &&
      (ts.isPropertyAccessExpression(node) ||
        ts.isElementAccessExpression(node) ||
        ts.isIdentifier(node))
    ) {
      let text;
      if (
        ref.namespace === "Vue" &&
        ref.path.length === 1 &&
        exportsByPackage.vue?.has(ref.path[0]) &&
        ref.path[0] !== "compile"
      )
        text = importName("vue", ref.path[0]);
      else if (ref.namespace === "PartnerUI" || ref.namespace === "Vue") {
        if (localFile === file) text = unresolved(node, ref, location);
        else {
          const path = ref.namespace + "." + ref.path.join(".");
          const todo = "TODO(conversion.md#" + anchor(path) + ")";
          usages.push({
            path,
            todo,
            location,
            source: node.getText(localFile),
          });
          addIssue("PROTOTYPE_HELPER", todo + ": replace " + path);
          text = `/* ${todo}: ${path} */ ${helper}(${JSON.stringify(path)})`;
        }
      }
      if (text) {
        if (
          ts.isIdentifier(node) &&
          ts.isShorthandPropertyAssignment(node.parent)
        )
          text = node.text + ": " + text;
        edits.push({
          start: node.getStart(localFile) - baseOffset,
          end: node.end - baseOffset,
          text,
        });
        return;
      }
    }
    ts.forEachChild(node, (child) =>
      rewriteNode(
        child,
        edits,
        localSource,
        localFile,
        resolver,
        location,
        baseOffset,
      ),
    );
  }
  // Drop only namespace alias declarators, preserving unrelated declarations in the same statement.
  const aliasStatements = [];
  visitAll(ts, setup.body, (node) => {
    if (ts.isVariableStatement(node)) aliasStatements.push(node);
  });
  for (const statement of aliasStatements) {
    const declarations = statement.declarationList.declarations;
    const removed = declarations.filter((item) => removals.has(item));
    if (!removed.length) continue;
    if (removed.length === declarations.length)
      bodyEdits.push({
        start: statement.getStart(file),
        end: statement.end,
        text: "",
      });
    else {
      for (let index = 0; index < declarations.length; index++)
        if (removals.has(declarations[index])) {
          const first = index;
          while (removals.has(declarations[index + 1])) index++;
          const next = declarations[index + 1],
            previous = declarations[first - 1];
          bodyEdits.push(
            next
              ? {
                  start: declarations[first].getStart(file),
                  end: next.getStart(file),
                  text: "",
                }
              : { start: previous.end, end: declarations[index].end, text: "" },
          );
        }
    }
  }
  const exposedAliases = [];
  for (const statement of setup.body.statements) {
    if (ts.isReturnStatement(statement)) {
      if (statement.expression) {
        const ignoredEdits = [];
        rewriteNode(
          statement.expression,
          ignoredEdits,
          source,
          file,
          reference,
          "return",
        );
      }
      const returned = unwrap(ts, statement.expression);
      if (returned && ts.isObjectLiteralExpression(returned)) {
        for (const entry of returned.properties) {
          if (ts.isShorthandPropertyAssignment(entry)) continue;
          if (
            ts.isPropertyAssignment(entry) &&
            ts.isIdentifier(entry.name) &&
            ts.isIdentifier(entry.initializer) &&
            entry.name.text !== entry.initializer.text
          ) {
            const localCollision = setup.body.statements.some(
              (item) =>
                ts.isVariableStatement(item) &&
                item.declarationList.declarations.some(
                  (decl) =>
                    ts.isIdentifier(decl.name) &&
                    decl.name.text === entry.name.text,
                ),
            );
            if (!localCollision) {
              const aliasEdits = [];
              rewriteNode(entry.initializer, aliasEdits);
              exposedAliases.push(
                `const ${entry.name.text} = ${editsTo(source, aliasEdits, entry.initializer.getStart(file), entry.initializer.end)};`,
              );
            } else
              addIssue(
                "EXPOSE_ALIAS_CONFLICT",
                "Manually expose " +
                  entry.name.text +
                  " from " +
                  entry.initializer.text,
                entry,
              );
          } else
            addIssue(
              "EXPOSE_RETURN",
              "Manually migrate non-shorthand setup return binding.",
              entry,
            );
        }
      } else
        addIssue(
          "EXPOSE_RETURN",
          "Manually migrate dynamic setup return.",
          statement,
        );
      bodyEdits.push({
        start: statement.getStart(file),
        end: statement.end,
        text: "",
      });
    } else rewriteNode(statement, bodyEdits);
  }
  const prelude = file.statements.filter(
    (node) =>
      node !== mount.parent &&
      !(
        ts.isVariableStatement(node) &&
        node.declarationList.declarations.every((decl) => removals.has(decl))
      ),
  );
  if (prelude.length)
    addIssue(
      "MODULE_SCOPE_NOT_COPIED",
      "Module-scope imports/data/side effects are retained only in the report; move needed dependencies to typed APIs, mocks or explicit imports.",
    );
  // Record every real prototype reference in omitted module code and the mount/options wrapper.
  usages.push({
    path: "PartnerUI.mount",
    todo: "TODO(conversion.md#mount)",
    location: "mount",
    source: mount.expression.getText(file),
  });
  for (const wrapper of options.properties.filter(
    (entry) => entry !== setupOption,
  )) {
    const ignoredEdits = [];
    rewriteNode(
      wrapper,
      ignoredEdits,
      source,
      file,
      reference,
      "mount-options",
    );
  }
  for (const statement of prelude) {
    const ignoredEdits = [];
    rewriteNode(statement, ignoredEdits, source, file, reference, "module");
  }
  const template = innerText(templateNodes[0]);
  const parsedTemplate = parse("<template>" + template + "</template>", {
    filename: "Page.vue",
  });
  if (parsedTemplate.errors.length)
    fail(
      "TEMPLATE_PARSE: " +
        parsedTemplate.errors.map((error) => error.message ?? error).join("; "),
    );
  const templateEdits = [];
  const componentNames = new Set();
  const templateNamespaces = new Map([
    ["Vue", { namespace: "Vue", path: [] }],
    ["PartnerUI", { namespace: "PartnerUI", path: [] }],
  ]);
  for (const [key, value] of aliases)
    if (key?.name && !templateNamespaces.has(key.name))
      templateNamespaces.set(key.name, value);
  function expression(raw, start, end, quote, shadowed = new Set()) {
    let prefix = "const __value = (",
      suffix = ");";
    let ast = ts.createSourceFile(
      "template-expression.ts",
      prefix + raw + suffix,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    if (ast.parseDiagnostics.length) {
      prefix = "";
      suffix = "";
      ast = ts.createSourceFile(
        "template-expression.ts",
        raw,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
      );
    }
    if (ast.parseDiagnostics.length) {
      addIssue(
        "TEMPLATE_EXPRESSION",
        "Review unsupported template expression: " + raw,
      );
      return;
    }
    const expressionHost = ts.createCompilerHost({
      noLib: true,
      noResolve: true,
    });
    expressionHost.getSourceFile = (name) =>
      name === ast.fileName ? ast : undefined;
    const expressionChecker = ts
      .createProgram(
        [ast.fileName],
        { noLib: true, noResolve: true },
        expressionHost,
      )
      .getTypeChecker();
    const resolveExpression = (node) => {
      node = unwrap(ts, node);
      if (ts.isIdentifier(node))
        return !shadowed.has(node.text) &&
          !expressionChecker.getSymbolAtLocation(node)
          ? templateNamespaces.get(node.text)
          : undefined;
      if (
        ts.isPropertyAccessExpression(node) ||
        ts.isElementAccessExpression(node)
      ) {
        const key = ts.isPropertyAccessExpression(node)
          ? node.name.text
          : ts.isStringLiteralLike(node.argumentExpression)
            ? node.argumentExpression.text
            : "*";
        if (
          ts.isIdentifier(node.expression) &&
          ["window", "globalThis"].includes(node.expression.text) &&
          ["Vue", "PartnerUI"].includes(key)
        )
          return { namespace: key, path: [] };
        const parent = resolveExpression(node.expression);
        if (parent) return { ...parent, path: [...parent.path, key] };
      }
    };
    const edits = [];
    rewriteNode(
      ast,
      edits,
      raw,
      ast,
      resolveExpression,
      "template",
      prefix.length,
    );
    if (edits.length) {
      let changed = editsTo(raw, edits);
      if (quote === '"') changed = changed.replaceAll('"', "&quot;");
      if (quote === "'") changed = changed.replaceAll("'", "&apos;");
      if (quote && !['\"', "'"].includes(quote))
        changed = '"' + changed.replaceAll('"', "&quot;") + '"';
      templateEdits.push({ start, end, text: changed });
    }
  }
  function bindingNames(raw) {
    const ast = ts.createSourceFile(
      "template-binding.ts",
      "(" + raw + ")=>{}",
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const names = new Set();
    const collect = (name) => {
      if (ts.isIdentifier(name)) names.add(name.text);
      else if (
        ts.isObjectBindingPattern(name) ||
        ts.isArrayBindingPattern(name)
      )
        for (const item of name.elements)
          if (ts.isBindingElement(item)) collect(item.name);
    };
    const arrow = ast.statements[0]?.expression;
    if (arrow && ts.isArrowFunction(arrow))
      for (const parameter of arrow.parameters) collect(parameter.name);
    return names;
  }
  const walkTemplate = (node, inherited = new Set()) => {
    const shadowed = new Set(inherited);
    if (node.type === 1) {
      if (/^[A-Z]/.test(node.tag)) componentNames.add(node.tag);
      for (const prop of node.props)
        if (prop.type === 7 && prop.exp?.type === 4) {
          const bindings =
            prop.name === "slot"
              ? [prop.exp.content]
              : prop.name === "for" && prop.forParseResult
                ? ["value", "key", "index"]
                    .map((key) => prop.forParseResult[key]?.content)
                    .filter(Boolean)
                : [];
          for (const binding of bindings)
            for (const name of bindingNames(binding)) shadowed.add(name);
        }
      for (const prop of node.props)
        if (prop.type === 7 && prop.exp?.type === 4 && prop.name !== "slot") {
          const exp =
            prop.name === "for" ? prop.forParseResult?.source : prop.exp;
          if (!exp) {
            addIssue("TEMPLATE_EXPRESSION", "Review unsupported v-for syntax.");
            continue;
          }
          const start = exp.loc.start.offset - "<template>".length;
          // v-for source is evaluated outside its own binding scope.
          expression(
            exp.content,
            start,
            exp.loc.end.offset - "<template>".length,
            template[prop.exp.loc.start.offset - "<template>".length - 1],
            prop.name === "for" ? inherited : shadowed,
          );
        }
    }
    if (node.type === 5 && node.content?.type === 4)
      expression(
        node.content.content,
        node.content.loc.start.offset - "<template>".length,
        node.content.loc.end.offset - "<template>".length,
        undefined,
        shadowed,
      );
    for (const child of node.children ?? []) walkTemplate(child, shadowed);
  };
  walkTemplate(parsedTemplate.descriptor.template.ast);
  for (const name of [...componentNames].sort()) {
    if (
      [
        "Teleport",
        "Transition",
        "TransitionGroup",
        "KeepAlive",
        "Suspense",
      ].includes(name)
    )
      continue;
    const matches = packageNames.filter((moduleName) =>
      exportsByPackage[moduleName]?.has(name),
    );
    if (matches.length === 1 && !boundNames.has(name))
      imports.set(matches[0] + ":" + name, {
        moduleName: matches[0],
        exported: name,
        local: name,
      });
    else
      addIssue(
        matches.length > 1
          ? "AMBIGUOUS_COMPONENT"
          : matches.length
            ? "COMPONENT_BINDING_CONFLICT"
            : "UNKNOWN_COMPONENT",
        "Review " + name + ": no unique conflict-free public value export.",
      );
  }
  if (/\bpui-/.test(template))
    addIssue(
      "LAYOUT_MIGRATION",
      "TODO(conversion.md#layout): replace prototype utilities with feature-owned Token layout.",
    );
  if (template.includes("$refs"))
    addIssue(
      "INSTANCE_REFS",
      "TODO(conversion.md#mount): replace $refs with typed template refs.",
    );
  const styles = dom.elements
    .filter((node) => node.tag === "style")
    .map(innerText);
  const componentImports = [...imports.values()].sort(
    (a, b) =>
      a.moduleName.localeCompare(b.moduleName) ||
      a.exported.localeCompare(b.exported),
  );
  const importLines = componentImports.map(
    ({ moduleName, exported, local }) =>
      `import { ${exported}${local === exported ? "" : " as " + local} } from ${JSON.stringify(moduleName)};`,
  );
  const todoComments = [
    ...new Set(
      usages.map(
        (entry) => `// ${entry.todo}: ${entry.path} (${entry.location})`,
      ),
    ),
  ];
  const body = editsTo(source, bodyEdits, bodyStart, bodyEnd).trim();
  const page = `<script setup lang="ts">\n// NEEDS REVIEW: static extraction only. This guard intentionally blocks mounting.\n// Replace fixtures/helpers, add typed APIs/states and complete conversion.md before removing it.\n${importLines.join("\n")}\n${todoComments.join("\n")}\nthrow new Error('PROTOTYPE_CONVERSION_NEEDS_REVIEW');\nfunction ${helper}(_source: string): never { throw new Error('PROTOTYPE_HELPER_NEEDS_MIGRATION'); }\n${body}\n${exposedAliases.join("\n")}\n</script>\n\n<template>\n${editsTo(template, templateEdits).trim()}\n</template>\n${styles.map((style) => "\n<style scoped>\n/* TODO(conversion.md#layout): review source CSS and host font/layout boundaries. */\n" + style.trim() + "\n</style>\n").join("")}`;
  const validation = parse(page, { filename: "Page.vue" });
  if (validation.errors.length)
    fail(
      "OUTPUT_PARSE: " +
        validation.errors.map((error) => error.message ?? error).join("; "),
    );
  const outputScript = ts.createSourceFile(
    "Page.ts",
    validation.descriptor.scriptSetup.content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  if (outputScript.parseDiagnostics.length)
    fail("OUTPUT_SCRIPT_PARSE: review this unsupported setup structure.");
  return {
    page,
    report: {
      schemaVersion: "1.0",
      status: "needs-review",
      input: basename(filename),
      productionReady: false,
      packages,
      templateId: selector.text.slice(1),
      importedComponents: componentImports.filter(
        (entry) => entry.moduleName !== "vue",
      ),
      vueImports: componentImports.filter(
        (entry) => entry.moduleName === "vue",
      ),
      prototypeUsages: usages,
      issues: [
        {
          code: "MANUAL_PRODUCT_MIGRATION",
          detail:
            "No API, mock removal, lifecycle, styles, accessibility, visual parity or production approval is inferred. Guarded skeleton is not runnable production code.",
        },
        ...issues,
      ],
      extraction: {
        setupBody: source.slice(bodyStart, bodyEnd),
        moduleScope: prelude.map((node) => node.getText(file)).join("\n"),
        mountOptions: options.getText(file),
        omittedScriptSources: scripts
          .map((node) => attribute(node, "src"))
          .filter(Boolean),
        omittedStylesheetSources: dom.elements
          .filter(
            (node) =>
              node.tag === "link" && attribute(node, "rel") === "stylesheet",
          )
          .map((node) => attribute(node, "href"))
          .filter(Boolean),
      },
    },
  };
}

const help = `Usage: node scripts/convert_prototype.mjs --input <prototype.html> --out <new-directory> [--project <installed-host>]\nStatically extracts one partner-ui-pages x-template/setup into guarded Page.vue and conversion.json.\nOutput always needs review; no HTML/runtime execution, package install or production approval.\nThe output parent must exist. Existing output and symlink/.. output paths are rejected.\n--help Show this help without resolving dependencies.\n`;
export function parseConvertOptions(args) {
  const options = {};
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") return { help: true };
    if (!["--input", "--out", "--project"].includes(arg))
      fail("OPTIONS: unknown option " + arg);
    const value = args[++index];
    if (!value || value.startsWith("--") || options[arg.slice(2)] !== undefined)
      fail("OPTIONS: missing or repeated " + arg);
    options[arg.slice(2)] = value;
  }
  if (!options.input || !options.out)
    fail("OPTIONS: --input and --out are required");
  return options;
}
function noTraversal(value) {
  if (value.split(/[\\/]/).includes(".."))
    fail("OUTPUT_PATH: .. segments are forbidden");
}
/** Commit both outputs together; refuses overwrite and cleans its private temp directory on failure. */
export function writeConversion({ out, result }) {
  noTraversal(out);
  const target = resolve(out);
  const parent = dirname(target);
  if (!existsSync(parent)) fail("OUTPUT_PARENT_REQUIRED");
  let current = parent;
  while (true) {
    if (lstatSync(current).isSymbolicLink())
      fail("OUTPUT_PATH: symlink parent is forbidden");
    if (dirname(current) === current) break;
    current = dirname(current);
  }
  if (!lstatSync(parent).isDirectory()) fail("OUTPUT_PARENT_REQUIRED");
  if (
    existsSync(target) ||
    (() => {
      try {
        lstatSync(target);
        return true;
      } catch (error) {
        if (error.code === "ENOENT") return false;
        throw error;
      }
    })()
  )
    fail("OUTPUT_EXISTS: refusing to overwrite " + target);
  if (
    typeof result?.page !== "string" ||
    result.report?.status !== "needs-review"
  )
    fail("CONVERSION_RESULT_INVALID");
  const temp = mkdtempSync(resolve(parent, ".prototype-conversion-"));
  try {
    writeFileSync(resolve(temp, "Page.vue"), result.page, { flag: "wx" });
    writeFileSync(
      resolve(temp, "conversion.json"),
      JSON.stringify(result.report, null, 2) + "\n",
      { flag: "wx" },
    );
    if (existsSync(target))
      fail("OUTPUT_EXISTS: target appeared while preparing output");
    renameSync(temp, target);
  } catch (error) {
    rmSync(temp, { recursive: true, force: true });
    throw error;
  }
  return target;
}
export function runConvert(args) {
  const options = parseConvertOptions(args);
  if (options.help) return { help };
  const input = resolve(options.input);
  if (!lstatSync(input).isFile() || lstatSync(input).isSymbolicLink())
    fail("INPUT_FILE_REQUIRED");
  const project = resolve(options.project ?? process.cwd());
  const metadata = loadPublicExports({ project });
  const result = convertPrototype({
    html: readFileSync(input, "utf8"),
    filename: input,
    project,
    ...metadata,
  });
  const output = writeConversion({ out: options.out, result });
  return {
    output,
    status: result.report.status,
    issues: result.report.issues.length,
  };
}
if (
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  realpathSync(resolve(process.argv[1])) === realpathSync(ownFile)
) {
  try {
    const result = runConvert(process.argv.slice(2));
    console.log(
      result.help ??
        `NEEDS REVIEW: ${result.output} (${result.issues} review items)`,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
