Severity 1-10, 10 is the most severe.

Findings with a page and section in brackets come from the stress pages in `src/stress-tests/`. Open the section named in brackets to see each one.

## Accessibility

- [ ] (2) Tooltip: the triggers set `commandfor` and `command="toggle-popover"` next to `interestfor`, for touch. So Chromium exposes the trigger as expandable ("collapsed", then "expanded" while the tooltip shows), and Enter on "Save" closes the tooltip while it runs the button's action (`src/component-examples/tooltip/Basics.html:2-9`, `src/docs/components/tooltip.astro:59-63`)
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
  > Explain further
  > Proposed solution doesn’t work on mobile safari though.
  - Explained: right, and it reaches further than mobile Safari. Option A leans on `interestfor`, which only Chromium has (142 and later; web-features 3.43 lists no Firefox or Safari support). The library has no hover fallback, since `tooltip.css` only styles `:popover-open`, so without the command pair a tooltip never opens in Safari, desktop or iOS, or in Firefox: not on hover, focus or a tap. The pair is what opens it there today, because Invoker Commands work in Safari 26.2 and Firefox 144: a click or a tap toggles it, and since Safari has no `popover="hint"`, it stays until the trigger is pressed again. (The earlier note that the tooltip shows on hover through CSS where `interestfor` is missing was wrong.) So the choice is per trigger. On a button that acts, like Save, the pair makes one press save and toggle the tooltip, and gives Save an expanded state in Chromium. On a button whose only job is to show the text (an info button next to a field, often called a toggletip), the pair is the right tool: the press shows the text, "expanded" is true, and it works in every browser with Invoker Commands, iOS Safari included. Chromium on Android shows interest on a long press of a button, so Save gets its tooltip there with `interestfor` alone; iOS Safari only will once WebKit ships interest invokers.
  - Still open: which triggers keep the pair.
  - Options:
    - A (recommended): action buttons (Save) take `interestfor` only, and the Tooltip page adds a toggletip example: an info button with `commandfor`, `command="toggle-popover"` and `interestfor`, for text touch users must reach in every browser. Tooltips on action buttons don't show in Safari and Firefox until they ship interest invokers.
    - B: keep the pair on every trigger, as today, with the expanded state and the double action in Chromium, so Safari and Firefox users can tap or click.
    - C: like A, and point to the `interestfor` polyfill (npm `interestfor`) for apps that need hover and focus tooltips in Safari and Firefox now. It can't add the touch behavior, so iOS still needs the toggletip.
  > Explain further
  > No the browser support rules shouldn’t be chromium first. Correct that. The rule or way of thinking rather, should be that if a feature lands that is interesting enough to explore here, it’ll get included. In the compat layer there can be workarounds added if possible. The library has no preference for any browser, its feature-first.
  - Explained: a correction first. The library is feature first, with no preference for a browser: a feature worth exploring goes in as soon as one engine ships it, whichever engine that is, and the compat layer can carry a workaround for the others where one is possible. My earlier notes called that Chromium first; that was wrong, and the notes on this item, the `user-select` item and the WebKit anchoring item are corrected. For the Tooltip it changes the picture. `interestfor` is the feature (shipped in Chromium 142), and the compat layer can give the other engines a CSS fallback: inside `@supports not selector(:interest-source)` (the pseudo-class shipped with `interestfor`, so it detects exactly the engines without it), show the `.ui-floating` while its trigger is hovered or has keyboard focus (`.ui-tooltip:has(> :hover, > :focus-visible) > .ui-floating`), overriding the hidden popover's `display: none`, and anchor it to the wrapper, which `anchor.css` already makes an anchor (`--anchor`). Safari and Firefox on desktop then get the hover and focus tooltip without the command pair, so Save is a plain button in every engine: no expanded state and Enter only saves. Two limits remain. The fallback isn't a top-layer popover, so an ancestor with `overflow: hidden` can clip it, and positioning needs anchor positioning in that engine. And CSS can't help touch: iOS Safari has neither hover nor interest invokers, so on an iPhone a tap only reaches text through the command pair. That is what a toggletip is for: a button whose only job is to show the text, where "expanded" is true and the press does one thing.
  - Options:
    - A (recommended): drop the command pair from action buttons (Save) in the examples and prose, add `css/compat/tooltip.css` with the hover and focus fallback above, and add a toggletip example (an info button with `commandfor`, `command="toggle-popover"` and `interestfor`) for text touch users must reach in every browser.
    - B: keep the command pair on every trigger, as today.
    - C: like A, without the compat fallback: tooltips on action buttons show only in engines with interest invokers.

## Bugs

- [x] (1) Tokens: in the bootstrap, brutalist and m3 themes, a severity class on the same element as `.ui-palette` or `.ui-contrast-more` gets the theme's palette instead of its severity color. The themes set `--ui-palette-source` on `:where(html, .ui-palette, .ui-contrast-more)` in `theme.custom`, which outranks the severity scopes in `theme.base`, and the Theme builder export uses the same layer (`packages/opui/themes/bootstrap.css:5,70`, `packages/opui/themes/brutalist.css:5,61`, `packages/opui/themes/m3.css:5,70`, `packages/opui/css/theme.css`)
  - Summary: In three example themes, a critical or info chip that is also a palette scope shows the brand color instead of red or blue.
  - Recommended: Fix with option A. The severity class is the more specific intent, and a layer after the theme keeps every theme working without edits.
  - Fix: confirm with `<span class="ui-palette ui-chip ui-critical">` on `/tests/contrast/?theme=m3`. Found while fixing the Tokens item about the severity cycle, which it doesn't cover.
  - Options:
    - A (recommended): move the severity scope sources (`.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning`) into a `theme.severity` sublayer after `theme.custom` in `layers.css`, with a CHANGELOG entry for the new layer.
    - B: say in the theming guide that a severity class can't sit on a `.ui-palette` or `.ui-contrast-more` element when a theme sets `--ui-palette-source`.
  > Fix with option A
  - Fixed: option A. `layers.css` declares a `theme.severity` sublayer after `theme.custom`, and `theme.css` puts the palette source and hue rotation of `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning` in it, so a theme that sets `--ui-palette-source` on `.ui-palette` or `.ui-contrast-more` no longer recolors a severity class on the same element. The four example themes, the Theme builder export (`src/utils/theme.ts`), the layer diagram, the concepts and customizing guides, the package README, SKILL.md and MIGRATING name the new layer, and the unreleased `layers.css` CHANGELOG entry says what it's for. The severity test in `theming.spec.ts` now runs in the default theme and every example theme: with the rules back in `theme.base`, bootstrap, brutalist and m3 fail, with the layer all five pass.
- [x] (1) Tests: in WebKit, "split button opens its menu" sometimes still finds the menu open 5 seconds after a click on "Save as draft", once each in Svelte, React and Vue. A plain popover hidden while it opens closes in WebKit, so the opening transition isn't the cause (`tests/e2e/interaction.spec.ts:813-826`, `src/component-examples/button-group/SplitButton.html:25-44`)
  - Summary: One split button test sometimes fails in WebKit because the menu stays open after an item is clicked.
  - Recommended: Fix. A trace from a failing run shows where the click goes.
  - Fix: on the next failing WebKit run, open the test's trace from the run's Playwright report and check whether the click reached the item, whether `hide-popover` ran, and whether the menu opened again.
  - Note: it failed again in Astro on CI run 40362563247 (`b0116af2`). The click on "Save as draft" went through, and the menu was still visible 5 seconds later. Four frameworks have now failed it, so the cause isn't one framework's markup.
  > Fix
  - Fixed: "split button opens its menu" now centers the example, so the end aligned menu fits without a position-try fallback, waits for it to settle and checks that it ends at the trigger's end edge before the click. The failures came from WebKit leaving a popover that a fallback placed open after an item click: `tests/e2e/engines.spec.ts` reproduces it without the library (an end aligned popover in an `overflow: hidden` group with the Menu's transitions, at its own position and placed by `flip-inline`), expected to fail in WebKit only in the fallback case (`WEBKIT_FALLBACK_ITEM_CLICK` in `tests/e2e/engine-bugs.ts`). The repro then stopped reproducing: no item click out of 90, over 10 runs in Playwright's WebKit, left the fallback popover open, and the expected failure turned CI red, so `WEBKIT_FALLBACK_ITEM_CLICK` is gone and the test expects the popover to close in every engine. The split button test still avoids the fallback.
- [x] (2) Tests: the Playwright projects pick the specs that also run in Firefox and WebKit with an allowlist regex, which leaves out `client-render.spec.ts` and `todo.spec.ts`, although AGENTS.md says every spec without screenshots runs there (`playwright.config.ts:10-11`, `playwright.config.ts:37`, `playwright.config.ts:46`, `AGENTS.md:83`)
  - Summary: Two specs without screenshots only run in Chromium, though the guide says they also run in Firefox and WebKit.
  - Recommended: Fix. An opt-out list can't drift from the rule.
  - Replaces: nothing in prose; it makes `AGENTS.md:83` ("The specs without screenshots, except `a11y.spec.ts`, also run in the `firefox` and `webkit` projects") true by construction.
  - Fix: give the `firefox` and `webkit` projects `testIgnore: /(a11y|themes|visual)\.spec\.ts$/` instead of `testMatch: crossBrowser`, and delete `crossBrowser`.
  - Fixed: the `firefox` and `webkit` projects run every spec but `a11y`, `themes` and `visual` (`testIgnore: /\/(a11y|themes|visual)\.spec\.ts$/`; the slash keeps `stress-overlays-a11y.spec.ts` running there), so `client-render.spec.ts` and `todo.spec.ts` now run in both. The todo page test no longer grants clipboard permissions, which differ per engine: it records what the page passes to `navigator.clipboard.writeText`.
- [x] (2) Tooling: `released-api.mjs` writes `released-api.json` with `JSON.stringify(..., 2)`, one array item per line, but the committed file is Prettier-formatted and not in `.prettierignore`, so the pull request the after-release workflow opens would fail `format:check`. It also reads only the Astro and Vue barrels and type files and walks only `css/`, while the test also reads `core/` (`scripts/released-api.mjs:47-58`, `scripts/released-api.mjs:109`, `scripts/released-api.mjs:121-134`, `tests/unit/released-api.test.ts:23-31`, `.github/workflows/after-release.yml:34-46`)
  - Summary: Regenerating the released API after a release produces a file that fails the format check and misses React, Svelte and core classes.
  - Recommended: Fix. The next release depends on it.
  - Replaces: the regenerate step in `AGENTS.md:77` only works by hand today ("Regenerate it after a release with `node scripts/released-api.mjs <tag>`").
  - Fix: write the file through Prettier's `format`, as `check-css-vars --update` does, read every barrel in `PACKAGE_FRAMEWORK_IDS` with the type-file map `check-components` uses, and walk `core/` as the test does.
  > Fix
  - Fixed: `released-api.mjs` reads every framework's barrel and type file with the `BARREL_TYPES` map from `package-source.js` (shared with `check-components`), walks `core/` and `css/`, and writes through Prettier's `format`, so the after-release pull request passes `format:check`. `released-api.test.ts` compares props in every framework, and `released-api.json` was regenerated from 5.4.3: the props are unchanged and the core classes (`.ui-motion-*`, `.ui-palette`) are new.
- [x] (4) Menu: on iOS, the submenu anchor block sets `anchor-scope: --ui-menu` on every submenu that has its own submenu, which hides the parent's `--ui-menu` from that submenu's `position-anchor`, so in a menu three levels deep the middle submenu opens unanchored at the top-left. It also replaces the root's `--ui-menu-root` anchor, so the rule that keeps submenus of submenus going in a flipped parent's direction is invalid there (`packages/opui/css/compat/menu.css:2-15`, `packages/opui/css/components/menu.css:117-136`)
  - Summary: On iOS, in a menu three levels deep, the middle submenu opens in the top-left corner instead of next to its parent.
  - Recommended: Fix. The rule only changes on iOS, and Chromium with the gate forced on places all three levels with the fix.
  - Fix: confirm first on iOS Safari 26 on `/tests/overlays/`, which has menus three levels deep. In Chromium with the gate forced on and the trigger at the end edge, the second-level menu sits at the top-left today; with the fix below it anchors to its parent and its submenu opens on the correct side. Two-level menus (the Submenu example) are the same either way.
    ```css
    @layer components.compat {
      /* iOS Safari doesn't place a submenu at its trigger item, so there it
         anchors to the parent menu. Remove once iOS Safari does. */
      @supports (-webkit-touch-callout: none) {
        :where(.ui-menu) {
          &:has(.ui-menu[popover]) {
            anchor-name: --ui-menu;
          }

          &:not(.ui-menu .ui-menu):has(.ui-menu[popover]) {
            anchor-name: --ui-menu-root, --ui-menu;
            anchor-scope: --ui-menu-root, --ui-menu;
          }

          & .ui-menu[popover] {
            position-anchor: --ui-menu;
          }
        }
      }
    }
    ```
  > Fix
  - Fixed: `css/compat/menu.css` sets `anchor-name: --ui-menu` on every menu with a submenu and `anchor-scope` only on the root, which keeps `--ui-menu-root` next to `--ui-menu`. In Chromium with the gate forced on, the second level of a three-level menu sat at the top-left (4, 0); now it opens next to its parent, and at the end edge both submenus flip and the third keeps the flipped direction. The Learn post on menu anchoring and the Menu entry in the CHANGELOG say so.

---

---

- [x] (5) Select (Svelte): in Chromium, a Svelte `Select` whose bound value is `undefined` renders with nothing selected whenever the page has a document-wide `MutationObserver`, which browser extensions, analytics and Playwright tracing add. Svelte 5.56 and older re-apply `select.__value` from their own observer on the `<selectedcontent>` mutations Chromium makes, before the binding effect has set `__value`, so `selectedIndex` turns -1 and the effect then finds no `:checked` option. `initialValue()` covers an item with `selected: true`, but a select whose first option is the default, or whose options come from children, still ends up empty. Svelte 5.57.0 ignores `<selectedcontent>` mutations (`packages/opui/components/Select/Select.svelte:37-39`, `packages/opui/package.json`, `pnpm-workspace.yaml`)
  - Summary: In Chrome, a Svelte Select can show no option at all when an extension or script on the page watches the DOM.
  - Recommended: Fix with option A. The docs and tests already run on Svelte 5.57.2, and users on older Svelte keep the bug otherwise.
  - Fix: the catalog is on Svelte 5.57.2, so the docs and tests no longer hit it, and `client-render.spec.ts` compares each select's selection with the server markup. What's left is the package's peer range, which still allows 5.29.
  - Options:
    - A (recommended): raise the `svelte` peer range to `^5.57.0`, with a `Changed` entry in the CHANGELOG.
    - B: keep the range and say in the Select docs that Chromium needs Svelte 5.57 or later.
  - Fixed: option A. The `svelte` peer range is `^5.57`, and the `opui-css/svelte` entry under Added in the CHANGELOG, the README, the Svelte getting started guide, its skill reference and the components guide say 5.57, as does the `package.json` peer range entry under Fixed. The Svelte components are new in 6.0.0, so the unreleased Added entry changed instead of a new Changed one.

## Docs

- [x] (2) Docs: nothing checks internal links and anchors. `src/utils/whats-new.ts` alone has 655 `href="#…"` links into component pages, and a renamed heading leaves them pointing at nothing without a failure (`src/utils/whats-new.ts`, `src/docs/components/`)
  - Summary: A renamed heading silently breaks the What's new and other in-page links that point at it.
  - Recommended: Fix with option A. A post-build check is fast and covers every page and link at once.
  - Options:
    - A (recommended): a post-build `scripts/check-links.mjs` that reads `dist/` with parse5 and fails on an internal `href` whose page or `#id` doesn't exist, run at the end of `pnpm build`.
    - B: an e2e spec that crawls the built site.
  - Fixed with option A: `scripts/check-dist.mjs` (`pnpm check-dist`) runs at the end of `pnpm build`. It parses every page in `dist` with parse5, follows redirect pages, and fails on an internal link to a missing page or `#id`, a duplicate id, a missing `.md` alternate, a search index URL that doesn't exist and a dead link in `llms.txt` or a `.md` page. It found the Tabs note's `#variants`, the Migrating guide's relative `MIGRATING-legacy.md`, the release checks' `RELEASING.md`, 54 `css-variables` ids on each API index, the Menu Custom `#menu` and the framework variants and `.md` files that `/checks` and `/todo` advertised; all fixed. Placeholder fragments on the block previews, stress and fixture pages are skipped, and same-page fragments inside an example preview are only checked on component pages, since examples link their own page's sections.

