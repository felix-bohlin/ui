## Guides

Read the guide for the files you're editing:

- `packages/opui/components/AGENTS.md`: the Astro, React, Svelte and Vue components and their type files.
- `src/component-api/AGENTS.md`: the `api.ts` data behind the API tables and anatomy diagrams.
- `src/docs/components/AGENTS.md`: the component docs pages and their examples.

## Characters

- Never use the em dash (U+2014) or the middle dot (U+00B7), in prose, UI text, examples, code, comments, generated labels or commit messages. Use a comma, a slash or parentheses instead.
- `pnpm check-characters`, part of `pnpm check`, fails on them in every tracked or new text file, and `scripts/check-commits.mjs` in commit messages and pull request titles.

## Colors

- Write every color as `oklch()`, never hex, `rgb()`, `hsl()`, `hwb()`, `lab()` or `lch()`, in CSS, scripts, `style` attributes, SVG color attributes and code in Markdown. Relative colors too: `oklch(from var(--x) l c h / 50%)`.
- `pnpm check-colors`, part of `pnpm check`, fails on them in every tracked or new file. It skips comments, tests (which feed other syntaxes to the parsers), generated files, released CHANGELOG entries and the `value` of `<input type="color">`, which HTML only takes as hex.

## Sorting

Always sort and order items in ascending order (ASC) whenever possible. This applies to:

- Lists
- Query results
- Arrays
- Data displays
- Any other sortable content

Use ascending order (lowest to highest, A-Ö, oldest to newest) as the default sorting preference.

## Comments

- Never remove comments unless asked to.
- Never add your own comments unless asked to do so. Only retain comments that are already present in the code.

## Typescript

- ALWAYS prefer inference over explicit types.
- `pnpm lint` fails on `interface` and on annotations a literal already implies. Files that need declaration merging are listed in the `overrides` of `.oxlintrc.json`.

## Commit messages

- ONLY explain what, NOT why.
- `scripts/check-commits.mjs` checks the prefix (`chore`, `docs`, `feat`, `fix`, `refactor` or `revert`), a subject of at most 100 characters and the forbidden characters. It runs as the `commit-msg` hook that `pnpm install` sets up, and on pull requests with their title.

## Changelog and What's new

- Log every user-facing change to the package in `packages/opui/CHANGELOG.md` under the unreleased version heading at the top, `## <version> - Unreleased` (`## 6.0.0 - Unreleased` now, dated by `scripts/release.mjs`), in `Breaking`, `Removed`, `Added`, `Changed` or `Fixed`.
- Entries describe the change since the last release. When you rework something already added or changed in the unreleased version, update that entry instead of adding a `Changed` or `Fixed` one.
- Start the entry with the component name in backticks, e.g. "- `Tabs` take a `variant` prop.", and keep each section sorted by that name: components A to Z, then files and tokens (`theme.css`, `normalize.css`). `tests/unit/changelog.test.ts` checks both, and that the headings are versions from newest to oldest, the first is the package version and its sections come in that order. It also fails when a component an `Added`, `Breaking` or `Changed` entry starts with has no docs page, or its page has no What's new note of that kind.
- For `Added`, `Breaking` and `Changed` entries, add or update a short note for the component page in `src/utils/whats-new.ts`. It renders the What's new callout on the page (a note that starts with `Breaking:` goes in the Migrating from 5.x callout instead), and the New badge in the sidebar when the slug is also in `highlighted`, which follows the rule written next to it.
- Use `html`, `astro`, `react`, `svelte` and `vue` keys when the notes differ per framework (classes vs props). A framework without a note gets no callout or badge.
- Link to the section on the page that documents the change (`<a href="#line">`).
- Keep the notes in sync when a change is reworked, and only remove notes when asked.

## Browser support

