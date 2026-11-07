# 02 · Build the `partner-ui-review` skill

Repo `partner-ui-skills`, branch `claude/workbench-canvas-demo-recreation-ob0itx`. Read `README.md`, `maintenance.md`, `skills/partner-ui-vue3/SKILL.md` and `build/consumer-pack.mjs` first. The skill must work in any project that consumes the two packages: no machine-specific paths.

## Purpose (put this in the SKILL.md description)

Universal review for pages and feature code that consume `@workbench/ui-vue3` and `huawei-partner-ai-ui` (scenario demos, Vue feature modules, converted prototypes). Finds rule violations in code, wrong spacing / typography / colour on the rendered page, and differences from design crops; reports file:line + screenshots; fixes only when the user asked for fixes. For changes inside the AI UI library itself, use `partner-ai-ui-global-review` instead. Does not trigger for a single obvious tweak.

## Layout

```
skills/partner-ui-review/
  SKILL.md            # workflow below, ≤ ~150 lines, Chinese like the other skills
  skill.json          # name, version 0.1.0, releasePolicy user-decides
  CHANGELOG.md
  README.md           # short human intro + commands
  references/
    rules.md          # rendered-measurement rules with thresholds (see "Rules")
    report.md         # report template
    ai-handoff.md     # when/how to call partner-ai-ui-global-review
  scripts/
    static.mjs        # runs the shared static checker (do not fork the rules)
    shots.mjs         # route screenshots + console errors/Vue warnings (from assets/shots.cjs)
    measure.mjs       # rendered measurement (new, see below)
    compare.py        # design crop vs screenshot side by side, optional y-band zoom (from assets/compare.py)
```

Static rules must stay single-source: move `check_vue.mjs`'s rule engine (or the whole script) into the repo's shared area and let `build/consumer-pack.mjs` distribute it to both `partner-ui-vue3` and `partner-ui-review`, the same way other shared files are distributed. Update `build/generated-files.json` / tests accordingly; generated copies are never hand-edited. If moving it is too invasive, `static.mjs` may resolve `partner-ui-vue3/scripts/check_vue.mjs` when both skills are installed side by side, and fail with a clear message otherwise — document which one you chose and why.

## Workflow (SKILL.md body)

1. **Baseline.** Record repo, HEAD, dirty files, package versions in use (both packages, from the project's lockfile), and the skill's own `source.lock.json`. Warn when the project uses newer packages than the skill's pinned references (icon/API facts may be stale).
2. **Static pass.** `node scripts/static.mjs <project>`; keep the raw output.
3. **Choose routes.** From the user's scope, or a manifest (`scenarios/<区>/manifest.json` page ids → `#<scenario>/<pageId>`), or the app router. Skip legacy placeholders and navigation-only states if the project marks them.
4. **Render pass.** Start the project's own dev server on a free port; `node scripts/shots.mjs` (1920×1080 default, optional extra widths) → screenshots + console errors/Vue warnings; `node scripts/measure.mjs` on the same routes → JSON findings.
5. **Design pass (if crops exist).** `python3 scripts/compare.py <crop> <shot> <out> [y0 y1]`, look section by section (header, filters, cards, tables, dialogs). Only report differences you can see; label each as layout / spacing / typography / colour / component choice / missing / extra / content.
6. **AI parts.** If a route contains `.partner-ai`, report its host-boundary issues here, and hand library-level questions (token chain, package/demo sync, streaming/stop behaviour) to `partner-ai-ui-global-review` per `references/ai-handoff.md`. Do not duplicate its checks.
7. **Classify.** must-fix (rule break, console error, broken interaction) / should-fix (visible design difference fixable in page code) / component gap (needs a package change — list, never hack) / accepted (documented intentional difference).
8. **Fix (only if asked).** Fix page code within scope, re-run the affected passes, never weaken rules.
9. **Report** with `references/report.md`.

## Rules for `measure.mjs` (`references/rules.md`)

Run in the page via Playwright `page.evaluate`. Read the token values from the loaded stylesheet (`getComputedStyle(document.documentElement).getPropertyValue('--wb-…')`) so the rules follow the current package, never hard-code token numbers in the script.

| Id | Check | Default |
|---|---|---|
| R1 SPACING_TOKEN | Padding / gap / margin of page-owned elements (not inside `.wb-*` or `.partner-ai` roots) must equal a spacing token value (`--wb-spacing-*`) or 0 | report others with element path + value |
| R2 CARD_PADDING | Elements that act as cards (page wrapper around content with card surface/radius, or known demo card classes passed via `--card-selector`) use container padding: block = `--wb-spacing-layout-container-block`, inline = `--wb-spacing-layout-container-inline` | allow opt-out list per project for business blocks, with reason |
| R3 FONT_BUNDLE | Text nodes in page-owned elements: computed size/weight/line-height/letter-spacing must match one Foundation font bundle as a set (e.g. body-m = 14/400/22/0). Flag `line-height: normal` and mixed bundles | |
| R4 COLOUR_TOKEN | Computed color / background / border colours of page-owned elements must equal a `--wb-color-*` value (alpha-aware) | ignore images/gradients only when a token is used inside them |
| R5 GRID | Remaining lengths not on a 4px grid (after R1) | warning |
| R6 OVERFLOW | Horizontal page overflow at each width; text clipped by ellipsis where the full text is not available via title/tooltip; elements overlapping other interactive elements | |
| R7 CONSOLE | Any console error, page error or Vue warning | must-fix |
| R8 COMPONENT_OVERRIDE | Rendered package component whose computed padding/colour differs from the same component rendered alone in a blank page (proves a page rule overrides internals) | must-fix |

Output: `{ route, width, rule, severity, selectorPath, file?, expected, actual, screenshotBox }[]`. Map to source file:line when possible (search the class name in `src/`).

## `references/report.md` (template)

```
# UI review · <project> @ <short sha> · <date>
Scope: <routes / files>; widths: <…>; packages: workbench <ver>, ai-ui <ver>; skill lock: <ver>
Summary: must-fix N · should-fix N · component gaps N · accepted N · static errors/warnings N/N
## Must fix            | route | file:line | rule | expected → actual | evidence |
## Should fix          | … |
## Component gaps      | component | needed capability | where seen |
## Accepted / intentional | … | reason |
## Not verified        | what | why |
Evidence folder: <path>
```

## Upgrade the skill lock (needed by job 01's stale icon)

Follow `maintenance.md` "升级一次包": bring `@workbench/ui-vue3` to `0.2.0-prototype.20261104.5` (tarball: `partner-workbench-scenarios/prototype/vendor/workbench-ui-vue3-0.2.0-prototype.20261104.5.tgz`; take the exact source commit from the tarball's publish metadata, do not guess it). **Keep `huawei-partner-ai-ui` at `0.3.1-dev.20261031.1`**: the newer `.operations.12` build comes from an unmerged branch with local changes and is not approved for the skills. Then `pnpm verify:lock`, `pnpm generate`, review the generated diffs (icons now include `ic_public_switchover`), and run the repo tests. Record anything you could not upgrade.

## Tests in `partner-ui-skills`

- Add `tests/review.test.mjs`: unit tests for `measure.mjs` rule functions on fixture DOM (each rule: one pass case, one fail case), and for route discovery from a manifest.
- Add the new skill to `pnpm test`, `build/consumer-pack.mjs` and `build/package-release.mjs` so `pnpm package:release` produces three ZIPs and a manifest.
- `pnpm test`, `pnpm check:generated`, `pnpm verify:lock`, `pnpm build`, `pnpm package:release` must pass.