## Future plans

Custom elements (web components) the library could add, for behavior that HTML and CSS can't give a component.

- [ ] (1) Range: `range.js` only wires the outputs that exist when `initRange()` runs, so markup that htmx, Turbo, `innerHTML` or a `<template>` adds later needs another call, and its `astro:after-swap` listener ties the framework-agnostic helper to Astro (`packages/opui/css/js/range.js:1-44`, `packages/opui/components/Range/Range.astro:136-139`)
  - Summary: A Range added to the page after load doesn't update its value readout until `initRange()` runs again.
  - Recommended: Fix. Two delegated listeners replace the init call, and the markup stays as it is.
  - Fix: listen for `input` and `reset` once on `document` (both bubble) and update the `output[data-live]` of the event's `.ui-range`, with `resetValue()` after a reset, so importing `range.js` is all a page does. That drops the `WeakSet` and the `astro:after-swap` listener; keep `initRange()` as an export that does nothing, so existing pages don't break. The starting text and `aria-valuetext` come from the markup, as the Astro component already renders them. A custom element doesn't fit here: the root is a `<label>`, and a wrapper would add parity drift in React, Svelte and Vue.
- [ ] (1) Textarea, TextField: a field with `maxlength` doesn't say how many characters are left, and counting them needs a script (`src/component-examples/textarea/EndText.html:1-7`)
  - Summary: Fields with a character limit don't show how many characters are left.
  - Recommended: Fix. The end text already has room for the count.
  - Fix: an `<opui-character-count>` in the end text reads the field's `maxlength`, shows the characters left and announces them politely only near the limit, so each keystroke isn't read out. Without the script the end text shows only its hint. Add it to `Textarea` and `TextField` in all five formats.
- [ ] (1) TextField: a password field can't show its text. The sign-up block's password field has no reveal toggle, and a toggle needs a script to switch the input's `type` (`src/blocks/sign-up.html:105-121`, `packages/opui/css/components/text-field.css:105`)
  - Summary: Password fields have no show password toggle, so users can't check what they typed.
  - Recommended: Fix. A small element in the end affix keeps the field's markup and CSS.
  - Fix: an `<opui-password-toggle class="ui-end">` as the field's end affix, so `.ui-field > .ui-end` still matches. It holds a `.ui-button` that switches the input between `type="password"` and `type="text"`, sets `aria-pressed` and keeps focus where it is. Without the script `:not(:defined)` hides it and the field is a plain password field. Add it to `TextField` in all five formats.
- [ ] (1) Web components: dates in the blocks are fixed text, such as "Yesterday" in the inbox, so they go stale, and relative wording in the reader's language needs a script (`src/blocks/inbox.html:400-402`, `src/blocks/notifications.html:127-129`)
  - Summary: Dates like "Yesterday" are fixed text, so they go stale and don't follow the reader's language.
  - Recommended: Fix. The element is small, and the server text stays as the fallback.
  - Fix: an `<opui-relative-time>` around a `<time datetime>` rewrites its text with `Intl.RelativeTimeFormat` in the page's `lang`, puts the full date in `title`, and refreshes on a timer that slows down as the date gets older. Without the script the server text shows.
- [ ] (2) Table: sorting a table needs a script. The data-table block marks Customer as sorted with a fixed `aria-sort`, and its headers can't change the order (`src/blocks/data-table.html:156-168`)
  - Summary: Table headers can't sort the rows, and the sorted column in the data-table block is fixed.
  - Recommended: Fix with option A. Server sorting keeps working without the script, and the element adds sorting in the page.
  - Options:
    - A (recommended): an `<opui-sortable-table>` around the `.ui-table` turns each header marked `data-sort` into a button, reorders the `tbody` rows by the cell text or a `data-sort-value`, sets `aria-sort` on the sorted header and announces the new order. Without the script the headers are links to a server-sorted page, or plain text.
    - B: document server sorting only: the headers are links with a `sort` query parameter, and the page renders `aria-sort`.
- [ ] (2) Web components: a color picker needs a script, and `<input type="color">` only gives hex, which the library's colors never use. The Theme builder has a light-DOM `<oklch-input>` for it, but it lives in the docs site and isn't form-associated (`src/utils/oklch-input.ts:83`, `src/utils/oklch-input.ts:297-299`)
  - Summary: There is no OKLCH color field, and the native color input only gives hex values.
  - Recommended: Fix. The element already exists on the docs site and mostly needs to move into the package.
  - Fix: move `oklch-input.ts` and the color helpers it imports into the package as `<opui-color-field>`, with `Range` sliders and a `TextField`. Make it form-associated (`static formAssociated = true` and `ElementInternals`), so it submits its `oklch()` value and takes part in validation and form reset. The Theme builder then imports it from the package. Without the script it is a `TextField` that takes an `oklch()` string.
- [ ] (2) Web components: copying text to the clipboard needs a script. The docs site's code blocks do it with their own listener, and the library has no copy button (`src/components/Code.astro:69`, `src/components/Code.astro:292-304`)
  - Summary: There is no copy button for invite links, codes or snippets, so each page writes its own.
  - Recommended: Fix. Custom commands keep the button a plain `Button`.
  - Fix: the button stays a `.ui-button` with `commandfor` and `command="--copy"`, since a wrapper would break `packages/opui/css/components/button-group.css:55` and `packages/opui/css/components/form.css:97`. Its target is an `<opui-copy>` around the text or field, which handles the `command` event: it copies the field's value or its own text with `navigator.clipboard.writeText()`, shows a copied state on the button for a moment and announces "Copied". Without the script `:not(:defined)` hides the button and the text can still be selected.
- [ ] (2) Web components: there is no toast. A confirmation after an action, such as saving the account settings form, needs a script to show, stack and dismiss it (`src/blocks/account-settings.html:154-156`)
  - Summary: There is no toast, so a page can't confirm an action like a saved form without its own script.
  - Recommended: Fix. The top layer and invoker commands do most of the work, and the element adds the queue and the timing.
  - Fix: an `<opui-toaster>` region shown with `popover="manual"`, with a `show()` method and a `--toast` command for buttons. It stacks toasts, dismisses each after a delay that pauses on hover and focus, gives each a close button, and announces it through a polite live region that stays in the page. The severity colors come from `Callout`. Without the script nothing shows, so a page that must confirm without one renders a `Callout`.
- [ ] (3) Checkbox: a select all checkbox needs a script. The Indeterminate example carries its own inline script, and the data-table block's Select all customers checkbox does nothing (`src/component-examples/checkbox/Indeterminate.html:24-48`, `src/blocks/data-table.html:162-167`)
  - Summary: Select all checkboxes do nothing in plain HTML unless the page writes its own script.
  - Recommended: Fix. It repairs the data-table block and replaces the example's inline script.
  - Fix: an `<opui-select-all>` around the group (the `fieldset` or the `table`), so no `.ui-checkbox` gets a wrapper. The checkbox marked `data-select-all` checks and unchecks the other checkboxes in it, is `indeterminate` while they're mixed, and follows form reset. It covers what `checkbox.js` does today, so `activateIndeterminate()` can move into it. Without the script the checkboxes are independent.
- [ ] (3) Web components: the package ships no custom elements, only two init helpers, so behavior that HTML and CSS can't give a component has nowhere to live, and a page calls `initRange()` or `activateIndeterminate()` again after it adds markup (`packages/opui/css/js/checkbox.js:1-31`, `packages/opui/css/js/range.js:1-44`, `packages/opui/package.json:34-37`, `src/docs/guide/concepts.astro:431-501`)
  - Summary: The library has no home for components that need JavaScript, so each one would invent its own setup.
  - Recommended: Fix with option A. One implementation serves all five frameworks, instead of the element plus three framework copies of the behavior.
  - Fix: set the ground rules before the first element, so the other Future plans items share them.
    - Light DOM, no Shadow DOM. The components are styled by global `ui-` classes in cascade layers, `:has()` between parts and the themes, which a shadow root would cut off.
    - The element is the root, or the root of a part, with its `ui-` class, never a wrapper around an existing root. Child selectors such as `packages/opui/css/components/form.css:90`, `packages/opui/css/components/table.css:55` and `packages/opui/css/components/button-group.css:55` would stop matching.
    - The markup works before the element upgrades, and `:not(:defined)` hides the parts that only work with it.
    - Tags start with `opui-`, since custom element names are global, and classes stay `ui-`. Each file defines its element once, behind a `customElements.get()` check like `src/utils/oklch-input.ts:297`, and does nothing on the server.
    - Elements live in `packages/opui/elements/`, one file each, exported as `opui-css/elements/*` and listed in `sideEffects`. The JavaScript section of Concepts and the Browser support page list them, and interaction tests run in Chromium, Firefox and WebKit.
    - Each one is a component like the others: Astro, React, Svelte and Vue files, an `api.ts`, a docs page, examples in five formats, a CHANGELOG entry and a What's new note.
  - Options:
    - A (recommended): the element holds the behavior, and the Astro, React, Svelte and Vue components render the same tag and load its definition on the client. A framework adds only what it needs to control a value, such as React's `value` and `onChange`.
    - B: the element is for HTML and Astro. React, Svelte and Vue render the same tag but do the behavior themselves, as they do for Range today.
- [ ] (3) Web components: the quantity fields have no number stepper. The shopping cart's Decrease and Increase buttons do nothing, since stepping a value needs a script, and the product page falls back to a bare number input (`src/blocks/shopping-cart.html:177-227`, `src/blocks/product-detail.html:306-318`)
  - Summary: The cart's quantity buttons do nothing when pressed, and there is no stepper component to build them with.
  - Recommended: Fix. It repairs the cart block, and the stepper is on the New components list under Suggestions.
  - Fix: an `<opui-number-stepper class="ui-number-stepper">` around a number `TextField` and two `.ui-button`s with `commandfor` naming the input and `command="--step-down"` or `command="--step-up"`. The element handles the `command` event: it calls `stepDown()` or `stepUp()`, fires `input` and `change`, disables a button at `min` or `max`, repeats while a button is held and follows form reset. The cart's input becomes `type="number"`. Without the script it is a plain number input with the browser's spin buttons, and `:not(:defined)` hides the two buttons. If browsers add built-in step commands for number inputs, the element is no longer needed.

## Limitations

## Questions

