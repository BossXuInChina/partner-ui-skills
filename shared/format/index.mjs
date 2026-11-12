const wbName = "@workbench/ui-vue3";
const aiName = "huawei-partner-ai-ui";
const columns = ["组件预览", "变体与状态", "使用场景", "使用规范与API"];
const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const entries = (value) =>
  Object.entries(value ?? {}).sort(([a], [b]) => compare(a, b));
const string = (value) =>
  typeof value === "string" ? value : (JSON.stringify(value) ?? "");
const inline = (value) => string(value).replace(/[\r\n]+/g, " ");
const cell = (value) => inline(value).replaceAll("|", "\\|");
const tick = (value) => {
  const text = inline(value);
  const mark = "`".repeat(
    Math.max(
      1,
      ...[...text.matchAll(/`+/g)].map((match) => match[0].length + 1),
    ),
  );
  return mark + (/^`|`$/.test(text) ? " " + text + " " : text) + mark;
};

function revision(pkg) {
  return pkg.sourceCommit ?? pkg.metadata?.release?.sourceCommit ?? "unknown";
}
function label(pkg) {
  return `${pkg.name}@${pkg.version} (${revision(pkg)})`;
}
function provenance(packages) {
  return `Generated from ${packages.map(label).join("; ")} — do not edit.`;
}
function header(packages) {
  return "<!-- " + provenance(packages) + " -->";
}
function fence(code, language = "") {
  const runs = [...string(code).matchAll(/`+/g)].map(
    (match) => match[0].length,
  );
  const mark = "`".repeat(Math.max(3, ...runs.map((length) => length + 1)));
  return `${mark}${language}\n${string(code)}\n${mark}`;
}
function table(headings, rows) {
  return [
    "| " + headings.map(cell).join(" | ") + " |",
    "| " + headings.map(() => "---").join(" | ") + " |",
    ...rows.map((row) => "| " + row.map(cell).join(" | ") + " |"),
  ].join("\n");
}
function qualification(pkg) {
  const release = pkg.metadata?.release ?? {};
  const status = {
    channel: release.channel ?? "unknown",
    stableEligible: release.stableEligible ?? "unknown",
    targetProductionEligible: release.targetProductionEligible ?? "unknown",
  };
  if (pkg.manifest?.workbench?.productionEligible !== undefined)
    status.productionEligible = pkg.manifest.workbench.productionEligible;
  const dirty = release.sourceHasLocalChanges;
  return `包：${tick(pkg.name + "@" + pkg.version)} · commit：${tick(revision(pkg))} · dirty：${dirty === undefined ? "unknown" : string(dirty)}\n\n资格（包内声明）：${Object.entries(
    status,
  )
    .map(([key, value]) => `${key}=${string(value)}`)
    .join("；")}。元数据和示例不授予发布或生产批准。`;
}
function studioURL(route, pkg, bases) {
  if (!route) return null;
  if (
    typeof route !== "string" ||
    !route.startsWith("/") ||
    route.startsWith("//") ||
    /[\\\s]/.test(route) ||
    !(
      (pkg.name === wbName && route.startsWith("/preview/")) ||
      (pkg.name === aiName && route.startsWith("/overview.html"))
    )
  )
    throw new Error("REFERENCE_STUDIO_ROUTE_INVALID");
  const relative = new URL(route, "https://studio.invalid");
  if (
    relative.origin !== "https://studio.invalid" ||
    (pkg.name === wbName
      ? !relative.pathname.startsWith("/preview/")
      : relative.pathname !== "/overview.html")
  )
    throw new Error("REFERENCE_STUDIO_ROUTE_INVALID");
  const base = bases[pkg.name];
  if (!base) return null;
  const url = new URL(base.endsWith("/") ? base : base + "/");
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw new Error("REFERENCE_STUDIO_BASE_INVALID");
  return new URL(route.slice(1), url).href
    .replaceAll("(", "%28")
    .replaceAll(")", "%29");
}
function studioLink(route, pkg, bases, title = "在 Studio 中查看") {
  const url = studioURL(route, pkg, bases);
  return url
    ? `[${title}](${url})`
    : route
      ? `Studio 基址未配置；包内相对路由：${tick(route)}`
      : "包内未提供对应 Studio 路由。";
}
function reasons(value) {
  return (value ?? [])
    .map(
      (item) => `${item.code ?? "unsupported"}：${item.reason ?? string(item)}`,
    )
    .join("；");
}
function description(value) {
  if (typeof value === "string") return value;
  if (!value) return "";
  return Object.values(value).map(string).join("；");
}
function propsTable(contract, notes = {}) {
  const props = entries(contract.props);
  return props.length
    ? table(
        ["名称", "类型", "默认", "可选值", "说明"],
        props.map(([name, prop]) => [
          name + (prop.required ? " *" : ""),
          Array.isArray(prop.type) ? prop.type.join(" | ") : prop.type,
          prop.default === undefined ? "" : string(prop.default),
          (prop.enum ?? []).map(string).join(" / "),
          description(notes[name]),
        ]),
      )
    : "包内未声明 props。";
}
function apiText(contract, usage = {}) {
  const lines = [propsTable(contract, usage.propNotes)];
  if (contract.events?.length)
    lines.push(
      "### Events",
      ...contract.events.map(
        (event) =>
          `- ${tick(event)}${usage.eventNotes?.[event] ? "：" + description(usage.eventNotes[event]) : ""}`,
      ),
    );
  const slots = contract.slots ?? [];
  if (slots.length)
    lines.push(
      "### Slots",
      ...slots.map(
        (slot) =>
          `- ${tick(slot)}${usage.slotNotes?.[slot] ? "：" + description(usage.slotNotes[slot]) : ""}`,
      ),
    );
  if (contract.slotPatterns?.length)
    lines.push(
      "### 动态 Slots",
      ...contract.slotPatterns.map((pattern) =>
        pattern.kind === "prefix"
          ? `- 包内前缀模式：${tick(pattern.prefix + "<key>")}；原表达式：${tick(pattern.expression)}`
          : `- ${tick(pattern.kind ?? "unknown")}；表达式：${tick(pattern.expression)}。包内未解析为确定的公开 slot 名。`,
      ),
    );
  if (contract.exposed?.length)
    lines.push(
      "### 实例成员",
      ...contract.exposed.map(
        (item) => `- ${tick(item.declaration ?? item.name)}`,
      ),
    );
  for (const family of contract.family ?? []) {
    lines.push(
      `### 同族导出：${tick(family.publicImport?.exportName ?? "unknown")}`,
      apiText({ ...family, family: [] }),
    );
  }
  return lines.join("\n\n");
}
function examplesText(asset) {
  const examples = asset?.usageExamples ?? [];
  if (!examples.length)
    return `官方来源 SFC：${asset?.usageStatus ?? "unavailable"}。${reasons(asset?.unsupported) || "包内未提供可移植示例；不以场景源码或手写代码补齐。"}`;
  const status = `官方来源 SFC：${asset?.usageStatus ?? "unknown"}。${reasons(asset?.unsupported)}`;
  return (
    status +
    "\n\n" +
    examples
      .map((example) => {
        const lines = [
          `### 示例：${inline(example.title ?? example.id)}`,
          `id：${tick(example.id)} · portability：${tick(example.portability ?? "unknown")} · owner：${tick(example.source?.ownerAssetId ?? asset.assetId)}`,
        ];
        if (example.description) lines.push(example.description);
        if (example.dataBoundary) lines.push(example.dataBoundary);
        if (
          example.portability === "portable" &&
          typeof example.code === "string"
        )
          lines.push(fence(example.code, "vue"));
        else
          lines.push(
            `unsupported：${reasons(example.unsupported) || "包内未声明可移植 SFC；代码不作为可复用示例展开。"}`,
          );
        return lines.join("\n\n");
      })
      .join("\n\n")
  );
}
function variantsText(asset, pkg, bases) {
  const variants = asset?.variants;
  if (!variants) return "变体元数据不可用；未推断 props 或新增案例。";
  const lines = [
    `状态：${tick(variants.status)}。${variants.caseSemantics ?? "声明值属于 Studio 案例数据，不自动等于公开组件 props。"}`,
    studioLink(asset.studio?.paths?.variants, pkg, bases),
  ];
  if (variants.unsupported?.length)
    lines.push("unsupported：" + reasons(variants.unsupported));
  if (variants.cases?.length) {
    lines.push(
      table(
        ["分组", "案例", "id", "Studio"],
        variants.cases.map((item) => [
          item.group,
          item.label,
          item.id,
          studioLink(
            item.studioPath ?? asset.studio?.paths?.variants,
            pkg,
            bases,
            "案例",
          ),
        ]),
      ),
    );
    lines.push(
      "### Studio 案例值（不是 props 映射）",
      fence(JSON.stringify(variants.cases, null, 2), "json"),
    );
  }
  if (variants.declarations)
    lines.push(
      "### 包内声明",
      fence(JSON.stringify(variants.declarations, null, 2), "json"),
    );
  if (variants.customCaseInventory)
    lines.push(
      "### 定制画廊来源清单（unsupported）",
      fence(JSON.stringify(variants.customCaseInventory, null, 2), "json"),
    );
  return lines.join("\n\n");
}
function rulesText(rules) {
  return rules?.length
    ? rules
        .map((rule) =>
          [
            `### ${inline(rule.title ?? rule.id)}`,
            `id：${tick(rule.id)} · ${inline(rule.strength ?? "unknown")} / ${inline(rule.status ?? "unknown")}`,
            rule.text ?? "",
            rule.when?.length ? "**适用条件**：" + rule.when.join("；") : "",
            rule.references?.length
              ? "**包内引用**：" + string(rule.references)
              : "",
          ]
            .filter(Boolean)
            .join("\n\n"),
        )
        .join("\n\n")
    : "包内未提供规则；不补写设计结论。";
}
function assetPage(pkg, id, contract, asset, bases) {
  const title = asset?.title ?? contract.publicImport?.exportName ?? id;
  const content = [
    header([pkg]),
    `# ${inline(title)} — ${tick(contract.publicImport?.exportName ?? id)}`,
    `资产：${tick(id)} · 类型：${tick(contract.kind)} · 资产合同版本：${tick(contract.version ?? "unknown")}`,
    qualification(pkg),
  ];
  content.push(
    `## ${columns[0]}`,
    studioLink(asset?.studio?.paths?.preview ?? asset?.studioPath, pkg, bases),
    asset?.usage?.intro ?? "",
    `公开入口：${tick(contract.publicImport?.moduleName)} → ${tick(contract.publicImport?.exportName)}`,
  );
  content.push(`## ${columns[1]}`, variantsText(asset, pkg, bases));
  content.push(
    `## ${columns[2]}`,
    studioLink(asset?.studio?.paths?.scenes, pkg, bases),
    "**适用**：" + ((contract.useWhen ?? []).join("；") || "包内未声明。"),
    "**不适用**：" + ((contract.avoidWhen ?? []).join("；") || "包内未声明。"),
    examplesText(asset),
  );
  content.push(
    `## ${columns[3]}`,
    studioLink(asset?.studio?.paths?.usage, pkg, bases),
    apiText(contract, asset?.usage),
    "### 规则",
    rulesText(contract.rules),
  );
  if (contract.dependencies?.length)
    content.push("### 组件依赖", contract.dependencies.map(tick).join("、"));
  if (contract.foundationKeys?.length)
    content.push(
      "### Foundation 引用",
      contract.foundationKeys.map(tick).join("、"),
    );
  for (const section of asset?.usage?.sections ?? [])
    content.push(
      "### " + inline(section.title),
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []).map((item) => "- " + item),
    );
  if (asset?.usage?.related?.length)
    content.push(
      "### 包内关联引用",
      fence(JSON.stringify(asset.usage.related, null, 2), "json"),
    );
  return content.filter(Boolean).join("\n\n") + "\n";
}
function indexPage(pkg, bases) {
  const contracts = pkg.metadata.components?.assets ?? {};
  const usage = pkg.metadata.usage?.assets ?? {};
  return (
    [
      header([pkg]),
      "# Workbench 组件索引",
      qualification(pkg),
      "按资产选择后再读取对应页面；规范与真实参数检查回到 Studio。栏目：" +
        columns.join(" · "),
      table(
        ["资产", "导出", "类型", "适用", "Studio"],
        entries(contracts).map(([id, contract]) => [
          `[${usage[id]?.title ?? id}](${id}.md)`,
          contract.publicImport?.exportName,
          contract.kind,
          (contract.useWhen ?? []).join("；"),
          studioLink(usage[id]?.studioPath, pkg, bases),
        ]),
      ),
    ].join("\n\n") + "\n"
  );
}
function tokensPage(packages) {
  const lines = [header(packages), "# Tokens"];
  for (const pkg of packages) {
    lines.push("## " + tick(pkg.name), qualification(pkg));
    const document = pkg.metadata.tokens;
    if (!document?.tokens) {
      lines.push("tokens.json 不可用；未从源码、CSS 或手写文档推断 Token。");
      continue;
    }
    const rows = document.tokens.flatMap((token) =>
      token.cssVariables?.length
        ? token.cssVariables.map((variable) => [
            token.foundationKey ?? token.name,
            token.kind,
            variable.name,
            variable.values?.light,
            variable.values?.dark,
          ])
        : [
            [
              token.foundationKey ?? token.name,
              token.kind,
              "",
              string(token),
              "",
            ],
          ],
    );
    lines.push(table(["Key", "类别", "CSS 变量", "Light", "Dark"], rows));
  }
  return lines.join("\n\n") + "\n";
}
function iconsPage(pkg) {
  const document = pkg.metadata.icons;
  const lines = [header([pkg]), "# 图标", qualification(pkg)];
  if (!document)
    return (
      lines
        .concat("icons.json 不可用；未猜测图标名称或自绘图标。")
        .join("\n\n") + "\n"
    );
  lines.push(
    `包内图标：${document.iconCount}。完整可检索条目、别名和每项真实调用 props 见 [icons.json](icons.json)。`,
  );
  for (const family of document.families ?? []) {
    lines.push(
      "## " + inline(family.id),
      `数量：${family.iconCount}`,
      table(
        ["导出", "公开 props"],
        (family.components ?? []).map((component) => [
          component.publicImport?.exportName,
          string(component.props),
        ]),
      ),
      fence(JSON.stringify(family.selection, null, 2), "json"),
    );
  }
  return lines.join("\n\n") + "\n";
}
function patternsPage(pkg) {
  const assets = entries(pkg.metadata.components?.assets).filter(
    ([, asset]) => asset.kind === "block" || asset.kind === "pattern",
  );
  const rules = entries(pkg.metadata.components?.supportingRules);
  const lines = [
    header([pkg]),
    "# Blocks 与 Patterns",
    qualification(pkg),
    "以下分类和组合规则直接来自包内组件元数据。",
  ];
  for (const [id, asset] of assets)
    lines.push(
      `## [${id}](workbench/${id}.md)`,
      `类型：${tick(asset.kind)} · 导出：${tick(asset.publicImport?.exportName)}`,
      ...(asset.useWhen ?? []),
      rulesText(asset.rules),
    );
  for (const [id, rule] of rules)
    lines.push(
      "## " + inline(id),
      fence(JSON.stringify(rule, null, 2), "json"),
    );
  if (!assets.length && !rules.length)
    lines.push("包内未提供 Block/Pattern 分类或规则。");
  return lines.join("\n\n") + "\n";
}
function designRulesPage(pkg) {
  const lines = [header([pkg]), "# 设计规则", qualification(pkg)];
  for (const [id, asset] of entries(pkg.metadata.components?.assets))
    lines.push(`## [${id}](workbench/${id}.md)`, rulesText(asset.rules));
  for (const [id, rule] of entries(pkg.metadata.components?.supportingRules))
    lines.push(
      "## " + inline(id),
      fence(JSON.stringify(rule, null, 2), "json"),
    );
  return lines.join("\n\n") + "\n";
}
// Package data is rendered as fenced JSON so absent signatures and structured defaults
// remain distinguishable and arbitrary metadata cannot create Markdown or HTML.
function aiData(value) {
  return fence(JSON.stringify(value, null, 2), "json");
}
function aiText(value) {
  return inline(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("[", "&#91;")
    .replaceAll("]", "&#93;")
    .replaceAll("|", "&#124;");
}
function aiAssetPage(pkg, id, asset, bases) {
  const lines = [
    header([pkg]),
    `# ${aiText(asset.label ?? id)} — ${tick(asset.publicImport?.exportName ?? id)}`,
    qualification(pkg),
    `## ${columns[0]}`,
    studioLink(asset.studioPath, pkg, bases, "Open in Studio"),
    aiData({
      id,
      label: asset.label,
      summary: asset.summary,
      group: asset.group,
      publicImport: asset.publicImport,
      status: asset.status,
      source: asset.source,
      unsupported: asset.unsupported,
    }),
    `## ${columns[1]}`,
    "案例来自包内预览清单；controls 不推导为组件 props。",
    aiData({ caseCoverage: asset.caseCoverage, cases: asset.cases }),
    `## ${columns[2]}`,
    "包内列出预览案例及覆盖范围；不推导额外适用场景或复制示例源码。",
    `## ${columns[3]}`,
    "以下为包内声明；缺失的签名或类型不作推断。",
    aiData({
      props: asset.props,
      events: asset.events,
      eventDetails: asset.eventDetails,
      slots: asset.slots,
      slotDetails: asset.slotDetails,
      exposed: asset.exposed,
    }),
  ];
  return lines.join("\n\n") + "\n";
}
function aiPage(pkg, packages, bases, nested = false) {
  const lines = [header(pkg ? [pkg] : packages), "# Partner AI UI 组件索引"];
  if (!pkg)
    return (
      lines.concat("锁中没有 AI UI 包；组件元数据不可用。").join("\n\n") + "\n"
    );
  lines.push(qualification(pkg));
  if (!pkg.metadata.components)
    lines.push("components.json 不可用；未推断组件 API。");
  else {
    lines.push("栏目：" + columns.join(" · "));
    for (const [id, asset] of entries(pkg.metadata.components.assets)) {
      lines.push(
        `## [${aiText(asset.label ?? id)} — ${aiText(asset.publicImport?.exportName ?? id)}](${nested ? "" : "ai-ui/"}${id}.md)`,
        studioLink(asset.studioPath, pkg, bases, "Open in Studio"),
        aiData({
          id,
          summary: asset.summary,
          group: asset.group,
          status: asset.status,
          source: asset.source,
          unsupported: asset.unsupported,
        }),
      );
    }
    lines.push(
      "## 公开辅助导出（非组件）",
      "签名以包的公开 TypeScript 声明为准；元数据没有提供时不推断。",
      aiData(pkg.metadata.components.publicHelpers ?? []),
    );
  }
  lines.push(
    "## 包入口",
    aiData(pkg.manifest.exports ?? {}),
    "## 锁定依赖",
    aiData({
      dependencies: pkg.manifest.dependencies ?? {},
      peerDependencies: pkg.manifest.peerDependencies ?? {},
    }),
  );
  return lines.join("\n\n") + "\n";
}

// Quick references are additive. Keep the full renderers above unchanged so existing
// paths and their bytes remain compatible. Structured data stays fenced: a quick
// view must not turn a missing signature or Studio control into a public contract.
function quickData(value) {
  // Compact short leaves without minifying a whole contract into one enormous line.
  // Round-trip first to retain JSON.stringify's handling of optional/undefined fields.
  const format = (item, depth = 0) => {
    const compact = JSON.stringify(item);
    if (compact.length <= 120 || item === null || typeof item !== "object") return compact;
    const array = Array.isArray(item);
    const rows = array
      ? item.map((entry) => format(entry, depth + 1))
      : Object.entries(item).map(([key, entry]) => JSON.stringify(key) + ": " + format(entry, depth + 1));
    return (array ? "[" : "{") + "\n" + rows.map((row) => "  ".repeat(depth + 1) + row).join(",\n") +
      "\n" + "  ".repeat(depth) + (array ? "]" : "}");
  };
  return fence(format(JSON.parse(JSON.stringify(value))), "json");
}
function quickExamples(usage, fullReference) {
  const examples = usage?.usageExamples ?? [];
  const selected = examples.find(
    (example) => example.portability === "portable" &&
      typeof example.code === "string" && example.code.trim().length > 0,
  );
  const lines = [
    "## 官方示例",
    `官方来源 SFC 状态：${tick(usage?.usageStatus ?? "unknown")}。仅展开首个可移植示例，不代表全部变体。`,
  ];
  if (selected) {
    lines.push(
      quickData({
        id: selected.id,
        title: selected.title,
        portability: selected.portability,
        source: selected.source,
        description: selected.description,
        dataBoundary: selected.dataBoundary,
        unsupported: selected.unsupported,
      }),
      fence(selected.code, "vue"),
    );
  } else {
    lines.push("包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。");
  }
  const remaining = examples.filter((example) => example !== selected);
  if (remaining.length) {
    lines.push(
      "### 其他官方来源条目（未展开代码）",
      quickData(remaining.map((example) => ({
        id: example.id ?? null,
        portability: example.portability ?? "unknown",
        source: example.source ?? null,
        unsupported: example.unsupported ?? [],
      }))),
      `以上条目的详细信息见[完整资料](<${fullReference}>)。`,
    );
  }
  return lines.join("\n\n");
}
function quickAPI(contract, usage = {}) {
  return quickData({
    publicImport: contract.publicImport ?? null,
    props: contract.props ?? null,
    events: contract.events ?? null,
    eventDetails: contract.eventDetails ?? null,
    slots: contract.slots ?? null,
    slotDetails: contract.slotDetails ?? null,
    slotPatterns: contract.slotPatterns ?? null,
    exposed: contract.exposed ?? null,
    family: contract.family ?? null,
    propNotes: usage.propNotes ?? null,
    eventNotes: usage.eventNotes ?? null,
    slotNotes: usage.slotNotes ?? null,
  });
}
function quickPage(pkg, id, contract, usage, family) {
  const fullReference = `../../${family}/${id}.md`;
  const title = contract.label ?? usage?.title ?? contract.title ?? id;
  const lines = [
    header([pkg]),
    `# ${aiText(title)} — ${tick(contract.publicImport?.exportName ?? id)}`,
    qualification(pkg),
    `完整资料：[${tick(id)}](<${fullReference}>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。`,
    "## 资产与已知边界",
    quickData({
      id,
      kind: contract.kind ?? contract.group ?? null,
      version: contract.version ?? null,
      summary: contract.summary ?? null,
      useWhen: contract.useWhen ?? null,
      avoidWhen: contract.avoidWhen ?? null,
      status: contract.status ?? null,
      source: contract.source ?? null,
      unsupported: contract.unsupported ?? null,
      usageStatus: usage?.usageStatus ?? "unknown",
      usageUnsupported: usage?.unsupported ?? null,
      variantStatus: usage?.variants?.status ?? "unknown",
      variantUnsupported: usage?.variants?.unsupported ?? null,
      caseSemantics: usage?.variants?.caseSemantics ?? null,
    }),
    "## 公开 API",
    "以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。",
    quickAPI(contract, usage?.usage ?? {}),
    "## 规则与适用条件",
    quickData({
      rules: contract.rules ?? null,
      dependencies: contract.dependencies ?? null,
      foundationKeys: contract.foundationKeys ?? null,
      intro: usage?.usage?.intro ?? null,
      sections: usage?.usage?.sections ?? null,
      related: usage?.usage?.related ?? null,
    }),
    quickExamples(usage, fullReference),
  ];
  return lines.join("\n\n") + "\n";
}
function quickEntry(pkg, id, contract, usage, family) {
  return {
    id,
    package: pkg.name,
    name: contract.publicImport?.exportName ?? null,
    label: contract.label ?? usage?.title ?? contract.title ?? id,
    kind: contract.kind ?? contract.group ?? null,
    summary: contract.summary ?? null,
    useWhen: contract.useWhen ?? [],
    avoidWhen: contract.avoidWhen ?? [],
    quickReference: `quick/${family}/${id}.md`,
    reference: `${family}/${id}.md`,
    exampleStatus: usage?.usageStatus ?? "unknown",
    searchAliases: [],
  };
}
// Maintainer search hints (shared/catalog/search-aliases.json) only reach index.json.
// Stale keys fail generation so a package upgrade cannot leave hints pointing nowhere.
function applySearchAliases(quickEntries, searchAliases) {
  if (searchAliases == null) return;
  const aliases = searchAliases.aliases;
  if (!aliases || typeof aliases !== "object" || Array.isArray(aliases))
    throw new Error("REFERENCE_SEARCH_ALIASES_INVALID");
  const byKey = new Map(quickEntries.map((entry) => [entry.package + "/" + entry.id, entry]));
  for (const [key, values] of entries(aliases)) {
    const entry = byKey.get(key);
    if (!entry) throw new Error("REFERENCE_SEARCH_ALIAS_STALE: " + key);
    if (!Array.isArray(values) || values.some((value) => typeof value !== "string" || !value.trim()))
      throw new Error("REFERENCE_SEARCH_ALIASES_INVALID: " + key);
    entry.searchAliases = [...new Set(values.map((value) => value.trim()))];
  }
}

export function generateReferences({ packages, studioBaseURLs = {}, searchAliases } = {}) {
  if (!Array.isArray(packages) || !packages.length)
    throw new Error("REFERENCE_PACKAGES_REQUIRED");
  const ordered = [...packages].sort((a, b) => compare(a.name, b.name));
  if (new Set(ordered.map((pkg) => pkg.name)).size !== ordered.length)
    throw new Error("REFERENCE_PACKAGE_DUPLICATE");
  const wb = ordered.find((pkg) => pkg.name === wbName);
  if (!wb?.metadata.components)
    throw new Error("REFERENCE_WORKBENCH_METADATA_REQUIRED");
  const output = new Map();
  const quickEntries = [];
  output.set("workbench/index.md", indexPage(wb, studioBaseURLs));
  for (const [id, contract] of entries(wb.metadata.components.assets)) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id))
      throw new Error("REFERENCE_ASSET_ID_INVALID");
    output.set(
      `workbench/${id}.md`,
      assetPage(
        wb,
        id,
        contract,
        wb.metadata.usage?.assets?.[id],
        studioBaseURLs,
      ),
    );
    const usage = wb.metadata.usage?.assets?.[id];
    output.set(`quick/workbench/${id}.md`, quickPage(wb, id, contract, usage, "workbench"));
    quickEntries.push(quickEntry(wb, id, contract, usage, "workbench"));
  }
  output.set("tokens.md", tokensPage(ordered));
  output.set("icons.md", iconsPage(wb));
  output.set(
    "icons.json",
    JSON.stringify(
      {
        _generated: provenance([wb]),
        ...(wb.metadata.icons ?? {
          schemaVersion: "1.0",
          status: "unavailable",
          icons: [],
        }),
      },
      null,
      2,
    ) + "\n",
  );
  output.set("patterns.md", patternsPage(wb));
  output.set("design-rules.md", designRulesPage(wb));
  const ai = ordered.find((pkg) => pkg.name === aiName);
  output.set("ai-ui.md", aiPage(ai, ordered, studioBaseURLs));
  if (ai?.metadata.components) {
    for (const [id, asset] of entries(ai.metadata.components.assets)) {
      if (!/^[a-z0-9][a-z0-9-]*$/.test(id))
        throw new Error("REFERENCE_ASSET_ID_INVALID");
      output.set(`ai-ui/${id}.md`, aiAssetPage(ai, id, asset, studioBaseURLs));
      output.set(`quick/ai-ui/${id}.md`, quickPage(ai, id, asset, asset, "ai-ui"));
      quickEntries.push(quickEntry(ai, id, asset, asset, "ai-ui"));
    }
    output.set("ai-ui/index.md", aiPage(ai, ordered, studioBaseURLs, true));
  }
  applySearchAliases(quickEntries, searchAliases);
  output.set("quick/index.json", JSON.stringify({
    _generated: provenance(ordered),
    schemaVersion: 1,
    entries: quickEntries.sort((a, b) => compare(a.package, b.package) || compare(a.id, b.id)),
  }, null, 2) + "\n");
  output.set(
    "sources.json",
    JSON.stringify(
      {
        _generated: provenance(ordered),
        schemaVersion: "1.0",
        studioBaseURLs: Object.fromEntries(entries(studioBaseURLs)),
        packages: ordered.map((pkg) => ({
          name: pkg.name,
          version: pkg.version,
          sourceCommit: revision(pkg),
          sha256: pkg.sha256,
          metadata: Object.keys(pkg.metadata).sort(),
          qualification: pkg.metadata.release ?? null,
        })),
      },
      null,
      2,
    ) + "\n",
  );
  return new Map([...output].sort(([a], [b]) => compare(a, b)));
}
