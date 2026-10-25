Severity 1-10, 10 is the most severe.

Findings with a page and section in brackets come from the stress pages in `src/stress-tests/`. Open the section named in brackets to see each one.

## Accessibility

- [ ] (2) Tooltip: the triggers set `commandfor` and `command="toggle-popover"` next to `interestfor`, for touch. So Chromium exposes the trigger as expandable ("collapsed", then "expanded" while the tooltip shows), and Enter on "Save" closes the tooltip while it runs the button's action (`src/component-examples/tooltip/Basics.html:2-9`, `src/docs/components/tooltip.astro:57-61`)
  - Summary: Tooltip triggers read as collapsed or expanded buttons, and Enter on Save runs the action and closes the tooltip at once.
  - Recommended: Fix with option A. Chrome 142 shows interest on long press, so the command pair only adds the expanded state and the double action on Enter.
  - Fix: decide whether the tap fallback is worth the extra state. Without it the trigger is a plain button that gets the tooltip text as its description once `interestfor` is supported. See the Tooltip item in To check for touch.
  > Explain further and provide an example
  - Explained: `Basics` gives Save two ways to open its tooltip. `interestfor` shows it on hover and keyboard focus, and `commandfor` with `command="toggle-popover"` toggles it on a tap, since touch has no hover. The command makes the browser treat Save as a button that opens something: Chromium gives it an expanded state, so a screen reader says "Save, collapsed, button", and "expanded" while the tooltip shows, as if Save opened a menu. And pressing Save does two things: it runs the button's own action and toggles the tooltip. A keyboard user tabs to Save, which shows the tooltip through `interestfor`, then presses Enter, which saves and closes the tooltip again.
    ```html
    <button
      type="button"
      class="ui-button"
      interestfor="tip"
      commandfor="tip"
      command="toggle-popover"
    >
      Save
    </button>
    <span class="ui-anchor-floating" id="tip" popover="hint"
      >Save your changes</span
    >
    ```
    Without `commandfor` and `command` the button is a plain button with the tooltip text as its description, and touch users get no tooltip until browsers open interest invokers on long press.
  - Still open: re-checked on a516e91. The markup is unchanged (`Basics.html:2-9`, `tooltip.astro:58-59,69-72`). The class in the example above is `.ui-floating` now, not `.ui-anchor-floating` (eecf75a).
  - Explained: the touch question is answered now. Chrome 142 shipped `interestfor` with interest on hover, keyboard focus and long press on touchscreens, and a plain-text `popover="hint"` target becomes the trigger's description. So the command pair is only needed where `interestfor` isn't supported, and there the tooltip shows on hover through CSS anyway. Without it the trigger is a plain button with the tooltip as its description, no expanded state, and Enter only saves. Example: tooltip-trigger-command
  - Options:
    - A (recommended): drop `commandfor` and `command="toggle-popover"` from the Tooltip examples and prose in all formats, and say on the Tooltip page that touch shows the tooltip on long press in Chrome 142+.
    - B: keep the tap fallback and its extra state.

## Bugs

---

---

## Docs

## Limitations

## Questions

- [ ] (1) Dialog, Drawer: the two overlays split their regions differently. `DialogHeader` (an `hgroup`) names the Dialog, a `DrawerTitle` `h2` inside `DrawerHeader` names the Drawer. Dialog ends in `DialogActions` (`.ui-actions`, with `align`), Drawer in `DrawerFooter` (`.ui-footer`, no `align`). The drawer title is `--ui-font-size-large` (through `--_header-font-size`), while the Dialog title (`.ui-h4`) follows `--ui-font-size-h4`, so in m3 they're 20px and 28px. Neither spaces the paragraphs in `.ui-content`, which touch in LongContent and the drawer Basics (`src/component-api/dialog/api.ts:20-39`, `src/component-api/drawer/api.ts:52-75`, `packages/opui/css/components/drawer.css:16,66,121-127`, `packages/opui/css/components/callout.css:65-71`)
  - Summary: Dialog and Drawer name their headers, actions and title sizes differently, and paragraphs in their content run together.
  - Recommended: Fix with option A. It gives both overlays the same three low-opinion parts the answer asks for, with `.ui-actions` as a helper wherever buttons go.
  - Fix: Should they share part names, `align` and a heading token? And should `.ui-content` space its children like Callout's, or should the examples wrap their text in `.ui-rich-text`?
  > I honestly think the library should have less opinions about what to put where. XHeader, XContent and XFooter is ideal imo. They can have similar Api otherwise, that should make sense. My point is just that sometimes you don’t want actions there. Or ONLY actions but something custom. There should be a way to merge these ideas.
  - Still open: re-checked on a516e91. `DrawerFooter` is `DrawerActions`, rendering `.ui-actions` with `align` like `DialogActions` (f5977d5, `Drawer/DrawerActions.astro:1-17`). The header split (`DialogHeader` hgroup against `DrawerHeader` plus `DrawerTitle`), the title size (`drawer.css:16,69`) and the unspaced paragraphs in `.ui-content` (`dialog.css:39`, `drawer.css:79`) are unchanged.
  > Thoughts?
  - Explained: agreed, the parts should carry less opinion. A shape that fits both: `XHeader` (`.ui-header`, a flex row holding whatever, a title, a toolbar, a close button), `XContent` (`.ui-content`, the scrolling region) and `XFooter` (`.ui-footer`, a flex row with `align`), the same on Dialog and Drawer. `Actions` stops being a region: `.ui-actions` stays as the layout helper it is on Card and Accordion, usable inside the footer or anywhere else, so a footer can hold only buttons, a status text next to them, or something custom. Both overlays then name themselves through an `XTitle` heading inside the header (Drawer's today), sized by one token (`--_title-font-size`, default `--ui-font-size-h4`), and `.ui-content` spaces block children (`> * + *` margin, like Callout's `--_content-gap`) so pasted paragraphs don't touch. Dialog's `hgroup` header and `DialogActions` go, which is Breaking, and `DrawerActions` (f5977d5) would become `DrawerFooter` again.
  - Options:
    - A (recommended): Header, Content and Footer on both overlays as above, `.ui-actions` as a helper, one title token, content spacing. Breaking for Dialog and Drawer.
    - B: keep today's parts, only align the title size and add the content spacing.
    - C: like A, but keep `XActions` as an alias that renders `.ui-footer.ui-actions` with `align`.