- [x] (1) Dialog, Drawer: the two overlays split their regions differently. `DialogHeader` (an `hgroup`) names the Dialog, a `DrawerTitle` `h2` inside `DrawerHeader` names the Drawer. Dialog ends in `DialogActions` (`.ui-actions`, with `align`), Drawer in `DrawerFooter` (`.ui-footer`, no `align`). The drawer title is `--ui-font-size-large` (through `--_header-font-size`), while the Dialog title (`.ui-h4`) follows `--ui-font-size-h4`, so in m3 they're 20px and 28px. Neither spaces the paragraphs in `.ui-content`, which touch in LongContent and the drawer Basics (`src/component-api/dialog/api.ts:20-39`, `src/component-api/drawer/api.ts:52-75`, `packages/opui/css/components/drawer.css:16,66,121-127`, `packages/opui/css/components/callout.css:65-71`)
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
  > Fix with option A
  - Fixed: option A. Dialog and Drawer share four parts: `DialogHeader` and `DrawerHeader` (`div.ui-header`, a row that wraps, where a heading takes the free space, buttons line up at the end and a `p` gets its own row; Dialog's `hgroup` is gone, and `DrawerHeader` keeps its close button), `DialogTitle` (new) and `DrawerTitle` (an `h2` that names the overlay, both sized by `--_title-font-size`, default `--ui-font-size-h4`, so the examples drop `.ui-h4` and m3 titles match at 28px), `DialogContent` and `DrawerContent` (`.ui-content`, now a stack with `--ui-space-3` between children on both, the rule `card.css` already gave Dialog, so a layout class like `.ui-form` keeps its own gap), and `DialogFooter` and `DrawerFooter` (`.ui-footer`, a row with `align`, replacing `DialogActions` and `DrawerActions`), with `.ui-actions` as a button group inside the footer that moves to the end when other content comes first. `--_header-font-size` is `--_title-font-size`, and the drawer's footer properties are `--_footer-gap` and `--_footer-padding` again, the names 5.4.3 shipped. `ActionsAlignment` is `FooterAlignment`, a new `FooterContent` example puts a status text next to the buttons, and every block, stress page, guide and site use is updated. Breaking entries in the CHANGELOG, MIGRATING and What's new notes say so; the dialog and drawer parity snapshots are updated (intended), the orphaned `dialog-ActionsAlignment` baselines are deleted, and the new and changed screenshots need an `update-snapshots` run.
- [ ] (2) Dialog, Drawer: the scroll lock's `scrollbar-gutter: stable` leaves an undimmed strip at the inline end under the modal backdrop (10px in headless Chromium, 15 to 17px with classic Windows scrollbars), and block and inline-end drawers stop short of it, because `inline-size: 100dvi` is capped by `max-inline-size: 100%` (`packages/opui/core/utils.css:47-54`, `packages/opui/css/components/drawer.css:34,237`)
  - Summary: An open modal leaves a bright strip at the right edge of the dimmed page, and full-width drawers stop short of it.
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
- [x] (2) CSS: a tonal fill inside a tonal surface, or inside an elevated surface in dark mode, matches its background, so tonal buttons, the Tabs track and tonal chips disappear there (1.00:1). Dark `--ui-surface-tonal` and `--ui-surface-elevated` are both `--ui-gray-12` (`packages/opui/css/theme.css:515-518`), and a tonal `Card`, `Accordion` or `Callout` paints the same tonal its content reads (`packages/opui/css/components/card.css:41-48`, `packages/opui/css/components/callout.css:3`)
  - Summary: Tonal buttons, chips and the Tabs track blend into tonal cards and callouts, and into elevated cards and dialogs in dark mode.
  - Recommended: Fix with option A. It follows the border remap raised surfaces already do, and the selected Tabs pill needs a second look either way.
  - Fix: measured on `/html/test/button/` with a tonal `Button` in each `Card` variant: 1.16:1 on the page in light, 1.33:1 in dark, 1.00:1 on a tonal card in both modes and on an elevated card in dark. The selected Tabs pill keeps a 3.16:1 border, so the tabs stay usable.
  - Options:
    - A (recommended): raised surfaces remap the tonal role for their content, like `--ui-border-color`. A tonal surface sets `--ui-surface-tonal: var(--ui-surface)` on its children, and an elevated one sets it to a new role, `--ui-surface-tonal-on-elevated` (`light-dark(var(--ui-surface-tonal), var(--ui-surface))`), on its root. Themes whose dark tonal already differs from their elevated surface (m3, shadcn, brutalist) set the new role to `var(--ui-surface-tonal)`. The light Tabs pill (`--ui-surface`) then matches a remapped track inside tonal surfaces, so the pill moves to a step of its own.
    - B: give dark `--ui-surface-tonal` and `--ui-surface-elevated` different steps in `theme.css`. Fixes elevated surfaces in dark only, and moves every tonal or elevated surface in dark mode, so the `-text` promises on tonal need checking again.
    - C: leave it. Tonal on tonal is the author's choice, and outlined or filled controls stay visible there.
  > Explain further and provide an example
  - Explained: tonal is the quiet fill. A tonal button, a chip and the Tabs track paint `--ui-surface-tonal`, one gray step off the page: `--ui-gray-3` on `--ui-gray-1` in light mode (1.16:1) and `--ui-gray-12` on `--ui-gray-13` in dark mode (1.33:1). That small step is all that draws their shape. A tonal Card, Accordion or Callout paints its own background with the same `--ui-surface-tonal`, so a tonal control inside it is the card's own color, 1.00:1, and only its text is left. In dark mode `--ui-surface-elevated` is `--ui-gray-12` too, so the same happens inside elevated cards, dialogs, drawers and menus. Outlined and filled controls keep their border or accent, so only the tonal ones vanish. Option A fixes it the way raised surfaces already fix borders: they set `--ui-border-color` to `--ui-border-color-on-raised` for their content, and they would also point the tonal role at a step that differs from their own background (the page surface inside a tonal card, and inside an elevated one in dark mode). The example measures a tonal button, a chip and the tab track in an outlined, a tonal and an elevated card, in both modes, today and with option A simulated by two overrides. With A, light mode shows the second problem the item names: the selected tab is the page surface, so it matches the remapped track and only its border sets it apart. Example: tonal-surfaces
  > Fix with option C
  - Fixed: option C. No change: a tonal control on a tonal surface stays the author's choice, and outlined and filled controls stay visible there. The `tonal-surfaces` example keeps the measurements.

## Suggestions

- [x] (1) Tokens: there is no data visualization palette. Primer, shadcn/ui (`chart-1` to `chart-5`) and Carbon ship categorical and sequential palettes for charts (`packages/opui/css/theme.css`)
  - Summary: The theme has no categorical or sequential chart palette, unlike Primer, shadcn/ui and Carbon.
  - Recommended: Fix with option B. No component reads chart tokens yet, so they belong with the Chart or Stat card component.
  > Explain further
  - Explained: a categorical palette can derive from the theme: five or six hues at fixed offsets from `--ui-palette-hue`, with `--ui-palette-chroma` and a lightness that passes 3:1 against the surface in both modes, as `--ui-chart-1` to `--ui-chart-6`; a sequential palette is the palette steps `--ui-color-N` already. Nothing in the package reads them until a chart or sparkline exists (the blocks draw their sparklines with block CSS), so the tokens would ship ahead of a consumer.
  - Options:
    - A: add `--ui-chart-1` to `--ui-chart-6` in `theme.css`, documented in the theme tokens table.
    - B (recommended): wait for the Chart or Stat card component in the New components item and add the tokens with it.
  > Fix with option B
  - Fixed: option B. No chart tokens now. The Bar chart or sparkline line in the New components item says to add the categorical palette with that component.
- [x] (1) Tokens: the `-text` derivation is written out 7 times in `theme.css` (`:411-499`, one six-line `light-dark()` per intent and for `--ui-primary-text`), the on-fill luminance formula twice (`:461-466,488-493`), and `button.css:6-11` and `button-group.css:26-32` re-implement the dark half for `--_accent-text` and `--_edge-text` (`packages/opui/css/theme.css:411-499`, `packages/opui/css/components/button.css:6-11`, `packages/opui/css/components/button-group.css:26-32`)
  - Summary: The same text and on-fill color formulas are copied nine times across the theme and two components.
  - Recommended: Fix with option A. Firefox and Safari don't run `@function` yet, so one formula would break every derived color there.
  - Fix: CSS custom functions (`@function --ui-text-of(--color)` and `@function --ui-on-fill(--fill)`, Chromium 139+, the stated target) declared once in `theme.css`, so each derived token and the two component properties are a one-line call.
  - Still open: the only way to write the formulas once is a CSS `@function`, which Firefox and Safari don't support, so every derived color would break there.
  - Options:
    - A (recommended): keep the seven copies until Firefox and Safari ship `@function`, then move each formula into one function.
    - B: accept the copies for good and drop the item.
  > Fix with option A
  - Fixed: option A. The copies stay as they are (seven `-text` derivations in `theme.css`, plus `--_accent-text` and `--_edge-text`). So the change isn't forgotten, "the -text and on-fill formulas wait for @function in Firefox and Safari" in `tests/unit/compat.test.ts` fails once web-features lists CSS `@function` (`function`, Chromium 139 only today) in Firefox and Safari, and its message says which formulas to write once.
- [x] (1) Package: the Node pins differ. `packages/opui/package.json:121` says `>=22` (consumers), the root `package.json:86` `>=26.10.0`, `.nvmrc` `26.10.0`, and no `.npmrc` sets `engine-strict`, so the root field is advisory (this review ran on Node 22.22 without a warning)
  - Summary: The repo declares Node 26.10 but nothing stops a contributor from running it on Node 22.
  - Recommended: Fix with option A. pnpm 12 reads `engineStrict` from `pnpm-workspace.yaml`, not `.npmrc`, and it can only be turned on once every machine runs Node 26.10.
  - Options:
    - A (recommended): `engine-strict=true` in a root `.npmrc`.
    - B: lower the root `engines` to the version the scripts need.
  - Still open: `engine-strict=true` in `.npmrc` does nothing under pnpm 12, which reads `engineStrict: true` from `pnpm-workspace.yaml`, and with that set `pnpm install` fails on Node 22, which this cloud environment and some contributors run.
  - Options:
    - A (recommended): add `engineStrict: true` to `pnpm-workspace.yaml` once every machine that builds the repo runs Node 26.10 (CI and Netlify already read `.nvmrc`).
    - B: lower the root `engines` to the oldest Node the scripts need, and keep the field advisory.
  > Fix with option A
  - Still open: the condition in option A isn't met yet. This cloud environment runs Node 22.22.0, and with `engineStrict: true` pnpm 12 fails `pnpm install` there ("Unsupported engine ... wanted >=26.10.0, current 22.22.0", tried in a scratch project), which would also break the session start hook that installs the dependencies in every cloud session. pnpm's `devEngines.runtime` with `onFail: "download"` would fetch Node 26.10 for the scripts, but pnpm 12 downloads it from `unofficial-builds.nodejs.org`, which this environment can't reach. The cloud environment's Node is set in its setup script (the cloud environment menu in the session's title bar, Edit, Setup script).
  - Options:
    - A (recommended): install Node 26.10 in the cloud environment's setup script, then add `engineStrict: true` to `pnpm-workspace.yaml` in the next session.
    - B: lower the root `engines` to the oldest Node the scripts need, and keep the field advisory.
  - Fixed: option A. `pnpm-workspace.yaml` sets `engineStrict: true`, so `pnpm install` refuses a Node older than the root `engines` (`>=26.10.0`). Cloud sessions still started on Node 22.22, so `.claude/hooks/session-start.sh` now fetches the `.nvmrc` version from nodejs.org into `~/.local` when `node` is another version (about 5 seconds), puts it first in `PATH` before `pnpm install` and exports it for the session; tried from a clean environment with Node 22 first in `PATH`. Every CI job that installs already reads `.nvmrc`, and the README says it.
- [x] (1) Release: `scripts/release.mjs` commits the release on the maintainer's `main` and pushes it straight to `origin`, so the release commit (version, dated CHANGELOG, regenerated files) never goes through a pull request or its CI run before it lands (`scripts/release.mjs:77-82`, `RELEASING.md:36-58`)
  - Summary: A release is pushed straight to main, so its commit skips the pull request checks that every other change gets.
  - Recommended: Fix with option A. A pull request runs `check` and `e2e` on the exact release commit before anything is tagged.
  - Fix: `release.mjs` stops before the publish: it prepares the release on a `release/<version>` branch (dated CHANGELOG or a candidate version, `version`, `pnpm check`, the `chore: release <version>` commit), pushes it and opens the pull request against `main`. A `release.yml` workflow on the push to `main` of a `chore: release <version>` commit tags it. A tag pushed with `GITHUB_TOKEN` starts no other workflow, so `release.yml` also runs what the tag push starts today (the after-release steps, and the publish once it moves to CI), as reusable workflows (`workflow_call`).
  - Options:
    - A (recommended): a `Release` workflow, started from the Actions tab with the version, runs `release.mjs` and opens the pull request with `GITHUB_TOKEN`. Needs "Allow GitHub Actions to create and approve pull requests" in the repository settings (Settings, Actions, General, Workflow permissions), which also lets the `After release` workflow open its pull request instead of linking the compare page.
    - B: `release.mjs` runs on the maintainer's machine and opens the pull request with their `gh` login, and only the tagging on merge runs in CI.
  > Fix with option A
  - Fixed: option A. The `Release` workflow (Actions tab, with a version or `major`, `minor`, `patch`, `prerelease`) runs `release.mjs`, which checks out a `release/<version>` branch, dates the CHANGELOG (not for a candidate), sets `version`, runs `pnpm check`, commits `chore: release <version>`, pushes and opens the pull request, then dispatches CI on that branch so `check` and `e2e` run on the exact release commit (a pull request opened with `GITHUB_TOKEN` starts no `pull_request` workflows). On the merge to `main`, `release.yml` tags the release commit and calls `After release` as a reusable workflow, since a tag pushed with `GITHUB_TOKEN` starts nothing. Publishing stays manual, from the tag: `node scripts/release.mjs publish`. `RELEASING.md` lists the one-time setting, "Allow GitHub Actions to create and approve pull requests" (Settings, Actions, General, Workflow permissions), which is on now; unit tests in `tests/unit/release-script.test.ts`.
- [x] (1) Tests: "select keeps its padding when a script adds the button" only asserts that the padding isn't `0px`, so a wrong padding of any other size passes (`tests/e2e/interaction.spec.ts`)
  - Summary: One Select test would still pass with any wrong padding that isn't zero.
  - Recommended: Fix. Comparing with the token is a one-line change.
  - Fix: compare it with the field's inline padding token resolved on the same element.
  > Fix
  - Fixed: the test resolves `--_field-padding-inline` on a probe in the same field and expects the select's (or its button's) inline start padding to equal it, so any wrong size fails, not only `0px`.
- [x] (1) Tests: Tabs are only tested with one ArrowRight. ArrowLeft, wrapping from the last tab and the Overflow example scrolling a focused tab into view aren't tested, and CHECKS.md lists the last as a manual check (`tests/e2e/interaction.spec.ts`)
  - Summary: Tab keyboard wrapping and scrolling a focused tab into view are only checked by hand.
  - Recommended: Fix. Both are short additions to the existing Tabs test.
  - Fix: extend the Basics test with ArrowLeft and the wrap, and add an Overflow test that tabs to the last tab and checks that it's inside the scroller's box.
  > Fix
  - Fixed: the Basics test goes on with ArrowRight from the last tab (wraps to Profile) and ArrowLeft back (Notifications), checking the radios and panels. A new Overflow test narrows the tabs until they scroll, arrows to the last tab and checks that its label sits inside the scroller; it skips where `sibling-index()` is missing. The release checks keep the RTL and Safari parts by hand.
- [x] (1) Tests: the Carousel test only clicks the next scroll button. The markers and the rule that a carousel doesn't scroll smoothly with reduced motion or `.ui-motion-off` aren't tested (`tests/e2e/interaction.spec.ts`, `packages/opui/css/components/carousel.css`)
  - Summary: Carousel markers and the reduced-motion scrolling rule are only checked by hand.
  - Recommended: Fix. The existing next-button test already shows how to reach the pseudo-elements.
  - Fix: click a marker and check `scrollLeft` and the active marker, and check `scroll-behavior` with `.ui-motion-off`, skipped like the next-button test where `::scroll-button()` is missing.
  > Fix
  - Fixed: "a marker scrolls to its item and shows as current" clicks the third `::scroll-marker` (placed from the marker group's computed size and margin), then checks that the third item scrolled into view and that its marker is the current one. "a carousel jumps instead of scrolling smoothly when motion is off" checks `scroll-behavior` (smooth, `auto` with reduced motion, `auto` with `.ui-motion-off`) and that a marker click lands at once. Both skip where `::scroll-marker` is missing, like the next-button test, and the release checks no longer list the reduced motion check.
- [x] (1) Tests: `range.js` updates a `data-live` output again after a form reset, but no example puts a Range in a form, so the reset path never runs (`packages/opui/css/js/range.js`)
  - Summary: Resetting a form doesn't have a test that the range's shown value follows.
  - Recommended: Fix. A form with a reset button in one example covers it.
  - Fix: give the Range Value example a form with a reset button, and test that moving the slider and resetting puts the output back.
  > Fix
  - Fixed: the Range Value example sits in a `Form` with a Reset button in all five formats, and "range shows its value again after a form reset" moves the slider to the end, resets and checks the value, the readout and `aria-valuetext`. It found a bug: a Vue or Svelte range rendered on the client has no `value` attribute, so a reset sent it to the middle of its range (180 instead of 250). Both now set the starting value as the input's `defaultValue` when it has no `value` attribute, and the unreleased CHANGELOG entry for the reset says so.
- [x] (1) Tooling: the list of regenerated files is written out three times in `ci.yml` and copied into `AGENTS.md`, the README, `check-colors.mjs` and `.prettierignore`, so a new generator's output would be neither checked nor committed by CI (`.github/workflows/ci.yml:33`, `.github/workflows/ci.yml:35`, `.github/workflows/ci.yml:39`, `README.md:93`, `scripts/check-colors.mjs:8-12`, `.prettierignore:10-15`, `AGENTS.md:76`)
  - Summary: A file that a new script generates would go stale without CI noticing or committing it.
  - Recommended: Fix. One list removes six copies.
  - Replaces: the file list in `AGENTS.md:75`, which then names the manifest.
  - Fix: keep the paths in one manifest (for example `scripts/generated-files.json`), read it in the CI steps, `check-colors` and the README, and generate the `.prettierignore` block or test that it matches.
  > Fix
  - Fixed: `scripts/generated-files.json` lists the regenerated files once (`files`, plus `sections` for `packages/opui/README.md`, which the build only partly rewrites). The CI check and commit steps and `check-colors` read it, `generated-files.test.ts` checks that it is sorted, its paths exist and `.prettierignore` ignores each file, and `AGENTS.md` and the README name the manifest. The bot's commit is "chore: regenerate the files in scripts/generated-files.json".
- [x] (1) Tests: some e2e checks are opt-in or skip silently. The overlay axe spec checks 16 of 79 scenarios; `THEME_EXCEPTIONS` entries are skipped and never re-tested, so a fixed contrast stays excepted; the interest-invoker and `::scroll-button` tests skip in Chromium too, so a regression there only skips (`tests/e2e/stress-overlays-a11y.spec.ts:6-23`, `tests/e2e/contrast.spec.ts:168-172`, `tests/e2e/interaction.spec.ts:57`, `tests/e2e/interaction.spec.ts:774`, `tests/e2e/interaction.spec.ts:839`)
  - Summary: Some accessibility and interaction tests can pass without checking anything.
  - Recommended: Fix. Each change is local to its spec.
  - Replaces: no prose rule.
  - Fix: make overlay axe opt-out with a reason per scenario, fail when an excepted contrast now meets its promise, and skip the feature tests only outside Chromium.
  > Fix
  - Fixed: `stress-overlays-a11y.spec.ts` runs axe on all 79 overlay scenarios; a scenario opts out with a reason in `skipAxe`, and every overlay still open is checked. `contrast.spec.ts` checks the `THEME_EXCEPTIONS` entries and fails when an excepted token now meets its promise. `needs()` in `tests/e2e/fixtures.ts` skips a feature test only in an engine without the feature and fails in Chromium when it's missing; the interest invoker, `::scroll-button()`, `::scroll-marker`, `sibling-index()` and `closedby` tests and the customizable select scenarios use it.
- [x] (1) Tooling: `check-css-vars` doesn't read `style=""` attributes, counts any quoted `"--x"` in a scanned file as a declaration, and `LENGTH` only knows `px` and `rem` (`scripts/check-css-vars.mjs:22`, `scripts/check-css-vars.mjs:77`, `scripts/check-css-vars.mjs:86-89`, `src/utils/package-source.js:9`)
  - Summary: A custom property read in a style attribute, or a typo that appears in a string, passes the property check.
  - Recommended: Fix. The parsers are already dependencies.
  - Replaces: makes `AGENTS.md:74` hold for inline styles and the other absolute units.
  - Fix: read `style` attributes with parse5, collect declarations with postcss `walkDecls` instead of a regex over the whole source, and add `pt`, `pc`, `cm`, `mm`, `in` and `Q`.
  > Fix
  - Fixed: `check-css-vars` reads `<style>` blocks, static `style=""` attributes and Svelte `style:--x` with parse5, and `declaredProperties` collects declarations with postcss `walkDecls`. A quoted `"--x"` only counts as a declaration as a style-object key, a `setProperty`, a Build knob or a `cssVariable`, `@container style(--x)` counts as a read, and `LENGTH` knows every absolute unit (`cm`, `in`, `mm`, `pc`, `pt`, `Q`). It found nothing to fix.
- [x] (1) Tooling: `build-agent-skill.mjs` skips silently (`guideMarkdown` can return nothing, `exampleLines` returns `[]`), resolves paths from the working directory, and calls `localeCompare` without a locale, so the reference order depends on the machine (`scripts/build-agent-skill.mjs:16`, `scripts/build-agent-skill.mjs:107`, `scripts/build-agent-skill.mjs:186-195`, `scripts/build-agent-skill.mjs:648`)
  - Summary: The agent skill can lose a guide page without an error, and its order can change between machines.
  - Recommended: Fix. Small changes in one script.
  - Replaces: makes the ascending-order rule in `AGENTS.md:19` deterministic for the generated references.
  - Fix: throw when a page yields no markdown, resolve from `import.meta.url`, and pass `"en"` to every `localeCompare`.
  > Fix
  - Fixed: `build-agent-skill.mjs` throws when a guide page yields no markdown or a page has no `<AutoExample>` or example source, resolves its paths from `import.meta.url` (it works from another directory), and sorts with the `"en"` locale, as do the modules it reads rows from (`rows.ts`, `component-source.ts`, `llms.mjs`, `html-to-markdown.mjs`). The references came out byte-identical.
- [x] (1) Tooling: local runs differ from CI. CI sets `OPUI_TEST_PAGES=1` for `pnpm check` but the `check` script doesn't, so local runs never build or link-check the test pages; the session hook runs `pnpm install` without `--frozen-lockfile` and ends the wrapper install with `|| true`; and the Playwright version is pinned in three places with nothing comparing them (`package.json:10`, `.github/workflows/ci.yml:30-32`, `.claude/hooks/session-start.sh:10`, `.claude/hooks/session-start.sh:14`, `package.json:64`, `.github/workflows/ci.yml:107`, `.github/workflows/update-snapshots.yml:17`)
  - Summary: A change can pass locally and fail in CI, because the two don't build the same pages or install the same way.
  - Recommended: Fix. Each part is a one-line change or a short test.
  - Replaces: no prose rule.
  - Fix: set `OPUI_TEST_PAGES=1` in the `check` script, use `--frozen-lockfile` in the hook, and add a unit test that reads the three Playwright versions and compares them.
  > Fix
  - Fixed: `pnpm check` exports `OPUI_TEST_PAGES=1` itself (CI no longer sets it on that step), the session hook installs with `--frozen-lockfile`, and `tests/unit/playwright.test.ts` fails when a workflow's `mcr.microsoft.com/playwright` image differs from the `@playwright/test` version in `package.json`.
- [x] (1) Docs site: some lists are kept in sync by hand: the accessibility guide's Per component list, the theme lists in `customizing.astro` and the package README, the release checks' Components and the ComponentShowcase (both miss Layout), and the guide slugs that `skill.test.ts` copies from `build-agent-skill.mjs` (`src/docs/guide/accessibility.astro:182-194`, `src/docs/guide/customizing.astro:67-92`, `packages/opui/README.md:199`, `packages/opui/README.md:213`, `docs/releases/6.0.0.md:36-115`, `tests/unit/skill.test.ts:8`)
  - Summary: Adding a component, theme or guide page means updating several lists by hand, and some already miss one.
  - Recommended: Fix with option A. A generated list can't drift.
  - Replaces: no prose rule.
  - Options:
    - A (recommended): build each list from the source data (the docs pages, `packages/opui/themes/`, the guide slugs exported once), and generate the README theme list in the build.
    - B: keep the lists and add a sync test for each.
  > Fix with option A
  - Fixed: option A. The accessibility guide lists every page with an Accessibility section (`componentsWithSlot`, 27 pages instead of the 17 written by hand), the customizing page maps over `EXAMPLE_THEMES` with notes from `src/utils/example-theme-notes.ts`, and the new `scripts/build-readme.mjs` in `pnpm build` rewrites the package README's two theme lists; both throw on a theme without notes. The home showcase renders a card per docs page through `ShowcaseCards.astro` and throws when a page has no preview, so Layout has one now (its visual baseline comes with the next `update-snapshots` run). The skill guide slugs live once in `src/utils/guide.ts`, and since the release checklist is prose, `release.test.ts` checks that its Components section links every page (Layout added).
- [x] (1) Docs site: the sitemap lists the 36 block previews and the home page, which are `noindex`, and nothing checks that `llms.txt` lists every page; a page `articleToMarkdown` can't convert is dropped silently (`astro.config.mjs:68`, `src/pages/blocks/[block]/preview.astro:35`, `src/integrations/llms.mjs:159-162`, `src/integrations/html-to-markdown.mjs:264`)
  - Summary: Search engines are pointed at pages marked not to index, and a docs page can vanish from llms.txt unnoticed.
  - Recommended: Fix. Both fit in the build.
  - Replaces: the presence half of the "Markdown and llms.txt" release check in `docs/releases/6.0.0.md`.
  - Fix: give `sitemap()` a filter for `noindex` pages, and make `check-dist` fail when a page in `dist/<framework>/` has no entry in that framework's `llms.txt`.
  > Fix
  - Fixed: `sitemap()` drops pages marked noindex (506 entries to 292), and `check-dist` fails on a noindex page in the sitemap, on an indexable page without its Markdown version (how a page `articleToMarkdown` can't convert shows up) and on a framework page its `llms.txt` doesn't link (the framework home and the component index aside). Deleting a `.md` file and an `llms.txt` line both fail it.
- [x] (1) Package: nothing resolves the `opui-css/...` specifiers in the package README, and nothing checks that `dist/op.css` keeps the MIGRATING promise of no `--palette-*` and no `--color-N` (`packages/opui/README.md:30-31`, `packages/opui/MIGRATING.md:1358`, `tests/package/package.test.ts:159-187`)
  - Summary: The README can show an import path that doesn't resolve, and the Open Props bundle can bring the palette back.
  - Recommended: Fix. The tarball test already has the unpacked files.
  - Replaces: the README half of the "README and CHANGELOG" release check, and a promise only MIGRATING.md states.
  - Fix: in `package.test.ts`, resolve every `opui-css/...` specifier in the README against the unpacked tarball, as `skill.test.ts` does for SKILL.md, and assert that `dist/op.css` has no `--palette-` and no `--color-` declarations.
  > Fix
  - Fixed: `package.test.ts` resolves every `opui-css/...` specifier in the packed README with Node's resolver against the unpacked tarball (a `*` or `<year>` passes when a file in that folder resolves) and fails on a `--palette-*` or `--color-*` declaration in `dist/op.css`. A bad specifier fails it.
- [x] (1) Tooling: the findings format says "Cite every file with a line or line range", but nothing checks the citations. One open item cites `palette.css:2-18,89-136` though the file has 131 lines, and five citations have no directory (`.claude/skills/audit/findings-format.md:9`, `TODO.md:346`)
  - Summary: A finding can point at lines that no longer exist, so the reader can't find what it means.
  - Recommended: Fix. The parser already splits off the file references.
  - Replaces: `.claude/skills/audit/findings-format.md:9`, which then names the test.
  - Fix: a `todo.test.ts` case that checks every `path:line` on an open item's headline: the file exists, the range fits it, and the path has a directory.
  - Depends on: the `/todo` page keys answers on the whole headline, citations included (`src/pages/todo/[...index].astro:199`), so correcting a citation drops a saved answer. Key the page on the headline without its file references first, and carry saved answers over to the new keys.
  - Fixed: `tests/unit/todo.test.ts` checks every `path:line` on an open item's headline: the file exists and the lines fit it. Citations already in headlines, which can't change, are listed in `tests/unit/todo-allowlist.json`; a test fails once an entry is fixed, and the `history` CI job fails when the list grows.
  - Fixed: the `/todo` and `/todo/done/` pages key answers on the headline's text before its file references (`key` from `parseTodo` in `src/utils/todo.ts`), and on load move an answer saved under a key that's gone to the longest current key it starts with, so answers saved under the full headline, or before a citation was corrected, carry over (`carryOver`, tested in `tests/unit/todo.test.ts` and `tests/e2e/todo.spec.ts`). `tests/unit/todo.test.ts` also fails on a malformed closing group, a closing reference that isn't from the repo root, a file name in the headline text that matches no file or whose lines don't fit it, and two items that share a key. The open items' citations that pointed past a file's end, at bare file names or at lines that had moved are corrected in place, `naming.test.ts:395-401` included, so `tests/unit/todo-allowlist.json` lists no citations. `AGENTS.md` and `.claude/skills/audit/findings-format.md` name the text before the file references as the identity, `findings-format.md:9` names the test, and `/todo-answers` also finds an item by that text.
- [x] (1) Tooling: `generate-search-index.mjs` keeps an `apiFiles` branch that globs `src/component-api/**/*.astro`, which matches no file, so its loop never runs (`scripts/generate-search-index.mjs:96`, `scripts/generate-search-index.mjs:250-295`)
  - Summary: The search index script carries a block of code that never runs.
  - Recommended: Fix. Deleting it changes no output.
  - Replaces: no prose rule.
  - Fix: delete the glob and the loop, and assert in the script that each category it builds has at least one entry.
  > Fix
  - Fixed: the dead `apiFiles` glob and loop are gone, and an exported `indexProblems` fails the script on a category without entries, an unknown category or an empty entry, tested in `check-scripts.test.ts`. The index is unchanged.
- [x] (1) Tokens: the token rules "Never `-contrast`" and "`--ui-on-{fill}` always has a `--ui-{fill}` or a `--ui-surface-{fill}` to sit on" are prose; `css-properties.test.ts` checks the component and private suffixes only (`packages/opui/components/AGENTS.md:488`, `packages/opui/components/AGENTS.md:493`, `tests/unit/css-properties.test.ts:51-78`)
  - Summary: A new token can break the naming model for on-colors and contrast without a failure.
  - Recommended: Fix. Both rules are a pattern over the token names.
  - Replaces: `packages/opui/components/AGENTS.md:484` and `:489`, which then name the test.
  - Fix: add both rules to `css-properties.test.ts`, with `--ui-on-accent` as the one named exception until the Tokens item about it is decided.
  - Note: the Tokens item chose option A, so the exception is `--ui-on-fill` now. It stays one: it sits on any intent fill kept within the fill lightness cap, and there is no `--ui-fill`.
  > Fix
  - Fixed: `css-properties.test.ts` fails on a `-contrast` token (`--ui-contrast` aside) and on an `--ui-on-{fill}` without its `--ui-{fill}` or `--ui-surface-{fill}`, with `--ui-on-fill` as the one named exception and the `-on-filled` and `-on-raised` context suffixes skipped; a known-bad fixture tests it. Both lines in `packages/opui/components/AGENTS.md` name the test now.
- [x] (1) Learn: nothing checks the Learn registry's order, and an unknown web-features id in a post's `features` or an Under the hood step only logs a warning and renders as limited availability (`src/utils/learn-posts.ts`, `src/components/UnderTheHood/BuildUp.astro:130`, `src/utils/browser-support.ts:52-56`)
  - Summary: A Learn post can show a wrong browser support chip or sit out of order, and only a review notices.
  - Recommended: Fix. Both are a few lines in a unit test.
  - Replaces: the Registry rule in `.claude/agents/blog.md:28`.
  - Fix: a `learn.test.ts` that checks the order and that every `features` id exists in `web-features`, and make the warning an error in the build.
  > Fix
  - Fixed: `tests/unit/learn.test.ts` checks the registry's order (by component, then slug), sorted keys, sorted `features` and `topics` without duplicates, and that every `features` id of a post or Under the hood step is a live web-features id. `getSupportForFeature` throws in production builds, so an unknown id fails the build, and the blog agent's Registry line names the test.
- [x] (1) Tests: the reasons passed to `failingIn` and `test.fail` are separate copies of the strings in `engines.spec.ts`, and the WebKit one is worded differently in the two files, so nothing ties an expected failure to its browser repro (`tests/e2e/engines.spec.ts:4-8`, `tests/e2e/stress-overlays.ts:22-26`)
  - Summary: An expected browser failure can lose its plain-HTML repro without any test noticing.
  - Recommended: Fix. Sharing the strings makes the link explicit.
  - Replaces: the repro clause of `AGENTS.md:57` ("add a plain-HTML repro to `tests/e2e/engines.spec.ts` when it's a browser bug").
  - Fix: export the reasons from one module that `engines.spec.ts` uses for its repro titles, import them in `stress-overlays.ts` and the `test.fail` calls, and fail when a reason has no repro.
  > Fix
  - Fixed: The reasons live in `tests/e2e/engine-bugs.ts` (`ENGINE_BUGS` per engine and `failsIn()`). `engines.spec.ts` titles each repro block with its reason and "every engine bug has a repro" fails on a reason without one; `stress-overlays.ts` and the specs import them, and the WebKit reason has one wording. `AGENTS.md` names the check instead of the repro clause. The Tabs wrap and overflow tests use two new WebKit reasons with repros (`WEBKIT_RADIO_NO_WRAP`, `WEBKIT_ARROW_FOCUS_SCROLL`).
- [ ] (1) Tests: the align rule in the components guide (one default per part, wherever the part appears) is only checked for four parts in Astro: `actions-align.test.ts` renders `AccordionActions`, `CardActions`, `DialogFooter` and `DrawerFooter` (`tests/unit/actions-align.test.ts:1-44`, `packages/opui/components/AGENTS.md:231`)
  - Summary: The align default is only checked for four Astro parts.
  - Recommended: Fix. The parts with an align option are listed in their api.ts.
  - Fix: build the part list from the `api.ts` options with `prop: "align"`, and render each part in every framework, the way `parity.test.ts` renders the examples.
  - Replaces: `packages/opui/components/AGENTS.md:231`, which then names the test.
- [ ] (1) Tests: `naming.test.ts` only catches `dense` next to `density` for the rule that a component never has both a boolean and an enum for one concept, not any other boolean named after a value of a concept the component also has (`tests/unit/naming.test.ts:319-320`, `packages/opui/components/AGENTS.md:229`)
  - Summary: Only dense next to density is caught when a component has both forms of one concept.
  - Recommended: Fix. The vocabulary already lists the values of each concept.
  - Fix: report a boolean option whose name is one of the `values` of a `vocabulary` concept that the same `api.ts` also has as an option.
  - Replaces: the first half of `packages/opui/components/AGENTS.md:229`, which then names the test.
- [ ] (1) Tests: `parity.test.ts` drops `script` and `style` before it compares the markup, so nothing checks the docs guide's rule that HTML examples are as functional as the Astro ones; only the `framework-parity` agent reads the scripts (`tests/unit/normalize.ts:7`, `src/docs/components/AGENTS.md:309`)
  - Summary: Nothing checks that an HTML example ships the script its behavior needs.
  - Recommended: Explain further. A check first needs a rule for which examples need a script.
  - Replaces: `src/docs/components/AGENTS.md:309` (Functional Parity) and the scripts clause of `.claude/agents/framework-parity.md:33`.
- [ ] (2) Tokens: there is no Figma kit. Peers build one from their tokens: Primer generates Figma variables from its token files, Material has Theme Builder, and Carbon, Spectrum and Nord ship kits. `tokens.json` is the starting point, but its values are CSS expressions (`var()`, `light-dark()`, relative colors), so a kit needs them resolved per mode first (`packages/opui/tokens.json`, `src/utils/tokens-json.ts`)
  - Summary: There is no Figma kit, and tokens.json holds CSS expressions that a kit would need resolved per mode first.
  - Recommended: Fix with option A. A resolved-tokens export is a small script over the existing `tokens.json` and is what every Figma variables importer needs.
  > Explain further
  - Explained: a kit needs values, not CSS expressions. The cheapest path is a build step that opens `theme.css` in Chromium with Playwright, reads `getComputedStyle(document.documentElement)` for every `--ui-*` token in light and dark mode (and once per example theme), and writes a DTCG `tokens.resolved.json` with resolved colors and lengths and the modes as DTCG modes. Figma's variables import (Tokens Studio, or the Variables REST API on Enterprise) reads that, with light and dark as modes of one collection. What it can't do: tokens whose value depends on where they're read (the `.ui-palette` and severity scopes, relative colors over a parent surface) only resolve at the root, so the kit gets the root values and a note; and variables aren't components, a kit with component styles is a design effort on its own.
  - Options:
    - A: a `scripts/resolve-tokens.mjs` export of resolved variables per mode and theme, published next to `tokens.json`.
    - B: a full kit with components, outside this repo.
    - C: nothing until someone asks for Figma.
- [x] (2) Tokens: motion and elevation scales are thin. Material has 16 durations, 10 easings and 6 elevation levels, and Carbon has 6 durations with productive and expressive easings. OPUI has three durations, three easings, `--ui-motion` as an on and off switch, and shadows per use (`packages/opui/css/theme.css`)
  - Summary: The motion and elevation scales are thin compared with peers, with three durations, three easings and shadows per use.
  - Recommended: Fix with option A. The per-use tokens are what the components and themes read, and a level scale would only duplicate them.
  > Explain further
  - Explained: the components read motion through `--_duration` and `--_ease`, which map to `--ui-duration-fast` (0.1s), `--ui-duration` (0.2s), `--ui-duration-slow` (0.3s, overlays) and `--ui-ease`, `--ui-ease-enter`, `--ui-ease-exit`; `--ui-motion: 0` turns it all off. Material's 16 durations fall into four groups of which the components use three, and its 10 easings into standard, emphasized, accelerate and decelerate, which the three easings cover. Elevation is per use (`--ui-shadow-control`, `-overlay`, `-elevated`, `-scroll`, `-surface`, `-selected`), so a theme sets the shadow a card or a menu gets rather than a level; a 6-level scale would be a second way to spell the same shadows unless the per-use tokens map to it.
  - Options:
    - A (recommended): keep the per-use tokens and add a duration or shadow only when a component needs it.
    - B: add a level scale (`--ui-shadow-1` to `--ui-shadow-5`, `--ui-duration-1` to `-4`) and point the per-use tokens at it, so themes can set the scale once.
  > Fix with option A
  - Fixed: option A. No change: the components keep reading the per-use durations, easings and shadows, and a new duration or shadow comes with the component that needs it.
- [x] (2) Docs: component pages have no do and don't guidance, and accessibility notes are uneven. Carbon splits each component into Usage, Style, Code and Accessibility, and Primer gives do and don't examples plus accessibility expectations. OPUI has an Accessibility section on 17 of 32 pages, keyboard notes on 7, and "when to use" is one preamble sentence (`src/docs/components/`, `src/docs/components/AGENTS.md`)
  - Summary: Component pages lack do and don't guidance, and only about half have an Accessibility section or keyboard notes.
  - Recommended: Fix with option A. A `usage` slot and a data-driven Keyboard support partial give every page the same two sections.
  > Explain further
  - Explained: today the layout has an optional `accessibility` slot (17 of 32 pages fill it, 11 have keyboard notes with `<kbd>`), and "when to use" is the preamble sentence. Do and don't guidance needs a place and a habit: a `usage` slot ("When to use", "When not to", two or three short items each) next to `accessibility` in the Component layout, filled page by page, and a Keyboard support partial driven by data (a `keyboard` list in each `api.ts`) so the eleven hand-written lists become one table with the same wording.
  - Options:
    - A (recommended): the `usage` slot and the data-driven Keyboard support partial, then fill the pages in a sweep.
    - B: only the Keyboard support partial, and keep usage guidance to the preamble.
    - C: keep the pages as they are.
  > Fix with option A
  - Fixed: option A. The Component layout has a `usage` slot, rendered as Usage after the preamble and before the first section, and the `Usage` partial gives it "When to use" and "When not to use" with two or three items each; all 32 pages have one (the Button group and Callout guidance that was elsewhere on those pages moved into it). Every interactive component has a `keyboard` field in its `api.ts` (keys from a closed, ordered list in `src/component-api/keyboard.ts`, Dialog and Drawer share `modalKeyboard()`), which `checkApi` validates and the `KeyboardSupport` partial renders as one Key and Function table in the Accessibility section: 21 pages, and every hand-written list is gone. Each fact was checked in Chromium's accessibility tree, which corrected a few (Space doesn't activate menu link items, Range Page Up and Page Down move by 10% but at least one step, a customizable select also opens with Enter and the arrows). Anchor, Button, Button group, Chip, Form, List, Spinner, Textarea, Toggle and Tooltip got Accessibility sections. `tests/unit/docs-sections.test.ts` checks the list sizes, that every keyboard list is rendered and the reserved ids, and both AGENTS.md guides document it. Dialog's old Usage heading is Basics, and its What's new links follow.
- [x] (2) Repo: `tests/e2e/__screenshots__` weighs 65MB (1334 PNGs) and the git pack 273MB. `update-snapshots.yml:30` regenerates them wholesale (`rm -rf` then re-record), and 11 of the 120 visible commits touch them
  - Summary: Each snapshot refresh adds tens of megabytes of PNGs to the repository history.
  - Recommended: Fix with option A. LFS keeps the clone small and only needs `lfs: true` on the checkout steps; option B gives up dark-mode coverage.
  - Options:
    - A: Git LFS for `tests/e2e/__screenshots__`.
    - B: keep, but run the `dark` project on fewer fixtures.
  - Still open: Git LFS isn't set up; the README Maintainers section ("Visual baselines in git") lays out option A (Git LFS) and option B (keep, fewer dark fixtures) for the owner to decide.
  > Fix with option A
  - Fixed: option A. `.gitattributes` stores the baselines in Git LFS. The e2e shards install git-lfs in the Playwright container, restore `.git/lfs/objects` from the Actions cache (keyed on the object ids) and `git lfs pull` only the missing images, so a run spends LFS bandwidth on new images only; `check`, `screenshots`, the release workflows and the Netlify deploy work with the pointers (`check` sets `GIT_LFS_SKIP_SMUDGE=1`, and so does the cloud session hook). LFS objects can't be uploaded from a cloud session (`lfs.github.com` is blocked there), so the existing PNGs stay raw in git until the next `update-snapshots` run: it re-records every baseline, commits them as pointers (checked with `git lfs fsck --pointers` before the push) and uploads them with `GITHUB_TOKEN`. Until that run, a clone with git-lfs lists some PNGs as modified; the README section "Visual baselines in Git LFS" has the command that clears it. The PNGs already in the history stay, since nothing rewrites it.
- [ ] (2) Release: `scripts/release.mjs` publishes from the maintainer's machine with their npm login, so `opui-css` has no provenance statement (npm only signs provenance for a publish from CI, so `--provenance` was dropped) and every release needs a local npm session with 2FA (`scripts/release.mjs:232-236`, `RELEASING.md:73`)
  - Summary: Releases are published from a laptop, so npm shows no provenance for the package and each one needs a local npm login.
  - Recommended: Fix with option A. Trusted publishing needs no token or secret in the repository, only the publisher entry on npmjs.com.
  - Fix: a `publish.yml` workflow on the tag push (the bare versions and the `-rc.N` candidates) with `id-token: write` checks out the tag, runs `pnpm install --frozen-lockfile` and `pnpm check`, and publishes from `packages/opui` with `npm publish --provenance`, `--tag next` for a candidate and `--tag latest` otherwise. `release.mjs` then only prepares the release: it dates the CHANGELOG (not for a candidate), sets `version`, runs `pnpm check`, commits, tags and pushes. Until the workflow has published, the dated heading on `main` already marks the version as released in `src/utils/release.ts`, so the docs deploy that the push starts can claim the release a few minutes early.
  - Options:
    - A (recommended): npm trusted publishing (OIDC). Needs the trusted publisher configured on npmjs.com for `opui-css` (package settings, GitHub Actions, repository `felix-bohlin/ui`, workflow `publish.yml`), which only the package owner can add.
    - B: an npm automation token in an `NPM_TOKEN` repository secret, read by `publish.yml`. Provenance works the same, but the token has to be created, stored and rotated.
- [x] (2) Tests: the check scripts have no tests of their own. They only run on the tree, which passes, so a pattern that breaks would pass everything too (`scripts/check-css-vars.mjs`, `scripts/sort-css.mjs`, `scripts/check-characters.mjs`, `scripts/check-components.mjs`, `scripts/stylelint-logical-shorthands.mjs`)
  - Summary: If a check script's pattern breaks, `pnpm check` keeps passing without noticing.
  - Recommended: Fix. Each check gets one known-bad fixture, and the stylelint plugin needs no change to test.
  - Fix: export each script's core as a function of its input and test it on a known-bad fixture per rule. The stylelint plugin can be tested as it is with `stylelint.lint({ code, config })`.
  - Fixed: `sort-css`, `check-characters`, `check-commits`, `check-css-vars` and `check-components` export their rules and only read the tree and exit when run directly, and each runs as before. `tests/unit/check-scripts.test.ts` gives each rule a known-bad and a good input, and runs the Stylelint plugin through `stylelint.lint`. Putting `--_motion` last, dropping `px` from `LENGTH`, turning off the `ui-` prefix check, matching characters only at the line start or counting three values in the plugin each fails a test.
- [x] (2) Tests: nothing checks that the invalid styles only show after interaction or submit (`:user-invalid`), which CHECKS.md lists as a manual check for Checkbox and TextField (`packages/opui/css/components/text-field.css`, `packages/opui/css/components/checkbox.css`)
  - Summary: Nothing guards that fields wait for the user to interact before they look invalid.
  - Recommended: Fix. One test on the TextField Validation example covers the rule.
  - Fix: on the TextField Validation example, check that the border starts in the normal color and turns to the invalid color after typing an invalid value and leaving the field.
  - Fixed: two interaction tests run in every framework. On the TextField `Validation` example, the required field's border isn't `--ui-invalid` at first, turns `--ui-invalid` after typing, deleting and leaving it, and goes back once it has a value. On the Checkbox `Validation` example, the required box's border turns `--ui-invalid` once it's checked and unchecked. Both fail when the rule drops `:user-invalid` or uses `:invalid` instead, and the 6.0.0 release checks no longer list them.
- [x] (2) CI: one `update-snapshots` label accepts every visual change in the pull request at once, and the bot commit lists nothing to review, so a regression rides along with an intended change unless someone opens every image (`.github/workflows/update-snapshots.yml:30`, `package.json`)
  - Summary: Updating the visual baselines accepts every change at once without saying which images moved.
  - Recommended: Fix with option A. It keeps how baselines are made and only adds the list to review.
  - Options:
    - A (recommended): write the changed and added images to the job summary and a PR comment.
    - B: run `--update-snapshots=changed` without `rm -rf`, and delete baselines without an example in a separate step.
  > Fix with option A
  - Fixed: option A. `scripts/baseline-changes.mjs` records every baseline's sha256 before the `rm -rf` and after the re-record (the LFS object id is the same hash, so the move to LFS doesn't count as a change), puts the counts in the bot commit subject ("chore: update visual snapshots (1 added, 3 changed)"), and lists added, changed and removed images per project, linked to the bot commit, in the run summary and in one pull request comment that later runs update. A fork pull request now gets a clear error instead of a failing label removal, and the preview comment has its own marker so the two don't overwrite each other. Unit tests in `tests/unit/baseline-changes.test.ts`; the workflow itself first runs on GitHub.
- [x] (2) Tooling: `check-browser-support` can detect 14 of the 51 ids the pages list, so the other 37 (`starting-style`, `popover`, `interpolate-size`, `customizable-select`, `scroll-markers` and more) are only checked for being known and sorted. It doesn't look at the HTML features in the examples, and it reads the stylesheets from the page's `?raw` imports, not the `api.ts` `css` list (`packages/opui/scripts/features.mjs:47-65`, `scripts/check-browser-support.mjs:21`, `scripts/check-browser-support.mjs:63-79`)
  - Summary: Most browser support chips are never compared with the CSS, so a missing or stale chip passes.
  - Recommended: Fix. A detector per id turns most of the browser-support agent's review into a script.
  - Replaces: `.claude/agents/browser-support.md:30-34`, steps 1, 2, 3 and 5 (list the features the CSS uses, report missing and unused ids, check the HTML features in the examples).
  - Fix: add a pattern to `features.mjs` for every id in use, attribute detectors on the example HTML (`commandfor`, `interestfor`, `closedby`, `<details name>`, `popover`, `<datalist>`), read the sheets from `api.ts`, and fail on a listed id that has no detector. The agent then keeps only step 4, an id that names the wrong feature.
  > Fix
  - Fixed: `check-browser-support` detects every listed id: a CSS pattern per id in `features.mjs` (47, up from 14), and `HTML_FEATURES`, which finds `commandfor`, `interestfor`, `<dialog closedby>`, `<details name>`, `popover`, `popover="hint"` and `<datalist>` in the example HTML with parse5. It reads each page's sheets from the `css` of its `api.ts`, matches class selectors and at-rule conditions against the examples, and fails on a listed id nothing detects and on a missing or unused id. It corrected seven lists (`overflow-clip` on List and Select, `scrollbar-width` on Table, `lh` on Tabs and Toggle, no `invoker-commands` on Anchor and no `color-mix` on Menu), unit tests cover every pattern and detector, and the browser-support agent keeps only the wrong-id review.
- [x] (2) Tests: the "only shrinks" and "only when intended" rules for the ledgers are prose. Recording the a11y ledger can add keys, a `.diff` that matches the current drift passes, and a new `naming-allowlist.json` entry passes; only fixed or stale entries fail (`tests/e2e/a11y.spec.ts:106-113`, `tests/e2e/a11y.spec.ts:162-176`, `tests/unit/parity.test.ts:253-270`, `tests/unit/naming.test.ts:325-330`)
  - Summary: A new accessibility violation, markup drift or naming exception can be accepted without anyone noticing.
  - Recommended: Fix with option A. It turns the rule into a check and keeps a way to accept intended changes.
  - Replaces: `AGENTS.md:86` ("NEVER update snapshots, add or change `.diff` files, or edit `tests/e2e/a11y-known-violations.json` ... unless the change is intended. Say so in the commit message").
  - Options:
    - A (recommended): a step in the `history` CI job, which has the full history, that diffs the a11y ledger keys, `naming-allowlist.json` and the set of parity `.diff` files against the merge base, and fails on an addition unless a commit on the branch carries a `Ledger-Change: intended` trailer.
    - B: only assert that `naming-allowlist.json` stays empty.
  - Still open: the naming allowlist is gone (naming problems must be `[]`), and `scripts/check-ratchets.mjs` in the `history` CI job (the `screenshots` job, renamed) fails when `scripts/css-vars-allowlist.json` or `tests/unit/todo-allowlist.json` gains an entry. The a11y ledger and the parity `.diff` files can still gain entries.
  > Fix with option A
  - Fixed: option A. `scripts/check-ratchets.mjs`, which the `history` job already runs, also fails when `tests/e2e/a11y-known-violations.json` gains a key or rule, or a parity `.diff` file is added or gains drift lines, against the merge base, unless a commit on the branch carries the trailer `Ledger-Change: intended`; its helpers are tested in `check-scripts.test.ts`. `AGENTS.md`, the README and the framework-parity agent name the check instead of the rule. Tried locally with a trailer commit; the first pull request that grows a ledger shows it in Actions.
- [x] (2) CI: nothing checks commit messages. The prefixes and the ban on the em dash and the middle dot in commit messages are prose, and `check-characters` only reads files (`scripts/check-characters.mjs:13-23`, `AGENTS.md:11`, `AGENTS.md:43`)
  - Summary: A commit with the wrong prefix or a forbidden character goes in unnoticed.
  - Recommended: Fix. It is a few lines in a job that already has the history.
  - Replaces: the commit-message half of `AGENTS.md:11` and `AGENTS.md:43` ("Use feat, fix, docs, chore, revert, refactor as commit message prefixes").
  - Fix: in the `screenshots` job, check every non-merge subject since the merge base against `^(chore|docs|feat|fix|refactor|revert)(\(.+\))?!?: ` and every message against the characters `check-characters` bans, and say which commit to reword.
  - Fixed: `scripts/check-commits.mjs` checks the prefix (`feat!:` allowed, no scope, since none is used), a subject of at most 100 characters and the characters from `scripts/forbidden-characters.mjs`. It runs as the `commit-msg` hook in `.githooks/`, which the `prepare` script turns on, and in a separate `Commits` workflow on pull requests that also checks the title and reruns when it's edited. Commits authored before 2026-10-26 14:30 UTC are skipped, so the open pull requests pass.
- [x] (2) Tooling: `check-components` doesn't check several rules the components guide states: barrel exports are compared as sorted sets, so their order isn't checked; context files are only checked to exist; the `...rest` spread is skipped, not required; only the barrels' Props sources are checked, not each component's own types import; part `<Root><Part>Props` names and the `$bindable`/`defineModel` list are unchecked; class order is only compared for lists that contain `className` (`scripts/check-components.mjs:82-86`, `scripts/check-components.mjs:154-166`, `scripts/check-components.mjs:272`, `scripts/check-components.mjs:355-360`, `scripts/check-components.mjs:479-489`)
  - Summary: Components can break the guide's export, context, rest and binding rules without a failure.
  - Recommended: Fix. They hold today, so each check costs nothing to add.
  - Replaces: `packages/opui/components/AGENTS.md:13` (Props Type), `:15` (Rest Props), `:20` (Exports, sorted), `:88` (the `$bindable` and `defineModel` list), `:294` (context files), and `.claude/agents/framework-parity.md:30,32`.
  - Fix: add each rule to the TypeScript parse the type-literal and destructuring checks use, one rule at a time, and shrink each guide line to the rule plus "`pnpm check-components` checks it".
  - Fixed: next to the types import, barrel order and `ui-` class prefix checks, `scripts/check-components.mjs` now fails on a component without its `<Name>Props` export in a barrel; on context files that don't export the names derived from the folder, don't take their shape from the `Context` that `types.ts` exports or don't build on the framework's context functions, and on a Vue `provide` of a value that isn't `reactive()`; on Astro, React and Svelte components that don't capture and spread `...rest`, and Vue components with `inheritAttrs: false` and no `v-bind`; on a component that doesn't type its props with `Props` or `<Root><Part>Props` from its framework's types file (Astro as `Props`), or Vue slots typed with anything but `Slots` or the part's `<Root><Part>Slots`; on other `*Props` names in the type files and parts not named after their root; on Svelte `$bindable()` props and Vue `defineModel` calls that differ from the `model` in the component's `api.ts`; and on class order in every class list, with React's plain `className={...}` as a one-item list. `Astro.props as Props` now counts as the props source, so the destructuring order of `CheckboxInput`, `RadioInput` and `SwitchInput` is checked too. Nothing needed fixing: the Checkbox, Radio and Switch destructuring was already sorted. `tests/unit/check-scripts.test.ts` tests each new check. The components guide's Props Type, Rest Props, Exports, `$bindable` and context lines and the framework-parity agent's Implementation and Exports checks now point at the check.
- [x] (2) API docs: `checkApi` checks props, values, slots and hydration, but not that documented classes exist in the component's CSS, that every class a stylesheet adds is in some `api.ts` (`.ui-motion-off` in `carousel.css:77` is in none), that destructured defaults match `default`, or that an `anchorName` entry is still an `anchor-name` in the CSS (the anatomy spec only catches missing ones) (`src/utils/component-source.ts:267-428`, `tests/e2e/anatomy.spec.ts:70-140`)
  - Summary: The API tables can document classes and defaults the code no longer has, and nothing fails.
  - Recommended: Fix. It moves the api-docs agent's CSS and Defaults checks into the tests.
  - Replaces: `src/component-api/AGENTS.md:10` (CSS Verified) and `.claude/agents/api-docs.md:31,33-34` (Defaults, CSS, Parts).
  - Fix: add the four checks to `checkApi`, reading the sheets with `stylesheets(api)`, and shrink the guide's CSS Verified line to a pointer.
  > Fix
  - Fixed: `checkApi` checks documented classes, `--*` `cssVar`s and `anchorName`s against `stylesheets(api)` (classes may also come from the core CSS and `theme.css`), and destructured literal defaults against `default` in all four frameworks; a new `checkClasses` fails on a class in `css/components/*.css` that no `api.ts` names, in `component-api.test.ts` and in the docs build. Tooltip's `api.ts` now lists `anchor.css`, where its `--anchor` comes from, and Carousel documents `.ui-motion-off`. The CSS Verified line in `src/component-api/AGENTS.md` and the api-docs agent's Defaults, CSS and Parts steps shrank to what needs judgment.
- [x] (2) CSS: Stylelint enforces none of the CSS review's mechanical rules: `:hover` only inside `@media (hover: hover)`, no bare `:focus`, no `!important`, no state classes such as `.ui-open` or `.ui-checked`, vendor prefixes only on native-control pseudo-elements, transitions and animations reading `--_duration`, and no dead selectors (`stylelint.config.mjs`, `scripts/stylelint-logical-shorthands.mjs`)
  - Summary: CSS can break the review rules for hover, focus, states and motion, and only an agent review notices.
  - Recommended: Fix. One plugin per rule, like the logical-shorthands one.
  - Replaces: `.claude/agents/css.md:33-36` (dead selectors, `!important`, hover, focus and motion, states).
  - Fix: add the rules as Stylelint plugins or built-in rules, with the known exceptions named in the config (`typography.css:313` and `normalize.css:81-87` for hover, `text-field.css:69` for `:focus`). The css agent then keeps the judgment rules (roles, shared properties, modern CSS).
  - Fixed: `stylelint.config.mjs` runs, on the package CSS, `declaration-no-important`, the built-in `*-no-vendor-prefix` rules and six plugins in `scripts/`: `opui/hover-media` (`:hover` only in `@media (hover: hover)`), `opui/focus-visible` (no `:focus`), `opui/state-classes` (`.ui-open`, `.ui-checked` and other state names, with the native attribute or pseudo-class to use instead), `opui/vendor-prefix` (a prefixed property only next to its standard one with the same value, as `-webkit-user-select` is), `opui/motion-duration` (`transition` and `animation` read a `--_*duration` property or scale by `--_motion`) and `opui/unused-classes` (every `.ui-*` class in `css/components`, `css/compat` and `core` occurs in `packages/opui/components`, `packages/opui/css/js` or `src`). The exceptions are named per file in the config: the `:autofill:hover`, `:autofill:focus` and 5000s autofill transition in `normalize.css`, `&:focus` in `text-field.css` and the static `.ui-disabled` in `chip.css` (the `typography.css` hover is gone), and a plugin fails on an exception that no longer matches. The `mark` link reset in `link.css` moved its `:hover` into `@media (hover: hover)`. `tests/unit/stylelint.test.ts` checks each rule, and `.claude/agents/css.md` names the rules instead of the dead selector, `!important`, hover, focus, motion and state lines.
- [x] (2) Examples: none of the docs guide's mechanical example rules are checked: PascalCase file names, React examples default-exporting a function named after the file, `"use client"` on stateful React examples, no outer `example-row` or `example-column` wrapper, no orphan examples, `DocLink` for internal links, the anatomy slot Astro only, `isDependency` on CSS with its own page, decorative SVGs with `aria-hidden`, and sections starting with an `h2` with an `id` (`scripts/check-components.mjs:415-455`, `src/components/AutoExample.astro:34-96`)
  - Summary: Examples can break the docs guide's file, naming, wrapper and link rules, and only an agent review notices.
  - Recommended: Fix. They hold today, so each check costs nothing to add.
  - Replaces: `src/docs/components/AGENTS.md:46,115,118,130,153,175,294` and `.claude/agents/examples.md:21-22,25`.
  - Fix: add the file rules to the examples loop in `check-components`, the SVG rule to `parity.test.ts`, which renders every example, and the page rules (`DocLink`, anatomy, `isDependency`, `h2[id]`) to a docs-page test. The examples agent then keeps coverage and content.
  - Still open: `tests/unit/docs-pages.test.ts` checks that links to docs pages use `DocLink`, that callouts sit outside rich text and that a `Conditional` with block content sets `as` (27 didn't). The file, wrapper, orphan, anatomy, `isDependency`, SVG and `h2[id]` rules aren't checked yet.
  - Fixed: the examples loop in `scripts/check-components.mjs` checks PascalCase names, the React default export's name (with the `Example` suffix when the file name is imported), `"use client"` on React examples that call a client hook (any `use*` but `useCallback`, `useDebugValue`, `useId` and `useMemo`), set an event handler or pass a function prop (and not on others), an outer `example-row` or `example-column` wrapper in every format, and that some page or partial shows every example, through `<AutoExample>` (with its `slug`, when set) or an import for a manual `<Example>`, not counting commented-out ones, and that every `<AutoExample>` names files that exist. `tests/unit/docs-pages.test.ts` also fails on an `href` (quoted, template literal or a string expression) or `link()` with a framework prefix, a `<Conditional as="p">` with block content (a nested `<Conditional>` counts by its `as`), and on component pages a section that doesn't start with an `h2` (or `h3` when nested, also in the layout's Usage, Accessibility, Anatomy, Under the hood and Installation sections) with an `id`, an example outside a section or a layout slot, an anatomy slot with anything but `<Anatomy>` or with examples, code, `<Conditional>` or framework slots, and `isDependency` missing from or set on a tab whose CSS has no other page. `tests/unit/parity.test.ts` fails on a rendered `<svg>` that is neither hidden (`aria-hidden="true"` on it or an ancestor) nor named, and `tests/unit/check-scripts.test.ts` tests the example checks. The guide lines and the examples agent's Files, Used and Wrappers checks now point at the checks.
- [x] (2) Changelog: `changelog.test.ts` checks names, order and headings, but not that an Added, Breaking or Changed entry has a What's new note, that a Breaking entry has a MIGRATING section, or that new classes and tokens are named in Unreleased (only removed ones are). `whatsNew` and `highlighted` aren't typed against the page slugs, and about 20 notes have no `href="#"` (`tests/unit/changelog.test.ts`, `tests/unit/migrating.test.ts:15`, `src/utils/whats-new.ts:1342`, `src/utils/whats-new.ts:1353`)
  - Summary: A change can ship without its What's new note or migration note, and a note can link nowhere.
  - Recommended: Fix. The entry, note and section names are all machine-readable.
  - Replaces: `AGENTS.md:49` (a note for Added, Breaking and Changed entries), `AGENTS.md:51` (link the section), and `.claude/agents/changelog.md:24,27-28` (Logged, What's new, Migrating).
  - Fix: type `whatsNew` and `highlighted` with `satisfies` against the docs slugs, and add the entry-to-note, Breaking-to-MIGRATING, new-class and anchor checks to `changelog.test.ts`, with a named list for entries that span several components. The changelog agent then keeps "is the entry accurate and complete".
  - Still open: `changelog.test.ts` now fails when a component an `Added`, `Breaking` or `Changed` entry starts with has no page, or its page has no What's new note of that kind, and `check-dist` checks the anchors. Left: the Breaking-to-MIGRATING and new-class checks, typing the `whatsNew` keys, and links in the 20 notes without one. `tests/unit/whats-new.test.ts` checks that every key is a page slug and every highlighted page has notes.
  > Fix
  - Fixed: the What's new note and slug checks were already in place. `changelog.test.ts` now fails when a Breaking entry's component has no MIGRATING section (the lookup, `migratingAnchor`, moved to `src/utils/migrating.ts`) and when a class or theme token added since the last release is named in no entry, and `whats-new.test.ts` fails on a note without a `href="#` link; `highlighted` satisfies the `whatsNew` keys (the page slugs come from `import.meta.glob`, so the runtime test keeps checking those). The 20 unlinked notes link their section, and the CHANGELOG now names `.ui-peek`, `.ui-align-center`, `.ui-markers`, the seven `--ui-palette-*-lightness` limits and `.ui-focusable`.
- [x] (2) Tests: the release checks list docs-site behavior that a Playwright spec could check: the framework picker keeping the page and the hash, search with the arrow keys, Enter and Esc, copy buttons copying the shown code, no sideways scrolling at 320px, no running animations with reduced motion (`getAnimations()`), and a Tab walk where focus is always visible. Only the Menu keyboard checks exist (`tests/e2e/interaction.spec.ts:995-1046`, `docs/releases/6.0.0.md:31`, `docs/releases/6.0.0.md:118`, `docs/releases/6.0.0.md:129`, `docs/releases/6.0.0.md:150-154`, `docs/releases/6.0.0.md:166`)
  - Summary: Several manual release checks for the docs site could run as tests on every pull request.
  - Recommended: Fix. Each one removes a manual check from every release.
  - Replaces: the matching manual checks in `docs/releases/6.0.0.md` (Framework picker, Search, Code blocks, Small screens, Browser zoom, Reduced motion, Keyboard only), which then say "covered by `docs.spec.ts`" or keep only what a test can't see.
  - Fix: a `tests/e2e/docs.spec.ts` against the built site, starting with the picker and search.
  > Fix
  - Fixed: `tests/e2e/docs.spec.ts` checks that the framework picker keeps the page and its hash, search with the arrow keys, Enter and Esc, that copy buttons copy the shown code, no sideways scrolling at 320px, no animations with reduced motion in the Accordion, Dialog, Drawer, Menu and Tooltip examples, and a Tab walk with a visible focus outline at every stop. It found two bugs, now fixed: the search index titled the Migrating guide "{title}", and a focused show-code chip below the viewport stayed out of view. `docs/releases/6.0.0.md` keeps only the manual parts of those checks.
- [x] (2) CI: the production Netlify deploy is a step of the `check` job, and `e2e-shard` runs after `check`, so a push to `main` whose e2e fails still deploys (`.github/workflows/ci.yml:66-72`, `.github/workflows/ci.yml:105`)
  - Summary: A commit that fails the end-to-end tests can still reach the production docs.
  - Recommended: Fix with option A. The `dist` artifact already exists, so the deploy only moves.
  - Replaces: no prose rule.
  - Options:
    - A (recommended): move the production deploy into a job with `needs: [check, e2e]` that downloads the `dist` artifact.
    - B: keep deploying from `check`.
  > Fix with option A
  - Fixed: option A. On `main`, `check` uploads the build without test pages as the `dist-production` artifact, and a new `deploy` job that needs `check` and `e2e` runs `netlify deploy --prod` from it, so a commit that fails e2e no longer reaches production. README and RELEASING.md say so. The job skips `pnpm install`, since `pnpm dlx` doesn't need it; the first push to `main` shows whether `netlify deploy` agrees.
- [ ] (4) New components the blocks point to. Each block currently draws these with its own CSS:
  - Summary: Blocks draw charts, breadcrumbs, steppers, timelines, ratings, pagination and stat cards with their own CSS for lack of components.
  - Recommended: Explain further. Still true (none of the eleven exist in the package), but which ones to build is a scope decision, and severity 4 looks high for a suggestion that breaks nothing.
  - Bar chart or sparkline: analytics-dashboard, sales-dashboard, server-status. Add the categorical chart palette with it (`--ui-chart-1` to `--ui-chart-6`, see the data visualization palette item under Suggestions).
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
  > Fix
  > There’s a separate branch with those components. Pr #418. It’s old and needs some rework but see what you can do there. It’s not going to ship in 6.0 so go nuts and improve wherever you want.
  - Still open: work on PR felix-bohlin/ui#418 (`feat/component-proposals`) stopped at the maintainer's request, since that pull request isn't the focus now. Nothing was pushed to it: the branch is still at c9ab5bccb from October 16, and the merge and React rework that had started stayed local and were discarded.
- [x] (2) Theming: there is no palette generator. Material builds a full scheme from one seed color and a contrast level, and Radix and Spectrum publish engineered 12-step scales. OPUI derives its palette from `--ui-palette-source` with fixed lightness steps, and the theme generator sets 8 tokens and a source color (`packages/opui/core/palette.css`, `src/utils/theme-store.ts`)
  - Summary: There is no palette generator; the theme generator sets eight tokens and a source color with fixed lightness steps.
  - Recommended: Fix with option A. The derivation already lives in CSS, so a builder is docs-site UI over the theme generator, no package change.
  > Explain further
  > I like the idea of a generator or builder of some kind. Materials is great, haven’t tried the others, shadcn has a really really cool one
  - Explained: the derivation already lives in CSS: `--ui-palette-source` drives `--ui-color-1..16` (`palette.css`), the severity scopes derive their own source from `--ui-critical` and friends, and `.ui-contrast-more` tightens the knobs. So a builder mostly needs UI, not a new algorithm. shadcn's builder is presets plus live token sliders with a CSS export; Material's Theme Builder takes one seed and a contrast slider and derives the scheme; tweakcn adds fonts, radius and shadows. The theme generator (`src/components/ThemeGenerator`, 8 tokens and a source color) is the seed of that: add presets (the example themes as starting points), a seed color that sets hue and chroma, the contrast level, radius, density, a font stack, a dark mode preview on real components, and export as a `packages/opui/themes/` file.
  - Options:
    - A (recommended): grow the theme generator into a builder page with presets, more knobs and an export. Docs-site work, no package change.
    - B: add a seed-to-scheme algorithm in the package (Material's tonal palettes) that derives the gray and severity hues from the seed too.
    - C: leave the generator as it is.
  - Fixed: option A. The Theme builder at `/theme-builder` (Themes in the header) replaces the theme generator: it starts from Default or an example theme, groups the settings from brand color to buttons and fields, previews components and blocks in light and dark with more contrast, checks every contrast promise in four modes, shares themes as a link, and exports one `theme.css` (the example theme, then the changed tokens in `theme.custom`) that the site applies as is. No package change.

## To check

- [x] (1) Tokens: `--ui-on-accent` names a fill that doesn't exist (there is no `--ui-accent`), and `--ui-palette-on-strong` isn't a drop-in for it: it is dark (`--ui-color-16`) in dark mode, made for the light `--ui-palette-strong` shade, while Badge severity fills and the dark-mode choice mark sit on a fill capped at `--ui-fill-max-lightness` and need light text (`packages/opui/css/theme.css:350`, `packages/opui/css/components/badge.css:67`, `packages/opui/css/components/choice.css:13-16`)
  - Summary: The on-accent text token names a fill that doesn't exist, so where its light text belongs is unclear.
  - Recommended: Fix with option A. It is marked recommended, and the theme, badge and choice code still read the token as described.
  - Options:
    - A (recommended): rename it `--ui-on-fill`, the text on an intent fill kept within `--ui-fill-max-lightness`, and describe that pairing.
    - B: draw the Badge severity fill and the choice mark with `--ui-palette-strong` and read `--ui-palette-on-strong` (a visual change in dark mode).
    - C: keep `--ui-on-accent` and document it as the one `--ui-on-*` without a fill token.
  > Fix with option A
  - Fixed: option A. `--ui-on-accent` is `--ui-on-fill`, the text on an intent fill kept within `--ui-accent-fill-max-lightness` (Button and Badge fills) or `--ui-choice-fill-max-lightness` (choice marks), and its description says why `--ui-palette-on-strong` isn't a drop-in. Every reader (`theme.css`, `badge.css`, `button.css`, `choice.css`, the Under the hood builds, the checkbox Learn post, the token page, the contrast promises and tests) moved; it equals the old value in every scope and mode. It wasn't released (not in `released-tokens.json`), so the four Unreleased entries that named it changed instead of a Breaking one.
- [x] (1) Tokens: `--ui-line-height-relaxed` (`1.75`) is the page line height on `html` and the `Tabs` label line height, so it can't fold into `--ui-line-height-control` (`1.5`) without shrinking the tabs and changing all page text (`packages/opui/core/normalize.css:21`, `packages/opui/css/components/tabs.css:84`)
  - Summary: Page text and tab labels share the relaxed line height, so folding it into the control line height would change both.
  - Recommended: Fix with option A. It is marked recommended and keeps the tokens as documented, and normalize and tabs still read the relaxed value.
  - Options:
    - A (recommended): keep `--ui-line-height-relaxed` for the page and the tabs, as documented now.
    - B: tabs read `--ui-line-height-control` and keep their height through padding, and `html` reads `--ui-line-height`.
  > Fix with option A
  - Fixed: option A. Nothing to change: `normalize.css` sets the page line height and `tabs.css` the tab labels from `--ui-line-height-relaxed` (`1.75`), and its description in the token table already says "Line height of the page text set on `html`, and of `Tabs` labels."
- [x] (1) Tokens: the token table hides instance inputs and files some tokens in the wrong section: `--ui-anchor-position-area` isn't listed (it is set per element, not themed), `--ui-code-block-*` sit under Typography, `--ui-track-bg-color` under Surfaces, and there is no Palette steps tier (`src/utils/theme-tokens.ts:24-47`, `packages/opui/css/theme.css`)
  - Summary: The token table omits the per-element inputs and lists the code block and track tokens under the wrong headings.
  - Recommended: Fix. The section list still has no Instance inputs, Code, Controls or Palette steps section, and the tokens still sit under Typography and Surfaces.
  - Fix: an "Instance inputs" section built from an explicit list in `theme-tokens.ts`, Code and Controls sections in `theme.css`, and a Palette steps tier generated from `core/palette.css`.
  > Fix
  - Fixed: `theme.css` has a Code section (`--ui-code-bg-color`, `--ui-code-block-bg-color`, `--ui-code-block-text-color`, out of Typography) and a Controls section (`--ui-control-accent`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-on-control-accent` and `--ui-track-bg-color`, out of the knobs, Borders and Surfaces), with no computed value changed. The token table adds a Palette steps section after Palette (`--ui-color-1..16` and `--ui-gray-1..16`, parsed from `core/palette.css` by `src/utils/palette-steps.ts`) and an Instance inputs section from `INSTANCE_INPUTS` in `theme-tokens.ts` (`--ui-anchor-position-area`, the only one, in a new `input` tier that the component variable tables leave out). `tokens.json` follows the table, and a unit test fails when a stylesheet reads a `--ui-*` property that is neither a token nor an instance input.
- [ ] (2) Anchor: on `/html/components/anchor/` in Chrome 142+, Tab to "felix-bohlin/ui" in the RepoCard example, wait for the card, press Tab and check whether focus reaches "Star" in the `popover="hint"` card, and whether a screen reader announces the card. On touch, tapping the link follows it, so "Star" can't be reached (`src/component-examples/anchor/RepoCard.html:7-35`)
  - Summary: Whether keyboard focus reaches the Star button in the repo hover card, and what a screen reader says about it, is unknown.
  - Recommended: Fix with option A. Only a manual run in Chrome can confirm it, and the release checks are where manual runs happen.
  > Explain further
  - Explained: this is the case the interest invokers explainer calls partial interest. The card holds a focusable Star button, so Tab to the link shows the card but keeps focus on the link; the browser announces the hotkey (Alt+Up Arrow by default) that gives full interest, after which Tab reaches Star and Escape loses interest and closes the card. A screen reader gets the card through the `aria-details` relation the browser adds to the link while the card shows (a plain-text hint would be `aria-describedby`). On touch, Chrome 142+ shows interest on long press, so the link isn't followed and Star is reachable. Only a run in Chrome 142+ with NVDA or VoiceOver can confirm the wording, nothing to change in the example.
  > Explain further
  - Explained: a correction first: the "partial interest" and hotkey in the note above come from an older draft. The current interest invokers explainer dropped partial interest as too complicated, and keyboard interest now works like this. Tab to "felix-bohlin/ui", and after the start delay the card opens. Because the card is a popover with a button in it (a "rich hint"), the browser puts it next in the Tab order after the link, so the next Tab moves into the card and reaches "Star"; moving focus inside the card keeps it open, and Esc closes it. For a screen reader, Chromium gives the card a minimum role of tooltip and, while it is open, an `aria-details` relation from the link to the card, plus "expanded" on the link (a plain text tooltip instead becomes the trigger's description, with no expanded state). On touch, tapping the link still follows it. A long press opens the link's context menu, which gets a "Show details" item that opens the card without leaving the page, and the card then stays until a tap outside, so "Star" is reachable. What only a manual run can confirm is whether Chrome's shipped version does all of this (the Tab order into the card, "Show details" on Android) and the exact words NVDA and VoiceOver use. Nothing in the example needs to change for it.
  - Still open: the manual check in Chrome 142+ above.
  - Options:
    - A (recommended): move the check (Tab into the card, the screen reader announcement, "Show details" on Android) to the Anchor line of the release checks in `docs/releases/6.0.0.md` and remove this item.
    - B: keep the item open until someone runs the check.
- [x] (2) CSS: every `user-select: none` is unprefixed, and web-features lists no Safari support for unprefixed `user-select`. Check in Safari whether button, tab, summary, choice, list and range text can still be selected. If so, add `-webkit-user-select: none` next to each (`packages/opui/css/components/button.css:137`, `packages/opui/css/components/accordion.css:102`, `packages/opui/css/components/choice.css:37,52`, `packages/opui/css/components/form.css:54`, `packages/opui/css/components/list.css:69`, `packages/opui/css/components/range.css:103`, `packages/opui/css/components/tabs.css:99`, `packages/opui/css/components/text-field.css:394`, `packages/opui/css/components/toggle-button.css:35`)
  - Summary: In Safari, pressing or dragging on buttons, tabs, summaries, choices, list items and range labels can select their text.
  - Recommended: Fix. web-features lists no Safari support for unprefixed user-select, and -webkit-user-select: none next to each declaration changes nothing in Chromium, so it is a zero-cost fallback.
  > Fix
  > Isn’t that good for some screen readers that text can be selectable? Maybe I’m understanding the issue wrong.
  - Explained: `user-select: none` only stops selecting text with a pointer (a drag, a double-click, a long press). Screen readers don't go through the selection: they read the accessibility tree, so NVDA's browse mode, VoiceOver's reading keys and iOS VoiceOver read the text the same either way, and the control keeps its name. What it does block is copying that text and tools that speak the selected text (macOS Speak Selection, select-to-speak extensions). That's why the library only sets it where native controls behave the same and a press should act, not select: button, tab, summary and choice labels, list items on touch screens, and disabled fields, fieldsets and ranges. Body text, field values, descriptions and callouts stay selectable. Chromium and Firefox already apply it; web-features 3.43 lists no Safari support for the unprefixed property, so Safari selects those labels today.
  - Fixed: `-webkit-user-select: none` sits next to each of the ten declarations (`button.css`, `accordion.css`, `choice.css` twice, `form.css`, `list.css`, `range.css`, `tabs.css`, `text-field.css`, `toggle-button.css`). Engines with the unprefixed property read it as the same property, so nothing changes there, which the browser support rules allow for a fallback in the component CSS, and the Fixed section of the CHANGELOG names the components.
- [x] (2) Dialog: on `/html/components/dialog/` (Long content), check in Safari that the terms can be scrolled with the keyboard. `.ui-content` scrolls but holds only paragraphs, and focus lands on "Decline" outside the scroller. Chromium and Firefox make such a scroller focusable, Safari doesn't. If confirmed, add `tabindex="0"` to that `.ui-content` in all five formats and a sentence in the prose (`src/component-examples/dialog/LongContent.html:18-82`, `packages/opui/css/components/dialog.css:38-43`)
  - Summary: In Safari, keyboard users can't scroll the terms in the long-content dialog because the scrolling area isn't focusable.
  - Recommended: Fix. Safari has no keyboard-focusable scrollers, the example's content holds only paragraphs and no tabindex in any format, so the check would plainly fail.
  > Fix
  - Fixed: the Long content scroller has `tabindex="0"`, `role="region"` and `aria-label="Terms"` in all five formats (a focusable element needs a role and a name, and `aria-label` isn't allowed on a plain `div`), the section says that Safari doesn't make a scroll container focusable, and a focused Dialog or Drawer content draws its focus ring inside, since the dialog's overflow clipped it. `a11y.spec.ts` now opens that dialog before axe runs; without the attributes axe reports `scrollable-region-focusable`.
- [x] (2) Range: with NVDA and VoiceOver, check what arrow keys announce on `/astro/test/range` and the HTML Value example. The `<output class="ui-value">` is a `status` live region that the script rewrites on every input, so the value may be read twice, and the slider's own value never includes `valueSuffix`. If confirmed, set `aria-valuetext` on the input and keep the readout from announcing (`packages/opui/css/js/range.js:13-17`, `packages/opui/components/Range/Range.astro`)
  - Summary: Screen readers may read a slider's value twice on each arrow key and never hear its suffix.
  - Recommended: Fix with option A. `aria-valuetext` and a silent output make the slider announce once, with its unit, whatever the screen reader does today.
  > Explain further
  - Explained: what the code guarantees: `<output>` has the implicit `status` role, a polite live region, and `range.js` rewrites its text on every `input` event. So an arrow key makes the slider announce its own new value (native) and, once the queue drains, the live region announces the text again, with the suffix. NVDA reads both; VoiceOver usually does too but may coalesce. The slider's own announcement never has the suffix because nothing sets `aria-valuetext`.
  - Options:
    - A (recommended): `range.js` sets `aria-valuetext` to the value plus suffix when `data-suffix` is set, and the `<output>` gets `aria-live="off"`, so the slider is announced once with its unit.
    - B: leave it; two announcements are redundant, not wrong.
  > Fix with option A
  - Fixed: option A. With `valueSuffix`, the input gets `aria-valuetext` (the value and the suffix) in Astro, React, Svelte and Vue, and the `.ui-value` output `aria-live="off"`, so each step is announced once, with its unit. `range.js` keeps `aria-valuetext` in sync for HTML outputs with a `data-suffix`, and a passed `aria-valuetext` wins. The Value section says so for HTML and the components, the Value and ValueText examples carry the attributes in all five formats (parity snapshots and the data-live drift re-recorded, intended), and `css-js.spec.ts` and the Range interaction test check `aria-valuetext`. A custom readout (`value-text`) gets no `aria-valuetext`, since its text isn't a string; the page says to pass one.
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
  - Recommended: Fix with option A. The wording to check depends on the Tooltip decision, and the release checks are where manual runs happen.
  > Explain further
  - Explained: the touch half is settled by Chrome 142, which shipped `interestfor`: interest is shown on hover, keyboard focus and long press on touchscreens, and a `popover="hint"` target that is plain text becomes the trigger's description. So touch no longer needs `commandfor` and `command="toggle-popover"`, and without the command pair the trigger has no expanded state to announce. Firefox and Safari don't support `interestfor` yet (WebKit objected to the tooltip use case), so there the tooltip only shows on hover through CSS and nothing is announced. What stays unchecked: the exact words NVDA, JAWS and VoiceOver use for the description in Chrome 142+. See the Tooltip item in Accessibility for the fix.
  > Explain further
  - Explained: two corrections to the note above. Firefox and Safari don't show the tooltip on hover, since `tooltip.css` has no hover rule: there it only opens through the command pair, as a click or a tap. And `interestfor` treats this tooltip as a "plain hint" (text only), so the browser uses its text as the description of Save ("Save, button, Save your changes"), with no expanded state of its own; the expanded state comes only from `command="toggle-popover"`. So what this item checks depends on the decision in the Tooltip item under Accessibility. With the pair kept, NVDA, JAWS and VoiceOver in Chrome should say "collapsed" and then "expanded" on Save; with option A there, they should say only the name and the description. On phones: Android Chrome 142+ opens it on a long press of the button; iOS Safari can't with `interestfor` alone, which is the point raised on that item.
  - Still open: the screen reader wording, once the Tooltip item is decided.
  - Options:
    - A (recommended): decide the Tooltip item, then move the screen reader check to the Tooltip line of the release checks in `docs/releases/6.0.0.md` and remove this item.
    - B: keep the item open until someone runs the check.
- [ ] (2) Typography: rich text tables are `display: block` so they can scroll. Chromium keeps the table, column header and cell roles. Check with VoiceOver in Safari on `/html/components/typography/` (Default) that the table is still announced as a table with headers (`packages/opui/css/components/typography.css:625-630`)
  - Summary: VoiceOver in Safari may stop announcing rich text tables as tables because they are display block for scrolling.
  - Recommended: Fix with option A. Keeping the table a table is the only way that is safe in Safari, and a scroll wrapper costs one documented `div`.
  > Explain further
  - Explained: Safari has a long record of dropping table semantics when `display` changes (Roselli's 2022 survey, a 2020 VoiceOver test where cells stopped being navigable once `display: table` was gone, fixed in Chrome 80 but not in Safari), so `display: block` on the rich text `table` is likely to turn it into plain text for VoiceOver. Only a run in Safari can confirm it on the current version.
  - Options:
    - A (recommended): keep the table a table and scroll a wrapper: `.ui-rich-text` documents `<div class="ui-table-scroll">` (or `tabindex="0"` on a wrapping `div`) for wide tables, and the `table:not([class])` rule drops `display: block` and `overflow-inline`.
    - B: keep `display: block` and accept the Safari loss, since Chromium is the target.
- [x] (2) Menu: the link items in Basics and Custom point at same-page anchors (`href="#basics"`, `href="#menu"`). `Menu.astro` only adds `command="hide-popover"` to button items, so following a link scrolls the page while the popover stays open. Check in Chrome whether that is the intended behavior for link items; if not, give the example links real destinations or make link items close the menu (`src/component-examples/menu/Basics.astro:14`, `src/component-examples/menu/Basics.html:28`, `src/component-examples/menu/Custom.astro:64`, `src/component-examples/menu/Custom.html:58`, `packages/opui/components/Menu/Menu.astro:56-57,67-68`)
  - Summary: Choosing the Help or Open in new tab link in the example menus scrolls the page but leaves the menu open.
  - Recommended: Fix with option A. Real destinations make the examples behave like a menu, and a note covers same-page links, with no JavaScript added.
  > Explain further
  - Explained: certain from the code: `Menu.astro` sets `command="hide-popover"` only on button items (`closes = !href && !keepOpen && !disabled`), and `command` and `commandfor` only work on buttons anyway, so a link item can't close the popover declaratively. A link to another page leaves the page, so it doesn't matter there; a same-page anchor scrolls the page and the menu stays open until a click outside or Escape, which is what the examples show.
  - Options:
    - A (recommended): give the example links real destinations (docs pages, so the click navigates), and say on the Menu page that same-page links keep the menu open.
    - B: close the menu on link activation with a small script in `menu.js` (there is no JavaScript in Menu today).
    - C: keep the same-page anchors.
  - Note: `check-dist` fails on `href="#menu"`, which no element on the Menu page has, so the Custom link now points at its own section, `#custom`, in all five formats. The question above is unchanged.
  > Fix with option A
  - Fixed: option A. "Help" in Basics links to `/guide/getting-started/`, so choosing it navigates, and "Open in new tab" in Custom links there with `target="_blank"`, in all five formats (Menu parity snapshots updated, intended). A paragraph under Basics on the Menu page says a link item doesn't close the menu, since `command` only works on buttons, so a same-page link or one that opens a new tab keeps it open until a click outside or Esc.
- [ ] (2) Tabs: the Keyboard support list says Right and Left Arrow "follow the reading direction. In right-to-left text, Left Arrow moves to the next tab." That is the browser's native radio-group behavior, which the library doesn't control, and no e2e test covers RTL. Check on `/html/components/tabs/` with `dir="rtl"` on the `.ui-tabs` in Chromium, Firefox and Safari; if it differs per browser, reword the row to "Right and Left Arrow move between tabs; which way depends on the browser in right-to-left text" (`src/component-api/tabs/api.ts:11-15`, `tests/e2e/interaction.spec.ts:536-568`)
  - Summary: The docs say Left Arrow moves to the next tab in right-to-left text, which may not hold in every browser.
  - Recommended: Explain further and provide an example. Chromium's radio code flips the arrow keys in RTL, so the docs match the target browser, and an RTL tabs demo lets the user check Firefox and Safari before rewording.
  - Explained: the arrows are the browser's radio group navigation, which the library doesn't touch. Chromium's radio code flips Left and Right in a right-to-left group, so the row matches the target browser. Firefox and Safari decide on their own, and only a run there tells; the example puts a left-to-right and a right-to-left set side by side to try it. If they differ, reword the row as the item says. Example: tabs-rtl

  > Explain further and provide an example

- [ ] (2) Menu: the iOS submenu anchor in the compat layer is an engine gate for iOS WebKit, which the e2e projects don't run, so no test fails the day iOS Safari places a submenu at its trigger item. Remove the block locally, open `/tests/overlays/` in iOS Safari and check whether submenus sit at their trigger item. If they do, remove the block (`packages/opui/css/compat/menu.css:2-19`)
  - Summary: Nothing says when iOS Safari places submenus right, so the iOS fix could stay longer than it's needed.
  - Recommended: Fix with option A. Only a device can tell, and a release check repeats the look every release.
  > Explain further
  - Explained: on iPhone and iPad, Safari doesn't place a submenu at the item that opened it (the implicit anchor its `commandfor` button gives it). The block in `css/compat/menu.css` works around it by anchoring each submenu to its parent menu instead, so on iOS a submenu sits next to the whole menu rather than level with its item. It is gated with `@supports (-webkit-touch-callout: none)`, a property only iOS Safari has, so no other browser gets it. Nothing tells us when iOS fixes this, because the e2e projects run desktop WebKit on Linux, which fails that gate, so the day iOS Safari places submenus correctly the block keeps running and no test notices. Only a real iPhone or iPad can tell. The quickest check, without changing the code: open `/tests/overlays/` (a Netlify preview works) on the device, connect it to a Mac, open the page in Safari's Develop menu, select a submenu (`.ui-menu .ui-menu[popover]`) in Web Inspector, untick `position-anchor: --ui-menu` from `compat/menu.css`, and open the submenu again. If it now opens level with its item, the block can go; the Bugs item above fixed how the block behaves three levels deep in the meantime.
  - Still open: the check on a device.
  - Options:
    - A (recommended): add the check to the iOS line of the release checks in `docs/releases/6.0.0.md`, so it runs with every release, and remove this item.
    - B: keep the item open until someone runs it.
- [ ] (2) Menu: in Firefox, a menu in a `dir="rtl"` part of a left-to-right page opens on the wrong inline side: the rtl menu lands about 1000px from its trigger and the rtl submenu leaves the viewport, while the rtl tooltip, which has no span, is placed right. It looks like Firefox applies `span-inline-end` and `span-inline-start` in the wrong direction there. The e2e scenarios carry it as a known Firefox failure (`failingIn.firefox`). Check in desktop Firefox on the Rtl section of `/tests/overlays/`, and report it if confirmed (`packages/opui/css/components/menu.css`, `tests/e2e/stress-overlays.ts`)
  - Summary: In Firefox, a right-to-left menu inside a left-to-right page opens about 1000px from its trigger.
  - Recommended: Fix with option A. The report is written, and only the confirmation in desktop Firefox is left.
  - Partly fixed: it wasn't only Firefox. Plain `position-area` keywords such as `span-inline-end` resolve against the containing block's direction, the left-to-right page, while the menu's logical margins follow its own right-to-left direction, so the two disagreed. Chromium didn't mirror either: it opened the menu to the right. Menu, Tooltip and Anchor now use the `self-` keywords, which follow the element's own direction and ship in the same browser versions. Chromium and WebKit now open the rtl menu from its trigger's right edge (a new e2e check).
  - Still open in Firefox: with the `self-` keywords, CI Firefox places the rtl menu about 1000px from its trigger, the rtl submenu outside the viewport, and the new edge check 1068px off. `tests/e2e/engines.spec.ts` reproduces it without the library: a plain popover with `self-block-end span-self-inline-end` in a `dir="rtl"` block of a left-to-right page lands 447px past its trigger's end edge in Firefox only. The scenarios and both tests are expected to fail in Firefox (`FIREFOX_SELF_RTL`). If the repro starts passing, Firefox fixed it. Check in desktop Firefox on the Rtl section of `/tests/overlays/`, and report it to Mozilla if it does the same
  > Explain further
  - Explained: still an expected Firefox failure, nothing to change. A search of Mozilla's tracker finds no matching report: bug 2050613 (fixed in Firefox 154) is a `position-area` center-branch mix-up, bug 2063785 (Firefox 157) is about inline-split anchors, neither is direction. WPT's `position-area-ambiguous-self.html` encodes what the spec expects for `self-` keywords under `direction: rtl`, so Firefox is off spec if desktop Firefox shows the same as CI. Next step when confirmed: file it under Core :: Layout: Positioned with the `engines.spec.ts` repro (a plain popover with `self-block-end span-self-inline-end` in a `dir="rtl"` block of a left-to-right page).
  > Explain further
  - Explained: what users see: in a right-to-left part of a left-to-right page (an Arabic comment box in an English app, say), Firefox opens a Menu far to the side of its button, and a submenu off screen. The library uses the `self-` keywords of `position-area`, which follow the element's own direction, and Chromium and WebKit place the menu right with them. The repro in `engines.spec.ts` shows it without the library, so it's a Firefox bug, and CI already expects it to fail there: the day Firefox fixes it, that test fails with "expected to fail but passed" and the expected failures come out. The only step left is the report, which needs a desktop Firefox to confirm before filing. A report ready to paste, under Core :: Layout: Positioned:
    ```text
    Summary: position-area self- keywords resolve toward the wrong inline side in a dir=rtl element inside a dir=ltr page

    Steps:
    1. Open the test case below and click "Open".

    Expected: the popover opens below the button, with its right edge at the button's right edge (span-self-inline-end in the popover's own right-to-left direction), as in Chrome and Safari.
    Actual: the popover lands about 450px to the side of the button.

    <!doctype html>
    <style>
      body { margin: 0 }
      .center { display: flex; justify-content: center; padding-block-start: 200px }
      #popover { inline-size: 200px; inset: auto; margin: 0; position-area: self-block-end span-self-inline-end }
    </style>
    <div class="center" dir="rtl">
      <button id="trigger" commandfor="popover" command="toggle-popover">Open</button>
      <div id="popover" popover>Item</div>
    </div>
    ```
  - Still open: confirming in desktop Firefox and filing the report.
  - Options:
    - A (recommended): run the test case in desktop Firefox, file the report above if it lands to the side, add its link to `FIREFOX_SELF_RTL` in `engines.spec.ts`, and remove this item.
    - B: keep the item open until someone files it.
- [x] (2) Tokens: a severity class on the same element as `.ui-palette`, or on a direct child of `.ui-contrast-more`, loses its palette. `--ui-red`, `--ui-blue`, `--ui-green` and `--ui-orange` are declared again on those elements from `--ui-color-N`, which comes from the `--ui-palette-source` the severity scope derives from them, so Chromium drops the whole cycle as guaranteed-invalid. `.ui-neutral` keeps a fixed source for this reason, so a theme can't recolor neutral through `--ui-neutral` (`packages/opui/css/theme.css:275-278,321,483-486,543-554`, `packages/opui/core/palette.css:2-18,89-136`)
  - Summary: A severity class on a palette element or on a direct child of a high-contrast scope loses its color.
  - Recommended: Fix with option A. It is marked recommended, and the theme still declares the named colors from palette steps that the severity source derives from, so the cycle is in the code.
  - Fix: confirm with `<div class="ui-contrast-more"><span class="ui-chip ui-critical">` and `<span class="ui-palette ui-chip ui-critical">`.
  - Options:
    - A (recommended): give the named colors and `--ui-neutral` the step's lightness as a number (steps 7, 9 and 11 have the same lightness in every palette), so they stop depending on the element's own palette, then derive `.ui-neutral` from `--ui-neutral` like the other scopes.
    - B: keep today's values and document that a severity class can't sit on a `.ui-palette` element or a direct child of `.ui-contrast-more`.
  > Fix with option A
  - Fixed: option A. Only the same-element cases broke (`.ui-palette.ui-critical` and `.ui-contrast-more.ui-critical` had no palette source and a transparent chip); a direct child of `.ui-contrast-more` never did. `--ui-blue`, `--ui-green` and `--ui-red` use the lightness `0.53` and `--ui-orange` `0.66` as numbers, `--ui-neutral` is `oklch(0.53 var(--ui-gray-chroma) var(--ui-gray-hue))` (still capped in light mode), and `.ui-neutral` derives its source from `--ui-neutral` (`oklch(from var(--ui-neutral) 0.58 c h)`), so a theme can recolor it. Computed colors are unchanged in the default theme and all four example themes, light and dark, with and without more contrast, across every component example and stress page; only bootstrap's `.ui-neutral` palette steps move, because bootstrap sets `--ui-neutral` and the scope now follows it. A `theming.spec.ts` check compares the palette on the same element with a child for every severity on both scopes. The unreleased CHANGELOG entry about severity scopes and a Callout What's new note say so. The same-element case in the example themes is a separate item under Bugs.
- [ ] (3) Menu, Tooltip: in WebKit, a popover anchored to a trigger inside a modal Dialog, a Drawer or another Menu lands above its trigger by about the page's scroll offset once the page is scrolled: a split button menu in a dialog footer far down the overlays stress page opens around 1850px too high, and second level submenus can't be clicked because the first submenu has left the viewport. The same overlays near the top of the page are placed right, and anchors in the normal page flow are fine after scrolling. The e2e scenarios carry it as a known WebKit failure (`failingIn.webkit` in `tests/e2e/stress-overlays.ts`), and `tests/e2e/engines.spec.ts` reproduces it without the library: a plain popover anchored in a modal dialog, which is expected to fail in WebKit only on a scrolled page. If that test starts passing, WebKit fixed it, or the cause is ours. Check in Safari on macOS on `/tests/overlays/` after scrolling down, and report it to WebKit if Safari does the same (`tests/e2e/stress-overlays.ts`)
  - Summary: In WebKit, menus and tooltips inside a dialog, drawer or menu open far above their trigger once the page is scrolled.
  - Recommended: Fix with option A. The bug is on file, and the expected failure says when it's fixed.
  > Explain further
  - Explained: WebKit has it on file. Bug 304551, "incorrect anchor positioning when a fixed-positioned element and its anchor are both in the top layer", reported in December 2025 with Chrome right and Safari wrong, was closed as a duplicate of bug 301023. That is our case: the menu or tooltip is `position: fixed` and it and its trigger, inside a modal dialog, a drawer or another menu, are both in the top layer, and WebKit offsets it by the page's scroll. Nothing to change in the library and nothing to report. When WebKit ships the fix, `engines.spec.ts` fails with "expected to fail but passed": remove `WEBKIT_SCROLLED_ANCHOR` from the scenarios and the repro.
  > Explain further
  - Explained: what users see: in Safari, open a modal Dialog or Drawer far down a scrolled page, open a Menu or Tooltip inside it, and it appears above its button by as much as the page is scrolled, often out of view; near the top of the page it's right. A popover opened from inside a modal dialog and the dialog itself both live in the top layer, and in that case WebKit offsets the popover by the page's scroll. That is WebKit's bug (on file, see the note above) and it shows without the library. A workaround would have to go in the compat layer behind a WebKit engine gate, and there is none in CSS: the offset is the page's scroll position, which CSS can't read as a length. Everything that can be done here is in place: the overlay scenarios and the plain repro in `engines.spec.ts` are expected to fail in WebKit, so when Safari ships the fix the repro fails with "expected to fail but passed", which is the signal to drop `WEBKIT_SCROLLED_ANCHOR`. There is nothing left to check or report.
  - Still open: only whether to keep this item.
  - Options:
    - A (recommended): remove this item, since the bug is on file and the expected failure in `engines.spec.ts` says when it's fixed.
    - B: keep it open until WebKit ships the fix.
