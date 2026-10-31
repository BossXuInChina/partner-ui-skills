import { createApp } from "vue";
import "@workbench/ui-vue3/styles.css";
import "@opentiny/tiny-robot/dist/style.css";
import "huawei-partner-ai-ui/styles.css";
import "./style.css";
import catalog from "gallery:catalog";
import examples from "gallery:examples";

const app = document.querySelector("#app");
const el = (tag, text, cls) => {
  const n = document.createElement(tag);
  if (text != null) n.textContent = text;
  if (cls) n.className = cls;
  return n;
};
const show = (v) =>
  v === null || v === undefined
    ? "未知：包内未声明"
    : typeof v === "string"
      ? v
      : JSON.stringify(v, null, 2);
const add = (parent, tag, text, cls) => {
  const n = el(tag, text, cls);
  if (
    (parent.classList.contains("panel") || parent.classList.contains("case")) &&
    ["h3", "h4", "p", "pre", "table"].includes(tag)
  )
    n.classList.add("gallery-content-" + tag);
  parent.append(n);
  return n;
};
const reason = (list) =>
  (list ?? [])
    .map((x) => `${x.code ?? "unknown"}：${x.reason ?? show(x)}`)
    .join("；");
const qualificationText = (q) =>
  `成熟度：${q.status?.maturity ?? "未声明"} · 交付：${q.status?.deliveryEligibility ?? "未声明"} · 目标生产资格：${q.targetProductionEligible ?? "未声明"}`;
const heading = add(app, "header", null, "top");
add(heading, "div", "PARTNER UI / COMPONENT LIBRARY", "eyebrow");
add(heading, "h1", "组件图库");
add(heading, "p", "浏览和选型 · 内部演示，不能替代 Studio 调参或生产批准。");
const shell = add(app, "div", null, "shell");
const side = add(shell, "aside", null, "side");
const main = add(shell, "main", null, "main");
const searchLabel = add(side, "label", "搜索组件");
const search = el("input");
search.type = "search";
search.placeholder = "名称、ID 或 API";
searchLabel.append(search);
const sourceLabel = add(side, "label", "来源");
const source = el("select");
sourceLabel.append(source);
for (const [v, t] of [
  ["", "全部来源"],
  ["@workbench/ui-vue3", "Workbench"],
  ["huawei-partner-ai-ui", "AI UI"],
]) {
  const o = el("option", t);
  o.value = v;
  source.append(o);
}
const kindLabel = add(side, "label", "类型");
const kind = el("select");
kindLabel.append(kind);
for (const v of ["", ...new Set(catalog.map((x) => x.kind))]) {
  const o = el("option", v || "全部类型");
  o.value = v;
  kind.append(o);
}
const count = add(side, "p", null, "count");
const nav = add(side, "nav");
nav.setAttribute("aria-label", "组件列表");
let selected = catalog[0],
  tab = 0,
  mounted = null,
  serial = 0;