- Feature first. The library uses a new HTML or CSS feature as soon as one engine ships it, whichever engine that is, and waits for the others to catch up.
- A failure in one engine never gets a workaround in the component CSS. Mark it as an expected failure with the reason (`failingIn` in `tests/e2e/stress-overlays.ts`, `test.fail` elsewhere), and add a plain-HTML repro to `tests/e2e/engines.spec.ts` when it's a browser bug. When the browser catches up, the test fails with "expected to fail but passed": remove the entry.
- In the component CSS, a fallback is fine only when it costs nothing: an `@supports` block that turns a feature on, with the browser default as the fallback, or a declaration that changes no API and does nothing in the engines that have the feature (like the cap in the Menu's last-resort `@position-try` options). Vendor pseudo-elements that are the only way to style a native control (`::-moz-range-track`, `::-webkit-slider-thumb`) aren't workarounds.
- Any other fallback goes in the compat layer: `packages/opui/css/compat/<component>.css`, one `@layer components.compat` block, imported by `css/compat.css` in ascending order. Every rule sits in `@supports not (<feature>)` for a missing feature, or in an engine gate from `ENGINE_GATES` in `packages/opui/scripts/features.mjs` for a browser bug, with its repro in `tests/e2e/engines.spec.ts`. For an engine the e2e projects don't run (iOS), a `## To check` item in `TODO.md` gives the steps to check it by hand instead. List it in the Compat layer section of `src/docs/guide/browser-support.astro`, and update the engine lists in `tests/e2e/compat.spec.ts`. `tests/unit/compat.test.ts` fails once a fallback's feature is Baseline widely available: remove the fallback.

## TODO.md

- Items and notes follow `.claude/skills/audit/findings-format.md`. That includes notes you add later, such as a `Still open:` answer.
- Every open item starts its notes with `Summary:` and `Recommended:`. The `/todo` page shows the summary as the headline and offers the recommendation with an Accept button. `/todo-triage` adds both to items that lack them; never change an item's headline, the page keys answers on it.
- Answers copied from the `/todo` page (`OPUI_TEST_PAGES=1`) start with "TODO.md with my comments": each answered item's line from `TODO.md`, then `> ` lines with the chosen action (`Explain further`, `Explain further and provide an example`, `Fix`, `Fix with option B`, `Remove issue`) and the comment. `Fix with option B` picks B from the item's `Options:` list. `/todo-answers` applies pasted answers: it adds the `> ` lines under the item in `TODO.md`, does what they ask, and notes the outcome below them (`Fixed:`, `Removed:`, `Explained:`, `Still open:`). The `/todo/done/` page collects answers on fixed items the same way.
- Copy the `> ` lines word for word. The `/todo` page drops a saved answer once it matches the item's last `> ` block, and marks an item with a note after that block as Follow-up.
- `tests/unit/todo.test.ts` checks the format and lists the items that break it: the seven sections of the findings format in order, severity order, `Summary:` then `Recommended:` first, a summary of one sentence and 140 characters at most without paths, a recommendation the page offers, lettered options that agree with it, and no options written inline in a note.

## Testing

- A rule that a script or test enforces is written once, in the check's error message, and the guide keeps one line naming the check. Rules that need judgment stay in prose. `TODO.md` items with a `Replaces:` note name the prose a new check would shrink.
- ALWAYS run `pnpm check` before finishing a change. It runs formatting, linting, CSS declaration order, `browserSupport` lists, component checks, custom property references, forbidden characters, color syntax, type checks, unit tests and the build, which ends by checking the links, anchors and ids in `dist` (`pnpm check-dist`). `pnpm check:fast` runs everything except the build while iterating.
- Component CSS in `packages/opui/css/components/`, `packages/opui/css/compat/` and `packages/opui/core/normalize.css` reads `--ui-*` roles and its own `--_*` properties, never palette steps (`--ui-gray-N`, `--ui-color-N`), Open Props primitives or literal `px`/`rem` lengths. A `--_*` property that its `api.ts` documents as an `input` may default to a length in its `:where()` rule (not in a modifier), and the step of `round()`, `@property` initial values and `/ 1rem` divisors are skipped. `pnpm check-css-vars` fails on each one unless `scripts/css-vars-allowlist.json` lists it, and on allowlist entries that are no longer in the code. To fix one, change the read, then run `node scripts/check-css-vars.mjs --update` to drop its entry. The `history` CI job fails when an allowlist gains an entry (`scripts/check-ratchets.mjs`).
- The build regenerates `public/search-index.json`, the agent skill references in `packages/opui/skills/opui/references` and `packages/opui/tokens.json`. Commit them. When they're stale on a pull request from this repository, CI commits the regenerated files to the branch and runs again; on `main` and on pull requests from forks it fails.
- `tests/unit/released-tokens.json` lists the theme tokens of the last published version. A token from it that disappears from `theme.css` fails the tests until a `Breaking` or `Removed` entry in the CHANGELOG names it. Regenerate it after a release with `pnpm test:record-released` on the tagged commit (see `RELEASING.md`).
- `tests/unit/released-api.json` lists the component props and CSS classes of the last published version. A prop that disappears fails the tests until a `Breaking` or `Removed` entry names both the component and the prop, and a class until one names the class. Regenerate it after a release with `node scripts/released-api.mjs <tag>` (the tag must exist locally).
- `tests/unit/instructions.test.ts` fails when a guide (`AGENTS.md` files, `.claude/agents`, `.claude/skills`) names a file, link or heading that doesn't exist, or cites a line past the end of a file.
- `tests/unit/naming.test.ts` checks prop names, values and defaults against the naming model in `packages/opui/components/AGENTS.md`.
- CSS declarations are sorted alphabetically, in `.css` files and in `<style>` blocks (HTML files included). Private `--_*` properties are sorted too, with `--_motion` first. Run `pnpm sort-css` to fix order.
- `pnpm test` and the docs build fail on `[component-api]` problems: every prop and slot a component exposes must be described in its `api.ts`, and every documented prop, part prop and slot must exist.
- Run `pnpm test:e2e` when a change affects rendering or behavior. It runs visual, accessibility and interaction tests against the fixture pages at `/<framework>/test/<component>` (accessibility on the HTML pages only), theming checks against the `/tests/theming/` stress page, and layout and accessibility checks on every `heroAnatomy` docs page. The fixture pages only exist with `OPUI_TEST_PAGES=1` (`OPUI_TEST_PAGES=1 pnpm dev`, or `pnpm test:e2e:serve`). The specs without screenshots, except `a11y.spec.ts`, also run in the `firefox` and `webkit` projects; with only Chromium installed, pass `--project=light --project=dark`.
- Stress test pages combine many components to show how they play together. Each is an HTML file in `src/stress-tests/` that renders at `/tests/<name>/`, also in `pnpm dev`. Every `<section class="stress" data-example="Name">` gets a visual snapshot and an axe check, and `tests/e2e/stress.spec.ts` checks that the controls in each `[data-size]` row share one control size. Add a file to stress test something new.
- Example themes live in `packages/opui/themes/`. `tests/e2e/themes.spec.ts` opens every stress test page with each of them (`/tests/<name>/?theme=<theme>`) in light and dark mode, and checks axe, control sizes and visual snapshots. A new theme needs CI baselines (the `update-snapshots` label).
- Parity tests render every example in `src/component-examples/` for Astro, React, Svelte, Vue and HTML and compare the markup. Astro output must match the HTML example, and React, Svelte and Vue output must match Astro. One markup snapshot per example lives in `tests/unit/__snapshots__/`; accepted drift is recorded next to it as a `.diff` file per framework.
- NEVER update snapshots, add or change `.diff` files, or edit `tests/e2e/a11y-known-violations.json` to make a failing test pass unless the change is intended. Say so in the commit message when you do.
- When a recorded drift or violation is fixed, the test fails until its `.diff` file or ledger entry is removed. Re-record intended drift with `pnpm test:record-drift` and violations with `pnpm test:e2e:record-a11y`.
- Visual baselines are only generated in CI. Add the `update-snapshots` label to a PR to regenerate them. Never commit screenshots generated locally: the `screenshots` CI job fails when a baseline was last committed by anyone but the bot, and `tests/unit/screenshots.test.ts` fails on a baseline that belongs to no example, block or theme.