- [ ] (2) Dialog, Drawer: the scroll lock's `scrollbar-gutter: stable` leaves an undimmed strip at the inline end under the modal backdrop (10px in headless Chromium, 15 to 17px with classic Windows scrollbars), and block and inline-end drawers stop short of it, because `inline-size: 100dvi` is capped by `max-inline-size: 100%` (`packages/opui/core/utils.css:47-54`, `packages/opui/css/components/drawer.css:30,158`)
  - Summary: When a modal opens, a bright strip stays at the right edge of the dimmed page and full-width drawers stop short of it where scrollbars take space.
  - Recommended: Fix with option C. The explanation was given and C removes the strip while keeping the layout shift fix that A values.
  - Options:
    - A: accept the strip (it stops the layout shift).
    - B: drop `stable`.
    - C: let the backdrop and block drawers extend under the gutter.
  > Explain further and provide an example
  - Explained: when a modal Dialog or Drawer opens, `utils.css` locks the page (`overflow: clip` on `html`) so it can't scroll behind the overlay. Locking hides the page scrollbar, and without it the page gets wider and jumps sideways by the scrollbar's width. `scrollbar-gutter: stable` stops the jump by keeping the scrollbar's space reserved. But the backdrop doesn't cover that reserved strip, so where scrollbars take space (15 to 17px on Windows, about 10px in headless Chromium, none with macOS overlay scrollbars) a bright strip stays at the right edge of the dimmed page, and a drawer that should span the full width, such as a bottom drawer, stops that far short of the edge.
    ```html
    <!-- On Windows: a page tall enough to scroll, then open the drawer -->
    <dialog class="ui-drawer ui-block-end" id="filters">...</dialog>
    <button class="ui-button" commandfor="filters" command="show-modal">
      Filters
    </button>
    ```
    The options stay as listed: accept the strip to avoid the jump, drop `stable` and accept the jump, or extend the backdrop and full-width drawers under the gutter.
  - Explained: the strip only shows with classic scrollbars (Windows, or Chrome with scrollbars always shown on macOS); overlay scrollbars take no space. The example has a page tall enough to scroll, a modal dialog and a bottom drawer, so the undimmed strip and the drawer stopping short of the edge can be seen side by side. Option C stays the recommendation: extend the backdrop and the block drawers under the gutter (`inset-inline-end: calc(-1 * (100dvi - 100%))` on the backdrop, `max-inline-size: none` with `inline-size: 100dvi` on block drawers) and keep `stable` so the page doesn't jump. Example: dialog-scrollbar-gutter

## Suggestions

- [ ] (4) New components the blocks point to. Each block currently draws these with its own CSS:
  - Summary: Blocks draw charts, breadcrumbs, steppers, timelines, ratings, pagination and stat cards with their own CSS because the library has no such components.
  - Recommended: Explain further. Still true (none of the eleven exist in the package), but which ones to build is a scope decision, and severity 4 looks high for a suggestion that breaks nothing.
  - Bar chart or sparkline: analytics-dashboard, sales-dashboard, server-status.
  - Breadcrumb: file-manager, product-detail.
  - Chat message bubble: chat.
  - Empty state: empty-states, error-page.
  - Number stepper (quantity): product-detail, shopping-cart.
  - One-time code input: two-factor.
  - Pagination: data-table.
  - Rating: product-detail, testimonials, hero.
  - Stat card (label, value, trend): analytics-dashboard, app-shell, project-overview, sales-dashboard.
  - Stepper: checkout, onboarding-checklist.
  - Timeline: changelog, project-overview, server-status.
