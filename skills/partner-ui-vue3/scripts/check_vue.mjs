#!/usr/bin/env node
/** Static feature checks. Parses SFC/TypeScript/CSS ASTs; does not prove runtime data flow. */
import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  realpathSync,
} from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { requireProjectTool } from "./tooling.mjs";

const toolProject =
  process.argv[2] && !process.argv[2].startsWith("-")
    ? resolve(process.argv[2])
    : process.cwd();
const ts = requireProjectTool("typescript", toolProject);
const { compileStyle, parse } = requireProjectTool(
  "vue/compiler-sfc",
  toolProject,
);

const scriptFile = fileURLToPath(import.meta.url);
const excluded = new Set([
  "node_modules",
  "dist",
  "vendor",
  "mocks",
  "tests",
  "__tests__",
  "test-results",
  "playwright-report",
  ".git",
  ".artifacts",
  ".cache",
  "coverage",
]);
const publicEntries = new Set([
  "@workbench/ui-vue3",
  "@workbench/ui-vue3/styles.css",
  "huawei-partner-ai-ui",
  "huawei-partner-ai-ui/styles.css",
]);
const packagePath =
  /(?:^|[/\\])(?:@workbench[/\\]ui-vue3|huawei-partner-ai-ui|packages[/\\]ui-vue3)(?:[/\\]|$)/;
const sourceExtension = /\.(?:vue|[cm]?[jt]sx?|css)$/;
const testFile = /(?:^|[/\\])[^/\\]*\.(?:test|spec)\.[cm]?[jt]sx?$/;
const developmentEntry =
  /(?:^|[/\\])(?:main\.dev|dev-entry|development-entry|dev)\.[cm]?[jt]sx?$/;
const iconComponents =
  /^(?:Workbench(?:System|Status|Empty|File|Pedestal|Scene)?Icon|workbench-(?:(?:system|status|empty|file|pedestal|scene)-)?icon)$/;
const plainString = (node) =>
  node && (ts.isStringLiteralLike(node) ? node.text : undefined);
const propName = (node) =>
  ts.isIdentifier(node) || ts.isStringLiteralLike(node) ? node.text : undefined;
const property = (node) =>
  ts.isPropertyAccessExpression(node)
    ? node.name.text
    : ts.isElementAccessExpression(node)
      ? plainString(node.argumentExpression)
      : undefined;
const unwrap = (node) => {
  while (
    node &&
    (ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isNonNullExpression(node) ||
      ts.isSatisfiesExpression(node))
  )
    node = node.expression;
  return node;
};

export function loadIconNames(
  file = resolve(dirname(scriptFile), "../references/icons.json"),
) {
  const metadata = JSON.parse(readFileSync(file, "utf8"));
  if (
    !Array.isArray(metadata.icons) ||
    !metadata.version ||
    !metadata.sourceCommit
  )
    throw new Error(
      "ICON_METADATA: expected pinned icons.json with version and sourceCommit",
    );
  return new Set(
    metadata.icons
      .flatMap((icon) => [
        icon.key,
        icon.alias,
        icon.name,
        ...(icon.components ?? []).map((entry) => entry.props?.name),
      ])
      .filter(Boolean),
  );
}

