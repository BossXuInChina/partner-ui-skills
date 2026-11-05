# Astra 执行包：页面复查技能与 Demo 收尾（2026-11-05）

Two jobs, in this order. Read this file fully, then do `01`, then `02`, then check `03`.

| # | Job | Repo | Result |
|---|---|---|---|
| 01 | Fix the static-rule errors in the scenarios demo and make the rule check a required gate | `partner-workbench-scenarios` | 0 errors from `check_vue.mjs`; check wired into the demo tests and the Codex guide |
| 02 | Build a new skill `partner-ui-review` (universal page review: static rules + rendered measurement + design-crop comparison; hands AI parts to `partner-ai-ui-global-review`) | `partner-ui-skills` | New skill folder, packaged like the other two skills, proven on the scenarios demo |
| 03 | Acceptance checklist for both | — | Report back in the format at the end of `03` |

## Repos and branches

All work happens on the existing branch **`claude/workbench-canvas-demo-recreation-ob0itx`** in each repo. Commit there and push to that branch. **Never push to `main`, never open a PR, never force-push, never rewrite history.**

| Repo | Role here | Notes |
|---|---|---|
| `BossXuInChina/partner-workbench-scenarios` | The demo to polish (`prototype/`, Vue 3 + Vite) and the trial target for the new skill | Design crops in `scenarios/<区>/crops/*.jpg`; `manifest.json` lists page ids |
| `BossXuInChina/partner-ui-skills` | Home of the skills; new skill goes in `skills/partner-ui-review/` | Follow `maintenance.md`; generated files come from `build/consumer-pack.mjs`, never hand-edit them |
| `BossXuInChina/partner-ai-ui-global-review` | Existing AI UI library review skill | Read only. Do not merge it into the new skill; call it for AI parts |
| `BossXuInChina/huawei-partner-workbench-harness` | Workbench source / rules (`AGENTS.md`) | Read only for this task |
| `BossXuInChina/huawei-partner-ai-ui` | AI UI source | Read only for this task |

Toolchain: Node 24.21.0 + pnpm 11.22.0 for the demo (`prototype/package.json` pins them). The skills repo needs Node ≥ 22.13 (see `maintenance.md`). Do not change global Node; use a private copy or a version manager.

## Why this exists

- `skills/partner-ui-vue3/scripts/check_vue.mjs` already has good static rules (`COLOR_LITERAL`, `COMPONENT_CSS`, `IMPORTANT`, `SPACING_GRID`, `ICON_REGISTERED`, `ICON_DYNAMIC`, `IMPORT_BOUNDARY`, `MOCK_BOUNDARY`, `PARTNER_GLOBAL`, `UNSAFE_HTML`, …). Nobody ran it on the scenarios demo, so it shipped with 9 errors.
- Static rules cannot see wrong gaps/padding on screen, incomplete font bundles, or differences from the design. This week those were found only by manual crop comparison (`assets/page-polish-brief-20261104.md`, `assets/shots.cjs`, `assets/compare.py`).
- `partner-ai-ui-global-review` covers the AI UI **library** end to end and is locked to that repo. Page builders need a **consumer-side** review that covers both packages. Keep two skills; the new one delegates AI-library questions to the existing one instead of copying its rules.

## Hard rules (apply to every change)

1. Pages use only the public exports of `@workbench/ui-vue3` and `huawei-partner-ai-ui`. Never style component internals (`.wb-*`, `.partner-ai` descendants, `:deep`, `:global` hacks, `!important`).
2. Colours, spacing, radius, shadows, typography only via `var(--wb-*)` / AI UI semantic tokens. Text you style uses the full font bundle (size + weight + line-height + letter-spacing).
3. Icons only by registered names. No self-drawn SVG.
4. Fix the cause, not the check: do not weaken rules, raise thresholds, delete assertions or add ignore lists to get green. A rule exception needs a written reason and the user's approval.
5. Do not change the two component packages, the catalog, or approvals. If a fix needs a component change, list it as a gap instead.
6. Keep existing behaviour and the human-reviewed homepage (`#home/admin`) unchanged unless a rule fix requires it; re-run its tests.
7. No publishing, registry upload or release; `pnpm package:release` only builds local archives.

## Files in this pack

- `01-polish-demo.md` — exact errors, how to fix each, how to wire the gate.
- `02-build-review-skill.md` — skill spec: layout, SKILL.md outline, scripts, rules, report format.
- `03-acceptance.md` — what must pass, trial run, report template.
- `assets/shots.cjs`, `assets/compare.py` — screenshot and side-by-side helpers used this week (starting point for the skill scripts).
- `assets/page-polish-brief-20261104.md` — the agent brief used for this week's polish (source of the visual rules).
