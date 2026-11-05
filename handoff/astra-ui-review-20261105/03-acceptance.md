# 03 · Acceptance

## Job 01 (scenarios demo)

- [ ] `pnpm run check:ui` in `prototype/`: 0 errors (stale-icon error cleared after the job 02 lock upgrade), warnings triaged as described.
- [ ] `pnpm build` passes; `tests/smoke.mjs`, `tests/operations.mjs`, `tests/home-calendar-review.mjs`, `tests/home-role-modal-review.mjs`, and with `OPERATIONS_DESIGN_URL` `tests/operations-design.mjs`, `tests/operations-design-guide.mjs` all PASS.
- [ ] Before/after screenshots for every touched page; `#home/admin` visually unchanged.
- [ ] `CODEX-LOCAL-UPDATE-20261103.md` and the prototype README mention `check:ui`.
- [ ] Committed and pushed to `claude/workbench-canvas-demo-recreation-ob0itx`.

## Job 02 (skill)

- [ ] `skills/partner-ui-review/` with SKILL.md, skill.json, CHANGELOG, README, references (rules, report, ai-handoff), scripts (static, shots, measure, compare).
- [ ] Static rules single-source (shared + generated, or documented side-by-side resolution).
- [ ] Skill lock upgraded for Workbench `20261104.5`; AI UI stays `20261031.1`; `pnpm verify:lock`, `pnpm generate`, `pnpm check:generated` pass.
- [ ] `tests/review.test.mjs` added; `pnpm test`, `pnpm build`, `pnpm package:release` pass (three ZIPs + manifest, local only).
- [ ] **Trial run** on the scenarios demo after job 01, routes: `#home/company-cap`, `#marketing/jmf`, `#sales/marketing-leads`, `#service/home`, `#trade/trade-home`, `#trade/order-detail`, `#operations/oper-dealer-ai` (AI part → handoff), at 1920 and 1185 wide, with crops from `scenarios/<区>/crops/`. Save the report as `partner-workbench-scenarios/review/ui-review-trial-20261105.md` (commit it) and the evidence outside both repos.
- [ ] The trial report finds at least the known open items as component gaps, not as page fixes: FilterChips truncation/pill style, Alert multi-line body, Dropdown primary trigger, dashed add-row button, Timeline layout, Chart right-axis minimum, pedestal `high/*` placeholder icons. Missing any of these means the rules or classification need work.
- [ ] Committed and pushed to `claude/workbench-canvas-demo-recreation-ob0itx` in `partner-ui-skills`.

## Do not

- Publish, upload or push to `main`; open PRs; change component packages, catalog, approvals or Workbench/AI UI repos.
- Silence rules, delete assertions, add skips, or lower thresholds to pass.
- Change `#home/admin` visuals or the operations journey behaviour beyond rule fixes.

## Report back (reply in this format)

```
Job 01: <commit sha> · check:ui <errors>/<warnings> (baseline 9/10) · tests <pass list> · visible changes: <list or none>
Job 02: <commit sha> · skill partner-ui-review <version> · lock workbench <ver> ai-ui <ver> · tests <results> · package:release <zip names>
Trial: <report path> · must-fix N · should-fix N · component gaps N · not verified N
Decisions needed: <list or none>
Problems: <none or details with last 40 lines of any failing output>
```