const tabs = ["组件预览", "变体与状态", "使用场景", "使用规范与API"];
function apiNames(item) {
  return [
    Object.keys(item.props),
    item.events,
    item.slots,
    item.slotPatterns.map((p) => p.prefix ?? p.expression ?? ""),
    item.family.flatMap((f) => [
      f.publicImport?.exportName ?? "",
      Object.keys(f.props ?? {}),
      f.events ?? [],
      f.slots ?? [],
    ]),
  ]
    .flat(Infinity)
    .join(" ");
}
function list() {
  nav.replaceChildren();
  const q = search.value.toLowerCase().trim();
  const found = catalog.filter(
    (x) =>
      (!source.value || x.source === source.value) &&
      (!kind.value || x.kind === kind.value) &&
      (!q ||
        `${x.label} ${x.id} ${x.publicImport?.exportName ?? ""} ${apiNames(x)}`
          .toLowerCase()
          .includes(q)),
  );
  count.textContent = `${found.length} / ${catalog.length} 条资产`;
  const next = found.includes(selected) ? selected : (found[0] ?? null);
  const changed = next !== selected;
  selected = next;
  if (changed) {
    tab = 0;
    render();
  }
  if (!found.length) add(nav, "p", "没有匹配的资产。", "muted");
  for (const item of found) {
    const b = add(nav, "button", null, "item");
    b.type = "button";
    b.dataset.assetId = item.id;
    b.setAttribute("aria-current", item === selected ? "true" : "false");
    add(b, "strong", item.label);
    add(
      b,
      "small",
      item.source === "@workbench/ui-vue3" ? "WORKBENCH" : "AI UI",
    );
    b.onclick = () => {
      if (selected !== item) {
        selected = item;
        tab = 0;
        render();
      }
      list();
    };
  }
}
function paragraphs(parent, values) {
  for (const x of values ?? [])
    add(parent, "p", typeof x === "string" ? x : show(x));
}
function render() {
  if (mounted) {
    mounted.unmount();
    mounted = null;
  }
  const current = ++serial;
  main.replaceChildren();
  const a = selected;
  if (!a) {
    add(main, "p", "没有匹配的资产，请调整筛选条件。");
    return;
  }
  add(
    main,
    "div",
    a.source === "@workbench/ui-vue3" ? "WORKBENCH" : "AI UI",
    "eyebrow",
  );
  add(main, "h2", a.label, "gallery-title");
  add(
    main,
    "p",
    a.summary ?? "简介：包内未声明，可在 Studio 查看。",
    "summary",
  );
  const meta = add(main, "div", null, "meta");
  add(meta, "span", `${a.source}@${a.version}`);
  add(meta, "span", `Commit ${a.commit}`);
  add(meta, "span", `构建日期 ${a.buildDate}`);
  add(meta, "span", qualificationText(a.qualification));
  if (a.studio) {
    const link = add(main, "a", "Open in Studio ↗", "studio");
    link.href = a.studio;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else add(main, "p", "Studio 地址未知：包内未声明路由。");
  const bar = add(main, "div", null, "tabs");
  bar.setAttribute("role", "tablist");
  const body = add(main, "section", null, "panel");
  body.id = "gallery-panel";
  body.setAttribute("role", "tabpanel");
  body.setAttribute("aria-labelledby", `gallery-tab-${tab}`);
  for (let i = 0; i < tabs.length; i++) {
    const b = add(bar, "button", tabs[i]);
    b.type = "button";
    b.setAttribute("role", "tab");
    b.id = `gallery-tab-${i}`;
    b.setAttribute("aria-selected", String(i === tab));
    b.setAttribute("aria-controls", "gallery-panel");
    b.tabIndex = i === tab ? 0 : -1;
    b.onclick = () => {
      tab = i;
      render();
      main.querySelectorAll("[role=tab]")[tab].focus();
    };
    b.onkeydown = (e) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      tab =
        e.key === "Home"
          ? 0
          : e.key === "End"
            ? tabs.length - 1
            : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) %
              tabs.length;
      render();
      main.querySelectorAll("[role=tab]")[tab].focus();
    };
  }
  if (tab === 0) {
    add(body, "h3", "组件预览");
    if (a.preview) {
      add(body, "p", a.previewTitle);
      const stage = add(body, "div", null, "stage");
      stage.dataset.previewState = "loading";
      add(body, "p", a.previewBoundary, "muted");
      examples[a.id]()
        .then((m) => {
          if (current !== serial) return;
          mounted = createApp(m.default);
          mounted.mount(stage);
          stage.dataset.previewState = "ready";
        })
        .catch((error) => {
          stage.dataset.previewState = "error";
          stage.textContent = "官方示例无法加载，请在 Studio 中查看。";
          console.error("Gallery preview failed:", error);
        });
    } else
      add(
        body,
        "p",
        "包内没有可在此安全预编译的可移植官方示例，请在 Studio 中查看。",
      );
  }
  if (tab === 1) {
    add(body, "h3", "变体与状态");
    add(body, "p", "案例记录来自 Studio；controls 不等同于组件 props。");
    if (!a.cases.length) add(body, "p", "案例未知：包内未声明。");
    for (const c of a.cases) {
      const card = add(body, "article", null, "case");
      add(card, "h4", c.label ?? c.id);
      add(
        card,
        "p",
        `分组：${c.group ?? "未知：包内未声明"} · props：${c.propsStatus ?? (c.props == null ? "not-derived" : "已声明")}`,
      );
      if (c.props != null) add(card, "pre", show(c.props));
      else
        add(
          card,
          "p",
          `props 未推导：${reason(c.unsupported) || "包内未提供可序列化的 props"}`,
        );
      if (c.controls) add(card, "pre", `Studio controls\n${show(c.controls)}`);
    }
  }
  if (tab === 2) {
    add(body, "h3", "使用场景");
    if (!a.useWhen.length && !a.avoidWhen.length && !a.usage)
      add(body, "p", "使用场景未知：包内未声明。");
    if (a.useWhen.length) {
      add(body, "h4", "适用");
      paragraphs(body, a.useWhen);
    }
    if (a.avoidWhen.length) {
      add(body, "h4", "避免");
      paragraphs(body, a.avoidWhen);
    }
    if (a.usage) {
      paragraphs(body, [a.usage.intro].filter(Boolean));
      for (const s of a.usage.sections ?? []) {
        add(body, "h4", s.title);
        paragraphs(body, s.paragraphs);
        paragraphs(body, s.bullets);
      }
    }
  }
  if (tab === 3) {
    add(body, "h3", "使用规范与API");
    for (const r of a.rules) {
      add(body, "h4", r.title);
      add(body, "p", r.text);
    }
    add(body, "h4", `公开入口 ${a.publicImport?.exportName ?? "未知"}`);
    const scroll = add(body, "div", null, "gallery-api-scroll");
    scroll.setAttribute("role", "region");
    scroll.setAttribute("aria-label", `${a.label} API 表格`);
    scroll.tabIndex = 0;
    const table = add(scroll, "table", null, "gallery-content-table");
    add(table, "caption", `${a.label} Props`);
    const head = add(table, "tr");
    for (const h of ["Prop", "类型", "默认值", "必填 / 可选值"]) {
      const th = add(head, "th", h);
      th.scope = "col";
    }
    for (const [name, p] of Object.entries(a.props)) {
      const tr = add(table, "tr");
      for (const v of [
        name,
        show(p.type),
        Object.hasOwn(p, "default") ? show(p.default) : "未知：包内未声明",
        `${p.required ? "必填" : "未声明必填"}${p.enum ? " · " + show(p.enum) : ""}`,
      ])
        add(tr, "td", v);
    }
    if (!Object.keys(a.props).length) add(body, "p", "Props 未声明。");
    if (a.unsupported.length) {
      const details = add(body, "details", null, "gallery-fact-notes");
      add(details, "summary", "未提供字段的原因");
      add(details, "pre", reason(a.unsupported), "gallery-content-pre");
    }
    for (const [title, items] of [
      ["Events", a.events],
      ["Slots", a.slots],
      ["Slot patterns", a.slotPatterns],
      ["同族导出", a.family],
    ]) {
      add(body, "h4", title);
      add(body, "pre", items.length ? show(items) : "包内未声明。");
    }
    if (Object.keys(a.eventDetails).length)
      add(body, "pre", show(a.eventDetails));
    if (Object.keys(a.slotDetails).length)
      add(body, "pre", show(a.slotDetails));
  }
}
search.oninput = list;
source.onchange = list;
kind.onchange = list;
list();
render();
