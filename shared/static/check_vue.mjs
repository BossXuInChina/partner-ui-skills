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
  // Module/template names and nested lexical names are separate. Only immutable,
  // unmodified local expressions are traced; this is not interprocedural analysis.
  const moduleScope = { parent: null, kind: "module", bindings: new Map() };
  const nodeScopes = new WeakMap();
  const astOffsets = new WeakMap(trees.map(({ ast, line }) => [ast, line]));
  const relativeFile = file.replaceAll("\\", "/");
  const mockFilename = /(?:^|\/)[^/]*\.mock\.[^/]+$/i;
  const mockContext =
    /(?:^|\/)(?:mocks|tests|__tests__)\//.test(relativeFile) ||
    mockFilename.test(relativeFile) ||
    testFile.test(file) ||
    developmentEntry.test(file);
  const childScope = (parent, kind = "block") => ({
    parent,
    kind,
    bindings: new Map(),
  });
  function declare(scope, name, details = {}) {
    const existing = scope.bindings.get(name);
    if (existing) existing.ambiguous = true;
    else
      scope.bindings.set(name, {
        name,
        scope,
        constant: false,
        written: false,
        ...details,
      });
  }
  function bindingNames(name, scope, details = {}) {
    if (ts.isIdentifier(name)) declare(scope, name.text, details);
    else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name))
      for (const element of name.elements)
        if (ts.isBindingElement(element)) bindingNames(element.name, scope);
  }
  function lookup(name, scope = moduleScope) {
    for (let current = scope; current; current = current.parent)
      if (current.bindings.has(name)) return current.bindings.get(name);
  }
  const scopeOf = (node) => nodeScopes.get(node) ?? moduleScope;
  const stable = (binding) =>
    binding?.constant && !binding.written && !binding.ambiguous;
  function indexTree(node, incoming) {
    let scope = incoming;
    if (ts.isFunctionLike(node)) {
      if (ts.isFunctionDeclaration(node) && node.name)
        declare(incoming, node.name.text);
      scope = childScope(incoming, "function");
      if (ts.isFunctionExpression(node) && node.name)
        declare(scope, node.name.text);
      for (const parameter of node.parameters)
        bindingNames(parameter.name, scope);
    } else if (
      ts.isBlock(node) ||
      ts.isCaseBlock(node) ||
      ts.isCatchClause(node) ||
      ts.isForStatement(node) ||
      ts.isForInStatement(node) ||
      ts.isForOfStatement(node)
    ) {
      scope = childScope(incoming);
      if (ts.isCatchClause(node) && node.variableDeclaration)
        bindingNames(node.variableDeclaration.name, scope);
    }
    nodeScopes.set(node, scope);
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteralLike(node.moduleSpecifier)
    ) {
      const module = node.moduleSpecifier.text;
      const clause = node.importClause;
      if (!clause?.isTypeOnly) {
        if (clause?.name)
          declare(scope, clause.name.text, {
            constant: true,
            module,
            imported: "default",
          });
        if (clause?.namedBindings && ts.isNamespaceImport(clause.namedBindings))
          declare(scope, clause.namedBindings.name.text, {
            constant: true,
            module,
            imported: "*",
          });
        if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings))
          for (const entry of clause.namedBindings.elements)
            if (!entry.isTypeOnly)
              declare(scope, entry.name.text, {
                constant: true,
                module,
                imported: entry.propertyName?.text ?? entry.name.text,
              });
      }
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isVariableDeclarationList(node.parent)
    ) {
      const flags = node.parent.flags;
      let target = scope;
      if (!(flags & ts.NodeFlags.BlockScoped))
        while (target.parent && !["function", "module"].includes(target.kind))
          target = target.parent;
      bindingNames(node.name, target, {
        constant: !!(flags & ts.NodeFlags.Const),
        initializer: node.initializer,
      });
    }
    if (ts.isClassDeclaration(node) && node.name)
      declare(scope, node.name.text);
    ts.forEachChild(node, (child) => indexTree(child, scope));
  }
  for (const { ast } of trees) indexTree(ast, moduleScope);
  function markWritten(input, throughMember = false, seen = new Set()) {
    const node = unwrap(input);
    if (!node) return;
    if (ts.isIdentifier(node)) {
      const binding = lookup(node.text, scopeOf(node));
      if (binding && !seen.has(binding)) {
        binding.written = true;
        if (throughMember && binding.initializer)
          markWritten(binding.initializer, true, new Set([...seen, binding]));
      }
    } else if (
      ts.isPropertyAccessExpression(node) ||
      ts.isElementAccessExpression(node)
    )
      markWritten(node.expression, true, seen);
    else if (ts.isArrayLiteralExpression(node))
      for (const element of node.elements) markWritten(element);
    else if (ts.isObjectLiteralExpression(node))
      for (const entry of node.properties) {
        if (ts.isPropertyAssignment(entry)) markWritten(entry.initializer);
        else if (ts.isShorthandPropertyAssignment(entry))
          markWritten(entry.name);
        else if (ts.isSpreadAssignment(entry)) markWritten(entry.expression);
      }
  }
  function indexWrites(node) {
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
      node.operatorToken.kind <= ts.SyntaxKind.LastAssignment
    )
      markWritten(node.left);
    if (
      (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) &&
      [ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.MinusMinusToken].includes(
        node.operator,
      )
    )
      markWritten(node.operand);
    if (ts.isDeleteExpression(node)) markWritten(node.expression);
    ts.forEachChild(node, indexWrites);
  }
  for (const { ast } of trees) indexWrites(ast);
  function resolveConstant(input, seen = new Set()) {
    const node = unwrap(input);
    if (!node || !ts.isIdentifier(node)) return node;
    const binding = lookup(node.text, scopeOf(node));
    if (!stable(binding) || !binding.initializer || seen.has(binding))
      return node;
    return resolveConstant(binding.initializer, new Set([...seen, binding]));
  }
  function staticValue(input) {
    const node = resolveConstant(input);
    if (node && ts.isStringLiteralLike(node)) return node.text;
    if (node && ts.isNumericLiteral(node)) return Number(node.text);
    if (
      node &&
      ts.isPrefixUnaryExpression(node) &&
      [ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken].includes(
        node.operator,
      ) &&
      ts.isNumericLiteral(node.operand)
    )
      return (
        Number(node.operand.text) *
        (node.operator === ts.SyntaxKind.MinusToken ? -1 : 1)
      );
  }
  // Only literal strings and frozen, shallow string maps are enumerable.
  // Unknown keys remain unknown unless an explicit literal fallback is provided.
  const unknownIcon = Symbol("unknown-icon-expression");
  function iconValues(input, seen = new Set()) {
    const node = unwrap(input);
    if (!node || seen.has(node)) return new Set([unknownIcon]);
    const next = new Set([...seen, node]);
    if (ts.isStringLiteralLike(node)) return new Set([node.text]);
    if (ts.isIdentifier(node)) {
      const binding = lookup(node.text, scopeOf(node));
      return stable(binding) && binding.initializer
        ? iconValues(binding.initializer, next) : new Set([unknownIcon]);
    }
    if (ts.isConditionalExpression(node))
      return new Set([...iconValues(node.whenTrue, next), ...iconValues(node.whenFalse, next)]);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
      const values = iconValues(node.left, next);
      if (!values.has(undefined)) return values;
      values.delete(undefined);
      return new Set([...values, ...iconValues(node.right, next)]);
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const base = resolveConstant(node.expression);
      if (!base || !ts.isCallExpression(base) || base.arguments.length !== 1) return new Set([unknownIcon]);
      const callee = base.expression;
      if (!ts.isPropertyAccessExpression(callee) || callee.name.text !== "freeze" ||
          !ts.isIdentifier(callee.expression) || callee.expression.text !== "Object" ||
          lookup("Object", scopeOf(callee.expression))) return new Set([unknownIcon]);
      const literal = unwrap(base.arguments[0]);
      if (!ts.isObjectLiteralExpression(literal)) return new Set([unknownIcon]);
      const entries = new Map();
      let nullPrototype = false;
      for (const entry of literal.properties) {
        if (!ts.isPropertyAssignment(entry) || entry.name.kind === ts.SyntaxKind.ComputedPropertyName)
          return new Set([unknownIcon]);
        const key = propName(entry.name);
        if (key === "__proto__" && entry.initializer.kind === ts.SyntaxKind.NullKeyword) { nullPrototype = true; continue; }
        const values = iconValues(entry.initializer, next);
        if (!key || key === "__proto__" || values.has(undefined) || values.has(unknownIcon)) return new Set([unknownIcon]);
        entries.set(key, values);
      }
      const keys = ts.isPropertyAccessExpression(node) ? new Set([node.name.text]) : iconValues(node.argumentExpression, next);
      const values = new Set();
      for (const key of keys) {
        if (key === unknownIcon || key === undefined) {
          for (const entry of entries.values()) for (const value of entry) values.add(value);
          values.add(nullPrototype ? undefined : unknownIcon);
        } else for (const value of entries.get(key) ?? [undefined]) values.add(value);
      }
      return values;
    }
    return new Set([unknownIcon]);
  }
  function importOrigin(input, seen = new Set()) {
    const node = unwrap(input);
    if (!node) return;
    if (ts.isIdentifier(node)) {
      const binding = lookup(node.text, scopeOf(node));
      if (!stable(binding) || seen.has(binding)) return;
      if (binding.module)
        return { module: binding.module, member: binding.imported };
      if (binding.initializer)
        return importOrigin(binding.initializer, new Set([...seen, binding]));
    } else if (
      ts.isPropertyAccessExpression(node) ||
      ts.isElementAccessExpression(node)
    ) {
      const base = importOrigin(node.expression, seen);
      if (base && ["*", "default"].includes(base.member))
        return { module: base.module, member: property(node) };
    }
  }
  function importedApi(node, module, members) {
    const origin = importOrigin(node);
    return origin?.module === module && members.includes(origin.member);
  }
  function imported(module, line) {
    if (packagePath.test(module) && !publicEntries.has(module))
      add(
        "IMPORT_BOUNDARY",
        `Use the package public entry instead of ${JSON.stringify(module)}.`,
        line,
      );
    const path = module.replaceAll("\\", "/").split(/[?#]/, 1)[0];
    if (
      (/(?:^|\/)mocks(?:\/|$)/i.test(path) || mockFilename.test(path)) &&
      !mockContext
    )
      add(
        "MOCK_BOUNDARY",
        "Mock imports are allowed only in mocks, tests, or an explicit development entry.",
        line,
      );
  }
  function sanitized(input, seen = new Set()) {
    const node = unwrap(input);
    if (!node) return false;
    if (ts.isIdentifier(node)) {
      const binding = lookup(node.text, scopeOf(node));
      if (!stable(binding) || !binding.initializer || seen.has(binding))
        return false;
      return sanitized(binding.initializer, new Set([...seen, binding]));
    }
    if (ts.isPropertyAccessExpression(node) && node.name.text === "value")
      return sanitized(node.expression, seen);
    if (ts.isConditionalExpression(node))
      return sanitized(node.whenTrue, seen) && sanitized(node.whenFalse, seen);
    if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      if (!ts.isBlock(node.body)) return sanitized(node.body, seen);
      const returns = [];
      function collect(child) {
        if (ts.isFunctionLike(child)) return;
        if (ts.isReturnStatement(child)) returns.push(child);
        else ts.forEachChild(child, collect);
      }
      collect(node.body);
      return (
        returns.length > 0 &&
        returns.every((item) => sanitized(item.expression, seen))
      );
    }
    if (ts.isCallExpression(node)) {
      if (importedApi(node.expression, "dompurify", ["sanitize"])) return true;
      // Vue computed is read-only. A ref's initializer does not establish that
      // its future .value is sanitized; mutable refs intentionally remain unknown.
      if (
        importedApi(node.expression, "vue", ["computed"]) &&
        node.arguments.length === 1
      )
        return sanitized(node.arguments[0], seen);
    }
    return false;
  }
  function expression(text, parentScope = moduleScope) {
    const ast = ts.createSourceFile(
      "expression.ts",
      `const __value = (${text});`,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    indexTree(ast, childScope(parentScope));
    indexWrites(ast);
    return ast.statements[0]?.declarationList?.declarations[0]?.initializer;
  }
  function globalObject(input) {
    const node = unwrap(input);
    return (
      node &&
      ts.isIdentifier(node) &&
      ["window", "globalThis"].includes(node.text) &&
      !lookup(node.text, scopeOf(node))
    );
  }
  function browserDialog(input, seen = new Set()) {
    const node = unwrap(input);
    if (!node) return false;
    if (ts.isIdentifier(node)) {
      const binding = lookup(node.text, scopeOf(node));
      if (!binding) return ["alert", "confirm", "prompt"].includes(node.text);
      if (stable(binding) && binding.initializer && !seen.has(binding))
        return browserDialog(binding.initializer, new Set([...seen, binding]));
    } else if (
      (ts.isPropertyAccessExpression(node) ||
        ts.isElementAccessExpression(node)) &&
      globalObject(node.expression)
    )
      return ["alert", "confirm", "prompt"].includes(property(node));
    return false;
  }
  const templateProperties = new WeakSet();
  function scriptLine(node, fallback) {
    const ast = node.getSourceFile();
    return (
      ast.getLineAndCharacterOfPosition(node.getStart(ast)).line +
      1 +
      (astOffsets.get(ast) ?? fallback)
    );
  }
  function inspectOptions(input, offset, seen = new Set()) {
    const node = resolveConstant(input);
    if (!node || seen.has(node) || !ts.isObjectLiteralExpression(node)) return;
    seen.add(node);
    for (const entry of node.properties) {
      if (ts.isSpreadAssignment(entry))
        inspectOptions(entry.expression, offset, seen);
      else if (
        (ts.isPropertyAssignment(entry) ||
          ts.isShorthandPropertyAssignment(entry)) &&
        propName(entry.name) === "template"
      ) {
        const value = ts.isPropertyAssignment(entry)
          ? resolveConstant(entry.initializer)
          : resolveConstant(entry.name);
        if (
          value?.kind === ts.SyntaxKind.NullKeyword ||
          value?.kind === ts.SyntaxKind.FalseKeyword ||
          (value &&
            ts.isIdentifier(value) &&
            value.text === "undefined" &&
            !lookup(value.text, scopeOf(value)))
        )
          continue;
        if (!templateProperties.has(entry)) {
          templateProperties.add(entry);
          add(
            "RUNTIME_TEMPLATE",
            "A Vue runtime template option is forbidden; use a precompiled SFC.",
            scriptLine(entry, offset),
          );
        }
      }
    }
  }
  function jsScan(ast, lineOffset) {
    function visit(node) {
      const line = scriptLine(node, lineOffset);
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
            (ts.isIdentifier(callee) &&
              callee.text === "require" &&
              !lookup("require", scopeOf(callee)))) &&
          node.arguments[0]
        ) {
          const module = staticValue(node.arguments[0]);
          if (typeof module === "string") imported(module, line);
        }
        if (importedApi(callee, "vue", ["compile"]))
          add(
            "RUNTIME_TEMPLATE",
            "Runtime template compilation is forbidden; use precompiled SFCs.",
            line,
          );
        if (
          importedApi(callee, "vue", [
            "defineComponent",
            "createApp",
            "createSSRApp",
          ]) ||
          (ts.isIdentifier(callee) &&
            callee.text === "defineOptions" &&
            !lookup(callee.text, scopeOf(callee)))
        )
          inspectOptions(node.arguments[0], lineOffset);
        if (browserDialog(callee))
          add(
            "BROWSER_DIALOG",
            "Use an accessible package dialog or local feedback instead of a browser dialog.",
            line,
          );
      }
      if (sfc && ts.isExportAssignment(node) && !node.isExportEquals)
        inspectOptions(node.expression, lineOffset);
      if (
        (ts.isPropertyAccessExpression(node) ||
          ts.isElementAccessExpression(node)) &&
        ((ts.isIdentifier(node.expression) &&
          node.expression.text === "PartnerUI" &&
          !lookup("PartnerUI", scopeOf(node.expression))) ||
          (globalObject(node.expression) && property(node) === "PartnerUI"))
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
  const namedColors = new Set(
    "aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen".split(
      " ",
    ),
  );
  function scanCss(text, offset, inline = false) {
    let result;
    let root;
    try {
      result = compileStyle({
        source: inline ? `.feature-inline{${text}}` : text,
        filename: file,
        id: "feature-rules",
        trim: false,
      });
      if (!result.errors.length) root = result.rawResult?.root;
    } catch (error) {
      add(
        "CSS_PARSE",
        error.reason ?? error.message,
        offset + (error.line ?? 1),
      );
      return;
    }
    for (const error of result.errors)
      add(
        "CSS_PARSE",
        error.reason ?? error.message,
        offset + (error.line ?? 1),
      );
    root?.walkRules((rule) => {
      if (inline) return;
      const selector = rule.selector
        .replace(/\/\*[\s\S]*?\*\//g, "")
        // class attribute values are selector syntax, unlike data-note strings.
        .replace(
          /\[\s*class\s*[~|^$*]?=\s*(?:"([^"]*)"|'([^']*)'|([^\]\s]+))\s*(?:[is]\s*)?\]/gi,
          (_match, double, single, bare) =>
            (double ?? single ?? bare)
              .split(/\s+/)
              .filter(Boolean)
              .map((name) => "." + name)
              .join(""),
        )
        .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "");
      // CSS has already been parsed; inspect class tokens and combinators, not arbitrary file text.
      const internal = /\.(?:wb|tr)-[\w-]*/.test(selector);
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
    root?.walkDecls((declaration) => {
      const line = offset + (declaration.source?.start?.line ?? 1);
      if (declaration.important)
        add("IMPORTANT", "!important is forbidden in feature CSS.", line);
      const value = cleanCssValue(declaration.value);
      const colorProperty =
        /(?:color|fill|stroke)$|^(?:background(?:-image)?|border(?:-(?:top|right|bottom|left|block|inline))?|outline|box-shadow|text-shadow|text-decoration|text-emphasis|column-rule|filter)$|^--/i.test(
          declaration.prop,
        );
      const named =
        colorProperty &&
        (value.replace(/--[\w-]+/g, "").match(/\b[a-z]+\b/gi) ?? []).some(
          (word) => namedColors.has(word.toLowerCase()),
        );
      if (
        named ||
        /(?:^|[^\w-])#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\s*\(/i.test(
          value,
        )
      )
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
  function scanBoundStyle(input, line, seen = new Set()) {
    const node = resolveConstant(input);
    if (!node || seen.has(node)) return;
    seen.add(node);
    if (ts.isStringLiteralLike(node)) scanCss(node.text, line - 1, true);
    else if (ts.isArrayLiteralExpression(node))
      for (const element of node.elements) scanBoundStyle(element, line, seen);
    else if (ts.isObjectLiteralExpression(node))
      for (const entry of node.properties) {
        if (ts.isSpreadAssignment(entry))
          scanBoundStyle(entry.expression, line, seen);
        else if (
          ts.isPropertyAssignment(entry) ||
          ts.isShorthandPropertyAssignment(entry)
        ) {
          const name = propName(entry.name);
          const value = staticValue(
            ts.isPropertyAssignment(entry) ? entry.initializer : entry.name,
          );
          if (
            name &&
            (typeof value === "string" || typeof value === "number")
          ) {
            const property = name.replace(
              /[A-Z]/g,
              (letter) => "-" + letter.toLowerCase(),
            );
            const css =
              typeof value === "number" &&
              /^(?:margin|padding|gap|row-gap|column-gap)/.test(property)
                ? value + "px"
                : value;
            scanCss(`${property}:${css}`, line - 1, true);
          }
        }
      }
  }
  const templateScopes = new WeakMap();
  const templateAsts = new WeakMap();
  function templateBinding(pattern, scope) {
    const text = pattern.trim().replace(/^\(([\s\S]*)\)$/, "$1");
    const ast = ts.createSourceFile(
      "binding.ts",
      `(${text}) => {}`,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const arrow = unwrap(ast.statements[0]?.expression);
    if (arrow && ts.isArrowFunction(arrow))
      for (const parameter of arrow.parameters)
        bindingNames(parameter.name, scope);
  }
  function prepareTemplate(node, parentScope = moduleScope) {
    let scope = parentScope;
    if (node.type === 1) {
      for (const prop of node.props) {
        if (prop.type !== 7 || !prop.exp) continue;
        let pattern;
        if (prop.name === "for")
          pattern = prop.exp.content.split(/\s+(?:in|of)\s+/, 1)[0];
        if (prop.name === "slot") pattern = prop.exp.content;
        if (pattern) {
          if (scope === parentScope) scope = childScope(parentScope);
          templateBinding(pattern, scope);
        }
      }
      for (const prop of node.props)
        if (prop.type === 7 && prop.exp)
          prepareExpression(
            prop,
            prop.exp.content,
            prop.loc.start.line - 1,
            scope,
          );
    }
    if (node.type === 5 && node.content?.content)
      prepareExpression(
        node,
        node.content.content,
        node.loc.start.line - 1,
        scope,
      );
    templateScopes.set(node, scope);
    for (const child of node.children ?? []) prepareTemplate(child, scope);
  }
  function prepareExpression(owner, text, offset, scope) {
    const ast = ts.createSourceFile(
      "template-expression.ts",
      text,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    astOffsets.set(ast, offset);
    indexTree(ast, childScope(scope));
    indexWrites(ast);
    templateAsts.set(owner, ast);
  }
  function isIcon(tag, scope) {
    const local = tag.includes("-")
      ? tag.replace(/(?:^|-)(\w)/g, (_match, letter) => letter.toUpperCase())
      : tag;
    const binding = lookup(local, scope);
    if (!binding && iconComponents.test(tag)) return true;
    const origin = importOrigin(expression(local, scope));
    return (
      origin?.module === "@workbench/ui-vue3" &&
      iconComponents.test(origin.member)
    );
  }
  function visitTemplate(node) {
    const scope = templateScopes.get(node) ?? moduleScope;
    if (node.type === 1) {
      for (const prop of node.props) {
        const line = prop.loc.start.line;
        if (prop.type === 6 && prop.name === "style" && prop.value)
          scanCss(prop.value.content, line - 1, true);
        if (
          prop.type === 7 &&
          prop.name === "html" &&
          !sanitized(expression(prop.exp?.content ?? "", scope))
        )
          add(
            "UNSAFE_HTML",
            "v-html requires DOMPurify output or an immutable, unmodified, lexically traceable sanitized binding; unknown values are not considered safe.",
            line,
          );
        if (
          prop.type === 7 &&
          prop.name === "bind" &&
          prop.arg?.content === "style" &&
          prop.exp
        )
          scanBoundStyle(expression(prop.exp.content, scope), line);
        if (templateAsts.has(prop)) jsScan(templateAsts.get(prop), line - 1);
        if (
          isIcon(node.tag, scope) &&
          ((prop.type === 6 && prop.name === "name") ||
            (prop.type === 7 &&
              prop.name === "bind" &&
              prop.arg?.content === "name"))
        ) {
          const values = prop.type === 6
            ? new Set([prop.value?.content])
            : iconValues(expression(prop.exp?.content ?? "", scope));
          for (const value of values) {
            if (typeof value === "string" && !iconNames.has(value))
              add("ICON_REGISTERED", `Unknown icon name ${JSON.stringify(value)} in the pinned icons.json.`, line);
          }
          if (values.has(undefined) || values.has(unknownIcon))
            add("ICON_DYNAMIC", "Dynamic icon names require a frozen registry-backed mapping with an explicit fallback; static analysis cannot enumerate this expression.", line, "warning");
        }
      }
    }
    if (templateAsts.has(node))
      jsScan(templateAsts.get(node), node.loc.start.line - 1);
    for (const child of node.children ?? []) visitTemplate(child);
  }
  if (template) prepareTemplate(template);
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
  if (args.length === 1 && ["--help", "-h"].includes(args[0])) {
    console.log(
      "Usage: check_vue.mjs <directory> [--icons <icons.json>] [--json]\n       check_vue.mjs --help",
    );
    return;
  }
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
