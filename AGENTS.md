## Guides

Read the guide for the files you're editing:

- `packages/opui/components/AGENTS.md`: the Astro, React, Svelte and Vue components and their type files.
- `src/component-api/AGENTS.md`: the `api.ts` data behind the API tables and anatomy diagrams.
- `src/docs/components/AGENTS.md`: the component docs pages and their examples.

## Characters

- Never use the em dash (U+2014) or the middle dot (U+00B7), in prose, UI text, examples, code, comments, generated labels or commit messages. Use a comma, a slash or parentheses instead.
- `pnpm check-characters`, part of `pnpm check`, fails on them in every tracked or new text file.

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

- ALWAYS use type over interface unless interface is specifically required.
- ALWAYS prefer inference over explicit types.

## Commit messages

- Use feat, fix, docs, chore, revert, refactor as commit message prefixes.
- Keep it short
- ONLY explain what, NOT why.

## Changelog and What's new

- Log every user-facing change to the package in `packages/opui/CHANGELOG.md` under `## Unreleased`, in `Breaking`, `Removed`, `Added`, `Changed` or `Fixed`.
- Entries describe the change since the last release. When you rework something already added or changed in the unreleased version, update that entry instead of adding a `Changed` or `Fixed` one.
- Start the entry with the component name in backticks, e.g. "- `Tabs` take a `variant` prop.".
- For `Added`, `Breaking` and `Changed` entries, add or update a short note for the component page in `src/utils/whats-new.ts`. It renders the What's new callout on the page, and the New badge in the sidebar when the slug is also in `highlighted`.
- Use `html`, `astro`, `react`, `svelte` and `vue` keys when the notes differ per framework (classes vs props). A framework without a note gets no callout or badge.
- Link to the section on the page that documents the change (`<a href="#line">`).
- Keep the notes in sync when a change is reworked, and only remove notes when asked.

## Browser support

- Chromium is the target. The library uses new CSS as it ships and waits for Firefox and Safari to catch up.
- A failure only in Firefox or WebKit never gets a workaround in the package. Mark it as an expected failure with the reason (`failingIn` in `tests/e2e/stress-overlays.ts`, `test.fail` elsewhere), and add a plain-HTML repro to `tests/e2e/engines.spec.ts` when it's a browser bug. When the browser catches up, the test fails with "expected to fail but passed": remove the entry.
- A fallback is fine only when it costs nothing: an `@supports` block that turns a feature on, with the browser default as the fallback, or a declaration that changes no API and does nothing in Chromium (like the cap in the Menu's last-resort `@position-try` options). Vendor pseudo-elements that are the only way to style a native control (`::-moz-range-track`, `::-webkit-slider-thumb`) aren't workarounds.
- The one kept workaround is the iOS Safari submenu anchor in `menu.css`.

## TODO.md

- Items and notes follow `.claude/skills/audit/findings-format.md`. That includes notes you add later, such as a `Still open:` answer.
- When a note offers more than one fix, write the choices as an `Options:` list with lettered items (`- A (recommended): …`, `- B: …`), never as "do this, or that" in one sentence. The `/todo` page turns the list into a radio group.
- Answers copied from the `/todo` page (`OPUI_TEST_PAGES=1`) start with "TODO.md with my comments": each answered item's line from `TODO.md`, then `> ` lines with the chosen action (`Explain further`, `Explain further and provide an example`, `Fix`, `Fix with option B`, `Remove issue`) and the comment. `Fix with option B` picks B from the item's `Options:` list. Add the `> ` lines under the item in `TODO.md`, do what they ask, and note the outcome below them (`Fixed:`, `Explained:`, `Still open:`). The `/todo/done/` page collects answers on fixed items the same way.

## Testing

- ALWAYS run `pnpm check` before finishing a change. It runs formatting, linting, CSS declaration order, component checks, custom property references, type checks, unit tests and the build. `pnpm check:fast` runs everything except the build while iterating.
- Component CSS in `packages/opui/css/components/` and `packages/opui/core/normalize.css` reads `--ui-*` roles and its own `--_*` properties, never palette steps (`--ui-gray-N`, `--ui-color-N`), Open Props primitives or literal `px`/`rem` lengths. A `--_*` property that its `api.ts` documents as an `input` may default to a length in its `:where()` rule (not in a modifier), and the step of `round()`, `@property` initial values and `/ 1rem` divisors are skipped. `pnpm check-css-vars` fails on each one unless `scripts/css-vars-allowlist.json` lists it, and on allowlist entries that are no longer in the code. The list only shrinks: fix the read, then run `node scripts/check-css-vars.mjs --update` to drop its entry. Never add an entry for new code.
- The build regenerates `public/search-index.json`, the agent skill references in `packages/opui/skills/opui/references` and `packages/opui/tokens.json`. Commit them; CI fails when they're stale.
- `tests/unit/released-tokens.json` lists the theme tokens of the last published version. A token from it that disappears from `theme.css` fails the tests until a `Breaking` or `Removed` entry in the CHANGELOG names it. Update the file after a release.
- CSS declarations are sorted alphabetically, in `.css` files and in `<style>` blocks (HTML files included). Private `--_*` properties are sorted too, with `--_motion` first. Run `pnpm sort-css` to fix order.
- `pnpm test` and the docs build fail on `[component-api]` problems: every prop and slot a component exposes must be described in its `api.ts`, and every documented prop, part prop and slot must exist.
- Run `pnpm test:e2e` when a change affects rendering or behavior. It runs visual, accessibility and interaction tests against the fixture pages at `/<framework>/test/<component>` (accessibility on the HTML pages only), theming checks against the `/tests/theming/` stress page, and layout and accessibility checks on every `heroAnatomy` docs page. The fixture pages only exist with `OPUI_TEST_PAGES=1` (`OPUI_TEST_PAGES=1 pnpm dev`, or `pnpm test:e2e:serve`). The specs without screenshots, except `a11y.spec.ts`, also run in the `firefox` and `webkit` projects; with only Chromium installed, pass `--project=light --project=dark`.
- Stress test pages combine many components to show how they play together. Each is an HTML file in `src/stress-tests/` that renders at `/tests/<name>/`, also in `pnpm dev`. Every `<section class="stress" data-example="Name">` gets a visual snapshot and an axe check, and `tests/e2e/stress.spec.ts` checks that the controls in each `[data-size]` row share one control size. Add a file to stress test something new.
- Example themes live in `packages/opui/themes/`. `tests/e2e/themes.spec.ts` opens every stress test page with each of them (`/tests/<name>/?theme=<theme>`) in light and dark mode, and checks axe, control sizes and visual snapshots. A new theme needs CI baselines (the `update-snapshots` label).
- Parity tests render every example in `src/component-examples/` for Astro, React, Svelte, Vue and HTML and compare the markup. Astro output must match the HTML example, and React, Svelte and Vue output must match Astro. One markup snapshot per example lives in `tests/unit/__snapshots__/`; accepted drift is recorded next to it as a `.diff` file per framework.
- NEVER update snapshots, add or change `.diff` files, or edit `tests/e2e/a11y-known-violations.json` to make a failing test pass unless the change is intended. Say so in the commit message when you do.
- When a recorded drift or violation is fixed, the test fails until its `.diff` file or ledger entry is removed. Re-record intended drift with `pnpm test:record-drift` and violations with `pnpm test:e2e:record-a11y`.
- Visual baselines are only generated in CI. Add the `update-snapshots` label to a PR to regenerate them. Never commit screenshots generated locally.
