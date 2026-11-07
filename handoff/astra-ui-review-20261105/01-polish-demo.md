# 01 · Polish the scenarios demo and add the gate

Repo `partner-workbench-scenarios`, branch `claude/workbench-canvas-demo-recreation-ob0itx`, folder `prototype/`.

## 1. Reproduce

```sh
cd partner-workbench-scenarios/prototype
pnpm install --frozen-lockfile
node ../../partner-ui-skills/skills/partner-ui-vue3/scripts/check_vue.mjs .
```
(Adjust the relative path to where `partner-ui-skills` is cloned.) Baseline on 2026-11-05 at commit `a2006ce`: **83 files, 9 errors, 10 warnings.** Save the full output as evidence before changing anything.

## 2. Fix the 9 errors

| File:line | Rule | What to do |
|---|---|---|
| `src/app/blocks/CenterTabs.vue:16` | COMPONENT_CSS | `.center-tabs > .wb-tabs { width: … }` sets the Tabs width through its class. Put a wrapper `<div class="center-tabs__inner">` around `WorkbenchTabs` and size the wrapper; the tabs fill it. Or replace CenterTabs with `WorkbenchTabsHeader` if the large centred variant matches. Check `#home/company-cap`, `#marketing/jmf`, operations dealer/distributor pages before/after. |
| `src/app/pages/home/HomeLists.vue:134` | COMPONENT_CSS | Same pattern: replace the selector on a package class with a wrapper element owned by the page. |
| `src/app/pages/home/HomeWorkbench.vue:229` | COMPONENT_CSS | Human-reviewed page: fix with a wrapper only, no visual change. Re-run `tests/home-calendar-review.mjs` and `tests/home-role-modal-review.mjs`. |
| `src/app/pages/home/HomeWorkbench.vue:84` | ICON_REGISTERED | `/ic_public_switchover_16px` **is** registered in the current Workbench package (`0.2.0-prototype.20261104.5`) but not in the skill's pinned `references/icons.json` (lock is `20261031.1`). Do **not** change the page; this is a stale skill lock. Record it and fix it in job 02 (lock upgrade), then re-run. |
| `src/app/pages/marketing/MarketingDashboard.vue:155` | COMPONENT_CSS | Wrapper instead of package-class selector. |
| `src/app/pages/sales/SalesDetail.vue:147` | COMPONENT_CSS | Same. This targets the Timeline width (fixed 182px in the component). If a wrapper cannot solve it, revert to the component default and list "Timeline full-width layout" as a component gap. |
| `src/app/pages/sales/SalesWorkspace.vue:106` | COMPONENT_CSS | Wrapper instead of package-class selector. |
| `src/app/pages/trade/blocks/RelatedOrderWorkspace.vue:90` | COMPONENT_CSS | Wrapper instead of package-class selector. |
| `src/app/pages/trade/TransactionList.vue:286` | IMPORTANT | `.transaction-overview.has-side .transaction-metrics { --metric-columns: 3 !important; }` fights an inline style. Compute the column count in the template instead (`:style="{ '--metric-columns': hasSide ? 3 : Math.min(6, metricItems.length) }"`) and delete the rule. |

## 3. Triage the 10 warnings

- `ICON_DYNAMIC` (8): icon names built from data (`MetricTiles.vue:12`, `HomeWorkbench.vue:105,114`, `operations/parts/PgiHeader.vue:21`, `trade/blocks/RecordCard.vue:15`, `trade/extra/TradeServiceOrders.vue:46`, `trade/TransactionFlow.vue:186`, `trade/TransactionList.vue:213`). For each, replace the string building with a small **static map** (`const ICONS = { pending: 'pedestal/rounded-square/low/flow_48px', … }`) so every possible name is a literal the checker can verify. Keep the visible result identical. Note: `pedestal/rounded-square/high/*` are coffee-cup placeholders — never switch to them.
- `SPACING_GRID` (2): `MarketingDashboard.vue:164`, `operations-design/OperationsDesignPage.vue:66` — replace with a 4px-grid token value; if the off-grid value is intentional (matches the crop), keep it and add a one-line comment with the reason.

## 4. Make the check a required gate

1. Add to `prototype/package.json`: `"check:ui": "node scripts/check-ui.mjs"`, where `scripts/check-ui.mjs` locates `check_vue.mjs` (env `PARTNER_UI_SKILLS` → sibling `../partner-ui-skills` → clear error telling the user to set the env var) and runs it on `prototype/`, exiting non-zero on errors. Do **not** copy the checker into the demo.
2. Document it in `prototype/README.md` (or create a short "Checks" section): run `pnpm run check:ui` before every commit, together with `tests/smoke.mjs`, `tests/operations.mjs`, `tests/home-calendar-review.mjs`, `tests/home-role-modal-review.mjs`, and `tests/operations-design.mjs` + `tests/operations-design-guide.mjs` with `OPERATIONS_DESIGN_URL=http://127.0.0.1:<port>/` against a running dev server.
3. Update `CODEX-LOCAL-UPDATE-20261103.md` Step 5 to run `pnpm run check:ui` and report its error/warning counts.
4. Add a "Checks before you finish" line to `assets/page-polish-brief` equivalents you use, pointing to the same command.

## 5. Verify and commit

- `pnpm run check:ui` → 0 errors (the stale-icon error clears after job 02 upgrades the skill lock; until then it is the only allowed error and must be noted).
- `pnpm build` and all six tests above pass; 0 console errors on the routes you touched (`assets/shots.cjs` prints them).
- Before/after screenshots of every page you touched; visible change only where a rule fix forced it (list those).
- Commit message: `Fix static UI rule errors and add check:ui gate`, with the attribution lines your runtime requires. Push to the branch.
