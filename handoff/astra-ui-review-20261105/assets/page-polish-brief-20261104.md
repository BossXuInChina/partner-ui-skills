# Demo polish brief (shared by all batch agents)

Goal: make each assigned demo page match its original design crop as closely as possible, using ONLY the public `@workbench/ui-vue3` package (components + approved Blocks). You are polishing an interactive Vue 3 demo, not writing production code.

## Paths and tools
- Demo app: `/home/user/partner-workbench-scenarios/prototype` (Vue 3 + Vite). Pages in `src/app/pages/<area>/`, shared demo blocks in `src/app/blocks/`, shell in `src/app/shell/`, routes in `src/app/scenarios.js` (hash `#<scenario>/<pageId>`).
- Design crops: `/home/user/partner-workbench-scenarios/scenarios/<区>/crops/<pageId>.jpg` (1920-wide screenshots of the original design). The `manifest.json` next to them lists page ids/titles.
- Node: always `export PATH=/opt/node24/bin:$PATH` first.
- Start YOUR OWN dev server on your assigned port: `cd /home/user/partner-workbench-scenarios/prototype && (nohup pnpm dev --port <PORT> --host 127.0.0.1 > /tmp/claude-0/-home-user/7fea9904-dd47-5333-9258-3270175073e3/scratchpad/agents/dev-<PORT>.log 2>&1 &)`; wait until `curl -s http://127.0.0.1:<PORT>/` answers. Kill only your own server at the end (`pkill -f "port <PORT>"`).
- Screenshots: `cd /tmp && NODE_PATH=/opt/node22/lib/node_modules node /tmp/claude-0/-home-user/7fea9904-dd47-5333-9258-3270175073e3/scratchpad/agents/shots.cjs <PORT> <outDir> home/news sales/customer-list ...` (prints console errors / Vue warnings per route — these must be 0).
- Side by side: `python3 /tmp/claude-0/-home-user/7fea9904-dd47-5333-9258-3270175073e3/scratchpad/agents/compare.py <crop.jpg> <shot.png> <out.png> [y0 y1]` then Read the out.png. Use the y-band arguments to zoom into a section (values in 1920-px space). Look at details: spacing, font size/weight, colours, alignment, which component is used, missing/extra elements.
- Put your scratch files under `/tmp/claude-0/-home-user/7fea9904-dd47-5333-9258-3270175073e3/scratchpad/agents/<batch>/`.

## Hard rules
1. Use only public exports of `@workbench/ui-vue3` (see `node_modules/@workbench/ui-vue3/dist/index.d.ts`). Approved Blocks you should prefer where the design matches: `WorkbenchTabsHeader` (card tab header, rail style, corner badges, `#extra` slot), `WorkbenchMoreAction` (right-side "更多 >" drill-down), `WorkbenchFilterChips` (wrapping single-select chips), `WorkbenchExpandCard`, `WorkbenchPolicyLinks`, `WorkbenchInfoList`, `WorkbenchCertificationDetails`, `WorkbenchEventCalendar`, Card blocks (`WorkbenchMetricCard`, `WorkbenchInformationCard`, `WorkbenchMediaCard`, `WorkbenchQuickAppCard`), `WorkbenchChart` (bar/line/area/bar-horizontal/donut/pie/gauge/radar).
2. Never restyle component internals (no CSS targeting `.wb-*` internal classes to change a component's look, no `:deep`, no overriding component padding/colours). Layout of YOUR page (grid, gaps, widths, margins between components) is fine.
3. Styles: tokens only — `var(--wb-*)` (Foundation in `node_modules/@workbench/ui-vue3/dist/styles.css`). No hard-coded colours. Prefer spacing/typography tokens over px. Use complete font bundles (size + weight + line-height + letter-spacing) for text you style.
4. Icons: only registered names via `WorkbenchIcon` / `WorkbenchPedestalIcon` (search names in `node_modules/@workbench/ui-vue3/dist/` icon index). Never draw SVG yourself. Icon buttons have no container by default; text buttons keep their container unless they are header drill-downs (`text-layout="inline"`, or just use `WorkbenchMoreAction`).
5. Cards: the demo `SectionCard` (`src/app/blocks/SectionCard.vue`) already uses Card padding 20px top/bottom, 24px left/right; its `more` prop renders `WorkbenchMoreAction`. Do NOT edit shared files in `src/app/blocks/`, `src/app/shell/`, `src/app/scenarios.js`, `src/app/router.js`, `legacyPages.json`, or any page outside your batch. If a shared change is needed, describe it in your report instead.
6. Pages listed in `src/app/legacyPages.json` are "暂无新版" (no new design): leave them as legacy placeholders. Navigation boards (`*-navigation`) show the top-nav mega menu over the area home — do not hand-draw menus.
7. Do not invent features that are not in the crop; keep existing interactions working (tabs switch, links route, dialogs open). Sample data may differ from the crop but should look plausible and similar in length.
8. Do NOT run `pnpm build`, do NOT run git commit/push/stash/reset/checkout, do NOT touch the Workbench repo (`/home/user/huawei-partner-workbench-harness`). Other agents are editing other pages in the same working tree at the same time.
9. Before finishing, run the demo tests that use their own server (safe in parallel): `cd /home/user/partner-workbench-scenarios/prototype && node tests/smoke.mjs && node tests/operations.mjs` (with node24 on PATH). They must print `PASS:`. If one fails because of your change, fix it; if it fails for an unrelated reason, report it.

## Report (final message, concise)

Checks before you finish (2026-11-06): run `pnpm run check:ui` in `prototype/` and report its error/warning counts, together with the six required tests documented in the prototype README. A stale-source error remains a failing gate; do not suppress it. Use the current host toolchain and evidence paths instead of the historical machine paths above.

- Per page: what you changed (1 line each), and remaining differences you could not fix and why (e.g. needs a component change).
- Files you edited (full paths).
- Console errors after your changes (must be 0) and test results.
- Any shared-file or component change you recommend.