- [ ] (1) Tokens: there is no data visualization palette. Primer, shadcn/ui (`chart-1` to `chart-5`) and Carbon ship categorical and sequential palettes for charts (`packages/opui/css/theme.css`)
  - Summary: The theme has no categorical or sequential chart palette, unlike Primer, shadcn/ui and Carbon.
  - Recommended: Fix with option B. No component reads chart tokens yet, so they belong with the Chart or Stat card component.
  > Explain further
  - Explained: a categorical palette can derive from the theme: five or six hues at fixed offsets from `--ui-palette-hue`, with `--ui-palette-chroma` and a lightness that passes 3:1 against the surface in both modes, as `--ui-chart-1` to `--ui-chart-6`; a sequential palette is the palette steps `--ui-color-N` already. Nothing in the package reads them until a chart or sparkline exists (the blocks draw their sparklines with block CSS), so the tokens would ship ahead of a consumer.
  - Options:
    - A: add `--ui-chart-1` to `--ui-chart-6` in `theme.css`, documented in the theme tokens table.
    - B (recommended): wait for the Chart or Stat card component in the New components item and add the tokens with it.
- [ ] (1) Tokens: the `-text` derivation is written out 7 times in `theme.css` (`:411-499`, one six-line `light-dark()` per intent and for `--ui-primary-text`), the on-fill luminance formula twice (`:461-466,488-493`), and `button.css:6-11` and `button-group.css:26-32` re-implement the dark half for `--_accent-text` and `--_edge-text` (`packages/opui/css/theme.css:411-499`, `packages/opui/css/components/button.css:6-11`, `packages/opui/css/components/button-group.css:26-32`)
  - Summary: The same text and on-fill color formulas are copied nine times across the theme and two components.
  - Recommended: Fix with option A. Firefox and Safari don't run `@function` yet, so one formula would break every derived color there.
  - Fix: CSS custom functions (`@function --ui-text-of(--color)` and `@function --ui-on-fill(--fill)`, Chromium 139+, the stated target) declared once in `theme.css`, so each derived token and the two component properties are a one-line call.
  - Still open: the only way to write the formulas once is a CSS `@function`, which Firefox and Safari don't support, so every derived color would break there.
  - Options:
    - A (recommended): keep the seven copies until Firefox and Safari ship `@function`, then move each formula into one function.
    - B: accept the copies for good and drop the item.
- [ ] (1) Package: the Node pins differ. `packages/opui/package.json:121` says `>=22` (consumers), the root `package.json:86` `>=26.10.0`, `.nvmrc` `26.10.0`, and no `.npmrc` sets `engine-strict`, so the root field is advisory (this review ran on Node 22.22 without a warning)
  - Summary: The repo declares Node 26.10 but nothing stops a contributor from running it on Node 22.
  - Recommended: Fix with option A. pnpm 12 reads `engineStrict` from `pnpm-workspace.yaml`, not `.npmrc`, and it can only be turned on once every machine runs Node 26.10.
  - Options:
    - A (recommended): `engine-strict=true` in a root `.npmrc`.
    - B: lower the root `engines` to the version the scripts need.
  - Still open: `engine-strict=true` in `.npmrc` does nothing under pnpm 12, which reads `engineStrict: true` from `pnpm-workspace.yaml`, and with that set `pnpm install` fails on Node 22, which this cloud environment and some contributors run.
  - Options:
    - A (recommended): add `engineStrict: true` to `pnpm-workspace.yaml` once every machine that builds the repo runs Node 26.10 (CI and Netlify already read `.nvmrc`).
    - B: lower the root `engines` to the oldest Node the scripts need, and keep the field advisory.
- [ ] (2) Tokens: there is no Figma kit. Peers build one from their tokens: Primer generates Figma variables from its token files, Material has Theme Builder, and Carbon, Spectrum and Nord ship kits. `tokens.json` is the starting point, but its values are CSS expressions (`var()`, `light-dark()`, relative colors), so a kit needs them resolved per mode first (`packages/opui/tokens.json`, `src/utils/tokens-json.ts`)
  - Summary: There is no Figma kit, and tokens.json holds CSS expressions that a kit would need resolved per mode first.
  - Recommended: Fix with option A. A resolved-tokens export is a small script over the existing `tokens.json` and is what every Figma variables importer needs.
  > Explain further
  - Explained: a kit needs values, not CSS expressions. The cheapest path is a build step that opens `theme.css` in Chromium with Playwright, reads `getComputedStyle(document.documentElement)` for every `--ui-*` token in light and dark mode (and once per example theme), and writes a DTCG `tokens.resolved.json` with resolved colors and lengths and the modes as DTCG modes. Figma's variables import (Tokens Studio, or the Variables REST API on Enterprise) reads that, with light and dark as modes of one collection. What it can't do: tokens whose value depends on where they're read (the `.ui-palette` and severity scopes, relative colors over a parent surface) only resolve at the root, so the kit gets the root values and a note; and variables aren't components, a kit with component styles is a design effort on its own.
  - Options:
    - A: a `scripts/resolve-tokens.mjs` export of resolved variables per mode and theme, published next to `tokens.json`.
    - B: a full kit with components, outside this repo.
    - C: nothing until someone asks for Figma.