export function checkSource(
  source,
  { file = "Feature.vue", iconNames = new Set() } = {},
) {
  const findings = [];
  const add = (rule, message, line = 1, severity = "error") =>
    findings.push({ file, line, rule, severity, message });
  const sfc = extname(file) === ".vue";
  const scripts = [];
  const styles = [];
  let template;
  if (sfc) {
    const result = parse(source, { filename: file });
    for (const error of result.errors)
      add(
        "SFC_PARSE",
        typeof error === "string" ? error : error.message,
        error.loc?.start?.line ?? 1,
      );
    const descriptor = result.descriptor;
    for (const block of [descriptor.script, descriptor.scriptSetup].filter(
      Boolean,
    ))
      scripts.push({ text: block.content, line: block.loc.start.line - 1 });
    styles.push(
      ...descriptor.styles.map((block) => ({
        text: block.content,
        line: block.loc.start.line - 1,
      })),
    );
    template = descriptor.template?.ast;
  } else if (extname(file) === ".css") styles.push({ text: source, line: 0 });
  else scripts.push({ text: source, line: 0 });
  const trees = scripts.map((block) => ({
    ...block,
    ast: ts.createSourceFile(
      file + ".ts",
      block.text,
      ts.ScriptTarget.Latest,
      true,
      /\.[jt]sx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    ),
  }));
  const compilerNames = new Set(["compile"]);
  const purifierObjects = new Set();
  const sanitizerFunctions = new Set();
  const bindings = new Map();
  const stringBindings = new Map();
  const relativeFile = file.replaceAll("\\", "/");
  const mockContext =
    /(?:^|\/)(?:mocks|tests|__tests__)\//.test(relativeFile) ||
    testFile.test(file) ||
    developmentEntry.test(file);
  function imported(module, line) {
    if (packagePath.test(module) && !publicEntries.has(module))
      add(
        "IMPORT_BOUNDARY",
        `Use the package public entry instead of ${JSON.stringify(module)}.`,
        line,
      );
    if (/(?:^|[/\\])mocks(?:[/\\]|$)/.test(module) && !mockContext)
      add(
        "MOCK_BOUNDARY",
        "Mock imports are allowed only in mocks, tests, or an explicit development entry.",
        line,
      );
  }
  for (const { ast } of trees) {
    function discover(node) {
      if (
        ts.isImportDeclaration(node) &&
        ts.isStringLiteralLike(node.moduleSpecifier)
      ) {
        const module = node.moduleSpecifier.text;
        const clause = node.importClause;
        if (module === "dompurify") {
          if (clause?.name) purifierObjects.add(clause.name.text);
          if (
            clause?.namedBindings &&
            ts.isNamespaceImport(clause.namedBindings)
          )
            purifierObjects.add(clause.namedBindings.name.text);
          if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings))
            for (const entry of clause.namedBindings.elements)
              if ((entry.propertyName?.text ?? entry.name.text) === "sanitize")
                sanitizerFunctions.add(entry.name.text);
        }
        if (
          module === "vue" &&
          clause?.namedBindings &&
          ts.isNamedImports(clause.namedBindings)
        )
          for (const entry of clause.namedBindings.elements)
            if ((entry.propertyName?.text ?? entry.name.text) === "compile")
              compilerNames.add(entry.name.text);
      }
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer
      ) {
        bindings.set(node.name.text, node.initializer);
        const value = plainString(unwrap(node.initializer));
        if (value !== undefined) stringBindings.set(node.name.text, value);
      }
      ts.forEachChild(node, discover);
    }
    discover(ast);
  }
  function sanitized(input, seen = new Set()) {
    const node = unwrap(input);
    if (!node) return false;
    if (ts.isIdentifier(node)) {
      if (seen.has(node.text)) return false;
      return sanitized(bindings.get(node.text), new Set([...seen, node.text]));
    }
    if (ts.isPropertyAccessExpression(node) && node.name.text === "value")
      return sanitized(node.expression, seen);
    if (ts.isArrowFunction(node)) {
      if (!ts.isBlock(node.body)) return sanitized(node.body, seen);
      const returns = node.body.statements.filter(ts.isReturnStatement);
      return (
        returns.length > 0 &&
        returns.every((item) => sanitized(item.expression, seen))
      );
    }
    if (ts.isCallExpression(node)) {
      const callee = unwrap(node.expression);
      if (ts.isIdentifier(callee) && sanitizerFunctions.has(callee.text))
        return true;
      if (
        property(callee) === "sanitize" &&
        ts.isIdentifier(callee.expression) &&
        purifierObjects.has(callee.expression.text)
      )
        return true;
      if (
        ts.isIdentifier(callee) &&
        ["computed", "ref"].includes(callee.text) &&
        node.arguments.length === 1
      )
        return sanitized(node.arguments[0], seen);
    }
    return false;
  }
  function expression(text) {
    const ast = ts.createSourceFile(
      "expression.ts",
      `const __value = (${text});`,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    return ast.statements[0]?.declarationList?.declarations[0]?.initializer;
  }
  function jsScan(ast, lineOffset) {
    const lineFor = (node) =>
      ast.getLineAndCharacterOfPosition(node.getStart(ast)).line +
      1 +
      lineOffset;
    function visit(node) {
      const line = lineFor(node);
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteralLike(node.moduleSpecifier)
      )
        imported(node.moduleSpecifier.text, line);
      if (ts.isCallExpression(node)) {
        const callee = unwrap(node.expression);
        if (
          (callee.kind === ts.SyntaxKind.ImportKeyword ||
            (ts.isIdentifier(callee) && callee.text === "require")) &&
          node.arguments[0]
        ) {
          const module = plainString(node.arguments[0]);
          if (module !== undefined) imported(module, line);
        }
        const name = ts.isIdentifier(callee) ? callee.text : property(callee);
        if (compilerNames.has(name))
          add(
            "RUNTIME_TEMPLATE",
            "Runtime template compilation is forbidden; use precompiled SFCs.",
            line,
          );
        if (
          ["alert", "confirm", "prompt"].includes(name) &&
          (ts.isIdentifier(callee) ||
            (ts.isIdentifier(callee.expression) &&
              ["window", "globalThis"].includes(callee.expression.text)))
        )
          add(
            "BROWSER_DIALOG",
            "Use an accessible package dialog or local feedback instead of a browser dialog.",
            line,
          );
      }
      if (
        ts.isPropertyAssignment(node) &&
        propName(node.name) === "template" &&
        (ts.isStringLiteralLike(node.initializer) ||
          ts.isTemplateExpression(node.initializer))
      )
        add(
          "RUNTIME_TEMPLATE",
          "A runtime template string is forbidden; use a precompiled SFC.",
          line,
        );
      if (
        (ts.isPropertyAccessExpression(node) ||
          ts.isElementAccessExpression(node)) &&
        ((ts.isIdentifier(node.expression) &&
          node.expression.text === "PartnerUI") ||
          (ts.isIdentifier(node.expression) &&
            ["window", "globalThis"].includes(node.expression.text) &&
            property(node) === "PartnerUI"))
      )
        add(
          "PARTNER_GLOBAL",
          "Import package APIs rather than using PartnerUI globals.",
          line,
        );
      ts.forEachChild(node, visit);
    }
    visit(ast);
  }
  for (const { ast, line } of trees) jsScan(ast, line);
  function cleanCssValue(value) {
    return value
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/url\((?:[^()"']|"[^"]*"|'[^']*')*\)/gi, "")
      .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "");
  }
  function scanCss(text, offset, inline = false) {
    const result = compileStyle({
      source: inline ? `.feature-inline{${text}}` : text,
      filename: file,
      id: "feature-rules",
      trim: false,
    });
    for (const error of result.errors)
      add(
        "CSS_PARSE",
        error.reason ?? error.message,
        offset + (error.line ?? 1),
      );
    result.rawResult?.root?.walkRules((rule) => {
      if (inline) return;
      const selector = rule.selector
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "");
      // CSS has already been parsed; inspect class tokens and combinators, not arbitrary file text.
      const internal = /\.(?:wb|tr)-[\w-]+/.test(selector);
      const descendant =
        /\.partner-ai(?:[\w.#:[\]=()-]*)(?:\s+(?![,)])|\s*[>+~])/.test(
          selector,
        );
      if (
        internal ||
        descendant ||
        /:deep\s*\([^)]*\.partner-ai\b/.test(selector)
      )
        add(
          "COMPONENT_CSS",
          "Do not target package internals or descendants of .partner-ai; use public APIs and host wrappers.",
          offset + (rule.source?.start?.line ?? 1),
        );
    });
    result.rawResult?.root?.walkDecls((declaration) => {
      const line = offset + (declaration.source?.start?.line ?? 1);
      if (declaration.important)
        add("IMPORTANT", "!important is forbidden in feature CSS.", line);
      const value = cleanCssValue(declaration.value);
      if (/(?:^|[^\w-])#[\da-f]{3,8}\b|\b(?:rgba?|hsla?)\s*\(/i.test(value))
        add(
          "COLOR_LITERAL",
          "Use Foundation colour tokens instead of literal colours.",
          line,
        );
      if (
        /^(?:margin|padding)(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?$|^(?:row-|column-)?gap$/.test(
          declaration.prop,
        )
      ) {
        const dimensions = [...value.matchAll(/(-?\d*\.?\d+)px\b/gi)];
        if (dimensions.some((match) => Number(match[1]) % 4 !== 0))
          add(
            "SPACING_GRID",
            "Feature spacing should be a multiple of 4px; review this value.",
            line,
            "warning",
          );
      }
    });
  }
  for (const style of styles) scanCss(style.text, style.line);
  function visitTemplate(node) {
    if (node.type === 1) {
      for (const prop of node.props) {
        const line = prop.loc.start.line;
        if (prop.type === 6 && prop.name === "style" && prop.value)
          scanCss(prop.value.content, line - 1, true);
        if (
          prop.type === 7 &&
          prop.name === "html" &&
          !sanitized(expression(prop.exp?.content ?? ""))
        )
          add(
            "UNSAFE_HTML",
            "v-html requires a DOMPurify sanitization call or a statically traceable sanitized binding.",
            line,
          );
        if (
          prop.type === 7 &&
          prop.name === "bind" &&
          prop.arg?.content === "style" &&
          prop.exp
        ) {
          const style = unwrap(expression(prop.exp.content));
          if (style && ts.isObjectLiteralExpression(style))
            for (const entry of style.properties) {
              if (ts.isPropertyAssignment(entry)) {
                const name = propName(entry.name);
                const value = plainString(unwrap(entry.initializer));
                if (name && value !== undefined)
                  scanCss(
                    `${name.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase())}:${value}`,
                    line - 1,
                    true,
                  );
              }
            }
        }
        if (prop.type === 7 && prop.exp) {
          const ast = ts.createSourceFile(
            "template-expression.ts",
            prop.exp.content,
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TS,
          );
          jsScan(ast, line - 1);
        }
        if (
          iconComponents.test(node.tag) &&
          ((prop.type === 6 && prop.name === "name") ||
            (prop.type === 7 &&
              prop.name === "bind" &&
              prop.arg?.content === "name"))
        ) {
          let value = prop.type === 6 ? prop.value?.content : undefined;
          if (prop.type === 7) {
            const expr = unwrap(expression(prop.exp?.content ?? ""));
            value =
              plainString(expr) ??
              (expr && ts.isIdentifier(expr)
                ? stringBindings.get(expr.text)
                : undefined);
          }
          if (value !== undefined && !iconNames.has(value))
            add(
              "ICON_REGISTERED",
              `Unknown icon name ${JSON.stringify(value)} in the pinned icons.json.`,
              line,
            );
          else if (value === undefined)
            add(
              "ICON_DYNAMIC",
              "Dynamic icon names require a registry-backed mapping; static analysis cannot enumerate this expression.",
              line,
              "warning",
            );
        }
      }
    }
    if (node.type === 5 && node.content?.content) {
      const ast = ts.createSourceFile(
        "template-expression.ts",
        node.content.content,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
      );
      jsScan(ast, node.loc.start.line - 1);
    }
    for (const child of node.children ?? []) visitTemplate(child);
  }
  if (template) visitTemplate(template);
  return findings.sort(
    (a, b) => a.line - b.line || a.rule.localeCompare(b.rule),
  );
}

export function checkVueDirectory(
  directory,
  { icons, iconNames = icons ? loadIconNames(icons) : loadIconNames() } = {},
) {
  const root = resolve(directory);
  if (!existsSync(root) || !lstatSync(root).isDirectory())
    throw new Error(`CHECK_DIRECTORY: not a directory: ${root}`);
  const findings = [];
  let files = 0;
  function scan(current) {
    for (const entry of readdirSync(current, { withFileTypes: true }).sort(
      (a, b) => a.name.localeCompare(b.name),
    )) {
      if (entry.isSymbolicLink()) continue;
      const path = resolve(current, entry.name);
      if (entry.isDirectory()) {
        if (!excluded.has(entry.name) && !entry.name.startsWith("."))
          scan(path);
      } else if (
        sourceExtension.test(entry.name) &&
        !testFile.test(entry.name) &&
        !entry.name.endsWith(".d.ts")
      ) {
        files++;
        findings.push(
          ...checkSource(readFileSync(path, "utf8"), {
            file: relative(root, path).replaceAll("\\", "/"),
            iconNames,
          }),
        );
      }
    }
  }
  scan(root);
  return {
    files,
    errors: findings.filter((finding) => finding.severity === "error").length,
    warnings: findings.filter((finding) => finding.severity === "warning")
      .length,
    findings,
  };
}

function main(args) {
  let directory;
  let icons;
  let json = false;
  for (let index = 0; index < args.length; index++) {
    if (args[index] === "--icons") {
      icons = args[++index];
      if (!icons) throw new Error("--icons requires a path");
    } else if (args[index] === "--json") json = true;
    else if (args[index].startsWith("-") || directory)
      throw new Error(`Unexpected argument: ${args[index]}`);
    else directory = args[index];
  }
  if (!directory)
    throw new Error(
      "Usage: check_vue.mjs <directory> [--icons <icons.json>] [--json]",
    );
  const result = checkVueDirectory(directory, { icons });
  if (json) console.log(JSON.stringify(result, null, 2));
  else {
    for (const finding of result.findings)
      console.log(
        `${finding.file}:${finding.line}: ${finding.severity} ${finding.rule} ${finding.message}`,
      );
    console.log(
      `Checked ${result.files} source files; ${result.errors} error(s), ${result.warnings} warning(s).`,
    );
  }
  process.exitCode = result.errors ? 1 : 0;
}
if (
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  realpathSync(resolve(process.argv[1])) === realpathSync(scriptFile)
) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`check_vue: ${error.message}`);
    process.exitCode = 1;
  }
}