- [ ] (2) Theming: there is no palette generator. Material builds a full scheme from one seed color and a contrast level, and Radix and Spectrum publish engineered 12-step scales. OPUI derives its palette from `--ui-palette-source` with fixed lightness steps, and the theme generator sets 8 tokens and a source color (`packages/opui/core/palette.css`, `src/utils/theme-store.ts`)
  - Summary: There is no palette generator; the theme generator sets eight tokens and a source color with fixed lightness steps.
  - Recommended: Fix with option A. The derivation already lives in CSS, so a builder is docs-site UI over the theme generator, no package change.
  > Explain further
  > I like the idea of a generator or builder of some kind. Materials is great, haven’t tried the others, shadcn has a really really cool one
  - Explained: the derivation already lives in CSS: `--ui-palette-source` drives `--ui-color-1..16` (`palette.css`), the severity scopes derive their own source from `--ui-critical` and friends, and `.ui-contrast-more` tightens the knobs. So a builder mostly needs UI, not a new algorithm. shadcn's builder is presets plus live token sliders with a CSS export; Material's Theme Builder takes one seed and a contrast slider and derives the scheme; tweakcn adds fonts, radius and shadows. The theme generator (`src/components/ThemeGenerator`, 8 tokens and a source color) is the seed of that: add presets (the example themes as starting points), a seed color that sets hue and chroma, the contrast level, radius, density, a font stack, a dark mode preview on real components, and export as a `packages/opui/themes/` file.
  - Options:
    - A (recommended): grow the theme generator into a builder page with presets, more knobs and an export. Docs-site work, no package change.
    - B: add a seed-to-scheme algorithm in the package (Material's tonal palettes) that derives the gray and severity hues from the seed too.
    - C: leave the generator as it is.
- [ ] (2) Tokens: motion and elevation scales are thin. Material has 16 durations, 10 easings and 6 elevation levels, and Carbon has 6 durations with productive and expressive easings. OPUI has three durations, three easings, `--ui-motion` as an on and off switch, and shadows per use (`packages/opui/css/theme.css`)
  - Summary: The motion and elevation scales are thin compared with peers, with three durations, three easings and shadows per use.
  - Recommended: Fix with option A. The per-use tokens are what the components and themes read, and a level scale would only duplicate them.
  > Explain further
  - Explained: the components read motion through `--_duration` and `--_ease`, which map to `--ui-duration-fast` (0.1s), `--ui-duration` (0.2s), `--ui-duration-slow` (0.3s, overlays) and `--ui-ease`, `--ui-ease-enter`, `--ui-ease-exit`; `--ui-motion: 0` turns it all off. Material's 16 durations fall into four groups of which the components use three, and its 10 easings into standard, emphasized, accelerate and decelerate, which the three easings cover. Elevation is per use (`--ui-shadow-control`, `-overlay`, `-elevated`, `-scroll`, `-surface`, `-selected`), so a theme sets the shadow a card or a menu gets rather than a level; a 6-level scale would be a second way to spell the same shadows unless the per-use tokens map to it.
  - Options:
    - A (recommended): keep the per-use tokens and add a duration or shadow only when a component needs it.
    - B: add a level scale (`--ui-shadow-1` to `--ui-shadow-5`, `--ui-duration-1` to `-4`) and point the per-use tokens at it, so themes can set the scale once.
- [ ] (2) Docs: component pages have no do and don't guidance, and accessibility notes are uneven. Carbon splits each component into Usage, Style, Code and Accessibility, and Primer gives do and don't examples plus accessibility expectations. OPUI has an Accessibility section on 17 of 32 pages, keyboard notes on 7, and "when to use" is one preamble sentence (`src/docs/components/`, `src/docs/components/AGENTS.md`)
  - Summary: Component pages lack do and don't guidance, and only about half have an Accessibility section or keyboard notes.
  - Recommended: Fix with option A. A `usage` slot and a data-driven Keyboard support partial give every page the same two sections.
  > Explain further
  - Explained: today the layout has an optional `accessibility` slot (17 of 32 pages fill it, 11 have keyboard notes with `<kbd>`), and "when to use" is the preamble sentence. Do and don't guidance needs a place and a habit: a `usage` slot ("When to use", "When not to", two or three short items each) next to `accessibility` in the Component layout, filled page by page, and a Keyboard support partial driven by data (a `keyboard` list in each `api.ts`) so the eleven hand-written lists become one table with the same wording.
  - Options:
    - A (recommended): the `usage` slot and the data-driven Keyboard support partial, then fill the pages in a sweep.
    - B: only the Keyboard support partial, and keep usage guidance to the preamble.
    - C: keep the pages as they are.
- [ ] (2) Repo: `tests/e2e/__screenshots__` weighs 65MB (1334 PNGs) and the git pack 273MB. `update-snapshots.yml:30` regenerates them wholesale (`rm -rf` then re-record), and 11 of the 120 visible commits touch them
  - Summary: Each snapshot refresh adds tens of megabytes of PNGs to the repository history.
  - Recommended: Fix with option A. LFS keeps the clone small and only needs `lfs: true` on the checkout steps; option B gives up dark-mode coverage.
  - Options:
    - A: Git LFS for `tests/e2e/__screenshots__`.
    - B: keep, but run the `dark` project on fewer fixtures.
  - Still open: Git LFS isn't set up; the README Maintainers section ("Visual baselines in git") lays out option A (Git LFS) and option B (keep, fewer dark fixtures) for the owner to decide.

## To check

- [ ] (2) Anchor: on `/html/components/anchor/` in Chrome 142+, Tab to "felix-bohlin/ui" in the RepoCard example, wait for the card, press Tab and check whether focus reaches "Star" in the `popover="hint"` card, and whether a screen reader announces the card. On touch, tapping the link follows it, so "Star" can't be reached (`src/component-examples/anchor/RepoCard.html:7-35`)
  - Summary: Whether keyboard focus reaches the Star button in the repo hover card, and what a screen reader says about it, is unknown.
  - Recommended: Explain further. Only Chrome 142+ with a screen reader can tell, and the RepoCard example is already on the Anchor page.
  > Explain further
  - Explained: this is the case the interest invokers explainer calls partial interest. The card holds a focusable Star button, so Tab to the link shows the card but keeps focus on the link; the browser announces the hotkey (Alt+Up Arrow by default) that gives full interest, after which Tab reaches Star and Escape loses interest and closes the card. A screen reader gets the card through the `aria-details` relation the browser adds to the link while the card shows (a plain-text hint would be `aria-describedby`). On touch, Chrome 142+ shows interest on long press, so the link isn't followed and Star is reachable. Only a run in Chrome 142+ with NVDA or VoiceOver can confirm the wording, nothing to change in the example.
- [ ] (2) CSS: every `user-select: none` is unprefixed, and web-features lists no Safari support for unprefixed `user-select`. Check in Safari whether button, tab, summary, choice, list and range text can still be selected. If so, add `-webkit-user-select: none` next to each (`packages/opui/css/components/button.css:83`, `accordion.css:95`, `choice.css:24,34`, `form.css:58`, `list.css:29`, `range.css:89`, `tabs.css:103`, `text-field.css:393`, `toggle-button.css:28`)
  - Summary: In Safari, pressing or dragging on buttons, tabs, summaries, choices, list items and range labels can select their text.
  - Recommended: Fix. web-features lists no Safari support for unprefixed user-select, and -webkit-user-select: none next to each declaration changes nothing in Chromium, so it is a zero-cost fallback.
- [ ] (2) Dialog: on `/html/components/dialog/` (Long content), check in Safari that the terms can be scrolled with the keyboard. `.ui-content` scrolls but holds only paragraphs, and focus lands on "Decline" outside the scroller. Chromium and Firefox make such a scroller focusable, Safari doesn't. If confirmed, add `tabindex="0"` to that `.ui-content` in all five formats and a sentence in the prose (`src/component-examples/dialog/LongContent.html:18-82`, `packages/opui/css/components/dialog.css:38-43`)
  - Summary: In Safari, keyboard users can't scroll the terms in the long-content dialog because the scrolling area isn't focusable.
  - Recommended: Fix. Safari has no keyboard-focusable scrollers, the example's content holds only paragraphs and no tabindex in any format, so the check would plainly fail.
- [ ] (2) Range: with NVDA and VoiceOver, check what arrow keys announce on `/astro/test/range` and the HTML Value example. The `<output class="ui-value">` is a `status` live region that the script rewrites on every input, so the value may be read twice, and the slider's own value never includes `valueSuffix`. If confirmed, set `aria-valuetext` on the input and keep the readout from announcing (`packages/opui/css/js/range.js:13-17`, `packages/opui/components/Range/Range.astro`)
  - Summary: Screen readers may read a slider's value twice on each arrow key and never hear its suffix.
  - Recommended: Fix with option A. `aria-valuetext` and a silent output make the slider announce once, with its unit, whatever the screen reader does today.
  > Explain further
  - Explained: what the code guarantees: `<output>` has the implicit `status` role, a polite live region, and `range.js` rewrites its text on every `input` event. So an arrow key makes the slider announce its own new value (native) and, once the queue drains, the live region announces the text again, with the suffix. NVDA reads both; VoiceOver usually does too but may coalesce. The slider's own announcement never has the suffix because nothing sets `aria-valuetext`.
  - Options:
    - A (recommended): `range.js` sets `aria-valuetext` to the value plus suffix when `data-suffix` is set, and the `<output>` gets `aria-live="off"`, so the slider is announced once with its unit.
    - B: leave it; two announcements are redundant, not wrong.
- [ ] (2) Spinner: on `/html/components/spinner/` (Buttons), check with NVDA, JAWS and VoiceOver whether `<button aria-busy="true">` keeps its name and whether "busy" is announced. Some pairs hold back the content of busy elements.
  - Summary: Screen readers may drop a busy button's name or never say that it is busy.
  - Recommended: Fix with option A. Support data says only JAWS acts on `aria-busy`, so the page should say so and pair it with `disabled` and a status message.
  > Explain further
  - Explained: support data (a11ysupport.io, TPGi) says NVDA and VoiceOver ignore `aria-busy` entirely, so the button keeps its name and nothing says "busy". JAWS is the one that acts on it: it holds back the content of a busy element in Chrome and Firefox, so the button may lose its name there. ARIA only lets assistive technology "wait until the modifications are complete", so neither behavior is a bug. The visually hidden labels in the second row help nothing while JAWS hides the content.
  - Options:
    - A (recommended): keep `aria-busy` as the spinner trigger and say on the Spinner page that only JAWS acts on it (it may hide the button's content), and pair it with `disabled` and a live status message for waits that matter.
    - B: trigger the spinner from a class instead and keep `aria-busy` off buttons.
- [ ] (2) Tooltip: on `/html/components/tooltip/`, with NVDA and Firefox, JAWS and Chrome, and VoiceOver and Safari, check whether the Save trigger is announced "collapsed" and "expanded", and whether the tooltip text is read as its description. On iOS Safari and Android Chrome, check whether `interestfor` alone (long press) shows the tooltip, which decides the Tooltip accessibility item.
  - Summary: What screen readers announce for the tooltip trigger, and whether a long press shows the tooltip on phones, is unknown.
  - Recommended: Explain further. Only assistive technology and real phones can tell, and the Tooltip page already hosts the example.
  > Explain further
  - Explained: the touch half is settled by Chrome 142, which shipped `interestfor`: interest is shown on hover, keyboard focus and long press on touchscreens, and a `popover="hint"` target that is plain text becomes the trigger's description. So touch no longer needs `commandfor` and `command="toggle-popover"`, and without the command pair the trigger has no expanded state to announce. Firefox and Safari don't support `interestfor` yet (WebKit objected to the tooltip use case), so there the tooltip only shows on hover through CSS and nothing is announced. What stays unchecked: the exact words NVDA, JAWS and VoiceOver use for the description in Chrome 142+. See the Tooltip item in Accessibility for the fix.
- [ ] (2) Typography: rich text tables are `display: block` so they can scroll. Chromium keeps the table, column header and cell roles. Check with VoiceOver in Safari on `/html/components/typography/` (Default) that the table is still announced as a table with headers (`packages/opui/css/components/typography.css:695-700`)
  - Summary: VoiceOver in Safari may stop announcing rich text tables as tables because they are display block for scrolling.
  - Recommended: Fix with option A. Keeping the table a table is the only way that is safe in Safari, and a scroll wrapper costs one documented `div`.
  > Explain further
  - Explained: Safari has a long record of dropping table semantics when `display` changes (Roselli's 2022 survey, a 2020 VoiceOver test where cells stopped being navigable once `display: table` was gone, fixed in Chrome 80 but not in Safari), so `display: block` on the rich text `table` is likely to turn it into plain text for VoiceOver. Only a run in Safari can confirm it on the current version.
  - Options:
    - A (recommended): keep the table a table and scroll a wrapper: `.ui-rich-text` documents `<div class="ui-table-scroll">` (or `tabindex="0"` on a wrapping `div`) for wide tables, and the `table:not([class])` rule drops `display: block` and `overflow-inline`.
    - B: keep `display: block` and accept the Safari loss, since Chromium is the target.
- [ ] (2) Menu: the link items in Basics and Custom point at same-page anchors (`href="#basics"`, `href="#menu"`). `Menu.astro` only adds `command="hide-popover"` to button items, so following a link scrolls the page while the popover stays open. Check in Chrome whether that is the intended behavior for link items; if not, give the example links real destinations or make link items close the menu (`src/component-examples/menu/Basics.astro:14`, `src/component-examples/menu/Basics.html:28`, `src/component-examples/menu/Custom.astro:64`, `src/component-examples/menu/Custom.html:58`, `packages/opui/components/Menu/Menu.astro:56-57,67-68`)
  - Summary: Choosing the Help or Open in new tab link in the example menus scrolls the page but leaves the menu open.
  - Recommended: Fix with option A. Real destinations make the examples behave like a menu, and a note covers same-page links, with no JavaScript added.
  > Explain further
  - Explained: certain from the code: `Menu.astro` sets `command="hide-popover"` only on button items (`closes = !href && !keepOpen && !disabled`), and `command` and `commandfor` only work on buttons anyway, so a link item can't close the popover declaratively. A link to another page leaves the page, so it doesn't matter there; a same-page anchor scrolls the page and the menu stays open until a click outside or Escape, which is what the examples show.
  - Options:
    - A (recommended): give the example links real destinations (docs pages, so the click navigates), and say on the Menu page that same-page links keep the menu open.
    - B: close the menu on link activation with a small script in `menu.js` (there is no JavaScript in Menu today).
    - C: keep the same-page anchors.
- [ ] (2) Tabs: the Keyboard support list says Right and Left Arrow "follow the reading direction. In right-to-left text, Left Arrow moves to the next tab." That is the browser's native radio-group behavior, which the library doesn't control, and no e2e test covers RTL. Check on `/html/components/tabs/` with `dir="rtl"` on the `.ui-tabs` in Chromium, Firefox and Safari; if it differs per browser, reword the row to "Right and Left Arrow move between tabs; which way depends on the browser in right-to-left text" (`src/docs/components/tabs.astro:198-202`, `tests/e2e/interaction.spec.ts:260-280`)
  - Summary: The docs say Left Arrow moves to the next tab in right-to-left text, which may not hold in every browser.
  - Recommended: Explain further and provide an example. Chromium's radio code flips the arrow keys in RTL, so the docs match the target browser, and an RTL tabs demo lets the user check Firefox and Safari before rewording.
  - Explained: the arrows are the browser's radio group navigation, which the library doesn't touch. Chromium's radio code flips Left and Right in a right-to-left group, so the row matches the target browser. Firefox and Safari decide on their own, and only a run there tells; the example puts a left-to-right and a right-to-left set side by side to try it. If they differ, reword the row as the item says. Example: tabs-rtl

  > Explain further and provide an example

- [ ] (3) Menu, Tooltip: in WebKit, a popover anchored to a trigger inside a modal Dialog, a Drawer or another Menu lands above its trigger by about the page's scroll offset once the page is scrolled: a split button menu in a dialog footer far down the overlays stress page opens around 1850px too high, and second level submenus can't be clicked because the first submenu has left the viewport. The same overlays near the top of the page are placed right, and anchors in the normal page flow are fine after scrolling. The e2e scenarios carry it as a known WebKit failure (`failingIn.webkit` in `tests/e2e/stress-overlays.ts`), and `tests/e2e/engines.spec.ts` reproduces it without the library: a plain popover anchored in a modal dialog, which is expected to fail in WebKit only on a scrolled page. If that test starts passing, WebKit fixed it, or the cause is ours. Check in Safari on macOS on `/tests/overlays/` after scrolling down, and report it to WebKit if Safari does the same (`tests/e2e/stress-overlays.ts`)
  - Summary: In WebKit, menus and tooltips inside a dialog, drawer or menu open far above their trigger once the page is scrolled.
  - Recommended: Explain further. It is carried as an expected WebKit failure with a library-free repro, and only Safari on macOS can confirm it before reporting to WebKit.
  > Explain further
  - Explained: WebKit has it on file. Bug 304551, "incorrect anchor positioning when a fixed-positioned element and its anchor are both in the top layer", reported in December 2025 with Chrome right and Safari wrong, was closed as a duplicate of bug 301023. That is our case: the menu or tooltip is `position: fixed` and it and its trigger, inside a modal dialog, a drawer or another menu, are both in the top layer, and WebKit offsets it by the page's scroll. Nothing to change in the library and nothing to report. When WebKit ships the fix, `engines.spec.ts` fails with "expected to fail but passed": remove `WEBKIT_SCROLLED_ANCHOR` from the scenarios and the repro.
- [ ] (2) Menu: in Firefox, a menu in a `dir="rtl"` part of a left-to-right page opens on the wrong inline side: the rtl menu lands about 1000px from its trigger and the rtl submenu leaves the viewport, while the rtl tooltip, which has no span, is placed right. It looks like Firefox applies `span-inline-end` and `span-inline-start` in the wrong direction there. The e2e scenarios carry it as a known Firefox failure (`failingIn.firefox`). Check in desktop Firefox on the Rtl section of `/tests/overlays/`, and report it if confirmed (`packages/opui/css/components/menu.css`, `tests/e2e/stress-overlays.ts`)
  - Summary: In Firefox, a right-to-left menu inside a left-to-right page opens about 1000px from its trigger.
  - Recommended: Explain further. It is carried as an expected Firefox failure with a library-free repro, and only desktop Firefox can confirm it before reporting to Mozilla.
  - Partly fixed: it wasn't only Firefox. Plain `position-area` keywords such as `span-inline-end` resolve against the containing block's direction, the left-to-right page, while the menu's logical margins follow its own right-to-left direction, so the two disagreed. Chromium didn't mirror either: it opened the menu to the right. Menu, Tooltip and Anchor now use the `self-` keywords, which follow the element's own direction and ship in the same browser versions. Chromium and WebKit now open the rtl menu from its trigger's right edge (a new e2e check).
  - Still open in Firefox: with the `self-` keywords, CI Firefox places the rtl menu about 1000px from its trigger, the rtl submenu outside the viewport, and the new edge check 1068px off. `tests/e2e/engines.spec.ts` reproduces it without the library: a plain popover with `self-block-end span-self-inline-end` in a `dir="rtl"` block of a left-to-right page lands 447px past its trigger's end edge in Firefox only. The scenarios and both tests are expected to fail in Firefox (`FIREFOX_SELF_RTL`). If the repro starts passing, Firefox fixed it. Check in desktop Firefox on the Rtl section of `/tests/overlays/`, and report it to Mozilla if it does the same
  > Explain further
  - Explained: still an expected Firefox failure, nothing to change. A search of Mozilla's tracker finds no matching report: bug 2050613 (fixed in Firefox 154) is a `position-area` center-branch mix-up, bug 2063785 (Firefox 157) is about inline-split anchors, neither is direction. WPT's `position-area-ambiguous-self.html` encodes what the spec expects for `self-` keywords under `direction: rtl`, so Firefox is off spec if desktop Firefox shows the same as CI. Next step when confirmed: file it under Core :: Layout: Positioned with the `engines.spec.ts` repro (a plain popover with `self-block-end span-self-inline-end` in a `dir="rtl"` block of a left-to-right page).
- [ ] (1) Tokens: `--ui-on-accent` names a fill that doesn't exist (there is no `--ui-accent`), and `--ui-palette-on-strong` isn't a drop-in for it: it is dark (`--ui-color-16`) in dark mode, made for the light `--ui-palette-strong` shade, while Badge severity fills and the dark-mode choice mark sit on a fill capped at `--ui-fill-max-lightness` and need light text (`packages/opui/css/theme.css:350`, `packages/opui/css/components/badge.css:67`, `packages/opui/css/components/choice.css:13-16`)
  - Summary: The on-accent text token names a fill that doesn't exist, so where its light text belongs is unclear.
  - Recommended: Fix with option A. It is marked recommended, and the theme, badge and choice code still read the token as described.
  - Options:
    - A (recommended): rename it `--ui-on-fill`, the text on an intent fill kept within `--ui-fill-max-lightness`, and describe that pairing.
    - B: draw the Badge severity fill and the choice mark with `--ui-palette-strong` and read `--ui-palette-on-strong` (a visual change in dark mode).
    - C: keep `--ui-on-accent` and document it as the one `--ui-on-*` without a fill token.
- [ ] (1) Tokens: `--ui-line-height-relaxed` (`1.75`) is the page line height on `html` and the `Tabs` label line height, so it can't fold into `--ui-line-height-control` (`1.5`) without shrinking the tabs and changing all page text (`packages/opui/core/normalize.css:21`, `packages/opui/css/components/tabs.css:84`)
  - Summary: Page text and tab labels share the relaxed line height, so folding it into the control line height would change both.
  - Recommended: Fix with option A. It is marked recommended and keeps the tokens as documented, and normalize and tabs still read the relaxed value.
  - Options:
    - A (recommended): keep `--ui-line-height-relaxed` for the page and the tabs, as documented now.
    - B: tabs read `--ui-line-height-control` and keep their height through padding, and `html` reads `--ui-line-height`.
- [ ] (1) Tokens: the token table hides instance inputs and files some tokens in the wrong section: `--ui-anchor-position-area` isn't listed (it is set per element, not themed), `--ui-code-block-*` sit under Typography, `--ui-track-bg-color` under Surfaces, and there is no Palette steps tier (`src/utils/theme-tokens.ts:24-47`, `packages/opui/css/theme.css`)
  - Summary: The token table omits the per-element inputs and lists the code block and track tokens under the wrong headings.
  - Recommended: Fix. The section list still has no Instance inputs, Code, Controls or Palette steps section, and the tokens still sit under Typography and Surfaces.
  - Fix: an "Instance inputs" section built from an explicit list in `theme-tokens.ts`, Code and Controls sections in `theme.css`, and a Palette steps tier generated from `core/palette.css`.
- [ ] (2) Tokens: a severity class on the same element as `.ui-palette`, or on a direct child of `.ui-contrast-more`, loses its palette. `--ui-red`, `--ui-blue`, `--ui-green` and `--ui-orange` are declared again on those elements from `--ui-color-N`, which comes from the `--ui-palette-source` the severity scope derives from them, so Chromium drops the whole cycle as guaranteed-invalid. `.ui-neutral` keeps a fixed source for this reason, so a theme can't recolor neutral through `--ui-neutral` (`packages/opui/css/theme.css:275-278,321,483-486,543-554`, `packages/opui/core/palette.css:2-18,89-136`)
  - Summary: A severity class on a palette element or on a direct child of a high-contrast scope loses its color.
  - Recommended: Fix with option A. It is marked recommended, and the theme still declares the named colors from palette steps that the severity source derives from, so the cycle is in the code.
  - Fix: confirm with `<div class="ui-contrast-more"><span class="ui-chip ui-critical">` and `<span class="ui-palette ui-chip ui-critical">`.
  - Options:
    - A (recommended): give the named colors and `--ui-neutral` the step's lightness as a number (steps 7, 9 and 11 have the same lightness in every palette), so they stop depending on the element's own palette, then derive `.ui-neutral` from `--ui-neutral` like the other scopes.
    - B: keep today's values and document that a severity class can't sit on a `.ui-palette` element or a direct child of `.ui-contrast-more`.
