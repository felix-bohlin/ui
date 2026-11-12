Severity 1-10, 10 is the most severe.

Findings with a page and section in brackets come from the stress pages in `src/stress-tests/`. Open the section named in brackets to see each one.

## Accessibility

- [x] (2) Tooltip: the triggers set `commandfor` and `command="toggle-popover"` next to `interestfor`, for touch. So Chromium exposes the trigger as expandable ("collapsed", then "expanded" while the tooltip shows), and Enter on "Save" closes the tooltip while it runs the button's action (`src/component-examples/tooltip/Basics.html:2-4`, `src/docs/components/tooltip.astro:59-63`)
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
  > Fix with option A
  - Fixed: option A. The Tooltip examples (Basics, Arrow, Position, RichContent) in all five formats, the product-detail block's wishlist button, the Under the hood steps and the interest invokers blog post drop `commandfor` and `command="toggle-popover"`, so an action button is a plain button with the tooltip as its description: no expanded state, and Enter only runs its action. `css/compat/tooltip.css` shows the tooltip while its trigger is hovered (in `@media (hover: hover)`) or has keyboard focus, inside `@supports not selector(:interest-source)`, anchored to the wrapper's `--anchor`. Those rules, forced in Chromium on a trigger without `interestfor`, showed the tooltip on hover and on Tab, above the trigger with its arrow. A Toggletip section and example (an info button with `interestfor`, `commandfor` and `command="toggle-popover"`) show the pair where a press only shows the text. The page, `api.ts`, the Compat layer list on Browser support, the CHANGELOG (Added) and What's new say so. `compat.spec.ts` expects the fallback in Firefox and WebKit, the hover test in `interaction.spec.ts` runs in every engine, and the click test moved to Toggletip. The parity snapshots of the four changed examples are updated, intended; the Toggletip visual baselines need the `update-snapshots` label. The stress test pages keep the pair, since `contrast.spec.ts` and `stress-overlays.ts` open their tooltips with a click.
- [x] (1) Select: in the picker, the selected option is marked by a tint only: `select.css` hides the native `::checkmark` and `list.css` gives `:checked` a background and text color and nothing else (`packages/opui/css/components/select.css:157-167`, `packages/opui/css/components/list.css:250-258`)
  - Summary: With the list open, the only sign of which option is selected is its tinted background.
  - Recommended: Fix with option A. The checkmark is the native cue and costs one rule.
  - Fix: confirm first on `/html/components/select/` (Preselected) with the list open.
  - Options:
    - A (recommended): keep `::checkmark` and style it instead of hiding it (`--ui-icon-size`, `--_accent`, at the end of the option).
    - B: give `:checked` a second cue in `list.css`, such as `font-weight: var(--ui-font-weight-medium)`.
  > Remove issue
  - Removed: as answered: the selected option keeps the tint List and Menu use for a selected row, and the native checkmark stays hidden.
- [x] (1) Tabs: the Accessibility section says to name the group with `role="radiogroup"` and `aria-label` on the Tabs, but no example or the anatomy does it, so every tabs group on the page is unnamed (`src/docs/components/tabs.astro:238-242`, `src/component-examples/tabs/Basics.html:1`, `src/component-examples/tabs/Basics.astro:5`)
  - Summary: Readers copy tabs without a group name, although the page tells them to add one.
  - Recommended: Fix. The Toggle Binding example already shows the pattern, and `Tabs.astro` spreads `...rest` so the attributes pass through.
  - Fix: add `role="radiogroup" aria-label="Account settings"` to the Basics example in all five formats (and the anatomy subject), so the pattern the Accessibility section describes is on the page.
  - Fixed: the Basics example and the anatomy carry `role="radiogroup"` and `aria-label="Account settings"`. axe reports nothing for it in Chromium.
- [x] (1) Layout: the Spread example puts an `<h2>` inside the Row section's "Spread" `<h3>` subsection, so the page outline gets an h2 "Website relaunch" under an h3 on every framework page (`src/component-examples/layout/Spread.astro:8`, `src/component-examples/layout/Spread.html:4`, `src/docs/components/layout.astro:92`)
  - Summary: Screen reader heading navigation lists "Website relaunch" as a top-level section of the Layout page.
  - Recommended: Fix. The Align and Composition examples already use `<h3 class="ui-h4">` for the same role.
  - Fix: use `<h3 class="ui-h4">` in the hgroup in all five formats, like `Align.astro:7`.
  - Fixed: the Spread heading is an `h3` with `.ui-h4`, like Align and Composition.
- [x] (1) Avatar, Carousel: `AvatarGroup` always renders `role="group"` and the docs and API say it needs an `aria-label`, and the Carousel API lists `aria-label` as the root's name, but neither type requires it, unlike an icon-only Button, whose `Slots` type requires `aria-label` or `aria-labelledby` (`packages/opui/components/Avatar/AvatarGroup.astro:7`, `packages/opui/components/Avatar/types.ts:33`, `packages/opui/components/Carousel/types.ts:1-11`, `src/component-api/avatar-group/api.ts:6`, `src/component-api/carousel/api.ts:25`, `src/component-api/carousel/api.ts:35-42`, `src/docs/components/avatar.astro:196-199`)
  - Summary: An avatar group or a carousel without a name compiles without a warning, so screen readers hear an anonymous group or list.
  - Recommended: Fix. The Button already models a required name in its types, and the guide says a component with no visible text takes `aria-label` from the caller and its types require it.
  - Fix: require the name in `types.ts` the way `Button`'s `Slots` does, in all four frameworks, with the same union on the Carousel `Props`.
    ```ts
    export type AvatarGroupProps =
      | { "aria-label": string }
      | { "aria-labelledby": string }
    ```
  - Fixed: both types require `aria-label` or `aria-labelledby`, the API tables document both, and the Carousel page says how to name it. Both components are new in 6.0, so their Added entries say it.
- [x] (1) Carousel: the marker's own ring is drawn with `outline`, and `:focus-visible` replaces that outline and its negative offset with the focus ring, so a focused marker that isn't current loses its circle and only the ring around the empty 24px box remains (`packages/opui/css/components/carousel.css:321-337`, `packages/opui/css/components/carousel.css:348-353`)
  - Summary: Arrowing through the markers makes each hollow marker vanish while it has focus, leaving only the focus ring.
  - Recommended: Remove issue. A focused marker is always the current, filled one, so the hollow state never shows under focus.
  - Fix: confirm first on `/html/components/carousel/` (Basics): Tab to the current marker, then press Right Arrow. Then keep the marker's outline on focus and draw the ring with a shadow.
    ```css
    & > *::scroll-marker:focus-visible {
      box-shadow:
        0 0 0 var(--ui-focus-ring-offset) var(--ui-surface),
        0 0 0 calc(var(--ui-focus-ring-offset) + var(--ui-focus-ring-width))
          var(--ui-focus-ring-color);
    }
    ```
  > Explain further and provide an example
  - Explained: The CSS reads as the item says, but the state never shows. In Chromium, the only engine with `::scroll-marker`, the focused marker is always the current one: Tab lands on the current marker, an arrow key makes the marker it moves to current at once, and scrolling the carousel by wheel, swipe or script moves the focus along to the new current marker, also at the end of a row with two items per view. The current marker is filled, so its look doesn't depend on the outline that the focus ring replaces. The box-shadow focus ring the item proposes works, but it would be the package's only focus ring that isn't an `outline`, and forced colors drop box shadows, so it would need a forced-colors rule of its own. The example puts today's markers next to that fix; both look the same. Example: carousel-marker-focus
  > Remove issue
  - Removed: In Chromium, the only engine with `::scroll-marker`, the focused marker is always the current, filled one, so the hollow state the item describes never shows under focus. The `carousel-marker-focus` example keeps the comparison.
- [x] (1) Accordion, Card: two reasons in the Forced colors list no longer match the CSS: the Accordion's elevated and tonal variants have a real border, which the browser forces to `CanvasText` on its own, so the "shadow-only edge" block is redundant, and the Card's `Highlight` border applies on `.ui-card-link:hover`, not on focus (`packages/opui/css/components/accordion.css:54-61`, `packages/opui/css/components/card.css:250-259`, `packages/opui/components/AGENTS.md:526`, `packages/opui/components/AGENTS.md:529`)
  - Summary: The guide gives the wrong reason for two forced-colors blocks, so the next edit keeps or copies a rule that does nothing.
  - Recommended: Fix. The guide says the list is updated when the reason changes, and `tests/unit/forced-colors.test.ts` keeps both lists in sync with the stylesheets.
  - Fix: confirm in Chromium with forced colors emulated on `/html/components/accordion/` (Variants) that the elevated and tonal accordions keep an edge without the block. Then drop the block at `accordion.css:58-60` and move `Accordion` to the "without a block" list with "every variant border is real", and reword the Card line to "the hovered card-link border is a tint, so it gets `Highlight`".
  > Fix
  - Fixed: with forced colors emulated in Chromium, an elevated accordion without the block keeps a 1px `CanvasText` border, so the forced-colors block in `accordion.css` is gone and Accordion moved to the components without a block (every variant border is real). The Card line now says the hovered card-link border only changes color, so it gets `Highlight`.
- [x] (2) Accordion: the group examples and the prose wrap accordions in a `.ui-card` with `role="group"` and no name, and the CSS keys on that role (`src/component-examples/accordion/Group.html:1`, `src/component-examples/accordion/GroupSingle.html:1`, `src/docs/components/accordion.astro:145-156`, `src/component-api/accordion/api.ts:20-21`, `packages/opui/css/components/accordion.css:185`)
  - Summary: Screen readers announce an anonymous "group" around the accordions, with nothing that says what the group is.
  - Recommended: Fix. The Avatar page already tells readers to name a group, and the markup only gains one attribute.
  - Fix: give each group example an `aria-label` ("Shipping questions", say) or `aria-labelledby` pointing at a heading above it, in all five formats, and say in the Accordion group prose and the `api.ts` notes that the group takes a name like the Avatar group does.
  - Fixed: both group examples have an `aria-label` and FAQ content, and the page and `api.ts` say to name the group.
- [x] (2) Button: the current page in navigation is marked by a background tint only (`--_default-active-bg-color`); in forced colors the tint is dropped and the Button has no block, so nothing marks the current page, while `List` already paints `aria-current="page"` with `SelectedItem` (`packages/opui/css/components/button.css:184-186`, `packages/opui/components/AGENTS.md:557`, `packages/opui/css/components/list.css:433-442`, `src/component-examples/button-group/Pagination.html:4`)
  - Summary: In Windows High Contrast the pagination's current page looks like every other page link.
  - Recommended: Fix. It copies the List's rule and moves one line in the guide, which the forced-colors test then checks.
  - Fix: add a block to `button.css`, move `Button` to the "with a block" list in `packages/opui/components/AGENTS.md` with "the current page is a tint, so it gets `SelectedItem`", and confirm with forced colors emulated on `/html/components/button-group/` (Pagination).
    ```css
    @media (forced-colors: active) {
      &[aria-current="page"] {
        background-color: SelectedItem;
        color: SelectedItemText;
        forced-color-adjust: none;
      }
    }
    ```
  > Fix
  - Fixed: `button.css` paints a Button with `aria-current="page"` in `SelectedItem` and `SelectedItemText`, border included and shadow off, under forced colors (checked in Chromium), and the Forced colors list in the components guide moves Button to the components with a block.
- [x] (2) Anchor: a hover trigger opens only through `interestfor`; engines without interest invokers (Firefox, Safari) have no hover, focus or tap path to the card, since `anchor.css` only positions the popover and the compat fallback that shows a hint on hover and focus matches `.ui-tooltip` only, while the page says hover, focus and tap open the card (`packages/opui/css/components/anchor.css:21-38`, `packages/opui/css/compat/tooltip.css:3`, `packages/opui/css/compat/tooltip.css:15`, `src/component-examples/anchor/RepoCard.html:7-13`, `src/component-examples/anchor/LinkPreview.html:7-13`, `src/docs/components/anchor.astro:105-133`)
  - Summary: In Firefox and Safari the repo card and the link preview never open, for pointer and keyboard users alike.
  - Recommended: Fix with option A. The Tooltip got the same fallback in the compat layer, and the browser support guide already lists it.
  - Fix: confirm by opening `/html/components/anchor/` (Hover trigger) in Firefox and hovering or tabbing to "felix-bohlin/ui".
  - Options:
    - A (recommended): add `packages/opui/css/compat/anchor.css` after the Tooltip's pattern, inside `@supports not selector(:interest-source)`, showing `.ui-anchor > .ui-floating[popover]` while the anchor is hovered (`@media (hover: hover)`) or holds focus; use `:has(:focus-visible)` rather than the Tooltip's `> :focus-visible` so the card stays open while Tab reaches its Star button. Import it from `css/compat.css`, list it in the Compat layer section of `src/docs/guide/browser-support.astro` and in `tests/e2e/compat.spec.ts`, and say on the Anchor page that touch still follows the link in those engines.
    - B: say on the Anchor page that the hover card needs interest invokers and the link itself is the way to the content elsewhere.
  > Fix with option A
  - Fixed: with option A: `css/compat/anchor.css`, imported first in `css/compat.css`, shows `.ui-anchor > .ui-floating[popover]` inside `@supports not selector(:interest-source)` while the anchor is hovered (`@media (hover: hover)`), which includes the pointer in the card, or holds `:focus-visible` anywhere inside, so the card stays open while Tab reaches its Star button. The Compat layer section of the browser support guide and the Anchor page say a tap follows the link there. The RepoCard interaction test no longer skips engines without interest invokers, so the Firefox and WebKit jobs cover the fallback; `compat.spec.ts` needs no change, since its Firefox and WebKit lists already hold the `not selector(:interest-source)` condition.
- [x] (2) NumberField: the step buttons are three tab stops per field, say nothing about what they change, and a press is silent for a screen reader: `step()` sets the input's value and fires `input` and `change`, but focus stays on the button and nothing announces the new value (`packages/opui/components/NumberField/NumberField.astro:72-77`, `packages/opui/components/NumberField/NumberField.astro:100-105`, `packages/opui/elements/number-field.js:56-69`, `src/docs/components/number-field.astro:245-269`)
  - Summary: A screen reader user who presses Increase hears nothing, and only learns the new value by moving back to the input.
  - Recommended: Fix with option A. It adds the relation without a live region, and the arrow keys on the spinbutton already announce every step.
  - Options:
    - A (recommended): give both buttons `aria-controls={inputId}` in all four frameworks and the HTML examples, and say in the Accessibility list that the buttons are for pointer users while the arrow keys on the input announce each step.
    - B: like A, and let `number-field.js` also write the value into a visually hidden `output` with `aria-live="polite"` inside the field, so a press is announced once.
  - Fixed: with option A: both step buttons get `aria-controls` with the input's id in all four frameworks, the ten HTML examples and the product-detail and shopping-cart blocks, the HTML note in the API says so, and the Accessibility list says the buttons are for pointer users while the arrow keys on the input announce each step. The number-field markup snapshots are re-recorded (intended).
  > Fix with option A
  - Fixed: already done in dc739bcd with option A, as the note above says: both step buttons point at the input with `aria-controls` in all four frameworks, the HTML examples and the two blocks, and the Accessibility list says the buttons are for pointer users while the arrow keys on the input announce each step.
- [x] (2) Toggle: the group renders `role="radiogroup"` or `role="group"` but nothing names it: the types don't require `aria-label` or `aria-labelledby`, no `warnUnnamed` runs (Switch has one), and the Single-select, Multi-select, Text + icon, Vertical and Overflow examples have no name although the page says "Name it with `aria-label`"; only Binding and the small group in Sizes do (`packages/opui/components/ToggleGroup/ToggleGroup.astro:38`, `packages/opui/components/ToggleGroup/types.ts:1-7`, `src/component-examples/toggle/Alignment.html:1`, `src/component-examples/toggle/MultiSelect.html:1`, `src/component-examples/toggle/Interactive.html:1`, `src/component-examples/toggle/Vertical.html:1`, `src/component-examples/toggle/Overflow.html:4-38`, `src/docs/components/toggle.astro:306-319`)
  - Summary: Screen readers announce five of the seven toggle groups as an unnamed radio group or group, and users copy the examples that way.
  - Recommended: Fix with option A. The examples are what users copy, and the dev warning matches how Switch already catches an unnamed control.
  - Fix: name every group example in all five formats: "Text alignment" (Alignment), "Text style" (MultiSelect), "Transport" (Interactive), "View" (Vertical) and "Notify me about" (the three Overflow groups and `OverflowCode.*`).
  - Options:
    - A (recommended): add `aria-label` to the examples, and call `warnUnnamed("ToggleGroup", ...)` from `../dev` in the four frameworks when neither `aria-label` nor `aria-labelledby` is passed.
    - B: only name the examples.
  - Fixed: option A: `ToggleGroup` calls `warnUnnamedGroup` in every framework, and every example and site group has an `aria-label`.
- [x] (2) Tooltip: outside Chromium the tooltip text never reaches assistive technology: the trigger has no `aria-describedby`, `interestfor` is the only relation, and the compat layer only shows the popover visually on hover and focus-visible (`src/component-examples/tooltip/Basics.html:2-7`, `src/component-examples/tooltip/Arrow.html:2-7`, `src/component-examples/tooltip/RichContent.html:2-7`, `packages/opui/css/compat/tooltip.css:2-26`, `src/docs/components/tooltip.astro:165-184`)
  - Summary: In Firefox and Safari a screen reader never hears the tooltip text, since nothing links it to the trigger.
  - Recommended: Fix with option A. A hidden element referenced by `aria-describedby` still gives its text, so one attribute covers every engine.
  - Fix: confirm first in Chrome 142+ with NVDA or VoiceOver on `/html/components/tooltip/` (Basics) that `aria-describedby` and the `interestfor` description aren't read twice (`aria-describedby` comes first in the description computation, so it should win).
  - Options:
    - A (recommended): add `aria-describedby` pointing at the `.ui-floating` id to the action-button triggers in the examples (Basics, Arrow, RichContent, Position) in all five formats, and say in the Accessibility section that it gives the description in every browser, not only while the tooltip shows.
      ```html
      <button
        type="button"
        class="ui-button"
        interestfor="tooltip-basics-1"
        aria-describedby="tooltip-basics-1"
      >
        Save
      </button>
      ```
    - B: keep the markup and add a bullet that the compat fallback is visual only, so the trigger's own name must carry what matters in Firefox and Safari.
  - Fixed: with option A, after the check it asked for, in Chromium's accessibility tree rather than with a screen reader: with `interestfor` alone the Save button has a description only while the hint is open from hover (none when it's closed, or opened by script); with `aria-describedby` it has "Save changes" every time, once, also while the tooltip is open. The Basics, Arrow, Position, PositionCode and RichContent triggers point at their tooltip with `aria-describedby` in all five formats (the Toggletip keeps its `commandfor` relation), the Accessibility section says so, and the five tooltip markup snapshots are re-recorded (intended). The screen reader pass stays with the Tooltip To check item.
- [x] (2) TextField: in forced colors an invalid field looks like a valid one: the invalid state only sets `--_border-color`, `--_accent`, `--_affix-text-color` and `--_helper-text-color` to `--ui-invalid`, which forced colors replace with `CanvasText`, and the forced-colors block only handles focus, so Textarea, Select and NumberField lose it too (`packages/opui/css/components/text-field.css:396-401`, `packages/opui/css/components/text-field.css:314-318`, `packages/opui/components/AGENTS.md:545`)
  - Summary: With Windows High Contrast on, an invalid text field, textarea or select shows no visible sign that it is invalid.
  - Recommended: Fix. A dashed border changes the shape, not a color, so it survives forced colors and matches the guide's rule for a color-only state.
  - Fix: add the invalid case to the forced-colors block and extend the TextField line in the Forced colors list of the components guide.
    ```css
    @media (forced-colors: active) {
      &:has([aria-invalid="true"], :user-invalid) .ui-field {
        border-style: dashed;
      }
    }
    ```
  > Fix
  - Fixed: an invalid field gets `border-style: dashed` in the forced-colors block of `text-field.css`, which covers Textarea, Select and NumberField (checked in Chromium), and the TextField line in the Forced colors list says so. Checkbox, Radio and the choice card had the same gap, an invalid border that is only a color, so they got the same cue with the Switch item.
- [x] (2) Switch: in forced colors an invalid switch looks like a valid one: the invalid ring is a `box-shadow`, which forced colors drops, the end text color is forced to `CanvasText`, and the forced-colors block sets nothing for the invalid state (`packages/opui/css/components/switch.css:156-166`, `packages/opui/css/components/switch.css:168-184`, `packages/opui/components/AGENTS.md:531`)
  - Summary: With Windows High Contrast on, an invalid switch shows no visible sign that it is invalid.
  - Recommended: Fix. An outline is kept in forced colors where a box shadow is dropped, and the change is one rule.
  - Fix: draw the ring as an outline inside the forced-colors block, and note it on the Switch line of the Forced colors list.
    ```css
    @media (forced-colors: active) {
      &:has([aria-invalid="true"], :user-invalid) input {
        outline: var(--ui-focus-ring-width) dashed CanvasText;
        outline-offset: var(--ui-focus-ring-offset);
      }
    }
    ```
  > Fix
  - Fixed: with a dashed border instead of the proposed outline, which the focus ring replaces on a focused switch and which would differ from the TextField cue: the validation block in `choice.css` gives an invalid switch track (`::before`), checkbox and radio input and choice card `border-style: dashed` under forced colors (checked in Chromium), and the Checkbox, Radio, Switch and Choice line in the components guide says so. The halo itself is the Switch question below.
- [x] (2) TextField: buttons in a small or x-small field's `.ui-start` or `.ui-end` are under 24 by 24 CSS pixels: `--_affix-button-size` is the field size minus borders and `2 * --ui-space-1`, which is 22px in `.ui-small` and 18px in `.ui-x-small`, and the circle around them overlaps the input, so the spacing exception of WCAG 2.5.8 doesn't apply (`packages/opui/css/components/text-field.css:9-11`, `packages/opui/css/components/text-field.css:110-116`, `packages/opui/components/TextField/TextField.astro:93-138`)
  - Summary: The show-password and other affix buttons are too small to hit in small and x-small fields.
  - Recommended: Fix. A `max(24px, ...)` floor meets the minimum in every size and still fits inside the x-small field.
  - Fix:
    ```css
    --_affix-button-size: max(
      var(--ui-space-5),
      var(--_size) - var(--ui-field-border-width) * 2 - var(--ui-space-1) * 2
    );
    ```
  > Explain further and provide an example
  - Explained: WCAG 2.5.8 asks for a 24 by 24 CSS pixel target, or an undersized target whose 24px circle, centered on it, crosses no other target. `--_affix-button-size` is the field size minus the borders and `2 * --ui-space-1`: 18px in x-small, 22px in small, 30px in the default size. The circle of an 18px button reaches 3px past it and the `.ui-end` padding keeps 4px to the input box, so the input box itself stays clear, but every TextField without `passwordToggle` has a `label` root, which activates the input from anywhere inside it: the label is a target around the button and every circle crosses it. The password toggle sits in an `opui-text-field` root whose label is only the `.ui-label`, so it passes on spacing, by 1px in x-small. Flooring the size at 24px fits between the borders of both smaller fields (26px and 30px). Floor it at a literal `24px` rather than `--ui-space-5`: a theme's `--ui-space-scale` shrinks the space token, while the WCAG floor stays 24 CSS pixels. The example measures today's buttons next to the floored ones in a search field with a clear button. `pnpm check-css-vars` fails on a literal length in component CSS, so that floor needs an entry in `scripts/css-vars-allowlist.json`, which the history job ratchets, or a knob such as `--ui-target-size-min: 24px` in `theme.css`. Example: text-field-affix-target
  - Fixed: `--_affix-button-size` is `max(var(--ui-space-5), ...)`, so affix buttons are at least 24px in small and x-small fields (checked in Chromium: 24px in x-small). It reads `--ui-space-5` rather than a literal `24px`, like the Carousel's 24px marker targets, since `check-css-vars` bans literal lengths in component CSS; a theme that shrinks `--ui-space-scale` shrinks both alike.
- [x] (2) Drawer: the Basics drawers scroll nine paragraphs in `.ui-content` with nothing focusable inside, and neither the examples nor the page carry the `tabindex="0"`, `role="region"` and `aria-label` the Dialog's Long content got for Safari, which doesn't make a scroll container focusable (`src/component-examples/drawer/Basics.html:79-125`, `src/component-examples/drawer/Basics.astro:30-76`, `src/docs/components/drawer.astro:122-131`, `packages/opui/css/components/drawer.css:87-94`)
  - Summary: In Safari, keyboard users can't scroll the long text in the drawer example because the scrolling area isn't focusable.
  - Recommended: Fix. The Dialog got the same fix for the same reason, and the drawer's content focus ring is already styled.
  - Fix: give the inline-start drawer's content `tabindex="0"`, `role="region"` and `aria-label` (for example "Details") in all five formats, add the Safari sentence from the Dialog's Long content section to the Drawer Basics prose, and open that drawer in `a11y.spec.ts` before axe runs, as the Dialog test does.
    ```html
    <div class="ui-content" tabindex="0" role="region" aria-label="Details">
    ```
  - Fixed: the scrolling drawer content has `tabindex="0"`, `role="region"` and an `aria-label`, the page has the Safari sentence, and `a11y.spec.ts` opens that drawer before axe.
- [x] (2) List: `.ui-list` clips at its padding box (`overflow: clip`, `padding-inline: 0`), and `.ui-flush` removes the items' inline padding, so a control in `.ui-end` of a flush row sits on the list's edge and its outset focus ring is cut off on the end side; only item links and buttons draw their ring inside (`packages/opui/css/components/list.css:45-54`, `packages/opui/css/components/list.css:159-170`, `packages/opui/css/components/list.css:261-274`, `src/component-examples/list/Flush.html:6-25`)
  - Summary: In a flush list, the focus ring of a button at the end of a row is cut off on its outer edge.
  - Recommended: Fix with option A. It keeps the clip the rounded corners need and matches how item links already draw their ring inside.
  - Fix: confirm on `/html/components/list/` (Flush): Tab to Delete and look at the ring's end edge.
  - Options:
    - A (recommended): controls in `.ui-end` of a flush list draw their ring inside.
      ```css
      &.ui-flush > :where(li, option) > .ui-end :focus-visible {
        outline-offset: var(--ui-focus-ring-inset);
      }
      ```
    - B: let the ring out of the clip with `overflow-clip-margin: calc(var(--ui-focus-ring-offset) + var(--ui-focus-ring-width))` on `.ui-list.ui-flush`, which also lets item fills past the rounded corners by that much.
  > Fix with option A
  - Fixed: with option A, for `.ui-start` as well as `.ui-end`, since a control at the start of a flush row is cut off on the start side the same way: `& > :where(.ui-end, .ui-start) :focus-visible` gets `outline-offset: var(--ui-focus-ring-inset)` in the `.ui-flush` block of `list.css`.
- [x] (2) Fieldset: with `as` set to anything but `fieldset`, the root gets `role="group"` but no name unless the author gives `FieldLegend` an `id` and points `aria-labelledby` at it by hand, while Dialog and Drawer link their title through context with `autoLabelledBy` (`packages/opui/components/Fieldset/Fieldset.astro:7-14`, `packages/opui/components/FieldLegend/FieldLegend.astro:6-12`, `src/docs/components/form.astro:229-250`, `src/component-examples/form/AdaptiveOutput.html:2-7`)
  - Summary: A field set rendered as a div is an unnamed group for screen readers unless the author wires aria-labelledby themselves.
  - Recommended: Fix. It follows the Dialog and Drawer pattern, and a passed `aria-label` or `aria-labelledby` still wins through `autoLabelledBy`.
  - Fix: a `fieldsetContext` like `dialogContext` in all four frameworks. When `as` isn't `fieldset`, `Fieldset` creates an id (`createId(Astro.locals)("legend")`, `useId()`, `$props.id()`), sets `aria-labelledby={autoLabelledBy(rest, id)}` and provides it; `FieldLegend` renders `id={context?.legendId ?? id}` with `warnReplacedId`, as `DialogTitle` does. The Without fieldset section then only documents the HTML way.
  - Fixed: `Fieldset` provides a generated legend id through a new context, `FieldLegend` takes it, and the root gets `aria-labelledby` unless a name is passed, in all four frameworks. The Without fieldset example no longer writes the ids by hand.
- [x] (3) Button, Avatar: a disabled link drops its `href` and keeps `aria-disabled="true"`, so the `a` has the generic role; `aria-label` is prohibited on generic, so the disabled link avatar is read as "KL" instead of "Karl Lund", and a disabled link button or pagination link is plain text with no role and no "unavailable" (`packages/opui/components/tag.ts:1-6`, `src/component-examples/avatar/Disabled.html:6`, `src/component-examples/button/Disabled.html:69-74`, `src/component-examples/button-group/Pagination.html:3`, `src/docs/components/button.astro:201-217`, `src/docs/components/avatar.astro:142-158`, `src/component-api/button/api.ts:50-52`, `src/component-api/button/api.ts:55-57`, `src/component-api/avatar/api.ts:18-20`, `src/component-api/avatar/api.ts:67-69`)
  - Summary: A screen reader hears a disabled link avatar as two letters and a disabled link button as plain text, with no role and no state.
  - Recommended: Fix with option A. One line in `tag.ts` covers every component that renders a disabled link, and `role="link"` keeps `aria-label` and `aria-disabled` valid.
  - Fix: `tagAttrs` is shared by Avatar, Button, Chip, ListItem and Menu, so the change reaches all of them; the parity snapshots of the Disabled and Pagination examples change on purpose.
  - Options:
    - A (recommended): keep the link role when disabled, in `tag.ts` and in the HTML examples and prose.
      ```ts
      role: tag === "a" && disabled ? ("link" as const) : undefined,
      ```
    - B: keep the markup and say on the Button and Avatar pages that a disabled link reads as plain text, so a link avatar should keep its initials visible and a disabled pagination link should be left out or rendered as a `button disabled`.
  - Fixed: `tagAttrs` adds `role="link"` to a disabled link, which reaches Avatar, Button, Chip, ListItem and Menu, and the pages and `api.ts` descriptions name it. The parity snapshots of the five examples with a disabled link were re-recorded on purpose.
- [x] (3) OneTimeCode: with a complete code the focus ring disappears: `.ui-field::after` sits in the grid column after the input, the input's margin box is `n * cell` wide and `.ui-field` is `length * cell` wide with `overflow: clip`, so when `n` equals `length` the ring and the caret are clipped away, and the `@supports (field-sizing: content)` block swaps the thick `--_box-focus-image` back to the thin `--_box-image` (`packages/opui/css/components/one-time-code.css:24-39`, `packages/opui/css/components/one-time-code.css:51-64`, `packages/opui/css/components/one-time-code.css:96-132`, `src/docs/components/one-time-code.astro:156-161`, `src/docs/components/one-time-code.astro:305-308`, `src/docs/components/one-time-code.astro:349-352`)
  - Summary: Once all six digits are typed, tabbing back into the field shows no ring and no caret, only the boxes changing color.
  - Recommended: Fix with option A. It needs no detection of a full code and keeps the ring where there is a next box.
  - Fix: confirm first on `/html/components/one-time-code/` (Right-to-left has a full value: Tab into it; or type three more digits in Grouped), in light and dark.
  - Options:
    - A (recommended): drop the `mask-image: var(--_box-image)` override at `one-time-code.css:116-119`, so `:focus-within` keeps the thick `--_box-focus-image` on every box in every browser, and the ring on the next empty box comes on top where there is one. Update the two docs sentences.
    - B: keep the thin stroke and give `.ui-field` a trailing `padding-inline-end: var(--_cell-size)` only while the input is full (a `:has(input:valid:focus-visible)` test needs `required`, so this needs a reliable full-code selector first).
  > Fix with option A
  - Fixed: with option A: `one-time-code.css` keeps the thicker `--_box-focus-image` on every box while the field has focus in every browser, since the `@supports (field-sizing: content)` block no longer swaps it back, and the ring on the next empty box draws on top where there is one, so a complete code still shows focus (checked in Chromium). The iOS compat rule that undid the swap is down to hiding the ring, and the three passages on the page and the `--_box-focus-image` description say so.
- [x] (3) Radio: the Disabled example ships a radio with `aria-disabled="true"` that still checks on click and on arrow keys; the partial says "It doesn't stop the change, so block it with a script", but no format has that script, so the copied markup announces "disabled" for a control that works, and the Checkbox and Switch FieldGroupDisabled examples share the partial (`src/component-examples/radio/FieldGroupDisabled.html:40-48`, `src/component-examples/radio/FieldGroupDisabled.astro:19`, `src/docs/components/partials/FieldGroupNotes.astro:73-77`, `src/component-examples/switch/FieldGroupDisabled.html:45`)
  - Summary: The third radio in the Disabled example is read as disabled by a screen reader, yet a click or an arrow key checks it.
  - Recommended: Fix with option A. An example readers copy has to work as announced, and `disabled` on the fieldset already covers the group case.
  - Fix: confirm first on `/html/components/radio/` (Field group, Disabled) by clicking `Aria-disabled`.
  - Options:
    - A (recommended): remove the `aria-disabled` radio from `FieldGroupDisabled` in all five formats of radio, checkbox and switch, and keep the sentence in `FieldGroupNotes.astro` as the note it is.
    - B: keep it and add the blocking script to every format (a `click` listener that calls `preventDefault()` and the arrow `keydown` that would reach it, `onClick` in React, `onclick` in Svelte and `@click.prevent` in Vue), so the example matches its description.
  - Fixed: option A: the Radio and Switch examples no longer show the `aria-disabled` control, and the note stays. The components guide now names `aria-disabled` as the author-managed variant that needs a script.
- [x] (3) Range: the Quality example gives the ticks the words Low, Medium and High, but the `datalist` is `aria-hidden="true"` and the input has no `aria-valuetext` (the component only sets it with `valueSuffix`), so a screen reader hears 0, 1 and 2 while sighted users read the words (`src/component-examples/range/TickMarksLabels.html:16-28`, `src/component-examples/range/TickMarksLabels.astro:15-21`, `packages/opui/components/Range/Range.astro:92-94`, `src/docs/components/range.astro:202-235`)
  - Summary: On the Quality slider a screen reader announces "1" where the tick under the thumb says "Medium".
  - Recommended: Fix with option B. The component already owns `aria-valuetext` for the suffix, and `range.js` already runs on every `input` event, so the labels can follow the same path.
  - Options:
    - A: in the example only, set `aria-valuetext="Medium"` on the Quality input in every format and update it on `input` from the matching option label, and say on the page that named ticks need `aria-valuetext`.
    - B (recommended): when the range has a `datalist` with labeled options and no `valueSuffix`, set `aria-valuetext` to the label of the option whose `value` matches on the server (Astro, React, Svelte, Vue), and let `range.js` update it on `input` by reading `datalist option[value="..."]`'s `label`; the Tick marks section then says so.
  > Fix with option B
  - Fixed: with option B: with labeled `items` and no `valueSuffix`, Range sets `aria-valuetext` to the label of the tick at its value on the server in all four frameworks, and `css/js/range.js` keeps it in sync on `input` for labeled options from `items` or the `datalist` slot, removing it between labeled ticks so the number is read. The Tick marks section says so, the TickMarksLabels and Spread HTML examples carry the initial `aria-valuetext`, and their two markup snapshots are re-recorded (intended). A new interaction test steps the Quality and Opacity sliders.
- [x] (2) Carousel: `::scroll-marker-group` is laid out as a sibling box of the scroller, so in a grid parent with `justify-items: start` it shrinks to its content, which is 0px wide since every marker is an empty box, and the markers collapse to about 8px, below the 24px target size (`packages/opui/css/components/carousel.css:309-317`, `src/todo-examples/carousel-marker-focus.html:3-5`)
  - Summary: A carousel inside a start-aligned grid shows its markers as tiny dots that are hard to hit.
  - Recommended: Fix. One declaration on the marker group keeps it as wide as the carousel in any parent.
  - Fix: set `justify-self: stretch` on `&::scroll-marker-group`, which does nothing in block layout, and confirm with the carousel in a `display: grid; justify-items: start` box on `/html/components/carousel/` (Markers).
  - Fixed: `justify-self: stretch` on `::scroll-marker-group`, which does nothing in block layout and keeps the group as wide as the carousel in a start-aligned grid; noted in the Carousel Added entry.
- [x] (4) Carousel, AvatarGroup: in Vue, `aria-label` and `aria-labelledby` never reach the element: the base types require one of them through a union, so `defineProps<Props>()` declares both as props, which Vue takes out of the fallthrough attributes, and the Vue carousel and avatar group render with no accessible name; 15 parity tests and 4 component-contract tests fail on it at 63cb329 (`packages/opui/components/Carousel/types.ts:14`, `packages/opui/components/Avatar/types.ts:33-35`, `packages/opui/components/Carousel/Carousel.vue:1-20`)
  - Summary: In Vue, a carousel or an avatar group loses the name it was given, so screen readers announce an unnamed list or group.
  - Recommended: Fix. The other frameworks render the name, and the failing parity tests show where.
  - Fix: have `scripts/component-vue.mjs` bind the declared `aria-label` and `aria-labelledby` on the root (or keep them out of `defineProps` so they fall through), rebuild, and rerun `pnpm exec vitest run tests/unit/parity.test.ts -t "carousel/|avatar/Grouped"`.
  - Fixed: in dff0dda9 by keeping the dashed keys out of the Vue props type (`Omit<BaseProps, "aria-label" | "aria-labelledby">` from `scripts/component-types.mjs`), so Vue no longer declares them as props and they fall through to the root. This session's emitter-side binding was dropped in favor of it.
  > Explain further
  > Is this a compiler error?
  - Explained: Not a bug in a compiler, but our generator not following a Vue rule. Vue's `defineProps<Props>()` turns every key that any member of a union can have into a declared prop, since at run time it can't tell which member applies, and Vue takes declared props out of `$attrs`, so they stop falling through to the root element. 8d2513f made Carousel and AvatarGroup require a name with `& ({ "aria-label": string } | { "aria-labelledby": string })`, and `scripts/component-types.mjs`, which writes `types.vue-props.ts` for `pnpm build-components`, wrote `BaseProps & Class`, so Vue declared both keys and nothing rendered them. TypeScript and Vue did what they're specified to do. dff0dda9 fixed the generator: the Vue props leave out the dashed keys of the base props (`Omit<BaseProps, "aria-label" | "aria-labelledby">`), so the name falls through as an attribute, and `component-types.test.ts` covers it. The cost is that the Vue type no longer requires the name, which the API and CHANGELOG now say ("its Astro, React and Svelte types require it"). After that fix the Vue parity tests still failed here until `node_modules/.vitest-cache` was deleted, since vitest's module cache keeps a compiled `.vue` file while its own text is unchanged; that's a new Tooling item.
- [x] (3) Button: the current page (`aria-current="page"`) in a text, outlined or tonal button is marked by the pressed tint (`--_default-active-bg-color`), which reads the hover and press alphas, so in shadcn and m3 it barely differs from tonal neighbors (1.00 to 1.09:1 in light mode) and in bootstrap it lowers the gray text to 3.9 to 4.4:1 (`packages/opui/css/components/button.css:200-203`, `packages/opui/css/components/list.css:24-28`, `src/stress-tests/data-display.html:2439-2529`)
  - Summary: In some themes the current page in a pagination group is hard to spot, or its text is a little too faint.
  - Recommended: Fix with option A. It gives the current page its own token, as the current List row has.
  - Fix: measure with the `the current page in a button group` test in `tests/e2e/stress-data-display.spec.ts`, raising its bar from differing at all to a visible difference, and check the text against 4.5:1 for every variant. Filled buttons already drop their fill and pass.
  - Options:
    - A (recommended): tint the current page with `--ui-state-selected-alpha-accent`, as the current `List` row does, so themes tune the persistent state apart from the hover and press feedback. Bootstrap's gray may still need a darker text color on the tint.
    - B: fill the current page with `--ui-selected-strong` and `--ui-on-selected-strong`, which carry contrast promises, like the active page in Bootstrap and GOV.UK pagination. It stands out most, and changes the outlined Pagination example.
  > Explain further and provide an example
  - Explained: The pressed tint is a feedback color, not a state color. `--_default-active-bg-color` is the accent at chroma 0.06 and `--ui-state-active-alpha-light`, the alpha a press flashes for a moment, and `button.css` gives the same tint to `[aria-current="page"]`, so the current page lasts in a color each theme tuned to be brief and subtle. shadcn sets that alpha to 4% and m3 to 10%: over a white or tinted surface the current page comes out about as light as the tonal buttons beside it, and inside a tonal group the tint replaces their tonal fill instead of adding to it, so the current page and its neighbors measure 1.00 to 1.09:1. Bootstrap sets 20% under a gray button accent, which darkens the background behind the gray text until it falls to 3.9 to 4.4:1. Filled buttons don't have the problem, since the current page drops the fill. The List already separates the two: its current row reads `--ui-state-selected-alpha-accent`, a token for a lasting selection. Option A gives the Button the same token with the full accent, so a theme tunes the current page apart from the press: shadcn's 8% shows as a light gray step, m3's 10% stays close to its tonal fill, and Bootstrap's 25% makes its gray text fainter still, so Bootstrap would need a darker text color on the tint. Option B fills the current page with `--ui-selected-strong` and `--ui-on-selected-strong`, which carry a contrast promise, and stands out in every theme, like Bootstrap and GOV.UK pagination, at the cost of a louder outlined Pagination. The example shows each theme's light tokens in a text, an outlined and a tonal pagination, today, with A and with B. Example: button-current-page
  > Fix with option A
  - Fixed: Option A. In `packages/opui/css/components/button.css` the current page in a text or outlined button takes `--_current-bg-color`, `--_accent` at `--ui-state-selected-alpha-accent` like the current `List` row, instead of the pressed tint, and an outlined button outside a group, which had no tint at all (1.00:1), gets it too. A tonal one takes `--_tonal-current-bg-color`: its fill with white or black at the same alpha, white where the fill is darker than L 0.9 in light mode or L 0.3 in dark mode and black elsewhere, so it moves away from its text where the fill has room. The accent tint alone matched the tonal fill in m3 and shadcn, and the on-color layer of a state layer dropped white text on the mid-tone primary tints in dark mode under 4.5:1. All three use `--ui-text-strong`, since Bootstrap's gray and GOV.UK's primary text (its `--ui-text-max-lightness` is 0.56) stayed under 4.5:1 on the tint even when darkened. The `the current page in a button group` test in `tests/e2e/stress-data-display.spec.ts` now asks for at least 1.1:1 between the current page and its neighbors and 4.5:1 text in every variant, and fails on the old CSS; its stress section in `src/stress-tests/data-display.html` adds text, text primary, separate outlined and separate text groups. Measured in Chromium in all six themes in light and dark mode: the current page differs from its neighbors by 1.12:1 (m3 in dark mode, where the alpha is 10%) to 2.29:1, and its text reads 5.27:1 or more. With more contrast the alpha drops to 15% and the smallest step is 1.07:1, where it was 1.00:1, with the text at 6.66:1 or more. The button group and stress visual baselines need the `update-snapshots` label.
- [x] (1) Avatar: in the Grouped example, the dot badge's "Online" text sits outside the link avatar it marks. A screen reader user who tabs to "Maja Nilsson" never hears it, but the Badge page says a badge on a link belongs in the link's name too (`src/component-examples/avatar/Grouped.html:16-25`, `src/component-examples/avatar/Grouped.astro:14-18`, `src/docs/components/badge.astro:125-126`)
  - Summary: Screen reader users who tab to the avatar hear the name but not that the person is online.
  - Recommended: Fix. Putting the status in the initials' label follows the Avatar page's rule that the name comes from what the avatar shows.
  - Fix: confirmed in Chromium's accessibility tree: `link "Maja Nilsson"` and then a separate `StaticText "Online"`. In all five formats, label the initials `aria-label="Maja Nilsson, online"` and keep the badge's `label`, as the Badge page shows.
  - Fixed: The initials in `src/component-examples/avatar/Grouped.astro` say `aria-label="Maja Nilsson, online"` and the badge keeps its `label`, as the Badge page shows, and `pnpm build-examples` wrote the other formats. Chromium now reads `link "Maja Nilsson, online"`. The `avatar/Grouped` parity snapshot change is intended.
- [x] (1) Avatar: in a group, each avatar overlaps the one before it by `--ui-space-2`, whatever its size. An x-small link or button avatar (28px) keeps only about 19px uncovered, which is under the 24px target size, and because the targets overlap the spacing exception can't apply (`packages/opui/css/components/avatar.css:97-110`, `packages/opui/css/components/avatar.css:55-59`)
  - Summary: Small clickable avatars in a group are hard to hit, since the next avatar covers part of each one.
  - Recommended: Fix with option A. A sentence covers the one size that fails, and the look of static groups stays as it is.
  - Fix: measured in Chromium with `elementFromPoint` along the middle row of three link avatars: 19px uncovered for x-small, 23px for small (exactly 24px by geometry), 31px for the default size.
  - Options:
    - A (recommended): say under Grouped that link and button avatars in a group need the default size or larger.
    - B: scale the overlap with the size, for example `--ui-space-1` for x-small avatars, so 24px of each stays uncovered.
  - Fixed: Fixed with option A: the Grouped section in `src/docs/components/avatar.astro` adds "Link and button avatars in a group need the default size or larger." By geometry an x-small avatar keeps 20px uncovered and a small one 24px.
- [x] (1) Badge: with `dot` or `hideLabel`, `label` is the only text a screen reader gets. The types make it optional and nothing warns, so `<Badge dot>` renders an empty indicator that shows a status to sighted users only (`packages/opui/components/Badge/types.ts:1-8`, `packages/opui/components/Badge/Badge.astro:21-52`)
  - Summary: A dot badge without a label shows a status that screen readers never hear, and nothing tells the author.
  - Recommended: Fix with option A. The guide says a component with no visible text has its types require a name, as AvatarGroup and Carousel do.
  - Options:
    - A (recommended): require `label` in `types.ts` when `dot` or `hideLabel` is set. The framework type files follow from it.
      ```ts
      export type Props = {
        color?: "critical" | "info" | "neutral" | "success" | "warning"
        corner?: "start-start" | "start-end" | "end-start" | "end-end"
        invisible?: boolean
      } & (
        | { dot?: false; hideLabel?: false; label?: string }
        | { dot: true; hideLabel?: boolean; label: string }
        | { dot?: false; hideLabel: true; label: string }
      )
      ```
    - B: warn in development with `warnUnnamed` from `../dev` when `dot` or `hideLabel` is set without `label`, as Checkbox does.
  - Fixed: Fixed with option A: `packages/opui/components/Badge/types.ts` requires `label` with `dot` or `hideLabel`, and the framework type files follow through `Base.Props`. The contract, API and naming tests, `tsc`, `vue-tsc` and `svelte-check` pass, and the Vue examples still cast a bare `dot` to `true`. 5.4.3 allowed a dot without a label, so the CHANGELOG Breaking entry on `label`, the MIGRATING Badge section and the What's new note say `dot` requires it.
- [x] (1) Checkbox: in the Select all example, the field set's only legend is the "Select all" checkbox. The group's name is therefore "Select all", and nothing says what the checkboxes are (`src/component-examples/checkbox/Indeterminate.html:2-8`, `src/component-examples/checkbox/Indeterminate.astro:12-15`)
  - Summary: Screen readers announce the fruit checkboxes as a group called Select all, with no word for what they choose.
  - Recommended: Fix. The mixed-checkbox pattern names the group and the parent checkbox separately, and the markup only gains a legend.
  - Fix: confirmed in Chromium's accessibility tree: `group "Select all"` holds `checkbox "Select all"`, then Apples, Bananas and Cherries. In all five formats, give the field set a legend that names the set ("Fruit"), and label the controlling checkbox by what it selects ("All fruit"), as the first checkbox of the group.
  - Fixed: The Select all example's fieldset has the legend "Notifications", and "All notifications" is the first checkbox of the group, over Email, Push and SMS, in all five formats. The controlling checkbox has no `name`, so it isn't submitted; the three channels carry `name="checkbox-indeterminate"`. Chromium's accessibility tree reads `group "Notifications"` with `checkbox "All notifications" [checked=mixed]` first. The three Indeterminate interaction tests use the new names. The parity snapshot change is intended.
- [x] (1) Chip: in forced colors, the dot of a pressed chip stays `CanvasText` on the `SelectedItem` fill while the label switches to `SelectedItemText`. In a dark high-contrast theme that is a white dot on a light fill at 1.74:1 (`packages/opui/css/components/chip.css:98-101`, `packages/opui/css/components/chip.css:114-116`, `packages/opui/css/components/chip.css:220-225`)
  - Summary: In Windows High Contrast the status dot almost disappears on a pressed filter chip.
  - Recommended: Fix. It matches the dot to the label's system color, as the pressed block already does for the text.
  - Fix: measured in Chromium with forced colors and dark mode emulated: fill rgb(153 200 255), dot rgb(255 255 255). Inside the forced-colors rule of the `[aria-pressed="true"]` block:
    ```css
    @media (forced-colors: active) {
      &.ui-dot::before {
        background-color: SelectedItemText;
      }

      &.ui-dot.ui-neutral::before {
        background-color: transparent;
        border-color: SelectedItemText;
      }
    }
    ```
  - Fixed: The forced-colors block of the `[aria-pressed="true"]` rule in `chip.css` gives the dot `SelectedItemText`, and the neutral ring a transparent fill with a `SelectedItemText` border. Measured in Chromium with forced colors and dark mode: the dot is now rgb(59 59 59) on the rgb(153 200 255) fill, like the label. The Chip line of the Forced colors list and the pressed Chip Added entry say so.
- [x] (1) DescriptionList, Form, Layout: the guide's reason for these having no forced-colors block, "layout only, no boundary or state of their own", no longer matches the CSS: the bordered leaders and the total line of a description list are borders, `.ui-divided` draws column and row rules between layout children, and an invalid fieldset colors its end text (`packages/opui/components/AGENTS.md:561`, `packages/opui/css/components/description-list.css:47-48`, `packages/opui/css/components/description-list.css:71-78`, `packages/opui/css/components/layout.css:164-175`, `packages/opui/css/components/form.css:64-66`)
  - Summary: The guide gives the wrong reason why three components need no forced-colors block, so the next edit may get it wrong.
  - Recommended: Fix. The conclusion still holds, so only the guide's sentence changes.
  - Fix: first confirm in Chromium with forced colors emulated on `/html/components/layout/` (Divided) that the rules show in `CanvasText`, as the ToggleGroup line says column and row rules do. Then reword the line, for example: "`Anchor`, `Copy`, `Form`, `Layout`, `DescriptionList`, `SelectAll`: layout only or lines the browser forces itself. The `DescriptionList` leaders and total line are real borders, the `Layout` `.ui-divided` lines are column and row rules forced to `CanvasText`, and the invalid end text of a `Form` fieldset loses its color while the invalid controls inside keep their dashed border."
  - Fixed: Confirmed in Chromium 153 with forced colors emulated: the `.ui-divided` column rules of the Layout Divided example and the Description list leaders and total line paint black (`CanvasText`). The guide now has two bullets: `Anchor`, `Copy`, `SelectAll` stay layout only, and `DescriptionList`, `Form`, `Layout` say the browser forces their lines and colors itself, with the leaders, the column and row rules and the invalid fieldset end text named (`packages/opui/components/AGENTS.md`).
- [x] (1) List: the Radio example's two radios share `name="theme"` but nothing names the group, and the page doesn't say how. The Menu's Checkable example does tie its radios to a "Sort by" heading with `aria-describedby` (`src/component-examples/list/EndRadio.astro:5-14`, `src/component-examples/list/EndRadio.html:1-22`, `src/docs/components/list.astro:187-196`, `src/component-examples/menu/Checkable.html:30-42`)
  - Summary: Screen readers announce the Dark mode and Light mode radios with nothing that says they choose a theme.
  - Recommended: Fix with option A. A fieldset is the native group name, and the Form page already shows it.
  - Options:
    - A (recommended): wrap the list in a `Fieldset` with a `FieldLegend` ("Theme") in all five formats, and add one sentence to the Radio section saying to name the group.
    - B: put a heading above the list and point each radio's `aria-describedby` at it, like the Menu's Checkable example.
  - Fixed: Option A. `EndRadio` wraps the list in a `Fieldset` with a `FieldLegend` ("Theme") and a `FieldGroup` in all five formats, and the Radio section now says to name the group with a `Fieldset` and a `FieldLegend` (HTML: a `<fieldset>` and a `<legend>`). The `list/EndRadio` parity snapshot change is intended.
- [x] (1) Range: on touch screens (`hover: none`) only the default size gets the 30px thumb, because `.ui-x-small`, `.ui-small` and `.ui-large` set `--_thumb-size` later with higher specificity. On a phone the x-small and small thumbs stay about 17px and 22px (`packages/opui/css/components/range.css:23-27`, `packages/opui/css/components/range.css:127-140`)
  - Summary: On a phone, the thumb of an x-small or small slider stays under 24px while the default slider's thumb grows to 30px.
  - Recommended: Fix. The touch size already exists, and only the rule order keeps it from the size classes.
  - Fix: measured in Chromium with Pixel 7 emulation on `/html/components/range/` (Sizes): 17.5px, 21.8px, 30px and 30.6px. The input box, about 36px tall, still meets 2.5.8. Set the touch size on the small sizes too, after the size rules:
    ```css
    @media (hover: none) {
      &,
      &:is(.ui-x-small, .ui-small) {
        --_thumb-size: 30px;
      }
    }
    ```
  - Fixed: On devices that can't hover, the x-small and small thumbs keep the 30px touch size. Measured in Chromium with Pixel 7 emulation on the Sizes example: 30px for x-small, small and the default size and 30.6px for large. The item's rule after the sizes puts a literal `30px` outside the `:where()` default rule, which `pnpm check-css-vars` refuses, so `.ui-x-small` and `.ui-small` set their `--_thumb-size` inside `@media (hover: hover)` instead and touch screens keep the default rule's 30px (`packages/opui/css/components/range.css`). The CHANGELOG entry that adds the Range sizes and the `--_thumb-size` description in `src/component-api/custom-properties/range.ts` say so.
- [x] (1) Tabs: seven of the ten tab groups on the page have no name. Binding, Filled, Icons and counts, Line, Outlined, Overflow and Wrap render a bare `.ui-tabs` with no `role="radiogroup"` or `aria-label`, but the Accessibility section tells readers to add both. Only Basics and the two Vertical groups have them (`src/component-examples/tabs/Binding.html:1`, `src/component-examples/tabs/Filled.html:1`, `src/component-examples/tabs/IconsAndCounts.html:1`, `src/component-examples/tabs/Line.html:1`, `src/component-examples/tabs/Outlined.html:1`, `src/component-examples/tabs/Overflow.html:1`, `src/component-examples/tabs/Wrap.html:1`, `src/docs/components/tabs.astro:197-201`)
  - Summary: Most of the tab examples readers copy leave out the group name that the same page asks for.
  - Recommended: Fix. Basics and Vertical already show the pattern, and Toggle names every group example the same way.
  - Fix: add `role="radiogroup"` and an `aria-label` to the seven groups in all five formats: "Account settings" for the Profile, Settings and Notifications sets, and "Mailbox" for Icons and counts. This follows up the done Tabs item at `TODO.md:59`, whose fix named only Basics and the anatomy.
  - Fixed: Binding, Filled, Icons and counts, Line, Outlined, Overflow and Wrap now have `role="radiogroup"` and an `aria-label` in all five formats: "Account settings", and "Mailbox" for Icons and counts. The Binding React, Svelte and Vue ports are hand-written, so they were edited by hand. The tabs parity snapshot changes are intended.
- [x] (1) Table: the table in the Sticky header example has no `<caption>`. Only its scroll box has a name ("Invoices"), so the table itself is unnamed. The Accessibility section says to name a table with a caption, and every other table example has one (`src/component-examples/table/StickyHeader.html:1-8`, `src/component-examples/table/StickyHeader.astro:12-19`, `src/docs/components/table.astro:254`, `src/component-examples/table/StickyHeader.astro:12-18`)
  - Summary: The sticky header table is the only example without a caption, so screen readers announce a table with no name.
  - Recommended: Fix. It takes one `TableCaption` and follows the page's own rule.
  - Fix: add `<caption>Invoices</caption>` (`TableCaption`) in all five formats.
  - Fixed: The Sticky header example has `<caption>Invoices</caption>` (`TableCaption`) in all five formats. The snapshot change is intended.
- [x] (1) Switch: the Icons example names both switches "Toggle theme". That says what pressing does, not what "on" means, so "Toggle theme, switch, on" doesn't tell a screen reader user whether the dark or the light theme is active (`src/component-examples/switch/Icons.html:28-29`, `src/component-examples/switch/Icons.html:59-60`, `src/component-examples/switch/Icons.astro:5-6`, `src/docs/components/switch.astro:92`)
  - Summary: A screen reader hears "Toggle theme, on" and can't tell which theme is on.
  - Recommended: Fix. A switch's name should say what "on" turns on, like the page's own "dark mode" usage line.
  - Fix: name them "Dark theme" in all five formats, and swap the icons so the moon is `icon-checked` and the sun is `icon-unchecked`.
  - Fixed: Both Icons switches are named "Dark theme" in all five formats, and the moon is now `icon-checked` and the sun `icon-unchecked`. The parity snapshot change is intended.
- [x] (1) Text field, Textarea: with `characterCount`, the limit only appears in the `aria-hidden` count. The element announces nothing until 10 characters or a tenth of the limit are left, so a screen reader user isn't told before typing that the field has a limit. The end text in the CharacterCount examples doesn't state it either (`packages/opui/components/TextField/TextField.astro:151-158`, `packages/opui/components/Textarea/Textarea.astro:84-91`, `packages/opui/elements/character-count.js:83-93`, `src/component-examples/text-field/CharacterCount.html:6-12`, `src/component-examples/textarea/CharacterCount.html:6-12`)
  - Summary: Screen reader users learn a field has a 160-character limit only when 16 characters are left.
  - Recommended: Fix with option A. It reuses the caller's `label` text and keeps the field's name stable, which is why the count was hidden.
  - Options:
    - A (recommended): `opui-character-count` writes its `label`, with the characters left, into the field's `aria-description` when it connects and on every input, without announcing it. The field then reads "Characters left: 20" when it gets focus. Check WebKit's support for `aria-description` first.
    - B: the CharacterCount examples state the limit in the end text ("Up to 20 characters."), and the Character count sections say the count is hidden from screen readers.
  - Fixed: Fixed with option B, not A. In Chromium, `aria-describedby` wins over `aria-description`, so A would stay silent on a field with a password toggle, with the caller's own `aria-describedby` or, since the item on label-less fields, without a label. The CharacterCount examples state the limit in the end text ("Up to 20 letters, numbers and dashes.", "Up to 160 characters, shown on your profile."). Both Character count sections say that screen readers only hear the count near the limit, so the end text names the limit. The interaction test's expected name follows. The two CharacterCount parity snapshots are re-recorded (intended).
- [x] (2) Avatar: the Overflow example names the "+4" button with `aria-label="Show 4 more reviewers"`, words that aren't on screen. The Accessibility section on the same page says an `aria-label` on a link or button avatar names it with words that speech input can't say (`src/component-examples/avatar/GroupedOverflow.html:5-11`, `src/component-examples/avatar/GroupedOverflow.astro:9-11`, `src/docs/components/avatar.astro:165-169`)
  - Summary: A speech input user who says what the overflow button shows may not reach it, and the example goes against its own page.
  - Recommended: Fix with option A. The name then starts with the visible text, which is what the page's bullet asks for.
  - Options:
    - A (recommended): keep "+4" visible, add the rest as hidden text and drop the `aria-label`, in all five formats.
      ```html
      <button class="ui-avatar ui-tonal" type="button">
        +4<span class="ui-sr-only"> more reviewers</span>
      </button>
      ```
    - B: keep the `aria-label` but start it with the visible text (`"+4 more reviewers"`), and narrow the Accessibility bullet to images and initials.
  - Fixed: Fixed with option A: `GroupedOverflow.astro` drops the `aria-label` and renders `+4<span class="ui-sr-only"> more reviewers</span>` in all five formats. Chromium names the button "+4 more reviewers". The parity snapshot change is intended.
- [x] (2) Button, Chip: in forced colors, a disabled link button and an `aria-disabled="true"` text or outlined button look enabled. Their only disabled cue is `--ui-text-disabled`, which forced colors turn into `CanvasText`, while the browser gives a native `:disabled` button `GrayText`. The outlined Chip has the same gap, and neither forced-colors block covers it (`packages/opui/css/components/button.css:473-495`, `packages/opui/css/components/button.css:234-242`, `packages/opui/css/components/chip.css:167-177`, `src/component-examples/button/Disabled.html:69-78`, `packages/opui/components/AGENTS.md:532`, `packages/opui/components/AGENTS.md:536`)
  - Summary: In Windows High Contrast the disabled text and outlined link buttons look like enabled buttons.
  - Recommended: Fix. `GrayText` is the system color for a disabled control, and it is what the browser already gives a native disabled button.
  - Fix: measured in Chromium with forced colors emulated. `button.ui-button:disabled` and `button.ui-chip.ui-outlined:disabled` get `GrayText`. `a[aria-disabled="true"][role="link"]`, `button[aria-disabled="true"]` and the outlined chip link get `CanvasText`, the same as an enabled `<button>`. Filled and tonal variants keep their opacity. Add the case to the forced-colors blocks of `button.css` and `chip.css`, and extend the Button and Chip lines of the Forced colors list.
    ```css
    @media (forced-colors: active) {
      &[aria-disabled="true"] {
        border-color: GrayText;
        color: GrayText;
      }
    }
    ```
  - Fixed: Confirmed in Chromium with forced colors and dark mode: `aria-disabled="true"` buttons and chips were `CanvasText`, native disabled ones `GrayText`. The disabled blocks of `button.css` and `chip.css` set `--_border-color` and `--_text-color` to `GrayText` on `[aria-disabled="true"]` in forced colors, so every variant matches a native disabled button. They set the custom properties rather than `border-color` and `color`, so a pressed chip keeps `SelectedItem`, the current page keeps its colors, and a disabled button in a ControlGroup keeps the group's `ButtonBorder` edges like a native one. The Button and Chip lines of the Forced colors list and the `aria-disabled` Fixed entry in the CHANGELOG say so.
- [x] (2) Card: in a dense card, a text button at the end of `.ui-actions` sticks out past the card's edge and its focus ring is cut off. `--_actions-shift` pulls the button outward by up to `--ui-card-padding` minus the ring (12px), but `.ui-dense` only lowers the card's own `--_padding` to 8px. An accordion in a dense accordion group has the same problem (`packages/opui/css/components/button.css:17-24`, `packages/opui/css/components/button.css:318-342`, `packages/opui/css/components/card.css:37-40`, `packages/opui/css/components/card.css:177-190`, `packages/opui/css/components/accordion.css:7-10`)
  - Summary: In a dense card the last button of the actions row pokes out of the card and its focus ring is cut off.
  - Recommended: Fix. The shift then follows the padding the row really has, in every density.
  - Fix: measured in Chromium. In a 300px dense outlined card, a text "Subscribe" button gets `margin-inline-end: -12px` and ends 3px past the card's border box, and the clipped card hides the end side of its ring. With `align="start"` it starts 3px before the edge. An accordion with actions inside a dense `.ui-card[role="group"]` ends 3px past the group. The Density example has no actions, so nothing on the page shows it. Fix: declare `--_actions-padding-inline: var(--_padding)` in the shared block of `card.css` (`accordion.css` already declares its own), use it for the card's `.ui-actions` padding, and read it in `button.css`. Check the Dialog footer too, since it shares the rule.
    ```css
    --_actions-shift: min(
      var(--_padding-inline) + var(--_border-width),
      var(
          --_actions-padding-inline,
          var(--ui-card-padding, var(--ui-space-3))
        ) -
        max(
          var(--ui-focus-ring-offset) + var(--ui-focus-ring-width),
          var(--ui-space-1)
        )
    );
    ```
  - Fixed: Fixed through `--ui-card-padding` instead of the item's code: `button.css` can't read the private `--_actions-padding-inline` of `card.css`, since `pnpm check-css-vars` fails on a `--_` property read in a stylesheet that doesn't declare it. `card.css` now declares `--_actions-padding-inline: var(--_padding)` on its shared root, pads `.ui-actions` with it, and sets `--ui-card-padding` to it on the card and accordion `.ui-actions`, so the cap `button.css` already reads follows the padding the row has (`accordion.css` keeps its own `--_actions-padding-inline`), like cards set `--ui-divider-gap` for their dividers. Checked in Chromium on 300px outlined cards: the end button of a dense card goes from 3px past the edge to 5px inside (`margin-inline-end: -4px`), the same at the start with `align="start"` and in a dense accordion group, and the default card keeps `-12px`. A spacious card now lines the label up with the content (the shift is the button's 14px, where it was capped at 12px by the default padding). The Dialog has no density, so its footer keeps the theme value. Updated the existing `--_actions-shift` Fixed entry in the CHANGELOG, `custom-properties/card.ts` and `button.ts`, and the `--ui-card-padding` description in `src/utils/theme-token-descriptions.ts`.
- [x] (2) Carousel: the root `ul` sets `list-style: none` but renders no `role="list"`. That attribute is the fix the List, Layout and Message lists got for WebKit, which treats a list without markers as a group (done item "List, Layout, Menu, Message") (`packages/opui/components/Carousel/Carousel.astro:26-54`, `packages/opui/css/components/carousel.css:61`, `src/component-examples/carousel/Basics.html:1`)
  - Summary: VoiceOver in Safari may not announce a carousel as a list or say how many items it holds.
  - Recommended: Fix. It applies the decision already recorded for the other lists, and a redundant role costs nothing in Chromium, which already exposes `list "Destinations"`.
  - Fix: render `role="list"` on the root before `...rest` in all four frameworks, and add it to the 13 HTML carousel examples. The markup snapshots change on purpose.
  - Fixed: `Carousel.astro` renders `role="list"` before `...rest`, and `pnpm build-components` compiled it into the React, Svelte and Vue files. The 13 HTML examples carry it, the Accessibility section adds "Keep `role="list"` for Safari." like the List page, and the Carousel Added entry in the CHANGELOG says so. The 13 carousel parity snapshots were re-recorded on purpose.
- [x] (2) Carousel: the scroll button icon is a white SVG blended with `background-blend-mode: difference`, so it is drawn in the inverse of `--_button-bg-color`. The Custom buttons example sets that color to `--ui-primary`, which gives an orange arrow on a blue button at about 2.2:1, under the 3:1 a control's icon needs (`src/component-examples/carousel/CustomButtons.html:23-28`, `src/component-examples/carousel/CustomButtons.astro:18-23`, `packages/opui/css/components/carousel.css:138-140`, `src/component-api/custom-properties/carousel.ts:13-17`, `src/docs/components/carousel.astro:222-227`)
  - Summary: The arrows on the custom carousel buttons are hard to see, and readers who copy the example get the same.
  - Recommended: Fix. The default `--ui-surface-inverse` gives a near-white or near-black arrow, and the example only needs to show a custom icon.
  - Fix: measured in Chromium with the default theme. The button is oklch(0.499 0.191 222.8) in light mode, and its inverse, rgb(255 139 79), is 2.21:1 against it. In dark mode it is 2.16:1. Drop the `--_button-bg-color` override from the example in all five formats, and say in the `--_button-bg-color` description that the icon is drawn in its inverse, so the color has to be very dark or very light.
  - Fixed: Measured again in Chromium: the inverse of `--ui-primary` is 2.20:1 against it in light mode and 2.17:1 in dark mode, while `--ui-surface-inverse` gives 17.2:1 and 18.3:1. The Custom buttons example drops its `--_button-bg-color` override in all five formats, and the `--_button-bg-color` description in `custom-properties/carousel.ts` says the icon is drawn in its inverse, so keep it very dark or very light.
- [x] (2) ControlGroup: the root always renders `role="group"`, and the page says to name a group of actions with `aria-label`. Yet the Variants, Colors, Disabled, Sizes, Labels, Overflow and WithIcons groups, the textarea group in Vertical and the anatomy have no name, and the HTML note in `api.ts` only asks for the role (`packages/opui/components/ControlGroup/ControlGroup.astro:17-31`, `src/docs/components/control-group.astro:233-241`, `src/docs/components/control-group.astro:249`, `src/component-api/control-group/api.ts:32`, `src/component-examples/control-group/Variants.astro:5-27`, `src/component-examples/control-group/Sizes.astro:5-27`, `src/component-examples/control-group/Colors.astro:5-15`, `src/component-examples/control-group/Disabled.astro:5-15`, `src/component-examples/control-group/Labels.astro:5-13`, `src/component-examples/control-group/Overflow.astro:6-31`, `src/component-examples/control-group/WithIcons.astro:9-29`, `src/component-examples/control-group/Vertical.astro:72-79`)
  - Summary: Screen readers announce most control groups on the page as an unnamed group, and readers copy them that way.
  - Recommended: Fix with option A. The page already asks for the name, and the Vertical and Split button examples show it.
  - Fix: the Fields price group can stay as it is, because the legend of the fieldset around it names it. The Pagination group can also stay, because it sits in `nav aria-label="Pagination"`.
  - Options:
    - A (recommended): add `aria-label` to every other group in all five formats, including `WithIconsCode`, `VerticalCode` and the anatomy. For example "RSVP" (WithIcons), "Message actions" (Overflow), "Discount" (Labels) and "Delivery note" (the Vertical textarea group). Change the HTML note in `api.ts` to "The root needs `role="group"` and a name."
    - B: like A, and also call `warnUnnamedGroup("ControlGroup", ...)` from `../dev` in the four frameworks, as ToggleGroup does. The Fields price group would then need `aria-labelledby` pointing at its legend so it doesn't warn.
  - Fixed: Fixed with option A. Every group of actions in the ControlGroup examples has an `aria-label` in all five formats: "Edit history" (Variants), "Message actions" (Colors, Disabled, Overflow), "Week" (Sizes), "Discount" (Labels), "RSVP" (WithIcons and WithIconsCode), "Delivery note" (the textarea group in Vertical and VerticalCode), and "Find an order" on the anatomy. The Fields price group and the Pagination group stay as they are. The HTML note in `src/component-api/control-group/api.ts` reads "The root needs `role="group"` and a name." The parity snapshot changes are intended.
- [x] (2) Fieldset: `FieldDescription` renders a bare `p` that nothing links to its fieldset, and no example and no line on the page links it with `aria-describedby`. So screen readers skip the description when focus enters the group. The Invalid example links only its error, not "Pick at least one." (`packages/opui/components/FieldDescription/FieldDescription.astro:9`, `packages/opui/components/Fieldset/Fieldset.astro:13-28`, `src/component-examples/form/FieldsetInvalid.html:1-3`, `src/component-examples/form/Basics.html:2-4`, `src/docs/components/form.astro:214-218`, `src/component-examples/checkbox/FieldGroupFieldDescription.html:2-45`, `src/docs/components/partials/FieldGroupNotes.astro:37-55`, `packages/opui/components/FieldDescription/FieldDescription.astro:1-9`)
  - Summary: Screen reader users who tab into a fieldset hear its legend but not the description under it.
  - Recommended: Fix with option A. The Invalid example already links its error this way, and it works the same in every framework.
  - Fix: the examples with a description are Basics, FieldGroup (both fieldsets), FieldsetDisabled, FieldsetInvalid, FieldsetRequired, FieldsetStacked, the five KitchenSink fieldsets, AdaptiveOutput and the anatomy.
  - Options:
    - A (recommended): give each `FieldDescription` an `id`, and point the fieldset's `aria-describedby` at it in all five formats. In Invalid, list the description first and then the error. Add a bullet to the Accessibility section: "Point `aria-describedby` on the fieldset at the description."
    - B: link it through `fieldsetContext`, the way the legend is linked. `Fieldset` generates a description id, `FieldDescription` takes it, and `Fieldset` merges it into `aria-describedby` with `idRefs`. Downside: React, Svelte and Vue can't tell whether a description renders, so a fieldset without one points at a missing id, as a `Dialog` without a `DialogTitle` does.
  - The Field description examples on the Checkbox, Radio and Switch pages (`src/docs/components/partials/FieldGroupNotes.astro`) need the same link, and that partial a sentence like its Validation one.
  - Fixed: Fixed with option A: every example with a description gives it an `id` and points the fieldset's `aria-describedby` at it in all five formats: Form Basics, FieldGroup (both), FieldsetDisabled, FieldsetInvalid (description, then error), FieldsetRequired, FieldsetStacked, the five Kitchen sink fieldsets, AdaptiveOutput, the Form anatomy and the Checkbox, Radio and Switch Field description examples (both fieldsets each). The Form Accessibility section has the bullet "Point `aria-describedby` on the fieldset at the description.", the Invalid sentence says "at the description, then the error", and `FieldGroupNotes` has the same sentence above its Field description example. In AdaptiveOutput the generated legend id is now `form-adaptive-output-2-legend`, since generated ids are numbered after the ones the example writes. The parity snapshot changes are intended.
- [x] (2) Message: nothing tells a screen reader that a new message arrived. `Messages` renders an `ol` with `role="list"` and no live region, and the Accessibility section only says to name the list and use `<time>` (`packages/opui/components/Message/Messages.astro:7`, `src/docs/components/message.astro:154-162`)
  - Summary: In a live chat, screen reader users don't hear new messages arrive unless they go back through the list.
  - Recommended: Fix with option A. A log region is the ARIA pattern for a chat, and a wrapper keeps the list role Safari needs.
  - Fix: confirm with NVDA and VoiceOver that an added message is read once, with its author. Also check how this works with the typing indicator (see the Message item in To check).
  - Options:
    - A (recommended): say on the page, and show in Basics in all five formats, to wrap a live conversation in `<div role="log" aria-label="…">`. That announces added messages and keeps the list and its count.
    - B: say to add `aria-live="polite"` and `aria-relevant="additions"` to the list itself.
  - Explained: Checked in Chromium: a `div` with `role="log"` and `aria-label` around the `ol` is a polite log (`relevant=additions text`) that still holds the named list and its items, so option A keeps the list role Safari needs. Each message keeps its author in `.ui-header`, which a run only hides visually, so an added message carries its author. Basics in all five formats would read `<div role="log" aria-label="Conversation with Saga"><ol class="ui-messages" role="list" aria-label="Messages with Saga">...</ol></div>`, with one Accessibility bullet: "In a live chat, wrap the list in `role="log"`: a screen reader reads each added message once." Inside a log the typing `li` is an addition too, so its `role="status"` may read the indicator twice: confirm both with NVDA and VoiceOver before the docs change (the Message item in To check).
  - Fixed: with option A in 271acc27. The Accessibility section says to wrap the list of a live conversation in `<div role="log" aria-label="…">` so screen readers announce new messages, and the list keeps its items and count. The Basics example shows the wrapper (`aria-label="Chat with Saga"`) in all five formats, and the agent skill reference picks it up. Chromium's accessibility tree shows a polite `log` holding the named list with its 4 items in every framework.
- [x] (2) NumberField: a disabled field leaves both step buttons in the tab order. When the input is disabled, `number-field.js` gives the buttons `aria-disabled="true"` instead of `disabled`, so Tab skips the input and stops on "Decrease" and "Increase", both unavailable (`packages/opui/elements/number-field.js:115-130`, `packages/opui/components/NumberField/NumberField.astro:72-78`, `packages/opui/components/NumberField/NumberField.astro:101-107`, `src/component-examples/number-field/Disabled.html:5-46`)
  - Summary: Tabbing through a form stops twice on the dead step buttons of a disabled number field and skips its input.
  - Recommended: Fix. A disabled fieldset already disables these buttons natively, and `aria-disabled` stays for the limits, where focus should remain.
  - Fix: confirmed in Chromium on `/html/components/number-field/` (Disabled): both buttons have `disabled === false` and `aria-disabled="true"`, and Tab goes from Decrease straight to Increase. In `#sync`, disable the buttons while the input is disabled, and keep `aria-disabled` for `min`, `max` and a read-only input.
    ```js
    button.disabled = input.disabled
    if (input.readOnly || atLimit) button.setAttribute("aria-disabled", "true")
    else button.removeAttribute("aria-disabled")
    ```
  - Fixed: `#sync` in `number-field.js` sets the native `disabled` on both step buttons from the input's `disabled`, with `toggleAttribute`, so the element's own MutationObserver doesn't loop. It keeps `aria-disabled` for `min`, `max` and a read-only input. Checked in Chromium: on the Disabled example both buttons are disabled and Tab skips the whole field. Turning `disabled` on and off and setting `readonly` behave as described. The NumberField CHANGELOG entry and the root row in `number-field/api.ts` say so.
- [x] (2) OneTimeCode: in forced colors an invalid code looks like a valid one. The box mask is `CanvasText` in every state, and the dashed invalid rule from `text-field.css` lands on the field's 0px border (`packages/opui/css/components/one-time-code.css:29-31`, `packages/opui/css/components/one-time-code.css:264-304`, `packages/opui/css/components/text-field.css:400-402`, `packages/opui/components/AGENTS.md:541`, `src/component-examples/one-time-code/Validation.html:1-17`)
  - Summary: With Windows High Contrast on, an invalid one-time code looks the same as a valid one.
  - Recommended: Fix. TextField, Select and the choice controls already get a dashed cue for the same state.
  - Fix: confirmed with screenshots in Chromium with forced colors emulated on `/html/components/one-time-code/` (Validation and Basics are identical; computed `border-style: dashed`, `border-width: 0px`). Add an invalid case to the forced-colors block and to the OneTimeCode line of the Forced colors list. The block's own `outline: 0` on focus (lines 293-294) must not remove the cue.
    ```css
    @media (forced-colors: active) {
      &:has([aria-invalid="true"], :user-invalid) .ui-field {
        outline: var(--ui-field-border-width) dashed CanvasText;
      }
    }
    ```
  - Fixed: The forced-colors block of `one-time-code.css` gives an invalid code a dashed `CanvasText` outline, `--ui-field-border-width` wide, on `.ui-field`. The selector is `&:has(.ui-field > input:is([aria-invalid="true"], :user-invalid)) .ui-field`, not the item's `&:has([aria-invalid="true"], :user-invalid) .ui-field`. The item's selector loses on specificity to the `outline: 0` that `one-time-code.css:220` sets with `:focus-visible`. This one ties with it and comes later. Checked in Chromium with forced colors emulated: Validation shows the dashed outline at rest, with pointer focus and with keyboard focus. Basics shows none, and nothing shows without forced colors. The OneTimeCode line of the Forced colors list in `packages/opui/components/AGENTS.md` and the OneTimeCode CHANGELOG entry say so.
- [x] (2) Progress: the round ring drops the bar's 3:1 outline (`outline: 0`), and its empty arc is `--ui-surface-tonal`. Against the page that is 1.16:1 in light mode and 1.33:1 in dark, with or without more contrast. So the ring's full circle doesn't show, though the guide names the Progress track as an edge that needs 3:1 (`packages/opui/css/components/progress.css:5`, `packages/opui/css/components/progress.css:15`, `packages/opui/css/components/progress.css:95`, `packages/opui/css/components/progress.css:106-109`, `packages/opui/components/AGENTS.md:483`)
  - Summary: A round progress ring at 72% reads as an open arc, since the empty part of its circle barely shows.
  - Recommended: Fix. The bar already shows its track with this outline, and the guide names the Progress track for it.
  - Fix: measured in Chromium on `/html/components/progress/` (Round). Drop `outline: 0` from `.ui-round` so the ring keeps the bar's `--ui-field-border-color` outline at its outer edge (4.2:1, and 8.4:1 with more contrast) and its `CanvasText` outline in forced colors. Then check that the 24px ring still reads well.
  - Fixed: Dropped `outline: 0` from `.ui-round` in `progress.css`, so the ring keeps the bar's `--ui-field-border-color` outline at its outer edge, and `CanvasText` in forced colors. Checked in Chromium in light and dark mode: the full circle shows, also at 24px. Visual baselines with a round ring change.
- [x] (2) Range: in forced colors an invalid slider looks like a valid one. The invalid rule only changes `--_accent` and the helper text color, the forced-colors block paints the track, fill and thumb the same in every state, and the end text becomes `CanvasText` (`packages/opui/css/components/range.css:235-243`, `packages/opui/css/components/range.css:412-447`, `packages/opui/components/AGENTS.md:543`, `src/component-examples/range/Validation.html:1-13`)
  - Summary: With Windows High Contrast on, an invalid slider looks the same as a valid one.
  - Recommended: Fix. TextField and the choice controls already get a dashed cue for the same state.
  - Fix: confirmed with screenshots in Chromium with forced colors emulated on `/html/components/range/` (Validation and Basics). Give an invalid range a shape cue there, such as a dashed thumb border (one rule per vendor pseudo-element), and add it to the Range line of the Forced colors list.
    ```css
    &:has([aria-invalid="true"], :user-invalid) > input[type="range"] {
      @media (forced-colors: active) {
        &::-webkit-slider-thumb {
          border-color: CanvasText;
          border-style: dashed;
        }

        &::-moz-range-thumb {
          border-color: CanvasText;
          border-style: dashed;
        }
      }
    }
    ```
  - Fixed: An invalid range gets a dashed `CanvasText` thumb border in forced colors, one rule per vendor pseudo-element in the Validation block of `packages/opui/css/components/range.css`, checked with screenshots in Chromium with forced colors emulated in light and dark mode. The Range line of the Forced colors list in `packages/opui/components/AGENTS.md` names the cue, and the Fixed entry for dashed invalid borders in the CHANGELOG now includes `Range`.
- [x] (2) Select: text in the `start` and `end` affixes reaches neither the name nor the description. `aria-labelledby` names the select from the label alone, and `aria-describedby` lists only the top, bottom, start text and end text. So "Delivery time" with the end affix "days" is read as "Delivery time, 1", while a TextField is read as "Weight kg" (`packages/opui/components/Select/Select.astro:44-50`, `packages/opui/components/Select/Select.astro:91-93`, `packages/opui/components/Select/Select.astro:110-115`, `src/component-examples/select/Affix.astro:38-43`)
  - Summary: A screen reader hears "Delivery time, 1" without the unit "days" that the field shows.
  - Recommended: Fix with option A. It matches the name a TextField with the same affix gets.
  - Fix: confirmed in Chromium's accessibility tree on `/html/components/select/` (Affix) and `/html/components/text-field/` (Affix). Give `.ui-start` and `.ui-end` part ids (`ids("start")`, `ids("end")`) in Astro and the HTML examples. The React, Svelte and Vue Select files are hand-written, so update them with `/port-component Select`.
  - Options:
    - A (recommended): add the affix ids to the name after the label, `aria-labelledby={idRefs(labelId, startId, endId)}`.
    - B: add them to `describedBy`, so the unit is read after the value.
  - Fixed: Fixed with option A. `.ui-start` and `.ui-end` get the part ids `x-start` and `x-end`, and `aria-labelledby` lists them after the label when the component renders one, in `Select.astro` and the hand-written React, Svelte and Vue ports. Chromium's accessibility tree now reads "Delivery time days" and "Currency ¤" on the Affix example; the Country icon is `aria-hidden`, so that name stays "Country". The `id` row in `src/component-api/select/api.ts`, the ids What's new note and the CHANGELOG id entry list `x-start` and `x-end`, and a Fixed entry names the change. The select/Affix and select/Spread parity snapshot changes are intended.
- [x] (2) Select: the Grouped example's `<div role="group">` groups have no name, and the page says such a group can't be named. But `aria-labelledby` on the group, pointing at its `<label>`, names it ("group French cars" in Chromium's accessibility tree) (`src/component-examples/select/Grouped.astro:7-16`, `src/component-examples/select/Grouped.html:10-19`, `src/docs/components/select.astro:180-186`)
  - Summary: Screen readers announce the option groups of the first grouped select without a name, and readers copy that example.
  - Recommended: Fix. An id and one attribute per group give the div groups the name an optgroup gets.
  - Fix: verified in Chromium by adding the attributes on `/html/components/select/` (Option groups). Add them in all five formats, and change the sentence to say to link the label.
    ```html
    <div role="group" aria-labelledby="select-grouped-french">
      <label class="ui-text" id="select-grouped-french">French cars</label>
    ```
  - Fixed: Each `<div role="group">` in the Grouped example points `aria-labelledby` at its label, in all five formats, and the Option groups text says: "Name each `<div role="group">` with `aria-labelledby` pointing at its label." Example ids follow `select-grouped-<n>-<part>` and must share the Select's instance number (`tests/unit/example-ids.test.ts`), so the example passes `id="select-grouped-1"` to the Select and the labels are `select-grouped-1-french` and `select-grouped-1-swedish`. With the picker open, Chromium names the groups "French cars" and "Swedish cars". The select/Grouped snapshot change is intended.
- [x] (2) Tabs: under forced colors, the focus ring of the selected tab is `CanvasText` drawn inside its `SelectedItem` fill. The ring is drawn inside in the default scroll mode and in a card, and `.ui-filled` swaps it for the theme's `--ui-on-selected-strong`. Windows contrast themes don't make those two colors contrast: CanvasText on SelectedItem is about 1.4 to 1.9:1 in Aquatic, Desert, Dusk and Night sky. ToggleButton and Message use `SelectedItemText` for the same case (`packages/opui/css/components/tabs.css:281-292`, `packages/opui/css/components/tabs.css:433-449`, `packages/opui/css/components/toggle-button.css:140-149`, `packages/opui/css/components/message.css:253-259`, `packages/opui/components/AGENTS.md:549`)
  - Summary: With a Windows contrast theme on, the focus ring of the selected tab nearly vanishes into its fill.
  - Recommended: Fix. ToggleButton and Message already pair `SelectedItemText` with `SelectedItem` for a ring drawn inside the fill.
  - Fix: confirm first with a Windows contrast theme on `/html/components/tabs/` (Basics, Filled). Headless Chromium's emulated palette draws black on rgb(25, 103, 210), which is 3.9:1 (I measured it), so `contrast.spec.ts` can't catch this. Then set the inner ring to `SelectedItemText` in the forced-colors block. It has the same specificity as the `.ui-filled` rule and comes later, so it wins. Also add the ring to the Tabs line of the Forced colors list.
    ```css
    @media (forced-colors: active) {
      &:where(
          :is(.ui-accordion, .ui-card, .ui-dialog) > *,
          :not(.ui-overflow-wrap, .ui-vertical)
        )
        > .ui-input[type="radio"]:checked
        + .ui-label::before {
        --ui-focus-ring-color: SelectedItemText;
      }
    }
    ```
  - Fixed: `tabs.css` sets `--ui-focus-ring-color: SelectedItemText` on the checked tab's `::before` in the forced-colors block, for the cases that draw the ring inside (default scroll mode and directly in an Accordion, Card or Dialog); it comes after the `.ui-filled` rule with the same specificity, so it wins there too. Checked in Chromium with emulated forced colors: the inside ring is SelectedItemText on SelectedItem, the outside ring of `.ui-overflow-wrap` and `.ui-vertical` stays CanvasText on Canvas, and nothing changes without forced colors. The Tabs line of the Forced colors list in `packages/opui/components/AGENTS.md` names the ring, and the `Tabs` Fixed entry about inside rings in the CHANGELOG says so. A Windows contrast theme check is still worth doing by hand.
- [x] (2) Table: in the In a card example, the focus ring of the scrolling table is cut off on three sides. The `.ui-flush` table fills the card's width (the card root has `padding-inline: 0`) and is its last child, and `.ui-card` clips with `overflow: hidden`. Only the top edge of the ring outside the table shows (confirmed in Chromium with a screenshot) (`packages/opui/css/components/card.css:31-33`, `packages/opui/css/components/table.css:152-165`, `src/component-examples/table/InCard.html:6`, `src/docs/components/table.astro:177-183`)
  - Summary: Tabbing to the scrolling table in a card shows only a line above it instead of a ring around it.
  - Recommended: Fix. List and Tabs draw the ring inside the element wherever a clipping parent would cut a ring drawn outside it.
  - Fix: in the `.ui-overflow-scroll` block, then check that the ring shows over the cell backgrounds.
    ```css
    &.ui-overflow-scroll:focus-visible {
      outline-offset: var(--ui-focus-ring-inset);
    }
    ```
  - Fixed: `.ui-overflow-scroll:focus-visible` gets `outline-offset: var(--ui-focus-ring-inset)` in `table.css`. Screenshots in Chromium of the In a card example show the ring on all four edges, over the header and body cells. The `Table` Added entry for `overflow="scroll"` says the ring is drawn inside.
- [x] (2) Table: with `stickyHeader`, moving focus backward to a control in a row above the visible area leaves the control under the stuck header. The browser scrolls it to the top edge of the scroll box, where the sticky `thead` covers it, and nothing sets `scroll-padding` or `scroll-margin` for the header. I put links in the rows of the Sticky header example in Chromium: Shift+Tab left "INV-1003" fully behind the header (`packages/opui/css/components/table.css:167-188`, `src/component-examples/table/StickyHeader.html:1-7`, `src/docs/components/table.astro:206-214`)
  - Summary: Shift+Tab through links or buttons in a sticky-header table can land focus on a row hidden behind the header.
  - Recommended: Fix with option A. Only the scroll box knows how tall its header is, and one declaration covers every control in it.
  - Options:
    - A (recommended): the Sticky header section says the scroll box (or `html`, when the header sticks to the page) needs a `scroll-padding-block-start` as tall as the header, and the StickyHeader example sets it in all five formats.
    - B: `table.css` gives the descendants of a sticky-header table's `tbody` a `scroll-margin-block-start` equal to the height of a one-row header in each density. A header with two rows still needs A.
  - Fixed: Option A. The Sticky header section says to give the scroll box, or `html` when the header sticks to the page, a `scroll-padding-block-start` as tall as the header, and the example sets `2.5rem` (the default header is 33.5px). Checked in Chromium with links in the rows: Shift+Tab no longer lands a link under the header. The snapshot change is intended.
- [x] (2) Toast: when the last toast is dismissed while it has focus (with Close, Esc, or an action that shows no new toast), focus falls to `<body>`. `dismiss()` only moves focus to another toast, so when none is left the focused item becomes `inert` and is removed. Confirmed in Chromium on Basics with both Close and Esc (`packages/opui/elements/toaster.js:131-148`, `packages/opui/elements/toaster.js:63-70`, `src/component-api/toast/api.ts:17-20`)
  - Summary: After closing the last toast with the keyboard, focus is lost instead of going back where it was.
  - Recommended: Fix. The toaster already listens for focus entering the list, so it can remember where focus came from.
  - Fix:
    ```js
    list?.addEventListener("focusin", (event) => {
      if (!list.contains(event.relatedTarget))
        this.#origin = event.relatedTarget
      // existing pause logic
    })
    // in dismiss()
    if (focused) {
      const target = next?.querySelector("button") ?? this.#origin
      if (target?.isConnected) target.focus()
    }
    ```
  - Fixed: Fixed: the toaster remembers where focus came from when it enters the list (the `relatedTarget` of a `focusin` from outside it), and `dismiss()` moves focus back there when it dismisses the last toast with focus in it, after Close, Esc or an action that shows no new toast (`packages/opui/elements/toaster.js`). The Esc and Enter rows in `src/component-api/toast/api.ts` say where focus goes, and the Basics test in `tests/e2e/interaction.spec.ts` checks that Esc returns focus to Save changes. Checked in Chromium with Esc, Close by keyboard and by mouse, and two toasts.
- [x] (2) Toast: a toast shown while a modal dialog or drawer is open is inert if its toaster sits outside the dialog. The list opens, but its buttons can't be focused or clicked, and neither the toast nor the status and alert regions are in the accessibility tree, so nothing is announced. `toast()` without a `toaster` picks the first `opui-toaster` in the document, and the page only says to put the toaster near the content. Confirmed in Chromium with the AX tree and `elementFromPoint` (`packages/opui/elements/toaster.js:234-243`, `src/docs/components/toast.astro:238-244`)
  - Summary: A toast fired from a modal dialog is shown but silent for screen readers and can't be reached.
  - Recommended: Fix with option A. It makes the default call work in the common case of saving a form in a dialog.
  - Options:
    - A (recommended): `toast()` without a `toaster` prefers one inside the open modal dialog, and the Accessibility list says a modal dialog or drawer that shows toasts needs its own toaster.
      ```js
      toaster ??
        document.querySelector("dialog:modal opui-toaster") ??
        document.querySelector("opui-toaster")
      ```
    - B: only add the Accessibility bullet.
  - Fixed: Fixed with option A, with one change: `toast()` without a `toaster` takes the toaster in the modal dialog that holds focus, then the one in any open modal dialog, then the first on the page (`defaultToaster()` in `packages/opui/elements/toaster.js`). Going by focus finds the top dialog when modals are nested, since focus can't leave it (Chromium focuses the dialog itself on a click on its text). The Accessibility list on the Toast page says a modal Dialog or Drawer that shows toasts needs its own toaster, and the Toaster Added entry in the CHANGELOG names the new default. Checked in Chromium with nested modals and a modal without a toaster: the toast in the dialog's toaster can be clicked and its status region is in the accessibility tree.
- [x] (2) Text field, Textarea: in a modal dialog or drawer, the character count is never announced. `opui-character-count` appends its one polite live region to `document.body`, which is inert while a modal dialog is open, so the region isn't in the accessibility tree. In Chromium, "Characters left: 7" was written to the region but was missing from the AX tree until the dialog closed (`packages/opui/elements/character-count.js:6-24`, `packages/opui/elements/character-count.js:40`)
  - Summary: In a dialog or drawer form, screen readers never hear how many characters are left.
  - Recommended: Fix. A live region inside the dialog stays in the accessibility tree while the rest of the page is inert.
  - Fix: append the region to the field's closest `dialog` (`body` when there is none), with one region per container.
    ```js
    const regions = new WeakMap()
    function announce(text, field) {
      const root = field.closest("dialog") ?? field.ownerDocument.body
      let region = regions.get(root)
      if (!region?.isConnected) {
        region = field.ownerDocument.createElement("div")
        region.className = "ui-sr-only"
        region.setAttribute("aria-live", "polite")
        root.append(region)
        regions.set(root, region)
      }
      // clear, then write in the next frame, as today
    }
    ```
  - Fixed: `character-count.js` keeps one live region per container, in a WeakMap: the field's closest `dialog`, else `body`. It creates the region on the first input instead of on connect, so no region lands in a framework-rendered dialog before it hydrates, and the first announcement still comes at least 750ms later. In a dialog the region is the first child, not the last, because `card.css` pads a `.ui-content` that is the dialog's `:last-child`. Checked in Chromium: in an open modal dialog, "Characters left: 7" is in the AX tree as a live region and the dialog content doesn't move. After the dialog closes, a field outside it still announces through the `body` region. The CHANGELOG character count entry says so.
- [x] (2) Anchor, Tooltip: where the compat layer applies (no interest invokers, so Firefox and Safari), the tooltip shows through `:hover` and `:focus-visible` rather than as an open popover, so Esc can't hide it. The Keyboard support row says Esc hides it and focus stays on the trigger, and WCAG 1.4.13 requires that content shown on hover or focus can be dismissed without moving the pointer or focus (`packages/opui/css/compat/tooltip.css:2-26`, `src/component-api/tooltip/api.ts:17-20`, `src/docs/guide/browser-support.astro:143-148`, `packages/opui/css/compat/anchor.css:2-13`, `src/component-api/anchor/api.ts:11-15`, `src/docs/guide/browser-support.astro:66-71`)
  - Summary: In Firefox and Safari, a tooltip that covers content stays until the pointer or focus moves away, although the docs say Esc hides it.
  - Recommended: Fix with option A. The compat layer is CSS only and can't see a key press, so the docs should say what those browsers do.
  - Fix: confirm first in Firefox on `/html/components/tooltip/` (Basics): Tab to Save and press Esc. The Anchor fallback in `css/compat/anchor.css` works the same way.
  - Options:
    - A (recommended): the Esc row says it needs interest invokers, and the Tooltip line in the Compat layer section says the fallback can't be dismissed with Esc.
    - B: ship an optional `elements/tooltip.js` that, without interest invokers, hides a shown fallback on Esc through a `data-` attribute the compat rules respect, until the trigger loses hover and focus.
  - The Anchor hover card has the same gap (`packages/opui/css/compat/anchor.css:2-13`, `src/component-api/anchor/api.ts:11-15`). Also check whether the `interestfor` polyfill on the Browser support page helps: `@supports not selector(:interest-source)` still matches with it loaded, so the CSS could keep the card shown after the polyfill hides it.
  - Fixed: Fixed with option A: the Esc rows of the Tooltip and Anchor APIs say that in browsers without interest invokers the content stays until the pointer and focus leave, and the Anchor and Tooltip lines in the Compat layer section of the Browser support page say Esc doesn't hide them. The `interestfor` polyfill doesn't help: it can't make `:interest-source` parse, so `@supports not selector(:interest-source)` still matches with it, and the compat rules keep the content shown on hover and focus after the polyfill hides the popover on Esc. Checked in Chromium with the compat rules forced on and `interestfor` removed: Esc leaves both the tooltip and the hover card shown, also after `hidePopover()`. Option B is still the way to close the gap.
- [x] (2) Radio: in forced colors a disabled radio looks enabled. The forced-colors block sets `CanvasText` for the border and `SelectedItem` for the checked fill, with `forced-color-adjust: none`, but has no disabled case. A disabled Checkbox and Switch both turn `GrayText` (`packages/opui/css/components/radio.css:86-97`, `packages/opui/css/components/checkbox.css:120-128`, `packages/opui/css/components/switch.css:171-187`)
  - Summary: In high contrast mode a disabled radio keeps its highlight fill and dark ring, unlike disabled checkboxes and switches.
  - Recommended: Fix. It mirrors the disabled case that Checkbox and Switch already have.
  - Fix: checked in Chromium with forced colors emulated. A checked disabled radio paints `SelectedItem`, an unchecked disabled one a `CanvasText` ring, and the disabled checkboxes next to them are `GrayText`. Add the disabled case after `&:checked` in the forced-colors block:
    ```css
    &:is(:disabled, [aria-disabled="true"]) {
      --_accent: GrayText;
      --_border-color: GrayText;
    }
    ```
  - Fixed: Added the disabled case after `&:checked` in the forced-colors block of `radio.css` (`--_accent` and `--_border-color` to `GrayText`). Checked in Chromium with forced colors emulated, light and dark: disabled and `aria-disabled="true"` radios, checked or not, are now `GrayText` like the checkboxes next to them. The CHANGELOG Fixed entry about the disabled Checkbox now names Radio too, and `custom-properties/radio.ts` documents the `GrayText`.
- [x] (2) Card: in the Header row example, the initials avatar is named "Lena Ek" and sits right before the "Lena Ek" heading, so screen readers read the name twice. The List StartAvatar example and the blog-list block hide the same kind of avatar with `aria-hidden="true"` (`src/component-examples/card/HeaderActions.astro:7-9`, `src/component-examples/list/StartAvatar.astro:7`, `src/blocks/blog-list.html:271-273`, `src/docs/components/avatar.astro:154-172`)
  - Summary: Screen readers announce "Lena Ek" twice in the Card header row example, first as an image and then as the heading.
  - Recommended: Fix. It is one attribute, and it matches the List example and the Avatar page's `alt=""` rule.
  - Fix: render `<Avatar aria-hidden="true">LE</Avatar>` in `HeaderActions.astro`, run `pnpm build-examples` and re-record the parity snapshot. The Layout Media example has the same pair (`src/component-examples/layout/Media.astro:6-8`). Optionally, add "or `aria-hidden="true"` on initials next to the name" to the Avatar Accessibility bullet.
  - Fixed: `HeaderActions.astro` and the Layout `Media.astro` render `<Avatar aria-hidden="true">LE</Avatar>`, and their parity snapshots were re-recorded on purpose. The Avatar Accessibility bullet now reads "Give initials and icons `role="img"` and an `aria-label`, or `aria-hidden="true"` next to the name."
- [x] (2) Toggle: the Text + icon group is named "Playback", but its options are Walking, Cycling and Commuting, so the name doesn't say what the group picks. The fix for the earlier unnamed-groups item asked for "Transport" (`src/component-examples/toggle/Interactive.astro:5`, `src/component-examples/toggle/Interactive.html:1`, `src/docs/components/toggle.astro:155-158`)
  - Summary: Screen readers announce a "Playback" radio group whose options are ways to travel.
  - Recommended: Fix. One attribute in the Astro file, and the generator writes the rest.
  - Fix: `aria-label="Travel mode"` in `Interactive.astro`. Then run `pnpm build-examples`, update the parity snapshot and say so in the commit.
  - Fixed: The Text + icon group is `aria-label="Travel mode"`, regenerated in all formats. The snapshot change is intended.
- [x] (2) TextField, Textarea: without `label`, the root is a `div` and nothing links the start and end text to the input. Only `passwordToggle` gives them ids and `aria-describedby`, and Textarea never does. So a field named with `aria-label`, which the page tells readers to use, never has its help or error text announced (`packages/opui/components/TextField/TextField.astro:45-58`, `packages/opui/components/TextField/TextField.astro:84-94`, `packages/opui/components/Textarea/Textarea.astro:35`, `packages/opui/components/Textarea/Textarea.astro:55-65`, `src/docs/components/text-field.astro:111-112`, `packages/opui/components/AGENTS.md:356`)
  - Summary: A text field or textarea named with `aria-label` never announces its start or end text, such as an error message.
  - Recommended: Fix. The ids and the `idRefs` merge already exist for `passwordToggle`, so the change only widens one condition.
  - Fix: link the text whenever the root isn't a `<label>`, then run `pnpm build-components`. In the guide's End Text section, say that the exception only holds while the label wraps the control.
    ```astro
    const linked = passwordToggle || !(label || labelSlot) const startTextId =
    linked && hasStartText ? ids("start-text") : undefined const endTextId =
    linked && hasEndText ? ids("end-text") : undefined
    ```
    In Textarea:
    - destructure `"aria-describedby"`
    - take `createIds(Astro.locals, "textarea", id)`
    - put the ids on `.ui-start-text` and `.ui-end-text`
    - set `aria-describedby={idRefs(startTextId, endTextId, ariaDescribedBy)}` on the `textarea`
  - Fixed: TextField links the start and end text whenever the root isn't a `<label>`: `linked = passwordToggle || !(label || labelSlot)`. Textarea destructures `aria-describedby` and takes `createIds(Astro.locals, "textarea", id)`. It gives the two texts ids and merges them on the `textarea` with `idRefs`. `pnpm build-components` compiled the React, Svelte and Vue files, and no example markup changed. These say so: the End Text & ARIA section of `packages/opui/components/AGENTS.md`, the HTML text of the Text field Hidden label section, the `id` rows of both APIs, the CHANGELOG entry on the `div` root and both What's new notes.
- [x] (3) Rating: in forced colors an invalid rating keeps the theme's translucent red stars. The invalid rule (`:has([aria-invalid="true"], :user-invalid)`) outranks the `GrayText` in the forced-colors block, and `input::before` has `forced-color-adjust: none`. So the empty stars are 60% red on a black High Contrast canvas, about 1.9:1, with no other cue (`packages/opui/css/components/rating.css:176-178`, `packages/opui/css/components/rating.css:180-189`, `packages/opui/components/AGENTS.md:544`, `src/component-examples/rating/Validation.html:1-47`)
  - Summary: With a dark High Contrast theme, the empty stars of an invalid rating almost disappear.
  - Recommended: Fix. It keeps forced colors on system colors, and a dashed cue matches the invalid radios and text fields.
  - Fix: confirmed with a screenshot in Chromium with forced colors emulated in dark mode on `/html/components/rating/` (Validation): the empty stars compute to `oklch(0.53 0.2 25 / 0.6)`. Set the invalid color only outside forced colors, give the invalid case a dashed border there, and add it to the Rating line of the Forced colors list. Use a border, not an outline: this selector would beat the focus ring's outline.
    ```css
    &:has([aria-invalid="true"], :user-invalid) {
      @media (forced-colors: none) {
        --_empty-bg-color: oklch(from var(--ui-invalid) l c h / 60%);
      }

      @media (forced-colors: active) {
        input:not([value="0"]) {
          border: var(--ui-border-width) dashed CanvasText;
        }
      }
    }
    ```
  - Fixed: The invalid empty-star color only applies under `@media (forced-colors: none)`, so forced colors keep `GrayText` empty stars, and the stars of an invalid input get a dashed `CanvasText` border there (`packages/opui/css/components/rating.css`). Checked in Chromium with forced colors emulated: the empty stars compute to GrayText in light and dark mode, the dashed boxes show, and without forced colors the empty stars keep the 60% red. The Rating line of the Forced colors list names the cue. Rating is new in 6.0, so there is no CHANGELOG entry.
- [x] (3) Rating: filled and empty stars differ by color alone, and more contrast pulls them together. The empty stars read `--ui-border-color`, which more contrast moves toward the fixed `--ui-warning` fill. Filled against empty drops from 1.95:1 to 1.66:1 in light mode and from 3.58:1 to 1.03:1 in dark mode (`packages/opui/css/components/rating.css:4`, `packages/opui/css/components/rating.css:8`, `packages/opui/css/components/rating.css:40-48`, `packages/opui/css/components/rating.css:124-128`)
  - Summary: With more contrast in dark mode, filled and empty stars are equally light, so the rating reads only by hue.
  - Recommended: Fix with option A. A shape difference holds in every theme, contrast setting and type of color vision.
  - Fix: measured in Chromium on `/html/components/rating/` (Input) with `prefers-contrast: more`, and seen in a screenshot. The input also shows its count as text; the meter shows nothing else.
  - Options:
    - A (recommended): draw empty stars hollow in every mode, with an outline mask (`--_star-empty-image`) on the radios' `input::before` and the meter's bar.
    - B: draw them hollow only in a `@container style(--ui-contrast: more)` block, which the guide allows for a shape change.
  - Explained: Measured again in Chromium: filled against empty is 1.95:1 (light) and 3.58:1 (dark) at default contrast, and 1.66:1 and 1.03:1 with more contrast. At default contrast the empty stars are also only 1.54:1 and 1.32:1 against the page. For the radios, option A is a `--_fill-image` next to `--_fill-bg-color`: `var(--_star-empty-image)` on every input, `var(--_star-image)` wherever the fill is `--_accent` (checked and hover preview), and `mask-image: var(--_fill-image)` on `input:not([value="0"])::before`. The meter's empty and filled parts share one mask, so it needs three layers: outline stars, a box `calc(attr(value type(<number>), 0) / attr(max type(<number>), var(--_max)) * 100%)` wide, and solid stars, with `mask-composite: add, intersect, add`, written after today's `mask` so engines without typed `attr()` keep solid stars. Drawn in today's empty color the outlines are faint at default contrast; `--ui-field-border-color`, the role for an edge that shows an extent, would bring them to 3:1. Example: rating-empty-stars
  - Fixed: with option A in 9a4300a2. Empty stars are outlines (`--_star-empty-image`) on the radios and on the meter, where the mask cuts the solid stars at `attr(value)`, so filled and empty differ by shape in every theme, contrast setting and forced colors, also invalid and right-to-left. Without typed `attr()` the meter keeps solid empty stars. The Rating Added entry, What's new note, docs and `custom-properties/rating.ts` name `--_star-empty-image` and `--_fill-image`.
- [x] (3) Toggle: the Disabled example has a toggle button with `aria-disabled="true"` that still turns on with a click or Space (confirmed in Chromium). The section says to block the change in a script, but no format has one. The done Radio item removed the same control from the Radio and Switch examples (`src/component-examples/toggle/Disabled.html:5-8`, `src/component-examples/toggle/Disabled.astro:6-8`, `src/docs/components/toggle.astro:179-185`, `src/docs/components/toggle.astro:179-186`, `packages/opui/css/components/toggle-button.css:75-87`)
  - Summary: The Aria-disabled toggle is announced as unavailable but still toggles when pressed.
  - Recommended: Fix with option A. It matches the decision for Radio and Switch, and the sentence keeps the note.
  - Options:
    - A (recommended): remove the `aria-disabled` toggle button from Disabled in all five formats and keep the sentence.
    - B: keep it and block the change in every format with `preventDefault()` on the input's `click` (`onClick` in React, `onclick` in Svelte, `@click.prevent` in Vue).
  - Fixed: Option A. The `aria-disabled` toggle button is gone from Disabled in all five formats, and the section keeps its sentence. The snapshot change is intended.
- [x] (3) Range: the HTML Tick marks and Spread examples put `aria-valuetext="50%"` and `aria-valuetext="Center"` on sliders with labeled ticks, but they don't import `opui-css/css/js/range.js`, the script that keeps that value in sync. Copied markup therefore announces the first label at every position, and the Quality slider never gets its words. The generator and the hook test only add the import for an `output.ui-value[data-live]`, and the Tick marks section no longer tells HTML readers about the import or `aria-valuetext` (`src/component-examples/range/TickMarksLabels.html:1-30`, `src/component-examples/range/Spread.html:46-59`, `scripts/build-examples.mjs:1675-1683`, `tests/unit/example-scripts.test.ts:50-58`, `packages/opui/css/js/range.js:41-47`, `src/docs/components/range.astro:133-144`)
  - Summary: Copied tick-mark sliders keep announcing "50%" or "Center" wherever the thumb is, and Quality reads 0, 1 and 2.
  - Recommended: Fix. The script already handles labeled ticks, so only the import rule and one sentence are missing.
  - Fix: in `HTML_SCRIPT_RULES`, also import `range.js` for a `.ui-range` whose `datalist` has an `option` with a `label`. `htmlElements` needs the class or the parent to tell it apart from an autosuggest `datalist`. Add the same hook to `HOOKS` in `tests/unit/example-scripts.test.ts`, with a sample it flags, and run `pnpm build-examples`. Give the HTML Tick marks text the import: "Link a `<datalist>` with `list`, and import `opui-css/css/js/range.js` so labeled ticks are read as `aria-valuetext`."
  - This came back after the done Range Quality item: commit 34504492 removed the Tick marks sentence that item's fix added. The docs preview hides the bug because the Value example on the same page loads `range.js`.
  - Fixed: `HTML_SCRIPT_RULES` in `scripts/build-examples.mjs` also imports `range.js` for a `datalist` `option` with a `label` inside a `.ui-range` (`htmlElements` now keeps each element's classes and parent), with cases in `tests/unit/build-examples.test.ts`, and `tests/unit/example-scripts.test.ts` has the same hook with a sample it flags next to an autosuggest datalist it doesn't. `pnpm build-examples` added the import to the HTML Tick marks and Spread examples, and the HTML Tick marks text reads: "Link a `<datalist>` with `list`, and import `opui-css/css/js/range.js` so labeled ticks are read as `aria-valuetext`."
- [x] (1) Docs site: every block page has two unnamed `main` landmarks, the page's own and the one inside the preview iframe, so axe reports `landmark-unique` on all 36 block pages (`src/pages/blocks/[block]/preview.astro:91`, `src/layouts/Document.astro:93`)
  - Summary: A screen reader's landmark list on a block page shows two identical "main" entries, one of them inside the preview.
  - Recommended: Fix. One label on the preview's main tells the two apart and keeps the preview page valid on its own.
  - Fix: confirmed with axe on `/blocks/hero/` (only violation: `landmark-unique` on `#main-content`). Name the preview's landmark after the block: `aria-label={`${block.name} preview`}` on the preview's `main`.
  - Fixed: `preview.astro` names the preview's `main` after the block (`aria-label="Account settings preview"`), and gives the `main` of the full-page app shell, chat and inbox blocks the same label in the preview (c1bfa0af). axe reports no `landmark-unique` on `/blocks/hero/`, `/blocks/inbox/` and `/blocks/account-settings/` at 1280 and 390px, and `a11y.spec.ts` checks account settings and inbox. `/blocks/app-shell/` still reports `landmark-unique` for its banner: the block's own `header` and the site header are both unnamed.
- [x] (1) Docs: the "At a glance" section of Why Open Props UI? goes from the `h1` straight to four `h3` card titles with no `h2`, so axe reports `heading-order` on all five framework versions of the page (`src/docs/guide/why-opui.astro:32-39`)
  - Summary: The four pillar cards at the top of the Why page skip a heading level, so a screen reader's heading list jumps from the title to level 3.
  - Recommended: Fix with option A. A hidden `h2` keeps the cards' look and gives the section the heading its `id` already implies.
  - Options:
    - A (recommended): add `<h2 class="ui-sr-only">At a glance</h2>` as the first child of `<section id="at-a-glance">`.
    - B: make the four card titles `h2`, which also lists them in the table of contents.
  - Fixed: option A. The section starts with `<h2 class="ui-sr-only">At a glance</h2>`, which also lists it in the table of contents and the search index (abfcbfe3). axe reports no `heading-order` on `/html/guide/why-opui/`, and `a11y.spec.ts` checks it.
- [x] (2) Typography: the Default example's one-line code block ("The whole menu on one line, too long for the column, scrolls") scrolls sideways on the docs page but can't take focus, so axe reports `scrollable-region-focusable` on all five Typography pages (`src/component-examples/typography/Default.html:333`)
  - Summary: In Safari, a keyboard user can't scroll the long one-line code sample in the Typography example to read its end.
  - Recommended: Fix. The Dialog Long content scroller got the same attributes for the same reason.
  - Fix: on `/html/components/typography/` the `pre` is 1127px wide in a 766px box with no `tabindex`. The a11y fixture page is wide enough that the line fits, so `a11y.spec.ts` doesn't see it. Give the `pre` the attributes the Dialog Long content example uses (`aria-label="Menu" role="region" tabindex="0"`), and say in the Typography prose that a code block that scrolls needs them.
  - Fixed: the `pre` has `aria-label="Menu" role="region" tabindex="0"`, the typography/Default markup snapshot is re-recorded, and the Accessibility section says a code block that scrolls sideways needs `tabindex="0"`, `role="region"` and a unique `aria-label` (d3846dc9). At 1280px axe reports no `scrollable-region-focusable` on the HTML and React Typography pages, and `a11y.spec.ts` checks both. At 390px three more `pre`s of the Default example and the Code block example's `pre.ui-code-block` scroll and still get the report.
- [x] (2) Docs site: code blocks wider than their column scroll sideways but can't take focus: the `pre` in `Code.astro` has `overflow-x: auto` and no `tabindex`. axe reports `scrollable-region-focusable` on the Concepts, Customizing and Migrating guides in all five frameworks, two blog posts, 12 HTML component pages, and in the expanded example code of 109 component pages (`src/components/Code.astro:68`, `src/components/Code.astro:108-116`)
  - Summary: In Safari, keyboard users can't scroll a long line of code on the docs pages to read the rest of it.
  - Recommended: Fix with option A. It only adds a tab stop to the blocks that actually scroll, the way the Dialog Long content scroller does.
  - Fix: confirmed on `/html/guide/customizing/`: the `@layer openprops, theme, ...` block is 1066px wide in an 806px box with `tabIndex` -1. Chromium makes scroll containers focusable on its own, Safari doesn't. Pages: `/<fw>/guide/concepts/`, `/<fw>/guide/customizing/`, `/<fw>/guide/migrating/`, `/blog/callout-relative-colors/`, `/blog/spinner-aria-busy/`, and `/html/components/` card, carousel, list, menu, one-time-code, rating, select, stepper, text-field, textarea, toast, tooltip.
  - Options:
    - A (recommended): in `Code.astro`, watch each `pre` with a `ResizeObserver` and set `tabindex="0"`, `role="region"` and `aria-label` (the file title, or "Code") while `scrollWidth > clientWidth`, removing them when it fits.
    - B: render every `pre` with `tabindex="0"`, `role="region"` and an `aria-label`, which adds a tab stop to every code block, scrolling or not.
  - Fixed: option A, with `role="group"` instead of `region`: at 390px several blocks on a page scroll, and regions all named "Code" made axe report `landmark-unique`. `src/utils/code-blocks.ts` watches every `.code-block pre` with a `ResizeObserver` and sets `tabindex="0"`, `role="group"` and `aria-label` (the file title, or "Code") while it overflows, removing them when it fits; an opened example's code is observed on the `syntax-highlight` event, and a focused block draws its ring inside. `Code.astro` and `Example.astro` both load the module, since the first `Code` on an HTML component page now renders inside an example's `<template>`, where its script only runs once Show code opens it (fe3019ab). axe reports no `scrollable-region-focusable` on the code blocks of the Customizing, Migrating and Concepts guides, the two blog posts and the button, card and stepper pages at 1280 and 390px. `docs.spec.ts` checks that the attributes follow the overflow from 390 to 1280px and in an opened example.
- [x] (3) Docs site: a code group with a single tab hides its only label with `display: none` but keeps the radio, so Tab lands on an invisible radio that draws no focus ring, and axe reports `label` (hidden label). It hits the Installation code on all 41 HTML component pages, the code of every HTML example once Show code opens it (383 groups), and the HTML-only Typography Default example in the other four frameworks (`src/styles/base.css:145-147`, `src/components/InstallationFiles.astro:35-55`, `src/components/Example/Example.astro:225-253`)
  - Summary: On the HTML component pages, pressing Tab into the Installation code (or an opened example's code) moves focus to something invisible.
  - Recommended: Fix with option A. A single panel needs no tabs, and it removes the stray control instead of hiding it.
  - Fix: confirmed on `/html/components/button/`: from the Installation heading's anchor, Tab focuses `input#tab-1` (`:focus-visible` true, `clip-path: inset(50%)`, its label `display: none`), and nothing on the page shows focus. On `/react/components/button/` the same Tab shows the ring on the "Command" tab.
  - Options:
    - A (recommended): render `Tabs` only when there are two or more panels: in `InstallationFiles.astro` when `groups.length > 1`, and in `Example.astro` when `showOutput` is true, otherwise the panel's content alone, and drop the `:only-of-type` rule from `base.css`.
    - B: keep the markup and hide the radio with its label (`.code-tabs:has(> .ui-label:only-of-type) > .ui-input { display: none; }`).
  - Fixed: option A. `InstallationFiles.astro` renders `Tabs` only for two or more groups (the file picker moves to `CodeFiles.astro`), `Example.astro` only with an Output panel, and the `:only-of-type` rule is gone from `base.css`; the Markdown version keeps the code of a group without tabs (5d037bdd). On `/html/components/button/`, Tab from the Installation heading focuses the copy button at 1280px and the scrolling code block at 390px, both with a visible ring, and axe reports no `label`. `docs.spec.ts` and `a11y.spec.ts` check both.

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
  - Fixed: `css/compat/menu.css` sets `anchor-name: --ui-menu` on every menu with a submenu and `anchor-scope` only on the root, which keeps `--ui-menu-root` next to `--ui-menu`. In Chromium with the gate forced on, the second level of a three-level menu sat at the top-left (4, 0); now it opens next to its parent, and at the end edge both submenus flip and the third keeps the flipped direction. The blog post on menu anchoring and the Menu entry in the CHANGELOG say so.

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
- [x] (2) Checkbox: Select all counts a checkbox inside a disabled fieldset as enabled, because it filters on the `disabled` property, so it can never become checked. The docs now describe this (`packages/opui/elements/select-all.js:16`)
  - Summary: Select all gets stuck when some of its checkboxes sit in a disabled fieldset.
  - Recommended: Fix. Filtering on `:disabled` is a one-line change.
  - Fix: filter with `!input.matches(":disabled")` instead of `!input.disabled`, and revert the docs to "the other enabled checkboxes"
  > Fix
  - Fixed: `select-all.js` filters with `:disabled`, so a checkbox in a disabled fieldset is left out, and the Checkbox page and the SelectAll `api.ts` say "the other enabled checkboxes" again, as the CHANGELOG entry already did. A new test in `interaction.spec.ts` moves a checkbox into a disabled fieldset and checks that Select all ends up checked.
- [x] (3) ButtonGroup: with `.ui-overflow-shrink`, icon-only buttons in a button group or toggle group shrink to 26px and 23px wide and stop being square, because the groups set `min-inline-size: 0` on every item. The docs now say they get narrower (`packages/opui/css/components/button-group.css:147`, `packages/opui/css/components/toggle-group.css:57`)
  - Summary: Icon-only buttons turn into narrow slivers when a group shrinks.
  - Recommended: Fix with option A. A squeezed icon button is unusable, and the fix is local to the two group stylesheets.
  - Fix: give icon-only items `flex: none` and `min-inline-size: var(--_size)` in both groups (in the toggle group not through `:has(> svg:only-child)`, since the svg sits next to the input), then restore "Icon-only items keep their size" in the docs and api.ts
  > Explain further and provide an example
  - Explained: In a shrinking row the group gives every button `min-inline-size: 0` so labels can truncate. That rule comes later in the cascade than the icon-only button's own `min-inline-size: var(--_size)`, so an icon-only button has no minimum width left and gives its width to the labels while keeping its 40px height. How narrow it gets depends on the labels: in the example (a 14rem row, three icons and two labels) Chromium draws them 2px wide in the button group and about 30px in the toggle group. A scrolling row keeps them 40px squares. Example: icon-only-shrink
  - Options:
    - A (recommended): give icon-only items `flex: none` and `min-inline-size: var(--_size)` in both groups (in the toggle group not through `:has(> svg:only-child)`, since the svg sits next to the input), then restore "Icon-only items keep their size" in the docs and api.ts
    - B: keep the CSS and the current docs, which say icon-only items get narrower
  > Fix with option A
  - Fixed: option A. In a shrinking row, an icon-only button (`:has(> svg:only-child)`) in `button-group.css` and an icon-only toggle button (`:has(> svg):not(:has(> span))`, since the input sits next to the svg) in `toggle-group.css` get `flex: none` and `min-inline-size: var(--_size)`, so they stay square while the labels truncate. A toggle button with an svg and a bare text label counts as icon-only there and doesn't shrink; the docs wrap such labels in a `span`. The Button Group and Toggle pages, both `api.ts` files and the Unreleased `overflow` entry say "Icon-only items keep their size" again.
- [x] (3) Carousel: the Carousel and `.ui-overflow-scroll` on a toggle group scroll only through `overflow-inline`, which Chrome before 135 and Safari before 26 lack: there the carousel's items spill into the page and the toggle row doesn't scroll. The docs now say so; no compat fallback exists (`packages/opui/css/components/carousel.css:64`, `packages/opui/css/components/toggle-group.css:44`)
  - Summary: In older Chrome and Safari the Carousel overflows the page and scrolling toggle rows don't scroll.
  - Recommended: Fix. A compat file keeps the component CSS clean, as `AGENTS.md` requires.
  - Fix: add `packages/opui/css/compat/overflow-inline.css` with `@supports not (overflow-inline: auto)` setting `overflow-x` (and `overflow-y` for the vertical carousel), then drop the version notes from the Carousel and Toggle pages
  > Fix
  - Fixed: every component that scrolls through `overflow-inline` or `overflow-block` has a fallback in `css/compat/<component>.css` now, not only these two: in `@supports not (overflow-inline: auto)` (or `overflow-block`), ButtonGroup, Table, Tabs and ToggleGroup with `.ui-overflow-scroll`, the Carousel (`overflow-y` when vertical), the Dialog and Drawer content, the Menu and rich text code blocks and plain tables scroll through `overflow-x` or `overflow-y`. The Browser support guide lists each file, the Unreleased compat layer entry names them, and the version notes on the Carousel and Toggle pages are gone. web-features files these properties under `logical-properties`, which is Baseline widely available as a whole, so a pattern in `features.mjs` can now name a compat key and a name: `logical-properties` tracks `css.properties.overflow-inline` (Baseline 2025). The compat test, the Baseline builds, the browser support check and the support chips read that key's status through the new `featureOf()`, ten pages list `logical-properties`, and Stylelint lets compat files use `overflow-x` and `overflow-y`. The Accordion's `overflow-block: clip` keeps no fallback: its condition would match `overflow-clip` too.
- [x] (4) ButtonGroup: in right-to-left, filled and tonal groups lose the dividers between their buttons: each divider is a left-edge `box-shadow`, and in RTL the next button in DOM order paints over it. The Under the hood step now says so (`packages/opui/css/components/button-group.css:58`, `src/components/UnderTheHood/ButtonGroupBuild.astro:48`)
  - Summary: Filled and tonal button groups show no dividers in right-to-left pages.
  - Recommended: Fix with option A. Right-to-left pages are supported elsewhere, and the fix is a few lines in one file.
  - Fix: use an inline-start divider that follows the writing direction (for example `:dir(rtl)` flips the shadow's offset), and confirm outlined and text groups are unchanged
  > Explain further and provide an example
  - Explained: Each button in a group draws the line between it and its neighbour as a `box-shadow` on its own left edge (`button-group.css:58`). In left-to-right the neighbour on the left is the previous button, which paints before it, so the line shows on top. In right-to-left the neighbour on the left is the next button in the source, which paints after it, so its background covers the line. Filled and tonal buttons have a background and hide every divider; outlined and transparent groups have none and keep theirs. Checked in Chromium with the example. Example: button-group-rtl-dividers
  - Options:
    - A (recommended): draw the divider on the logical inline-start edge, so the shadow's offset flips under `:dir(rtl)`, and drop the right-to-left sentence from the Under the hood step
    - B: keep the CSS and leave the Under the hood sentence as the documented limitation
  > Fix with option A
  - Fixed: option A. Each button in `button-group.css` draws its divider at `--_divider-offset`, which `:dir(rtl)` flips to the right edge, so in right-to-left the line sits over the previous button, which paints first, as it does in left-to-right. `toggle-group.css` drew its dividers the same way and gets the same fix. The Dividers step of Under the hood shows the `:dir(rtl)` rule in place of the right-to-left sentence, and the Button Group and Toggle pages list `dir-pseudo` in their browser support. No CHANGELOG entry: 5.4.3 drew the dividers with `border-inline-start`, which already followed the direction.
- [x] (1) Package: six parts render an empty `class=""` when no class is passed, in Svelte (`class={[className]}`) and Vue (`:class="[$props.class]"`): DialogTitle, DrawerTitle, AccordionSummary, CalloutIcon, DescriptionListTerm and DescriptionListDescription (`packages/opui/components/Dialog/DialogTitle.svelte:20`, `packages/opui/components/Dialog/DialogTitle.vue:16`)
  - Summary: Some titles and parts carry an empty class attribute in the Svelte and Vue output.
  - Recommended: Fix with option A. One emitter change covers every element, and a server render test keeps it covered.
  - Fix: bind the class only when it's set, as the other parts do, in all twelve files, through `pnpm build-components` where the compiler writes them.
  > Fix
  - Still open: Not changed, since the fix belongs in the Vue emitter rather than in six files. Rendered on the server, Svelte omits an empty `class={[...]}`, so only Vue is affected: its server renderer prints `class=""` for any `:class` binding that resolves to nothing, `undefined` included. Nine elements bind a list that can be empty: the six parts, `DescriptionListItem`, `TimelineItem` and the `ListItem` control, and `scripts/component-vue.mjs` also adds `:class="$props.class"` to ten roots without a class list.
  - Options:
    - A (recommended): in `scripts/component-vue.mjs`, bind a class list without an unconditional string through `v-bind` and a `classAttrs()` helper in `cx.ts` that returns `{ class }` only when it isn't empty (merged into the element's own `v-bind` object where it has one), do the same for the roots' `:class="$props.class"`, rebuild, and add a Vue server render test of a part without a class.
    - B: accept `class=""` in Vue's server markup, which styles nothing and which the parity test already ignores.
  - Fixed: with option A, for Svelte too: Svelte also prints `class=""` when the element has a spread, as every part does. `classMayBeEmpty` in `scripts/component-shared.mjs` finds a class list without a class it always gives (a non-empty string, a template with text, a ternary of two), and both emitters spread `classAttrs()` from `cx.ts` for it, which returns `{ class }` only when it isn't empty; Vue merges it into the element's own `v-bind` object in place. 25 Vue and 15 Svelte files change. `component-contract.test.ts` now fails on an empty class in any framework, with a sample, `build-components.test.ts` has samples for the check, and section 3 of the components guide names both.
  > Fix with option A
  - Fixed: already done in dc739bcd with option A, for Svelte too, as the note above says: a class list that can come out empty compiles to a `classAttrs()` spread in Svelte and Vue, and `component-contract.test.ts` fails on an empty `class` in any framework.
- [x] (1) Chip: a pressed chip only checks `:disabled`, so an `aria-disabled="true"` pressed chip still darkens on hover and gets no disabled opacity, while the unpressed rules check both (`packages/opui/css/components/chip.css:210-220`, `packages/opui/css/components/chip.css:54`)
  - Summary: A pressed chip marked aria-disabled still reacts to hover and looks enabled.
  - Recommended: Fix. It matches the unpressed chip rule two blocks above.
  - Fix: use the same guard as line 54 in both places.
    ```css
    &:where(:not(:disabled, [aria-disabled="true"])) {
      /* hover */
    }
    &:is(:disabled, [aria-disabled="true"]) {
      opacity: var(--ui-disabled-opacity);
    }
    ```
  - Fixed: the pressed hover guard and the pressed opacity read `:disabled, [aria-disabled="true"]`.
- [x] (1) Copy: the copied popover sets `--_ease: var(--ui-ease-enter)` on the root and never switches, so it also closes with the enter curve, while Dialog and Menu start on `--ui-ease-exit` and switch to enter only in the open state (`packages/opui/css/components/copy.css:19`, `packages/opui/css/components/copy.css:73-81`, `packages/opui/css/components/dialog.css:5`, `packages/opui/css/components/dialog.css:147`, `packages/opui/css/components/menu.css:12`, `packages/opui/css/components/menu.css:76`)
  - Summary: The Copied label slides out with the curve meant for entering, unlike every other overlay.
  - Recommended: Fix. Two lines bring it in line with the Motion section of the components guide.
  - Fix: `--_ease: var(--ui-ease-exit)` on line 19 and `--_ease: var(--ui-ease-enter)` inside `&:popover-open`.
  - Fixed: the label starts on `--ui-ease-exit` and `:popover-open` sets `--ui-ease-enter`, like Dialog and Menu.
- [x] (1) Dialog: the open state sets `pointer-events: all`, an SVG-only value; the value for HTML boxes is `auto`, and no other stylesheet uses `all` (`packages/opui/css/components/dialog.css:150`)
  - Summary: Nothing visible today, since browsers accept the value, but it is the wrong keyword for an HTML element.
  - Recommended: Fix. One word.
  - Fix: `pointer-events: auto;`
  - Fixed: the open state sets `pointer-events: auto`.
- [x] (1) Form: the button-only field group drops its top margin after an `hr`, but `Divider` renders a `div.ui-divider` when it has text, which `.ui-form` already treats like `hr` three rules up (`packages/opui/css/components/form.css:105`, `packages/opui/css/components/form.css:7`, `packages/opui/components/Divider/Divider.astro:9-21`)
  - Summary: A labeled divider before a form's button row leaves an extra gap that a plain divider doesn't.
  - Recommended: Fix. It reuses the selector the file already has on line 7.
  - Fix: `&:not(:where(hr, .ui-divider) + &)`.
  - Fixed: the rule reads `&:not(:where(hr, .ui-divider) + &)`, so a labeled divider counts too.
- [x] (1) List: the four selected-item blocks are copies that differ in one value: an `option[aria-selected="true"]` gets `color: var(--ui-on-selected, var(--ui-primary-text))`, while `:checked`, `[role="option"][aria-selected="true"]` and `[aria-current="page"]` fall back to `currentColor`, and for an option that is both, `:checked` wins by order (`packages/opui/css/components/list.css:240-258`, `packages/opui/css/components/list.css:202-213`, `packages/opui/css/components/list.css:292-300`)
  - Summary: A selected listbox option turns primary-colored while a selected select option or current link keeps its text color.
  - Recommended: Fix. Merging the selectors removes the drift and about 20 lines.
  - Fix: pick one fallback and merge `&[aria-selected="true"], &:checked` into one block; `currentColor` is what three of the four use.
  - Fixed: the option's `[aria-selected="true"]` and `:checked` share one block with the `currentColor` fallback the other selected rules use.
- [x] (1) Menu: in right-to-left text the submenu rule mirrors the whole `.ui-end` of a submenu item with `scale: -1 1`, not just its chevron, so a `kbd` shortcut or any text placed there reads backwards; the docs put the icon in `.ui-end`, which is also where `shortcut` renders (`packages/opui/css/components/menu.css:116-118`, `src/docs/components/menu.astro:158-188`)
  - Summary: In right-to-left text, a shortcut or any text next to a submenu item's chevron is mirrored.
  - Recommended: Fix. One selector change, same result for the chevron.
  - Fix: mirror the icon instead of its container.
    ```css
    &:dir(rtl) li:has(> .ui-menu) > :is(a, button) > .ui-end > svg {
      scale: -1 1;
    }
    ```
  - Fixed: the rule mirrors `.ui-end > svg`, so a shortcut next to the chevron reads normally.
- [x] (1) Range: the `Props` of all three frameworks intersect `Base.Props.value` with the native `value` attribute (which includes `string[]`), because the type files omit only `size` and `type` (and `children`) from the element attributes, so the type admits a nonsense `(number & string[])` member and the props table hides it with a `type` override (`packages/opui/components/Range/types.astro.ts:4`, `packages/opui/components/Range/types.react.ts:6-8`, `packages/opui/components/Range/types.svelte.ts:7-9`, `src/component-api/range/api.ts:173-177`)
  - Summary: The Range `value` type admits a nonsense member in every framework, hidden from the table by an override.
  - Recommended: Fix. Omitting `keyof Base.Props` is what the other components do, and it removes the need for the type override.
  - Fix: omit `keyof Base.Props` from the element attributes in the three type files, then drop the `type: "number | string"` override on the `value` option in `api.ts`.
    ```ts
    export type Props = Base.Props &
      Omit<HTMLAttributes<"input">, keyof Base.Props>
    ```
  - Fixed: `types.astro.ts` omits `keyof Base.Props | "type"` from the input attributes, and the compiler (`scripts/component-types.mjs`) now keeps the `keyof` part of an `Omit` key union, which it dropped before, so the React and Svelte types omit `keyof Base.Props` too and `value` is `number | string` in every framework. The `type` override on `value` in `api.ts` is gone, a `toTypes` sample in `tests/unit/build-components.test.ts` covers the key union, and `tests/unit/component-types.test.ts` asserts the React and Svelte `value` type.
- [x] (1) Radio: a required radio group shows an asterisk on its legend and on every option, because `choice.css` marks the `.ui-label` of any choice whose input is `required`, and every radio of a required group carries `required` (`packages/opui/css/components/choice.css:59-70`, `src/component-examples/radio/FieldGroupRequired.html:1-34`)
  - Summary: A required set of radio buttons marks each option as required, next to the marked group legend.
  - Recommended: Fix with option A. The legend is where the group's requirement belongs, as the Checkbox and Switch labels stay marked one by one.
  - Options:
    - A (recommended): leave radios out of the label marker (`&:not(.ui-radio):has(:required)`), since `required` on a radio means the group, which the fieldset legend marks.
    - B: mark a radio's label only outside a fieldset or field group (`&.ui-radio:not(:is(fieldset, .ui-field-group) *)`), for a lone required radio.
  - Fixed: with option A: `choice.css` marks the label only `&:not(.ui-radio):has(:required)`, so a required radio group's asterisk is on its legend alone (checked in Chromium: the legend and a required checkbox keep theirs).
  > Fix with option A
  - Fixed: already done in dc739bcd with option A, as the note above says: `choice.css` marks the label only `&:not(.ui-radio):has(:required)`, so a required group's asterisk is on its legend alone.
- [x] (2) Blog: in WebKit, `/blog/under-the-hood/` often doesn't finish loading at 320px: the scroll test times out after 30 seconds at `page.goto` (no `load` event) or at `document.fonts.ready`, on both attempts in every completed WebKit run since Oct 29 (`tests/e2e/docs.spec.ts:427-430`, `src/docs/blog/under-the-hood.astro:1-101`)
  - Summary: The Under the hood blog post loads so slowly in WebKit that its narrow-screen layout test times out.
  - Recommended: Fix. The page needs a look in WebKit to find what keeps it loading, and a longer timeout would hide it.
  - Fix: open the page in WebKit at 320px with the trace or the Web Inspector timeline, find what keeps `load` or `fonts.ready` pending (a font that never settles, an embed, the live Under the hood demos), and fix that instead of raising the timeout.
  - Still open: re-checked in CI on 2026-11-04: in all seven WebKit engine jobs that got that far (four complete, three cancelled partway), the test timed out on both attempts, at `page.goto` (no `load` event) in all but one, which stopped at `document.fonts.ready`. The page's other 320px test, keeps its blocks within the content width, times out at `page.goto` too.
  > Fix
  - Fixed: at the cause, measured in WebKitGTK 2.52 (MiniBrowser over WebDriver), since the Playwright WebKit download is blocked here: the docs highlighter (microlighter) registers one live `Range` per code token in `CSS.highlights`, and WebKit marks every live highlight range as changed on any DOM change and recomputes their positions on the next rendering update, which walks the document for each range in hidden content. The page had 4,044 ranges in 11.3 MB of HTML with 61,868 elements, 52,173 of them inline browser logos in `FeatureSupport`. `src/utils/syntax-highlight.ts` now swaps each range for a `StaticRange` after highlighting (used by `Code.astro` and the theme builder export), and the browser logos are images from `public/browsers/` through `BrowserLogo.astro`. The page is 0.84 MB and 10,443 elements, and loads in 5.6 to 7.2 s instead of 23 to 33 s on the same machine; a new `docs.spec.ts` test checks the ranges are static, also after highlighting again. To confirm in the next `e2e-engines` run.
- [x] (1) Docs site: the Avatar Under the hood build loads its photo from images.unsplash.com, so the page's `load` event, which the e2e tests wait for, depends on an external host (`src/components/UnderTheHood/AvatarBuild.astro:125`)
  - Summary: The Avatar page waits on an outside image server before it counts as loaded, which can slow or stall its tests.
  - Recommended: Fix. A local copy keeps the page and its tests independent of an external host.
  - Fix: save the photo under `public/` (or `src/assets/`) and point the build at it, like the other docs images.
  > Fix
  - Fixed: The page itself can't drop the host: the Avatar page's Image and Shapes examples load their photos from Unsplash too, and this session couldn't download the build's photo (the environment's network policy blocks images.unsplash.com). So the tests stop depending on it instead: `stubExternalHosts` in `tests/e2e/fixtures.ts`, which `openFixture` already used, answers every image from another host with a local 1px PNG and aborts other requests, and `tests/e2e/docs.spec.ts` now calls it before each test, so no docs page test waits on Unsplash or any other host. The Avatar, List, Typography and Under the hood page tests pass in Chromium with it.
- [x] (2) Docs site: heavy pages time out in the engine e2e jobs outside Chromium: in Firefox both `/blog/release-6/` layout tests hit the 30 second test timeout on both attempts, and in WebKit "shuffle skips locked rooms", "undo and redo walk the history" and "saved themes load, compare and delete" time out on a reload, a toast that never shows ("Undone.", "Using Paper from the gallery.") or a click that never settles. The theme builder tests also timed out in WebKit runs before today, the release post's content width test has timed out in Firefox on and off today, and all of them pass in some runs (`tests/e2e/docs.spec.ts:427-469`, `tests/e2e/theme-builder.spec.ts:130-340`, `src/docs/blog/release-6.astro:1-628`)
  - Summary: The release post in Firefox and the theme builder in WebKit are so slow in CI that their tests time out.
  - Recommended: Fix with option A. The forced restyles are the measured cost left, and the fix stays inside the theme builder.
  - Fix: open each page in the failing engine with the trace or the profiler, find what keeps it busy (the release post's live demos, the theme builder's restyle on every change, its toaster), and make that cheaper instead of raising the timeouts. The WebKit `/blog/under-the-hood/` item is the same kind of problem.
  - Still open: re-checked in the engine jobs of 2026-11-04 (eight Firefox runs, four complete WebKit runs). Firefox: `/blog/release-6/` doesn't scroll sideways at 320px passed in all eight, its last failure being on 2026-11-03, while keeps its blocks within the content width still timed out on both attempts in three of eight. WebKit: shuffle skips locked rooms failed in one of four, undo and redo walk the history in two, saved themes load, compare and delete was flaky in two, and a mood applies a bundle of changes, which the headline doesn't list, failed on both attempts in one (and on 2026-11-03).
  > Fix
  - Still open: Partly fixed: the static highlight ranges remove the WebKit cost on every heavy page, the browser logos shrink `/blog/release-6/` from 0.77 MB and 7,297 elements to 0.43 MB and 5,740, and the theme builder export drawer now renders and highlights only while it's open, instead of on every theme change. Left: in WebKitGTK the theme builder still takes 3.3 to 5 s per action (0.9 s in Chromium), from three full-page restyles that each change forces by script, about 0.3 s each, one from the `ThemeQuickControls` color probe and two from `resolveColors` in `BuilderControls` (light and dark); transitions and view transitions made no difference. The Firefox release post failure didn't reproduce: both tests passed in the last four completed Firefox jobs.
  - Options:
    - A (recommended): resolve the probe colors in a separate document, as `src/utils/contrast.ts` does, or read every color after all writes, so a theme change forces one restyle instead of three, and rerun the WebKit job.
    - B: wait for the next `e2e-engines` run to show whether the remaining slowness still times out.
  > Fix with option A
  - Fixed: Every color probe on the theme builder now goes through one helper, `probeColors` in `src/utils/color-probe.ts`: a hidden host per class and root, created once and kept, whose probes only change their `color`, all written before any is read. The header's quick controls (`resolveOklch`), the brand fitting (`surfaceOf` in `src/utils/theme-brand.ts`), `resolveColors` in `BuilderControls` and the contrast check in `src/utils/contrast.ts` use it, where each inserted and removed hosts before. Inserting or removing a host restyled the whole page again in WebKit, about 250 to 300 ms each time, while the first read after a change only pays the restyle the next frame would do anyway. Measured in WebKitGTK on a production build, seven mood changes per run: the slow style reads per change went from 3 to 1, the time in them from 920 to 960 ms to 390 to 455 ms, and a mood change from about 4.0 s to 3.3 s; the rest is the page's own style, layout and paint. All 16 theme builder tests pass in Chromium. The engine jobs on this push show whether the WebKit tests still time out.
- [x] (2) Button: the disabled look keys on the `[disabled]` attribute while the hover and active rules key on `:disabled`, so a button inside a `fieldset[disabled]` loses its hover and press but keeps the pointer cursor, the normal text color and full opacity (`packages/opui/css/components/button.css:177`, `packages/opui/css/components/button.css:384-406`, `packages/opui/css/components/button-group.css:79`)
  - Summary: A button in a disabled fieldset looks enabled but doesn't react to hover or press.
  - Recommended: Fix. One selector change per file, and it matches the `:disabled` the hover rule already uses.
  - Fix: use the pseudo-class, which also matches controls in a disabled fieldset, in both places.
    ```css
    /* button.css:375 */
    &:is(:disabled, [aria-disabled="true"]) {

    /* button-group.css:78 */
    &:is(:disabled, [aria-disabled="true"]) {
    ```
  - Fixed: `button.css` and `button-group.css` match `:is(:disabled, [aria-disabled="true"])`, and Stylelint's `opui/disabled-pseudo` now rejects the `[disabled]` attribute selector in every package stylesheet.
- [x] (2) Chip: a disabled `button.ui-chip` only swaps its text to `--ui-text-disabled` and keeps its full tonal fill and border, while a tonal `Button` and a non-interactive `.ui-chip.ui-disabled` fade with `--ui-disabled-opacity`; the guide gives every disabled control the opacity and reserves `--ui-text-disabled` for controls without a fill (`packages/opui/css/components/chip.css:181-185`, `packages/opui/css/components/chip.css:187-191`, `packages/opui/css/components/button.css:384-401`, `packages/opui/components/AGENTS.md:478`)
  - Summary: A disabled chip button looks almost enabled next to a disabled tonal button or a disabled plain chip.
  - Recommended: Fix. It follows the Button split between filled and unfilled variants.
  - Fix: fade the filled variants and keep the text swap for the outlined one.
    ```css
    &:is([disabled], [aria-disabled="true"]) {
      cursor: not-allowed;

      &:not(.ui-outlined) {
        opacity: var(--ui-disabled-opacity);
      }

      &.ui-outlined {
        --_text-color: var(--ui-text-disabled);
      }
    }
    ```
  - Fixed: disabled chips fade with `--ui-disabled-opacity` and an outlined one swaps its text to `--ui-text-disabled`, the Button split.
- [x] (2) Radio: when both `checked` and a group binding are passed, Svelte lets the explicit `checked` win (`checked ?? group === (value ?? true)`) while Vue lets the model win, so the same inputs render opposite radios checked (`packages/opui/components/Radio/RadioInput.svelte:25`, `packages/opui/components/Radio/RadioInput.vue:25-34`)
  - Summary: With the binding set to `a` and `checked` on `b`, Svelte renders `b` checked and Vue renders `a` checked.
  - Recommended: Fix. The guide says the group that owns the value wins, which is what Vue does.
  - Fix: confirmed by SSR render: Svelte `<input type="radio" name="x" value="a"/>,<input type="radio" checked="" name="x" value="b"/>`, Vue `<input type="radio" checked name="x" value="a">,<input type="radio" name="x" value="b">`. Let `group` win when it is bound, and fall back to `checked` otherwise.
    ```svelte
    checked={(group === undefined ? checked : group === (value ?? true)) ||
      undefined}
    ```
  - Fixed: the radio model kind in `scripts/component-models.mjs` gives the Svelte port a `hasGroup` flag, set when the parent passes `group`, and an `isChecked()` the `checked` attribute and its starting state both read: with a group the group wins, as in Vue, and without one `checked` wins, so radios driven by `checked` keep working after the radio writes its own `group` on a click (the FieldGroupControlled interaction test). `tests/unit/radio-checked.test.ts` renders RadioInput in Svelte and Vue with a bound group and `checked` on another value, with the group on its own value, and with only `checked`; the contract test compares against Astro, which has no binding.
- [x] (2) Range: the pressed and disabled track colors are derived from `--ui-field-border-color` instead of `--_track-base-bg-color`, so a `.ui-filled` or `.ui-tonal` track, or one a theme colors with `--ui-track-bg-color`, jumps to a darkened field-border gray while the thumb is held and when the input is disabled (`packages/opui/css/components/range.css:388-394`, `packages/opui/css/components/range.css:397-403`, `packages/opui/css/components/range.css:118-124`)
  - Summary: Pressing or disabling a filled, tonal or themed slider changes its track to a different gray.
  - Recommended: Fix. The active and disabled states only need to read the base track color the variants already set.
  - Fix: confirm first on `/html/components/range/` with a `.ui-filled` slider held down. Then derive both states from the base color.
    ```css
    &:active {
      --_thumb-highlight-size: var(--ui-space-2);
      --_track-bg-color: light-dark(
        oklch(from var(--_track-base-bg-color) calc(l * 0.9) c h),
        oklch(from var(--_track-base-bg-color) calc(l * 1.1) c h)
      );
    }

    &:disabled {
      --_track-bg-color: var(--_track-base-bg-color);
    }
    ```
  - Fixed: `:active` derives the pressed track from `--_track-base-bg-color`, and `:disabled` keeps it.
- [x] (2) TextField: an autofilled input in a `.ui-filled` field paints a `--ui-surface` box inside the tonal field: `normalize.css` covers the browser's autofill color with an inset shadow in `--ui-field-bg-color` falling back to `--ui-surface`, while the filled variant's background is `--_bg-color: var(--ui-surface-tonal)` on `.ui-field` and the input itself is transparent (`packages/opui/core/normalize.css:91-103`, `packages/opui/css/components/text-field.css:17`, `packages/opui/css/components/text-field.css:406-407`)
  - Summary: After the browser autofills a filled text field, the input shows a page-colored rectangle inside the gray field.
  - Recommended: Fix. One rule in `text-field.css` reads the field's own background, and `components.extended` beats `normalize` without a specificity change.
  - Fix: confirm on `/html/components/text-field/` (Filled) by autofilling an address or email in Chromium, then cover the autofill color with the field's private background.
    ```css
    :where(.ui-field) :where(input, textarea, select):autofill {
      box-shadow: 0 0 0 1e5px var(--_bg-color) inset;
    }
    ```
  - Fixed: `text-field.css` covers `:autofill` with an inset shadow in the field's own `--_bg-color`.
- [x] (2) Docs site: in WebKit, the search test that opens `/html/components/dialog/` and searches "dialog close" sees the result, then finds the result list empty when it clicks it, on both attempts in the runs on c2b2f67 and 06ff156; it passed in WebKit on c37864b, passes in Chromium and Firefox, and the same search from another page passes in WebKit (`tests/e2e/docs.spec.ts:186-198`, `src/components/Search.astro:432-500`)
  - Summary: In WebKit, a search opened on the Dialog page loses its results before they can be clicked.
  - Recommended: Fix. The test fails every WebKit run since c2b2f67, so something in that range broke it.
  - Fix: reproduce it with `pnpm exec playwright test tests/e2e/docs.spec.ts --project=webkit -g "jumps to a section"` where WebKit is installed (the trace of a failing CI run shows the same), and find what calls `updateResults()` again or closes the search dialog after the results show. The commits between c37864b and c2b2f67 that touch the docs are the search index rewrite (fd570f3), the replaceable icons (f6b0ddf) and the translatable labels (e26fbd0).
  > Fix
  - Fixed: by the same change as the Under the hood item: the Dialog page has 741 live highlight ranges (525 hidden), and with the search modal open WebKit spent 5 to 7 s per frame recomputing them after each keystroke, so the results never settled and the click hung; a plain modal `dialog` was as slow, so the search index rewrite wasn't the cause. With static ranges, measured in WebKitGTK 2.52: opening the search takes 0.5 to 0.6 s instead of 8.9 s, and a frame with the modal open 0.5 to 0.7 s. To confirm in the next `e2e-engines` run.
- [x] (3) Tooltip: in Firefox, a tooltip that a position-try fallback moves (flipped below its trigger at the top edge, shifted in a drawer header or over a sticky table header) never finishes fading in: five stress overlay scenarios still sit between 0.28 and 0.91 opacity after 5 seconds while `getAnimations()` reports nothing, so their axe tests fail on the opacity wait. A plain popover that `flip-block` places fades in fine there (`packages/opui/css/components/tooltip.css:29-37`, `packages/opui/css/compat/tooltip.css:2-25`, `tests/e2e/stress-overlays-a11y.spec.ts:31-35`)
  - Summary: In Firefox, tooltips near an edge stay half transparent or keep fading, so they look faint and fail the contrast check.
  - Recommended: Fix. Only a run in Firefox shows which part restarts the fade, and the repo rules need a plain-HTML repro before the tests can expect the failure.
  - Fix: in Firefox, strip the tooltip one piece at a time until the fade settles: the `.ui-tooltip` anchor with `anchor-scope`, `position-visibility: anchors-visible`, the two `@position-try` shifts, and the compat hover rule with its own `@starting-style` (Firefox has no interest invokers, so it applies while the trigger is hovered). If it's Firefox's, add the reason to `tests/e2e/engine-bugs.ts` with a repro in `engines.spec.ts`, mark the five scenarios, and file the bug; if it's the compat rule, fix it there.
  - Note: opacity after the 5 second wait in run 41656846548 (first try, retry): `edge-top-start-tooltip` 0.499, 0.349; `table-sticky-tip-4` 0.327, 0.399; `toolbar-drawer-tip-edit` 0.854, 0.905; `toolbar-drawer-tip-share` 0.636, 0.477; `toolbar-drawer-tip-close` 0.281, 0.476. Chromium and WebKit settle all five at 1. A repro with only a `flip-block` popover and a `@starting-style` opacity fade reached 1 in Firefox (cd0fa6e, reverted).
  - Explained: still failing in all eight Firefox engine jobs of 2026-11-04: the top start, sticky header and drawer close tooltips time out on the opacity wait in every run (readings such as 0.21 and 0.26), the other two drawer tips now and then pass (tip-edit in three runs, tip-share in one), and none of the five carries an expected failure. A lead to try first: the stress page's tooltip triggers still have `commandfor` and `command="toggle-popover"`, which the Tooltip examples dropped, so in Firefox a scenario's click opens the tooltip as a popover while the compat rule, which matches the hovered trigger, sets `position-anchor: --anchor` and runs its own `@starting-style` fade on top. The example sets up a top edge tooltip and three in a drawer header the same way, with a live opacity readout and switches that turn off one piece at a time: the command pair, `position-visibility`, the shift fallbacks, every fallback, `anchor-scope` and the fade itself. In Chromium all four settle at 1. Example: firefox-tooltip-fade
  > Remove issue
  - Removed: as answered. The firefox-tooltip-fade example stays registered for the item's history on the done page.
- [x] (3) Checkbox: a checkbox inside a `fieldset[disabled]` doesn't look disabled: the label's disabled rule is `:has([disabled], ...)`, which needs the attribute on a descendant, and `checkbox.css` has no `:disabled` rule outside forced colors, so the label keeps full opacity and the pointer cursor and the box its normal border, while the ripple is already off through `:disabled` (`packages/opui/css/components/choice.css:48-57`, `packages/opui/css/components/choice.css:108`, `packages/opui/css/components/checkbox.css:4-55`, `src/component-examples/checkbox/FieldGroupDisabled.html:2`, `src/component-examples/form/FieldsetDisabled.html:1`)
  - Summary: Checkboxes in a disabled fieldset look enabled even though they can't be toggled.
  - Recommended: Fix. The pseudo-class matches an input in a disabled fieldset, and the forced-colors block already uses it.
  - Fix: confirm first on `/html/components/form/` (Disabled). `switch.css:172` and `radio.css` share the pattern.
    ```css
    /* choice.css:48 */
    &:has(:disabled, input[aria-disabled="true"]) {
    ```
  - Fixed: `choice.css` and `switch.css` match `:has(:disabled, ...)`. A disabled `.ui-fieldset` used to dim itself as a whole, which hid this in the examples and dimmed text fields twice; it now dims only its legend, description and end text, and every control dims itself once (checked in Chromium: 0.64 everywhere).
- [x] (3) Select: `value` with child `<option>`s selects the matching option in React and Svelte (the native select marks descendant options on the server) but not in Astro, whose `isSelected` only runs over `items`, nor in Vue's server markup, which only marks `items` options; the API documents `value` as the selected value with no `items` restriction (`packages/opui/components/Select/Select.astro:51-56`, `packages/opui/components/Select/Select.astro:101-106`, `packages/opui/components/Select/Select.vue:58-61`, `packages/opui/components/Select/Select.vue:128-136`, `packages/opui/components/Select/Select.svelte:90`, `packages/opui/components/Select/Select.react.tsx:84-93`, `src/component-api/select/api.ts:38-42`)
  - Summary: An Astro or Vue Select with `value="b"` and `<option value="b">` children shows the first option, React and Svelte show B.
  - Recommended: Fix with option A. It documents what the markup does today in every framework.
  - Fix: confirmed by rendering `<Select label="Role" value="b"><option value="a">A</option><option value="b">B</option></Select>`: Astro and Vue render no `selected`, React and Svelte `<option value="b" selected="">`. In Vue the client `v-model` corrects it after hydration, so the server HTML and `<selectedcontent>` show A until then; in Astro nothing corrects it.
  - Options:
    - A (recommended): say in the `value` and `items` notes of `src/component-api/select/api.ts` that `value` picks an `items` entry, and that a child `<option>` takes `selected` itself (the HTML way), in Astro and Vue.
    - B: make Astro and Vue mark child options. Vue can walk `useSlots().default?.()` and set `selected` on `option` vnodes (recursing into `div[role="group"]`); Astro has no vnode access and would need to post-process `await Astro.slots.render("default")`, which is fragile.
  > Fix with option A
  - Fixed: with option A: the `value` model and the `items` prop in `src/component-api/select/api.ts` say `value` picks among `items`, and a child `<option>` takes `selected` itself, as in HTML, since Astro and Vue's server markup only mark the `items` options.
- [x] (3) Tokens: `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised` have the same formula as `--ui-border-color` and `--ui-field-border-color`: they mix `--ui-text-strong` into `--ui-surface`, not into `--ui-surface-elevated`, so in dark mode the border computes to L 0.348 on an elevated surface at L 0.35 and the lines every raised surface remaps to it have no contrast: Menu separators and its edge fallback, Drawer header and footer borders, dividers in elevated and tonal cards (`packages/opui/css/theme.css:558-569`, `packages/opui/css/theme.css:347-351`, `packages/opui/css/theme.css:531-535`, `packages/opui/css/components/menu.css:5-10`, `packages/opui/css/components/menu.css:24`, `packages/opui/css/components/drawer.css:23`, `packages/opui/css/components/card.css:57`, `packages/opui/css/components/card.css:66`)
  - Summary: In dark mode the separator lines inside menus, drawers and elevated cards disappear into their background.
  - Recommended: Fix. The role exists to differ from `--ui-border-color` on a raised surface, and today it doesn't.
  - Fix: confirm on `/tests/overlays/` in dark mode (a menu with a `.ui-border-top` item, a drawer header), then mix the two `-on-raised` roles toward the raised surface, which gives L 0.419 in dark and leaves light mode unchanged since both surfaces are gray-1 there.
    ```css
    --ui-border-color-on-raised: light-dark(
      color-mix(
        in oklch,
        var(--ui-text-strong) var(--ui-border-strength-light),
        var(--ui-surface-elevated)
      ),
      color-mix(
        in oklch,
        var(--ui-text-strong) var(--ui-border-strength-dark),
        var(--ui-surface-elevated)
      )
    );
    --ui-field-border-color-on-raised: color-mix(
      in oklch,
      var(--ui-text-strong) var(--ui-field-border-strength),
      var(--ui-surface-elevated)
    );
    ```
  - Fixed: both roles mix toward `--ui-surface-elevated`, like `--ui-field-border-color-on-filled` mixes toward `--ui-surface-filled`. Light mode is unchanged, since both surfaces are gray-1 there.
- [x] (5) Package: `vite dev` crashes on start in a fresh SvelteKit project with `opui-css@6.0.0-rc.1`: vite-plugin-svelte pre-bundles the package and compiles its eight TypeScript `context.svelte.ts` modules with `svelte.compileModule` before anything strips the types, which fails with `js_parse_error` on `import type`. `vite build` strips the types first and works, so the README's promise that SvelteKit needs no config only holds for builds (`packages/opui/components/Anchor/context.svelte.ts:2`, `packages/opui/components/Menu/context.svelte.ts:2`)
  - Summary: A new SvelteKit project crashes when it starts its dev server with the package installed.
  - Recommended: Fix with option A. The README promises SvelteKit works with no config.
  - Fix: the workaround the fresh project confirmed is `optimizeDeps: { exclude: ["opui-css"] }` in `vite.config`. Add a dev server start to the Svelte package fixture so it fails on this.
  - Options:
    - A (recommended): write the eight `context.svelte.ts` modules as `context.svelte.js` with JSDoc types, so the optimizer can compile them; the components import them as `./context.svelte` either way.
    - B: keep the TypeScript modules and add the `optimizeDeps.exclude` line to the README's Svelte section.
  > Fix with option A
  - Fixed: with option A: the nine context modules (Anchor, Callout, Dialog, Drawer, FieldGroup, Fieldset, Menu, Tabs and ToggleGroup) are `context.svelte.js`, plain JavaScript typed with a JSDoc `@import` of `Context`, so the dependency optimizer compiles them; the components still import `./context.svelte`. `check-components` reads the new name and accepts the JSDoc types, with samples in `check-scripts.test.ts`, `tsconfig.svelte.json` type-checks the JavaScript (`allowJs`, `checkJs`), and the components guide names the file and why. The Svelte package fixture now starts a Vite dev server and fetches every pre-bundled dependency of its entry: it fails with `js_parse_error` on a `context.svelte.ts` module and passes now.
- [x] (7) Package: a production build with Vite 8 (Vite, SvelteKit, Nuxt) or any Next 16 build lowers `light-dark()` for its default browser targets to `var(--lightningcss-light, A) var(--lightningcss-dark, B)`, and lightningcss only defines those two variables next to a literal `color-scheme`. The root sets `color-scheme: var(--ui-color-scheme)`, so without `.ui-light` or `.ui-dark` on `html` every `light-dark()` token is invalid: filled Buttons are transparent, outlined ones have no border, and Dialogs and the page have no background. Found with `opui-css@6.0.0-rc.1` in fresh projects; Astro 7 builds keep `light-dark()` and are fine, and the package fixtures only check that the build succeeds (`packages/opui/css/theme.css:16-18`, `tests/package/package.test.ts:395-409`)
  - Summary: With the default settings of Vite 8 and Next 16, a production build shows the components without any theme colors.
  - Recommended: Fix with option A. Default builds then render the theme with no config.
  - Fix: either way, make the Vite fixtures in `tests/package/package.test.ts` fail on the lost colors, for example by opening the built page and reading a filled Button's background. Workarounds the fresh projects confirmed: Vite (and SvelteKit, Nuxt under `vite`) `build: { cssTarget: ["chrome123", "edge123", "firefox120", "safari17.5"] }`; Next `experimental: { lightningCssFeatures: { exclude: ["light-dark"] } }`.
  - Options:
    - A (recommended): give `html` literal `color-scheme` values that lightningcss can rewrite: `light` by default and `dark` in the `prefers-color-scheme: dark` block, next to the `--ui-color-scheme` knob (the `.ui-light` and `.ui-dark` classes already do). Then check in the fixtures that a lowered build follows the OS scheme and the classes, and document that forcing a scheme in a lowered build takes the classes, not the knob.
    - B: keep the CSS and document the build settings above in the README and on the Getting started pages of each framework.
  - Fixed: option A. `theme.css` gives `:where(html)` `color-scheme: light` before `color-scheme: var(--ui-color-scheme)`, and the `prefers-color-scheme: dark` block `color-scheme: dark` before the same `var()`, so lightningcss defines `--lightningcss-light` and `--lightningcss-dark` on `html` and switches them in dark mode, while the knob still wins where `light-dark()` stays. Fresh Vite 8, SvelteKit, Nuxt 4 and Next 16 projects (build, and dev in Next) with the packed package now match a build that keeps `light-dark()` in OS light, OS dark and with `.ui-light` or `.ui-dark` on `html`. `tests/package/package.test.ts` fails a fixture build that lowers `light-dark()` without those variables on `html` and in the dark block (the React, Svelte and Vue fixtures fail on the old `theme.css`), with a sample it must flag. The README section "Builds that rewrite `light-dark()`" and the Theming scopes list say that the knob and the classes on a part of the page need `light-dark()`, with the Vite (`build.cssTarget`) and Next (`experimental.lightningCssFeatures`) settings that keep it, both checked in the fresh projects, and the CHANGELOG has a `Fixed` entry.
- [x] (1) TextField: in Vue, a server-rendered color field without a value logs "The specified value "" does not conform to the required format" in Chromium while Nuxt hydrates it: `v-model` writes an empty string to the input when its model is undefined, and Chromium only warns about an input it already laid out, so a client render stays quiet (`packages/opui/components/TextField/TextField.vue:138-151`, `tests/apps/apps.ts:111-120`)
  - Summary: A Nuxt page with a color TextField that has no value logs a console warning while it loads.
  - Recommended: Fix with option A. The field then keeps the browser's own default without touching the input.
  - Fix: the app tests list it as a known problem in `KNOWN_PROBLEMS` (`tests/apps/apps.ts`). Remove that entry with the fix: the Nuxt text-field test fails once the warning is gone and the entry stays.
  - Options:
    - A (recommended): have `scripts/build-components.mjs` bind the Vue input value only while the model or `value` is set, and listen for `input` otherwise, so an uncontrolled field never writes its value.
    - B: leave it. The color input sanitizes the empty string to `#000000` either way, and only the console notices.
  - Fixed: `vSeed` in `packages/opui/components/vue.ts`, which the compiler now puts before every Vue `v-model` on a native input (and the hand-written Select uses), lets the element's state win when the page hydrates: a value or choice the user changed before hydration is assigned to the model, and a model without a value takes the element's own (a color input's `#000000`), so `v-model` never writes an empty string into it. The Nuxt color warning is gone, `KNOWN_PROBLEMS` in `tests/apps/apps.ts` is empty, and the app tests' "keeps what changed before it hydrated" scenario checks every Vue form control.
- [x] (2) Docs site: the theme builder tests still time out in the WebKit engine job after the color probes stopped forcing extra restyles: on 36cf05ef (job 127341448648) "undo and redo walk the history" hit the 30 second timeout with the change count still at "5 changes" after Control+z, "saved themes load, compare and delete" timed out on the click on `[data-saved]` after "Using Paper from the gallery.", and "shuffle skips locked rooms" was flaky. Each theme change still takes about 3.3 s in WebKitGTK, nearly all of it the page's own style, layout and paint, and these tests make six to twelve changes (`tests/e2e/theme-builder.spec.ts:130-152`, `tests/e2e/theme-builder.spec.ts:278-343`, `src/components/ThemeBuilder/ThemeBuilder.astro:1-149`)
  - Summary: Every change in the theme builder takes about three seconds in WebKit, so its longer tests run out of time there.
  - Recommended: Fix with option A. Safari users wait on the same rendering, so a longer timeout would only hide it.
  - Fix: measure first which part of the frame after a mood change is style, layout or paint in WebKit, with the trace in the engine job or WebKitGTK locally.
  - Options:
    - A (recommended): cut the page's own rendering per change, for example `content-visibility: auto` on the rooms and preview panes out of view, or theme only the preview instead of the whole page, and rerun the WebKit job.
    - B: mark the theme builder spec slow in WebKit with `test.slow`, as `anatomy.spec.ts` does for its heavy pages.
  > Fix with option A
  - Fixed: Profiled in WebKitGTK on a production build. JavaScript wasn't the cost (no callback over 250 ms), and neither was paint (hiding the whole page with `visibility: hidden` kept the long block). It came from two `ResizeObserver`s that write a measured size as a custom property on `html`: the theme builder's header height (`--builder-header`) and the site header's end width (`--site-header-end-inline-size`). A mood change resizes the header, the observers fire in the next frame, and each write changes an inherited property on the root, so WebKit restyles the whole page a second time. Both are now registered with `@property` as non-inherited `<length>` properties and written only on the elements that read them: the three `[data-builder-header]` elements of the theme builder, and the `h2`s in `#main-content`, also once the document has loaded. The preview's specimen and states blocks also get `content-visibility: auto`, with inline padding and the bottom margin turned into padding, so focus rings and shadows at their edges aren't clipped and every block keeps its position. Measured over six mood changes per run, with the view transition the tests take: a change settles in 1.8 to 2.2 s instead of 3.3 to 3.5 s (1.5 s instead of 2.7 to 2.8 s without it). All 16 theme builder tests pass in Chromium. The WebKit engine job on this push shows whether the tests still time out; the Range item about its fill animation in WebKit is the other cost left on this page.
- [x] (1) SortableTable: in React, a sort before the page hydrates (with `opui-css/elements/sortable-table.js` loaded by the page) appends a status span to the element and moves the rows React rendered, so React fails to hydrate the table and renders it again without the sort (`packages/opui/elements/sortable-table.js:70-95`, `packages/opui/components/SortableTable/SortableTable.react.tsx:29-35`)
  - Summary: A React table sorted before the page finishes loading loses the sort and logs a hydration error.
  - Recommended: Fix with option A. It makes `onSort` see every sort, as the docs promise, and gives the live region the markup it needs to be announced.
  - Fix: reproduce first with the app tests' `/elements-first/table` route in Next.js: click a sortable header while the app's scripts are held, then release them, and keep it as an app scenario.
  - Options:
    - A (recommended): render the live region in every framework, `<span class="ui-sr-only" role="status" set:html="" />` after the slot in `SortableTable.astro` and the React port, so React leaves its text to the element. The element writes into it instead of appending one, which drops the 100 ms delay that only exists because a new live region isn't announced, and still appends one for HTML that leaves it out. The React port also renders `data-hydrating=""` and removes it in an effect after the one that attaches `onSort`, and the element ignores header clicks while it's there, so no sort moves rows React is about to hydrate or happens without `onSort`. Record the React parity drift as intended. Svelte and Vue load the element with the component's code, right before they hydrate it, so they need no gate.
    - B: only the live region. A click before hydration still moves the rows React then renders again unsorted, with a recoverable hydration error, and `onSort` misses that sort.
  > Fix with option A
  - Fixed: Option A. `SortableTable.astro` renders `<span class="ui-sr-only" role="status">` after the slot, which `pnpm build-components` carries to Svelte and Vue, and the React port renders it with an empty `dangerouslySetInnerHTML`, so React leaves the announcement text to the element. `elements/sortable-table.js` writes into a rendered live region without the 100 ms delay, and still appends one, with the delay, for HTML that leaves it out. The React port renders `data-hydrating=""` and removes it in an effect after the one that attaches `onSort`, and the element ignores header clicks while it's there, so no sort moves rows React is about to hydrate or happens without `onSort`. `tests/unit/component-contract.test.ts` gains `KNOWN_ATTRIBUTES` for that one React attribute, with a sample test, and the `table/Sortable` parity snapshot (the HTML example gains the live region) and its React drift (`data-hydrating`) are recorded as intended. `tests/apps/apps.spec.ts` gains the scenario: in Next.js, with the app's scripts held, the element defined and a header clicked, the rows stay put, and once hydrated a click sorts and announces. The CHANGELOG's SortableTable entry says so.
- [x] (1) Rating: the generated Vue types declare `export type Slots = DefaultSlots`, a default slot that `Rating.vue` never renders and that the React and Svelte types leave out (`Omit<..., "children">`). `scripts/component-types.mjs` writes it for every component whose `types.ts` has no `Slots` type (`packages/opui/components/Rating/types.vue-props.ts:6`, `scripts/component-types.mjs:728-732`, `packages/opui/components/Rating/types.react.ts:6-10`)
  - Summary: A Vue user who imports Rating's `Slots` type sees a default slot that the component ignores.
  - Recommended: Fix. The compiler already knows the Astro slots, so the Vue type can follow them.
  - Fix: emit `export type Slots = DefaultSlots` only when the Astro component has a default slot, as `defaultOnlySlotTypes` already does for sub-components, then run `pnpm build-components`. Toaster gets the same stray type (`packages/opui/components/Toaster/types.vue-props.ts:6`).
  - Fixed: `scripts/component-types.mjs` writes `export type Slots = DefaultSlots` only when the component renders a default slot, read from `slotsByComponent`, with a `toTypes` case in `tests/unit/build-components.test.ts`. `pnpm build-components` dropped the stray type from Rating and Toaster, the only two type files it changed. Both components are new in 6.0, so there is no CHANGELOG entry.
- [x] (1) Accordion: in an accordion group, the first and last items round every `summary` inside them, not only their own. The group rule outranks the summary's `:focus-visible` radius, so an accordion nested in the first or last item gets the group's corners on its summary and focus ring (`packages/opui/css/components/accordion.css:204-224`, `packages/opui/css/components/accordion.css:101-104`)
  - Summary: A focused accordion nested in the first item of a group gets a focus ring with square bottom corners.
  - Recommended: Fix. A child combinator, which the guide asks parts to use, keeps the rule on the group's own summaries.
  - Fix: use `& > summary` in both blocks. Checked in Chromium: the group's own summaries keep their radii (8px on top for the first item, 8px at the bottom for the last). A nested summary goes from `8px 8px 0 0` back to `0`, so its `:focus-visible` radius applies again.
    ```css
    &:first-of-type {
      border-start-end-radius: var(--_group-radius);
      border-start-start-radius: var(--_group-radius);

      & > summary {
        border-start-end-radius: var(--_group-radius);
        border-start-start-radius: var(--_group-radius);
      }
    }
    ```
  - Fixed: Both blocks in `accordion.css` use `& > summary`. Checked in Chromium: the group's own summaries keep `8px 8px 0 0` and `0 0 8px 8px`, and an outlined accordion nested in the first or last item has a `0` summary radius at rest and `8px` with `:focus-visible`. The CHANGELOG Fixed entry about group styles now names it.
- [x] (1) Carousel: the snap axis is physical, `scroll-snap-type: x mandatory` (and `y` in `.ui-vertical`), while the carousel scrolls with `overflow-inline` and pads with `scroll-padding-inline`. So in a vertical writing mode it scrolls along the inline axis and never snaps (`packages/opui/css/components/carousel.css:64-71`, `packages/opui/css/components/carousel.css:116-123`)
  - Summary: In a vertical writing mode, such as vertical Japanese text, a carousel scrolls freely instead of stopping on each slide.
  - Recommended: Fix. The logical keywords work in every engine and match the logical properties around them.
  - Fix: `scroll-snap-type: inline mandatory` on the root and `block mandatory` in `.ui-vertical`. Checked in Chromium in `writing-mode: vertical-rl`: after scrolling 40px, `x mandatory` stays at 40px and `inline mandatory` snaps back to 0.
  - Fixed: `scroll-snap-type: inline mandatory` on the root and `block mandatory` in `.ui-vertical`. Checked in Chromium with a horizontal and a `.ui-vertical` carousel, each in `horizontal-tb` and `vertical-rl`: all four snap after a 40px scroll, where `x mandatory` in `vertical-rl` stays at 40px. The Scroll snap step of the Under the hood build-up writes `inline mandatory` too.
- [x] (1) ControlGroup: in a group whose buttons are all disabled, the line between them is the divider color at a literal 40%. Where the later button's start border draws that line (a field with a label in the group, or a tonal or filled group under `--ui-control-border-color-filled`), the button's own `--ui-disabled-opacity` dims it again, to about 26%. A theme's `--ui-disabled-opacity` changes neither line (`packages/opui/css/components/control-group.css:6-10`, `packages/opui/css/components/control-group.css:23`, `packages/opui/css/components/control-group.css:263-265`, `packages/opui/css/components/control-group.css:306-316`)
  - Summary: A disabled group's dividers are fainter where buttons overlap than where the group draws a rule, and ignore the theme's disabled opacity.
  - Recommended: Fix. The rule then dims like the buttons, and the overlapping border is dimmed once, by the button.
  - Fix: measured with two disabled tonal buttons. The group draws a 1px rule at alpha 0.4. With `--ui-control-border-color-filled` set on the group, the second button's start border is at alpha 0.4 inside a button at opacity 0.64. Derive the disabled line from the role. Have the start border read `--_divider-border-color-enabled` wherever it reads `--_divider-border-color` today, since the button's opacity already dims it: line 23, the `else:` branch at line 155, and `css/compat/control-group.css:11,18`. Update `custom-properties/control-group.ts` to match.
    ```css
    --_divider-border-color-disabled: color-mix(
      in oklch,
      var(--_divider-border-color-enabled)
        calc(var(--ui-disabled-opacity) * 100%),
      transparent
    );
    ```
  - Fixed: `--_divider-disabled-border-color` is now `--_divider-enabled-border-color` at `calc(var(--ui-disabled-opacity) * 100%)`. The item's fix, the start border reading the enabled line everywhere, would undim it in a transparent group with a labelled field, since only tonal and filled buttons take the disabled opacity. So only tonal and filled groups read the enabled line for the start border: `&:is(.ui-filled, .ui-tonal)`, the `else:` branch and both compat blocks. Measured in Chromium: the rule is at alpha 0.64 and follows a theme's `--ui-disabled-opacity` (0.3 gives 0.3), a tonal group's start border is the full line inside the 0.64 button, and a transparent group's start border is at 0.64. `custom-properties/control-group.ts` and the ControlGroup lines entry under Changed are updated.
- [x] (1) DescriptionList: in a stacked list (no `.ui-horizontal`, container 45ch or narrower), the `.ui-total` value loses `--ui-text-strong`. The stacked rule's `dd { color: inherit }` has the same specificity as the total's `dd, dt` rule and comes later, so the amount takes the page text color while its label stays strong (`packages/opui/css/components/description-list.css:47-57`, `packages/opui/css/components/description-list.css:81-95`)
  - Summary: On a narrow screen, a total's amount is lighter than its label, while side by side both are the strong text color.
  - Recommended: Fix. Coloring the row instead of its cells survives the stacked rule without raising specificity.
  - Fix: measured at 300px: Total `dt` is `oklch(0.16 0.01 255)` and `dd` is `oklch(0.2666 0.01 255)`. At 900px both are 0.16. Set the color on the row and let the value inherit it:
    ```css
    &.ui-total {
      border-block-start: var(--ui-border-width) solid var(--ui-border-color);
      color: var(--ui-text-strong);
      font-size: var(--ui-font-size-large);
      font-weight: var(--ui-font-weight-bold);
      padding-block-start: var(--ui-space-3);

      dd {
        color: inherit;
      }
    }
    ```
  - Fixed: `.ui-total` in `description-list.css` sets `--ui-text-strong` on the row, and its `dd` inherits it. Checked in Chromium at 300px and 900px, with and without `.ui-horizontal`: label and value are both `oklch(0.16 0.01 255)`.
- [x] (1) Drawer: a top or bottom drawer is capped at `max-block-size: 80dvb`. `--_block-size` is the documented input for its height, and any value above 80% of the viewport is silently cut to 80%. The default `min(80vb, 650px)` writes the same cap a second time, in `vb` (`packages/opui/css/components/drawer.css:7`, `packages/opui/css/components/drawer.css:97-103`, `src/component-api/custom-properties/drawer.ts:18-21`)
  - Summary: Setting a bottom drawer's height to 95% of the screen gives 80% with no hint why.
  - Recommended: Fix with option A. The input then sets the height it names, and the default keeps today's height since `dvb` is never larger than `vb`.
  - Fix: measured with a 1000px viewport: `.ui-block-end` with `--_block-size: 95dvb` is 800px tall.
  - Options:
    - A (recommended): move the cap into the default, and delete `max-block-size: 80dvb` from the `.ui-block-start, .ui-block-end` rule.
      ```css
      --_block-size: min(80dvb, 650px);
      ```
    - B: keep the cap, and say in the `--_block-size` description that it stops at 80% of the viewport.
  - Fixed: Fixed with option A and one change: with the cap deleted, the browser's own `max-block-size` for a modal dialog (`calc(100% - 2em - 6px)`) cut the drawer instead, so the `.ui-block-start, .ui-block-end` rule now sets `max-block-size: 100%`, like the inline drawers. The default is `min(80dvb, 650px)`. Measured in Chromium at 1000px and 600px tall viewports: the default stays 650px and 480px, `--_block-size: 95dvb` gives 950px and 570px, and `100dvb` the full height. The `--_block-size` row names its default, and a Drawer Fixed entry is in the CHANGELOG.
- [x] (1) Message: the typing dots bounce from left to right in right-to-left text. The three `background` layers sit at the physical `0`, `50%` and `100%`, `ui-message-typing` lifts the first layer first, and there is no `:dir(rtl)` case (`packages/opui/css/components/message.css:225-242`, `packages/opui/css/components/message.css:264-282`)
  - Summary: In a right-to-left chat the typing indicator's wave runs against the reading direction.
  - Recommended: Fix. One `:dir(rtl)` rule swaps the dots, like the RTL cases Range and List already have.
  - Fix: flip the horizontal positions, which the keyframes don't animate, and add `dir-pseudo` to the Message page's `browserSupport`.
    ```css
    &.ui-typing > .ui-content:dir(rtl)::before {
      background-position-x: 100%, 50%, 0;
    }
    ```
  - Fixed: Added `&.ui-typing > .ui-content:dir(rtl)::before { background-position-x: 100%, 50%, 0; }` to `message.css`, and `dir-pseudo` to the Message page's `browserSupport`. Checked in Chromium: the dots swap in `dir="rtl"` and keep their animation.
- [x] (1) TextField: an autofilled value is painted in `--ui-text`, from the `-webkit-text-fill-color` that `normalize.css` sets on every `:autofill` input, while the field's own text is `--ui-text-strong`; the `:autofill` rule in `text-field.css` only covers the background (`packages/opui/core/normalize.css:102-114`, `packages/opui/css/components/text-field.css:73-93`)
  - Summary: Text the browser autofills into a text field looks fainter than text the user types.
  - Recommended: Fix. One declaration next to the existing autofill rule keeps the field's text color.
  - Fix: `-webkit-text-fill-color` wins over `color`, so set it to the field's color in the field's own rule.
    ```css
    &:autofill {
      -webkit-text-fill-color: var(--ui-text-strong);
      box-shadow: 0 0 0 1e5px var(--_bg-color) inset;
    }
    ```
  - Fixed: The field's own `:autofill` rule in `text-field.css` sets `-webkit-text-fill-color: currentColor` rather than `var(--ui-text-strong)`. The autofilled text then follows the input's own `color`: `--ui-text-strong`, or `CanvasText` for a OneTimeCode input in forced colors. Checked in Chromium with `:autofill` swapped for a class: the fill color is the field's color, and a color set on the input wins. The 6.0 Fixed entry about the autofill background now mentions the text color.
- [x] (1) Timeline: the plain dot and the `.ui-marker` fill with `--ui-surface`, so on a tonal card, and on an elevated card in dark mode, each uncolored marker shows a page-colored disc inside its ring. Stepper's upcoming markers are transparent, and the timeline line stops short of each marker, so the fill covers nothing (`packages/opui/css/components/timeline.css:42-55`, `packages/opui/css/components/timeline.css:78-87`, `packages/opui/css/components/stepper.css:31`)
  - Summary: On tonal cards, and on elevated cards in dark mode, the hollow timeline dots show a light or dark disc instead of the card.
  - Recommended: Fix. A transparent fill matches the Stepper and works on every surface.
  - Fix: confirmed in Chromium. In a tonal card in light mode the marker fill is L 0.98 on an L 0.93 card. In an elevated card in dark mode it is L 0.27 on L 0.35. Make the fill `transparent` in the rule both markers share (line 45); colored and current markers keep their own fill.
  - Fixed: The marker rule both markers share in `timeline.css` fills with `transparent`. Checked in Chromium on tonal and elevated cards in light and dark mode: plain dots and `.ui-marker` show the card, colored and current markers keep their fill.
- [x] (1) ToggleGroup: the group caps its radius at half of `--ui-button-size`, the default height, whatever its size class. With a round `--ui-button-radius` (the m3 theme), a `.ui-large` group has 20px corners on its 48px buttons while a large ToggleButton is a 24px pill, and x-small and small groups get a cap above half their height (`packages/opui/css/components/toggle-group.css:8-11`, `packages/opui/css/components/toggle-button.css:122-138`)
  - Summary: With pill-shaped buttons, a large toggle group has flatter ends than a large toggle button next to it.
  - Recommended: Fix. The group then follows its own size, as the `--_radius` description already promises.
  - Fix: confirmed in Chromium with `themes/m3.css` (group 20px, button 24px, both 48px tall). Give the group a `--_size` from its size classes, cap the radius with it, and document `--_size` in `custom-properties/toggle-group.ts`.
    ```css
    :where(.ui-toggle-group) {
      --_radius: min(
        var(--ui-button-radius, var(--ui-radius)),
        var(--_size) / 2
      );
      --_size: var(--ui-button-size);

      &.ui-x-small {
        --_size: var(--ui-button-size-x-small);
      }

      &.ui-small {
        --_size: var(--ui-button-size-small);
      }

      &.ui-large {
        --_size: var(--ui-button-size-large);
      }
    }
    ```
  - Fixed: `toggle-group.css` declares `--_size` from `--ui-button-size`, the size classes set it, and `--_radius` caps at half of it. Checked in Chromium with `themes/m3.css`: x-small, small, medium and large groups have 14, 16, 20 and 24px corners, the same as toggle buttons of each size. `--_size` is documented in `custom-properties/toggle-group.ts`, and the `ToggleButton` Changed entry about capped corners names the group.
- [x] (1) Tooltip: `--_ease` is `--ui-ease-enter` on the root and never switches, so the tooltip also fades out with the enter curve. Dialog, Drawer, Menu and Copy start on `--ui-ease-exit` and switch to enter only while open (`packages/opui/css/components/tooltip.css:6`, `packages/opui/css/components/tooltip.css:97-116`, `packages/opui/css/compat/tooltip.css:3-25`, `packages/opui/css/components/menu.css:12`, `packages/opui/css/components/menu.css:76-77`)
  - Summary: Tooltips fade out with the decelerating curve meant for opening, unlike dialogs, drawers and menus.
  - Recommended: Fix. It is the change Copy got, and the compat rules need the same line.
  - Fix: start on `--ui-ease-exit` and switch in the open state. Also add `--_ease: var(--ui-ease-enter);` to both rules of `css/compat/tooltip.css`, which show the tooltip without `:popover-open`. `--_ease-move` keeps reading `--_ease`, so it follows.
    ```css
    :where(.ui-tooltip) {
      --_ease: var(--ui-ease-exit);

      & > .ui-floating[popover]:popover-open {
        --_ease: var(--ui-ease-enter);
      }
    }
    ```
  - Fixed: Fixed: `tooltip.css` starts `--_ease` on `--ui-ease-exit` and sets `--ui-ease-enter` on `:popover-open`, and both rules of `css/compat/tooltip.css` set `--ui-ease-enter`, so `--_ease-move` follows. The `--_ease` row in `src/component-api/custom-properties/tooltip.ts` is an output with the Dialog wording, and the Tooltip Changed entry in the CHANGELOG and its What's new note say it closes with `--ui-ease-exit`. Checked in Chromium, also with the compat rules forced on.
- [x] (1) Tooling: the Vue compiler binds a component's `style` as `:style="$attrs.style"`. When no style is passed, Vue's server renderer prints that binding as `style=""`. So the server markup of the Vue NumberField, OneTimeCode, Progress, Radio, Range, Rating and Select has an empty `style` on the root (Rating has one on both the fieldset and the meter), which Astro, React and Svelte don't render. The parity normalizer drops an empty `style` or `class`, and the contract test only flags an empty `class` (`scripts/component-vue.mjs:171-172`, `packages/opui/components/NumberField/NumberField.vue:73`, `packages/opui/components/OneTimeCode/OneTimeCode.vue:49`, `packages/opui/components/Progress/Progress.vue:23`, `packages/opui/components/Radio/Radio.vue:44`, `packages/opui/components/Range/Range.vue:105`, `packages/opui/components/Rating/Rating.vue:62`, `packages/opui/components/Rating/Rating.vue:100-102`, `packages/opui/components/Select/Select.vue:80`, `tests/unit/normalize.ts:148-151`, `tests/unit/component-contract.test.ts:407`, `packages/opui/components/Switch/Switch.vue:44`, `packages/opui/components/TextField/TextField.vue:90`, `packages/opui/components/Textarea/Textarea.vue:60`, `packages/opui/components/ToggleButton/ToggleButton.vue:65`, `scripts/component-vue.mjs:170-172`)
  - Summary: The server markup of seven Vue components carries an empty `style` attribute that no other framework renders.
  - Recommended: Fix. It is the `class=""` case that the compiler and the contract test already handle for classes.
  - Fix: confirmed by rendering each component through `tests/unit/renderers.ts` with only `label` (Progress with no props). Vue prints `style=""` and the other frameworks print no `style`. A client render and hydration leave no attribute, so only the server HTML differs. Have `scripts/component-vue.mjs` bind the style through a spread that leaves out an empty one, the way `classAttrs()` does for the class. Then add `style=""` to the contract test's empty-attribute check, with a sample the check must flag. Checkbox, Switch, TextField, Textarea and ToggleButton use the same binding, so the compiler change fixes them too.
    ```ts
    export const styleAttrs = (style: unknown): { style?: unknown } =>
      style ? { style } : {}
    ```
  - Fixed: `scripts/component-vue.mjs` binds a style that can come out empty through `styleAttrs()`, new in `packages/opui/components/style.ts`, the way `classAttrs()` handles the class: alone as `v-bind="styleAttrs(...)"`, joined with a class list into one object, and next to an attrs object through Vue's `mergeProps()` in attribute order, so a caller's style still merges with the component's variables. `pnpm build-components` rewrote Anchor, Carousel, Checkbox, NumberField, OneTimeCode, Progress, Radio, Range, Rating (fieldset and meter), Switch, TableColumn, TextField, Textarea and ToggleButton, and the hand-written `Select.vue` binds its style the same way. The contract test now flags an empty `class` or `style`, with samples, and `tests/unit/build-components.test.ts` has a sample for the merged case. No snapshot changed. The 6.0 Fixed entry on the empty `class` names `style` too.
- [x] (1) TabsItem, ToggleButton: in Svelte, `defaultChecked` inside a `Tabs` or `ToggleGroup` that has a value raises no warning, and it stays in the input's spread, which sets the input's default. React warns and drops it (`packages/opui/components/Tabs/TabsItem.svelte:27`, `packages/opui/components/Tabs/TabsItem.svelte:38-45`, `packages/opui/components/ToggleButton/ToggleButton.svelte:32-34`, `packages/opui/components/ToggleButton/ToggleButton.svelte:45-50`, `packages/opui/components/Tabs/TabsItem.react.tsx:27-33`, `packages/opui/components/ToggleButton/ToggleButton.react.tsx:30-48`)
  - Summary: A Svelte tab or toggle marked `defaultChecked` inside a group with a value gets no warning, and the input keeps it as its default.
  - Recommended: Fix. The React port already passes `defaultChecked` to the warning and only sets it while the group has no value.
  - Fix: in the Svelte output, destructure `defaultChecked`, pass `checked ?? defaultChecked` to `warnGroupedChecked`, and set `defaultChecked={grouped === undefined ? defaultChecked : undefined}` instead of leaving it in `rest`. The Svelte examples all write the starting state as `defaultChecked` (`src/component-examples/tabs/Basics.svelte:6`), so this is the spelling Svelte users copy.
  - Fixed: `scripts/component-svelte.mjs` now destructures `defaultChecked` for an item input, passes `checked ?? defaultChecked` to `warnGroupedChecked`, and sets `defaultChecked={grouped === undefined ? defaultChecked : undefined}`, like the React port. `pnpm build-components` changed only `TabsItem.svelte` and `ToggleButton.svelte`. A new case in `tests/unit/toggle-checked.test.ts` renders a grouped `defaultChecked` tab and button in Svelte and expects the group's choice and both warnings. The existing `Tabs` and `ToggleGroup` Added entries already promise the warning.
- [x] (1) Blog: in the menu post's playground, the AnchorPlayground rule that marks the trigger as draggable, `& :is(a, button)`, is nested and Astro leaves it unscoped. It also matches the menu's items, so every item, the disabled Archive item included, gets `cursor: move` and `touch-action: none`. This was checked in Chromium on the built page (`src/components/Blog/AnchorPlayground.astro:60-63`, `src/docs/blog/menu-popover-anchor.astro:86-103`)
  - Summary: Every item in the menu post's playground menu shows a move cursor, as if it could be dragged.
  - Recommended: Fix. Only the trigger is draggable.
  - Fix: leave out anything inside a popover.
    ```css
    & :is(a, button):not([popover] *) {
      cursor: move;
      touch-action: none;
    }
    ```
  - Fixed: The rule is `& :is(a, button):not([popover] *, .ui-floating *)`, so only the trigger gets `cursor: move` and `touch-action: none`: not the items of the menu popover, and not a link in an always-visible floating card. Checked in Chromium: the trigger reads `move`, a menu item `default` and a link in `.ui-floating` `pointer`. Astro still leaves the nested selector unscoped (checked with the compiler), which is what lets it reach the slotted trigger.
- [x] (1) Docs site: the block page's Mobile and Tablet preview widths render the block at 388px and 766px instead of 390px and 768px, because the width is set on `.block-frame`, whose 1px border sits inside it (`src/pages/blocks/[block]/index.astro:136-142`, `src/pages/blocks/[block]/index.astro:176-185`)
  - Summary: The block preview's Mobile and Tablet widths are 2px narrower than the 390px and 768px they stand for.
  - Recommended: Fix. One `calc()` makes the frame's content box match the labelled width.
  - Fix: measured on `/blocks/app-shell/` and `/blocks/data-table/`. Add the border to the width the toggle sets: `calc(${input.dataset.width} + 2 * var(--ui-border-width))` when the width ends in px.
  - Fixed: the toggle sets `calc(<width> + 2 * var(--ui-border-width))` for a px width (55f624b6). On `/blocks/data-table/` the iframe is 768px wide on Tablet and 390px on Mobile, and `docs.spec.ts` checks it.
- [ ] (2) Range: in WebKit, the fill animation (`ui-range-fill` on the `--ui-range-thumb` view timeline) keeps `/theme-builder/` rendering a new frame about every 45 ms while nothing changes: in WebKitGTK 2.52 the main thread is busy for 3.5 s of every 4 s at idle, from the two Range inputs in the preview specimen, 1,900 px below the viewport. With their animation off it is 0.4 s, and Chromium shows no idle cost. A plain page with the same Range markup and `dist/opui.css` costs 0.1 to 0.2 s per 3 s, also inside `.ui-palette`, so the repro still needs the part of the builder that makes it expensive (`packages/opui/css/components/range.css:268-289`, `packages/opui/css/components/range.css:361-362`, `src/components/ThemeBuilder/PreviewSpecimen.astro:185`)
  - Summary: In WebKit the theme builder keeps redrawing while idle because of the Range fill animation, which slows every action there.
  - Recommended: Fix with option A. The cost comes from the engine, so it belongs in an engine bug report with a repro, not a workaround.
  - Fix: add the builder's pieces to the plain page one at a time (the preview's containers, `content-visibility: auto`, the `.ui-palette` panes and the page's custom properties) until the idle cost appears.
  - Options:
    - A (recommended): reduce it to a plain-HTML repro, report it to WebKit, and add the reason to `tests/e2e/engine-bugs.ts` with the repro in `tests/e2e/engines.spec.ts`, marking the theme builder tests slow in WebKit for it.
    - B: pause the preview's Range animations while they are outside the viewport, from the theme builder's script.
  - Explained: Not changed: it needs WebKit, which this environment doesn't have. This batch's `range.css` changes moved the cited lines: the fill animation is now `packages/opui/css/components/range.css:284-305` and the thumb's view timeline `packages/opui/css/components/range.css:377-378`.
- [x] (2) TextField: in Vue, the form reset handler assigns the input's string `value` to the model, because `numeric()` only sees a static `type="number"` and TextField's type is dynamic, so `<TextField type="number" v-model="n">` hands back a number while the user types (Vue's `vModelText` casts on `vnode.props.type`) and a string after a reset (`packages/opui/components/TextField/TextField.vue:65-70`, `scripts/component-models.mjs:24-31`)
  - Summary: A Vue number TextField's bound value turns from a number into a string after a form reset.
  - Recommended: Fix with option A. It fixes the cast and removes the reset code from five compiled Vue files.
  - Fix: found by the `framework-idioms` agent's blind port of TextField. No test catches it: the app tests' reset scenario and `example-state.spec.ts` read the DOM, not the model's type.
  - Options:
    - A (recommended): move the reset into `vSeed` (`packages/opui/components/vue.ts`, whose `stateOf` already casts on `field.type`): its `mounted` sets `defaultValue` when there's no `value` attribute and listens for `reset` on `field.form`, and `beforeUnmount` removes the listener. The compiled ports then keep only `v-seed v-model`, without `modelElement`, `initialValue`, `modelForm`, `resetModel` or the lifecycle hooks (TextField, Textarea, NumberField, Range, OneTimeCode).
    - B: emit a runtime check in the reset line: `element.type === "number" && !Number.isNaN(element.valueAsNumber) ? element.valueAsNumber : element.value`.
  - Fixed: with option A, widened to every control `v-seed` sits on. `vSeed` (`packages/opui/components/vue.ts`) makes a client-rendered control's state its default and, after a form reset that isn't cancelled, sets the model to the control's state through `stateOf`, which casts like `v-model`, so a number field stays a number. Checkbox, Switch, Radio, Rating and Select models follow a reset too, which they didn't: on a client render a box checked only by `v-model` had no `defaultChecked`. The radio that holds the model sets it to `undefined` when the reset leaves its group with none checked. The value kind's compiled reset code (`modelElement`, `initialValue`, `modelForm`, `resetModel` and the lifecycle hooks) is gone from TextField, Textarea, NumberField, OneTimeCode and Range, and the hand-written `Select.vue` binds `:selected` to its initial selection only, since Vue also writes a bound `selected` as an attribute, which moved the option a reset returns to. `tests/unit/vue-seed.test.ts` drives the directive through a client render and a reset of each kind, a cancelled reset and hydration.
- [x] (3) TextField: in Svelte, `defaultValue={initialValue}` comes after `{...rest}`, so it replaces a `defaultValue` the caller passes: an SSR probe with `defaultValue: "kept"` renders `value="kept"` in React and no value in Svelte. The same emitter writes it into NumberField, OneTimeCode, Range and Textarea (`packages/opui/components/TextField/TextField.svelte:93-104`, `scripts/component-models.mjs:203-215`)
  - Summary: A Svelte TextField drops the `defaultValue` it's given, so the field renders without it and a reset ignores it.
  - Recommended: Fix. The component merges the value, so it destructures it like the other merged attributes.
  - Fix: when the model can be reset, destructure `defaultValue` next to the bindable and emit `defaultValue={defaultValue ?? initialValue}`. Found by the `framework-idioms` agent.
  - Fixed: the Svelte value, checked and radio kinds (`scripts/component-models.mjs`) destructure `defaultValue` or `defaultChecked` and render `defaultValue={defaultValue ?? initialValue}` or `defaultChecked={defaultChecked ?? initialChecked}` in TextField, Textarea, NumberField, OneTimeCode, Range, Checkbox, Switch and Radio, and a Textarea no longer renders a `defaultvalue` attribute (`tests/unit/svelte-defaults.test.ts`). One correction to the finding: Svelte's server render leaves out a default under an unset `bind:value` or `bind:checked`, also on a plain `<input bind:value defaultValue>`, so the default shows once the page hydrates, as in any Svelte app, while React renders it on the server. Range's `defaultValue` helper is now `middleValue`, since the prop takes that name, and the Svelte emitter refuses such a clash.
- [x] (4) TextField: the Vue port puts `Root`, `hasStartText`, `hasEndText`, `startTextId` and `endTextId` in `computed`s that read `slots`, which Vue doesn't track, so a slot the parent adds after mount is ignored: an `end-text` slot behind `v-if` never shows, and a `label` slot that appears later renders in a `div` root that doesn't label the input. The same emitter writes it into NumberField, Textarea, Range and ListItem (`packages/opui/components/TextField/TextField.vue:58-78`, `packages/opui/components/NumberField/NumberField.vue:53-59`, `packages/opui/components/Textarea/Textarea.vue:44`, `packages/opui/components/Range/Range.vue:52-62`, `packages/opui/components/ListItem/ListItem.vue:38-40`, `scripts/component-vue.mjs:542-547`)
  - Summary: In Vue, a slot added after the page loads, such as an error message in the end text, never shows or leaves the input unlabeled.
  - Recommended: Fix with option A. Only the values that read a slot change, and the emitter fixes all five ports.
  - Fix: found by the `framework-idioms` agent's blind port of TextField and confirmed by mounting the compiled `TextField.vue` in a client render under a parent with `<template v-if="error" #end-text>`: once `error` is set, no `.ui-end-text` renders, and a `#label` slot added later gets its `.ui-label` but keeps the `div` root. Slots aren't reactive in Vue, so a `computed` that reads one keeps its first answer, while the template's own `$slots` reads follow because the child renders again. React computes these on every render and Svelte reads snippet props through `$derived`. No test catches it: `tests/unit/component-contract.test.ts` renders on the server and no app scenario changes a slot after hydration, so the fix comes with a client-render test that adds a slot after mount, and the line "Derived values go in `computed()`" in `packages/opui/components/AGENTS.md` names the exception.
  - Options:
    - A (recommended): in `toVue`, emit a derived const that reads a slot, or reads such a const, as a getter, and call it in the script and the template (`v-if="hasEndText()"`, `:id="endTextId()"`, `:is="Root()"`). The rest stay `computed`. Checked on a copy of `TextField.vue`: the end text shows and the root becomes a `label` once the slot is added.
      ```ts
      const hasEndText = () =>
        Boolean(endText || slots["end-text"] || characterCount)
      const endTextId = () =>
        passwordToggle && hasEndText() ? `${base.value}-end-text` : undefined
      ```
    - B: inline the slot checks into the template (`v-if="endText || $slots['end-text'] || characterCount"`). It only covers the values the template reads: the ids that `aria-describedby` merges in the script would still need a getter.
  - Fixed: with option A: `toVue` emits a derived value that reads a slot, or reads such a value, as a getter called in the script and the template (`hasEndText()`, `:is="Root()"`), in TextField, NumberField, Textarea, Range and ListItem, and refuses a provided value that reads a slot. `slotsUsedIn` reads the syntax tree, so a slot check the formatter breaks across lines still counts. `tests/unit/vue-slot-getters.test.ts` compiles a sample, mounts it on an in-memory renderer, adds an `end-text` slot after mount and expects the end text with its `aria-describedby` and a `label` root; the old `computed` keeps the `div` and no end text. The components guide names the exception next to "Derived values go in `computed()`".
- [x] (2) Package: The Svelte declarations of Avatar, Button, Chip, FieldLegend, Fieldset, Form and ListItem spell out every member of their props union, and `svelte-check` with `skipLibCheck: false` reports "Expression produces a union type that is too complex to represent" in each of their `dist/components/*.svelte.d.ts` files (`packages/opui/scripts/build-frameworks.mjs:304-311`, `packages/opui/components/Avatar/types.svelte.ts:4-9`)
  - Summary: A Svelte project that type-checks its dependencies gets errors in seven opui-css declaration files.
  - Recommended: Fix with option B. Option A was checked and fails the same way, since the error comes from Svelte's `Component` type.
  - Options:
    - A: emit declarations that reference the props type (`import("./types.svelte").Props`) instead of the expanded union, for example by typing `$props()` with a named type svelte2tsx keeps.
    - B (recommended): document in Getting started that the Svelte types need `skipLibCheck: true`, as the templates set.
  - Found while adding the create-vite flags to the package fixtures for the 6.0 checklist: the Svelte fixture passes with `skipLibCheck: true`, and with `false` svelte-check 4.7 reports the error at the first line of each file. React and Vue pass with `false`.
  - Explained: Option A doesn't fix it. Checked with `tsc` and `skipLibCheck: false` on the built `Avatar.svelte.d.ts`: a declaration that imports `Props` from `./types.svelte.js` and declares `Component<Props, {}, "">` fails with the same error, and so does `Component<Props, {}>`. The cause is Svelte's own `Component` type: its `Bindings extends keyof Props | ''` constraint takes `keyof` of a union of 18 members (three `as` branches times the unions in `types.ts`) whose members carry the `data-${string}` attribute index, and TypeScript expands that intersection past its limit. `keyof Props` alone, `Partial<Props>` and a call signature over `Props` pass, and React and Vue never build that constraint. Moving the shared HTML attributes out of the union passes only while the branches add no element attributes, so the per-element types can't be kept that way. So the fix is B, which the Svelte templates already meet with `skipLibCheck: true`, plus a report to Svelte that the `Bindings` constraint fails on wide union props.
  - Fixed: with option B in b52c32c8. The Builds section of the Svelte Getting started page and the TypeScript section of the package README say the Svelte types need `skipLibCheck: true`, as `@tsconfig/svelte` and the SvelteKit config set it, and name the `svelte-check` error without it. The agent skill's `getting-started.md` carries the same line.
- [x] (2) Progress: a round indeterminate progress also draws the bar's `::after`. The indeterminate rule `:where(.ui-progress):has(> progress:indeterminate)::after` (0,1,2) outranks `.ui-round::after { content: none }` (0,1,1). So a blue block sweeps through the ring, and with reduced motion the whole disc pulses blue (`packages/opui/css/components/progress.css:55-71`, `packages/opui/css/components/progress.css:97-99`, `packages/opui/css/components/progress.css:126-131`, `src/component-examples/progress/Round.html:4-6`)
  - Summary: The Syncing ring shows a blue block sliding through its middle, or a pulsing blue disc with reduced motion.
  - Recommended: Fix. One `:where()` brings back the ring the round styles intend, and a reduced-motion pulse keeps it from freezing at a quarter.
  - Fix: confirmed in Chromium on `/html/components/progress/` (Round): the second ring's `::after` has `content: ""` and runs `ui-indeterminate` (`ui-indeterminate-pulse` with reduced motion). Lower the rule to `:where(.ui-progress:has(> progress:indeterminate))`. Once the bar no longer leaks into the ring, reduced motion leaves a static quarter arc (the spin is `1s * --_motion`, so 0s), which looks like `value="25"`. Give the ring the bar's pulse there:
    ```css
    &:indeterminate {
      --_ring-fraction: 0.25;

      animation: ui-progress-spin
        calc(var(--_loop-duration) / 2 * var(--_motion)) linear infinite;

      @container style(--_motion: 0) {
        animation: ui-indeterminate-pulse var(--_loop-duration) ease-in-out
          infinite;
      }
    }
    ```
  - Fixed: The indeterminate rule is `:where(.ui-progress:has(> progress:indeterminate))`, so `.ui-round::after { content: none }` wins, and the ring runs `ui-indeterminate-pulse` under `--_motion: 0` instead of freezing at a quarter. Checked in Chromium with and without reduced motion. The 6.0 `round` entry in the CHANGELOG says it pulses under reduced motion.
- [x] (2) List: a dense list caps an avatar in `.ui-start` or `.ui-end` with `max-inline-size: var(--ui-space-6)` instead of sizing it, and that is a spacing token. A `.ui-small` or `.ui-large` avatar loses its size class. A `.ui-large` letter avatar keeps its large font, and its content holds it 35px tall in a 28px width (`packages/opui/css/components/list.css:144-148`, `packages/opui/css/components/avatar.css:13-20`, `packages/opui/css/components/avatar.css:67-70`)
  - Summary: A large letter avatar in a dense list renders as an oval with oversized initials.
  - Recommended: Fix with option A. It sizes the avatar the way the dense list sizes its checkboxes, so an explicit size class still wins.
  - Fix: measured: default and `.ui-small` avatars are 28x28, and `.ui-large` is 28x35.
  - Options:
    - A (recommended): drop the cap. Give avatars the x-small size inside the existing `components.root` dense block at lines 441-455, where a size class on the avatar beats it, as it does for the checkbox sizes there.
      ```css
      & > :where(.ui-start, .ui-end) :where(.ui-avatar),
      &
        > :where(a, button, label)
        > :where(.ui-start, .ui-end)
        :where(.ui-avatar) {
        --_font-size: var(--ui-font-size-caption);
        --_icon-size: var(--ui-icon-size-small);
        --_size: var(--ui-control-size-x-small);
      }
      ```
    - B: drop the cap and put `.ui-x-small` on avatars in dense lists, including the one at `src/blocks/project-overview.html:341`.
  - Fixed: Option A. The `max-inline-size` cap is gone, and the dense block in `components.root` gives avatars in `.ui-start` and `.ui-end` the x-small `--_size`, `--_font-size` and `--_icon-size`, so a size class on the avatar wins. Measured in Chromium: default and x-small avatars are 28x28, `.ui-small` 32x32 and `.ui-large` 48x48. The three properties are documented as outputs in `custom-properties/list.ts`, with a `List` Fixed entry in the CHANGELOG.
- [x] (2) Message: the reaction pills set their own `border` with `--ui-border-color` in `components.extended`. That has two effects. They skip `--ui-control-border-color`, which ToggleButton and ToggleGroup read and m3 and shadcn set. And their `border` beats ToggleButton's keyboard-focus `border-color: var(--ui-focus-border-color, ...)` in `components.root`, which govuk and shadcn set (`packages/opui/css/components/message.css:107-139`, `packages/opui/css/components/toggle-button.css:64-73`, `packages/opui/css/components/toggle-group.css:2-4`, `packages/opui/css/components/toggle-group.css:28-30`)
  - Summary: Chat reactions ignore the theme's control border and focus border, which every other toggle button follows.
  - Recommended: Fix. It reads the border color the group already passes down and restores the focus border the toggle draws everywhere else.
  - Fix: checked in Chromium with both tokens set:
    - A standalone toggle button reads `--ui-control-border-color` and switches to `--ui-focus-border-color` on keyboard focus.
    - The reaction pill keeps `--ui-border-color` in both states.
    - With the rule below added to `components.extended`, the pill follows both tokens.

    The group's `border: 0` is in the same layer, so the pill still needs its own `border`. Send the hover and checked colors through `--_border-color`, which the item inherits from the group:

    ```css
    & > .ui-toggle-button {
      border: var(--ui-border-width) solid var(--_border-color);

      @media (hover: hover) {
        &:hover {
          --_border-color: var(--ui-text-subtle);
        }
      }

      &:has(input:focus-visible) {
        @media (forced-colors: none) {
          border-color: var(--ui-focus-border-color, var(--_border-color));
        }
      }

      &:has(input:checked) {
        --_border-color: var(--ui-selected-strong);
      }
    }
    ```

  - Fixed: Only `message.css` changed: the pills draw their `border` from `--_border-color`, which the group passes down (`--ui-control-border-color` when the theme sets it), set it to `--ui-text-subtle` on hover and `--ui-selected-strong` when checked, and switch to `--ui-focus-border-color` on keyboard focus outside forced colors. `custom-properties/message.ts` documents `--_border-color`. Checked in Chromium with and without both tokens: the default look is unchanged, and with the tokens the pills follow them like a standalone toggle button.
- [x] (2) NumberField: a long start or end text widens the field. The root is `inline-size: fit-content`, so the grid column takes the helper text's one-line width and `.ui-field` stretches to match. The page says the field "Fits its value by default", and `.ui-auto-fit` in `text-field.css` gives the helper texts `contain: inline-size` to prevent exactly this (`packages/opui/css/components/number-field.css:2-17`, `packages/opui/css/components/text-field.css:461-478`, `src/docs/components/number-field.astro:137-143`)
  - Summary: A number field with a sentence of help text grows as wide as the sentence, pushing its step buttons apart.
  - Recommended: Fix. The page promises that the field fits its value, and auto-fit text fields already handle it this way.
  - Fix: checked in Chromium. With the end text "Tables seat up to eight guests, so book two tables for larger groups." the field is 386px wide instead of 118px. With the rule below it is 118px and the text wraps under it. The current examples all use short texts, so they hide the problem.
    ```css
    &:not(.ui-stretch, .ui-spread) > :where(.ui-start-text, .ui-end-text) {
      contain: inline-size;
    }
    ```
  - Fixed: `number-field.css` gives `.ui-start-text` and `.ui-end-text` `contain: inline-size` unless the field has `.ui-stretch` or `.ui-spread`. Checked in Chromium: with the item's end text, the field stays 118px and the text wraps under it, and a long start text does the same. Stretch, spread and every number-field example keep their size. The NumberField CHANGELOG entry says so.
- [x] (2) Table: footer `td` cells keep the page's `--ui-border-color` on the `--ui-surface-filled` footer fill, and only `th` remaps it to `--ui-border-color-on-filled`. In light mode, the lines between footer cells and the footer's top line over `td` cells are the color of the fill (L 0.8406 on L 0.84), while a footer `th` draws them in `--ui-gray-6` (L 0.71) (`packages/opui/css/components/table.css:46-54`, `packages/opui/css/components/table.css:113-119`)
  - Summary: In light mode the column lines in a table footer disappear, except beside a header cell, which draws darker ones.
  - Recommended: Fix. The remap belongs on every cell with the filled background, as the header cells already have it.
  - Fix: confirmed in Chromium on a footer with one `th` and two `td`s; `/tests/data-display/` has footers of both kinds. Remap the border roles on the footer cells. Also reset the field border next to the border in row headers, which drop the fill.
    ```css
    tbody :is(th[scope="row"], tr:has(> td) > th) {
      --ui-border-color: inherit;
      --ui-field-border-color: inherit;

      background-color: var(--ui-surface);
    }

    tfoot :where(th, td) {
      --ui-border-color: var(--ui-border-color-on-filled);
      --ui-field-border-color: var(--ui-field-border-color-on-filled);

      background-color: var(--ui-surface-filled);
      border-block-start: var(--ui-border-width) solid var(--ui-border-color);
      color: var(--ui-text-strong);
      font-weight: var(--ui-font-weight-semibold);
      padding-block: var(--ui-space-2);
    }
    ```
  - Fixed: Footer `th` and `td` cells remap `--ui-border-color` and `--ui-field-border-color` to the on-filled roles, and row headers reset the field border next to the border. Checked in Chromium: footer `td` lines are `--ui-gray-6` (L 0.71) like the `th`. The `List` and `Table` borders Fixed entry now names table footers.
- [x] (2) Menu: each `items` entry's leftover keys are spread onto its `<a>` or `<button>` after `tagAttrs`, `command` and `commandfor`, with no `defined()` filter. So an item key passed as `undefined` removes `type="button"`, `command="hide-popover"` or `commandfor`, in all four frameworks. The contract test only feeds undefined values to a component's own rest spread, never to `itemRest` (`packages/opui/components/Menu/Menu.astro:61-66`, `packages/opui/components/Menu/Menu.react.tsx:66-71`, `packages/opui/components/Menu/Menu.svelte:55-61`, `packages/opui/components/Menu/Menu.vue:63-70`, `tests/unit/component-contract.test.ts:150-152`)
  - Summary: A menu item whose `type`, `command` or `commandfor` key is undefined loses its `type="button"` and stops closing the menu.
  - Recommended: Fix. Every other spread that follows a component-set attribute already goes through `defined()`.
  - Fix: confirmed by rendering `items={[{ label: "Save", type: undefined, command: undefined, commandfor: undefined }]}`. Astro, React, Svelte and Vue all print a bare `<button>`. This happens with a normal mapping like `{ label: a.name, command: a.command, commandfor: a.target }`. Change `Menu.astro` as below, then run `pnpm build-components` and check that it carries `defined()` into the three ports. Add a contract case for a Menu item with those keys undefined.
    ```astro
    ---
    import { defined } from "../attrs"
    ---
    <Tag
      {...tagAttrs(Tag, disabled, href)}
      command={closes ? "hide-popover" : undefined}
      commandfor={closes ? rootId : undefined}
      {...defined(itemRest)}
    >
    ```
  - Fixed: Fixed: `Menu.astro` spreads `defined(itemRest)`. The compiler dropped an author's `defined()` and only filtered the component's own rest, so it now keeps `defined()` on any other spread the Astro file wraps in it (`filtersSpread` in `scripts/component-shared.mjs`, read in `scripts/component-reader.mjs` and used by the React, Svelte and Vue generators), and the three Menu ports carry it. No other compiled file changed. `tests/unit/component-contract.test.ts` adds an "every item attribute as undefined" case for each component that spreads a map item's rest after attributes it sets (Menu today), which fails on the old Menu, and `tests/unit/build-components.test.ts` has a compiler case.
- [x] (2) Rating: the clear radio's `value="0"` compiles to `value = "0"` in Svelte and to a static `value="0"` in Vue, whose `v-model` reads it as a string. The star radios set numbers. So a bound rating holds a number after a star is picked and the string `"0"` after it is cleared (`packages/opui/components/Rating/Rating.astro:51`, `packages/opui/components/Rating/Rating.svelte:48-56`, `packages/opui/components/Rating/Rating.svelte:68-76`, `packages/opui/components/Rating/Rating.vue:73`, `packages/opui/components/Rating/Rating.vue:85`)
  - Summary: Clearing a bound Svelte or Vue rating sets the value to the string `"0"`, while picking a star sets a number.
  - Recommended: Fix. The HTML stays the same and the bound value keeps one type.
  - Fix: the Input example binds `let rating = $state(3)` and `ref(3)`, so `rating === 0` is false after the clear radio is picked. Vue's `v-model` takes a radio's value from `_value`. Vue's runtime-dom `patchDOMProp` sets `_value` to the string for a static `value` and to the number for `:value="star"`. Give the clear radio a number in `Rating.astro` and run `pnpm build-components`. That writes `value = 0` in Svelte and `:value="0"` in Vue, and the rendered `value="0"` doesn't change.
    ```astro
    value={0}
    ```
  - Fixed: The clear radio is `value={0}` in `Rating.astro`, and `pnpm build-components` wrote `value={0}` and `value = 0` in Svelte and `:value="0"` in Vue, so Vue's `v-model` reads the number from `_value`. Every framework still renders `value="0"`, and the Rating component and parity tests pass.
- [x] (2) Select: `value` picks an `items` entry with `===` in Astro, in Svelte and in Vue's server markup. React passes `value` to the native select, which compares as text, and Vue's client `v-model` compares loosely. So a `value` whose type differs from the item's (`"2"` for `2`) selects a different option in each framework (`packages/opui/components/Select/Select.astro:51-56`, `packages/opui/components/Select/Select.svelte:53-58`, `packages/opui/components/Select/Select.svelte:90`, `packages/opui/components/Select/Select.vue:53-56`, `packages/opui/components/Select/Select.react.tsx:84-93`)
  - Summary: With `value="2"` and an item valued `2`, React selects it, Astro doesn't, Svelte clears the select and Vue selects it only after hydration.
  - Recommended: Fix with option A. It matches the native select and React, and the API types both values as `string | number`.
  - Fix: confirmed by rendering `items={[{ label: "One", value: 1 }, { label: "Two", value: 2 }]}` with `value="2"` in the four frameworks. Only React marks `<option value="2" selected>`. After hydration, Svelte's `bind:value` matches with `is()` (`select_option` in `svelte/src/internal/client/dom/elements/bindings/select.js`) and sets `selectedIndex` to -1. Vue's `v-model` (`setSelected`, `looseEqual`) selects Two, which its server markup didn't.
  - Options:
    - A (recommended): compare as strings in `isSelected` in `Select.astro` and `Select.svelte`, and in `selectedAtFirst` in `Select.vue`. In Svelte, also set the bound value to the matching item's value before `bind:value` reads it, since the binding compares with `===`.
      ```ts
      const same = (a: unknown, b: unknown) => String(a) === String(b)
      const isSelected = (item: SelectItem) =>
        value === undefined
          ? item.selected
          : Array.isArray(value)
            ? value.some((selected) => same(selected, item.value))
            : same(item.value, value)
      ```
    - B: say in the `value` model note of `src/component-api/select/api.ts` that `value` must have the same type as the item's `value`.
  - Fixed: Fixed with option A. `sameValue` in `packages/opui/components/Select/selection.ts` compares as strings, used by `isSelected` in `Select.astro` and `Select.svelte` and by `selectedAtFirst` in `Select.vue`, and Svelte sets the bound value to the matching item's value before `bind:value` reads it, also for a multiple select. `tests/unit/select-value.test.ts` renders numeric items with `value="2"`, with `multiple` and `["1", 2]`, and with a value no item has, in the four frameworks. The CHANGELOG entry that adds preselecting with `value` says it matches as text, like the native select. The Svelte binding after hydration wasn't run in a browser here.
- [x] (2) Tabs, Toggle: in Svelte and Vue, a tab or toggle button the user picks before the page hydrates switches back to the server's choice, while `Radio` keeps it. `TabsItem` and `ToggleButton` set `checked` from their props and only have a change handler. The compiler gives the `checkedItem` and `group` model kinds none of the seeding the `radio` and `radioGroup` kinds get (`packages/opui/components/Tabs/TabsItem.svelte:38-50`, `packages/opui/components/ToggleButton/ToggleButton.svelte:45-56`, `packages/opui/components/Tabs/TabsItem.vue:47-57`, `packages/opui/components/ToggleButton/ToggleButton.vue:67-73`, `scripts/component-models.mjs:57-124`, `tests/apps/apps.spec.ts:270-287`)
  - Summary: On a Svelte or Vue page, a tab or toggle clicked while the page loads jumps back once it hydrates.
  - Recommended: Fix. Radio already keeps the choice through `seedChecked` and `v-seed`, so the same seeding fits these two inputs.
  - Fix: confirmed in Chromium with the compiled components: server render, click before loading the client bundle, then hydrate.
    - Svelte: Tabs with `defaultChecked`, a bound `ToggleGroup` and a bound `ToggleButton` all go back to the server state on hydration. A bound `Radio` keeps PayPal and updates `bind:group`. After a form reset, the bound `value` and `checked` keep the old choice. The bound group then shows no checked button, because Svelte drops the server `checked` attribute once hydrated when the spread has no `defaultChecked`.
    - Vue: the same jump back on hydration, for `TabsItem checked`, `v-model` on `Tabs` and on `ToggleGroup`, and `ToggleButton` with `checked` or `v-model`. A `v-model` Radio keeps the choice. A form reset after hydration leaves tabs and toggles as they are, because each click moves `defaultChecked` along with `checked`, while HTML and Astro go back to the server's choice.
    - React keeps the clicked input but never calls `onValueChange`, the same as its controlled Checkbox.

    Give both inputs the Radio treatment in `scripts/component-models.mjs`:
    - Svelte: replace `checked=` with `{@attach seedChecked(...)}` and a `defaultChecked` read once. Its check calls the parent's `change(input)`, or sets `checked` on a standalone button.
    - Vue: seed the model and listen for the form's reset, as `vSeed` does.

    Then add `tabs/Basics` and `toggle/Interactive` to `CHANGES` in `tests/apps/apps.spec.ts`. The same run shows that a Svelte `Radio` also keeps its old `bind:group` value after a form reset.

  - Explained: Not fixed here: it changes how two compiled model kinds hydrate in Svelte and Vue, and only `pnpm test:apps` can confirm it, which this run can't start. One part moved with the defaultChecked fix: the Svelte input's spread now always has a `defaultChecked` key, so Svelte's `set_attributes` no longer strips the server `checked` attribute on hydration (it only does when the spread has no `defaultValue` or `defaultChecked`), and a form reset shows the server's choice again instead of no checked button; the bound value still keeps the last choice. Svelte: for an item input, replace `checked=` with `{@attach seedChecked(isChecked, seed)}` and `defaultChecked={grouped === undefined ? (defaultChecked ?? initialChecked) : initialChecked}`, where `isChecked = () => grouped ?? checked ?? !!defaultChecked`, `initialChecked = untrack(isChecked)` and `seed(input)` calls `parent?.change?.(input)` and, on ToggleButton, sets `checked = input.checked` when `grouped === undefined`. `seedChecked` in `components/svelte.ts` then passes the input and seeds a checkbox both ways: `if (input.checked || input.type === "checkbox") check(input)`. Vue: TabsItem and ToggleButton bind `:checked`, not `v-model`, so `vSeed` can't see them; add a `vSeedChecked` directive to `components/vue.ts` that calls the item's `seed(input)` in `created` when `changed(field)`, keeps the defaults on a client render like `keepDefaults`, and calls `seed` again after a form reset like `followReset`, and have `component-vue.mjs` emit `v-seed-checked="seed"` next to `@change`. Then add `tabs/Basics` and `toggle/Interactive` to `CHANGES` in `tests/apps/apps.spec.ts` and a case for the directive in `tests/unit/vue-seed.test.ts`. React's missing `onValueChange` for a pre-hydration click is a separate item.
  - Fixed: `TabsItem` and `ToggleButton` keep a tab or toggle picked before hydration and hand it to their bound value. In Svelte that's the `seedChecked` attachment, which now seeds a checkbox both ways; in Vue a `v-seed-checked` directive from `seedChecked(change)` in `components/vue.ts` replaces `:checked`, which also leaves the server default in place and follows form resets. `pnpm test:apps` covers `tabs/Basics`, `tabs/Binding`, `toggle/Binding` and `toggle/Interactive` in SvelteKit and Nuxt (red before, green after). React keeps the pick but calls no change callback for it, now its own item under Bugs.
- [x] (4) Callout: the link rule `a[href] { color: inherit }` in a callout without `.ui-outlined` also matches link buttons, chips and avatars, and its specificity (0,2,1) beats the Button's (0,0,0). A filled `Button` with `href` in a callout gets the callout's text color: 1.06:1 on the default fill in light mode, 1:1 in dark, 3.8:1 and 2.36:1 for `color="primary"`. Hover and focus switch it to `--ui-primary-text` (`packages/opui/css/components/callout.css:102-123`, `packages/opui/css/components/button.css:145`)
  - Summary: A filled link button in a callout or toast shows its label in the color of its fill, so it reads as an empty pill.
  - Recommended: Fix. The rule is meant for plain links and `.ui-link`, and the transition rule next to it already skips links with a class.
  - Fix: limit the rule to plain links and `.ui-link`. Checked in Chromium: filled and primary link buttons get their own text color back in light and dark mode, and `.ui-link` and plain links still inherit.
    ```css
    &:not(.ui-outlined) {
      a[href]:where(:not([class*="ui-"]), .ui-link) {
        color: inherit;

        &:where(:not([class*="ui-"])) {
          transition: color var(--_link-duration) var(--_link-ease);
        }

        @media (hover: hover) {
          &:hover {
            color: var(--_link-hover-text-color);
          }
        }

        &:focus-visible {
          color: var(--_link-hover-text-color);
        }
      }
    }
    ```
  - Fixed: `callout.css` limits the rule to `a[href]:where(:not([class*="ui-"]), .ui-link)`. Checked in Chromium in an info callout and a callout without severity: a filled link Button goes from 1.00:1 and 1.06:1 to 19.4:1 in light and dark mode, a primary one from 4.05:1, 3.80:1 and 2.35:1 to 5.09:1 in light and 8.21:1 in dark, a link Chip keeps its own text color, and plain links and `.ui-link` still take the callout's. Added a `Callout` Fixed entry to the CHANGELOG.
- [ ] (2) Checkbox, Radio, Tabs, Toggle: in React, a box, radio, tab or toggle button the user changes before the page hydrates keeps the change, but its change callback, such as `onValueChange`, never hears about it, so a controlled value stays at the server's choice until the next change. React 19.3 attaches its handlers after hydration and doesn't replay the change, while Svelte and Vue hand the change to the bound value (`tests/apps/apps.spec.ts:420-428`)
  - Summary: In a React app, a choice made while the page loads shows as picked but the app's state still holds the old value.
  - Recommended: Fix with option A. It gives React the same seeding Svelte and Vue already have.
  - Options:
    - A (recommended): After hydration, read each controlled input's DOM state once in a layout effect and call the change callback when it differs from the prop, then lift the React skip in `tests/apps/apps.spec.ts`
    - B: Document it as a React limitation on the Getting started page and keep the skip
- [x] (3) Docs site: the framework picker on the framework-free pages (`/blocks/`, every block page, `/blog/`) always shows HTML, and picking a framework reloads the same page; after a visit to a framework page in the same tab, the choice changes nothing at all, because `preferredFramework()` reads the session's last framework before the stored choice (`src/layouts/Layout.astro:130-158`, `src/components/FrameworkPicker.astro:17`, `src/components/FrameworkPicker.astro:100-113`)
  - Summary: On the blocks and blog pages, picking a framework seems to do nothing: the picker snaps back to HTML and links may follow another framework.
  - Recommended: Fix. Two lines make the picker show and set the framework the page's links already follow.
  - Fix: reproduced at 1280px and 390px. On `/blocks/account-settings/`, `/blocks/` and `/blog/`, picking Vue reloads the page, the links move to `/vue/`, and the picker shows HTML. After opening `/react/components/button/` first, picking Vue on `/blocks/` leaves the links on `/react/components/`, `data-framework="react"`, and the picker on HTML. `docs.spec.ts` only checks the picker on component and guide pages. In `relinkDocs()`, set every `.framework-picker select` to `framework`; in the picker's change handler, also write the choice to `sessionStorage` so `preferredFramework()` returns it after the reload.
  - Fixed: `relinkDocs()` sets every `.framework-picker select` to the framework the links follow, and a pick writes `sessionStorage` as well as `localStorage` (9b82c125). At 1280 and 390px, after `/react/components/button/` the picker on `/blocks/` shows React, and picking Vue reloads with the picker on Vue, `data-framework="vue"` and the links on `/vue/`; on `/blog/` in a fresh tab, picking Svelte sticks. `docs.spec.ts` covers `/blocks/`.
- [x] (3) Docs site: a modal opened in a block preview opens in the middle of the full-height iframe, often outside the window: the page sizes the iframe to the block's height, so the iframe's viewport is the whole block. Account settings' Delete account dialog lands 500 to 750px above the window, Server status' dialog is cut off at the bottom, and the inbox, chat and app-shell drawers are as tall as the block (1140 to 1510px) (`src/pages/blocks/[block]/index.astro:144-158`)
  - Summary: On a block page, opening a dialog in the preview can dim the page without showing the dialog, which sits off screen.
  - Recommended: Fix with option A. It keeps the full-height preview and only moves the page when an overlay opens.
  - Fix: reproduced on `/blocks/account-settings/` at 1280px (dialog top at -499px) and at 390px (-747px), on `/blocks/server-status/` (top at 593px, 231px tall in an 800px window) and with the app-shell drawer at 390px (469px down, 1318px tall). Only the backdrop shows in the window.
  - Options:
    - A (recommended): after `observe()`, listen for `toggle` in the iframe's document and, when a `dialog:modal` opens, scroll the page so the dialog's box is centered in the window (or its top shows, when it's taller than the window).
    - B: cap the iframe at the window's height, so the block scrolls inside the frame and its overlays center in what the user sees, with Open in a new tab for the full page.
  - Fixed: option A. The block page listens for `toggle` in the preview's document and, when a `dialog:modal` opens, scrolls so the dialog is centered below the site header, or its top sits under the header when it's taller than the window, measuring again a frame later since the header shrinks as the page scrolls (b79aa16c). The Account settings and Server status dialogs open in view at 1280 and 390px, and the app shell drawer's top shows under the header. `docs.spec.ts` checks both cases.

## Docs

- [x] (2) Docs: nothing checks internal links and anchors. `src/utils/whats-new.ts` alone has 655 `href="#…"` links into component pages, and a renamed heading leaves them pointing at nothing without a failure (`src/utils/whats-new.ts`, `src/docs/components/`)
  - Summary: A renamed heading silently breaks the What's new and other in-page links that point at it.
  - Recommended: Fix with option A. A post-build check is fast and covers every page and link at once.
  - Options:
    - A (recommended): a post-build `scripts/check-links.mjs` that reads `dist/` with parse5 and fails on an internal `href` whose page or `#id` doesn't exist, run at the end of `pnpm build`.
    - B: an e2e spec that crawls the built site.
  - Fixed with option A: `scripts/check-dist.mjs` (`pnpm check-dist`) runs at the end of `pnpm build`. It parses every page in `dist` with parse5, follows redirect pages, and fails on an internal link to a missing page or `#id`, a duplicate id, a missing `.md` alternate, a search index URL that doesn't exist and a dead link in `llms.txt` or a `.md` page. It found the Tabs note's `#variants`, the Migrating guide's relative `MIGRATING-legacy.md`, the release checks' `RELEASING.md`, 54 `css-variables` ids on each API index, the Menu Custom `#menu` and the framework variants and `.md` files that `/checks` and `/todo` advertised; all fixed. Placeholder fragments on the block previews, stress and fixture pages are skipped, and same-page fragments inside an example preview are only checked on component pages, since examples link their own page's sections.
- [x] (1) Docs: Theme tokens says the intent fill is the only fill without a token of its own, but the dark checked and invalid fills have none either (`src/docs/guide/theme-tokens.astro:135`)
  - Summary: The guide says one fill lacks a token when several do.
  - Recommended: Fix with option A. It matches the token description.
  - Fix: confirm which fills are deliberately tokenless and list them
  > Explain further
  - Explained: Two clamps make fills without a token, not one. The intent fill caps an intent color at `--ui-accent-fill-max-lightness` (critical buttons, the critical, info, neutral and success badges). The choice fill caps it at `--ui-choice-fill-max-lightness`: the checked Checkbox, Radio and Switch mark in dark mode, and the invalid one in both modes (`choice.css:4-16`, `choice.css:138-145`). `--ui-on-fill` is the text on both, and its own description in `theme-token-descriptions.ts` already says so. Only the sentence on Theme tokens names one.
  - Options:
    - A (recommended): "The fills without a token of their own are intent colors with their lightness capped: at `--ui-accent-fill-max-lightness` for critical buttons and badges, and at `--ui-choice-fill-max-lightness` for the checked choice mark in dark mode and the invalid one. `--ui-on-fill` is the text on all of them."
    - B: keep the sentence and link to the `--ui-on-fill` row, which has the full list
  > Fix with option A
  - Fixed: option A. Theme tokens says the fills without a token of their own are intent colors with their lightness capped, at `--ui-accent-fill-max-lightness` for critical buttons and badges and at `--ui-choice-fill-max-lightness` for the checked choice mark in dark mode and the invalid one, and that `--ui-on-fill` is the text on all of them.
- [x] (1) Docs: the Accessibility guide says there are no ARIA widgets that need JavaScript, but SortableTable sets `aria-sort` from script (`src/docs/guide/accessibility.astro:23`)
  - Summary: The accessibility guide's no-JavaScript claim has an exception.
  - Recommended: Fix. Name the exception.
  - Fix: say "no ARIA widgets that need JavaScript, apart from the sortable table's `aria-sort`"
  > Fix
  - Fixed: The intro on Accessibility now says almost no ARIA needs JavaScript and names the exception: a sortable Table, whose script sets `aria-sort` on the header you press.
- [x] (1) Docs: the Svelte Getting started page tells readers to add `opui-css` to `ssr.noExternal`, which vite-plugin-svelte already does for packages with Svelte exports (`src/docs/guide/getting-started/Svelte.astro:32-44`)
  - Summary: The Svelte setup includes a config step that may not be needed.
  - Recommended: Fix with option A. The plugin already does it for every setup that can render Svelte.
  - Fix: build a fresh SvelteKit app without the option; drop the step if it works
  > Explain further
  - Explained: vite-plugin-svelte (7.3 here) crawls the project's dependencies with vitefu and adds every package with a `svelte` export condition or `svelte` field to `ssr.noExternal` (`isFrameworkPkgByJson` in its `options.js`). `opui-css` has both (`"./svelte": { "svelte": ... }` and `"svelte": "./svelte/index.ts"`), and any Vite setup that renders Svelte needs that plugin anyway, so the step is redundant when `opui-css` is a direct dependency. It only matters when the plugin's dependency crawl is turned off or `opui-css` comes in through another package. Not tried in a fresh app here, since that needs installing a new project.
  - Options:
    - A (recommended): drop the `ssr.noExternal` step and its code block, and say vite-plugin-svelte compiles the components for server rendering in SvelteKit and in Vite setups alike
    - B: keep the step as a harmless safeguard and correct the reason
  > Fix with option A
  - Fixed: option A. The Svelte Getting started page drops the `ssr.noExternal` step and its code block and says `@sveltejs/vite-plugin-svelte` compiles the components for server rendering, in SvelteKit and in a Vite setup alike, through the package's `svelte` export condition. The README's server rendering paragraph says the same and keeps `ssr.noExternal` for React and Vue in Vite, and the skill's getting-started reference follows with the build.
- [x] (1) Docs: the Svelte and Vue Getting started pages list the components that support `bind:` and `v-model` but leave out NumberStepper and Tabs (`src/docs/guide/getting-started/Svelte.astro:102-105`, `src/docs/guide/getting-started/Vue.astro:133`)
  - Summary: The two-way binding lists miss some components that support it.
  - Recommended: Fix. Complete the lists from the components' api.ts.
  - Fix: list every component whose api.ts documents a bindable prop
  > Fix
  - Fixed: Svelte now lists `bind:value` on TextField, Textarea, Select, Range, NumberField, OneTimeCode, Rating, Tabs and ToggleGroup, `bind:checked` on ToggleButton, and the existing Checkbox, Switch and Radio bindings. The Vue hydration note lists `v-model` on Number field, One-time code, Rating, Tabs and Toggle too. Checked against `$bindable` in the Svelte components and the Vue components with a model.
- [x] (1) Docs: the Migrating page renders the note about the legacy guide twice in a row, once from MIGRATING.md and once from the page (`packages/opui/MIGRATING.md:1371`, `src/docs/guide/migrating.astro:59`)
  - Summary: The Migrating page shows the same legacy-guide note twice.
  - Recommended: Fix. Keep the MIGRATING.md line, since GitHub readers need it too.
  - Fix: remove the page's own note
  > Fix
  - Fixed: Removed the page's own Older versions section from `migrating.astro`; the note from MIGRATING.md stays, so GitHub readers keep it.
- [x] (2) Docs: MIGRATING says a property the component sets isn't an override and the rows name the input to set, but about a dozen rename rows point to properties the Component properties table marks `output` (Accordion `--_duration`, ButtonGroup `--_divider-border-color`, Card `--_bg-color`, Drawer `--_duration`, Range `--_thumb-bg-color`, Switch, Chip, Callout) (`packages/opui/MIGRATING.md:1194`)
  - Summary: Some migration rows tell readers to set a property the component overwrites, so the override does nothing.
  - Recommended: Fix with option A. It is what the guide's own rule promises.
  - Options:
    - A (recommended): for each of those rows name the input to set (`--_motion` or `--ui-duration`, `--_surface-bg-color`, `--_accent`, ...), like the Range `--_thumb-highlight-color` row
    - B: reword the sentence to say the new names are outputs that freeze in every state
  > Fix with option A
  - Fixed: The twelve rows that renamed to an output now name the input: Accordion, Drawer and Switch motion point to `--_motion` (or the theme duration), ButtonGroup dividers to the buttons' `--_accent`, Callout and Chip text to the classes that set it, Card to `--_surface-bg-color`, `--_tonal-bg-color`, `--_elevated-bg-color`, `--_outlined-border-color` and `--_elevated-shadow`, Range to `--_accent`, and ToggleButton to `--_selected-bg-color`. Kinds checked against `src/component-api/custom-properties/`.
- [x] (2) Docs: the Browser support guide says the anchor positioning polyfill covers Anchor, Menu and Tooltip, while Carousel, Dialog and Drawer also list `anchor-positioning` (`src/docs/guide/browser-support.astro:126-127`)
  - Summary: The polyfill list leaves out three components that use anchor positioning.
  - Recommended: Remove issue. The bullet is correct as written.
  - Fix: try the polyfill on Carousel, Dialog and Drawer in Firefox and an older Safari, and add the ones it fixes to the bullet
  > Explain further
  - Explained: Carousel, Dialog and Drawer use anchor positioning for extras that need a newer feature first, so the polyfill wouldn't change anything there. Dialog and Drawer anchor their scroll shadows (`::before` and `::after` on `.ui-content`) to the content, but the shadows only appear inside `@container scroll-state(...)`, which the browsers without anchor positioning don't support either. The Carousel anchors its `::scroll-button()` pseudo-elements with `position-anchor: auto`; those pseudo-elements exist only in Chromium, which has anchor positioning, and the polyfill can't reach pseudo-elements or `position-anchor: auto`. So the bullet is right to name only Anchor, Menu and Tooltip.
  - Options:
    - A (recommended): leave the bullet as it is
    - B: add a sentence that Carousel, Dialog and Drawer use anchor positioning only for extras that also need scroll buttons or scroll-state queries, so the polyfill doesn't apply
  > Remove issue
  - Removed: the bullet is right as written: Carousel, Dialog and Drawer use anchor positioning only for extras that need scroll buttons or scroll-state queries first, which the polyfill can't bring.
- [x] (2) List: the List page's browser support says the compat layer has fallbacks for its features in `compat/menu.css`, only because ListItem's `api.ts` lists the `menu` stylesheet; that file holds one iOS fix for Menu submenus (`src/components/BrowserSupport.astro:39`, `src/component-api/list-item/api.ts:5`)
  - Summary: The List page points to a Menu compat fix that has nothing to do with lists.
  - Recommended: Fix. Filtering by the page's features keeps the sentence right on every page.
  - Fix: name only the compat files whose features the page lists in its `browserSupport`
  > Fix
  - Fixed: `BrowserSupport.astro` now names only the compat file for the page's own stylesheet, so the List page no longer points to `compat/menu.css`, while Avatar, Menu, One-time code and Tooltip keep their sentence.
- [x] (2) Tokens: the `--ui-palette-source` description says its default is Unset, but `palette.css` declares hue 222.8 (`src/utils/theme-token-descriptions.ts:106`)
  - Summary: The palette source token claims to have no default, but it has one.
  - Recommended: Fix. Document the 222.8 default.
  - Fix: give the default as the hue 222.8 color, unless Unset is meant as the value a theme sees
  > Fix
  - Fixed: The description in `theme-token-descriptions.ts` (and so `tokens.json`) says a theme leaves it unset and `palette.css` builds it from `--ui-palette-hue` and `--ui-palette-chroma`, `oklch(58% 0.105 222.8)` by default. The table keeps "Unset", which is what a theme sees.
- [x] (2) Docs: MIGRATING's v5 to v6 Before snippets use v6-only names such as `--ui-primary-tonal`, the Theme and tokens section treats 5.4.3 as having a contrast mode and elevated shadow tokens it didn't have, and MIGRATING-legacy points to a CHANGELOG entry that lists classes, not tokens (`packages/opui/MIGRATING.md:328`, `packages/opui/MIGRATING.md:1259`, `packages/opui/MIGRATING-legacy.md:34`)
  - Summary: Some migration snippets show names readers won't find in their 5.x code.
  - Recommended: Fix. Use the 5.4.3 names from the published package.
  - Fix: replace the Before names with the 5.4.3 ones, and point the legacy guide to the entry that lists the tokens
  > Fix
  - Fixed: The Chip and Progress Before lines use the 5.x `--surface-tonal` (After: `--ui-surface-tonal`), the Tabs Before line uses `--critical`, and the Open Props theme snippet uses `--border-radius` and `--palette-hue`. The shadow paragraph now says 5.x cards picked `--_shadow-light` and `--_shadow-dark`, instead of naming theme tokens that never existed; the contrast-mode wording was already gone. MIGRATING-legacy now says the 5.0.0 entry lists renamed classes. Names checked against the 5.4.3 package.
- [x] (3) Changelog: MIGRATING says every change is in the changelog, but Callout dropping `role="note"` and Accordion dropping `role="region"`, `aria-labelledby` and `aria-controls` are in no CHANGELOG entry, MIGRATING step or What's new note (`packages/opui/MIGRATING.md:3`)
  - Summary: Two accessibility changes to Callout and Accordion ship without a changelog or migration note.
  - Recommended: Fix with option A. The removals look intended, so they need Breaking entries.
  - Options:
    - A (recommended): add Breaking entries and MIGRATING lines for both removals
    - B: restore the ARIA in both components
    - C: drop "Every change" from the MIGRATING intro
  > Fix with option A
  - Fixed: Breaking entries in `CHANGELOG.md` for both removals, `Breaking:` What's new notes on the Accordion and Callout pages, and a paragraph in each MIGRATING section: Accordion no longer renders `role="region"`, `aria-labelledby` or `aria-controls`, and Callout no longer renders `role="note"`, so it is announced as the `<article>` it is. Checked against the 5.4.3 package, which rendered both.
- [x] (1) Timeline: the `TimelineItem` parts are listed in markup order, marker, time, heading, but the `time` sits in the `[date]` grid column before the `[marker]` column, so the visual order is time, marker, heading, and the guide keeps parts in visual order like the TextField API does (`src/component-api/timeline-item/api.ts:54-66`, `packages/opui/css/components/timeline.css:12`, `packages/opui/css/components/timeline.css:97-105`)
  - Summary: The anatomy diagram and the HTML parts table list the marker before the date that renders to its left.
  - Recommended: Fix. Moving the `time` part first is a small reorder with no other change.
  - Fix: move the `<time>` part above the `.ui-marker` part in `parts`.
  - Fixed: the `time` part comes before the marker part in `timeline-item/api.ts`, so the parts follow the visual order: time, marker, heading.
- [x] (1) TextField: the `hideLabel` row's `part` is `.ui-text-field > span`, so the HTML table shows `.ui-text-field > span.ui-sr-only`, but with `passwordToggle` the label is a `<label class="ui-sr-only" for>`, not a `span` (`src/component-api/text-field/api.ts:76-84`, `packages/opui/components/TextField/TextField.astro:45`, `packages/opui/components/TextField/TextField.astro:69-72`)
  - Summary: The HTML table points `hideLabel` at a `span` that a password field doesn't render.
  - Recommended: Fix with option A. Widening the selector keeps the table right for both roots.
  - Options:
    - A (recommended): use a selector that matches both elements.
      ```ts
      part: ".ui-text-field > :is(span, label)",
      ```
    - B: keep the `span` selector and say in the description that a password field renders a `label` instead.
  - Fixed: option A: the part is `.ui-text-field > :is(span, label)`, which matches both roots.
- [x] (1) Layout: the options aren't in ascending order: `column` comes before `breakpoint`, and `sticky` before `spread`, while every other option list in the `api.ts` files is sorted by prop (`src/component-api/layout/api.ts:25-42`, `src/component-api/layout/api.ts:99-114`)
  - Summary: The Layout HTML table is sorted by the row builder, so readers see nothing, but the file breaks the ascending-order rule.
  - Recommended: Fix. Move the `breakpoint` option above `column` and the `spread` option above `sticky`; nothing else changes.
  - Fix: reorder the entries in `options` so the props read `align`, `breakpoint`, `column`, `columns`, `container`, `grid`, `media`, `row`, `size`, `spread`, `stretch`, `sticky`.
  - Fixed: the options are sorted by prop, `stretch` included.
- [x] (1) Copy: the root and the `.ui-floating` part descriptions are paragraphs (four and two sentences) instead of the short phrases the guide asks for, and the root text repeats the clipboard fallback the page's Failed copy section already explains (`src/component-api/copy/api.ts:49-61`, `src/docs/components/copy.astro:128-151`)
  - Summary: The Copy parts table and anatomy labels carry long paragraphs where the other components have one phrase.
  - Recommended: Fix. Shorten both descriptions and leave the fallback story to the Failed copy section.
  - Fix: keep the structure, drop the behavior.
    ```ts
    {
      code: "<span popover>",
      description: "The label next to the button, shown after a copy.",
      props: ["copiedLabel", "failedLabel"],
      selector: ".ui-floating",
    },
    ...
    root: {
      description: "The `<opui-copy>` custom element, with `display: contents`.",
      selector: "opui-copy.ui-copy",
    },
    ```
  - Fixed: the root and `.ui-floating` descriptions are one short sentence each, and the fallback is left to the Failed copy section.
- [x] (1) Button group: the root selector is `.ui-button-group`, but the stylesheet only styles `[role="group"].ui-button-group`, so the HTML parts table and anatomy name a selector that gets no styles on its own, while the other roots carry their qualifier (`details.ui-accordion`, `label.ui-checkbox`, `ul.ui-carousel`) (`src/component-api/button-group/api.ts:88-91`, `packages/opui/css/components/button-group.css:2`)
  - Summary: The parts table shows `.ui-button-group` as the root, and a reader who copies it without `role="group"` gets an unstyled group.
  - Recommended: Fix. The change is one selector and matches the other qualified roots.
  - Fix: qualify the root like the other APIs; the `html` note at `api.ts:27` can then stay as the reason.
    ```ts
    root: {
      description: "Container element.",
      selector: '[role="group"].ui-button-group',
    },
    ```
  - Fixed: the API root selector is `[role="group"].ui-button-group`, as the stylesheet styles it.
- [x] (1) API docs: Button group and Carousel quote enum values inside backticks (`"wrap"`, `"scroll"`, `"shrink"`, `"outside"`, `"none"`) while the other APIs write them bare (`plain`, `transparent`, `tonal`, `elevated`), so the same kind of value renders two ways across the tables (`src/component-api/button-group/api.ts:46`, `src/component-api/carousel/api.ts:54`, `src/component-api/accordion/api.ts:57`, `src/component-api/card/api.ts:25`, `src/component-api/checkbox/api.ts:184`)
  - Summary: Some tables show `"wrap"` with quotes and others `plain` without, for the same kind of enum value.
  - Recommended: Fix. Dropping the quotes in two descriptions matches the rest of the tables.
  - Fix: write the values bare in the two descriptions.
    ```ts
    description:
      "What the items do when they don't fit. `wrap` wraps them onto more rows, `scroll` keeps them on one row and scrolls it sideways, and `shrink` keeps them on one row and truncates labels with an ellipsis. Icon-only items keep their size.",
    ```
    ```ts
    description:
      "Previous and next buttons. `outside` places them beside the items, and `none` leaves them out.",
    ```
  - Fixed: the Button group, Carousel and Toggle group descriptions write the values bare.
- [x] (1) Carousel: the parts aren't in visual order: the item comes first, then the previous button, the next button and the markers, while the previous button sits before the items on the page (`src/component-api/carousel/api.ts:137-164`)
  - Summary: The anatomy and parts table list the item before the previous button that is drawn to its left.
  - Recommended: Fix. Moving one entry puts the parts in the order the guide asks for.
  - Fix: move the `::scroll-button(inline-start)` part (`api.ts:116-122`) above the `<li>` item part (`api.ts:110-115`), so the order is previous button, item, next button, markers.
  - Fixed: the parts run previous button, item, next button, marker.
- [x] (1) Progress: the `passThrough` note names `aria-busy` as an example attribute that goes to the `<progress>`, but `spinner.css` excludes `progress` from the `aria-busy` spinner and the page's accessibility section says to set `aria-busy` on the section being updated, not on the bar (`src/component-api/progress/api.ts:6`, `src/docs/components/progress.astro:111-114`, `packages/opui/css/components/spinner.css:2-11`)
  - Summary: The Progress API note suggests putting `aria-busy` on the progress bar, which does nothing and contradicts the page.
  - Recommended: Fix. Swapping one example attribute keeps the note accurate.
  - Fix:
    ```ts
    notes: passThrough("progress", "div", ["aria-describedby", "aria-label", "id"]),
    ```
  - Fixed: the example attributes for the `<progress>` are `aria-describedby`, `aria-label` and `id`.
- [x] (1) Progress: the `<progress>` part lists its props as `["value", "max"]`, out of ascending order, while every other part sorts its `props`; the only other unsorted one is in the Avatar API (`src/component-api/progress/api.ts:35`, `src/component-api/avatar/api.ts:79`)
  - Summary: The anatomy label for the bar reads `value / max` while every other part lists its props alphabetically.
  - Recommended: Fix. It's a two-word swap that follows the project's sorting rule.
  - Fix:
    ```ts
    props: ["max", "value"],
    ```
    and sort the Avatar part's `props` the same way.
  - Fixed: the part's props read `["max", "value"]`, and the Avatar part's list is sorted too.
- [x] (1) Rating: the `size` description is "The size of the stars." where the guide's standard phrase for Sizes is "The size of the element."; the meter and the fieldset scale as a whole with the size, so the standard phrase applies (`src/component-api/rating/api.ts:91`, `src/component-api/AGENTS.md:16-18`, `packages/opui/css/components/rating.css:20-31`)
  - Summary: The Rating size row is worded differently from every other component's size row.
  - Recommended: Fix. It's a one-line wording change to the standard phrase.
  - Fix:
    ```ts
    description: "The size of the element.",
    ```
  - Fixed: the row reads "The size of the element.".
- [x] (1) Rating: the Accessibility text says every radio is at least as wide as `--ui-control-size-x-small` (1.75rem), but `.ui-small` sets the radios to `--ui-icon-size-large` (1.5rem) (`src/docs/components/rating.astro:223-224`, `packages/opui/css/components/rating.css:61`, `packages/opui/css/components/rating.css:74-76`, `packages/opui/css/theme.css:176`, `packages/opui/css/theme.css:309`)
  - Summary: The page promises a 28px star in every size, while the small input's stars are 24px.
  - Recommended: Fix. The 24px small star still meets the pointer target minimum, so only the sentence is wrong.
  - Fix: say "every one is at least 24px wide (`--ui-icon-size-large` in the small size, `--ui-control-size-x-small` otherwise)".
  - Fixed: the sentence says every radio is at least `--ui-icon-size-large` (1.5rem) wide, the WCAG 2.2 minimum target size.
- [x] (1) Docs: the forced colors list in the components guide explains Copy's missing block with "The green copied state of a Copy button", but `copy.js` sets no `data-copied` and `button.css` has no rule for it; the copied cue today is the bordered label popover plus the announcement, so the conclusion holds and the reason doesn't (`packages/opui/components/AGENTS.md:555`, `packages/opui/elements/copy.js:50-64`, `packages/opui/css/components/copy.css:40`)
  - Summary: The guide explains Copy's lack of a forced-colors block with a copied state the element no longer has.
  - Recommended: Fix. One sentence in the guide; no CSS changes.
  - Fix: "The Copy label is a bordered surface, which the browser forces to `CanvasText`, next to its announcement."
  - Fixed: the guide says the Copy label is a bordered surface, which the browser forces to `CanvasText`, next to its announcement.
- [x] (1) Docs: Callout, Text field and Textarea list `relative-color` although none of their stylesheets uses a relative color: `callout.css` and `text-field.css` lost their `oklch(from` and `textarea.css` never had one; the chip survives because the check exempts every id the core sheets use from the unused check (`src/docs/components/callout.astro:54`, `src/docs/components/text-field.astro:34-43`, `src/docs/components/textarea.astro:28-35`, `scripts/check-browser-support.mjs:387`)
  - Summary: Three pages show a "relative color" chip for a feature their CSS no longer uses.
  - Recommended: Fix. The sheets don't use the feature and no other page lists an id for the theme's colors.
  - Fix: drop `relative-color` from the three lists: Callout `["has", "scope"]`, Text field `["container-queries", "datalist", "field-sizing", "has", "invoker-commands", "lh", "user-pseudos"]`, Textarea `["container-queries", "field-sizing", "has", "lh", "user-pseudos"]`.
  - Fixed: `check-browser-support` no longer exempts the ids the core sheets use, and `--write` dropped the three chips.
- [x] (1) Toast: the page lists no Baseline widely available id, so the check never requires one, yet its stylesheets use `:has()`, `overflow: clip` and, through `button.css` in its `api.ts` `css` list, `color-mix()` and `lh`, which the Button page lists; the guide says widely available features that date a component stay listed (`src/docs/components/toast.astro:25-34`, `packages/opui/css/components/toaster.css:78-116`, `src/component-api/toast/api.ts:1-20`)
  - Summary: The Toast chips skip four features every other page that uses them lists, so its list reads as if it needed less than Button.
  - Recommended: Fix. The other pages that compose Button (Button group, Number field) list the same ids.
  - Fix: add `color-mix`, `has`, `lh` and `overflow-clip`, sorted; once one widely available id is listed the check enforces the rest.
  - Fixed: the check now requires every detected id, widely available ones included, and the page lists `color-mix`, `has`, `lh` and `overflow-clip`.
- [x] (1) Copy: the page lists no widely available id either, so the check doesn't require `dir-pseudo` and `overflow-clip`, which `copy.css` uses in the `.ui-floating[popover]` rule that matches every Copy example (`packages/opui/css/components/copy.css:67`, `packages/opui/css/components/copy.css:53`, `src/docs/components/copy.astro:24-36`)
  - Summary: The Copy chips leave out two features that Accordion, Drawer, List, Menu and the other pages using them list.
  - Recommended: Fix. The guide names `overflow-clip` as a feature that stays listed.
  - Fix: add `dir-pseudo` and `overflow-clip` (and `anchor-positioning` from the other Copy item), sorted.
  - Fixed: the page lists `dir-pseudo` and `overflow-clip`, which the check now requires.
- [x] (1) Checkbox: the inline sentence in the hidden-label example puts "email" and "SMS" outside the labels, with the same words hidden inside, so clicking the visible word does nothing and the visible text isn't the control's label (`src/component-examples/checkbox/HiddenLabel.html:53-70`, `src/docs/components/checkbox.astro:168-181`)
  - Summary: Readers copy a checkbox whose visible word isn't clickable and isn't associated with it.
  - Recommended: Fix with option A. The table above it already shows a hidden label, so the sentence can show a visible one.
  - Options:
    - A (recommended): make the word the label, `<label class="ui-checkbox"><input ...><span class="ui-label">email</span></label>`, in all five formats.
    - B: drop the sentence and keep the table.
  - Fixed: option A: "email" and "SMS" are the visible labels of their checkboxes, and a sentence under the example says to make the words next to a checkbox its label.
- [x] (1) Typography: the page has no Accessibility section (with Card, DescriptionList, Divider and Layout the only pages without one), so nothing says that a decorative `svg.ui-icon` needs `aria-hidden="true"` (the examples do it) or that a `.ui-swatch` legend dot carries no meaning on its own and the text next to it must (`src/docs/components/typography.astro:111-129`, `src/component-examples/typography/Icon.html:2-7`, `src/component-examples/typography/Swatch.html:1-21`, `src/layouts/Component.astro:236-239`)
  - Summary: Readers get no guidance on hiding decorative icons or on naming the status a color swatch stands for.
  - Recommended: Fix. The other component pages have the section, and two sentences cover both cases.
  - Fix: add an `accessibility` slot: icons in your own markup get `aria-hidden="true"` unless they carry information, the swatch is decorative and its text names the status, and severity text (`.ui-caption.ui-success`) keeps its meaning in the words, not the color.
  - Fixed: the page has an accessibility slot: a decorative `svg.ui-icon` gets `aria-hidden="true"`, and the text next to a `.ui-swatch` names what its color stands for.
- [x] (1) Stepper: the Narrow containers section names `orientation="horizontal"` / `.ui-horizontal` as the way to keep a row at any width, and the API lists it, but no example sets it; Narrow only shows the auto stacking (`src/docs/components/stepper.astro:252-263`, `src/component-api/stepper/api.ts:49-60`, `src/component-examples/stepper/Narrow.html:1-14`)
  - Summary: The one orientation value with no example is the one the Narrow section recommends.
  - Recommended: Fix. A second stepper in the Narrow example at the same width shows the difference side by side.
  - Fix: add a second `<Stepper orientation="horizontal" style="max-inline-size: 20rem">` (`.ui-stepper.ui-horizontal` in HTML) under the first in `Narrow.*`, so the stacked and the forced-row stepper sit together.
  - Fixed: the Narrow example shows a second stepper with `orientation="horizontal"` at the same 28rem width as the auto one, which stacks, and the prose says horizontal wraps the steps when they don't fit, which is what the CSS does.
- [x] (1) Table: the Sticky header example's Amount column holds money but isn't `numeric`, while the Numbers section says to set it on the cells of a number column, header included, and the In a card example does (`src/component-examples/table/StickyHeader.html:12-64`, `src/component-examples/table/StickyHeader.astro:23-75`, `src/docs/components/table.astro:178-186`)
  - Summary: The amounts in the Sticky header table align left with proportional digits, against the page's own advice.
  - Recommended: Fix. Add `numeric` (`.ui-numeric`) to the Amount header and cells in all five formats.
  - Fix: add `numeric` (`.ui-numeric`) to the Amount header and cells in all five formats.
  - Fixed: the Amount header and cells are `numeric`.
- [x] (1) Toast: the Severities prose lists `neutral` as a value of `data-toast-severity`, but the example shows Default, Info, Success, Warning and Critical only; `neutral` renders `ui-callout ui-neutral`, which differs from the plain default toast (`src/docs/components/toast.astro:111-118`, `src/component-examples/toast/Severities.html:1-50`, `packages/opui/elements/toaster.js:4-10`)
  - Summary: One of the five documented severities can't be tried on the page.
  - Recommended: Fix. Add a Neutral button after Critical in all five formats, with a message like "Export queued".
  - Fix: add a Neutral button after Critical in all five formats, with a message like "Export queued".
  - Fixed: a Neutral button with "Export queued" follows Critical.
- [x] (1) Text field, Textarea: the Top and bottom examples show static counters ("0 / 80", "0 / 280", "280 characters left") that never change while typing, although the library now has `opui-character-count`, which finds its field through the closest `.ui-text-field` or `.ui-textarea` and so works in `.ui-bottom` too; the Textarea Affix prose even recommends the bottom for character counters (`src/component-examples/text-field/TopAndBottom.html:13`, `src/component-examples/textarea/TopAndBottom.html:13`, `src/component-examples/textarea/Spread.html:71`, `src/docs/components/textarea.astro:193-194`, `packages/opui/elements/character-count.js:30-34`)
  - Summary: A reader who copies the bottom counter gets a number that never updates.
  - Recommended: Fix with option A. The element already does the counting; the examples should use it instead of a fixed string.
  - Options:
    - A (recommended): give the fields `maxlength` and put `<opui-character-count class="ui-value"></opui-character-count>` in the bottom slot (HTML: inside `.ui-bottom`, plus the `character-count.js` import).
    - B: replace the counters with a hint that is static by nature, like "Shown under your name".
  - Fixed: the live counts use the components' `characterCount` prop with `maxlength`, the bottom slots hold static hints, and the prose points to Character count.
- [x] (1) Tooltip: the Position example wraps the four tooltips in `<div class="example-compass">`, a docs-site class from the example layout styles, and has no `PositionCode.*`, so the code tab shows a wrapper readers can't use; Toggle's Overflow has `OverflowCode.*` for the same reason, and Drawer's Basics uses the same wrapper (`src/component-examples/tooltip/Position.html:1`, `src/component-examples/tooltip/Position.astro:5`, `src/styles/example-layout.css:14`)
  - Summary: The copied Position snippet includes a class that does nothing outside the docs.
  - Recommended: Fix. Add `PositionCode.{astro,react.tsx,svelte,vue}` without the wrapper, like Toggle's `OverflowCode`, and treat Drawer's Basics the same way.
  - Fix: add `PositionCode.{astro,react.tsx,svelte,vue}` without the wrapper, like Toggle's `OverflowCode`; Drawer's Basics would get the same treatment.
  - Fixed: `tooltip/PositionCode.astro` shows the markup without the `example-compass` wrapper, like `toggle/OverflowCode`.
- [x] (1) Range: `hideLabel` is documented in the API table but no example on the page hides a label (`src/component-api/range/api.ts:98-106`, `src/docs/components/range.astro:80-283`)
  - Summary: Readers find a `hideLabel` row in the table and no preview of a range with a hidden label.
  - Recommended: Fix. Radio and Number field both have a Hidden label section to copy.
  - Fix: add a `HiddenLabel` example in the five formats, such as a volume slider in a toolbar row, under a `<section id="hidden-label">` after Start and end text.
  - Fixed: a Hidden label section with its example follows Start and end text.
- [x] (1) Select: `hideLabel` has no example, and `disabled` only appears as the fourth select inside the Spread example (`src/component-api/select/api.ts:70`, `src/component-api/select/api.ts:88`, `src/component-examples/select/Spread.astro:36-40`, `src/docs/components/select.astro:104-337`)
  - Summary: Readers see `hideLabel` and `disabled` in the table but find a disabled select only inside Spread and no hidden label at all.
  - Recommended: Fix. A Disabled and a Hidden label section match the other field pages.
  - Fix: add `Disabled` and `HiddenLabel` examples in the five formats (a hidden-label select fits a table cell or a sentence, like the Radio one), and drop the `Disabled`, `Required` and `Invalid Select` selects from Spread so it shows the layout, not every state.
  - Fixed: Hidden label and Disabled sections with their examples are on the page.
- [x] (1) Checkbox: the Indeterminate section says "Set the `indeterminate` prop" but the only example under the heading is the Select all one; the standalone indeterminate checkbox is in Basics, two sections up (`src/docs/components/checkbox.astro:223-309`, `src/component-examples/checkbox/Basics.astro:7`)
  - Summary: Readers of the Indeterminate section see no example of the prop it explains before the Select all subsection.
  - Recommended: Fix with option A. A two-line example shows the prop where it is explained.
  - Options:
    - A (recommended): add an `IndeterminateBasics` example with one `<Checkbox indeterminate>` (HTML: `data-indeterminate` plus the `activateIndeterminate()` module script, as in `Basics.html:26-30`) above the `<h3 id="select-all">`.
    - B: add "See the third checkbox in <a href="#basics">Basics</a>." to the prose.
  - Fixed: option A: an IndeterminateBasics example with one indeterminate checkbox sits above the Select all heading.
- [x] (1) Dialog: the Basics prose says buttons after the title line up at the end of the header and a paragraph gets a row of its own, but no example puts a button or a paragraph in a `DialogHeader`; every example has a title alone (`src/docs/components/dialog.astro:162-167`, `src/docs/components/dialog.astro:176-181`, `src/component-examples/dialog/Basics.astro:17-19`)
  - Summary: Readers can't see the header row behavior the text describes.
  - Recommended: Fix. The Drawer Basics example already shows an icon button in the header; the Dialog needs the same.
  - Fix: add a round icon button with `command="close"` after `DialogTitle` in one example (Width or FooterContent), in all five formats, as `src/component-examples/drawer/Basics.astro:23-28` does.
  - Fixed: the Basics header has a close icon button after the title and a paragraph on its own row.
- [x] (1) Dialog: the page description promises "both modal and non-modal use" and Basics opens with a "Modal" `<h3>`, but there is no sibling heading and no example opens a dialog with `command="show"` (`src/docs/components/dialog.astro:38-39`, `src/docs/components/dialog.astro:132`)
  - Summary: A lone "Modal" subheading introduces a section that never shows the non-modal alternative.
  - Recommended: Fix with option A. It makes the heading earn its place and covers the `show` command.
  - Options:
    - A (recommended): add a `NonModal` example (`command="show"`, `closedby="any"`) under an `<h3 id="non-modal">Non-modal</h3>` after the Modal example.
    - B: drop the `<h3 id="modal">` and the "non-modal" claim from the description.
  - Fixed: option A: a NonModal example sits under a Non-modal heading. It opens with `show()` from a script, since Invoker Commands have no `show` command, so its React, Svelte and Vue files are written by hand.
- [x] (1) Drawer: `align="start"` on `DrawerFooter` and the `.ui-actions` group are described in Basics and in the Drawer footer API, but no drawer example shows either; every footer holds one Close button (`src/docs/components/drawer.astro:126-130`, `src/docs/components/drawer.astro:160-163`, `src/component-api/drawer-footer/api.ts:6-20`, `src/component-examples/drawer/Basics.astro:77-81`)
  - Summary: The footer alignment and button group the text describes have no example to copy.
  - Recommended: Fix. The Dialog's FooterAlignment and FooterContent examples show the same two things; one drawer can show both.
  - Fix: give one of the four Basics drawers a footer with a status `<p>` and a `.ui-actions` group, and another `align="start"`, in all five formats.
  - Fixed: the inline-start drawer's footer uses `align="start"`, and the block-end drawer's footer has status text and a `.ui-actions` group.
- [x] (1) Layout: `.ui-breakpoint-large` is documented in Columns and in the API, but both examples that use a breakpoint class use `.ui-breakpoint-small` (`src/docs/components/layout.astro:146-149`, `src/component-api/layout/api.ts:31-42`, `src/component-examples/layout/Columns.astro:7`, `src/component-examples/layout/Sticky.astro:7`)
  - Summary: The large breakpoint has no example on the page.
  - Recommended: Explain further. A third columns example would look the same in the narrow preview; a sentence saying so may be enough.
  - Fix: either add a `ui-breakpoint-large` variant to the Columns example or note in the prose that the preview is too narrow to show it.
  - Fixed: the Columns section says the preview is narrower than `72rem`, so a large-breakpoint example would stay one column there, and links the Inbox block, whose folders move next to the messages once the block is `72rem` wide.
  > Explain further
  > in cases like this maybe we should have a way to view examples in a separate tab? thoughts?
  - Explained: On the separate tab: yes, and the fix above shows why it's needed. At a 1440px window the Columns preview is 805px wide and its container about 773px (48rem), so only `.ui-breakpoint-small` (40rem) switches on the page, and no preview can show the default (56rem) or `.ui-breakpoint-large` (72rem) switching, since they're wider than the content column. The block viewer already has the pattern: a width toggle and an Open in a new tab link over an iframe of `src/pages/blocks/[block]/preview.astro`. An Open in a new tab link on the examples that opt in with a prop on `<AutoExample>`, backed by a route that renders one example full width, would let Columns show a large-breakpoint example, and every container-query layout (Stepper, Timeline, the spread fields) could use it. A resizable preview (`resize: inline`) would only narrow an example, never widen it past the column. If you want the link, answer with Fix and it becomes its own item.
- [x] (1) List: the ListItem API says a disabled link item drops its `href` and gets `aria-disabled="true"`, but the Clickable example only disables a button item (`src/docs/components/list.astro:214-225`, `src/component-api/list-item/api.ts:30-34`, `src/component-examples/list/Clickable.astro:6-8`)
  - Summary: The disabled link rendering has no example to compare with.
  - Recommended: Fix. One more row in the Clickable example.
  - Fix: `<ListItem disabled href="#clickable-list-item" label="Archived link" />` and the `<a aria-disabled="true">` HTML, in all five formats.
  - Fixed: the Clickable example has a disabled link row, and the prose says how it renders.
- [x] (1) Menu: the Help and "Open in new tab" items link to `/guide/getting-started/`, the legacy unprefixed path, which is a meta-refresh page to the HTML variant, so from `/react/components/menu/` the reader lands on `/html/guide/getting-started/` (`src/component-examples/menu/Basics.astro:14`, `src/component-examples/menu/Basics.html:38`, `src/component-examples/menu/Custom.astro:64`, `src/component-examples/menu/Custom.html:66`, `astro.config.mjs:43`)
  - Summary: Following a menu link on a React, Svelte or Vue page switches the reader to the HTML docs.
  - Recommended: Fix with option A. Example files are static and framework-agnostic, so the fix belongs in the preview wrapper.
  - Options:
    - A (recommended): in `src/components/Example/Example.astro`, rewrite `a[href^="/guide/"]` and `a[href^="/components/"]` inside a preview with `Astro.locals.link()` at render time.
    - B: link to an external page such as `https://developer.mozilla.org/` instead.
  - Fixed: option A, done on the client: the Example wrapper rewrites a `/components/` or `/guide/` link inside a preview to the current framework when the pointer or focus reaches it, with `hrefFor`, so it also works after a React, Svelte or Vue preview hydrates.
- [x] (1) Carousel: the Playground cards use a bare `<hgroup>` while every carousel example, the Card page and the Card API use `<hgroup class="ui-header">`, and the two playground lists always carry `--_block-size: 20rem` while the generated snippet only shows it when Vertical is on (`src/docs/components/carousel.astro:383-387`, `src/docs/components/carousel.astro:362`, `src/docs/components/carousel.astro:379`, `src/docs/components/carousel.astro:481`)
  - Summary: The playground markup differs from the markup the examples teach and from the code it prints.
  - Recommended: Fix. Three attributes in one page.
  - Fix: add `class="ui-header"` to the `hgroup` at line 351 (or render `<UICard>`/`<UICardHeader>` from `opui-css/astro`), and move `--_block-size: 20rem` from the two `style` attributes into the `update()` loop, set only when `state.orientation` is on, so the live markup matches `htmlSnippet`.
  - Fixed: the playground cards use `hgroup.ui-header`, and the script sets `--_block-size: 20rem` only when Vertical is on, like the snippet.
- [x] (1) Tooltip: the page `description` is "Built on top of Anchor.", which is what search results and the components list show, and the prose has filler: headings "Text only..." and "... or any markup you want", "(famous last words)", and "This would be cool to solve with `corner-shape` one day." twice (`src/docs/components/tooltip.astro:19`, `src/docs/components/tooltip.astro:93`, `src/docs/components/tooltip.astro:105-113`, `src/docs/components/tooltip.astro:133-143`)
  - Summary: The Tooltip page's summary says nothing about tooltips, and two sections read as asides.
  - Recommended: Fix. A one-sentence description like the other pages, and plain headings.
  - Fix: `description="A short label or hint that shows while a control is hovered, focused or long-pressed."`; headings "Text" and "Rich content"; drop the parenthesis and the `corner-shape` sentences.
  - Fixed: the description and preamble say what a tooltip is, the headings are "Text" and "Rich content", and the asides are gone.
- [x] (1) Docs: conversational filler on five component pages: "Is it a button? Is it an input? You can find the docs for it here at least." in a File upload section with no example, "Yes of course, they're just buttons.", "The card is extremely versatile", "for more advanced use-cases (which always happen), you might want to add your own styles", "Fair trade.", "Also, don't miss the info on label accessibility" four times, and "on stuff" (`src/docs/components/button.astro:220-227`, `src/docs/components/button-group.astro:146-148`, `src/docs/components/card.astro:53`, `src/docs/components/card.astro:154-156`, `src/docs/components/card.astro:192-193`, `src/docs/components/checkbox.astro:145-163`, `src/docs/components/anchor.astro:57`)
  - Summary: Several pages read as chat instead of the direct technical descriptions the docs guide asks for.
  - Recommended: Fix. Each is a one-sentence rewrite or a deletion.
  - Fix: Button: replace the File upload section with a See also entry or one sentence ("File inputs are documented with <DocLink href="/components/text-field#file">Text field</DocLink>."). Button group: "Buttons in a group take icons like any <DocLink href="/components/button#buttons-with-icon-and-label">Button</DocLink>." Card: drop "extremely versatile", delete the "basic styles here to get you going" paragraph, and end the callout at "selecting text in the card won't work." Checkbox: keep one link to `#labels` in the section intro and drop the "don't miss" sentence from the four slots. Anchor: see the description item.
  - Fixed: the filler on the Button, Button group, Card, Checkbox and Anchor pages is rewritten or gone, the File upload section included.
- [x] (1) Text field: the page has conversational filler: "(which is... never)", "You will have a bad time.", "It should probably be called `<input type="math">` instead.", "It's a very interesting read.", "File is a weird one. Should it really be an `<input>` element? Well, it's what we've got.", and the Date inputs callout's "You're free to implement a solution of your own here" (`src/docs/components/text-field.astro:380-383`, `src/docs/components/text-field.astro:404-417`, `src/docs/components/text-field.astro:432-446`, `src/docs/components/text-field.astro:452-456`)
  - Summary: The number and file sections read as commentary rather than the direct technical descriptions the guide asks for.
  - Recommended: Fix. Trim to the facts: when `type="number"` fits, what `inputmode="numeric" pattern="[0-9]*"` gives, and that date inputs always show their label.
  - Fix: cut the quoted sentences; keep the list of `type="number"` problems and the GOV.UK link with a plain lead-in ("GOV.UK explains why it changed the input type for numbers."). Drop the File paragraph or state what the example shows.
  - Fixed: the number, file and date passages state facts only; the date callout says date and time inputs show their format and ignore `placeholder`.
- [x] (1) Spinner: the Buttons text opens with "Simply add", and the no-spinner section opens with two conversational sentences before the rules (`src/docs/components/spinner.astro:77`, `src/docs/components/spinner.astro:85-88`)
  - Summary: Readers get filler words before the one-line instruction and the two exception rules.
  - Recommended: Fix. The guide's "no fluff" rule applies and the rest of the page is terse.
  - Fix: write `Add aria-busy="true" to a <button>.` and replace the intro paragraph with `aria-busy="true" shows no spinner in two cases.`
  - Fixed: the Buttons text and the no-spinner intro are one direct sentence each.
- [x] (1) Typography: filler in the prose: "Utils that you can plop down wherever." and "Let's put everything together and see how all elements look in a classless, rich-text context." (`src/docs/components/typography.astro:88`, `src/docs/components/typography.astro:282-284`)
  - Summary: Two section intros are chatty where the guide asks for direct descriptions.
  - Recommended: Fix. "Classes for single elements in your own markup." and "Every element in a `.ui-rich-text` article, as plain HTML on every framework page, the way rich text arrives from a CMS."
  - Fix: "Classes for single elements in your own markup." and "Every element in a `.ui-rich-text` article, as plain HTML on every framework page, the way rich text arrives from a CMS."
  - Fixed: the two intros are the suggested direct sentences.
- [x] (1) OneTimeCode: the Sizes, Length, Alphanumeric and Validation descriptions repeat the same sentence in the `astro`, `react`, `svelte` and `vue` slots instead of writing it once in `components` (`src/docs/components/one-time-code.astro:183-204`, `src/docs/components/one-time-code.astro:211-232`, `src/docs/components/one-time-code.astro:239-275`, `src/docs/components/one-time-code.astro:282-307`)
  - Summary: Nothing changes for readers, but four identical paragraphs are kept in sync by hand on the page.
  - Recommended: Fix. The guide's "one copy per wording" rule for `<Conditional>` applies and the Basics section above already uses per-framework slots only where the text differs.
  - Fix: replace the four identical `astro`/`react`/`svelte`/`vue` fragments in each `<Conditional>` with one `<Fragment slot="components">`, keeping the `html` fragment.
  - Fixed: each section has one `components` slot and one `html` slot.
- [x] (1) Form: the AdaptiveOutput description says "Rendered as div and p elements.", text about the example rather than content a Delivery fieldset would have, and the prose under it writes "field set" for the element it calls `Fieldset` elsewhere (`src/component-examples/form/AdaptiveOutput.astro:10`, `src/component-examples/form/AdaptiveOutput.html:8`, `src/component-examples/form/AdaptiveOutput.react.tsx:10`, `src/docs/components/form.astro:237-238`)
  - Summary: The Without fieldset example describes its own markup instead of showing a delivery form, and the prose misspells fieldset.
  - Recommended: Fix. Realistic words and one spelling.
  - Fix: description "Choose how your order gets to you." in all five formats, and "on the fieldset" in the prose.
  - Fixed: the description reads "Choose how your order gets to you." and the prose no longer says "field set".
- [x] (1) Avatar: the Variants example and the Variants prose run filled, tonal, outlined, while `api.ts` lists filled, outlined, tonal, the ascending order (`src/component-examples/avatar/Variants.astro:5-7`, `src/component-examples/avatar/Variants.html:1-3`, `src/docs/components/avatar.astro:90-97`, `src/component-api/avatar/api.ts:60-64`)
  - Summary: The Variants row and prose are not in the order the API table uses.
  - Recommended: Fix. It is a swap of two lines in five files.
  - Fix: put the `outlined` avatar before the `tonal` one in `Variants.astro`, `.html`, `.react.tsx`, `.svelte` and `.vue`, list the classes in that order in `avatar.astro:90-97`, and re-record the parity snapshot with the commit saying so.
  - Fixed: the example, the prose and the `api.ts` description run filled, outlined, tonal.
- [x] (1) Card: the Variants example and the HTML prose run plain, transparent, outlined, tonal, elevated, while the Accordion Variants example with the same five variants runs plain, elevated, outlined, tonal, transparent (`src/component-examples/card/Variants.astro:5-23`, `src/component-examples/card/Variants.html:1-19`, `src/docs/components/card.astro:98-100`, `src/component-examples/accordion/Variants.astro:5-58`)
  - Summary: Two pages show the same variant set in different orders.
  - Recommended: Fix. Ascending order after the default is the repo rule, and Accordion already follows it.
  - Fix: reorder the Card Variants files to plain, elevated, outlined, tonal, transparent, list the classes in that order in `card.astro:98-100`, and re-record the parity snapshot with the commit saying so.
  - Fixed: the Card Variants example and the HTML prose run plain, elevated, outlined, tonal, transparent.
- [x] (1) Callout: the Icon prose and the matching `api.ts` part list the severities as info, success, warning and critical, not in ascending order (`src/docs/components/callout.astro:164-165`, `src/component-api/callout/api.ts:36`)
  - Summary: The severity list in the Icon section is in a different order from the Severities section just above it.
  - Recommended: Fix. One line of prose.
  - Fix: write "critical, info, success and warning" in `callout.astro:168-169` and in the `CalloutIcon` part description of `src/component-api/callout/api.ts:36`.
  - Fixed: the prose and the CalloutIcon part list critical, info, success and warning.
- [x] (1) Examples: the Checkbox, Number field and Range Sizes examples label the smallest size "x-small" in lowercase next to "Small", "Medium" and "Large", while Button, Radio and Select write "X-small" (`src/component-examples/checkbox/Sizes.astro:18`, `src/component-examples/checkbox/Sizes.html:22`, `src/component-examples/number-field/Sizes.astro:7`, `src/component-examples/number-field/Sizes.html:2`, `src/component-examples/range/Sizes.astro:5`, `src/component-examples/range/Sizes.html:2`, `src/component-examples/select/Sizes.astro:5`, `src/component-examples/radio/Sizes.astro:35`)
  - Summary: One size label in three Sizes previews starts with a lowercase letter while its siblings are capitalized.
  - Recommended: Fix. A two-letter change in fifteen files, and the snapshots only change in text.
  - Fix: write `X-small` in all five formats of `checkbox/Sizes`, `number-field/Sizes` and `range/Sizes`, and re-record the three parity snapshots in the same commit, saying so in the message.
  - Fixed: the Checkbox, Number field and Range Sizes examples write "X-small".
- [x] (1) Description list: the Orientation example prices in dollars and the Total example in euros, on the same page with the same Subtotal, Shipping and Total rows (`src/component-examples/description-list/Orientation.astro:17-25`, `src/component-examples/description-list/Total.astro:13-21`)
  - Summary: Two order summaries on one page use different currencies.
  - Recommended: Fix. Pick one currency for both examples in all five formats.
  - Fix: use `€` (or `$`) in both, keeping the Total example's figures.
  - Fixed: both order summaries use euros.
- [x] (1) Form: labels switch between Title Case and sentence case across the page: "User Profile", "Full Name", "Email Address", "Theme Preference", "Light Theme", "System Default", "Experience Level", "Additional Info", "Post Content" and "Favorite Pet" against "Favorite pet" in the anatomy and "Pet food" in Invalid (`src/component-examples/form/KitchenSink.astro:28-97`, `src/component-examples/form/Divider.astro:15`, `src/component-examples/form/FieldsetStacked.astro:12`, `src/docs/components/form.astro:309`)
  - Summary: Some form legends and labels capitalize every word and others only the first.
  - Recommended: Fix. The rest of the docs use sentence case.
  - Fix: sentence case in KitchenSink, Divider and FieldsetStacked, in all five formats.
  - Fixed: the Kitchen sink, Divider and Fieldset stacked examples use sentence case.
- [x] (1) Menu: the Placement example uses "First", "Second", "Third" items, and lists the sides as block-start, block-end, inline-start, inline-end rather than in ascending order (`src/component-examples/menu/Placement.astro:4`, `src/component-examples/menu/Placement.astro:14-50`, `src/component-examples/menu/Placement.html:9-31`)
  - Summary: The placement menus hold numbered placeholders and the sides appear in an arbitrary order.
  - Recommended: Fix. Reuse the Dense example's Copy, Cut, Paste and sort the sides.
  - Fix: `items = [{ label: "Copy" }, { label: "Cut" }, { label: "Paste" }]`, and order the triggers block-end, block-start, inline-end, inline-start, then Align end, in all five formats.
  - Fixed: the items are Copy, Cut and Paste, and the sides are in ascending order.
- [x] (1) Radio: the Required legend reads "These are required!" and the Visible label example fills its third label with hipster ipsum (`src/component-examples/radio/FieldGroupRequired.astro:7`, `src/component-examples/radio/FieldGroupRequired.html:3`, `src/component-examples/radio/VisibleLabel.astro:8-11`, `src/component-examples/radio/VisibleLabel.html:11-15`)
  - Summary: Two Radio previews show an exclamation legend and nonsense filler text where realistic copy would do.
  - Recommended: Fix. Short realistic text is the rule for examples, and the long-label case keeps its point with real words.
  - Fix: use a legend such as `Shipping` with `Standard`, `Express` and `Pickup`, and a long label such as a terms sentence that ends with the `privacy policy` link, in all five formats of both examples, and re-record the parity snapshots in the same commit.
  - Fixed: every radio field group has a coherent realistic set, and the long label is a newsletter sentence with the privacy policy link.
- [x] (1) Switch: the examples use filler and placeholder text: "Long text bacon ipsum dolor amet..." for the long label, "Label" for every Basics and Visible label switch, "Switch 1", "Switch 2", "Switch 3" and "Legend" in all seven field group examples, "These are required!", and "Invalid Switch" (`src/component-examples/switch/VisibleLabel.html:11-15`, `src/component-examples/switch/Basics.html:3`, `src/component-examples/switch/FieldGroup.html:3-15`, `src/component-examples/switch/FieldGroupRequired.html:3`, `src/component-examples/switch/Spread.html:26`)
  - Summary: Most switch examples show no realistic setting, so readers can't see what a switch label looks like in use.
  - Recommended: Fix. Settings names, like the Hidden label and Binding examples already use (Email, Push, SMS).
  - Fix: long label "Send me a weekly summary of activity in the workspaces I belong to, including mentions and replies"; Basics labels "Wi-Fi", "Bluetooth", "Airplane mode", "Location"; field groups "Notifications" with "Email", "Push", "SMS"; "Invalid switch".
  - Fixed: Basics, Visible label, Spread and the field groups use real settings.
- [x] (1) Text field, Textarea: the Validation examples' end texts are jokes ("Only double-negatives are allowed.", "Only letters from the first half of the alphabet are allowed.") with labels "I'm required" and "So am I!", while `ValidationNotes` says to "Say what's wrong in the end text"; the Phone placeholder is "(666) 666-1337" and the Spread name placeholder "Evil Rabbit" (`src/component-examples/text-field/Validation.html:3-41`, `src/component-examples/textarea/Validation.html:23-31`, `src/component-examples/text-field/InputTypes.html:29`, `src/component-examples/text-field/Spread.html:5`)
  - Summary: The error messages readers copy as a model don't say what is wrong.
  - Recommended: Fix. Short realistic text, like the rest of the examples.
  - Fix: labels "Email" and "Company", end texts "Enter an email address." and "Use 2 to 60 characters.", values "ada@" and "A"; phone placeholder "+46 70 123 45 67"; name placeholder "Ada Lovelace". Same in all five formats of each example.
  - Fixed: the end texts say what is wrong, and the phone and name placeholders are realistic.
- [x] (1) Range: the Surfaces labels are CSS equations such as `outlined (default) = var(--ui-field-border-color)`, and Spread and Validation label sliders `Spread Layout` and `Invalid Range` (`src/component-examples/range/Surfaces.astro:5-20`, `src/component-examples/range/Surfaces.html:1-19`, `src/component-examples/range/Spread.astro:5`, `src/component-examples/range/Spread.astro:15`, `src/component-examples/range/Validation.astro:5`)
  - Summary: The Range previews label sliders with token names and title-case descriptions instead of something a form would say.
  - Recommended: Fix. The Progress Surfaces example already shows the pattern with task names, and the token names belong in the section text, where the Variants paragraph already names `--ui-track-bg-color`.
  - Fix: give the three Surfaces ranges plain labels like `Volume`, `Brightness` and `Opacity`, rename `Spread Layout` to `Volume` and `Invalid Range` to `Brightness`, in all five formats, and re-record the parity snapshots in the same commit.
  - Fixed: the ranges are labelled Volume, Brightness and Contrast, and the Variants text names the tokens.
- [x] (1) Form: the FieldGroupHorizontal example labels its checkboxes "Option 1", "Option 2" and "Option 3" under an "Options" legend (`src/component-examples/form/FieldGroupHorizontal.astro:13-17`, `src/component-examples/form/FieldGroupHorizontal.html:7-15`)
  - Summary: The horizontal field group shows placeholder labels instead of a real choice.
  - Recommended: Fix. Short realistic labels, like the Basics example's.
  - Fix: a legend like "Notify me by" with "Email", "Push" and "SMS", in all five formats.
  - Fixed: the legend is Notifications, with Email, Push and SMS.
- [x] (1) Form: the FieldsetRequired example asks for a pet's "Life story" as a required textarea with the description "We must know your pet's information." (`src/component-examples/form/FieldsetRequired.astro:13-17`, `src/component-examples/form/FieldsetRequired.html:12`, `src/component-examples/form/FieldsetRequired.react.tsx:17`)
  - Summary: The required-state example reads as a joke rather than a form people would ship.
  - Recommended: Fix. Keep the structure, change the words.
  - Fix: legend "Pet info", description "Needed for the booking.", fields "Name" and a required "Vaccinations" textarea, in all five formats.
  - Fixed: the fieldset asks for a recipient and a required delivery address.
- [x] (1) Form: the KitchenSink terms checkbox has the end text "Support this text", a leftover placeholder (`src/component-examples/form/KitchenSink.astro:116`, `src/component-examples/form/KitchenSink.html:127`, `src/component-examples/form/KitchenSink.react.tsx:108`)
  - Summary: The Kitchen sink shows the words "Support this text" under the terms checkbox.
  - Recommended: Fix. One string in five files.
  - Fix: "Required to create an account." or drop the end text.
  - Fixed: the end text says the consent can be withdrawn at any time.
- [x] (1) Layout: the card and button examples read "One", "Two", "Three", "Four", "Five", "Six" and "First", "Second", "Third" (`src/component-examples/layout/Column.astro:7-13`, `src/component-examples/layout/Gap.astro:7-24`, `src/component-examples/layout/Grid.astro:7-22`, `src/component-examples/layout/MaxColumns.astro:10-16`, `src/component-examples/layout/Stretch.astro:7-10`, `src/component-examples/layout/Sticky.astro:15-21`)
  - Summary: Most layout previews are numbered boxes rather than the cards or buttons they stand for.
  - Recommended: Fix. Composition and List already use team names; the others can use the same kind of content.
  - Fix: short realistic card titles (plan names, stats) and button labels (Share, Export, Print) in all five formats.
  - Fixed: the layout examples show tasks, days, teams, features, stats and settings instead of numbered boxes.
- [x] (1) List: several examples use placeholder or meta text: "Checkbox 1", "Radio 1", "Switch 1", "So / Many / Borders", "I need borders / Help / Thanks", "Inset class" with "Any div.ui-start will be hidden when inset", and a Selected item whose description is 'This item has aria-current="page" on its link' with `href="#"` (`src/component-examples/list/EndCheckbox.astro:7-11`, `src/component-examples/list/EndRadio.astro:7-11`, `src/component-examples/list/EndSwitch.astro:7-11`, `src/component-examples/list/Bordered.astro:6-8`, `src/component-examples/list/SingleBorder.astro:6-8`, `src/component-examples/list/Inset.astro:21-26`, `src/component-examples/list/Selected.astro:6-12`)
  - Summary: Half the List examples show labels about the example instead of the contacts, files or settings the Usage list promises.
  - Recommended: Fix. The Flush and EndKeyboard examples already show the realistic style.
  - Fix: settings labels for the checkbox, radio and switch rows ("Email digest", "Weekly"), file or contact names for Bordered, SingleBorder and Inset, and a navigation list with section hrefs for Selected, in all five formats.
  - Fixed: the List examples use settings, contacts and mailboxes, and Selected links to a real section.
- [x] (2) Examples: the Range Value and Checkbox Basics HTML examples import `opui-css/css/js/range.js` and `opui-css/css/js/checkbox.js` by package name (`pnpm build-examples` writes them from the Astro examples), which only a bundler resolves. Copied into a page without a build step, as the 6.0.0 Plain HTML check does, they throw "Failed to resolve module specifier", while Concepts offers a CDN tab for the same imports (`src/component-examples/range/Value.html:27-29`, `src/component-examples/checkbox/Basics.html:22-26`)
  - Summary: Copying the Range or Checkbox example into a plain HTML page breaks its script.
  - Recommended: Fix with option A. HTML examples are for pages without a build step.
  - Options:
    - A (recommended): import from `https://cdn.jsdelivr.net/npm/opui-css@6/css/js/` in the HTML examples, like the CDN tab in Concepts.
    - B: show the HTML examples' scripts with a CDN and a Bundler tab, like Concepts.
  - Fixed: another way than option A, which would have the docs site and the HTML fixture pages fetch an unpublished `opui-css@6` from the CDN at run time: the site resolves these package names with an import map (`src/utils/import-map.ts`), and a plain page can do the same. The Getting started HTML page now shows one import map that points `opui-css/` at jsDelivr, so every HTML example runs as copied, the `elements/` imports included, which the item's two files only began.
- [x] (2) Docs: the README's framework sections leave out steps a fresh project needed with `opui-css@6.0.0-rc.1`: Astro says to add the reference to `env.d.ts`, which new Astro projects no longer have, and doesn't say to import the CSS once in the layout; React, Svelte and Vue show a CSS `@import` for "your app entry" without saying where that is (a CSS file imported by `main.tsx`, the Next root layout, `+layout.svelte`, Nuxt's `css` array). A Nuxt 4.6 project also built and rendered on the server without the `build.transpile` the README asks for (`packages/opui/README.md:26-37`, `packages/opui/README.md:41`, `packages/opui/README.md:103`, `packages/opui/README.md:128`)
  - Summary: New users have to guess where the CSS import goes in their framework and that Astro needs an env.d.ts file.
  - Recommended: Fix. The steps come from the fresh projects of the release candidate.
  - Fix: say to create `src/env.d.ts` if it's missing, add one line per framework on where the import goes, and check `build.transpile` in Nuxt 4 before changing that note.
  > Fix
  - Fixed: in `packages/opui/README.md`: the Astro section says to import the CSS once in the layout every page uses, and to create `src/env.d.ts` for the reference when the project has none, since a new project's `tsconfig.json` already includes it; React, Svelte and Vue name where the CSS import goes (a CSS file that `main.tsx` or `main.ts` imports in Vite, `app/globals.css` in Next.js, one that `src/routes/+layout.svelte` imports in SvelteKit, the `css` array of `nuxt.config` in Nuxt). The Nuxt `build.transpile` note stays as it is: checking it needs a fresh Nuxt 4 project, which this session didn't build, and the extra setting costs nothing where it isn't needed.
- [x] (2) API docs: `text-field.css` and `toggle-button.css` style `input[aria-disabled="true"]` the same as `:disabled`, but the `disabled` rows of TextField, Textarea and ToggleButton only document `[disabled]`, while Checkbox, Radio and Switch list both in `values` and explain the difference; the Toggle docs page already explains `aria-disabled="true"`, so its API table is behind its own page (`src/component-api/text-field/api.ts:58-67`, `src/component-api/textarea/api.ts:53-62`, `src/component-api/toggle-button/api.ts:27-36`, `packages/opui/css/components/text-field.css:288`, `packages/opui/css/components/text-field.css:426`, `packages/opui/css/components/toggle-button.css:72`, `src/component-api/switch/api.ts:57-70`, `src/docs/components/toggle.astro:287-296`)
  - Summary: The API tables of the fields and the toggle button don't say that `aria-disabled="true"` gets the disabled look.
  - Recommended: Fix. The Switch row is the model, and the change is three rows.
  - Fix: give the three `disabled` rows the Switch shape, with a description that fits a field (`aria-disabled` doesn't block typing); for ToggleButton, reuse the wording of `src/docs/components/toggle.astro:306-311`.
    ```ts
    {
      default: "false",
      description:
        'Dims the field and blocks input. `aria-disabled="true"` looks the same, but keeps the field focusable and editable and its value in the form, so block the change with a script.',
      group: "Disabled",
      inherited: true,
      part: "input",
      prop: "disabled",
      type: "boolean",
      values: {
        "aria-disabled": '[aria-disabled="true"]',
        disabled: "[disabled]",
      },
    },
    ```
  - Fixed: the TextField, Textarea and ToggleButton `disabled` rows list `[disabled]` and `[aria-disabled="true"]` and explain the difference, like Switch.
- [x] (2) Accordion: the `markerAnimation` description says `turn` "gives a chevron that points to the inline end a quarter turn, so it points down when open", but the default `AccordionSummary` marker is a chevron that points down, so `markerAnimation="turn"` with the default marker ends pointing to the inline start when open; the example replaces the marker with a right-pointing one without saying why (`src/component-api/accordion/api.ts:36`, `packages/opui/components/Accordion/icons.ts:1-2`, `packages/opui/css/components/accordion.css:152-154`, `src/component-examples/accordion/MarkerAnimation.astro:27-44`, `src/docs/components/accordion.astro:250-275`)
  - Summary: Setting `markerAnimation="turn"` on an accordion with the default marker turns the chevron sideways instead of down when it opens.
  - Recommended: Fix. The description and the page need one sentence that names the marker `turn` expects.
  - Fix: say that `turn` is for a marker that points to the inline end, which the default one doesn't, so it goes with the `marker` slot (as the example does), in `api.ts` and in `accordion.astro:262-267`.
    ```ts
    description:
      "How the marker animates when the accordion opens. `rotate` turns it upside down and `flip` mirrors it. `turn` is for a chevron that points to the inline end, which the default marker isn't: it turns a quarter turn, so it points down when open.",
    ```
  - Fixed: the `api.ts` description and the Marker animation section say that `turn` expects a marker that points to the inline end, which the default chevron doesn't.
- [x] (2) Button: the `.ui-text` label wrapper is not a part: the Button and Button group pages tell readers to wrap the label in `<span class="ui-text">` next to an icon, the anatomy subject and the IconAndLabel examples use it, and `button-group.css` styles the `span` for `overflow="shrink"`, but `api.ts` only lists the `svg` and `kbd` parts, unlike Chip, whose API has `.ui-chip > .ui-text` (`src/component-api/button/api.ts:102-113`, `src/docs/components/button.astro:147-168`, `src/docs/components/button.astro:256`, `src/docs/components/button-group.astro:150-159`, `packages/opui/css/components/button-group.css:170-173`, `src/component-api/chip/api.ts:115`)
  - Summary: The Button anatomy shows the icon and the keyboard hint but not the `.ui-text` label wrapper the page tells readers to add.
  - Recommended: Fix. Adding one part matches Chip and the examples on the page.
  - Fix: add the label part between the icon and the `kbd`, in visual order, and let the default slot description mention it.
    ```ts
    {
      code: '<span class="ui-text">',
      description:
        "The label, in a `<span class=\"ui-text\">` when the button has an icon. The CSS looks for the wrapper, the class is a hook for your own styles.",
      selector: ".ui-button > .ui-text",
    },
    ```
  - Fixed: a label part sits between the `svg` and `kbd` parts, with the selector `.ui-button > span` and the code `<span class="ui-text">`, since `button.css` styles the `span` itself.
- [x] (2) Layout: the page has no `browserSupport` at all, while `layout.css` uses container queries for `.ui-layout-columns` and `.ui-layout-container` (`@container (inline-size >= 40rem)` and `container-type: inline-size`); the guide says `container-queries` stays listed even though it is widely available, and the check only requires it once a page lists some widely available id (`src/docs/components/layout.astro:12-23`, `packages/opui/css/components/layout.css:96-118`, `packages/opui/css/components/layout.css:182`)
  - Summary: The Layout page shows no browser support chips although its column classes need container queries.
  - Recommended: Fix. Description list, Stepper and Timeline list the same id for the same reason.
  - Fix: add the prop to the `Component` call.
    ```astro
    browserSupport={["container-queries"]}
    ```
  - Fixed: the page lists `container-queries`, which the check now requires and `--write` added after the slug.
- [x] (2) Table: the `overflow-clip` pattern also matches `overflow-clip-margin:`, but web-features files that property under its own id, `overflow-clip-margin`, which lists Firefox only (Chrome's length-only support counts as partial, Safari has none); `table.css` relies on it to keep focus rings inside the clipped table from being cut off, so Safari readers see a widely available "overflow: clip" chip for a declaration Safari ignores (`packages/opui/scripts/features.mjs:107-111`, `packages/opui/css/components/table.css:16-19`, `src/docs/components/table.astro:55-62`)
  - Summary: In Safari the focus ring of a control at the edge of a Table is clipped, and the chips say every feature the table uses is widely available.
  - Recommended: Fix with option A. Listing the id would mark Chrome as unsupported, which is wrong for the length form the table uses.
  - Fix: confirm first on `/html/components/table/` in Safari by tabbing to a link or button in an edge cell.
  - Options:
    - A (recommended): make the pattern match only its feature's compat keys (`overflow`, `overflow-x`, `overflow-y`, `overflow-block`, `overflow-inline` with `clip`) and add a `## Limitations` item for the clipped focus ring in Safari.
      ```js
      {
        id: "overflow-clip",
        pattern: /\boverflow(?:-block|-inline|-x|-y)?:\s*(?:[\w-]+\s+)?clip\b/,
      },
      ```
    - B: add `{ id: "overflow-clip-margin", pattern: /\boverflow-clip-margin:/ }` and list `overflow-clip-margin` on the Table page. The chip then shows Chrome and Safari as unsupported, Chrome wrongly, until web-features splits the length form from the `<visual-box>` keywords.
  - Fixed: option A: the pattern matches only `overflow` and its axis longhands with `clip`. The Safari focus ring question moved to a To check item.
- [x] (2) Callout: the page recommends a callout for feedback that appears after an action, "an error summary above a form or a message after saving", but the Accessibility section says nothing about announcing a callout inserted after the page loads: a saved message needs `role="status"` and an error summary needs focus moved to it or a live region (`src/docs/components/callout.astro:84-87`, `src/docs/components/callout.astro:182-195`)
  - Summary: A callout that appears after saving or submitting is silent for screen readers unless the author adds a live region or moves focus.
  - Recommended: Fix. It is one list item in the Accessibility slot, and it matches how the Toaster announces its callouts.
  - Fix: add an item to the Accessibility list: a callout that appears after an action takes `role="status"` for a confirmation, and an error summary takes `tabindex="-1"` and receives focus (or `role="alert"`), with the attribute passed through `...rest` in every framework.
  - Fixed: the Accessibility list says to put a message after saving in a `role="status"` element already on the page, and to move focus to an error summary with `tabindex="-1"`.
- [x] (2) Table: the Normal density example has a "Select all" header checkbox that does nothing, and its row checkboxes and footer make it the odd one out next to Dense and Spacious; the library ships `SelectAll` / `<opui-select-all>` for this (`src/component-examples/table/Normal.html:7-12`, `src/component-examples/table/Normal.astro:19-21`, `src/component-examples/table/Normal.react.tsx:19-21`, `src/component-examples/checkbox/Indeterminate.html:1-28`)
  - Summary: Clicking Select all in the first table on the page selects nothing.
  - Recommended: Fix with option B. The density examples then compare like for like, and select all stays documented where it belongs.
  - Fix: confirm on `/html/components/table/` (Normal) that the header checkbox leaves the rows unchecked.
  - Options:
    - A: wrap the table in `SelectAll` (`<opui-select-all class="ui-select-all">` plus the `select-all.js` import in HTML) and mark the header checkbox `data-select-all`, in all five formats.
    - B (recommended): drop the checkbox column and the footer from Normal so it mirrors Dense and Spacious (Band, Name, Instrument), and link the Checkbox page's Select all section from Controls in cells for tables with selection.
  - Fixed: option B: Normal has the columns and rows of Dense and Spacious, without the checkbox column and footer, and Controls in cells links the Checkbox page's Select all section.
- [x] (2) Checkbox: the Hidden label example's table has a "Select all" checkbox in the header that selects nothing, while the Select all section on the same page says `SelectAll` "works around a Table" (`src/component-examples/checkbox/HiddenLabel.astro:17`, `src/component-examples/checkbox/HiddenLabel.html:4-8`, `src/docs/components/checkbox.astro:286-305`)
  - Summary: Clicking Select all in the Hidden label table does nothing.
  - Recommended: Fix. Wrap the table in the component the page already documents.
  - Fix: `<SelectAll>` around `<Table>` with `data-select-all=""` on the header checkbox in `HiddenLabel.astro`, `.react.tsx`, `.svelte` and `.vue`; `<opui-select-all class="ui-select-all">` around the `<table>` plus the `import "opui-css/elements/select-all.js"` module script in `HiddenLabel.html`, as in `Indeterminate.html:26-28`.
  - Fixed: the Hidden label table is wrapped in `SelectAll` and its header checkbox has `data-select-all`.
- [x] (2) Text field, Textarea: `hideLabel` is in both APIs and the Table page tells readers to use it for controls in cells, but neither page shows it; the Text field page's "Do I have to use `<label>`?" section instead says the component renders a `<label>`, "so name the input with `aria-label` when it has no visible label" (`src/component-api/text-field/api.ts:77-83`, `src/component-api/textarea/api.ts:72-78`, `src/docs/components/text-field.astro:504-522`, `src/component-examples/text-field/NoLabel.astro:5`, `src/docs/components/table.astro:220-232`)
  - Summary: The Text field page sends readers to `aria-label` for a hidden label while the API and the Table page offer `hideLabel`.
  - Recommended: Fix. Rename the section and show `hideLabel` first, with `aria-label` on a `<div>` as the HTML fallback.
  - Fix: section "Hidden label" with `<TextField hideLabel label="Search" placeholder="Search" />` (HTML: `.ui-sr-only` instead of `.ui-label`) as the recommended form, and the current `aria-label` form as the alternative for markup without a `<label>`. Add a Hidden label example to Textarea the same way.
  - Fixed: the Text field page has a Hidden label section that shows `hideLabel` first and `aria-label` as the HTML fallback, and Textarea has its own Hidden label example.
- [x] (2) Number field: `spread`, `error`, `required` and `startText` are documented but no example on the page uses them (`src/component-api/number-field/api.ts:62-69`, `src/component-api/number-field/api.ts:98-107`, `src/component-api/number-field/api.ts:120-127`, `src/component-api/number-field/api.ts:151-156`, `src/docs/components/number-field.astro:116-243`)
  - Summary: Four Number field options have no preview, so readers can't see spread, invalid, required or start text next to the step buttons.
  - Recommended: Fix. The Select and Range pages already have Spread and Validation sections to mirror, and `startText` already renders in the anatomy.
  - Fix: add `Spread` (label and start text left, field right) and `Validation` (`required` with an empty value, and `error` with an end text such as `Only 10 left in stock.`) examples in the five formats, and show `startText` in Spread or End text.
  - Fixed: Validation and Spread examples and sections show all four.
- [x] (2) Accordion: `AccordionActions` `align="start"` / `.ui-align-start` is explained in the Actions prose and listed in the Accordion actions API, but no example shows it; the Card page has an Alignment example for the same prop (`src/docs/components/accordion.astro:177-196`, `src/component-examples/accordion/Actions.astro:20-23`, `src/component-api/accordion-actions/api.ts:6-12`)
  - Summary: Readers are told the actions can line up with the content but never see it.
  - Recommended: Fix. A second accordion in the Actions example.
  - Fix: add a second `<Accordion open variant="elevated">` to `Actions.astro`, `.html` (`<div class="ui-actions ui-align-start">`), `.react.tsx`, `.svelte` and `.vue` with `<AccordionActions align="start">`, and mention it in the prose ("The second accordion lines them up with the content.").
  - Fixed: the Actions example has a second accordion with `align="start"`.
- [x] (2) Avatar: the Grouped section says a Badge on an avatar in a group sits on the avatar's start side, which `badge.css` implements, but neither the Avatar nor the Badge page has an example of a badge on a grouped avatar (`src/docs/components/avatar.astro:177-181`, `packages/opui/css/components/badge.css:131-138`)
  - Summary: The one combination the Grouped section describes is the one it does not show.
  - Recommended: Fix. One extra avatar in the Grouped example.
  - Fix: wrap one avatar of `Grouped.astro` and its four siblings in `<Badge dot color="success" label="Online">`, with the HTML as `<span class="ui-badge ui-dot ui-success">` around the `.ui-avatar` plus `.ui-floating > .ui-indicator > .ui-sr-only`, and add `badge.css` as an `isDependency` installation tab if the page then needs it.
  - Fixed: the Grouped example ends with an avatar in a dot Badge labelled Online, and the prose points to it.
- [x] (2) Layout: the Sticky example's scrolling column is three one-line cards, so nothing scrolls past the sticky card and the preview never shows it sticking (`src/component-examples/layout/Sticky.astro:13-23`, `src/component-examples/layout/Sticky.html:9-19`, `src/docs/components/layout.astro:153-160`)
  - Summary: The Sticky preview looks identical to the Columns preview.
  - Recommended: Fix with option A. Real content shows the behavior and reads like the other layout examples.
  - Fix: give the right column enough content to scroll past the preview, in all five formats, and `max-block-size` with `overflow: auto` on the preview if page scroll isn't enough.
  - Options:
    - A (recommended): several cards with two or three lines of text each.
    - B: a `min-block-size` on the column.
  - Fixed: option A: five longer cards in a scrolling region, since the docs preview never scrolls on its own. The card stays put while the region scrolls in Chromium.
- [x] (2) Chip: the Pressed example says to switch `aria-pressed` in a script, but none of the five formats has one, so clicking the filter chips does nothing (`src/docs/components/chip.astro:209-211`, `src/component-examples/chip/Pressed.astro:5-13`, `src/component-examples/chip/Pressed.html:1-19`, `src/component-examples/chip/Pressed.react.tsx:3-27`)
  - Summary: The pressed chips look like filters but don't toggle when clicked.
  - Recommended: Fix. The Dialog CloseBehaviors example shows the same script-per-format pattern.
  - Fix: a `<script>` in the Astro and HTML files that flips `aria-pressed` within each `example-row` on click, `useState` in React, `$state` in Svelte and `ref` in Vue.
  - Fixed: the Pressed example flips `aria-pressed` on click, with a script in Astro and HTML and state in hand-written React, Svelte and Vue files. The first row is Open, In review and Closed, since each chip toggles on its own.
- [x] (2) Form: the Basics example's Send button is `type="submit"` in a `<form>` with no `action`, no `name` attributes and no `required` fields, so clicking it on the docs page submits the form, reloads the page with `?` and loses the scroll position; the Kitchen sink does the same once its required fields are filled (`src/component-examples/form/Basics.astro:23`, `src/component-examples/form/Basics.html:21`, `src/component-examples/form/Basics.react.tsx:23`, `src/component-examples/form/KitchenSink.astro:124`, `src/component-examples/form/KitchenSink.html:133`)
  - Summary: Pressing Send in the Form examples reloads the docs page.
  - Recommended: Fix with option A. It keeps `type="submit"` in the code readers copy, which is the realistic markup.
  - Options:
    - A (recommended): in the Example preview wrapper, listen for `submit` on forms inside `.example` and call `preventDefault()`, so every form example stays put.
    - B: drop `type="submit"` from the examples; `Button` renders `type="button"` by default (`packages/opui/components/tag.ts:5`).
  - Fixed: option A: the Example wrapper calls `preventDefault()` on a `submit` inside a preview, so every form example stays on the page and the examples keep `type="submit"`.
- [x] (2) Switch: the Spread example shows a required switch with "You must accept this to proceed.", a terms-acceptance choice submitted with a form, which the page's own When not to use says is a Checkbox (`src/component-examples/switch/Spread.html:7-11`, `src/component-examples/switch/Spread.astro:10-13`, `src/docs/components/switch.astro:103-106`)
  - Summary: The Spread example demonstrates the one case the page says not to use a Switch for.
  - Recommended: Fix. Keep `required` but make it a setting, in all five formats.
  - Fix: label "Two-factor authentication", end text "Required for admin accounts."
  - Fixed: the required switch is a two-step login setting.
- [x] (2) Card: the Actions example texts contradict what they show: the end-aligned cards say "Notice how the buttons are made to align with the text above.", and the Actions, Alignment and Header examples carry filler ("Trying other button types too. Look at that!", "Icon buttons work too!", "My ultra-great blog post" / "Please read it.") (`src/component-examples/card/Actions.astro:7`, `src/component-examples/card/Actions.html:3`, `src/component-examples/card/Alignment.astro:6`, `src/component-examples/card/Alignment.astro:14`, `src/component-examples/card/Alignment.astro:22`, `src/component-examples/card/Header.astro:8-9`)
  - Summary: The Actions cards tell readers the buttons line up with the text while they sit at the end, and the rest is filler.
  - Recommended: Fix. Swap the sentences for ones that match, in all five formats.
  - Fix: Actions: "Buttons sit at the end of the card.", "Any Button variant works in the actions.", "Icon-only buttons too."; Alignment: short sentences without the exclamations; Header: plain content; in all five formats, and re-record the parity snapshots with the commit saying so.
  - Fixed: the Card Actions, Alignment and Header examples carry realistic content.
- [x] (2) Anchor: the preamble "A structural primitive to enable CSS Anchor Positioning on stuff." is also the page's meta description, since the page exports no `description` and `Document.astro` falls back to the preamble text (`src/docs/components/anchor.astro:56-58`, `src/layouts/Document.astro:48-50`)
  - Summary: Search results and link previews for the Anchor page end in "on stuff".
  - Recommended: Fix. One sentence, plus a `description` export like the other pages have.
  - Fix: `export const description = "Anchor places floating content next to an element with CSS anchor positioning, always visible or on hover."` in the frontmatter, pass `description={description}` to `<Component>`, and use the same sentence in the preamble.
  - Fixed: the page exports a description, and the preamble says Anchor places floating content next to an element with CSS anchor positioning and is the base of Tooltip.
- [x] (2) Examples: four Astro examples build their icons as a string in the frontmatter and inject it with `<Fragment set:html={...} />`, so the Astro code tab shows a doc-only shortcut instead of the `<svg>` readers would write; the React, Svelte, Vue and HTML files inline the SVG (`src/component-examples/button/IconOnly.astro:4-9`, `src/component-examples/button-group/SplitButton.astro:4-14`, `src/component-examples/button-group/Vertical.astro:4-11`, `src/component-examples/button-group/WithIcons.astro:4-15`)
  - Summary: The Astro code tab for these examples teaches `set:html` with an HTML string rather than the markup the component takes.
  - Recommended: Fix with option B. It keeps the preview short and gives the code tab plain markup.
  - Fix: confirm on `/astro/components/button/` (Icon-only) that the code tab shows `const editIcon = \`<svg ...\``and`<Fragment set:html={editIcon} />`.
  - Options:
    - A: inline the `<svg>` in each `<Button>` like the Vue files do, accepting the longer source.
    - B (recommended): keep the preview files and add `IconOnlyCode.astro`, `SplitButtonCode.astro`, `VerticalCode.astro` and `WithIconsCode.astro` that show one inline `<svg aria-hidden="true"> <!-- --> </svg>` per button, as `IconAndLabelCode.astro` does.
  - Fixed: option B: IconOnlyCode, SplitButtonCode, VerticalCode and WithIconsCode show an inline `svg` per button in the code tab.
- [x] (2) Accordion: every example body is lorem ipsum, 30 files, while the other components use realistic text (`src/component-examples/accordion/Basics.astro:8-14`, `src/component-examples/accordion/Variants.html:19-24`, `src/component-examples/accordion/Group.astro:14-18`, `src/component-examples/accordion/MarkerAnimation.astro:8-12`)
  - Summary: The Accordion page is the only one whose examples show placeholder Latin instead of content a reader could copy.
  - Recommended: Fix. Short FAQ-style text that fits the summaries, in all five formats per example.
  - Fix: give each accordion a question-like summary and a one-sentence answer, like `<AccordionSummary>Can I change my plan later?</AccordionSummary>` with `<p>Yes. Upgrades apply right away and downgrades at the next renewal.</p>`, then re-record the parity snapshots with the commit saying so.
  - Fixed: every accordion example carries short FAQ-style text.
- [x] (2) Drawer: the Basics example fills all four drawers with Lorem ipsum, nine paragraphs in the first, in every format, while the Dialog's Long content example uses realistic terms text (`src/component-examples/drawer/Basics.astro:31-75`, `src/component-examples/drawer/Basics.html:80-124`, `src/component-examples/drawer/Basics.react.tsx:47-94`, `src/component-examples/drawer/Basics.svelte:39-156`, `src/component-examples/drawer/Basics.vue:45-164`)
  - Summary: Every drawer on the page opens on Latin filler text.
  - Recommended: Fix. Match the Usage list: navigation, filters and item details.
  - Fix: give each drawer content for its name, such as a List of links in Inline Start, a filter Fieldset in Inline End, a short notice in Block Start and a details DescriptionList in Block End, keeping one drawer long enough to scroll.
  - Fixed: the drawers hold navigation, task details long enough to scroll, notifications and filters.
- [x] (2) Callout: the example text talks about the component instead of showing content: "This is a tonal Callout. Notice the lack of icons - it's not really needed here.", "Why not use a Card since they look very similar?..." with a dead `href="#"` link, and ten "This is a tonal/outlined X Callout" bodies (`src/component-examples/callout/Variants.astro:7-21`, `src/component-examples/callout/Variants.html:3-17`, `src/component-examples/callout/Severities.astro:7-41`, `src/component-examples/callout/Icon.astro:18`)
  - Summary: The callouts on the page describe themselves rather than show a note, a warning or an error a reader would write.
  - Recommended: Fix. Short realistic bodies, one per severity.
  - Fix: Variants: "Note / Changes to billing apply at the next renewal." and "Scheduled maintenance / The API is read-only on Sunday from 02:00 to 04:00 UTC." (drop the Card link, which the Usage list already covers). Severities: one sentence each, like "Payment failed. Update your card to keep the account active." for critical and "Backup finished." for success. Re-record the parity snapshots with the commit saying so.
  - Fixed: the callout examples carry one realistic message per severity, and the dead link is gone.
- [x] (2) Checkbox: the Validation example's end texts are the song lyric "Check yourself" / "Before you wreck yourself", the Visible label example's long label is hipster ipsum, and the Required group's legend is "These are required!" (`src/component-examples/checkbox/Validation.astro:14`, `src/component-examples/checkbox/Validation.astro:18`, `src/component-examples/checkbox/VisibleLabel.astro:11-13`, `src/component-examples/checkbox/FieldGroupRequired.astro:13`)
  - Summary: Three Checkbox examples show joke text where a label and an error message belong.
  - Recommended: Fix. Realistic strings in all five formats of each example.
  - Fix: Validation: end texts "Required to continue." and "Accept the terms to continue."; VisibleLabel: "I agree to the <a class="ui-link" href="#visible-label">privacy policy</a> and to receive product updates by email, which I can stop at any time."; FieldGroupRequired: legend "Notifications". Re-record the parity snapshots with the commit saying so.
  - Fixed: the checkbox Validation, Visible label and field group examples carry realistic labels, legends and end texts.
- [x] (2) Select: the Variants, End text and Sizes examples label every field `Label` with options `Option Two` and `Option Three`, Validation offers `Pick me!`, `No me!!`, `Come on!`, `Also wrong!` and `Nothing's right!`, and Spread labels fields `Required`, `Disabled` and `Invalid Select` with `Option 1` (`src/component-examples/select/Variants.astro:5-17`, `src/component-examples/select/EndText.astro:5-17`, `src/component-examples/select/Sizes.astro:5-24`, `src/component-examples/select/Validation.astro:6-34`, `src/component-examples/select/Spread.astro:28-47`)
  - Summary: Half of the Select previews read as placeholders or jokes, unlike Affix, Grouped and Preselected, which use currencies, cars and roles.
  - Recommended: Fix. Realistic short text is the rule for examples, and the same page already has good lists to reuse.
  - Fix: reuse real lists (`Country`, `Role`, `Team`) in Variants, End text and Sizes, make Validation a required `Country` select and an invalid `Shipping method` with `Pick another option.`, and give the Spread states real labels, in all five formats, re-recording the parity snapshots in the same commit.
  - Fixed: the examples use roles, teams, countries, plans and payment methods.
- [x] (2) Form: the FieldsetDisabled example is "Pet dating" with "Horse Tinder" and "OnlyHorseFans" checkboxes (`src/component-examples/form/FieldsetDisabled.astro:12-16`, `src/component-examples/form/FieldsetDisabled.html:2-21`, `src/component-examples/form/FieldsetDisabled.react.tsx:12-19`, `src/component-examples/form/FieldsetDisabled.svelte:12-16`, `src/component-examples/form/FieldsetDisabled.vue:13-17`)
  - Summary: The disabled fieldset example shows joke content that people copy into their own forms.
  - Recommended: Fix. Keep the structure, change the words.
  - Fix: legend "Notifications", description "Managed by your organization.", checkboxes "Email" and "SMS", in all five formats.
  - Fixed: the disabled fieldset is Security alerts with Email and SMS and an administrator note.
- [x] (3) OneTimeCode: the Sizes section says "Choose between three sizes" (`small`, default, `large`) in every framework and the Sizes example shows three, but the `size` type, the API table and the CSS have four: `x-small`, `small`, `medium` and `large` (`src/docs/components/one-time-code.astro:181-207`, `packages/opui/components/OneTimeCode/types.ts:8`, `src/component-api/one-time-code/api.ts:117-128`, `packages/opui/css/components/one-time-code.css:138-141`, `src/component-examples/one-time-code/Sizes.html:1-39`)
  - Summary: The page says a one-time code has three sizes while the API table under it lists four.
  - Recommended: Fix with option A. The CSS and the type already support `x-small`, so the page and the example should show it like the other field pages do.
  - Fix: confirm on `/html/components/one-time-code/` (Sizes) that `.ui-x-small` renders.
  - Options:
    - A (recommended): change the five paragraphs to "Choose between four sizes with the `size` prop: `x-small`, `small`, `medium` (the default) and `large`." (HTML: "`.ui-x-small`, `.ui-small`, default and `.ui-large`"), add an X-small field first in the Sizes example in every framework, and re-record the parity snapshot in the same commit, saying so in the message.
    - B: drop `x-small` from the type, the `values` in `api.ts` and the `&.ui-x-small` selector in `one-time-code.css`. That is a Breaking change that needs a CHANGELOG entry, a What's new note and a `MIGRATING.md` section.
  - Fixed: option A: the section names all four sizes, and the example adds an X-small field first.
- [x] (3) Copy: the page doesn't list `anchor-positioning`, yet the floating "Copied" popover is placed with anchor positioning against its implicit anchor (the `commandfor` button): `anchor-size(block)`, `position-area`, `position-try-fallbacks` and `position-visibility`; the `anchor-positioning` pattern only matches `anchor-name:` and `position-anchor:`, which the implicit anchor needs neither of, so the check can't see it (`packages/opui/css/components/copy.css:39`, `packages/opui/css/components/copy.css:56-58`, `packages/opui/scripts/features.mjs:61`, `src/docs/components/copy.astro:24-36`)
  - Summary: The Copy chips don't say the popover needs anchor positioning, which Firefox doesn't have.
  - Recommended: Fix. Every other sheet that uses these properties already lists the id, and the Badge `ignore` entry keeps covering its `position-anchor: auto` reset.
  - Fix: widen the pattern to the properties, functions and at-rule the feature's compat keys cover, then add `anchor-positioning` to the Copy page. With the wider pattern the check flags Copy on its own; Tooltip, Anchor, Menu, Tabs, Dialog, Drawer and Carousel already list the id, and Badge stays in `ignore` (`scripts/check-browser-support.mjs:354`).
    ```js
    {
      id: "anchor-positioning",
      pattern:
        /\b(?:anchor-name|anchor-scope|position-anchor|position-area|position-try(?:-fallbacks|-order)?|position-visibility):|\banchor(?:-size)?\(|@position-try\b/,
    },
    ```
  - Fixed: the pattern covers every property, function and at-rule of the feature's compat keys, with matches inside `@position-try` blocks left out since a rule that names them already counts, and the Copy page lists the id.
- [x] (7) Release: the Getting started pages install with `npm install opui-css` and `pnpm add opui-css`, which install 5.4.3 while `latest` points there; its exports map turns every `.css` import on those pages into `*.css.css`, and it has no `./react` or `./svelte` export. 6.0.0-rc.1 on `next` lacks `./elements/*` (`src/docs/guide/getting-started/partials/InstallCommand.astro:5-18`)
  - Summary: Following the install steps today gets 5.4.3, and the imports on the page fail to resolve.
  - Recommended: Fix with option A. The pages stay correct whether or not 6.0.0 ships first.
  - Options:
    - A (recommended): release 6.0.0 with `./elements/*` in its exports before the docs go live; until then show the unreleased note in Install via NPM on all five pages
    - B: change the commands to `opui-css@next` until 6.0.0 is `latest`
  > Fix with option A
  - Still open: The note part is done: `InstallCommand.astro` shows a warning under the install commands on all five Getting started pages while the next major is unreleased. It says the commands install the published version, that `opui-css@next` has the release candidate without the `elements/` scripts, and how to build the package from the repository. It disappears on its own once the release is dated. Left: publishing 6.0.0 with `./elements/*` in its exports, which is yours to do.
  - Still open: Re-checked: nothing is left in the repository. `packages/opui/package.json` (6.0.0-rc.1) exports `./elements/*`, and the unreleased note shows under Install via NPM on the five Getting started pages. npm still has `latest` at 5.4.3 and `next` at 6.0.0-rc.1, which was published before `./elements/*` was added. Left: publishing 6.0.0 as `RELEASING.md` describes, which is yours to do.
  - Removed: the docs treat 6.0.0 as released, so the unreleased note is gone and nothing is left in the repository. Publishing 6.0.0 is the release itself.
- [x] (1) Callout: the Accessibility section doesn't say that a callout's severity reaches screen readers only through its words. `CalloutIcon` renders an `aria-hidden` icon and the severity class only changes color, while the Chip page tells readers to keep a status in the label (`src/docs/components/callout.astro:150-157`, `packages/opui/components/Callout/CalloutIcon.astro:12-22`, `src/docs/components/chip.astro:161`)
  - Summary: Readers may rely on the severity icon and color, which screen reader users never get.
  - Recommended: Fix. It is one bullet, worded like the Chip page's.
  - Fix: add a bullet: "The icon and color aren't announced: say the severity in the text, like Payment failed."
  - Fixed: Added the bullet "The icon and color aren't announced: say the severity in the text, like \"Payment failed\"." to the Callout Accessibility section.
- [x] (1) Copy: the Accessibility section holds only the keyboard table. It doesn't say that the status region announces the copied or failed label, that a failed copy moves focus to the field or selects the text, or that an icon-only copy button needs `aria-label` (`src/docs/components/copy.astro:176-178`, `src/component-examples/copy/Snippet.html:4-10`, `packages/opui/elements/copy.js:50-61`, `packages/opui/elements/copy.js:81-89`)
  - Summary: Readers don't learn what a screen reader hears after a copy, or that an icon-only copy button needs a name.
  - Recommended: Fix. The docs guide asks the Accessibility section to say how a component gets its name and what a screen reader gets from it.
  - Fix: add the list before `<KeyboardSupport />`.
    ```astro
    <ul>
      <li>
        Screen readers announce the copied label, or the failed label when the
        clipboard is blocked.
      </li>
      <li>A failed copy moves focus to the field, or selects the text.</li>
      <li>Name an icon-only copy button with <code>aria-label</code>.</li>
    </ul>
    ```
  - Fixed: Fixed: the Copy page's Accessibility section has the three bullets before Keyboard support, as proposed.
- [x] (1) Number field: the Accessibility section is only the keyboard table again. 2b4ed6b1 dropped the notes added by the fix of the done NumberField step-buttons item: the buttons are for pointer users, a press doesn't announce the new value while the arrow keys on the input do, and `aria-disabled` at `min` and `max` keeps focus (`src/docs/components/number-field.astro:199-201`)
  - Summary: Readers no longer learn that a step button press is silent for screen readers while the arrow keys announce each step.
  - Recommended: Fix. The done item chose this note over a live region, so the page needs it.
  - Fix: this came back after being fixed. Add one bullet before `<KeyboardSupport />`: "A step button changes the value without moving focus, so screen readers don't announce it; the arrow keys on the input do."
  - Fixed: The Accessibility section has the bullet again, before the keyboard table: "A step button changes the value without moving focus, so screen readers don't announce it. The arrow keys on the input do."
- [x] (1) Rating: the meter note in the Accessibility section comes after `<KeyboardSupport />`, so it renders under the "Keyboard support" heading below the key table, though it's about naming the meter. The docs guide puts the partial last (`src/docs/components/rating.astro:147-155`, `src/docs/components/AGENTS.md:293`)
  - Summary: The advice to put the score in the meter's label sits under Keyboard support, below the key table.
  - Recommended: Fix. The guide already says the keyboard table goes last.
  - Fix: move the `<ul>` above `<KeyboardSupport />`.
  - Fixed: The `<ul>` now comes before `<KeyboardSupport />` in `src/docs/components/rating.astro`.
- [x] (1) Typography, Timeline: the accessibility notes that a `.ui-swatch` and a timeline `color` aren't announced, so the text has to carry the status, are gone again (`src/docs/components/typography.astro:260-267`, `src/docs/components/timeline.astro:189-199`, `src/component-examples/typography/Swatch.html:1-21`, `src/component-examples/timeline/Colors.html:1-27`)
  - Summary: The Typography and Timeline pages no longer say that color alone gives screen readers nothing.
  - Recommended: Fix with option A. The docs guide asks the slot to say what a screen reader gets, and a color gives it nothing.
  - Fix: this came back after the Typography item at `TODO.md:924` was fixed with the swatch note. Commit ce950d4c ("drop the notes that tell people what to write") removed that bullet and the Timeline bullet "Colors aren't announced: name the status in the text."
  - Options:
    - A (recommended): restore one bullet on each page, worded as what a screen reader gets: "A `.ui-swatch` has no text: a screen reader only gets the words next to it" and "A `color` isn't announced: the label carries the status."
    - B: keep them out, as ce950d4c decided, and treat the swatch part of the Typography item as dropped.
  - Fixed: Restored one bullet on each page, worded as option A: Typography says "A `.ui-swatch` has no text: a screen reader only gets the words next to it." and Timeline "A marker's color isn't announced: the label carries the status.", linked to their sections.
- [x] (1) Badge: `label` has no option row, so the props table describes it with the `.ui-indicator` part description, "The indicator, inside `.ui-floating`. Holds `label`, ...". That text names the prop instead of saying what it is. The React and Svelte `indicator` prop and the Astro and Vue `indicator` slot get the same text (`src/component-api/badge/api.ts:65-71`, `src/utils/component-source.ts:374-375`)
  - Summary: The `label` row of the Badge props table reads "Holds `label`" instead of saying it is the indicator text.
  - Recommended: Fix. One option row is enough, the way Carousel documents `buttons` both as an option and as a part prop.
  - Fix: add an option and keep the part's `props` for the anatomy.
    ```ts
    {
      description:
        "The indicator text, such as a count. With `hideLabel` or `dot`, only screen readers get it.",
      prop: "label",
    },
    ```
  - Fixed: `src/component-api/badge/api.ts` adds the `label` option with the item's description, and the part keeps its `props` for the anatomy. The `indicator` slot still takes the part description, which reads right for a slot.
- [x] (1) Callout: the parts list the actions before the close button. On the page the close button sits at the end of the first row, next to the content, and the actions go on the row below, so the anatomy numbers them out of visual order (`src/component-api/callout/api.ts:44-54`, `packages/opui/css/components/callout.css:139-163`)
  - Summary: The Callout anatomy numbers the close button after the actions, although it sits above them.
  - Recommended: Fix. The guide keeps parts in visual order, as the Carousel and Timeline fixes did.
  - Fix: move the `.ui-callout > .ui-button` part before the `CalloutActions` part in `callout/api.ts`.
  - Fixed: The `.ui-callout > .ui-button` part comes before `CalloutActions` in `callout/api.ts`, so the anatomy and the parts table number the close button second to last.
- [x] (1) Chip: the `severity` row says a severity "tints the chip, and colors and shapes its dot", but the tint rules skip `.ui-outlined`. An outlined chip with a severity only colors its dot, so without `dot` it looks like a plain outlined chip (`src/component-api/chip/api.ts:60-72`, `packages/opui/css/components/chip.css:66-85`)
  - Summary: The API says a severity tints the chip, but an outlined chip with a severity and no dot looks the same as one without.
  - Recommended: Fix with option A. It keeps the outlined status chips in the Dot example looking as they do now.
  - Options:
    - A (recommended): describe what the CSS does.
      ```ts
      description:
        "The severity of a status chip. It tints a tonal chip, and colors and shapes its dot, the only mark on an outlined one.",
      ```
    - B: give an outlined chip with a severity the palette border (`--ui-palette-border`), as an outlined Callout with a severity gets an accent border, and keep the description.
  - Fixed: Fixed with option A: the `severity` description in `src/component-api/chip/api.ts` reads "It tints a tonal chip, and colors and shapes its dot, the only mark on an outlined one."
- [x] (1) Copy: the `--_ease` row of the component properties says it defaults to `--ui-ease-enter` and is an `input`, but the copied label now starts on `--ui-ease-exit` and `:popover-open` switches it to `--ui-ease-enter`, like Dialog and Menu, so it is an `output` (`src/component-api/custom-properties/copy.ts:24-28`, `packages/opui/css/components/copy.css:19`, `packages/opui/css/components/copy.css:75-76`, `src/component-api/custom-properties/dialog.ts:18-21`)
  - Summary: The Copy page's properties table names the wrong default easing and calls a value that changes with state a knob.
  - Recommended: Fix. One description and kind, copied from the Dialog row.
  - Fix: this was left out of the done Copy ease item, which only changed `copy.css`.
    ```ts
    "--_ease": {
      description:
        "Easing of the reveal and the fade. `--ui-ease-enter` while opening and `--ui-ease-exit` while closing.",
      kind: "output",
    },
    ```
  - Fixed: Fixed: the `--_ease` row in `src/component-api/custom-properties/copy.ts` is an output with the Dialog wording.
- [x] (1) DescriptionList: the `--_border-width` row says `.ui-bordered.ui-dotted` "sets it to `2px`", but the stylesheet sets `--ui-border-width-thick`, which a theme can change. The row also doesn't name its default, `--ui-border-width` (`src/component-api/custom-properties/description-list.ts:9-13`, `packages/opui/css/components/description-list.css:4`, `packages/opui/css/components/description-list.css:12-15`)
  - Summary: With a theme that changes the thick border width, the properties table gives the wrong width for the dotted line.
  - Recommended: Fix. Naming the tokens matches how the other property rows describe their values.
  - Fix:
    ```ts
    "--_border-width": {
      description:
        "Width of the line between term and description. Defaults to `--ui-border-width`, and `--ui-border-width-thick` in `.ui-bordered.ui-dotted`.",
      kind: "input",
    },
    ```
  - Fixed: The row reads "Width of the line between term and description. Defaults to `--ui-border-width`, and `--ui-border-width-thick` in `.ui-bordered.ui-dotted`."
- [x] (1) API docs: the Dialog and Drawer `closedby`, Drawer `backdrop` and Menu `popover` descriptions quote their enum values inside backticks (`"any"`, `"transparent"`, `"manual"`). Control group and Description list write them bare (`wrap`, `auto`), which is what the done Button group and Carousel item settled on (`src/component-api/dialog/api.ts:17`, `src/component-api/drawer/api.ts:17`, `src/component-api/drawer/api.ts:26`, `src/component-api/menu/api.ts:105`, `src/component-api/control-group/api.ts:51`, `src/component-api/description-list/api.ts:24`, `src/component-api/table/api.ts:47-54`, `src/component-api/tabs/api.ts:61-68`, `src/component-api/toggle-group/api.ts:69-80`)
  - Summary: The same kind of enum value shows with quotes in the Dialog, Drawer and Menu tables and without them elsewhere.
  - Recommended: Fix. It applies the bare-value decision of the done Button group and Carousel item.
  - Fix: write `any`, `transparent` and `manual` bare. Outside this audit, Table, Tabs, Text field, Toggle button and Timeline item quote enum values the same way. The `as` rows of Field legend and List item quote element names (`"legend"`, `"a"`, `"button"`), as Button, Avatar and Chip do; decide whether those follow too.
  - Fixed: The Dialog and Drawer `closedby` (`any`), Drawer `backdrop` (`transparent`), Menu `popover` (`manual`), Table and Tabs `overflow` (`wrap`, `scroll`), TextField `type` (`numeric`), ToggleButton `type` (`radio`) and TimelineItem `current` (`step`, `date`, `time`) descriptions write the values bare. The `as` rows of Avatar, Button, Chip, FieldLegend and ListItem keep quoting element names (`"a"`, `"legend"`): all five agree, and the quotes show the string the prop takes. The Carousel labels keep their quotes too, since they are CSS strings.
- [x] (1) Dialog: the `closedby` row has no default, and its description only says what `any` adds. The API table doesn't say that without it the browser treats a modal dialog like `closerequest` and a non-modal one like `none`, while the Drawer row names its default `any` (`src/component-api/dialog/api.ts:14-20`, `packages/opui/components/Dialog/Dialog.astro:8`, `packages/opui/components/Dialog/Dialog.astro:21`, `src/components/ClosedbyTable.astro:63-68`)
  - Summary: The Dialog API table shows no default for `closedby` and doesn't say how a dialog closes without it.
  - Recommended: Fix. Each description should say the default, and the page's How to close section already has the wording.
  - Fix:
    ```ts
    description:
      "How the dialog can be closed. Without it, a modal dialog acts like `closerequest` and a non-modal one like `none`. `any` also closes it on a click outside.",
    ```
  - Fixed: Fixed: the Dialog `closedby` row says that without it a modal dialog acts like `"closerequest"` and a non-modal one like `"none"`, before the `"any"` sentence.
- [x] (1) Drawer: the API note doesn't say which id `DrawerTitle` gets, while the Dialog note names `x-title` for `id="x"`. The drawer generates `x-heading`, a different suffix for the same part (`src/component-api/drawer/api.ts:8-12`, `src/component-api/dialog/api.ts:8-10`, `packages/opui/components/Drawer/Drawer.astro:20`, `packages/opui/components/Dialog/Dialog.astro:10`, `src/component-api/drawer/api.ts:9-10`, `src/component-api/dialog/api.ts:9-10`)
  - Summary: A reader who needs the id of the drawer's title has to read the source, while the Dialog API names its own.
  - Recommended: Fix with option B. The id is new in 6.0, so it can still match the Dialog title's.
  - Options:
    - A: add to the Drawer `default` note: "The `DrawerTitle` gets the id `x-heading` for `id="x"`."
    - B (recommended): generate `${id}-title` like Dialog in `Drawer.astro`, run `pnpm build-components` and `pnpm build-examples`, and name `x-title` in the Drawer API note. The id is new in 6.0 (5.x set none), so no CHANGELOG entry is needed.
  - Fixed: Fixed with option B: `Drawer.astro` generates `${id}-title`, the three ports and the drawer HTML examples follow, and the Drawer API note names `x-title` for `id="x"`. The parity snapshots number ids, so none changed. The hand-written blocks and stress tests keep their own `-heading` ids.
- [x] (1) Layout: the `row` description says "A wrapping row with its children centered on one line". `.ui-layout-row` centers its children on the cross axis (`align-items: center`) and packs them at the start of the row, which the `align` row gives as its default `start` (`src/component-api/layout/api.ts:79-85`, `src/component-api/layout/api.ts:13-24`, `packages/opui/css/components/layout.css:20-28`)
  - Summary: The Layout API reads as if a row centers its children along the line, while they start at the row's start and only line up vertically.
  - Recommended: Fix. One phrase, matching the CSS.
  - Fix:
    ```ts
    description:
      "A wrapping row with its children centered vertically. On a `ul` or `ol` it also drops the list bullets and margins.",
    ```
  - Fixed: The `row` description reads "A wrapping row with its children centered vertically."
- [x] (1) Layout: the `column` description doesn't say that on a `ul` or `ol` it drops the list bullets and margins. The `grid` and `row` descriptions do, and `layout.css` resets the list for all three (`src/component-api/layout/api.ts:37-42`, `src/component-api/layout/api.ts:65-71`, `src/component-api/layout/api.ts:79-85`, `packages/opui/css/components/layout.css:177-181`)
  - Summary: The API only says that rows and grids reset a list, though a column on a `ul` does it too.
  - Recommended: Fix. One sentence, copied from the other two rows.
  - Fix:
    ```ts
    description:
      "A column with even space between its children. On a `ul` or `ol` it also drops the list bullets and margins.",
    ```
  - Fixed: The `column` description says it drops the list bullets and margins on a `ul` or `ol`. The CHANGELOG Layout entry and the What's new note named only the row and the grid, and now name the column too.
- [x] (1) List: the `variant` description adds "The default `filled` list uses the filled surface." to the standard phrase. It repeats the Default column and explains the value with its own name (`src/component-api/list/api.ts:49-60`, `src/component-api/AGENTS.md:16-17`)
  - Summary: The List variant row adds a sentence that only repeats the default.
  - Recommended: Fix. The guide's standard phrase for Variants is "The variant to use."
  - Fix: `description: "The variant to use.",`
  - Fixed: The `variant` row reads "The variant to use."
- [x] (1) API docs: the `name` rows of Checkbox, NumberField, OneTimeCode, Radio, Range, Select, Switch, TextField and Textarea say "Inside a `FieldGroup`, the group's `name` applies", which reads as if the group's name wins. All four frameworks render `name ?? field?.name`, so the group's name is only used when `name` is omitted, as the RadioInput row says (`src/component-api/number-field/api.ts:93-94`, `src/component-api/one-time-code/api.ts:94-95`, `src/component-api/radio/api.ts:92-93`, `src/component-api/range/api.ts:139-140`, `src/component-api/select/api.ts:105-106`, `src/component-api/radio-input/api.ts:28-29`, `packages/opui/components/Radio/RadioInput.astro:10`, `packages/opui/components/Select/Select.astro:95`, `src/component-api/checkbox/api.ts:130-136`, `packages/opui/components/Checkbox/CheckboxInput.astro:13`, `src/component-api/checkbox-input/api.ts:60`, `src/component-api/field-group/api.ts:12`, `src/component-api/switch/api.ts:94-100`, `src/component-api/switch-input/api.ts:32-38`, `src/component-api/text-field/api.ts:111-117`, `src/component-api/textarea/api.ts:90-96`, `packages/opui/components/Switch/SwitchInput.astro:10`, `packages/opui/components/TextField/TextField.astro:91`, `packages/opui/components/Textarea/Textarea.astro:64`)
  - Summary: The props table suggests a `FieldGroup` overrides a control's own `name`, while the control's `name` wins.
  - Recommended: Fix. The RadioInput, CheckboxInput and SwitchInput rows already use the accurate wording.
  - Fix: write "The name of the `<input>`. Inside a `FieldGroup`, the group's `name` when omitted." (`<select>` for Select) in the five files. Checkbox, Switch, TextField and Textarea have the same sentence (`src/component-api/checkbox/api.ts:132`, `src/component-api/switch/api.ts:96`, `src/component-api/text-field/api.ts:113`, `src/component-api/textarea/api.ts:92`).
  - Fixed: The `name` rows of Checkbox, NumberField, OneTimeCode, Radio, Range, Select, Switch, TextField and Textarea say "Inside a `FieldGroup`, the group's `name` when omitted.", as RadioInput, CheckboxInput and SwitchInput do. Checked: each renders `name ?? field?.name`.
- [x] (1) Range, OneTimeCode: the pass-through note's examples of "Attributes that aren't props" are attributes the same table lists as props. On Range that is `max`, `min` and `step`: rows with defaults, and props that the Vue types declare. On OneTimeCode it is `autocomplete`, a row with the default `"one-time-code"` (`src/component-api/range/api.ts:73`, `src/component-api/range/api.ts:124-137`, `src/component-api/range/api.ts:165-172`, `packages/opui/components/Range/types.vue-props.ts:5-12`, `src/component-api/one-time-code/api.ts:13`, `src/component-api/one-time-code/api.ts:37-44`, `src/component-api/frameworks.ts:87`)
  - Summary: The note under the props table names attributes that aren't props, then lists ones the table shows as props.
  - Recommended: Fix. Checkbox, Radio and Switch already pick examples that have no row.
  - Fix: pass attributes without a row, such as `["autofocus", "form"]` on Range and `["autofocus", "placeholder"]` on OneTimeCode.
  - Fixed: `range/api.ts` passes `["autofocus", "form"]` and `one-time-code/api.ts` passes `["autofocus", "placeholder"]`.
- [x] (1) NumberField: the pass-through examples are out of ascending order, `["min", "max", "step", "placeholder"]`, so the note reads "like `min`, `max`, `step` and `placeholder`". Every other `passThrough` call sorts its list (`src/component-api/number-field/api.ts:32-35`)
  - Summary: The NumberField note lists its example attributes unsorted, unlike every other component.
  - Recommended: Fix. The repo sorts lists ascending.
  - Fix: `["max", "min", "placeholder", "step"]`.
  - Fixed: `number-field/api.ts` passes `["max", "min", "placeholder", "step"]`.
- [x] (1) OneTimeCode: the `grouped` row says "Draws a dash between the two halves of the code" for any `length`. The CSS puts the dash at `length / 2` cells, which for 5 or 7 is the middle of a box. The Grouped section says to use it "with an even length", but the API row doesn't (`src/component-api/one-time-code/api.ts:63-69`, `packages/opui/css/components/one-time-code.css:167-170`, `src/docs/components/one-time-code.astro:126-131`)
  - Summary: The API table doesn't say that `grouped` needs an even length, so an odd-length code gets a dash through its middle box.
  - Recommended: Fix. It is one clause in the description.
  - Fix: "Draws a dash between the two halves of the code. Use it with an even `length`."
  - Fixed: The `grouped` row reads "Draws a dash between the two halves of the code. Use it with an even `length`."
- [x] (1) Progress: the `max` row has no default, though a missing `max` means 1. That is the native default, and the ring also reads `attr(max type(<number>), 1)`. So a `value` of 60 without `max` draws a full bar. Range documents its native `max`, `min` and `step` defaults (`src/component-api/progress/api.ts:12-15`, `packages/opui/css/components/progress.css:102-104`, `src/component-api/range/api.ts:124-137`)
  - Summary: The Progress API doesn't say `max` defaults to 1, so a percentage value without `max` shows a full bar.
  - Recommended: Fix. It matches how Range documents native defaults.
  - Fix: add `default: "1"` to the `max` option, and write "The maximum value. `value` runs from 0 to it."
  - Fixed: `max` has `default: "1"` and reads "The maximum value. `value` runs from 0 to it."
- [x] (1) Radio: the `value` row is typed `string`, but the group model it is compared with is `string | number | boolean`. Svelte checks a radio with `group === (value ?? true)`, so `bind:group` on a number needs a number `value` (`src/component-api/radio/api.ts:135-141`, `src/component-api/radio/api.ts:23-36`, `packages/opui/components/Radio/RadioInput.svelte:20-24`)
  - Summary: The Radio table types `value` as a string, so a reader binding a number group writes values that Svelte never checks.
  - Recommended: Fix. The row then matches the model it pairs with.
  - Fix: `type: "string | number | boolean"` on the Radio `value` row.
  - Fixed: The Radio `value` row is typed `string | number | boolean` (`src/component-api/radio/api.ts`).
- [x] (1) Rating: the `required` row says "Requires a star and drops the clear radio" but not that `rating.css` adds a required mark after the legend. The `required` rows of NumberField, OneTimeCode and Select start with that mark (`src/component-api/rating/api.ts:81-88`, `packages/opui/css/components/rating.css:166-174`)
  - Summary: The Rating table doesn't mention the asterisk that `required` adds after the legend.
  - Recommended: Fix. It is one clause, worded like the other controls.
  - Fix: "Adds a required mark after the legend, requires a star and drops the clear radio."
  - Fixed: The `required` row reads "Adds a required mark after the legend, requires a star and drops the clear radio."
- [x] (1) Rating: the `starLabel` default is written as `(value) => "1 star", "2 stars"`. The Default column shows it as code, but it is neither the function the components use nor valid code. It is the only function default in any `api.ts` (`src/component-api/rating/api.ts:100-105`, `packages/opui/components/Rating/Rating.astro:19`)
  - Summary: The Default column shows made-up code for `starLabel` that a reader can't copy.
  - Recommended: Fix with option A. It keeps the Default column to literals, like every other row.
  - Options:
    - A (recommended): drop `default` and end the description with "Defaults to `1 star`, `2 stars` and so on." `checkApi` skips defaults that aren't literals, so the test still passes.
    - B: set `default` to the function the components use: `(value) => (value === 1 ? "1 star" : \`${value} stars\`)`.
  - Fixed: Fixed with option A: the `starLabel` row has no `default`, and its description ends with "Defaults to `1 star`, `2 stars` and so on." The component API test passes.
- [x] (1) Spinner: on the framework pages the API notes give the exceptions first ("These never show a spinner: ..."). Then they say "Set `aria-busy="true"` on any element to show a spinner", which the exceptions just contradicted. The HTML page never shows that sentence. This is because a component without `source` always shows the `html` note and adds the `default` note after it (`src/component-api/spinner/api.ts:6-9`, `src/components/ApiTables.astro:47-59`, `packages/opui/css/components/spinner.css:2-11`)
  - Summary: The Spinner API notes list the elements that get no spinner before saying how to show one, then say any element works.
  - Recommended: Fix. One note in reading order serves every page.
  - Fix: one `default` note and no `html` key: "Set `aria-busy="true"` on an element to show a spinner. `<html>`, `<input>`, `<progress>`, `<select>` and `<textarea>` never show one, and neither do elements with `aria-describedby`, except buttons and links."
  - Fixed: One `default` note in reading order replaces the `default` and `html` pair, so the HTML and framework pages show the same text.
- [x] (1) ToggleGroup: the arrow keys row says Left and Right follow the reading direction. A single-select group is a native radio group, and WebKit takes Left as the previous radio in right-to-left text too. The Tabs row already carries that caveat for the same native behavior (`src/component-api/toggle-group/api.ts:17-21`, `src/component-api/tabs/api.ts:11-15`, `tests/e2e/engines.spec.ts:281-293`, `tests/e2e/engine-bugs.ts:21-22`)
  - Summary: The Toggle page promises arrow keys that follow the reading direction, which Safari doesn't do in right-to-left text.
  - Recommended: Fix. The Tabs row already words the same native behavior.
  - Fix: use the Tabs wording, and add an RTL interaction test like the Tabs one, marked `failsIn` WebKit with `WEBKIT_RADIO_RTL_ARROWS`. The Radio, Rating and List rows outside this audit have the same sentence.
    ```ts
    description:
      "In a single-select group, moves focus to the previous or next button and checks it, wrapping around at the ends (Safari stops at the first and the last). Left and Right follow the reading direction in Chromium and Firefox; Safari always takes Left as the previous button. A multi-select group ignores them.",
    ```
  - Fixed: The ToggleGroup arrow keys row uses the Tabs wording, and `tests/e2e/interaction.spec.ts` has a right-to-left test on the Interactive example, marked `failsIn` WebKit with `WEBKIT_RADIO_RTL_ARROWS`; its steps pass against the HTML example in Chromium. The List row in `list/api.ts` had the same sentence and gets the same caveat; Radio and Rating are left to their owners.
- [x] (1) TabsLabel: the `for` row has an `attribute` and an `htmlDescription`, but its `frameworks` leave out `html`. So the HTML Tabs label API shows no row, and the attribute and the HTML text are never used (`src/component-api/tabs-label/api.ts:6-15`, `src/component-api/rows.ts:53-56`)
  - Summary: The HTML Tabs label API lists only the part, with no row for the `for` attribute that ties each tab to its input.
  - Recommended: Fix. One more framework in the list shows the row.
  - Fix: confirmed in the built `dist/html/components/tabs.md`, where "Tabs label API" has only the Parts table.
    ```ts
    frameworks: ["astro", "html", "svelte", "vue"],
    ```
  - Fixed: `frameworks` includes `html`, so the HTML Tabs label API gets a For row with `[for]` and the HTML description.
- [x] (1) Timeline: the `tracked` and `current` descriptions say the current marker and the tracked line take the primary color, and Under the hood names `--ui-primary`. Since the done Timeline color item, the CSS reads `--ui-selected-strong` (`src/component-api/timeline/api.ts:19-26`, `src/component-api/timeline-item/api.ts:18-25`, `src/docs/components/timeline.astro:220-223`, `packages/opui/css/components/timeline.css:124-152`, `packages/opui/css/components/timeline.css:124-129`, `packages/opui/css/components/timeline.css:147-152`)
  - Summary: The Timeline page names the primary color for the current marker, so a theme author changes the wrong token to recolor it.
  - Recommended: Fix. Three strings, matching the custom property descriptions.
  - Fix: that item updated `custom-properties/timeline.ts` but not these three strings. Change `timeline/api.ts:23` to "Colors the line and the plain markers before the current item with `--ui-selected-strong`, like a progress tracker.", `timeline-item/api.ts:22` to "Marks the current item, which fills its marker with `--ui-selected-strong` and a halo. …", and `<code>--ui-primary</code>` at `timeline.astro:222` to `<code>--ui-selected-strong</code>`.
  - Fixed: `timeline/api.ts`, `timeline-item/api.ts` and Under the hood name `--ui-selected-strong`.
- [x] (1) TextField, Textarea: the root rows still describe a `<label>` root. TextField's description lists a `<label>` or `<opui-text-field>`, and Textarea's selector is `label.ui-textarea`. Since the done NoLabel item, both render a `<div>` when there's no label. The TextField row also names the `passwordToggle` prop on the HTML page (`src/component-api/text-field/api.ts:252-256`, `src/component-api/textarea/api.ts:195-198`, `packages/opui/components/TextField/TextField.astro:45-49`, `packages/opui/components/Textarea/Textarea.astro:35`, `src/component-examples/text-field/NoLabel.html:1`)
  - Summary: The parts tables call the field's root a `<label>`, while the No label example on the Text field page uses a `<div>`.
  - Recommended: Fix. Two root rows follow the markup the components render.
  - Fix: `textarea.css` styles `:where(.ui-textarea)` with no element, so the selector can drop `label`. The `passThrough(..., "label", ...)` notes (`text-field/api.ts:28`, `textarea/api.ts:24`) also send `class` and `style` to "the root `<label>`".
    ```ts
    root: {
      description:
        "Container element: a `<label>`, a `<div>` when there's no label, or the `<opui-text-field>` custom element with a password toggle.",
      selector: ".ui-text-field",
    },
    ```
    ```ts
    root: {
      description:
        "Container element: a `<label>`, or a `<div>` when there's no label.",
      selector: ".ui-textarea",
    },
    ```
  - Fixed: The TextField root row reads "Container element: a `<label>`, a `<div>` when there's no label, or the `<opui-text-field>` custom element with a password toggle." The Textarea root row reads "Container element: a `<label>`, or a `<div>` when there's no label.", with the selector `.ui-textarea`. `passThrough` in `frameworks.ts` now names a root given as a class as "the `.ui-text-field` root", and both APIs pass their root class, so `class` and `style` no longer go to "the root `<label>`". The `passThrough` line in `src/component-api/AGENTS.md` says so.
- [x] (1) TimelineItem: the `label` description says "Rich content goes in the `label` slot". The React and Svelte props tables show it too, but there `label` is the prop that takes a `ReactNode` or `Snippet`, and there is no slot (`src/component-api/timeline-item/api.ts:40-45`, `packages/opui/components/Timeline/types.react.ts:8-10`, `packages/opui/components/Timeline/types.svelte.ts:9-11`)
  - Summary: React and Svelte readers are told to use a `label` slot that their framework doesn't have.
  - Recommended: Fix. The slots table already covers the slot in Astro and Vue.
  - Fix: confirmed in the built React and Svelte timeline pages.
    ```ts
    description: "The title of the event, rendered as a heading.",
    ```
  - Fixed: The `label` row reads "The title of the event, rendered as a heading." The Stat `label` and `description` rows had the same slot sentence, also shown to React and Svelte, and lost it too.
- [x] (1) Toaster: the `duration` row says how long a toast stays, and the Duration section says "5 seconds by default". A toast with an action stays twice the toaster's duration unless `toast()` passes its own, which the CHANGELOG entry says and the API and page don't (`src/component-api/toast/api.ts:51-58`, `src/docs/components/toast.astro:232-236`, `packages/opui/elements/toaster.js:124-125`, `packages/opui/CHANGELOG.md:256`)
  - Summary: Readers expect a toast with an Undo action to leave after 5 seconds, but it stays 10.
  - Recommended: Fix. One sentence in the row and the section.
  - Fix: also change the section text at `toast.astro:234` to "5 seconds by default, 10 with an action. Use `duration` to change it."
    ```ts
    description:
      "How long a toast stays, in milliseconds, while the pointer and focus are elsewhere. A toast with an action stays twice as long.",
    ```
  - Fixed: Fixed: the `duration` row adds that a toast with an action stays twice as long, and the Duration section reads "5 seconds by default, 10 with an action. Use `duration` to change it."
- [x] (1) TextField, Textarea: the HTML API tables leave out `characterCount`, `characterCountLabel` and `passwordToggle`. `htmlRows` drops an option without a class, attribute, value or `cssVar`, so their `htmlDescription`s, the markup for `<opui-character-count>` and the password toggle, never show anywhere (`src/component-api/text-field/api.ts:41-57`, `src/component-api/text-field/api.ts:118-126`, `src/component-api/textarea/api.ts:36-52`, `src/component-api/rows.ts:53-69`)
  - Summary: HTML readers find no Character count or Password toggle row in the API table, only the examples further up the page.
  - Recommended: Fix with option A. Other element-backed components already keep their HTML markup in the HTML note.
  - Fix: confirmed in the built `dist/html/components/text-field.md`, where the table goes from Auto fit to Validation with neither row. The agent skill uses `description` for component APIs (`scripts/build-agent-skill.mjs:276-278`), so the text is not there either.
  - Options:
    - A (recommended): move the three HTML texts into `notes.html` of both APIs and drop the `htmlDescription`s, the way Copy, SortableTable and Toaster describe their element markup. TextField keeps its `<select>` and `<datalist>` sentences.
    - B: let `htmlRows` keep an option that has an `htmlDescription` and a `group` but no modifier, with `-` in the Modifiers column, and give `characterCountLabel` a group. Card, CardHeader and Fieldset `as` also have an `htmlDescription` that never shows, with no group, so check how they read.
  - Fixed: Fixed with option A. The three `htmlDescription`s are gone and their markup is in `notes.html`. TextField keeps its `<select>` and `<datalist>` sentences and adds the character count and the password toggle. Textarea gets an HTML note for the character count.
- [x] (1) Tokens: the token descriptions leave out readers in Message and Rating: `--ui-track-bg-color` doesn't name Rating's empty stars, `--ui-selected-strong` doesn't name the border of a checked Message reaction, and `--ui-selected` and `--ui-on-selected` only give the toggle defaults (`src/utils/theme-token-descriptions.ts:322-323`, `src/utils/theme-token-descriptions.ts:394-397`, `src/utils/theme-token-descriptions.ts:499-500`, `packages/opui/css/components/message.css:109-137`, `packages/opui/css/components/rating.css:8`)
  - Summary: Theme authors can't tell from the token table that these tokens also restyle rating stars and chat reactions.
  - Recommended: Fix. Each description needs one clause, and the component variable tables already say it.
  - Fix: - `--ui-track-bg-color`: add "the empty `Rating` stars (else `--ui-border-color`)".
    - `--ui-selected-strong`: add "the border of a checked `Message` reaction".
    - `--ui-selected` and `--ui-on-selected`: add the `Message` reaction defaults (the primary mixed into the surface, and `--ui-text-strong`).
  - Fixed: In `src/utils/theme-token-descriptions.ts`, `--ui-track-bg-color` names the empty `Rating` stars (else `--ui-border-color`), `--ui-selected-strong` the border of a checked `Message` reaction, `--ui-selected` the checked reaction and its default (the primary mixed into `--ui-surface` at `--ui-state-selected-alpha-accent`), and `--ui-on-selected` its default, `--ui-text-strong`.
- [x] (1) Accordion: when the section text was shortened, it stopped naming what two examples show. The second accordion in the Actions example uses `align="start"`, which the Actions sentence doesn't mention, and the Turn accordion uses a right-pointing marker that only the API table explains (`src/docs/components/accordion.astro:129-133`, `src/docs/components/accordion.astro:146-158`, `src/component-examples/accordion/Actions.astro:32`, `src/component-examples/accordion/MarkerAnimation.astro:19-36`)
  - Summary: Readers see two action alignments and a different Turn marker with no sentence that names the prop or why.
  - Recommended: Fix. One clause per section restores what two earlier fixes added.
  - Fix: 89cd6d73 dropped the sentences that the fixes for the `align` and `markerAnimation` items had added (both items are done). Write "Use `AccordionActions`, with `align="start"` to line them up with the content" (`.ui-align-start` on HTML), and "Rotates by default. Use `markerAnimation` to change it; `turn` needs a marker that points to the inline end."
  - Fixed: Actions reads "Use `AccordionActions` (`.ui-actions`), with `align=\"start\"` (`.ui-align-start`) to line them up with the content." through `PropOrClass`. Marker animation reads "Rotates by default. Use `markerAnimation` to change it, with a marker that points to the inline end for `turn`.", and on HTML "Use `.ui-marker-animation-flip`, or `.ui-marker-animation-turn` with a marker that points to the inline end."
- [x] (1) Accordion: three examples write prices as "50 EUR" and "4.90 EUR". The Card, Description list and Table examples write "€12" and "€4.90" (`src/component-examples/accordion/Group.astro:26`, `src/component-examples/accordion/Variants.astro:15`, `src/component-examples/accordion/MarkerAnimation.astro:15`, `src/component-examples/description-list/Total.astro:17`, `src/component-examples/card/Colors.astro:23`)
  - Summary: The Accordion page writes euro amounts differently from every other page that shows prices.
  - Recommended: Fix. It is a text change in three examples.
  - Fix: write "€50" and "€4.90" in the three `.astro` files, run `pnpm build-examples`, and re-record the three parity snapshots, saying so in the commit.
  - Fixed: Group, Variants and MarkerAnimation write "€50" and "€4.90". The three parity snapshots were re-recorded on purpose.
- [x] (1) Accordion: the Mutually exclusive example groups its accordions with `name="example-group"`, a value that describes the example. The FAQ block names its groups after their content, like `faq-billing` (`src/component-examples/accordion/GroupSingle.astro:11`, `src/component-examples/accordion/GroupSingle.astro:17`, `src/blocks/faq.html:160`)
  - Summary: Readers copy a placeholder group name into their page.
  - Recommended: Fix. It is one value in one example.
  - Fix: use `name="plan-questions"`, to match its `aria-label` "Plan questions". Run `pnpm build-examples` and re-record the parity snapshot.
  - Fixed: GroupSingle uses `name="plan-questions"`, and its parity snapshot was re-recorded on purpose.
- [x] (1) Avatar: the Sizes example names its large "KL" avatar "Kai Lund". The Disabled and Grouped examples and the blog-list block use "KL" for "Karl Lund" (`src/component-examples/avatar/Sizes.astro:8`, `src/component-examples/avatar/Disabled.astro:10-12`, `src/component-examples/avatar/Grouped.astro:13`, `src/blocks/blog-list.html:273`)
  - Summary: The same initials stand for two different people on one page.
  - Recommended: Fix. It is one name in one example.
  - Fix: write `aria-label="Karl Lund"` in `Sizes.astro`, run `pnpm build-examples` and re-record the parity snapshot.
  - Fixed: `Sizes.astro` names the large avatar `aria-label="Karl Lund"`, and `pnpm build-examples` wrote the other formats. The `avatar/Sizes` parity snapshot change is intended.
- [x] (1) Badge: the first badge in the Indicator example repeats the first badge in Basics, two sections earlier: same icon, same `label`, same "5" (`src/component-examples/badge/Indicator.astro:5-19`, `src/component-examples/badge/Basics.astro:5-19`, `src/docs/components/badge.astro:63-89`)
  - Summary: The Indicator section shows a badge the reader already saw in Basics.
  - Recommended: Fix. The section's point is visible text that differs from the sentence, and "99+" already shows that.
  - Fix: replace the repeated badge with one whose visible text differs from its label, such as "3K" with "About 3,000 unread messages". Run `pnpm build-examples` and re-record the parity snapshot.
  - Fixed: The Indicator example keeps "99+" and replaces the repeated "5" with "1.2K" for "About 1,200 unread messages", after it in ascending order. The item's "3K" with "About 3,000 unread messages" is already the end-end badge in Corners, so it would repeat that one instead. The parity snapshot change is intended.
- [x] (1) Badge: Visibility has a Code file only to shorten its one icon to `<svg aria-hidden="true"><!-- --></svg>`. Colors and Corners repeat the same mail icon five and four times and show every path in the code tab (`src/component-examples/badge/VisibilityCode.astro:5-8`, `src/component-examples/badge/Colors.astro:5-79`, `src/component-examples/badge/Corners.astro:5-64`)
  - Summary: The longest Badge code tabs repeat the full icon path while the shortest one hides it.
  - Recommended: Fix with option A. It uses the Code-file pattern where it saves the most.
  - Options:
    - A (recommended): add `ColorsCode.astro` and `CornersCode.astro` with the shortened `svg`, as `button/IconAndLabelCode.astro` does, then run `pnpm build-examples`.
    - B: delete `VisibilityCode.astro`, its generated files and its parity snapshot, so every Badge code tab shows the full icon.
  - Fixed: Fixed with option A: `ColorsCode.astro` and `CornersCode.astro` shorten the icon to `<svg aria-hidden="true"><!-- --></svg>`, like `VisibilityCode.astro`, and `pnpm build-examples` wrote their other formats. Their two new parity snapshots are intended.
- [x] (1) Button: the Colors section has no text, so it doesn't name the prop or classes that make the critical and primary rows. The Badge, Card and Timeline Colors sections each name theirs (`src/docs/components/button.astro:98-101`, `src/docs/components/badge.astro:69-75`, `src/component-api/button/api.ts:42-47`)
  - Summary: The Button Colors section shows two colored rows without naming the prop or class that colors them.
  - Recommended: Fix. It is one sentence, like the other Colors sections.
  - Fix: add a `<Conditional as="p">` with "Use `color` for critical or primary buttons." in `components` and "Use `.ui-critical` or `.ui-primary`." in `html`.
  - Fixed: The Colors section in `src/docs/components/button.astro` has a `<Conditional as="p">`: "Use `color` for critical or primary buttons." in `components` and "Use `.ui-critical` or `.ui-primary`." in `html`.
- [x] (1) Button: the Variants example includes a "Current" link button with `aria-current="page"`, but no text on the page names it. Only the HTML `state` row of the API table mentions it (`src/component-examples/button/Variants.astro:9`, `src/docs/components/button.astro:84-96`, `src/component-api/button/api.ts:54-65`)
  - Summary: Readers see a Current button in the Variants row with nothing saying it marks the current page in navigation.
  - Recommended: Fix. One Accessibility bullet covers it without making the Variants text longer.
  - Fix: add an Accessibility bullet such as "A link button with `aria-current="page"` keeps its pressed background and is announced as the current page."
  - Fixed: The Accessibility section adds "A link button with `aria-current="page"` gets the current page style, and screen readers announce it as the current page." It doesn't say "pressed background", which is no longer the style in any variant.
- [x] (1) Button: the Keyboard example labels its buttons with operating system shortcuts that a page never receives: Ctrl+Alt+T for a terminal, ⌘Space for Spotlight and Win+L to lock. Yet the Accessibility note tells readers to handle the shortcut in their own script (`src/component-examples/button/Keyboard.astro:5-7`, `src/docs/components/button.astro:155-156`)
  - Summary: The keyboard hints show shortcuts a web page can't handle, next to advice to handle them in a script.
  - Recommended: Fix. App shortcuts, like the anatomy's Delete with Del, read as something to build.
  - Fix: use shortcuts an app owns, such as "Save" with `Ctrl+S`, "Search" with `/` and "Comment" with `C`. Run `pnpm build-examples` and re-record the parity snapshot.
  - Fixed: The Keyboard example shows Save with Ctrl+S, Search with Ctrl+K and Comment with Ctrl+Alt+M, each with `aria-keyshortcuts`. Modifier shortcuts instead of the item's `/` and `C`, since single-character shortcuts need a way to turn them off (WCAG 2.1.4). The parity snapshot change is intended.
- [x] (1) Callout: on the Astro, React, Svelte and Vue pages, the Icon section says `CalloutIcon` renders the severity's icon. Its example is a callout with no severity and its own `svg`, the custom-icon case that only the API notes describe (`src/docs/components/callout.astro:123-136`, `src/component-examples/callout/Icon.astro:5-21`, `src/component-api/callout/api.ts:6-8`)
  - Summary: The Icon example shows a hand-written icon while the sentence above it describes the built-in one.
  - Recommended: Fix. The sentence can name both, as the HTML sentence already names the `svg`.
  - Fix: in the `components` slot, write "`CalloutIcon` renders the severity's icon. For your own, put an `<svg aria-hidden="true">` before `CalloutContent`."
  - Fixed: The `components` slot reads "`CalloutIcon` renders the severity's icon. For your own, put an `<svg aria-hidden=\"true\">` before `CalloutContent`."
- [x] (1) Card: on the HTML page, the Density sentence names only `.ui-spacious` and the Orientation sentence names only `.ui-vertical`. The examples below them also show `.ui-dense` and `.ui-horizontal` (`src/docs/components/card.astro:103-110`, `src/docs/components/card.astro:149-156`, `src/component-examples/card/Density.astro:5`, `src/component-examples/card/Orientation.astro:51-55`)
  - Summary: HTML readers see dense and horizontal cards without the class that makes them.
  - Recommended: Fix. One `<Conditional>` per sentence, like the Variants section.
  - Fix: on HTML, write "Use `.ui-dense`, `.ui-spacious` or `--ui-card-padding` to change it." and "An image first goes beside the content from `40rem`. Use `.ui-horizontal` or `.ui-vertical` to fix it." Keep `density` and `orientation` in the `components` slot.
  - Fixed: Both sentences are a `<Conditional>`: on HTML "Use `.ui-dense`, `.ui-spacious` or `--ui-card-padding` to change it." and "... Use `.ui-horizontal` or `.ui-vertical` to fix it.", with `density` and `orientation` in the `components` slot.
- [x] (1) Card: two examples describe themselves inside the card. The Clickable card says "Click anywhere on the card." and the Media card says "The image is cropped to 2:1 with `aspect-ratio`." The copy test's patterns don't catch either (`src/component-examples/card/Clickable.astro:15`, `src/component-examples/card/Media.astro:55-56`, `tests/unit/example-copy.test.ts:52-55`)
  - Summary: Two Card previews carry instructions about the demo where a real card would have content.
  - Recommended: Fix. It is copy only, in two examples.
  - Fix: write content such as "Plans for teams of every size." and "Base camp sat at 3,200 meters, two days from the road." Run `pnpm build-examples` and re-record the two parity snapshots. The "text about the example" rule could also match `\bclick anywhere\b` and `\bthis (card|checkbox|chip)\b`, with samples.
  - Fixed: Clickable reads "Plans for teams of every size." and Media "Base camp sat at 3,200 meters, two days from the road." (the Media section already says to crop with `aspect-ratio`), and both parity snapshots were re-recorded on purpose. The copy test's "text about the example" rule also matches `Click anywhere`, with a sample. `this (card|checkbox|chip)` is left out because it flags real copy, the Select Spread end text "This card has expired."; the one self-description it would catch, "This checkbox is disabled." in `src/component-examples/checkbox/Spread.astro:19`, belongs to the Checkbox page.
- [x] (1) Carousel: the Playground's generated Astro, React, Svelte and Vue snippet lists `itemsPerView` after `persistentButtons`. Every example sorts a component's props alphabetically (`src/docs/components/carousel.astro:412-428`)
  - Summary: The Playground code lists props in a different order from the examples readers copy.
  - Recommended: Fix. One line moves.
  - Fix: move the `itemsPerView` entry in `componentSnippet` between `buttons` and `markers`.
  - Fixed: `itemsPerView` sits between `buttons` and `markers` in `componentSnippet`.
- [x] (1) Checkbox: the Spread example still uses states as labels: "Required", "Disabled" and "Invalid Checkbox", with end texts like "This checkbox is disabled.". Its first label, "Accept Terms & Conditions", is in Title Case and has an end text about the privacy policy. The Radio and Switch Spread examples show real options (`src/component-examples/checkbox/Spread.astro:5-25`, `src/component-examples/switch/Spread.astro:5-25`, `src/component-examples/radio/Spread.astro:6-22`)
  - Summary: The Checkbox Spread preview reads like a list of test states while its Radio and Switch siblings show real options.
  - Recommended: Fix. It is copy only, and the sibling examples show the shape.
  - Fix: give each checkbox a real setting in sentence case, with an end text that explains its state, as the Switch Spread example does. Run `pnpm build-examples` and re-record the parity snapshot.
  - Fixed: The Spread example shows checkout options in sentence case with end texts that explain their state: Gift wrap, "I accept the terms of sale" (required, "Required to place the order."), Express delivery (disabled, "Not available for your address.") and "I'm 18 or older" (invalid, "Confirm your age to buy this item."). The parity snapshot change is intended.
- [x] (1) Checkbox: the Cards example's copy describes the demo itself. The legends are "Input at the end" and "Input at the start", each option is named after its variant, and the end texts read like "The default surface.". The cards run outlined, tonal, elevated instead of the default followed by ascending order (`src/component-examples/checkbox/CardsMatrix.astro:13-44`, `src/docs/components/checkbox.astro:197-205`, `src/component-api/checkbox/api.ts:182-187`, `src/component-examples/radio/CardsMatrix.astro:2-40`, `src/docs/components/radio.astro:146-154`)
  - Summary: The card checkboxes read as a variant chart rather than choices, in a different order from the API table.
  - Recommended: Fix. Real choices still show both input placements and every variant.
  - Fix: give each fieldset a real question, such as "Add-ons" with "Priority support", "Extra storage" and "Audit log" and their prices as end text. Order the cards outlined, elevated, tonal, and add "Outlined by default. Use `variant` to change it." to the Cards sentence. Radio and Switch CardsMatrix have the same copy.
  - The Radio Cards example also has the only unsorted import list in its folder, and its section text names `card` and `spread` but not `variant`.
  - Fixed: The Checkbox cards offer Add-ons (Priority support, Extra storage, Audit log with monthly prices) and Email reports, the Radio cards the Starter, Team and Business plans and Billing, and the Switch cards Notifications and Privacy settings. Each group runs outlined, elevated, tonal. The Radio and Switch CardsMatrix imports are sorted, and the Cards section on all three pages adds "Cards are outlined by default, and `variant` changes the surface" (`.ui-elevated` and `.ui-tonal` on the HTML page). The parity snapshot changes are intended.
- [x] (1) Checkbox: the Binding and Select all examples use a fruit list ("Apples", "Bananas", "Cherries"). The page's other groups use notification channels, newsletter topics and files (`src/component-examples/checkbox/FieldGroupBinding.astro:12-19`, `src/component-examples/checkbox/Indeterminate.astro:13-19`, `src/component-examples/checkbox/HiddenLabel.astro:19-54`)
  - Summary: Two checkbox groups list placeholder fruit next to groups with real settings and files.
  - Recommended: Fix. A Select all over notification channels matches the "All notifications" checkbox in the indeterminate example right above it.
  - Fix: make Indeterminate "All notifications" over "Email", "Push" and "SMS", and Binding "Newsletter topics" over "Product updates", "Events" and "Offers". Update the three hand-written Binding ports, then run `pnpm build-examples` and re-record the snapshots. The Select Binding example uses the same fruit.
  - Fixed: Select all checks All notifications over Email, Push and SMS, and Binding lists Newsletter topics (Product updates, Events, Offers, values `updates`, `events`, `offers`) in the Astro, HTML and the three hand-written ports. The interaction tests use the new names. The Select Binding example still lists fruit; it belongs to the Select owner and isn't changed here. The parity snapshot changes are intended.
- [x] (1) Checkbox: Validation is an h3 under Visible label, so the table of contents puts validation under labels. The Switch page gives Validation its own h2 after the label sections (`src/docs/components/checkbox.astro:134-158`, `src/docs/components/switch.astro:153`)
  - Summary: The Checkbox Validation section sits under Visible label in the table of contents.
  - Recommended: Fix. It needs one heading level and a section wrapper, matching Switch.
  - Fix: move it into `<section id="validation"><h2>Validation</h2>` after the Visible label section.
  - Fixed: Validation is its own `<section id="validation"><h2>Validation</h2>` after Visible label on the Checkbox page, like Switch.
- [x] (1) Checkbox: the page shows the Checkbox input API table but has no Checkbox input section. The Radio and Switch pages each have one that points to the List example with the bare input (`src/docs/components/checkbox.astro:50-55`, `src/docs/components/radio.astro:161-168`, `src/docs/components/switch.astro:184-195`, `src/docs/components/list.astro:176`)
  - Summary: Checkbox readers find a Checkbox input API with no section saying what it is for.
  - Recommended: Fix. It is a short section copied from Radio.
  - Fix: before Field group, add `<section id="checkbox-input"><h2>Checkbox input</h2>` containing `<PropOrClass prop="CheckboxInput" class='<input type="checkbox">' />` "without the label, as in a" `<DocLink href="/components/list#checkbox">List</DocLink>`.
  - Fixed: The Checkbox page has a Checkbox input section before Field group, written like the Radio one, that links the List Checkbox example (`/components/list#checkbox`).
- [x] (1) Checkbox: the Labels table in the Accessibility section offers "three approaches" and marks two of them "Not used". Its "Usage in Checkbox component" column also shows on the HTML page, where there is no component (`src/docs/components/checkbox.astro:222-255`, `src/docs/components/checkbox.astro:241-253`, `src/docs/components/switch.astro:269-282`, `src/docs/components/switch.astro:226-228`, `src/docs/components/switch.astro:269-275`)
  - Summary: The Labels table lists two labeling methods the page never uses and refers to a component on the HTML page.
  - Recommended: Fix. One bullet says what the table says and stays within the two-sentence rule.
  - Fix: replace the heading, paragraph and table with a bullet such as "The label text names the checkbox. To hide it, use `hideLabel` (`.ui-sr-only`)." The Switch page has the same table (`src/docs/components/switch.astro:225-284`).
  - On the Switch page, the sentence above the table, "The first two approaches are equally ok:", also contradicts the table's "Not used" row.
  - Fixed: The Checkbox and Switch Accessibility sections replace the Labels heading, paragraph and table with one bullet: "The label text names the checkbox. To hide it, use `hideLabel` (`.ui-sr-only`)." The Switch bullet adds "also an icon-only one" and comes before Role & attributes. The Checkbox and Switch What's new notes that linked `#labels` now link `#visible-label`, like the Radio note, and the unused Table imports are gone from the Checkbox page.
- [x] (1) Chip: the Sizes section's only sentence is about `multiline`, and the wrapping chip sits in the Sizes example. No other Sizes section has text, and the docs guide puts wrapping under layout (`src/docs/components/chip.astro:97-104`, `src/component-examples/chip/Sizes.astro:9-13`)
  - Summary: The Chip Sizes section explains label wrapping instead of sizes.
  - Recommended: Fix. A Multiline section of its own keeps each section on one prop.
  - Fix: move the multiline chip to a `Multiline.astro` example in a `<section id="multiline">` after Disabled, with the sentence. Leave Sizes without text, then run `pnpm build-examples` and record the snapshots.
  - Fixed: The multiline chip moves to `src/component-examples/chip/Multiline.astro` in a `<section id="multiline">` after Disabled, with the sentence, and Sizes has no text. The `chip/Sizes` snapshot change and the new `chip/Multiline` snapshot are intended.
- [x] (1) ControlGroup: the Variants, Colors, Sizes and Disabled examples put the prop value on every button ("Critical" three times, "X-small" three times, "Enabled", "Disabled", "Enabled") and leave the groups unnamed. Usage promises related actions like Undo and Redo, and the Accessibility section says to name a group of actions with `aria-label` (`src/component-examples/control-group/Variants.astro:5-27`, `src/component-examples/control-group/Colors.astro:5-15`, `src/component-examples/control-group/Sizes.astro:5-27`, `src/component-examples/control-group/Disabled.astro:5-15`, `src/docs/components/control-group.astro:114-117`, `src/docs/components/control-group.astro:234-241`)
  - Summary: The basic ControlGroup previews show three buttons with the same label instead of a named group of related actions.
  - Recommended: Fix. The Split button, Vertical and Fields examples already show named groups of real actions.
  - Fix: give each group one set of related actions that don't stay selected, plus an `aria-label`. For example Undo, Redo and a History link in Variants (the link keeps showing a link button) and Archive, Move and Delete in Colors and Disabled. Then run `pnpm build-examples` and record the parity snapshots as intended.
  - Name the groups in the same change, as the ControlGroup unnamed groups item under Accessibility asks.
  - Fixed: Variants shows Undo, Redo and a History link, Colors and Disabled show Archive, Move and Delete (Move disabled), and Sizes shows Previous, Today and Next, each group named, in all five formats. The parity snapshot changes are intended.
- [x] (1) ControlGroup: the Pagination example goes from page 3 straight to page 22 with nothing marking the gap, so the pages read as consecutive (`src/component-examples/control-group/Pagination.astro:7-12`)
  - Summary: The pagination preview shows pages 1, 2, 3 and 22 side by side as if they followed each other.
  - Recommended: Fix. Consecutive pages keep the example short and need no extra markup.
  - Fix: link pages 1 to 5 in `Pagination.astro`, run `pnpm build-examples` and record the parity snapshot as intended.
  - Fixed: `Pagination.astro` links pages 1 to 5. The parity snapshot change is intended.
- [x] (1) ControlGroup: no example puts a NumberField or an `autoFit` TextField in a group, though the root part lists a number field and the stylesheet sizes it differently. A text field grows to fill the row. A number field keeps its own width unless it has `stretch`, and so does an `autoFit` text field. No example or block anywhere combines them (`packages/opui/css/components/control-group.css:33-47`, `packages/opui/css/components/control-group.css:106-109`, `src/component-api/control-group/api.ts:85-92`, `src/component-examples/control-group/Fields.astro:13-46`)
  - Summary: Readers can't see how a number field, such as a quantity next to Add to cart, sits in a control group.
  - Recommended: Fix. One more group in the Fields example covers it, and the Number field page already pitches a quantity.
  - Fix: add a group to `Fields.astro` with a `NumberField` (hidden label "Quantity") and an "Add to cart" `Button`. Run `pnpm build-examples` and record the parity snapshot as intended.
  - Fixed: `Fields.astro` adds a primary filled group named "Add to cart" with a `NumberField` (hidden label "Quantity", 1 to 10) and an "Add to cart" `Button`. Checked in Chromium: the group keeps its own width and the field its steppers. The parity snapshot change is intended.
- [x] (1) Copy: the Snippet section's only sentence documents `data-copy-ignore`, but nothing in the Snippet example has it. The button and tooltip stay out of the copied text only because `copy.js` drops every `button` and `[popover]` by itself (`src/docs/components/copy.astro:150-157`, `src/component-examples/copy/Snippet.astro:5-30`, `packages/opui/elements/copy.js:16-17`)
  - Summary: The Snippet section names an attribute its example never uses, so readers can't see what it leaves out.
  - Recommended: Fix. A prompt marked `data-copy-ignore` shows the attribute the way readers would use it.
  - Fix: in `Snippet.astro`, write the command with a prompt that isn't copied. Run `pnpm build-examples` and record the parity snapshot as intended.
    ```astro
    <pre
      class="ui-code-block"
    ><code><span data-copy-ignore>$ </span>npm install opui-css</code></pre>
    ```
  - Fixed: Fixed: the Snippet example writes the command with a `<span data-copy-ignore>$ </span>` prompt, and the e2e test that checks the copied text (still "npm install opui-css") names the ignored prompt. The copy/Snippet parity snapshot changed on purpose.
- [x] (1) Description list: the Basics and Bordered examples and the anatomy describe an apartment with "Price 6 950 000" and no currency. Usage promises order details, and the Orientation and Total examples price an order in euros (`src/component-examples/description-list/Basics.astro:10-23`, `src/component-examples/description-list/Bordered.astro:10-38`, `src/docs/components/description-list.astro:60`, `src/docs/components/description-list.astro:121-130`)
  - Summary: The first Description list examples show a price with no currency, next to an order summary in euros.
  - Recommended: Fix with option A. It matches the Usage item and the order rows the page already uses.
  - Fix: change Basics, Bordered and the anatomy together, then run `pnpm build-examples` and record the parity snapshots as intended.
  - Options:
    - A (recommended): order details, such as Order number, Placed on and Status.
    - B: keep the apartment and write the price with its currency, "6 950 000 kr".
  - Fixed: Option A: Basics, Bordered, the anatomy and the Under the hood build show an order, with Order number, Placed on and Status. The description-list Basics and Bordered parity snapshots changed (intended).
- [x] (1) Description list: the Orientation example only shows `orientation="horizontal"` in an 18rem box, so the page never shows a list stacking at `45ch`, the default its text describes. Its Subtotal, Shipping and Total rows also repeat the Total example with different amounts (`src/component-examples/description-list/Orientation.astro:10-27`, `src/component-examples/description-list/Total.astro:10-23`, `src/docs/components/description-list.astro:89-97`)
  - Summary: The Orientation preview shows one horizontal list, so readers never see a list stack in a narrow space.
  - Recommended: Fix. Two lists at the same width show both orientations.
  - Fix: put the same 18rem list twice in `Orientation.astro`, the first without `orientation` and the second with `orientation="horizontal"`. Use rows that aren't an order total, such as Plan, Seats and Renews. Run `pnpm build-examples` and record the parity snapshot as intended.
  - Fixed: Orientation shows the same 18rem bordered list twice, stacked by default and with `orientation="horizontal"`, with Plan, Seats and Renews rows, in a spacious column. The parity snapshot changed (intended).
- [x] (1) Dialog: the Accessibility section puts its MDN and APG source paragraph after Keyboard support, which the guide puts last in the slot. Drawer orders the same parts differently: bullets, then its MDN source, then Role & attributes and Keyboard support (`src/docs/components/dialog.astro:204-255`, `src/docs/components/drawer.astro:175-232`, `src/docs/components/AGENTS.md:293`)
  - Summary: The Dialog page ends its Accessibility section with a source note after the keyboard table, while Drawer puts its source first.
  - Recommended: Fix. The guide puts Keyboard support last, and the two sibling pages can share one order.
  - Fix: on both pages, order the slot as Role & attributes, the source paragraph, then `<KeyboardSupport />`. Move Drawer's two bullets under its Role & attributes table.
  - Fixed: Fixed: both pages order the slot as Role & attributes, the source paragraph, then Keyboard support, and Drawer's two bullets sit under its Role & attributes table.
- [x] (1) Drawer: the Basics example wraps its four buttons in `<div class="example-compass">`, a docs-site class, and has no `BasicsCode.*`, so the code tab shows a wrapper that does nothing on a reader's page. The done Tooltip item about the same wrapper said to treat Drawer's Basics the same way, but only Tooltip got a `PositionCode` (`src/component-examples/drawer/Basics.astro:20-27`, `src/component-examples/drawer/Basics.html:1`, `src/styles/example-layout.css:14`, `src/component-examples/tooltip/PositionCode.astro:1-12`)
  - Summary: The copied Drawer snippet includes a class that only exists on the docs site.
  - Recommended: Fix. Tooltip's `PositionCode` and ControlGroup's `VerticalCode` already drop docs-only wrappers this way.
  - Fix: add `src/component-examples/drawer/BasicsCode.astro` without the wrapper. Run `pnpm build-examples` and record the new parity snapshot as intended.
  - Fixed: Fixed: `src/component-examples/drawer/BasicsCode.astro` drops the wrapper, with its generated files and a new drawer/BasicsCode parity snapshot, recorded on purpose.
- [x] (1) Drawer: the "When not to use" item "Content used together with the page: the drawer makes the page inert." gives a reason but no alternative. None of the three "When to use" items links the Basics drawers that show them (`src/docs/components/drawer.astro:83-94`, `src/docs/components/AGENTS.md:285-286`)
  - Summary: The Drawer's Usage list says when not to use a drawer without saying what to use instead.
  - Recommended: Fix. The guide asks every "When not to use" item to name the alternative, as the page's other item does.
  - Fix: name the alternative, for example "Content used together with the page, like filters beside results: use a sticky column with the <DocLink href="/components/layout#sticky">Layout</DocLink> classes." Link the navigation, filters and details items to `#basics`.
  - Fixed: Fixed: the item reads "Content used together with the page, like filters beside the results: use a sticky column with the Layout classes", linked to `/components/layout#sticky`, and the three "When to use" items each give an example after "like" and link `#basics`.
- [x] (1) Divider: the Basics and Spacing examples are text about the example. Basics reads "This text is placed over" and "This text is placed under". Spacing explains the CSS: "Inside a card, the gap spaces the divider.", "Nested deeper, it uses the card's tighter space.", "So everything stays close together." and "A custom space on any wrapper reaches every divider inside it." (`src/component-examples/divider/Basics.astro:5-7`, `src/component-examples/divider/Spacing.astro:5-19`)
  - Summary: The Divider previews describe the divider instead of showing content a divider would separate.
  - Recommended: Fix. The Content example already uses real labels like "or continue with email" and "Billing".
  - Fix: separate real content, such as two settings paragraphs in Basics and the sections of an order summary card in Spacing. Run `pnpm build-examples` and record the parity snapshots as intended.
  - Fixed: Basics separates two notification settings, and Spacing shows an order summary card ("Order 1042, placed on 3 March.", then "Two linen shirts: €98" and "Shipping: free" inside the content) and a wrapper with "Ships to Lena Ek, Stockholm" and "Arrives in 2 to 4 days", with the same structure as before. Both parity snapshots were re-recorded on purpose.
- [x] (1) Docs: three page descriptions shown in search results and the components list don't match the plain one-sentence style of Copy, Menu and ControlGroup. Description list: "Description lists are used to display a list of terms and their descriptions." List copies Material's "Lists are continuous, vertical indexes of text and images and video. Use lists to help users find a specific item and act on it." Dialog says "By design the Dialog is minimal with zero content to allow for both modal and non-modal use.", though it has header, content and footer parts. The Divider preamble is "It's just a line." (`src/docs/components/description-list.astro:21-22`, `src/docs/components/list.astro:18-19`, `src/docs/components/dialog.astro:32-33`, `src/docs/components/divider.astro:39`)
  - Summary: Search results and the components list describe Dialog, List and Description list in another voice, and Dialog's says it has no content.
  - Recommended: Fix. One plain sentence per page matches the newer descriptions.
  - Fix: - Description list: "Terms and their values, like order details or totals."
    - List: "Rows of similar items, like contacts, files or settings, with icons, controls and links."
    - Dialog: "A window over the page for a question or a short task, modal or not."
    - Divider preamble: "A line between content, with an optional label."
  - Fixed: With the suggested sentences: Description list "Terms and their values, like order details or totals.", List "Rows of similar items, like contacts, files or settings, with icons, controls and links.", Dialog "A window over the page for a question or a short task, modal or not." and the Divider preamble "A line between content, with an optional label." The search index and the skill references pick them up at the next build (`scripts/generated-files.json`).
- [x] (1) Form: the Field group example is a Radiohead quiz with the descriptions "There are no wrong answers." and "Some are better than others.". The Invalid example's error reads "Your pet is hungry.", which doesn't say what to fix (`src/component-examples/form/FieldGroup.astro:15-27`, `src/component-examples/form/FieldsetInvalid.astro:12-20`)
  - Summary: Two Form examples read as jokes, and the invalid fieldset's error doesn't tell the user what to do.
  - Recommended: Fix. The Text field examples got the same fix, with end text that says what to do.
  - Fix: use product content in Field group, such as "Plan" radios (Free, Pro, Team) and "Add-ons" checkboxes (Backups, Encryption, Single sign-on, as in Layout's MaxColumns). Make the Invalid error say what to do, such as "Choose at least one food.". Run `pnpm build-examples` and record the parity snapshots as intended.
  - Fixed: Field group shows Plan radios and Add-ons checkboxes (Backups, Encryption, Single sign-on, each with an end text). The plans are Starter, Team and Business rather than the suggested Free, Pro and Team, to match the plan set of the Examples plan item. The Invalid error reads "Choose at least one food.". The parity snapshot changes are intended.
- [x] (1) Form: the Kitchen sink uses "Jane Doe" and "jane@example.com" as placeholders, while the Text field examples use "Ada Lovelace" and "name@example.com" for the same Full name and Email fields (`src/component-examples/form/KitchenSink.astro:33-45`, `src/component-examples/text-field/Validation.astro:6-9`)
  - Summary: The Form and Text field pages fill the same name and email fields with different sample people.
  - Recommended: Fix. One sample person across pages reads as one product.
  - Fix: use "Ada Lovelace" and "name@example.com" in `KitchenSink.astro`. Run `pnpm build-examples` and record the parity snapshot as intended.
  - Fixed: The Kitchen sink placeholders are "Ada Lovelace" and "name@example.com". The parity snapshot change is intended.
- [x] (1) Form: the See also list calls the Text field page "Text Field", while that page's title and every other mention write "Text field" (`src/docs/components/form.astro:65`, `src/docs/components/text-field.astro:61`)
  - Summary: The Form page's See also list writes Text Field in title case, unlike the page it links.
  - Recommended: Fix. A one-word change.
  - Fix: `{ name: "Text field", href: "/components/text-field" }`.
  - Fixed: The Form See also entry reads "Text field".
- [x] (1) Form: the page's unlayered `<style is:global>` gives every button-only `.ui-field-group` on the page `margin-block-start: var(--size-4)`. Its selector doesn't skip `.ui-vertical`, which `form.css` does, so the Actions section's vertical group gets a top margin in the preview that the copied code doesn't have. The comment says the rule exists only for the Kitchen sink's hidden `hr`s (`src/docs/components/form.astro:247-261`, `packages/opui/css/components/form.css:98-106`, `src/component-examples/form/ActionsColumn.astro:5-8`)
  - Summary: On the Form page, the vertical actions preview gets a top margin that the copied code doesn't have.
  - Recommended: Fix. The library rule already covers every other case, so the page only needs the Kitchen sink case.
  - Fix: keep only the Kitchen sink selector.
    ```css
    #form-kitchen-sink-1:not(.kitchen-sink-dividers) > .ui-field-group {
      margin-block-start: var(--ui-space-4);
    }
    ```
  - Fixed: The Form page keeps only the Kitchen sink rule, `#form-kitchen-sink-1:not(.kitchen-sink-dividers) > .ui-field-group { margin-block-start: var(--ui-space-4) }`, so the vertical Actions preview matches its code and the library rule spaces every other button group.
- [x] (1) Form, Layout: the Kitchen sink puts Cancel after the filled Send button, and the Layout Row example puts Cancel after the filled Save. The Card, Dialog, Layout Align and Composition examples, and Form's own Divider example, put the filled action last (`src/component-examples/form/KitchenSink.astro:125-128`, `src/component-examples/layout/Row.astro:5-10`, `src/component-examples/layout/Align.astro:10-13`, `src/component-examples/card/Actions.astro:16-17`, `src/component-examples/dialog/FooterContent.astro:29-40`)
  - Summary: Form and Layout examples switch where the main action sits next to Cancel, so the pages suggest two conventions.
  - Recommended: Fix. Most examples already end the row with the filled action.
  - Fix: put Cancel before Send in `KitchenSink.astro`, and end `Row.astro` with Save (Cancel, Share, Preview, Save). Run `pnpm build-examples` and record the parity snapshots as intended.
  - Fixed: The Kitchen sink puts Cancel before Send, and Layout Row reads Cancel, Share, Preview, Save. The parity snapshot changes are intended.
- [x] (1) Layout: the Columns cards read "Content" and "Aside", and the second List card reads "Engineering, with a longer description that wraps onto a second line.". These were missed by the done item that replaced the numbered boxes (`src/component-examples/layout/Columns.astro:10-15`, `src/component-examples/layout/List.astro:12-16`)
  - Summary: Two Layout previews label their cards with what the example does instead of real content.
  - Recommended: Fix. The Sticky example already shows a settings page in the same two columns.
  - Fix: show a project and its details in Columns, such as "Website relaunch: 12 open tasks" and "Due 14 March". Give the List card a team description, such as "Engineering: builds and runs the app and the API". Run `pnpm build-examples` and record the parity snapshots as intended.
  - Fixed: Columns reads "Website relaunch: 12 open tasks" and "Due March 14", and the second List card "Engineering: builds and runs the app and the API". The layout Columns and List parity snapshots changed (intended).
- [x] (1) List: the page's global style `.tab-panel ul { margin: 0 auto; max-inline-size: 40ch; }` matches nothing on the List page. `.tab-panel` only exists in the Tabs page's Under the hood markup (`src/docs/components/list.astro:284-289`, `src/components/UnderTheHood/TabsBuild.astro:234`)
  - Summary: The List page carries a leftover style block that styles nothing on it.
  - Recommended: Fix. Deleting it changes nothing on the page.
  - Fix: delete the `<style is:global>` block from `list.astro`.
  - Fixed: The `<style is:global>` block is gone from `list.astro`.
- [x] (1) Examples: several examples name their controls after the API value they show instead of a real task. Number field Variants labels its fields "Outlined" and "Filled". Radio End text and Label position offer "Default" and "Stack" with the end text "Supporting text", and the Checkbox and Switch copies do the same. Spinner Buttons labels its busy buttons "Filled", "Outlined" and "Text", which is also the only accessible name of the three icon-only buttons (`src/component-examples/number-field/Variants.astro:5-11`, `src/component-examples/radio/EndText.astro:5-15`, `src/component-examples/radio/LabelPosition.astro:5-8`, `src/component-examples/spinner/Buttons.astro:5-21`, `src/component-examples/checkbox/EndText.astro:5-9`, `src/component-examples/switch/EndText.astro:5-6`, `src/component-examples/checkbox/EndText.astro:5-14`, `src/component-examples/checkbox/LabelPosition.astro:5-6`, `src/component-examples/radio/EndText.astro:4-15`, `src/component-examples/switch/EndText.astro:4-8`, `src/component-examples/switch/EndText.astro:5-8`, `src/component-examples/switch/Validation.astro:5-21`, `src/component-examples/switch/EndText.html:3-9`, `src/component-examples/switch/Validation.html:4-32`)
  - Summary: Some previews read as placeholders, and a screen reader hears "Filled, button" for a busy icon-only button.
  - Recommended: Fix. The Select, Range and Progress examples for the same sections already use real labels.
  - Fix: rewrite the copy in the Astro files and run `pnpm build-examples`. Suggestions:
    - Number field: "Guests" (outlined) and "Nights" (filled).
    - Radio: "Standard delivery" with "Arrives in 3 to 5 days.".
    - Spinner: "Save", "Upload" and "Send", with the same names in the icon-only row.
  - Add `Supporting text` to the placeholder-label pattern in `tests/unit/example-copy.test.ts` so it stays out. Leave the `disabled` on the outlined busy button to the open Spinner screen reader item.
  - The Switch Validation example's invalid switches carry "Supporting text" as their error, so give them an end text that says what's wrong, such as "Sync needs cloud backup. Turn it on to continue."
  - Fixed: Number field Variants asks for Guests and Nights; Radio End text and Label position offer Standard and Express delivery with arrival times; Checkbox End text and Label position offer Gift wrap and Gift message; Switch End text and Label position offer Daily digest and Mentions; Switch Validation shows Two-step login and Usage reports as required, and Public profile and Cloud backup with errors that say what to do; Spinner Buttons reads Save, Upload and Send in both rows. The copy test flags `Supporting text` and now reads the `endText` and `startText` props too, with a sample; in this branch it still fails on the List examples, which the merged List copy fix (e21c0af4) already rewrote. The parity snapshot changes are intended.
- [x] (1) Examples: Stat writes thousands with a plain space ("48 210", "1 024"), and so do Typography, Layout and Description list. Table, Badge and Card write a comma ("12,742", "3,000", "€1,040"). A plain space can also break a Stat value across two lines (`src/component-examples/stat/Basics.astro:6`, `src/component-examples/stat/Sizes.astro:5-7`, `src/docs/components/stat.astro:50-51`, `src/component-examples/typography/TabularNumbers.astro:4-8`, `src/component-examples/table/Sortable.astro:28-63`, `src/component-examples/table/StickyHeader.astro:65-75`, `src/component-examples/typography/TabularNumbers.astro:4`, `src/component-examples/typography/TabularNumbers.astro:8`, `src/component-examples/table/Sortable.astro:28`, `src/component-examples/table/Numeric.astro:26`, `src/docs/components/stat.astro:51`)
  - Summary: Large numbers are written two ways across pages, "48 210" on Stat and "12,742" in tables.
  - Recommended: Fix with option A. The comma matches the English copy and the decimal point in "+12.4%".
  - Options:
    - A (recommended): use commas in the Stat, Typography, Layout and Description list examples and in the Stat anatomy, run `pnpm build-examples`, and re-record the parity snapshots (intended).
    - B: keep the space everywhere, tables included, as a narrow no-break space (U+202F).
  - A screen reader may also read a plain-space number like "48 210" as two numbers, so the comma helps there too.
  - Fixed: Option A: Stat Basics and Sizes, Typography TabularNumbers, Layout Divided and the Stat anatomy write commas, and the Description list price went with the order details. Parity snapshots changed (intended). `src/blocks/analytics-dashboard.html` still writes spaces ("48 210", "5 840 visitors"); it is a block, outside the examples this item names.
- [x] (1) Examples: plan names and prices differ from the set the Pricing block and the Card Colors example use (Starter €0, Team €12, Business €24): Radio Hidden label lists Basic $0, Pro $12 and Team $48, Radio Binding offers Free, Pro and Team, and Select Disabled offers Business and Enterprise (`src/component-examples/radio/HiddenLabel.astro:22-48`, `src/component-examples/radio/FieldGroupBinding.astro:12-19`, `src/component-examples/select/Disabled.astro:5-8`, `src/component-examples/card/Colors.astro:20-50`, `src/blocks/pricing.html:143-241`)
  - Summary: The same product sells different plans at different prices, in dollars on one page and euros elsewhere.
  - Recommended: Fix. One plan set keeps the examples reading as one product.
  - Fix: - Radio Hidden label: Starter, Team and Business at €0, €12 and €24 ("Pick Starter" and so on).
    - Radio Binding: the same three names. Its React, Svelte and Vue ports are hand-written, so edit them as well.
    - Select Disabled: Team and Business.
    - Then run `pnpm build-examples`.
  - Fixed: Radio Hidden label lists Starter, Team and Business at €0, €12 and €24 ("Pick Starter" and so on), Radio Binding offers Starter, Team and Business in all five formats (the three ports by hand), and Select Disabled offers Team and Business. The Radio Binding interaction test uses the new names. The parity snapshot changes are intended.
- [x] (1) Message: the Messages API says a date `Divider` in an `li` can sit between messages and starts a new run, but no example on the page shows one. Only the chat block does, with `<li class="ui-divider">Today</li>` and `--ui-divider-gap: 0` on the list. The `Divider` component renders a `div` or `hr`, not an `li` (`src/component-api/messages/api.ts:24-30`, `src/component-examples/message/GroupChat.astro:5-25`, `src/blocks/chat.html:53`, `src/blocks/chat.html:299`)
  - Summary: Readers don't see how to put a date between messages, which the API table mentions.
  - Recommended: Fix. One line in the Group chat example covers it.
  - Fix: open the Group chat example with a "Today" divider `li`, as the chat block does, and run `pnpm build-examples`. If the list needs the block's `--ui-divider-gap: 0`, move that rule into `message.css` rather than the example.
  - Fixed: Group chat opens with `<li class="ui-divider">Today</li>`, and its section says to put a date in one. The default `--ui-divider-gap` (1.5rem to 2rem) is too much in a chat and the block's `0` crowds a divider between messages, so `message.css` gives a `.ui-divider` child of `.ui-messages` `--ui-space-2` above and below, and the chat block drops its `--ui-divider-gap: 0`. The Messages slot row names `li.ui-divider`, since the `Divider` component renders no `li`. The parity snapshot changed (intended).
- [x] (1) Number field: the Buttons section has text but no example. The `decrease-icon` and `increase-icon` slots that the parts table documents appear in no example and in no text on the page (`src/docs/components/number-field.astro:166-177`, `src/component-api/number-field/api.ts:162-181`, `packages/opui/components/NumberField/NumberField.astro:79`, `packages/opui/components/NumberField/NumberField.astro:108`)
  - Summary: Readers can't see how to swap the step buttons' icons or translate their names.
  - Recommended: Fix. One example covers the section and both slots.
  - Fix: - Add a Buttons example: a translated field with `decreaseLabel`, `increaseLabel` and an `svg` in each icon slot.
    - Show it in the Buttons section and run `pnpm build-examples`.
    - Remove the two `NumberField.*Label` entries from `tests/unit/example-coverage-allowlist.json`.
  - Fixed: A new `number-field/Buttons` example shows a Swedish field in the Buttons section: a `lang="sv"` wrapper, "Antal", `decreaseLabel="Minska"`, `increaseLabel="Öka"`, and chevron icons in the `decrease-icon` and `increase-icon` slots. The two `NumberField.*Label` entries are out of `tests/unit/example-coverage-allowlist.json`. Its parity snapshot is new. It needs a visual baseline (`update-snapshots` label).
- [x] (1) Number field: the Basics text tells component readers to set `min`, `max` and `step`, but the Basics example sets no `step`. The Step section, which does, has no text on any framework (`src/docs/components/number-field.astro:109-120`, `src/docs/components/number-field.astro:146-149`, `src/component-examples/number-field/Basics.astro:5-11`, `src/component-examples/number-field/Step.astro:5-12`)
  - Summary: The Basics text names a step its example doesn't set, and the Step section says nothing.
  - Recommended: Fix. It moves one word to the section that shows it.
  - Fix: Basics "Set `min` and `max`.", and Step "Use `step` for decimals." on every framework, since `step` is native.
  - Fixed: Basics reads "Set `min` and `max`." for the components. The Step section reads "Use `step` for decimals." on every framework.
- [x] (1) OneTimeCode: the Validation section says to use `error` for server-side errors. Its example shows a four-digit code with "Enter all 6 digits.", an incomplete code that the browser's own `required` and `pattern` checks already catch (`src/docs/components/one-time-code.astro:171-179`, `src/component-examples/one-time-code/Validation.astro:5-12`)
  - Summary: The Validation example shows a client-side error under text about server-side errors.
  - Recommended: Fix. The example should show the case the sentence describes.
  - Fix: show a complete code the server rejected, such as `value="482193"` with `endText="That code has expired. Request a new one."`. Run `pnpm build-examples` and re-record the parity snapshot (intended).
  - Fixed: The example shows `value="482193"` with "That code has expired. Request a new one.". The parity snapshot is re-recorded (intended).
- [x] (1) Progress: the accessibility example's copy describes itself: "Content here is loading." in the busy section, and "Content loading…" as the bar's name (`src/component-examples/progress/AriaBusy.astro:5-8`, `src/docs/components/progress.astro:117-129`)
  - Summary: The busy-section example reads as a placeholder instead of a real loading state.
  - Recommended: Fix. It is two strings in one Astro file.
  - Fix: use a real section, such as invoices loading, with "Loading invoices" as the bar's `aria-label`. Then run `pnpm build-examples`.
  - Fixed: The busy section reads "Your invoices from the last 12 months appear here." and the bar is named "Loading invoices". The parity snapshot changed (intended).
- [x] (1) Radio: on the Svelte and Vue pages, the Field group section opens with the "Without `bind:group`" (or `v-model`) example. Svelte and Vue readers meet it before the Orientation, Disabled, Required and Validation subsections, and before the Binding subsection at the end that introduces `bind:group` and `v-model`. The page passes it in the partial's default slot (`src/docs/components/radio.astro:170-189`, `src/docs/components/partials/FieldGroupNotes.astro:22-27`, `src/docs/components/partials/FieldGroupNotes.astro:57-74`)
  - Summary: Svelte and Vue readers see the alternative to binding several subsections before the binding itself.
  - Recommended: Fix. A second slot in the partial puts the example next to the Binding subsection.
  - Fix: give `FieldGroupNotes` a named slot after the Binding example and pass the Svelte and Vue Controlled examples there. The default slot keeps the Checkbox and Switch `FieldGroup` examples.
  - Removed: The claim doesn't hold on the current page: `radio.astro` renders `<FieldGroupNotes control="radio" />` without children and puts the Svelte and Vue Controlled examples in a `Conditional` after it, so they already follow the Binding subsection.
- [x] (1) Range: the Value section shows two examples, but its text only names `valueSuffix`. Commit 34504492 removed what it said about the ValueText example: the custom readout goes in the `value-text` slot, the library doesn't update it, and the example sets its own `aria-valuetext` (`src/docs/components/range.astro:118-131`, `src/component-examples/range/ValueText.astro:5-25`)
  - Summary: The custom temperature readout appears with no word on the slot it uses or why it needs its own script.
  - Recommended: Fix. One sentence fits the section rules, which allow an accessibility attribute.
  - Fix: add "For your own readout, use the `value-text` slot, update it on `input`, and set `aria-valuetext` to match.", using `<Conditional>` for React's `valueText` prop, the Svelte snippet, and the HTML `output.ui-value` without `data-live`.
  - Fixed: The Value section has a second sentence per framework, each ending with setting `aria-valuetext` to match: the `value-text` slot updated on `input` in Astro, `valueText` rendered from your state in React, the `valueText` snippet from the bound value in Svelte, the `value-text` slot from the `v-model` value in Vue, and an output without `data-live` updated on `input` in HTML.
- [x] (1) Rating: the Sizes example labels the middle size "Default". Every other Sizes example that labels its sizes says "Medium" (`src/component-examples/rating/Sizes.astro:10-14`, `src/component-examples/number-field/Sizes.astro:12`, `src/component-examples/stat/Sizes.astro:6`)
  - Summary: Rating names its middle size "Default" where the other Sizes examples say "Medium".
  - Recommended: Fix. It is one label and its `name`.
  - Fix: `label="Medium"` and `name="size-medium"`, then run `pnpm build-examples`.
  - Fixed: `label="Medium"` and `name="size-medium"`, regenerated with `pnpm build-examples`. The rating/Sizes snapshot change is intended.
- [x] (1) Rating: the React, Svelte and Vue Input examples are listed as hand-written because "Its value is bound", but the Astro example binds nothing, nothing on the page reads the bound state, the Input section hasn't mentioned binding since commit 34504492, and `convertExample` writes all three (`scripts/hand-written-examples.json:35-37`, `src/component-examples/rating/Input.react.tsx:6-18`, `src/component-examples/rating/Input.svelte:1-7`, `src/component-examples/rating/Input.vue:1-10`, `src/docs/components/rating.astro:77-93`)
  - Summary: The Input example's framework code adds state that nothing on the page uses or explains.
  - Recommended: Fix with option A. The generator writes these files, and its output matches the page text.
  - Options:
    - A (recommended): remove the three entries from `scripts/hand-written-examples.json` and run `pnpm build-examples`.
    - B: keep them, and say in the Input section how to follow the rating in each framework: `value` with `onChange`, `bind:value` or `v-model`.
  - Fixed: Fixed with option A: the three entries are gone from `scripts/hand-written-examples.json`, and `pnpm build-examples` wrote `defaultValue={3}` in React, `value={3}` in Svelte and `:value="3"` in Vue.
- [x] (1) Select: the Spread example's start and end texts are fragments without a final period, such as "Select your country of residence" and "Cannot be changed after deploy". The page's End text and Validation examples, and the Number field, One-time code and Range examples, end theirs with one. The first start text repeats the label, and its empty options read "Select a country" where most examples on the page use "-" (`src/component-examples/select/Spread.astro:5-88`, `src/component-examples/select/EndText.astro:5-21`, `src/component-examples/number-field/Spread.astro:5-24`, `src/component-examples/select/Variants.astro:6`)
  - Summary: The Select Spread texts are fragments without periods, unlike the full sentences in the neighboring examples.
  - Recommended: Fix. It is copy in one Astro file.
  - Fix: end each text with a period, drop the start text that repeats the label, use "-" for the empty options, and run `pnpm build-examples`. The Text field and Textarea Spread examples have the same fragments (`src/component-examples/text-field/Spread.astro:14-75`, `src/component-examples/textarea/Spread.astro:15-69`).
  - Fixed: Every start and end text in the Select Spread example ends with a period, the Country select drops "Select your country of residence", which repeated its label, and the empty options read "-". The select/Spread snapshot change is intended. The Text field and Textarea Spread fragments are left to their own item ("Text field, Textarea: in the Spread examples, some end texts end with a period").
- [x] (1) Spinner: two Usage items break the guide's rules. "Loading content in a small area, like a card." links no section, and no example shows a card. The When not to use item "A busy section with a progress bar: it gets no spinner" names no alternative (`src/docs/components/spinner.astro:38-52`, `src/docs/components/AGENTS.md:285-286`)
  - Summary: The Spinner usage list points to a card example that isn't on the page and to a case with nothing to use instead.
  - Recommended: Fix. The guide asks each item to link its section, and each When not to use item to name the alternative.
  - Fix: link the first item to `#basics` (making the Basics example a card works too). Drop the second item: the first When not to use item already points to Progress.
  - Fixed: The card item links `#basics`. The second When not to use item couldn't just go, since `tests/unit/docs-sections.test.ts` needs two or three items per list, so it names another case with its alternative: a long task in the background, like an export, confirmed with a Toast.
- [x] (1) Spinner: the subheadings of the no-spinner section, "1. Because it's blocked by another use case" and "2. Because it doesn't make sense", are numbered and conversational, and don't name the cases a reader scans for (`src/docs/components/spinner.astro:71-91`, `src/utils/whats-new.ts:1087`)
  - Summary: The two exception headings read as asides rather than names of the cases.
  - Recommended: Fix. Short headings match the rest of the docs.
  - Fix: rename them "With `aria-describedby`" and "On elements that can't show one". Keep the ids, which the What's new link (`#blocked-by-another-use-case`) points to.
  - Fixed: The headings read "With `aria-describedby`" and "On elements that can't show one", with their ids kept, and the text under the first no longer repeats its heading.
- [x] (1) Stepper: the Sizes section has no text, and its example shows one small stepper, so nothing on the page says which prop or class makes it small. Timeline's Sizes section names `size="small"` and `.ui-small` (`src/docs/components/stepper.astro:114-118`, `src/component-examples/stepper/Sizes.astro:12`, `src/docs/components/timeline.astro:127-134`)
  - Summary: The Stepper's Sizes section shows a stepper without saying it is the small size or how to get it.
  - Recommended: Fix. One sentence, as on the Timeline page.
  - Fix: `<p>Use <PropOrClass prop='size="small"' class=".ui-small" /> for tight spaces.</p>` above the example.
  - Fixed: Added `<p>Use <PropOrClass prop='size="small"' class=".ui-small" /> for tight spaces.</p>` above the example.
- [x] (1) Switch: the Field group orientation example shows Bold, Italic and Underline switches under "Show in toolbar". The page's own "When not to use" sends toolbar options to a Toggle, and the Toggle Multi-select example uses those same three (`src/component-examples/switch/FieldGroupOrientation.astro:7-12`, `src/component-examples/switch/FieldGroupOrientation.html:3`, `src/docs/components/switch.astro:101-104`, `src/component-examples/toggle/MultiSelect.astro:5-9`)
  - Summary: Readers see Bold, Italic and Underline as switches on a page that says toolbar options belong in a Toggle.
  - Recommended: Fix. Any row of settings shows the horizontal layout just as well.
  - Fix: a legend and settings that apply right away, such as "Show in sidebar" with "Calendar", "Files" and "Tasks". Then run `pnpm build-examples` and update the parity snapshot.
  - Fixed: The orientation example shows "Show in sidebar" with Calendar, Files and Tasks. The parity snapshot change is intended.
- [x] (1) Table: the density, Controls and Advanced examples write captions and headers in Title Case ("Band Members", "Nordic Countries Overview", "Major Cities", "2nd Largest", "National Animal", "National Bird"). The other table examples use sentence case ("Deployed by", "Customers in Lisbon") (`src/component-examples/table/Normal.astro:14`, `src/component-examples/table/Dense.astro:14`, `src/component-examples/table/Spacious.astro:14`, `src/component-examples/table/Controls.astro:23`, `src/component-examples/table/Advanced.astro:17-36`)
  - Summary: Table captions and headers switch between Title Case and sentence case from one example to the next.
  - Recommended: Fix. Sentence case, as the Form examples were changed to.
  - Fix: "Nordic countries", "Major cities", "2nd largest", "3rd largest", "National animal", "National bird" and species in sentence case ("Mute swan", "Brown bear"). Use "Band members" unless the roster item below replaces it. Then run `pnpm build-examples` and update the parity snapshots, saying so in the commit.
  - Fixed: Sentence case throughout: "Team members", "Nordic countries", "Major cities", "2nd largest", "3rd largest", "National animal", "National bird", and species such as "Mute swan", "Brown bear" and "White-throated dipper". The snapshot changes are intended.
- [x] (1) Table: the Normal, Dense, Spacious and Controls examples are a two-row "Band Members" table of real musicians from two bands (Korn, Radiohead). The Sticky header customers are first names only (Ada, Grace, Linus, ...), with amounts in exact steps of 130 euros. The other examples use the site's cast (Lena Ek, Tom Tanaka, Elif Rahman) and plausible figures (`src/component-examples/table/Normal.astro:22-33`, `src/component-examples/table/Controls.astro:31-68`, `src/component-examples/table/StickyHeader.astro:26-77`, `src/component-examples/table/Expandable.astro:50`)
  - Summary: The first tables on the page show a two-row roster of real band members and invoices that climb in identical steps.
  - Recommended: Fix. The Expandable and In a card examples already show the tone and names to reuse.
  - Fix: - Normal, Dense and Spacious: a "Team members" table with Name, Role and Location for the cast.
    - Controls: a Role select (Designer, Developer, Product manager, Support).
    - Sticky header: full customer names and uneven amounts.
    - Then run `pnpm build-examples` and update the parity snapshots, saying so in the commit.
  - Fixed: Normal, Dense and Spacious are a "Team members" table (Name, Role, Location) of Lena Ek, Tom Tanaka and Elif Rahman. Controls has a Role select (Designer, Developer, Product manager, Support) for Lena Ek and Tom Tanaka. Sticky header has full customer names and uneven amounts. The snapshot changes are intended.
- [x] (1) Table: the Advanced section has no text, and its heading doesn't say what it shows. It is the only example of `TableColumnGroup`, `TableColumn`, `rowspan`, `colspan`, `scope` and row headers, which have API tables of their own (`src/docs/components/table.astro:246-250`, `src/component-examples/table/Advanced.astro:16-86`)
  - Summary: Readers can't tell what the Advanced table demonstrates, or that it is the column group example.
  - Recommended: Fix. A clearer heading and one sentence, like the other sections.
  - Fix: rename the heading "Grouped headers" and keep `id="advanced"`, which `src/utils/whats-new.ts:1188` links to. Add one sentence, written once with `<Conditional>`: group columns with `TableColumnGroup` (`colgroup`), span headers with `colspan` and `rowspan`, and give each header a `scope`.
  - Fixed: The section heading is "Grouped headers" and keeps `id="advanced"`, with one `Conditional` sentence: group columns with `TableColumnGroup` (`<colgroup>` in HTML), span headers with `colspan` and `rowspan`, and give each header a `scope`.
- [x] (1) Chip, Text field, Textarea: the Sizes examples label the smallest field "x-small" in lowercase next to "Small", "Medium" and "Large". The earlier fix wrote "X-small" in the Checkbox, Number field and Range Sizes examples but missed these two (`src/component-examples/text-field/Sizes.astro:5`, `src/component-examples/text-field/Sizes.html:2`, `src/component-examples/textarea/Sizes.astro:5`, `src/component-examples/textarea/Sizes.html:2`, `src/component-examples/chip/Sizes.astro:5`)
  - Summary: One size label in the Text field and Textarea Sizes previews starts with a lowercase letter while its siblings are capitalized.
  - Recommended: Fix. The same change the other Sizes examples got.
  - Fix: `label="X-small"` in both `.astro` files. Run `pnpm build-examples` and update the two parity snapshots, saying so in the commit. `src/component-examples/chip/Sizes.astro:5` has the same label.
  - Fixed: `label="X-small"` in the Text field, Textarea and Chip Sizes examples. The three parity snapshots are re-recorded (intended).
- [x] (1) Text field, Textarea: the Variants, Sizes and Autosuggest fields use the placeholder "Placeholder". The Numeric field's label and placeholder are both "Numeric", and the Textarea Auto-fit field's are both "Auto-fit". Other examples on both pages use real fields ("Project name", "Bio") (`src/component-examples/text-field/Variants.astro:5-6`, `src/component-examples/text-field/Sizes.astro:5-8`, `src/component-examples/text-field/Autosuggest.astro:8`, `src/component-examples/text-field/Autosuggest.astro:20`, `src/component-examples/text-field/Numeric.astro:5`, `src/component-examples/textarea/Variants.astro:5-6`, `src/component-examples/textarea/Sizes.astro:5-8`, `src/component-examples/textarea/AutoFit.astro:5`)
  - Summary: Several Text field and Textarea previews show the word Placeholder or the feature name instead of a field someone would fill in.
  - Recommended: Fix. Only copy changes in the Astro files, and the generator writes the rest.
  - Fix: - Placeholders that hint at real input, such as "Your name" or "Search projects".
    - Numeric: "Verification code" with the placeholder "123456".
    - Textarea Auto-fit: "Message" with "Write a message".
    - Then run `pnpm build-examples` and update the parity snapshots, saying so in the commit.
  - Fixed: Variants and Sizes use "Your name" on the Text field page and "Write a message" on the Textarea page. Autosuggest uses "Search people" and "name@example.com". Numeric is "Verification code" with "123456", and the Textarea Auto-fit field is "Message" with "Write a message". The parity snapshots are re-recorded (intended).
- [x] (1) Text field: the email examples use four kinds of address: `name@example.com` (End text, Validation), `you@example.com` (Spread), and `name@email.com` (Input types), whose domain is a real mail provider. Autosuggest uses real musicians at made-up domains (`jonny.greenwood@radio.head`, `marika@hack.man`, `ray.manzarek@the.doors`) (`src/component-examples/text-field/EndText.astro:8`, `src/component-examples/text-field/Validation.astro:9`, `src/component-examples/text-field/Spread.astro:12`, `src/component-examples/text-field/InputTypes.astro:7`, `src/component-examples/text-field/Autosuggest.astro:10-14`, `src/component-examples/text-field/Autosuggest.astro:24-28`)
  - Summary: Example email addresses differ from field to field, and some point at domains someone owns or that don't exist.
  - Recommended: Fix. The reserved example.com domain and the site's cast keep the copy consistent.
  - Fix: use `name@example.com` as the placeholder everywhere. In Autosuggest, use Elif Rahman, Lena Ek and Tom Tanaka with `elif.rahman@example.com`, `lena.ek@example.com` and `tom.tanaka@example.com`, in ascending order. Then run `pnpm build-examples` and update the parity snapshots.
  - Fixed: Every email placeholder is `name@example.com`: Input types, Spread and Autosuggest. Autosuggest lists Elif Rahman, Lena Ek and Tom Tanaka and their example.com addresses. The interaction test's datalist values follow, and the parity snapshots are re-recorded (intended).
- [x] (1) Text field, Textarea: in the Spread examples, some end texts end with a period ("Enter at least two characters.") and others don't ("Please use a valid email address", "Must include a valid domain", "Treat like a password", "Maximum 500 characters"). Every other end text on both pages ends with a period. Also, "Maximum 500 characters" sits on a field with no `maxlength` (`src/component-examples/text-field/Spread.astro:15`, `src/component-examples/text-field/Spread.astro:40`, `src/component-examples/text-field/Spread.astro:75`, `src/component-examples/textarea/Spread.astro:7-9`, `src/component-examples/textarea/Spread.astro:13-17`, `src/component-examples/textarea/Spread.astro:69`)
  - Summary: The Spread fields' hints read in two styles, and one promises a 500-character limit the field doesn't enforce.
  - Recommended: Fix. Only copy changes, matching the End text examples.
  - Fix: - End texts as short sentences ending in a period: "Use a work address.", "Include the domain, like example.com.", "Treat it like a password.", "Drafts save automatically."
    - Give the Notes field `characterCount` and `maxlength={500}`, or drop the limit.
    - Shorten the first Textarea start text to "Keep it under 100 characters."
    - Then run `pnpm build-examples` and update the parity snapshots.
  - Fixed: The end texts are "Use a work address.", "Include the domain, like example.com.", "Treat it like a password." and "Drafts save automatically." The Notes field drops the limit and reads "Only your team sees these.", since the Bio field in the same example already shows a character count. The first start text is "Keep it under 100 characters." The parity snapshots are re-recorded (intended).
- [x] (1) Timeline: the Items example lists each object's keys as `datetime`, `description`, `time`, `label`, with `time` before `label`. The Stepper examples and the repo's sorting rule keep keys in ascending order (`src/component-examples/timeline/Items.astro:4-24`)
  - Summary: The Timeline items data lists its keys out of alphabetical order, unlike the other examples.
  - Recommended: Fix. The reorder changes no output.
  - Fix: order the keys `current`, `datetime`, `description`, `label`, `time` in each object, then run `pnpm build-examples`.
  - Fixed: The keys are in ascending order in `Items.astro` and the generated files. The rendered markup is unchanged.
- [x] (1) Toast: the Severities buttons run Default, Info, Success, Warning, Critical, Neutral. The Callout Severities and Badge Colors examples list the severities in ascending order: critical, info, neutral, success, warning (`src/component-examples/toast/Severities.astro:5-51`, `src/component-examples/callout/Severities.astro:5-22`, `src/component-examples/badge/Colors.astro:5-65`)
  - Summary: The toast severity buttons come in a different order from the same severities on the Callout and Badge pages.
  - Recommended: Fix. A reorder in one Astro file.
  - Fix: Default, then Critical, Info, Neutral, Success, Warning. Run `pnpm build-examples` and update the parity snapshot.
  - Fixed: Fixed: Default, then Critical, Info, Neutral, Success and Warning. The toast/Severities parity snapshot changed on purpose, and its visual baseline needs the `update-snapshots` label.
- [x] (1) Toggle: the Toggle button example's buttons read "Toggle me" and "Toggle with icon", which describe the example rather than an option someone turns on (`src/component-examples/toggle/Standalone.astro:5-24`, `src/component-examples/toggle/Standalone.html:3`, `src/component-examples/toggle/Standalone.html:23`, `src/docs/components/toggle.astro:106-109`)
  - Summary: The first Toggle example shows placeholder labels instead of a real on and off option.
  - Recommended: Fix. Only copy changes in one Astro file.
  - Fix: labels that name the option, such as "Show grid", and "Show warnings" for the button with the alert-circle icon. Run `pnpm build-examples` and update the parity snapshot.
  - Fixed: The buttons read "Show grid" and "Show warnings". The snapshot change is intended.
- [x] (1) Tooltip: the first "When to use" item is "A visible label for an icon-only button", but no example shows one. Basics, Arrow and Rich content use text buttons, and the only icon button is in Toggletip. The Accessibility section only covers `aria-describedby`, which would repeat an icon button's name (`src/docs/components/tooltip.astro:101`, `src/docs/components/tooltip.astro:114-123`, `src/docs/components/tooltip.astro:151-157`, `src/component-examples/tooltip/Basics.astro:5-10`)
  - Summary: The Tooltip page's main use, labeling an icon-only button, has no example to copy.
  - Recommended: Fix with option A. It matches the icon buttons with tooltips in the product detail and notifications blocks.
  - Fix: add an Icon button example (or turn Basics into one), and link the Usage item to it.
  - Options:
    - A (recommended): name the button with an `aria-label` that matches the tooltip text and leave out `aria-describedby`, as `src/blocks/product-detail.html:285-308` does. Add one Accessibility bullet that says so.
    - B: name the button with `aria-labelledby` pointing at the tooltip, so the visible text is the name.
  - Fixed: Fixed with option A: an Icon button example under Basics (`#icon-button`, `src/component-examples/tooltip/IconButton.astro`), a Save to wishlist button named with `aria-label` and no `aria-describedby`, linked from the Usage item, and an Accessibility bullet that says so. Checked in Chromium 153: the button is named "Save to wishlist" and only gets the tooltip text as its description once the tooltip opens after the focus delay, while `aria-labelledby` (option B) gives the same text as name and description at once. The new parity snapshot is recorded on purpose, and the example needs a visual baseline (`update-snapshots` label).
- [x] (1) Typography: the Heading group example's text describes its own markup ("Zero or more p elements", "Followed by one h* element", "Followed by zero or more p elements") instead of a real overline, title and subtitle (`src/component-examples/typography/HeadingGroupClass.astro:1-5`, `src/component-examples/typography/HeadingGroupClass.html:2-4`, `src/docs/components/typography.astro:94-95`)
  - Summary: The Heading group preview reads like a description of the markup rather than a heading someone would publish.
  - Recommended: Fix. Only copy changes, and a sentence above the example can keep the structure rule.
  - Fix: for example "Release notes" / "Version 6.0" / "Published 10 November 2026." If the structure needs stating, add one sentence above the example.
  - Fixed: The example reads "Release notes", "Version 6.0" and "Published November 10, 2026.", and one sentence above it gives the structure. The parity snapshot changed (intended).
- [x] (1) Callout: the Dismissible script gives the "Show the callout again" button `id="callout-dismissible-1-show"`, and the Svelte and Vue ports render it with that id, but the React port renders the button without it, so once the callout is dismissed React leaves different markup than the HTML, Astro, Svelte and Vue versions (`src/component-examples/callout/Dismissible.astro:30-33`, `src/component-examples/callout/Dismissible.html:41-45`, `src/component-examples/callout/Dismissible.react.tsx:50-54`, `src/component-examples/callout/Dismissible.svelte:44-51`, `src/component-examples/callout/Dismissible.vue:39-46`)
  - Summary: Once the callout is dismissed, the React example's Show button lacks the id the other four versions give it.
  - Recommended: Fix. One attribute brings the React port in line with the script.
  - Fix: add the id to the React button; the `show` ref keeps the focus handling as it is.
    ```tsx
    <Button
      id="callout-dismissible-1-show"
      onClick={() => toggle(true)}
      ref={show}
      variant="outlined"
    >
      Show the callout again
    </Button>
    ```
  - Fixed: The hand-written React port gives its Show button `id="callout-dismissible-1-show"`, and the `show` ref keeps the focus handling.
- [x] (1) Checkbox: the FieldGroupBinding HTML and Astro script lists the checked values in the order of the boxes, while the React, Svelte and Vue ports append each value in click order (`toggleInGroup`, Vue's array `v-model`, React's `[...current, value]`). So after unchecking and checking Apples again, HTML and Astro read "Selected: apples, bananas" and the frameworks read "Selected: bananas, apples". The interaction test checks Bananas before Apples, where both orders agree (`src/component-examples/checkbox/FieldGroupBinding.astro:28-36`, `src/component-examples/checkbox/FieldGroupBinding.html:25-33`, `src/component-examples/checkbox/FieldGroupBinding.react.tsx:19-24`, `src/component-examples/checkbox/FieldGroupBinding.react.tsx:54-56`, `src/component-examples/checkbox/FieldGroupBinding.svelte:20-25`, `src/component-examples/checkbox/FieldGroupBinding.vue:22-29`, `packages/opui/components/group.ts:1-2`, `tests/e2e/interaction.spec.ts:102-125`, `src/component-examples/switch/FieldGroupBinding.astro:28-36`, `src/component-examples/switch/FieldGroupBinding.react.tsx:19-24`, `src/component-examples/switch/FieldGroupBinding.svelte:20-27`, `src/component-examples/switch/FieldGroupBinding.vue:16-23`)
  - Summary: After rechecking a fruit, the Selected line orders the fruits differently in React, Svelte and Vue than in HTML and Astro.
  - Recommended: Fix with option A. The ports then do what the script does, and the bound values stay as each framework gives them.
  - Fix: the Switch FieldGroupBinding example has the same split (`src/component-examples/switch/FieldGroupBinding.html:31-39`, `src/component-examples/switch/FieldGroupBinding.react.tsx:22`, `src/component-examples/switch/FieldGroupBinding.react.tsx:55`, `src/component-examples/switch/FieldGroupBinding.svelte:26`, `src/component-examples/switch/FieldGroupBinding.vue:22`), so change both. Extend the two interaction tests to uncheck and recheck the first box.
  - Options:
    - A (recommended): list the selection in the boxes' order in the three ports.
      ```tsx
      const fruits = ["apples", "bananas", "cherries"]

      <p className="checkbox-binding-text">
        Selected: {fruits.filter((item) => fruit.includes(item)).join(", ") || "none"}
      </p>
      ```
    - B: keep the click order in the Astro script, and so in the HTML. The change listener would append to or filter a list instead of reading the boxes.
  - Fixed: Fixed with option A: the React, Svelte and Vue ports of the Checkbox and Switch Binding examples derive the Selected line from the list of values in box order (`topics` and `channels`), while the bound values stay as each framework gives them. Both interaction tests uncheck and recheck the first box and expect the box order. The parity tests pass for the ports.
- [x] (1) Checkbox: the Basics and IndeterminateBasics HTML examples import `activateIndeterminate` and call it. But importing `checkbox.js` already runs `initCheckbox()`, which calls it and watches for checkboxes added later, so readers copy a call that does nothing. The Astro component, the select all examples and the `range.js` examples use a bare import (`src/component-examples/checkbox/Basics.html:22-26`, `src/component-examples/checkbox/IndeterminateBasics.html:6-10`, `scripts/build-examples.mjs:1664-1674`, `packages/opui/css/js/checkbox.js:27-29`, `packages/opui/css/js/checkbox.js:53`, `packages/opui/components/Checkbox/CheckboxInput.astro:17-19`)
  - Summary: The HTML examples tell readers to call a setup function that the imported module already runs on its own.
  - Recommended: Fix. A bare import matches the Astro component and the range and select all examples.
  - Fix: have the generator emit a bare import, as it does for `range.js`. `./css/js/*.js` is in `sideEffects`, so bundlers keep it.
    - Update the assertions in `tests/unit/build-examples.test.ts:793-795` and `tests/unit/build-examples.test.ts:819-823`.
    - Run `pnpm build-examples`.
    - Drop the call from `packages/opui/skills/opui/references/checkbox.md:152-156`.
    - The function stays exported for pages that want it (`packages/opui/README.md:227`).
    ```html
    <script type="module">
      import "opui-css/css/js/checkbox.js"
    </script>
    ```
  - Fixed: The generator's `checkbox.js` rule emits `import "opui-css/css/js/checkbox.js"`, and Basics.html and IndeterminateBasics.html use it. The `build-examples` assertions expect the bare import. `references/checkbox.md` is generated by the build from the example, so the build drops the call there.
- [x] (1) ListItem: where attributes that aren't props go depends on the mode, and the ListItem API never says so. With `as` or `href` they go to the `<a>` or `<button>`, `style` included. Without them they go to the `<li>`, a `type` row included. `class` always goes to the `<li>`. Every other component that passes attributes to an inner element has a note for it (`packages/opui/components/ListItem/ListItem.astro:27-29`, `packages/opui/components/ListItem/ListItem.astro:46-56`, `src/component-api/list-item/api.ts:6-8`)
  - Summary: The API doesn't say that `aria-current`, `style` or `data-*` on a ListItem link land on the link, not on the list item.
  - Recommended: Fix. A note is how the other components that pass attributes inward document it.
  - Fix: confirmed by rendering in all four frameworks:
    - `href="/x" class="c" style="color: red" data-x="1"` gives `<li class="c"><a href="/x" style="color: red" data-x="1">`.
    - `type="checkbox" aria-current="page" id="r"` gives `<li aria-current="page" id="r"><label class="ui-checkbox">`. `list.css` only paints `aria-current` on the `a`, `button` or `label` (`packages/opui/css/components/list.css:209`, `:279`), so a component `type` row can't show as current.
    - Add per-framework notes to `list-item/api.ts`, next to the `html` note: "With `as` or `href`, attributes that aren't props go to the `<a>` or `<button>`, like `aria-current`, `target` or `style`; otherwise, also with `type`, they go to the `<li>`. `class` (`className` in React) always goes to the `<li>`." `passThrough()` doesn't fit, because its wording sends `style` to the root.
  - Fixed: `list-item/api.ts` has per-framework notes: with `as` or `href`, attributes that aren't props go to the `<a>` or `<button>`, like `aria-current`, `target` or `style`; without them, and with `type`, they go to the `<li>`; `class` (`className` in React) always goes to the `<li>`.
- [x] (1) Table: the Chromium chip says 144+ because the `container-scroll-state-queries` id counts the `scrolled` query, which Chrome shipped in 144. `table.css` only queries `stuck` and `card.css` only `scrollable`, which Chrome has had since 133 (`packages/opui/scripts/features.mjs:76`, `packages/opui/css/components/table.css:172-187`, `packages/opui/css/components/card.css:377-420`, `src/docs/components/table.astro:56-63`)
  - Summary: The Table page tells Chrome and Edge readers they need version 144, while the table works from 135.
  - Recommended: Fix. A compat key on the pattern is how `logical-properties` already narrows its id.
  - Fix: give the pattern the compat key the sheets use. `featureOf()` then reads Chrome 133, and the Table chip shows 135, which comes from `logical-properties`. Firefox and Safari stay partial, and Dialog and Drawer keep 151 from `anchor-positioning`. Drop the key once a sheet queries `scrolled`. `interest-invokers` (Chrome 149 because of `:interest-button`) and `scroll-marker-targets` (142 because of `:target-before` and `:target-after`) also count keys no sheet uses. No chip changes for them, because `anchor-positioning` sets 151 on every page that lists them.
    ```js
    {
      id: "container-scroll-state-queries",
      key: "css.at-rules.container.scroll-state_queries",
      pattern: /scroll-state\(/,
    },
    ```
  - Fixed: The `container-scroll-state-queries` pattern has the compat key `css.at-rules.container.scroll-state_queries`, so `featureOf()` reads Chrome 133. The Table chip shows 135, from `logical-properties`. Dialog and Drawer keep 151, Firefox and Safari stay partial, and no other chip moved. The card under the chips shows the narrowed data too, through the logical-properties card fix.
- [x] (1) Number field: the page lists `popover`, though a number field never opens one. The check matches Button's pressed look for a button followed by an open popover (`:has(+ :popover-open)`) against the step buttons, because inside `:has()` only element types count (`src/docs/components/number-field.astro:39`, `packages/opui/css/components/button.css:220`, `scripts/check-browser-support.mjs:363`)
  - Summary: The Number field page lists the Popover API among the features it needs, though a number field never opens a popover.
  - Recommended: Fix with option A. An ignore entry is how Badge and Typography already drop a matched id they don't use.
  - Options:
    - A (recommended): add `"number-field": ["popover"]` to `ignore` and drop the id from the page. No chip version changes. Button keeps the id, since the pressed look of a menu trigger belongs to Button.
    - B: in the check, count `:popover-open` inside `:has()` only when an example has an element with a `popover` attribute. Button drops the id too, because none of its examples opens a popover.
  - Fixed: Option A: `"number-field": ["popover"]` in `ignore`, and the id is off the page. No chip version changed.
- [x] (1) Typography: `viaTheme` makes the page list `progress-function` for the fluid heading sizes in `theme.css`. Stat's value, One-time code's large size and the Dialog and Drawer titles read the same `--ui-font-size-h3` and `--ui-font-size-h4` tokens but list nothing for it, and Stat's section says it uses only the CSS every component uses (`scripts/check-browser-support.mjs:368`, `packages/opui/css/theme.css:242-291`, `packages/opui/css/components/stat.css:3`, `packages/opui/css/components/stat.css:38`, `packages/opui/css/components/one-time-code.css:261`, `packages/opui/css/components/card.css:338`, `src/docs/components/typography.astro:38`)
  - Summary: Only Typography shows the progress() chip, though four other pages size text with the same fluid tokens.
  - Recommended: Fix with option A. The guide lists a component's own CSS, and the theme keeps the sizes fluid without progress().
  - Options:
    - A (recommended): remove `viaTheme` and drop `progress-function` from Typography. The feature belongs to the theme, and its `@supports not` block keeps `--ui-font-size-h1` to `h4` fluid with `clamp()`, so no component changes without it. Stat keeps the empty list recorded in `docs/releases/6.0.0-checklist.md:144`.
    - B: add `dialog`, `drawer`, `one-time-code` and `stat` to `viaTheme`, so every page that reads the tokens lists the feature. Stat gets its first chip.
  - Fixed: Option A: `viaTheme` is gone and Typography drops `progress-function`. Its chips don't change, since Chrome 143 comes from `scope`. The fluid type steps of the Typography build-up still tag `progress-function`, so the page shows its support where it explains it.
- [x] (1) Docs: on the ten pages that list `logical-properties`, the Baseline card under the chips comes from webstatus.dev and reads Logical properties, Widely available. The chips read the `overflow-inline` key that the id stands for here (Chrome 135, Safari 26), and the guide's Supported since filter files the id under 2021 (`src/components/Baseline.astro:9-13`, `src/utils/baseline.ts:68-74`, `src/docs/guide/browser-support.astro:320-322`, `packages/opui/scripts/features.mjs:107-112`)
  - Summary: Ten pages show a Widely available card for logical properties next to chips that need Chrome 135 and Safari 26 for the same id.
  - Recommended: Fix with option A. It keeps the live cards and changes only the ids that the bundled data narrows.
  - Options:
    - A (recommended): render an id whose pattern has a `key` with the local `FeatureSupport` card, which reads `featureOf()`, and read `featureOf()` in `getCategorizedBaselineIds`. The other ids keep `<baseline-status>`.
    - B: replace `<baseline-status>` with `FeatureSupport` on the pages and in the guide, so the cards, the chips and the year filter all read the bundled web-features data.
  - Fixed: Option A: `hasCompatKey()` in `src/utils/baseline.ts` marks an id whose pattern has a `key`, and both the Browser support card (`Baseline.astro`) and the guide's explorer render those ids with the local `FeatureSupport` card, which reads `featureOf()`. The other ids keep `<baseline-status>`. `getCategorizedBaselineIds` reads `featureOf()`, so Supported since files `logical-properties` under 2025. It also covers `container-scroll-state-queries` on Dialog, Drawer and Table, which the Table chip fix narrowed the same way. Checked on the dev server, on the Table page and in the guide.
- [x] (1) Changelog: three Breaking entries say what changed but not what to do instead. MIGRATING and the What's new notes give the step (`packages/opui/CHANGELOG.md:57`, `packages/opui/CHANGELOG.md:80`, `packages/opui/CHANGELOG.md:106`)
  - Summary: Someone reading the changelog for the DescriptionList item, Range track fill and ToggleButton icon changes isn't told what to change.
  - Recommended: Fix. Each needs one clause, taken from MIGRATING.
  - Fix: end 57 with "Target `dl.ui-description-list > div` instead of `.ui-item`.", 80 with "Remove any code that sets it." (MIGRATING.md:715), and 106 with "Move a nested icon out so it is a direct child, like in `Button`."
  - Fixed: The three Breaking entries now say what to do. `DescriptionList` adds "Drop `.ui-item` from the items in HTML, and target `dl.ui-description-list > div` instead of `.ui-item` in your CSS.", `Range` adds "Remove any code that sets it.", and `ToggleButton` adds "so move it out of its wrapper, like in `Button`". The `Button` icon entry had the same gap, so it says "so move it out of its wrapper" too.
- [x] (1) Layout: the CHANGELOG says the text in `.ui-layout-media` "truncates", but the CSS lets it wrap, which is what the API table and the What's new note say (`packages/opui/CHANGELOG.md:213`, `packages/opui/css/components/layout.css:122-142`, `src/component-api/layout/api.ts:75`)
  - Summary: The changelog promises truncated text in a media row, but the text wraps.
  - Recommended: Fix. It is one word, and the code, API and note already agree.
  - Fix: "next to text that fills the rest and wraps instead of widening the row".
  - Fixed: The CHANGELOG says the text "wraps instead of widening the row".
- [x] (1) Changelog: four Changed and Fixed entries describe code that didn't ship in 5.4.3 or has been reworked since (`packages/opui/CHANGELOG.md:376`, `packages/opui/CHANGELOG.md:517`, `packages/opui/CHANGELOG.md:546`, `packages/opui/CHANGELOG.md:641`)
  - Summary: The changelog lists fixes and changes for code that 5.4.3 users never had or that no longer exists.
  - Recommended: Fix. Each one is a clause to drop or reword.
  - Fix: - 376: drop `TextField`. It generates no `x-label`, and it only generates start and end text ids with the new `passwordToggle` (`TextField.astro:55-58`). The `passwordToggle` Added entry (252) can carry that.
    - 517: remove it. `initCheckbox()` adds no `astro:after-swap` listener any more. It starts one `MutationObserver` (`css/js/checkbox.js:27-50`), which Added 270 already describes.
    - 546: drop "`NumberField` does the same.", because NumberField is new.
    - 641: change it to "follows `id` changes". `TabsItem` no longer takes `tabId` (Breaking 94).
  - Fixed: Fixed in `packages/opui/CHANGELOG.md`. The id entry drops `TextField`, since its start and end text ids are already in the Changed entry about the `div` root and the `passwordToggle` Added entry. One correction: `TextField` also generates those ids when it has no `label`, not only with `passwordToggle`. The `initCheckbox()` `astro:after-swap` entry is removed. The empty `id` Fixed entry is removed as a whole, not just its `NumberField` sentence: in the 5.4.3 sources none of `Dialog`, `Fieldset`, `Range`, `Select` and `TextField` derived part ids from `id`, so it fixed 6.0's own change. Its rule is folded into the id entry, which now starts with `Dialog`, `Fieldset`, `Range` and `Select`, says "when `id` is missing or empty" and names the `x-legend` of a Fieldset rendered as another element. The `TabsItem` entry says "follows `id` changes".
- [x] (1) Changelog: three Changed entries change markup or setup that users depend on, but they have no Breaking heading and no MIGRATING step: a plain `<button>` in a `ControlGroup` loses its group styles (369), `TextField` and `Textarea` without `label` render a `div` root (424), and `dist/opui.components.css` needs a border-box reset for `Checkbox` and `Radio` (448) (`packages/opui/CHANGELOG.md:369`, `packages/opui/CHANGELOG.md:424`, `packages/opui/CHANGELOG.md:448`)
  - Summary: Upgraders who put plain buttons in a group, style the field's label root or load only the components bundle get no migration step.
  - Recommended: Fix with option A. User CSS can target markup, and the audit rules treat that kind of change as Breaking.
  - Fix: TODO.md:2253 (done) put 448 under Changed. Confirm that choice before you move it.
  - Options:
    - A (recommended): move the three entries to Breaking and say what to do. Add a step to MIGRATING's Control group, Text field and Textarea, and Package and imports sections.
    - B: keep them under Changed and only add the MIGRATING steps.
  - Fixed: Fixed with option A. I checked the choice from the earlier done item first: the other single-file import steps (`utils.css`, `choice.css`, `card.css`) and the markup changes that user CSS depends on (`.ui-card`, `.ui-item`, default-look classes) are all Breaking, so these three join them. The `ControlGroup` entry now ends "so add `.ui-button` to it". The `TextField` and `Textarea` entry is scoped to Astro and Vue and says to give a field without `label` an `aria-label` or `aria-labelledby` and to target `.ui-text-field` instead of `label.ui-text-field`. The `dist/opui.components.css` entry says to load `normalize.css` or set `box-sizing: border-box` in your own reset. MIGRATING has a step with a diff or CSS in Control group, Text field, Textarea, and Package and imports. What's new: `ControlGroup` gets a Breaking note for Astro, Vue and HTML. The `TextField` and `Textarea` `div` root notes are Breaking for Astro and Vue and stay non-Breaking for React and Svelte.
- [x] (1) Changelog: the Migrating from 5.x callouts on Avatar, Button and Tooltip name steps that are missing from the MIGRATING section they link to. The Avatar and Button type rules are only in the Chip section, and the Tooltip `.ui-floating` rename is only in the Anchor section (`src/utils/whats-new.ts:113-115`, `src/utils/whats-new.ts:200-202`, `src/utils/whats-new.ts:1507-1512`, `packages/opui/MIGRATING.md:105-128`, `packages/opui/MIGRATING.md:163-207`, `packages/opui/MIGRATING.md:1074-1111`)
  - Summary: A reader who follows the callout's link to the migration guide doesn't find the step the callout named.
  - Recommended: Fix. Each section needs one sentence.
  - Fix: - Avatar: "A button avatar needs `as="button"`, and `disabled` only goes with it or with `href` (types)."
    - Button: "`Button` takes link attributes only with `href` (types)."
    - Tooltip: "The floating content is `.ui-floating` instead of `.ui-anchor-floating`."
  - Fixed: Fixed in `packages/opui/MIGRATING.md`. Avatar adds "A button avatar needs `as="button"`, and `disabled` only goes with it or with `href` (types)." Button adds "`Button` takes link attributes only with `href` (types)." Tooltip adds "The floating content is `.ui-floating` instead of `.ui-anchor-floating`." with a diff. I checked that the 5.4.3 Tooltip rendered `.ui-anchor-floating` through `Anchor`.
- [x] (1) Changelog: some Added and Changed entries have no What's new note on some of the pages they name. The test only checks that each page has one note of that kind (`packages/opui/CHANGELOG.md:154`, `packages/opui/CHANGELOG.md:167`, `packages/opui/CHANGELOG.md:350`, `packages/opui/CHANGELOG.md:355`, `packages/opui/CHANGELOG.md:436-438`)
  - Summary: Several changes in the changelog don't show in the What's new callout on the component pages they affect.
  - Recommended: Fix. The release checklist asks for a note per entry.
  - Fix: add one note per page, linked to a section that exists in `dist` (checked):
    - Accordion and Dialog, entry 355: content is a stack (Card and Drawer already have this note).
    - Dialog, entries 154 and 339: the border in the page background color, or `--ui-border-color-raised` when a theme sets it. MIGRATING's Dialog section already says this.
    - Button and ControlGroup, entry 350: hover styles only on devices that can hover.
    - Callout, entry 167: links read `--ui-primary-text`.
    - Progress, entry 221: `--_loop-duration` (`#component-properties`).
    - Range, entries 398 and 399: the pressed ring alpha and `--ui-invalid`.
    - Typography, entries 436 to 438: list gutters in `ch`, `sup` and `sub` at `0.75em`, and muted figure captions. MIGRATING lists all three.
    - Checkbox, Radio and Switch, entry 192 (Vue): the `*Input` parts take `class`.
    - TextField, Textarea and Select, entry 423: the `12ch` minimum in table cells. Only the Table page says this now.
    - Form and Toggle, entry 383: it describes internals, so reword it to the visible effect or drop it.

    For example:

    ```ts
    `Dialogs have a border in the page background color, or <a href="#api"><code>--ui-border-color-raised</code></a> when a theme sets it, so they stay visible on tonal surfaces.`,
    ```

  - Fixed: Fixed in `src/utils/whats-new.ts`, and every new link resolves in `dist`. Added notes: Accordion and Dialog content is a stack, the Dialog border in the page background color or `--ui-border-color-raised`, hover only on hover devices for Button and ControlGroup, Callout link hover reads `--ui-primary-text`, Progress `--_loop-duration` (`#component-properties`), the Range pressed ring alphas and `--ui-invalid`, the three Typography notes (list gutters in `ch`, `sup` and `sub` at `0.75em`, muted figure captions), Vue-only notes that `CheckboxInput`, `RadioInput` and `SwitchInput` take `class`, and the `12ch` table cell minimum on TextField, Textarea and Select, linked to `#hidden-label`. The Switch invalid note now names `--ui-invalid` too. For Form and Toggle, I rendered the 5.4.3 `Astro.locals` approach with the Astro container. It handed group b's name to an input behind an async component in group a, and to a field after both groups. The current context approach doesn't. So the Changed entry about context is gone, and its effect joins the existing Fixed `FieldGroup` entry, which now covers `ToggleGroup` in Astro.
- [x] (1) Dialog, Checkbox, Radio, Switch: the Breaking notes about single-file imports (`utils.css` for the modal scroll lock, `choice.css` for the choice layout) only have an `html` key, so the Astro, React, Svelte and Vue pages leave them out. Drawer's `card.css` note reaches every framework. The `choice.css` notes also don't say to import it (`src/utils/whats-new.ts:383-389`, `src/utils/whats-new.ts:592-594`, `src/utils/whats-new.ts:905-911`, `src/utils/whats-new.ts:1129-1134`)
  - Summary: Framework pages don't tell readers who import single CSS files to add `utils.css` or `choice.css`.
  - Recommended: Fix. The components don't load their own CSS, so the step applies to every framework.
  - Fix: - Make the Dialog note a plain string, like Drawer's (whats-new.ts:633).
    - Split the `choice.css` Breaking text out of the three objects that also hold the dev-warning notes, into a string such as `Breaking: <a href="#basics"><code>choice.css</code></a> holds the styles shared with Radio and Switch. Import it with them, or use <code>components.css</code>.`
  - Fixed: Fixed. The Dialog `utils.css` note is a plain string, so every framework shows it. The three `choice.css` Breaking notes are now plain strings outside the dev-warning objects: "`choice.css` holds the layout, label, end text, sizes and disabled styles shared with ... Import it with them when you install single files, or use `components.css`." The import sentence links to `#installation`, as Drawer's `card.css` note does, since that section lists `choice.css` on every framework page.
- [x] (1) Blog: the progress post's snippet and the Progress build-up fill the bar with `--ui-primary`, but since 6.0 `progress.css` fills it with `--ui-selected-strong` (`src/docs/blog/progress-native.astro:65-75`, `src/components/UnderTheHood/ProgressBuild.astro:58-79`, `packages/opui/css/components/progress.css:4`)
  - Summary: Readers learn the bar follows the primary color, but a theme recolors the real bar through `--ui-selected-strong`.
  - Recommended: Fix. It names the role that the CHANGELOG says the bar reads.
  - Fix: replace `var(--ui-primary)` with `var(--ui-selected-strong)` in the post's three declarations and in the build-up's three.
  - Fixed: The post's three declarations and the build-up's three fill the bar with `var(--ui-selected-strong)`.
- [x] (1) Blog: the tabs post lists only `nth-child-of` in its `features`, so the index files it under Beginner. Its snippet spans the panel with `sibling-count()`, which is only newly available, and its Fallback says the rest is supported everywhere (`src/utils/blog-posts.ts:302`, `src/docs/blog/tabs-radio-buttons.astro:60-65`, `src/docs/blog/tabs-radio-buttons.astro:99-102`)
  - Summary: The level filter calls the tabs post Beginner, and its fallback skips browsers without `sibling-count()`.
  - Recommended: Fix. The Scroll step of the Tabs build-up already lists the feature.
  - Fix: set `features: ["nth-child-of", "sibling-count"]`. Then add a Fallback bullet for browsers without `sibling-count()` and `sibling-index()` (Firefox before 154, Safari before 26.2), written after checking the scrolling tabs there.
  - Fixed: `features: ["nth-child-of", "sibling-count"]`, and a Fallback bullet: browsers without `sibling-count()` and `sibling-index()` (Firefox before 154, Safari before 26.2) drop the declarations that place the radios and span the panels. The panel still fills the row, but when the tabs scroll, the arrow keys don't scroll the tab they select into view. Checked in Chromium with both functions made invalid in the bundled CSS, on the Overflow example at 320px: the panel kept its width, and after six Right Arrow presses the selected tab stayed out of view. Firefox and Safari themselves weren't checked.
- [x] (1) Callout: the Severity step of the Under the hood build-up takes its hues from the Open Props tokens `--hue-blue` and `--hue-orange`. opui 6.0 doesn't define them (Open Props is optional and `theme.css` reads nothing from it). The theme's severity scopes take the hue from `--ui-info` and `--ui-warning` instead (`src/components/UnderTheHood/CalloutBuild.astro:80-87`, `packages/opui/css/theme.css:754-767`)
  - Summary: Copied without Open Props, the build-up's severity rules lose every color, and a theme's `--ui-info` doesn't reach them.
  - Recommended: Fix. It matches the theme and the callout post.
  - Fix:
    ```css
    .info {
      --tone: oklch(from var(--ui-info) 0.58 0.21 h);
    }

    .warning {
      --tone: oklch(from var(--ui-warning) 0.58 0.21 h);
    }
    ```
  - Fixed: `CalloutBuild.astro` sets `--tone: oklch(from var(--ui-info) 0.58 0.21 h)` and `oklch(from var(--ui-warning) 0.58 0.21 h)`, like the theme's severity scopes and the callout post.
- [x] (1) Blog: snippets hard-code durations the components don't use. The drawer post uses `0.3s`, and the Dialog and Drawer build-ups (fades and scroll shadows) use `0.2s`, but the components use `--ui-duration-slow` (`0.25s` since 6.0). The accordion and select posts use `0.2s`, but the components use `--ui-duration` (`0.15s`) (`src/docs/blog/drawer-starting-style.astro:56-59`, `src/docs/blog/accordion-height-auto.astro:51-54`, `src/docs/blog/select-base-select.astro:55-59`, `src/components/UnderTheHood/DialogBuild.astro:95`, `src/components/UnderTheHood/DialogBuild.astro:151-154`, `src/components/UnderTheHood/DrawerBuild.astro:109`, `src/components/UnderTheHood/DrawerBuild.astro:144-147`, `src/components/UnderTheHood/DrawerBuild.astro:197-200`)
  - Summary: A copied snippet animates at a different speed than the component it explains.
  - Recommended: Fix. Reading the tokens keeps the snippets from drifting again.
  - Fix: use the tokens instead of the numbers. That is `var(--ui-duration-slow)` in the drawer post and the Dialog and Drawer steps, and `var(--ui-duration)` in the accordion and select posts.
  - Fixed: The drawer post and the Dialog and Drawer build-ups, fades and scroll shadows included, read `var(--ui-duration-slow)`, and the accordion and select posts `var(--ui-duration)`. The Accordion, Progress and Tooltip build-ups had the same `0.2s` and now read `--ui-duration`, and the Range build-up's halo reads `--ui-duration-fast`, as `range.css` does.
- [x] (2) Carousel: the Basics and Grid layout examples put text cards under the inside scroll buttons, which sit over each item's edges at mid height. Once the carousel has moved one slide, the Previous button covers the start of the heading: "Lima" reads "ima" in Basics and "ma" in Grid layout (`src/component-examples/carousel/Basics.html:1-47`, `src/component-examples/carousel/GridLayout.html:9-34`, `packages/opui/css/components/carousel.css:164-180`)
  - Summary: In the first carousel example the Previous button hides the first letters of each heading after one slide.
  - Recommended: Fix with option A. Inside buttons suit media, and the first example readers copy should not hide its text.
  - Fix: seen in Chromium at 500px and 600px wide after scrolling one item, in LTR and RTL.
  - Options:
    - A (recommended): use `buttons="outside"` in Basics and Grid layout in all five formats, and say under Buttons outside that inside buttons sit over the item edges, so items with text need them outside.
    - B: keep the examples and add only the sentence.
  - Fixed: Fixed with option A: Basics and Grid layout use `buttons="outside"` in all five formats, and Buttons outside reads "Use `buttons=\"outside\"` for items with text, which the inside buttons cover at their edges." Checked in Chromium: after one slide "Lima" is whole, and the next button still scrolls. The interaction test "the next button stays above items whose content sets a z-index" removes `.ui-buttons-outside` from Basics first, so it still covers inside buttons over items. The visual baselines of these examples change.
- [x] (2) Button: the HTML `state` row says `[aria-current="page"]` "keeps the pressed background on a transparent (text) button link". Since e620cfa8 the current page has its own styles in every variant: text and outlined buttons get the selected tint (`--_current-bg-color`) with strong text, tonal ones get `--_tonal-current-bg-color`, and a filled one drops its fill (`src/component-api/button/api.ts:54-65`, `packages/opui/css/components/button.css:224-227`, `packages/opui/css/components/button.css:376-379`, `packages/opui/css/components/button.css:422-425`, `packages/opui/css/components/button.css:445-449`)
  - Summary: The Button API says only text buttons mark the current page, with the pressed background, but every variant marks it with its own style.
  - Recommended: Fix. The row was written before the selected-tint change, and the custom property docs already describe the new styles.
  - Fix:
    ```ts
    description:
      'Marks the link to the current page in navigation with the selected tint and strong text (a filled button drops its fill), or dims a disabled one. A link button, which can\'t take `disabled`, drops its `href` and takes `role="link"` and `aria-disabled="true"` instead.',
    ```
  - Fixed: The HTML `state` row in `src/component-api/button/api.ts` takes the item's description.
- [x] (2) Chip: the HTML `state` row says a disabled link chip "drops its `href` and takes `aria-disabled="true"`", without `role="link"`, and the Disabled section has no HTML line. The component adds `role="link"`, the Disabled example has it, and the Button and Avatar rows and pages say to add it. The fix of the done "Button, Avatar: a disabled link drops its `href`..." item missed the Chip API row and page (`src/component-api/chip/api.ts:85-96`, `src/docs/components/chip.astro:148-155`, `src/component-examples/chip/Disabled.html:7`, `src/component-api/button/api.ts:56`, `src/docs/components/button.astro:135-140`)
  - Summary: HTML readers who follow the Chip API write a disabled link chip without `role="link"`, which screen readers read as plain text.
  - Recommended: Fix. It finishes the `role="link"` change for Chip; the Button and Avatar docs already name the role.
  - Fix: in `chip/api.ts`, write "drops its `href` and takes `role="link"` and `aria-disabled="true"` instead". In the Disabled section, use a `<Conditional as="p">` like Button's. The HTML slot reads "Links: drop `href`, add `role="link"` and `aria-disabled="true"`. A static chip takes `.ui-disabled` for the look." The components slot keeps the current sentence.
  - Fixed: The `state` row in `src/component-api/chip/api.ts` says `role="link"` and `aria-disabled="true"`, and the Disabled section is a `<Conditional as="p">` with the item's HTML sentence, while the `components` slot keeps the current one.
- [x] (2) Button: in every framework the Button renders `type="button"` unless a `type` is passed, while a native `<button>` defaults to `submit`. The Button API has no `type` row or note, so a `<Button>` meant to submit a form doesn't, and nothing on the page says why (`packages/opui/components/tag.ts:6`, `packages/opui/components/Button/Button.astro:35-36`, `src/component-api/button/api.ts:22-101`)
  - Summary: A Button put in a form to submit it does nothing, and the API never says its default type is button.
  - Recommended: Fix with option A. A row puts the default in the Default column, and `checkApi` accepts it because no types file declares `type`.
  - Fix: confirm with `pnpm exec vitest run tests/unit/component-api.test.ts`.
  - Options:
    - A (recommended): an inherited row.
      ```ts
      {
        default: '"button"',
        description:
          'The button type. Use `"submit"` to submit a form, which a native `<button>` does by default.',
        inherited: true,
        prop: "type",
        type: '"button" | "reset" | "submit"',
      },
      ```
    - B: a note for the four frameworks with `components()`: "Renders `type=\"button\"`. Pass `type=\"submit\"` to submit a form."
  - Fixed: Fixed with option A: `src/component-api/button/api.ts` adds the inherited `type` row with the default `"button"`, before `variant`. `tests/unit/component-api.test.ts` and `tests/unit/naming.test.ts` pass.
- [x] (2) Radio: the `required` row says "Adds a required mark after the label". Since the done fix for required radio groups, `choice.css` leaves radios out of the label mark (`&:not(.ui-radio):has(:required)`). The asterisk now only shows on the legend of the `.ui-fieldset` around the group (`src/component-api/radio/api.ts:106-115`, `packages/opui/css/components/choice.css:60-70`, `packages/opui/css/components/form.css:68-79`)
  - Summary: The Radio table promises an asterisk after the label that a required radio never shows.
  - Recommended: Fix. The row then matches the done fix that moved the mark to the legend.
  - Fix: "The form won't submit until one radio in the group is checked. The legend of the enclosing `Fieldset` shows the required mark."
  - Fixed: The Radio `required` row reads "The form won't submit until one radio in the group is checked. The legend of the enclosing fieldset shows the required mark.", with a lowercase fieldset so it fits the HTML table too.
- [x] (2) Stat: the HTML parts table and the anatomy name the parts `<dt>`, `<dd>` and `<dd>`, because each part's `code` replaces its selector. They never show `.ui-label`, `.ui-value` and `.ui-description`, the classes `stat.css` styles by, and the two `<dd>` rows look the same (`src/component-api/stat/api.ts:26-47`, `src/component-api/rows.ts:168-169`, `packages/opui/css/components/stat.css:13-31`)
  - Summary: HTML readers of the Stat API see two identical `<dd>` parts and none of the three classes the markup needs.
  - Recommended: Fix. StepperItem already puts the class in `code`.
  - Fix: `code: '<dt class="ui-label">'`, `'<dd class="ui-value">'` and `'<dd class="ui-description">'`, as `src/component-api/stepper-item/api.ts:80` does. The framework views are unchanged, since those parts show their props and slots there.
  - Fixed: The parts' `code` is `<dt class="ui-label">`, `<dd class="ui-value">` and `<dd class="ui-description">`.
- [x] (2) Range: the value part shows as `<output>` in the HTML parts table and anatomy, and its description says `range.js` keeps it in step with the thumb. The script only updates `output.ui-value[data-live]` and reads the suffix from `data-suffix`, which the HTML API never names. Only the page's Value section says `.ui-value[data-live]` (`src/component-api/range/api.ts:202-209`, `packages/opui/css/js/range.js:27-28`, `src/docs/components/range.astro:124-127`)
  - Summary: Markup copied from the Range API table gets an output that `range.js` never updates.
  - Recommended: Fix. The HTML table then names what the script needs.
  - Fix: `code: '<output class="ui-value" data-live>'`, which only the HTML view shows. Add to the `html` note that `data-suffix` adds text after the value.
  - Fixed: The value part's `code` is `<output class="ui-value" data-live>`, which only the HTML parts table and anatomy show, and the `html` note adds that `data-suffix` on the `.ui-value` output adds text after the value (`src/component-api/range/api.ts`).
- [x] (2) TextField: the React props table lists `inputmode`, the name of the inherited row. React's prop is `inputMode`, which the component has read since the done `inputMode` item, and React's input types have no `inputmode`, so a reader who copies the row gets a type error and a React warning (`src/component-api/text-field/api.ts:104-110`, `packages/opui/components/TextField/TextField.react.tsx:22`, `packages/opui/components/TextField/TextField.react.tsx:95`, `src/component-api/rows.ts:76-78`)
  - Summary: React readers are told to pass `inputmode`, which TypeScript rejects, instead of `inputMode`, which the component reads.
  - Recommended: Fix. TabsLabel already splits `for` and `htmlFor` this way.
  - Fix: confirmed in the built `dist/react/components/text-field.md:1417`. Split the row by framework. Vue declares `inputmode`, so the remaining row is still inherited for Astro and Svelte. The OneTimeCode `inputmode` row (`src/component-api/one-time-code/api.ts:76-82`), outside this audit, shows the same name in React.
    ```ts
    {
      description:
        'The `inputmode` of the `<input>`. With `type="numeric"` it is `numeric`.',
      frameworks: ["astro", "svelte", "vue"],
      inherited: true,
      prop: "inputmode",
      type: "string",
    },
    {
      description:
        'The `inputmode` of the `<input>`, as `inputMode` like on the element. With `type="numeric"` it is `numeric`.',
      frameworks: ["react"],
      inherited: true,
      prop: "inputMode",
      type: "string",
    },
    ```
  - Fixed: `text-field/api.ts` and `one-time-code/api.ts` both split the row like TabsLabel's `for` and `htmlFor`: `inputmode` for Astro, Svelte and Vue, and `inputMode` for React, "as `inputMode` like on the element".
- [x] (2) Chip: the Button section says a remove chip needs an `aria-label`, and Usage links to it for removing a tag, but the example has no remove chip. It has an "Open now" chip with a check icon and no `aria-pressed`, which looks selected but announces no state (`src/docs/components/chip.astro:58-60`, `src/docs/components/chip.astro:123-134`, `src/component-examples/chip/Button.astro:10-24`)
  - Summary: The Button example shows a filter that looks checked but isn't pressed, and leaves out the remove chip the text describes.
  - Recommended: Fix. A remove chip shows the `aria-label` the sentence asks for, and Pressed already covers filters.
  - Fix: replace "Open now" with a remove chip, such as `<Chip aria-label="Remove tag Design" as="button" label="Design">` with the close `svg` in `end`, as in the shopping-cart block. Run `pnpm build-examples` and re-record the parity snapshot.
  - Fixed: The Button example replaces "Open now" with `<Chip aria-label="Remove tag Design" as="button" label="Design">` and the close icon in `end`. The parity snapshot change is intended.
- [x] (2) List: ten of the nineteen examples and the anatomy still use placeholder text. They read "Headline", "Supporting text", "Supporting text that truly is quite long enough to fill up multiple lines.", "Trailing supporting text", "Second item" and "Even more supporting text". The video lengths are "13:37" and "90s". The Flush row is "Gutterless list item", named after the prop `flush` replaced (`src/component-examples/list/Basics.astro:5-14`, `src/component-examples/list/Dense.astro:5-14`, `src/component-examples/list/EndText.astro:5-18`, `src/component-examples/list/Flush.astro:5-37`, `src/component-examples/list/StartAvatar.astro:5-19`, `src/component-examples/list/StartIcon.astro:5-36`, `src/component-examples/list/StartImage.astro:5-24`, `src/component-examples/list/StartVideo.astro:5-24`, `src/component-examples/list/Text.astro:5-14`, `src/component-examples/list/Variants.astro:5-18`, `src/docs/components/list.astro:259-277`)
  - Summary: Most List previews show placeholder text instead of the contacts, files and settings the Usage list promises.
  - Recommended: Fix. The Bordered, Clickable, Inset and Selected examples already show the realistic style.
  - Fix: - Use files, contacts and settings with real descriptions and end values, such as "Q3 report.pdf" with "2.4 MB", and "Lena Ek" with "Product designer".
    - Give the videos durations in one format, such as "0:45" and "1:30".
    - Name the Flush row something real, such as "Saved searches".
    - In Variants, give every list two real rows.
    - In EndKeyboard, put Save before Save all.
    - Then run `pnpm build-examples` and record the parity snapshots as intended.
  - Fixed: Basics, Dense, EndText, Flush, StartAvatar, StartIcon, StartImage, StartVideo, Text and Variants, and the anatomy, show files ("Q3 report.pdf", 2.4 MB), contacts (Lena Ek, Product designer) and settings. The videos read 1:30 and 0:45, the Flush row is "Saved searches", every Variants list has two real rows, and EndKeyboard lists Save before Save all. The file description avoids the word "for", which `example-coverage.test.ts` reads as a `for` attribute. The list snapshot changes are intended.
- [x] (2) OneTimeCode: the Right-to-left section says to widen `pattern` for Arabic-Indic digits, but its example keeps the default `[0-9]{6}` with Western digits. Commit 34504492 removed the sample pattern `[0-9٠-٩۰-۹]{6}` from the section, so nothing on the page shows a wider pattern. A passed `pattern` overrides the default, because the component spreads its remaining props after it (`src/docs/components/one-time-code.astro:187-195`, `src/component-examples/one-time-code/RightToLeft.astro:5-7`, `src/component-examples/one-time-code/RightToLeft.html:1-16`, `packages/opui/components/OneTimeCode/OneTimeCode.astro:46-47`)
  - Summary: Readers copying the right-to-left example get a pattern that rejects the digits an Arabic keyboard types.
  - Recommended: Fix. The example is where the pattern the sentence asks for should appear.
  - Fix: add `pattern="[0-9٠-٩۰-۹]{6}"` to the RightToLeft example and run `pnpm build-examples`. Re-record the parity snapshot (intended). Add "convert them to 0 to 9 on the server" to the section.
  - Fixed: Correction: a passed `pattern` didn't replace the default in Astro. Astro printed both attributes (`pattern="[0-9]{6}" pattern="..."`), the browser keeps the first, and `pnpm build-examples` refused the example. React, Svelte and Vue did replace it. OneTimeCode now destructures `autocapitalize`, `inputmode`, `pattern` and `spellcheck` and falls back to its defaults with `??`, like TextField, and the compiler carries this to the other frameworks. `autocomplete` stays fixed, because destructuring it makes Vue's `AutoFill` union too complex for vue-tsc. The RightToLeft example passes `pattern="[0-9٠-٩۰-۹]{6}"`. Checked in Chromium: Western, Arabic-Indic and Persian digits are valid, and a letter isn't. The section adds "and convert them to 0 to 9 on the server", and the parity snapshot is re-recorded (intended). The OneTimeCode CHANGELOG entry says a passed attribute replaces the default.
- [x] (2) Select: the React, Svelte and Vue Preselected examples are hand-written. They use `value` with `onChange` and state, `bind:value`, and `v-model`. Since commit 5e2b7319 the section instead tells React readers to set `defaultValue` and Svelte and Vue readers to set `value`, which is exactly what `convertExample` writes from the Astro file. The ledger reasons ("The page documents preselecting with value and onChange") no longer hold. The text also doesn't name the Team select's `selected: true` (`scripts/hand-written-examples.json:41-43`, `src/component-examples/select/Preselected.react.tsx:6-31`, `src/component-examples/select/Preselected.svelte:1-15`, `src/component-examples/select/Preselected.vue:1-17`, `src/docs/components/select.astro:152-162`)
  - Summary: React readers are told to set `defaultValue` while the code below uses `value` with `onChange` and state.
  - Recommended: Fix. The generator writes the files the text describes, and the Binding section already shows the bound value.
  - Fix: remove the three entries from `scripts/hand-written-examples.json` and run `pnpm build-examples`. End the shared and React text with "or `selected: true` on an item.".
  - Fixed: The three entries are gone from `scripts/hand-written-examples.json`, and `pnpm build-examples` wrote `defaultValue` in React and `value` in Svelte and Vue. The shared text reads "Set `value`, or `selected: true` on an item." and the React text "Set `defaultValue`, or `selected: true` on an item."
- [x] (2) Text field: the Affix example's Weight field uses `type="numeric"`, which renders `pattern="[0-9]*"`, so a weight like 72.5 fails validation on submit. A weight is also an amount, which the page's own callout sends to `type="number"` and the Number field. The Numeric type is meant for digit strings like card numbers (`src/component-examples/text-field/Affix.astro:14-16`, `src/component-examples/text-field/Affix.html:18-24`, `src/docs/components/text-field.astro:251-265`, `packages/opui/components/TextField/TextField.astro:90-93`)
  - Summary: A reader who copies the Weight field gets a field that rejects decimal weights.
  - Recommended: Fix with option A. It keeps the end affix the example is there to show.
  - Options:
    - A (recommended): replace `type="numeric"` with `inputmode="decimal"`, which brings up a number keyboard with a decimal key and sets no pattern. Then run `pnpm build-examples` and update the parity snapshot.
    - B: swap Weight for a field of digits that fits an end affix, and show the kg affix on the Number field page.
  - Fixed: Fixed with option A. The Weight field uses `inputmode="decimal"` instead of `type="numeric"`, so it renders no `pattern` (checked in Chromium). The parity snapshot is re-recorded (intended).
- [x] (2) Toggle: the Overflow example is a multi-select group of "Everything", "Mentions" and "Nothing at all", options that exclude each other, so a reader can turn on Everything and Nothing at all together. The code tab shows the same three groups (`src/component-examples/toggle/Overflow.astro:8-38`, `src/component-examples/toggle/OverflowCode.astro:5-29`, `src/component-examples/toggle/Overflow.html:4-15`)
  - Summary: The Overflow toggles let someone pick both Everything and Nothing at all as their notifications.
  - Recommended: Fix with option A. A single choice is what the labels describe, and the overflow modes behave the same.
  - Options:
    - A (recommended): drop `multiple` from the three groups in `Overflow.astro` and `OverflowCode.astro`, so each is a radio group. Run `pnpm build-examples` and update the parity snapshots.
    - B: keep `multiple` and use options that combine, like "Mentions", "Direct messages" and "Replies to my threads".
  - Fixed: Option A. The three groups in `Overflow.astro` and `OverflowCode.astro` drop `multiple`, so each is a radio group. The snapshot changes are intended.
- [x] (2) Typography: the Classless showcase is hipster ipsum and Latin filler ("Fixie beard tumeric: What the kombucha tells us about every element", "knausgaard", "cornhole", "Quas cupiditate laboriosam"), with asides like "Typography is pretty important if you don't want your stuff to look like trash". `example-copy.test.ts` never sees it: the test only reads `.astro` files, and this example is HTML only (`src/component-examples/typography/Default.html:4`, `src/component-examples/typography/Default.html:12-15`, `src/component-examples/typography/Default.html:272`, `src/component-examples/typography/Default.html:294-295`, `src/component-examples/typography/Default.html:446`, `tests/unit/example-copy.test.ts:45`, `tests/unit/example-copy.test.ts:75`, `src/utils/framework.js:82`)
  - Summary: The largest example on the Typography page is filler text that the copy rules ban everywhere else.
  - Recommended: Fix. Every element it shows stays, only the words change, and the test closes the gap.
  - Fix: - Rewrite the copy as plain, realistic prose. Cold brew can stay the subject. Keep every element, edge case and image alt text.
    - Make `tests/unit/example-copy.test.ts` also read the `.html` file of each example in `FRAMEWORK_AGNOSTIC_EXAMPLES`, with a sample it must flag.
    - Update the parity snapshot and say so in the commit.
  - Fixed: Rewrote the copy as a cold brew guide, keeping every element, id, edge case and the image alt text. `tests/unit/example-copy.test.ts` also reads the `.html` of each example in `FRAMEWORK_AGNOSTIC_EXAMPLES`, checks that it does, and flags an HTML sample; the old file fails it. The parity snapshot changed (intended).
- [x] (2) Callout: the page lists `scope`, and Toast inherits it, only because of the `@scope (.ui-rich-text)` block in `callout.css` that resets a callout inside rich text. Neither page shows rich text, but the check never matches a scope root against the examples, so the Callout chips ask for Chrome 143, Firefox 146 and Safari 26.4 (`packages/opui/css/components/callout.css:172-192`, `scripts/check-browser-support.mjs:291-300`, `src/docs/components/callout.astro:57`, `src/docs/components/toast.astro:50`)
  - Summary: The Callout page asks for Safari 26.4 and Firefox 146 because of a block that only applies inside rich text.
  - Recommended: Fix with option A. It treats a scope root like the ancestor rules the check already matches.
  - Fix: a scratch run of option A dropped `scope` from Callout and Toast and changed nothing else. Without it, the Callout chips count only `has` (Chrome 105, Firefox 121, Safari 15.4), and Toast's Chromium chip goes from 143 to 135. Typography keeps `scope`, and its Chrome 143 is right: `typography.css:715-723` nests `&` directly in `@scope`, which Chrome shipped in 143.
  - Options:
    - A (recommended): make a rule inside `@scope (<root>)` apply only when its root can match the examples, with this check at the start of `ruleApplies`, after the keyframes test, then run `--write`.
      ```js
      const scopeRoot = (node) => {
        for (let at = node.parent; at; at = at.parent) {
          if (at.type === "atrule" && at.name === "scope") {
            return at.params.match(/^\(([^)]*)\)/)?.[1]
          }
        }
      }

      const root = scopeRoot(rule)
      if (
        root &&
        !splitList(root).some((branch) => branchMatches(branch, true, elements))
      ) {
        return false
      }
      ```
    - B: add `callout: ["scope"]` and `toast: ["scope"]` to `ignore` and drop the ids.
  - Fixed: Option A: `ruleApplies` in `scripts/check-browser-support.mjs` returns false for a rule inside `@scope (<root>)` whose root can't match the page's examples, reading the root with balanced parentheses. `usedFeatureIds()` is exported for a test sample the check must flag, and the check's message names @scope roots. `--write` dropped `scope` from Callout and Toast and changed nothing else: Callout reads Chrome 105, Firefox 121 and Safari 15.4, and Toast's Chromium chip 135.
- [x] (2) Docs: no pattern detects alternative text for generated content (`content: "*" / ""`). The CSS uses it to keep the required asterisk, the rating's count and the stepper's numbers out of what screen readers read, and to name the carousel's scroll buttons, yet none of the twelve pages that use it lists `alt-text-generated-content` (Baseline 2024) (`packages/opui/scripts/features.mjs:60-158`, `packages/opui/css/components/choice.css:59-70`, `packages/opui/css/components/form.css:68-79`, `packages/opui/css/components/rating.css:144-174`, `packages/opui/css/components/stepper.css:55-70`, `packages/opui/css/components/text-field.css:188-199`, `packages/opui/css/components/carousel.css:167-212`)
  - Summary: Twelve pages leave out a newly available feature their CSS uses to keep asterisks and counters out of what screen readers read.
  - Recommended: Fix. It is one pattern, one test sample and a `--write` run, like every other detected id.
  - Fix: - Add the pattern below, and its sample to `samples` in `tests/unit/check-scripts.test.ts`.
    - Add `radio: ["alt-text-generated-content"]` to `ignore`. Radio only matches choice.css's `:not(.ui-radio)` rule.
    - Run `node scripts/check-browser-support.mjs --write`. In a scratch run it added the id to Carousel, Checkbox, Control group, Form, Number field, One-time code, Rating, Select, Stepper, Switch, Text field and Textarea.
    - Only Form's chips move: Firefox 121 to 128, Safari 16.5 to 17.4.
    - Without the feature, the `@supports` blocks keep the visible text, and screen readers also read the asterisk and the numbers.
    ```js
    {
      id: "alt-text-generated-content",
      pattern: /\bcontent:[^;{}]*\s\/\s*(?:["']|var\()/,
    },
    ```
  - Fixed: The item's pattern, its sample, `radio: ["alt-text-generated-content"]` in `ignore`, and `--write`, which added the id to the twelve pages the item lists. Only Form's chips moved: Firefox 121 to 128, Safari 16.5 to 17.4.
- [x] (2) Docs: `featureOf()` turns `logical-properties` into overflow-block and overflow-inline everywhere, yet seven Under the hood steps tag it for logical margins, insets and sizes, so their cards read "overflow-block and overflow-inline, Newly available, Safari 26". The Drawer step that sets `overflow-block` has no tag, and the component docs guide still lists `logical-properties` among the basics to leave out, though the check requires it on ten pages (`packages/opui/scripts/features.mjs:107-112`, `src/components/UnderTheHood/AvatarBuild.astro:93`, `src/components/UnderTheHood/BadgeBuild.astro:48`, `src/components/UnderTheHood/ControlGroupBuild.astro:23`, `src/components/UnderTheHood/DividerBuild.astro:44`, `src/components/UnderTheHood/DrawerBuild.astro:24-31`, `src/components/UnderTheHood/DrawerBuild.astro:84`, `src/components/UnderTheHood/ProgressBuild.astro:91`, `src/components/UnderTheHood/SpinnerBuild.astro:57`, `src/docs/components/AGENTS.md:145`)
  - Summary: Seven Under the hood steps about logical margins and insets show a support card for overflow-block and overflow-inline instead.
  - Recommended: Fix. The guide already treats logical margins and insets as a basic to leave out, so the tags can go.
  - Fix: drop `"logical-properties"` from the seven `features` lists and add it to the Drawer's first step. In the guide's `browserSupport` line, take `logical-properties` out of the basics: here it stands for `overflow-block` and `overflow-inline` (Baseline 2025), which pages do list.
  - Fixed: `logical-properties` is tagged on exactly the steps that set `overflow-block` or `overflow-inline`. It came off ten steps, the seven listed plus Switch Dot and Table Cells and Corners, and went onto six: Accordion Animate to auto, Carousel Grid track, Dialog Place, Drawer Modal, Menu Fit and Tabs Scroll. A step left with no features drops the key. The component docs guide lists logical margins, insets and sizes among the basics, and says `logical-properties` stands for `overflow-block` and `overflow-inline`.
- [x] (2) Toggle: the Browser support section doesn't point to `css/compat/toggle-group.css`, which holds the Toggle page's fallbacks for gap decorations and `overflow-inline`. `BrowserSupport.astro` only names the compat file whose name is the page slug, and the Toggle page's sheets are `toggle-button` and `toggle-group` (`src/components/BrowserSupport.astro:19-22`, `packages/opui/css/compat/toggle-group.css:1-23`, `src/component-api/toggle-group/api.ts:5`)
  - Summary: The Toggle page doesn't say that a compat file draws the group's dividers in Firefox and Safari.
  - Recommended: Fix. Naming the compat files of the page's own components keeps the Menu file off the List page, as the earlier fix meant to.
  - Fix: name the compat files of the slug and of the kebab-cased `source` of each `api.ts` whose page is the slug. Toggle then gets `toggle-group.css`, and List, whose sources are `List` and `ListItem`, still doesn't get `menu.css`. The slug-only filter came with the fix to the List page's compat note.
  - Fixed: `BrowserSupport.astro` names the compat files of the slug and of the kebab-cased `source` of each `api.ts` whose page is the slug, from `pageSources()` in `src/component-api/custom-properties.ts`. Only Toggle changes: it names `css/compat/toggle-group.css`. List still doesn't get `menu.css`. Checked on the dev server.
- [x] (2) Docs: most pages with partial support don't say what happens without the features their chips mark missing. The Browser support section shows chips, Baseline cards and a compat note but no sentence about it. Only Select says it, in a Fallback section, and the Compat layer list in the browser support guide covers only features that have a compat fallback (`src/components/BrowserSupport.astro:28-56`, `src/layouts/Component.astro:294`, `src/docs/components/select.astro:233-234`)
  - Summary: A reader on Firefox or Safari can see that a feature is missing but not whether the component still works there.
  - Recommended: Fix with option A. One place per page and a check keep the sentences complete.
  - Fix: write a sentence for each id below. Each is partial in Firefox or Safari per `pnpm check-browser-support`, and none has a sentence on its page, in an Under the hood step or in the Compat layer list. Four of the outcomes can be read off the CSS:
    - Safari draws a round Progress as a bar, because all of `.ui-round` sits in an `@supports` block for typed `attr()` (`progress.css:85`).
    - Layout's `.ui-divided` draws no lines in Firefox and Safari, and there is no compat file for it (`layout.css:165-175`).
    - A Table's sticky header gets no shadow once it's stuck (`table.css:182-187`).
    - Message bubbles keep plain rounded corners (`message.css:30-32`).

    The ids, by page:
    - Accordion: `display-animation`, `interpolate-size`
    - Anchor: `popover-hint`
    - Carousel: `scroll-buttons`, `scroll-marker-targets`, `scroll-markers`
    - Control group: `customizable-select`
    - Copy: `display-animation`, `overlay`, `popover-hint`
    - Dialog and Drawer: `container-scroll-state-queries`, `dialog-closedby`, `display-animation`, `overlay`
    - Layout: `gap-decorations`
    - Menu and Select: `display-animation`, `overlay`
    - Message: `corner-shape`
    - Progress: `attr`
    - Table: `container-scroll-state-queries`
    - Toast: `interpolate-size`
    - Tooltip: `calc-size`, `display-animation`, `overlay`, `popover-hint`, `text-wrap-pretty`
    - Typography: `attr`, `box-decoration-break`, `text-wrap-pretty`

  - Options:
    - A (recommended): add a `fallbacks` prop to the Component layout, `{ [id]: sentence }`, rendered in Browser support under the chips. `check-browser-support` then fails on an id that is partial in some browser and has no sentence, unless the page names a compat file for it.
    - B: add a Fallback section to each page's accessibility or usage slot, as Select has.
  - Explained: Still the plan, with two more pages. Rating (Safari, `attr`) and Divider (Firefox, `text-box`) are partial and have no sentence either. Without typed `attr()`, a read-only rating sized only by its `max` attribute keeps the width of `--_max`, which the components set when `max` isn't 5 (`packages/opui/css/components/rating.css:20-21`). Without `text-box`, a divider's label keeps its full line box, so the divider takes a little more height (`packages/opui/css/components/divider.css:37`). Toggle's `gap-decorations` is covered by `css/compat/toggle-group.css`, which the page now names, and Toast is now partial only for `interpolate-size`. The sentences that can't be read off the CSS, such as the overlay and display animations, the popover hints and the carousel's scroll buttons and markers, need Firefox and Safari.
  - Fixed: with option A in 2112f76b. The Component layout takes `fallbacks={{ [id]: sentence }}`, rendered under the chips in Browser support, and `check-browser-support` fails on an id some browser lacks with no sentence, and on a sentence for an id the page doesn't list or every browser supports, with tests. 49 sentences on 21 pages, Spinner included, which the check found because its only id, `if`, made Firefox and Safari read Unsupported. Ids a compat file covers get a sentence too. Select's Fallback section is folded into its customizable select sentence. The sentences come from the CSS, `css/compat/` and the features data: the accordion and toast without `interpolate-size` and the dialog without `overlay` were checked in Chromium with the feature turned off, and Firefox and Safari weren't checked.
- [x] (2) Changelog: the Removed IconButton entry restores the old sizes with `--_size: var(--size-4)` and `--_icon-size: var(--size-5)`. Those are Open Props tokens that `css/imports.css` no longer loads. MIGRATING gives `1.25rem` and `1.5rem` (`packages/opui/CHANGELOG.md:135`, `packages/opui/MIGRATING.md:574`, `packages/opui/MIGRATING.md:586`, `packages/opui/css/imports.css:1-15`)
  - Summary: Readers who copy the changelog's sizes get an unset value unless they load Open Props themselves.
  - Recommended: Fix. MIGRATING already has the plain values.
  - Fix: `--_size: 1.25rem` and `--_icon-size: 1.5rem`.
  - Fixed: Fixed: the Removed `IconButton` entry uses `--_size: 1.25rem` and `--_icon-size: 1.5rem`, like MIGRATING.
- [x] (2) Docs: MIGRATING's Theme and tokens section says `--ui-primary` is `--ui-color-9` in light mode. Its own palette paragraph, CHANGELOG 456 and `theme.css` all say the light primary is `oklch(0.499 0.191 222.8)`, derived from `--ui-primary-source` (`packages/opui/MIGRATING.md:1212`, `packages/opui/MIGRATING.md:1166`, `packages/opui/css/theme.css:487-503`)
  - Summary: The migration guide gives two different light-mode primaries, and the one that names a palette step is wrong.
  - Recommended: Fix. It is one sentence, and the guide already states the right value.
  - Fix: start line 1212 with "`--ui-primary` is derived from `--ui-primary-source` (`--ui-color-6` in dark mode), and `--ui-on-primary` …".
  - Fixed: Fixed: MIGRATING's Theme and tokens line reads "`--ui-primary` is derived from `--ui-primary-source` (`oklch(0.499 0.191 222.8)` in light mode and `--ui-color-6` in dark mode), and `--ui-on-primary` is derived from `--ui-primary` with relative color."
- [x] (2) Toast: the Toast page only has "New component" notes, so a 5.x reader gets no Migrating from 5.x callout for the removed `Toast`, `toast.css` and `showToast()`. MIGRATING's Toast section also names no replacement, unlike Icon button and Classic select (`src/utils/whats-new.ts:1426-1434`, `packages/opui/MIGRATING.md:1016-1018`, `packages/opui/CHANGELOG.md:140`)
  - Summary: Someone upgrading from the 5.x Toast lands on the Toast page and learns neither that their code broke nor what replaces it.
  - Recommended: Fix. Button and Select already do this for IconButton and ClassicSelect.
  - Fix: add a Breaking note, and add the replacement to MIGRATING's Toast section and to the Removed entry:
    ```ts
    {
      ...slots(
        `Breaking: <a href="#basics"><code>Toaster</code></a> replaces <code>Toast</code>. Show toasts with <a href="#from-a-script"><code>toast()</code></a> instead of <code>showToast()</code>.`,
      ),
      html: `Breaking: <code>.ui-toast</code>, <code>toast.css</code> and <code>css/js/toast.js</code> are gone. Use <a href="#basics"><code>&lt;opui-toaster&gt;</code></a> and <code>toast()</code> from <code>opui-css/elements/toaster.js</code>.`,
    },
    ```
  - Fixed: Fixed: the Toast What's new notes add the proposed Breaking note (Astro and Vue, the 5.x frameworks, and HTML), MIGRATING's Toast section names `Toaster`, `command="--toast"`, `data-toast` and `data-toast-severity`, `toast()` and the HTML markup, with a diff, and the Removed entry says `Toaster` and `toast()` replace them.
- [x] (2) Changelog: the Added `DrawerHeader` entry says that outside a `Drawer` without `commandfor`, it "closes the nearest `<dialog>` with a script". The Breaking Drawer entry, MIGRATING and the code all contradict this. The `DialogHeader` entry also says it closes "through the dialog's `id` or `commandfor`", but DialogHeader takes no `commandfor` (`packages/opui/CHANGELOG.md:208`, `packages/opui/CHANGELOG.md:211`, `packages/opui/components/Drawer/DrawerHeader.astro:17-19`, `packages/opui/components/Dialog/DialogHeader.astro:10-13`)
  - Summary: The changelog promises header close buttons that find their overlay without setup, which no framework renders.
  - Recommended: Fix. Two clauses change, and MIGRATING.md:485 already has the right wording.
  - Fix: - 211: "Outside a `Drawer`, set `commandfor` to the dialog's `id`. A dev warning says when it's missing."
    - 208: "through the dialog's `id`".
  - Fixed: Fixed. The `DrawerHeader` Added entry ends "Outside a `Drawer`, set `commandfor` to the dialog's `id`. A dev warning says when it's missing." The `DialogHeader` entry says "through the dialog's `id`". Both match `DrawerHeader.astro` and `DialogHeader.astro`.
- [x] (2) Drawer, Typography: the What's new notes say that browsers older than Chrome 135, Firefox 69 and Safari 26 "ignore them and don't scroll it". The compat layer scrolls drawer content and rich text there through `overflow-y` and `overflow-x`, as CHANGELOG 271 and 341 say (`src/utils/whats-new.ts:687`, `src/utils/whats-new.ts:1564`, `packages/opui/css/compat/drawer.css:1-7`, `packages/opui/css/compat/typography.css:14-29`)
  - Summary: The notes say older browsers can't scroll drawer content or wide rich text, but the compat layer scrolls both.
  - Recommended: Fix. The notes were written before the compat fallbacks (TODO.md:383-387, done).
  - Fix: replace "and don't scroll it" with "and `compat.css` scrolls it through `overflow-y` there". For rich text, use `overflow-x`.
  - Fixed: Fixed. The Drawer note says browsers older than Chrome 135, Firefox 69 and Safari 26 "ignore them, and `compat.css` scrolls it through `overflow-y` there". The Typography note says `compat.css` "scrolls the tables and code blocks through `overflow-x` there", matching `css/compat/drawer.css` and `css/compat/typography.css`.
- [x] (2) TextField, Textarea: the Astro and Vue note "x-small and large sizes. Breaking: `size="small"` replaces `small`." starts with the Added text. The Breaking change shows mid-sentence in What's new and never reaches the Migrating from 5.x callout (`src/utils/whats-new.ts:1296-1302`, `src/utils/whats-new.ts:1375-1381`)
  - Summary: The size prop rename shows up as a new feature in What's new and is missing from the Migrating from 5.x callout.
  - Recommended: Fix. Switch already splits the same change this way (whats-new.ts:1113-1115).
  - Fix:
    ```ts
    slots(
      `Breaking: <a href="#sizes"><code>size="small"</code></a> replaces <code>small</code>.`,
    ),
    {
      default: `<a href="#sizes">x-small and large</a> sizes with the <code>size</code> prop.`,
      html: `<a href="#sizes">x-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    ```
  - Fixed: Both notes are now two notes. A `slots()` Breaking note, "`size="small"` replaces `small`", links to `#sizes`. An Added note has the `default` and `html` keys.
- [x] (2) Changelog: ten Breaking notes about 5.x Astro and Vue props use `components()`. As a result, the React and Svelte pages show a Migrating from 5.x callout about `isGroup`, `description`, `supportingText`, `ClassicSelect`, `SelectItem` and narrowed types, none of which those frameworks ever had (`src/utils/whats-new.ts:113-118`, `src/utils/whats-new.ts:200-202`, `src/utils/whats-new.ts:449-451`, `src/utils/whats-new.ts:773-775`, `src/utils/whats-new.ts:1057-1065`, `src/utils/whats-new.ts:1322-1324`, `src/utils/whats-new.ts:1401-1403`)
  - Summary: React and Svelte pages tell readers to migrate from 5.x props their framework never had.
  - Recommended: Fix. Other notes already keep prop migrations to Astro and Vue, like the Card actions note.
  - Fix: use `slots(...)` instead of `components(...)` for these ten notes. Where React and Svelte need the fact, add a non-Breaking `react` and `svelte` variant, as `card` does (whats-new.ts:264-271), for example "`AvatarGroup` groups avatars." Checked in `dist/react/components/avatar/` ("replaces the isGroup prop") and `dist/react/components/select/`.
  - Fixed: Fixed. All ten notes now use `slots(...)`. Six get a non-Breaking `react` and `svelte` variant with the same fact: the button avatar types, "`AvatarGroup` groups avatars.", the Button link types, the Chip button and link types, the ListItem `type` types, and "`items` is typed as `SelectItem[]`, exported from every framework." The four that only migrate 5.x props get no variant: `ClassicSelect`, and `startText` replacing `description` on Select, TextField and Textarea. React pages now show only CSS-level Breaking notes.
- [x] (2) Blog: the hover card post's Fallback says hover and focus do nothing without interest invokers. But `css/compat/anchor.css` shows the card in those browsers while the anchor is hovered (on devices that can hover) or holds keyboard focus (`src/docs/blog/anchor-hover-cards.astro:122-126`, `packages/opui/css/compat/anchor.css:2-14`)
  - Summary: Readers think Firefox and Safari users never see the hover card, though the compat layer shows it on hover and focus.
  - Recommended: Fix. The tooltip post already describes its compat fallback the same way.
  - Fix: replace the first bullet. "Without interest invokers, the compat layer shows the card while the anchor is hovered (on devices that hover) or holds keyboard focus, inside `@supports not selector(:interest-source)`. It isn't in the top layer there, and a tap on a link follows it."
  - Fixed: The first Fallback bullet says the compat layer shows the card while the anchor is hovered (on devices that hover) or holds keyboard focus, inside `@supports not selector(:interest-source)`, that it isn't in the top layer there, that a trigger with `commandfor` still toggles it on click, and that a tap on a link follows its `href`.
- [x] (2) Blog: the switch post's snippet transitions the dot (`inset-inline-start`, outline and color). Its Fallback says the dot jumps only under reduced motion. But `switch.css` has no transition: since 6.0 Switch turns on and off at once, as its Under the hood step says. The computed `::after` transition on the post's own Switch demo is `all` with no duration (`src/docs/blog/switch-checkbox.astro:65-69`, `src/docs/blog/switch-checkbox.astro:122-125`, `packages/opui/css/components/switch.css:52-64`, `src/components/UnderTheHood/SwitchBuild.astro:99`)
  - Summary: The switch post shows a sliding dot and a reduced-motion note that the real switch no longer has.
  - Recommended: Fix. The CHANGELOG and the Under the hood step already say the switch changes at once.
  - Fix: drop the `transition` declaration from the snippet's `::after` rule. Replace the reduced-motion bullet with: "Nothing transitions, in any motion setting: the dot moves the moment you click or tap, like Checkbox and Radio, so a press never looks missed."
  - Fixed: The snippet's `::after` rule has no `transition`, and the reduced-motion bullet reads: "Nothing transitions, in any motion setting: the dot moves the moment you click or tap, like Checkbox and Radio, so a press never looks missed".
- [x] (2) Blog: post snippets use custom property names that the component CSS doesn't have. Most are the 5.x names that MIGRATING lists as renamed: `--min-height` and `--icon` (Button); `--dot-inset`, `--dot-size`, `--dot-color`, `--dot-outline-size`, `--track-height` and `--track-width` (Switch); `--track-fill`, `--track-color` and `--fill-color` (Range); `--accent-contrast` (Checkbox); `--icon-color` (Callout). Two posts use names that match neither version: `--flow-space` (Typography), and `--affix`, `--border` and `--helper` (TextField) (`src/docs/blog/button-icon-only-has.astro:43-58`, `src/docs/blog/switch-checkbox.astro:50-76`, `src/docs/blog/range-tick-marks.astro:34-48`, `src/docs/blog/range-tick-marks.astro:67-111`, `src/docs/blog/range-tick-marks.astro:162-165`, `src/docs/blog/checkbox-appearance-none.astro:49-78`, `src/docs/blog/callout-relative-colors.astro:60-65`, `src/docs/blog/vertical-rhythm-round.astro:54-62`, `src/docs/blog/text-field-user-invalid.astro:47-63`)
  - Summary: Readers who look for the post's custom properties in the component CSS or the rename table find old or missing names.
  - Recommended: Fix with option A. It keeps the posts' short style and matches the CSS after the 6.0 renames.
  - Fix: the current names are in `button.css:61-77`, `switch.css:3-28`, `range.css:7-11` and `range.css:247-289`, `choice.css:19`, `callout.css:10`, `typography.css:288-307` and `text-field.css:13-33`.
  - Options:
    - A (recommended): keep the short form without `--_` (as the posts' short class names do), but use the current names:
      - Button: `--icon-size`, `--size`.
      - Switch: `--thumb-inset`, `--thumb-size`, `--thumb-bg-color`, `--thumb-outline-width`, `--track-block-size`, `--track-inline-size`.
      - Range: `--track-fill-fraction`, `--track-bg-color`, `--track-fill-bg-color`, `--padding`.
      - Checkbox: `--on-accent`. Callout: `--icon-text-color`. Typography: `--flow-gap`.
      - TextField: `--affix-text-color`, `--border-color`, `--helper-text-color`.

      Rename the same names in the build-ups that share them: `ButtonBuild` `--icon`; `SwitchBuild` `--dot-color`, `--track-width` and `--accent-contrast`; `CheckboxBuild` and `RadioBuild` `--accent-contrast`; `RangeBuild` `--track-fill` and `--inset`; `RhythmBuild` `--flow-space`. Then a post and its build-up read the same.

    - B: write the components' own names, with the `--_` prefix and `ui-` classes, as the Tabs and Tooltip posts do.
  - Fixed: Option A, in the seven posts and in ButtonBuild, SwitchBuild, CheckboxBuild, RadioBuild, RangeBuild and RhythmBuild, prose and knobs included. Range's `--inset` became `--padding`. TextFieldBuild shared `--affix`, `--border` and `--helper` with its post, and CalloutBuild used `--bg`, `--border` and `--icon`, so both read the current names too (`--affix-text-color`, `--border-color`, `--helper-text-color`, `--bg-color`, `--icon-text-color`). Names with no counterpart in the component CSS stay: `--thumb` (a timeline name), `--halo`, `--ring` and `--dot`.
- [x] (2) Select: the Picker step of the Under the hood build-up paints the list with `--ui-surface-filled` and a field border, which is the 5.x picker. Since 6.0, `select.css` paints it with `--ui-surface-elevated`, the raised edge and `-on-raised` borders inside, like Menu (`src/components/UnderTheHood/SelectBuild.astro:94-99`, `packages/opui/css/components/select.css:117-123`)
  - Summary: The Select build-up, which the select post links to, draws its picker in other colors than the real one.
  - Recommended: Fix. It is the change the CHANGELOG already describes.
  - Fix:
    ```css
    .list {
      --ui-border-color: var(--ui-border-color-on-raised);
      --ui-field-border-color: var(--ui-field-border-color-on-raised);

      background-color: var(--ui-surface-elevated);
      border: var(--ui-border-width) solid
        var(--ui-border-color-raised, var(--ui-border-color-on-raised));
      border-radius: var(--ui-radius);
      padding: 0.5rem 0;
    }
    ```
  - Fixed: The Picker step's `.list` sets the `-on-raised` border colors and paints `--ui-surface-elevated` with the raised edge, as in the item (`src/components/UnderTheHood/SelectBuild.astro`).
- [x] (3) Avatar, Button: each Disabled section's only sentence, "Links: drop `href`, add `role="link"` and `aria-disabled="true"`.", sits in a `<Conditional>` that has only an `html` slot. `<Conditional>` falls back to that slot on every framework, so the Astro, React, Svelte and Vue pages tell readers to do by hand what `disabled` does, right above an example that sets `disabled` on a link (`src/docs/components/avatar.astro:130-135`, `src/docs/components/button.astro:135-140`, `src/utils/framework.js:61-67`)
  - Summary: Component readers are told to strip `href` and add ARIA themselves, though the `disabled` prop does it for them.
  - Recommended: Fix with option A. It gives each page the sentence that's true for it.
  - Fix: confirmed in the built `dist/react/components/button/index.html` and `dist/vue/components/avatar/index.html`. A `tests/unit/docs-pages.test.ts` check could also flag a `<Conditional>` that has an `html` slot but neither `components` nor all four framework slots, with a sample.
  - Options:
    - A (recommended): add a `components` slot to both, such as "Set `disabled`, on a link too."
    - B: add an empty `components` slot, so only the HTML page shows the sentence.
  - Fixed: Fixed with option A: both Disabled sections add a `components` slot, "Set `disabled`, on a link too." The `docs-pages.test.ts` check isn't added: `src/docs/components/partials/ValidationNotes.astro:24` still has an `html`-only `<Conditional>` that shows "Point `aria-describedby` at the end text." on every framework page, and whether the components need it is for the owner of the pages that use the partial.
- [x] (3) Docs: neither the pages nor the guide state the floor every component shares. The chips leave out nesting, as the guide asks, and the `light-dark()` and relative colors that every theme token is built on, so Description list reads Chrome 105, Firefox 110 and Safari 16 while it needs Chrome 125, Firefox 128 and Safari 18. Stat's section says this CSS is "listed in the browser support guide", which has no such list (`src/components/BrowserSupport.astro:40-43`, `src/docs/guide/browser-support.astro:33-207`, `src/docs/components/AGENTS.md:145`, `packages/opui/core/palette.css:82-84`, `packages/opui/css/theme.css:525-562`)
  - Summary: The chips promise support in browsers older than the whole library needs, and the list the Stat page links to doesn't exist.
  - Recommended: Fix with option A. One list in the guide answers both the Stat link and the chip versions.
  - Fix: the floor, by web-features:
    - Nesting: Chrome 120, Firefox 117, Safari 17.2. It's needed for nested type selectors such as `input {` at `rating.css:90`.
    - `light-dark()`: Chrome 123, Firefox 120, Safari 17.5. `theme.css` uses it without a fallback.
    - Relative colors: Chrome 125, Firefox 128, Safari 18. The gray scale in `palette.css` uses them without a fallback.

    Six pages' chips fall below this floor today: Card (Chrome 111), Description list, Form (Chrome 119, Firefox 121, Safari 16.5), Spinner (Chrome 111), Stepper (Chrome 111) and Textarea (Chrome 123).

  - Options:
    - A (recommended): add a Shared features section to the guide with chips for the shared ids, link to it from both sentences in `BrowserSupport.astro`, and count those ids into every page's chip versions.
    - B: add the section and the link only, and keep counting only a page's own ids in its chip versions.
  - Explained: The floor holds, and the pages below it changed. Callout now reads Chrome 105, Firefox 121 and Safari 15.4, since `scope` came off it, and Form reads Firefox 128 and Safari 17.4, since it lists `alt-text-generated-content`. Below the floor today: Callout, Card (Chrome 111), Description list (Chrome 105, Firefox 110, Safari 16), Form (Chrome 119, Safari 17.4), Spinner (Chrome 111), Stepper (Chrome 111) and Textarea (Chrome 123). Nesting, `light-dark()` and relative colors set the floor; cascade layers and the other basics are older and don't move it.
  - Fixed: with option A in 1fa6b204. The browser support guide has a Shared features section from `SHARED_FEATURES` in `src/utils/browser-support.ts`: cascade layers, `color-mix()`, `light-dark()`, nesting, `oklch()` and relative colors. Every page's chips count them, so Description list and Stat read Chrome 125, Firefox 128 and Safari 18, and both sentences in `BrowserSupport.astro` link to `#shared-features`. `check-browser-support` fails on a shared id that `core/`, `css/layers.css` and `css/theme.css` don't use, with a test. `:where()`, `:is()` and custom properties stay among the long-settled basics.
- [x] (3) TextField, Textarea, Select: MIGRATING's affix diffs turn a 5.x Astro slot into the React and Svelte prop form (`start="€"`, `bottom="0 / 160"`). Astro and Vue only take these as slots. In Astro, `start` becomes an attribute on the `<input>`, so the copied After line renders no affix (`packages/opui/MIGRATING.md:792-798`, `packages/opui/MIGRATING.md:972-978`, `packages/opui/MIGRATING.md:1009-1014`)
  - Summary: Someone upgrading an Astro or Vue project who copies the After line loses the field's prefix, suffix or footer.
  - Recommended: Fix. The guide is for 5.x users, and 5.x only had Astro and Vue.
  - Fix: put the slot in the After line, keep the Vue `<template #start>` sentence, and drop "The prop form is React and Svelte":
    ```diff
    - <TextField label="Amount"><span slot="prefix">€</span><span slot="suffix">EUR</span></TextField>
    + <TextField label="Amount"><span slot="start">€</span><span slot="end">EUR</span></TextField>
    ```
    Do the same for Select (`slot="start"`) and Textarea (`slot="bottom"`).
  - Fixed: Fixed: the three After lines use the Astro slots (`<span slot="start">€</span>`, `slot="end"`, `slot="bottom"`), and the sentence under each diff gives the Vue `<template #...>` form instead of the React and Svelte prop form.
- [x] (3) Changelog: the Breaking `--_` rename notes on nine pages still map old properties to outputs that the components set. MIGRATING's rows were corrected to name the input to set (TODO.md:754, done), but the notes weren't updated, so the Migrating from 5.x callouts and the guide disagree (`src/utils/whats-new.ts:49`, `src/utils/whats-new.ts:272`, `src/utils/whats-new.ts:940`, `packages/opui/MIGRATING.md:1226-1287`)
  - Summary: The Migrating from 5.x callouts tell readers to set properties the component overwrites, so the override does nothing.
  - Recommended: Fix. MIGRATING is already right, so the notes only need to follow its rows.
  - Fix: rewrite each note from its MIGRATING row. I checked the input and output kinds in `src/component-api/custom-properties/`.
    - Accordion (whats-new.ts:49): `--_transition` maps to `--_motion` (or `--ui-duration`), not `--_duration` (row 1226).
    - Badge: `--_anchor-tx` and `--_anchor-ty` are no longer overrides, because the corner classes set `--_sign-x` and `--_sign-y` (whats-new.ts:133, row 1234). `--_badge-inset` maps to `--_inset` (whats-new.ts:156, row 1233).
    - Callout (whats-new.ts:221 and 231): `--_color` and `--_icon-color` are no longer overrides. Recolor through the intent token, or `--_outlined-text-color` (rows 1242 and 1246).
    - Card (whats-new.ts:272): `--_card-bg-color` maps to `--_surface-bg-color`, `--_tonal-bg-color` or `--_elevated-bg-color`. `--_card-border-color` maps to `--_outlined-border-color` and `--_card-shadow` to `--_elevated-shadow`. `--_card-border-width` is removed (rows 1249-1254).
    - Chip (whats-new.ts:445): `--_color` is no longer an override (row 1260).
    - Drawer (whats-new.ts:672): `--_transition-duration` maps to `--_motion` (or `--ui-duration-slow`). `--_transition-timing` is removed (rows 1262-1263).
    - Range (whats-new.ts:940 and 971): `--_thumb-bg`, `--_thumb-highlight-color` and `--_track-fill-color` map to `--_accent`, and `--_track-color` maps to `--_track-base-bg-color`. `--_track-fill` is removed, which note 940 contradicts against note 7 (rows 1268-1271).
    - Switch (whats-new.ts:1128): `--_transition-time` maps to `--_motion` (row 1274). The switch itself no longer transitions (CHANGELOG 415).
    - ToggleButton (whats-new.ts:1455): `--_button-bg-color` maps to `--_selected-bg-color` (row 1287).
  - Fixed: Fixed: each note now follows its MIGRATING row. Accordion `--_transition` maps to `--_motion` (or `--ui-duration`). Badge `--_anchor-tx` and `--_anchor-ty` are no longer overrides because the corner classes set `--_sign-x` and `--_sign-y`, and `--_badge-inset` is `--_inset`. Callout `--_color` and `--_icon-color` are no longer overrides. Card maps to the variant inputs, and `--_card-border-width` is no longer an override. Chip `--_color` is no longer an override. Drawer maps to `--_motion` (or `--ui-duration-slow`), and its easing follows `--ui-ease-enter` and `--ui-ease-exit`. Range maps `--_thumb-bg`, `--_thumb-highlight-color` and `--_track-fill-color` to `--_accent`, and `--_track-color` to `--_track-base-bg-color`, in one note; the separate `--_thumb-bg` note is gone, and `--_track-fill` is left to the CSS-only note. Switch maps to `--_motion` and `--_ease`, which only time the card focus ring. ToggleButton maps to `--_selected-bg-color`. ControlGroup's note had the same problem: it said the lines follow the output `--_divider-border-color`, and now names the input `--_divider-accent`.

## Future plans

Custom elements (web components) the library could add, for behavior that HTML and CSS can't give a component.

- [x] (1) Range: `range.js` only wires the outputs that exist when `initRange()` runs, so markup that htmx, Turbo, `innerHTML` or a `<template>` adds later needs another call, and its `astro:after-swap` listener ties the framework-agnostic helper to Astro (`packages/opui/css/js/range.js:1-44`, `packages/opui/components/Range/Range.astro:136-139`)
  - Summary: A Range added to the page after load doesn't update its value readout until `initRange()` runs again.
  - Recommended: Fix. Two delegated listeners replace the init call, and the markup stays as it is.
  - Fix: listen for `input` and `reset` once on `document` (both bubble) and update the `output[data-live]` of the event's `.ui-range`, with `resetValue()` after a reset, so importing `range.js` is all a page does. That drops the `WeakSet` and the `astro:after-swap` listener; keep `initRange()` as an export that does nothing, so existing pages don't break. The starting text and `aria-valuetext` come from the markup, as the Astro component already renders them. A custom element doesn't fit here: the root is a `<label>`, and a wrapper would add parity drift in React, Svelte and Vue.
  > Fix
  - Fixed: `range.js` listens for `input` and `reset` once on the document (both bubble) and updates the `output[data-live]` of the event's `.ui-range`, with `resetValue()` after a reset, and syncs every readout once when it loads, so importing it is all a page does. `Range.astro` and the HTML Value example import it, and the `WeakSet` and the `astro:after-swap` listener are gone. `initRange()` stays as an export that syncs the readouts again, so existing pages keep working. The Range page, Concepts, `api.ts`, the README and the unreleased CHANGELOG and What's new entries say import instead of call, and `css-js.spec.ts` adds a range that `innerHTML` inserts after the script loads.
- [x] (1) Textarea, TextField: a field with `maxlength` doesn't say how many characters are left, and counting them needs a script (`src/component-examples/textarea/EndText.html:1-7`)
  - Summary: Fields with a character limit don't show how many characters are left.
  - Recommended: Fix. The end text already has room for the count.
  - Fix: an `<opui-character-count>` in the end text reads the field's `maxlength`, shows the characters left and announces them politely only near the limit, so each keystroke isn't read out. Without the script the end text shows only its hint. Add it to `Textarea` and `TextField` in all five formats.
  > Fix
  - Fixed: `TextField` and `Textarea` take `characterCount` and `characterCountLabel` in all five formats: with `maxlength`, the `<opui-character-count class="ui-value">` custom element (`elements/character-count.js`) at the end of the end text shows the characters typed out of the limit, like `13/20`. Decisions: the visible count is numbers only and `aria-hidden`, since the end text sits in the `<label>` root and a live count would join the field's name on every keystroke (measured: the name stays "Bio Shown on your profile."). The announcement comes from one polite live region the element adds to `body`, outside any label, once 10% or 10 characters are left, whichever is more, after a 750ms pause in typing. Since a component never joins a number and words, the words come from `characterCountLabel` (the element's `label`) with `{count}` for the number, "Characters left: {count}" by default, which needs no plural; Svelte takes it as an expression, since Svelte reads braces in a string. The Text field and Textarea pages have a Character count section and example (new parity snapshots), their anatomies show the count, and interaction tests in every framework cover the count, the name and the announcement. The examples need new visual baselines (`update-snapshots` label).
- [x] (1) TextField: a password field can't show its text. The sign-up block's password field has no reveal toggle, and a toggle needs a script to switch the input's `type` (`src/blocks/sign-up.html:105-121`, `packages/opui/css/components/text-field.css:105`)
  - Summary: Password fields have no show password toggle, so users can't check what they typed.
  - Recommended: Fix. A small element in the end affix keeps the field's markup and CSS.
  - Fix: an `<opui-password-toggle class="ui-end">` as the field's end affix, so `.ui-field > .ui-end` still matches. It holds a `.ui-button` that switches the input between `type="password"` and `type="text"`, sets `aria-pressed` and keeps focus where it is. Without the script `:not(:defined)` hides it and the field is a plain password field. Add it to `TextField` in all five formats.
  > Fix
  - Fixed: `TextField` takes `passwordToggle` and `passwordToggleLabel` ("Show password" by default) in Astro, React, Svelte and Vue: a `Button` in `.ui-end` with `aria-pressed`, `commandfor` naming the input and `command="--toggle-password"`, run by the new `<opui-text-field>` custom element (`elements/text-field.js`). It switches `type` between `password` and `text`, updates `aria-pressed`, keeps focus on the button, and hides the password again on submit and reset. Deviation from the approved markup: the toggle isn't an `<opui-password-toggle class="ui-end">` inside the `<label>` root, because a button inside a `<label>` joins the input's name in Chromium ("Password Show password", measured in the accessibility tree). With the toggle on, the root is `<opui-text-field class="ui-text-field">` with a `<label class="ui-label" for>` and a generated input id, and the start and end text describe the input through `aria-describedby`; measured, the input is named "Password" and described by its end text. `:not(:defined)` hides the button until the element loads. `text-field.css` fits any `.ui-button` in `.ui-start` or `.ui-end` to the field (`--_affix-button-size`) and swaps the `.ui-icon-unchecked` and `.ui-icon-checked` eyes on `aria-pressed`. The Text field page has a Password toggle section and example in five formats (new parity snapshot), `api.ts`, the CHANGELOG and What's new document it, the sign-up block's password field uses it, and interaction tests in every framework cover the toggle, the name and the description. Axe passes on the fixture and the block. The example and the sign-up block need new visual baselines (`update-snapshots` label).
- [x] (1) Web components: dates in the blocks are fixed text, such as "Yesterday" in the inbox, so they go stale, and relative wording in the reader's language needs a script (`src/blocks/inbox.html:400-402`, `src/blocks/notifications.html:127-129`)
  - Summary: Dates like "Yesterday" are fixed text, so they go stale and don't follow the reader's language.
  - Recommended: Fix. The element is small, and the server text stays as the fallback.
  - Fix: an `<opui-relative-time>` around a `<time datetime>` rewrites its text with `Intl.RelativeTimeFormat` in the page's `lang`, puts the full date in `title`, and refreshes on a timer that slows down as the date gets older. Without the script the server text shows.
  > Remove issue
  - Removed: on request. The inbox and notifications blocks keep their fixed dates, and no `<opui-relative-time>` element is planned.
- [x] (2) Table: sorting a table needs a script. The data-table block marks Customer as sorted with a fixed `aria-sort`, and its headers can't change the order (`src/blocks/data-table.html:156-168`)
  - Summary: Table headers can't sort the rows, and the sorted column in the data-table block is fixed.
  - Recommended: Fix with option A. Server sorting keeps working without the script, and the element adds sorting in the page.
  - Options:
    - A (recommended): an `<opui-sortable-table>` around the `.ui-table` turns each header marked `data-sort` into a button, reorders the `tbody` rows by the cell text or a `data-sort-value`, sets `aria-sort` on the sorted header and announces the new order. Without the script the headers are links to a server-sorted page, or plain text.
    - B: document server sorting only: the headers are links with a `sort` query parameter, and the page renders `aria-sort`.
  > Fix with option A
  - Fixed: option A, with one change: the sort button is in the rendered markup instead of added by the element, so React, Svelte and Vue own every node they render. `sortable` on `TableHeaderCell` (`th[data-sort]`) puts the label in a `<button type="button">`, and `SortableTable` (`opui-sortable-table.ui-sortable-table`, `display: contents`) in Astro, React, Svelte and Vue loads the element. A press fires a cancelable `sort` event (`onSort` in React, `onsort` in Svelte, `@sort` in Vue) with the column, the direction and the header, moves `aria-sort` to that header, ascending first, reorders the `tbody` rows by `data-sort-value` or the cell text with `Intl.Collator` and `numeric: true` unless the event was canceled, and announces the column and the direction in a status region it adds on the first sort (`data-ascending` and `data-descending` translate the words). `sortable-table.css` draws the arrow, a mask that gets `ButtonText` in forced colors. The Table page has a Sorting section, a Sortable example in five formats (new parity snapshot), a Usage item, the keys and the API, and the data-table block sorts by Customer, Plan, Status, MRR and Signed up, with sort values on the formatted cells and a caption that no longer says sorted by name. Without the script the header buttons do nothing, so the page says to link the headers to a sorted page then. Interaction tests in every framework and a block test that selects and sorts together pass in Chromium, and axe passes on the Table fixture and the block. The new example and the block need visual baselines (`update-snapshots` label).
- [ ] (1) Menu: the arrow keys do nothing, so a keyboard user Tabs through every item of a long menu, and the page documents this as the trade-off of a `<menu>` of buttons without a script; the library now ships custom elements for behavior HTML can't give (`src/component-api/menu/api.ts:28-31`, `src/docs/components/menu.astro:174-178`)
  - Summary: Keyboard users Tab through every item of a long menu, since the arrow keys do nothing.
  - Recommended: Explain further. Arrow keys alone don't change the roles, so the choice is between them, the full menu pattern and today's list.
  - Fix: an `<opui-menu>` element in the light DOM, like `Toaster` and `Copy`, that on `toggle` to open moves focus to the first item, handles Up and Down with wrap, Home and End, and adds `role="menu"` to the `<menu>` and `role="menuitem"` to its buttons and links only while it is defined, so the markup stays a list of buttons without the script.
  - Options:
    - A: the element above, documented next to the Role & attributes section.
    - B: keep the list of buttons and the current keyboard table.
  - Explained: A correction to the recommendation: arrow keys don't need the menu roles. The APG disclosure navigation example adds optional Up and Down Arrow, Home and End to plain buttons and links, so an element could add them and keep the list of buttons, the Tab order and what screen readers hear. That is a third way next to the two options. The full menu pattern (option A) changes the roles and also has to move focus on open and close (see the Esc in a submenu item), while arrow keys alone are a small element with no role change. Either way it's a design decision about the documented list model.
- [ ] (1) Package: there is no breadcrumb: the file manager block styles its own breadcrumb list and separators (`src/blocks/file-manager.html:5-13`, `src/blocks/file-manager.html:55-61`)
  - Summary: Pages that show where the user is in a hierarchy have to style their own breadcrumbs.
  - Recommended: Fix. It is CSS only, and the file manager block already has the markup.
  - Fix: a `.ui-breadcrumb` class on a `nav` with an `ol` of links and `aria-current="page"` on the last item, with the separator drawn in `li + li::before` with `content: "/" / ""` so screen readers skip it, and a `--_separator` property for another character or an icon. A `Breadcrumb` component in all five formats.
- [ ] (1) Package: there are no charts: the analytics dashboard draws its bar chart with its own grid and custom properties, and line, area and donut charts aren't covered (`src/blocks/analytics-dashboard.html:5-15`, `src/blocks/analytics-dashboard.html:160-165`)
  - Summary: Dashboards have to draw their own charts.
  - Recommended: Explain further. Charts are a large scope, and the library could ship only the CSS for simple ones.
  - Fix: a `.ui-chart` with bar and column variants for a list or a table, each value in a `--value` custom property and its text in an `.ui-sr-only` label, as the analytics block does, colored from the palette. Line and area charts need SVG, so leave those to chart libraries and document how to theme them with the `--ui-*` tokens.
- [ ] (1) Package: there is no skeleton: content that loads has only the Spinner, which marks an `aria-busy` container, and no placeholder in the shape of the text, image or card that will appear (`packages/opui/css/components/spinner.css:1-20`)
  - Summary: Loading content shows a spinner but no placeholder in the shape of what is coming.
  - Recommended: Fix. It is CSS only and builds on the `aria-busy` state the Spinner already reads.
  - Fix: a `.ui-skeleton` class for a block of text lines, a circle or a rectangle, with a shimmer that `--ui-motion` turns off, `aria-hidden="true"` on the placeholder and `aria-busy="true"` on the container that loads. A `Skeleton` component in all five formats.
- [ ] (1) Package: there is no sidebar: the app shell and chat blocks each style their own side navigation, hide it below a container size and offer no way to open it on narrow screens or to collapse it (`src/blocks/app-shell.html:36-45`, `src/blocks/chat.html:5-12`)
  - Summary: Apps have to build their own side navigation, and it disappears on narrow screens.
  - Recommended: Explain further and provide an example. The pieces exist (List, Drawer, Accordion), so the question is whether a layout component is worth adding.
  - Fix: a `.ui-sidebar` layout with a sidebar and main area, groups that collapse through `<details>`, and below a container size the same `nav` shown in a `Drawer` that a menu button in the header opens. A `Sidebar` component in all five formats.
  - Explained: Part of the claim is out of date: app-shell, chat and inbox already open their navigation on narrow screens, from a header button that opens a copy of it in a `Drawer` (`src/blocks/chat.html:199`, `src/blocks/chat.html:439`). The done Drawer item tried a sidebar mode that keeps one copy and found two catches: Chromium exposes the closed dialog in the page as a dialog around the navigation, and narrowing the frame runs the drawer's exit transition over the page. So a `.ui-sidebar` keeps a plain `nav` in the page when wide and the Drawer when narrow, as the blocks do by hand, and what it adds is the shared layout and the collapse. The chat sidebar's fixed width is at `src/blocks/chat.html:70` (`--_columns: 20rem 1fr`).
- [ ] (1) Web components: there is no command palette: the app shell has a search field in its header but no dialog that searches commands and pages from anywhere with a keyboard shortcut (`src/blocks/app-shell.html:94-100`)
  - Summary: Apps have no keyboard-first way to jump to a page or run a command.
  - Recommended: Explain further. It builds on the combobox, so it waits for that.
  - Fix: once the combobox exists, a `CommandPalette` that puts it in a `Dialog`, groups the options under headings and opens on a shortcut that the page chooses through `aria-keyshortcuts`.
- [ ] (1) Web components: there are no resizable panels: the chat block gives its sidebar a fixed width, and changing it needs a script and a separator the keyboard can move (`src/blocks/chat.html:5-12`)
  - Summary: Users can't make a sidebar or panel wider or narrower.
  - Recommended: Explain further. Few blocks need it, and CSS `resize` covers simple cases.
  - Fix: an `<opui-splitter>` between two panels with `role="separator"`, `aria-valuenow` and `aria-orientation`, moved by dragging or by the arrow keys, writing the size to a custom property on the container. Without the script the panels keep their default sizes.
  - Explained: The claim holds, but the width isn't in the cited lines: the chat block sets it on its `.ui-layout-columns` wrapper, `--_columns: 20rem 1fr` (`src/blocks/chat.html:70`).
- [ ] (1) Web components: there is no tree view: nested items, like the folders in the file manager, can only be nested lists or `<details>`, with no arrow-key navigation or selection (`src/blocks/file-manager.html:55-61`)
  - Summary: Nested folders or categories can't be shown as a tree that the keyboard can move through.
  - Recommended: Explain further. Nested `<details>` lists already cover most uses without a script.
  - Fix: document nested `.ui-list` items in `<details>` as the tree without a script. An `<opui-tree>` then adds `role="tree"`, `treeitem` and `group`, roving tabindex, the arrow keys to move, open and close, typeahead and `aria-selected`, only once it is defined.
- [ ] (1) Tokens: Figma's Dev Mode shows no opui markup for a design: Code Connect needs a published component library and an Organization or Enterprise plan, so the variables' `var(--ui-*)` code syntax is the only link to the code (`src/utils/figma-tokens.ts:454`)
  - Summary: A developer inspecting a Figma design sees opui token names but no opui component code.
  - Recommended: Fix with option B. Code Connect needs a component kit that doesn't exist yet and a plan the account doesn't have.
  - Options:
    - A: once the kit exists on a plan that allows it, generate `figma.html` and `figma.tsx` Code Connect templates from the `api.ts` data, one per component.
    - B (recommended): keep the code syntax on the variables as the link until there is a kit and a plan for it.
- [ ] (1) Release: the opui Figma plugin isn't on Figma Community: its manifest has a placeholder id, so people install it from the zip on the theme tokens page through Import plugin from manifest (`packages/figma-plugin/manifest.json:5`)
  - Summary: People can install the Figma plugin only from a downloaded zip, not from Figma Community.
  - Recommended: Fix. Publishing takes the Figma desktop app and the owner's account, as the plugin README describes.
  - Fix: publish it from the Figma desktop app (Plugins, Development, Manage plugins in development, Publish), put the id Figma assigns in `manifest.json`, and link the Community page from the theme tokens page.
- [ ] (1) Select: the customizable picker hides the browser's checkmark on the selected option with `::checkmark { display: none; }`, to be revisited once the `::checkmark` API is final (`packages/opui/css/components/select.css:149-152`)
  - Summary: The selected option in the customizable Select picker shows no checkmark, since the browser's own is hidden.
  - Recommended: Explain further. The `::checkmark` pseudo-element is still changing, so showing it is a decision for when the spec settles.
  - Fix: once `::checkmark` is stable in the engines that ship customizable select, decide whether the selected option shows it, styled with the `--ui-*` tokens, and remove the `display: none`.
  - Moved from a `TODO` comment in `select.css`, as the 6.0 release checklist asked.
- [ ] (1) CSS: the visually hidden Tabs radio repeats the declarations of `.ui-sr-only` (with `1lh` and `1ch` instead of `1px`), and so do the Toggle button inputs and the repeated Message header, since CSS has no mixins yet (`packages/opui/css/components/tabs.css:34-40`, `packages/opui/css/components/toggle-button.css:42-49`, `packages/opui/css/components/message.css:205-212`, `packages/opui/core/utils.css:21-27`)
  - Summary: Nothing a user sees: the same six declarations live in four stylesheets.
  - Recommended: Explain further. CSS mixins haven't shipped in any engine, so there is nothing to change until one does.
  - Fix: once `@mixin` and `@apply` ship, define the visually hidden declarations once and apply them in the four rules.
  - Moved from a `TODO` comment in `tabs.css`, as the 6.0 release checklist asked.
- [ ] (2) Web components: a color picker needs a script, and `<input type="color">` only gives hex, which the library's colors never use. The Theme builder has a light-DOM `<oklch-input>` for it, but it lives in the docs site and isn't form-associated (`src/utils/oklch-input.ts:83`, `src/utils/oklch-input.ts:297-299`)
  - Summary: There is no OKLCH color field, and the native color input only gives hex values.
  - Recommended: Fix. The element already exists on the docs site and mostly needs to move into the package.
  - Fix: move `oklch-input.ts` and the color helpers it imports into the package as `<opui-color-field>`, with `Range` sliders and a `TextField`. Make it form-associated (`static formAssociated = true` and `ElementInternals`), so it submits its `oklch()` value and takes part in validation and form reset. The Theme builder then imports it from the package. Without the script it is a `TextField` that takes an `oklch()` string.
  > Fix
  - Still open: `ColorField` moved to its own pull request, outside 6.0.0. The site keeps `<oklch-input>`.
- [x] (2) Web components: copying text to the clipboard needs a script. The docs site's code blocks do it with their own listener, and the library has no copy button (`src/components/Code.astro:69`, `src/components/Code.astro:292-304`)
  - Summary: There is no copy button for invite links, codes or snippets, so each page writes its own.
  - Recommended: Fix. Custom commands keep the button a plain `Button`.
  - Fix: the button stays a `.ui-button` with `commandfor` and `command="--copy"`, since a wrapper would break `packages/opui/css/components/button-group.css:55` and `packages/opui/css/components/form.css:97`. Its target is an `<opui-copy>` around the text or field, which handles the `command` event: it copies the field's value or its own text with `navigator.clipboard.writeText()`, shows a copied state on the button for a moment and announces "Copied". Without the script `:not(:defined)` hides the button and the text can still be selected.
  > Fix
  - Fixed: `Copy` (`opui-copy.ui-copy`, `display: contents`) in Astro, React, Svelte and Vue, with `elements/copy.js` and `copy.css`. A `.ui-button` anywhere with `commandfor` set to the element's id and `command="--copy"` copies the value of the first `input` or `textarea` inside, or else the element's text without buttons and the live region, with `navigator.clipboard.writeText()`. The button gets `data-copied`, which sets its `--_accent` to `--ui-success` for two seconds, and the `<span class="ui-sr-only" role="status">` the component renders announces `copiedLabel` ("Copied"). Where the clipboard is blocked, the element selects the text instead. Until the element is defined, `.ui-copy:not(:defined)` hides a copy button inside it or after it among its siblings, so the cost is a descendant and a sibling selector; a button elsewhere stays visible, and the page says so. The page has Basics (a read-only field) and Snippet (an icon button inside), Usage pointing at Toast and Textarea, and keys; the parity snapshots are new and match in all five formats. Interaction tests in every framework stub the clipboard and check the copied text, the state and the announcement, and axe passes. `Code.astro` keeps its own copy button: it leaves the removed lines of a diff out of the copied text and `docs.spec.ts` checks it, so switching it isn't simple. The examples need visual baselines (`update-snapshots` label).
- [x] (2) Web components: there is no toast. A confirmation after an action, such as saving the account settings form, needs a script to show, stack and dismiss it (`src/blocks/account-settings.html:154-156`)
  - Summary: There is no toast, so a page can't confirm an action like a saved form without its own script.
  - Recommended: Fix. The top layer and invoker commands do most of the work, and the element adds the queue and the timing.
  - Fix: an `<opui-toaster>` region shown with `popover="manual"`, with a `show()` method and a `--toast` command for buttons. It stacks toasts, dismisses each after a delay that pauses on hover and focus, gives each a close button, and announces it through a polite live region that stays in the page. The severity colors come from `Callout`. Without the script nothing shows, so a page that must confirm without one renders a `Callout`.
  > Fix
  - Fixed: `Toaster` (`opui-toaster.ui-toaster`, `display: contents`) on a new Toast page, in Astro, React, Svelte and Vue, with `elements/toaster.js` and `toaster.css`. The component renders an `<ol popover="manual">` for the stack and a `<div class="ui-sr-only" role="status">` outside it, so the live region is in the page before the first toast. A button with `commandfor` set to the toaster's id and `command="--toast"` shows its `data-toast` text with `data-toast-severity`, and `show(message, { duration, severity })` does it from a script. Each toast is an `li.ui-callout` with the severity class and a close `Button` (`closeLabel`), the popover opens with the first toast at the block end and the inline end of the viewport and closes after the last, and toasts stay `duration` milliseconds (5000), paused while the pointer is over the stack or focus is in it, and close with their button or Esc. Checked in Chromium: Tab from the trigger reaches the close button, and under a modal dialog the toasts can't be focused. Interaction tests in every framework cover the button, the close button, Esc, the auto dismiss and the hover pause; the parity snapshots are new and axe passes. The Callout page's Usage points confirmations that go away by themselves here. The account settings block keeps its plain submit: a toast there would need a script that fakes the save. The examples need visual baselines (`update-snapshots` label).
- [x] (3) Checkbox: a select all checkbox needs a script. The Indeterminate example carries its own inline script, and the data-table block's Select all customers checkbox does nothing (`src/component-examples/checkbox/Indeterminate.html:26-28`, `src/blocks/data-table.html:162-167`)
  - Summary: Select all checkboxes do nothing in plain HTML unless the page writes its own script.
  - Recommended: Fix. It repairs the data-table block and replaces the example's inline script.
  - Fix: an `<opui-select-all>` around the group (the `fieldset` or the `table`), so no `.ui-checkbox` gets a wrapper. The checkbox marked `data-select-all` checks and unchecks the other checkboxes in it, is `indeterminate` while they're mixed, and follows form reset. It covers what `checkbox.js` does today, so `activateIndeterminate()` can move into it. Without the script the checkboxes are independent.
  > Fix
  - Fixed: `SelectAll` (`opui-select-all.ui-select-all`, `display: contents` from `select-all.css`) in Astro, React, Svelte and Vue, documented in a Select all subsection of the Checkbox page with its own API table. Around a group, the checkbox marked `data-select-all` checks and unchecks the other enabled checkboxes inside with `click()`, so their change handlers and bindings follow, and is checked when they all are and `indeterminate` when some are. It syncs after a form reset, in a microtask after connect, on attribute changes and when focus or the pointer comes in. The Indeterminate example uses it in all five formats instead of the inline script and the hand-written state (parity snapshot updated, intended), and the data-table block's Select all customers checkbox works because the table sits inside it. `css/js/checkbox.js` stays for a standalone `data-indeterminate`. The interaction test, now also unchecking all, passes in every framework, and axe passes on the Checkbox fixture and the block, whose visual baseline needs the `update-snapshots` label.
- [x] (3) Web components: the package ships no custom elements, only two init helpers, so behavior that HTML and CSS can't give a component has nowhere to live, and a page calls `initRange()` or `activateIndeterminate()` again after it adds markup (`packages/opui/css/js/checkbox.js:1-31`, `packages/opui/css/js/range.js:1-44`, `packages/opui/package.json:34-37`, `src/docs/guide/concepts.astro:431-501`)
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
  > Fix with option A
  - Fixed: option A. Custom elements live in `packages/opui/elements/`, one self-defining module each, exported as `opui-css/elements/*` and listed in `files` and `sideEffects`. A module extends `HTMLElement` only in the browser and defines its tag behind a `customElements.get()` check, so importing it on the server does nothing. Tags start with `opui-`, carry the component's `ui-` root class and render in the light DOM. The Astro component loads its element in a `<script>`, React with an `import()` in a `useEffect` (which also makes it a client component), and Svelte and Vue import it at the top; Vue renders the tag with `<component is>`, so it needs no `isCustomElement` setting, and `react/elements.ts` and `svelte/elements.ts` declare the tags. All five frameworks render the same markup, so no parity drift. The docs, fixture and block preview pages share one import map (`src/utils/import-map.ts`) that maps every element for HTML examples. Concepts has a Custom elements section, and the HTML getting started guide, the README, the CHANGELOG and the package tarball test list `elements/`. Two findings shape every element: the `command` event doesn't bubble, so an element listens for it with `capture: true`, and in Chromium a button inside a `<label>` joins the input's accessible name ("Password Show password"), so an element that adds buttons to a field uses a `<label for>` instead of a label root.
- [x] (3) Web components: the quantity fields have no number stepper. The shopping cart's Decrease and Increase buttons do nothing, since stepping a value needs a script, and the product page falls back to a bare number input (`src/blocks/shopping-cart.html:177-227`, `src/blocks/product-detail.html:306-318`)
  - Summary: The cart's quantity buttons do nothing when pressed, and there is no stepper component to build them with.
  - Recommended: Fix. It repairs the cart block, and the stepper is on the New components list under Suggestions.
  - Fix: an `<opui-number-stepper class="ui-number-stepper">` around a number `TextField` and two `.ui-button`s with `commandfor` naming the input and `command="--step-down"` or `command="--step-up"`. The element handles the `command` event: it calls `stepDown()` or `stepUp()`, fires `input` and `change`, disables a button at `min` or `max`, repeats while a button is held and follows form reset. The cart's input becomes `type="number"`. Without the script it is a plain number input with the browser's spin buttons, and `:not(:defined)` hides the two buttons. If browsers add built-in step commands for number inputs, the element is no longer needed.
  > Fix
  - Fixed: `NumberStepper` (`opui-number-stepper.ui-number-stepper`) in Astro, React, Svelte and Vue, styled by `text-field.css` (which lists the new root), `button.css` and `number-stepper.css`. Its buttons are `Button`s with `commandfor` naming the input and `command="--step-down"` or `command="--step-up"`. The element calls `stepDown()` or `stepUp()`, fires `input` and `change`, repeats after a 400ms hold, marks a button `aria-disabled="true"` at `min` or `max`, follows a form reset, and syncs again after a framework sets the value. Before it loads, `:not(:defined)` hides the buttons and the input keeps the browser's spin buttons. The page has a hero anatomy, Usage, Accessibility and keys, and seven examples in five formats with new parity snapshots. Interaction tests in every framework cover the buttons, the limits and the hold, and axe and the anatomy checks pass. The shopping cart and product page blocks use it now (the cart's inputs are `type="number"`), and the Text field Usage points amounts like a quantity here. The examples and the two blocks need new visual baselines (`update-snapshots` label).
- [ ] (2) Package: there is no pagination: the data-table block builds its page links from a button group by hand, with its own disabled Previous link and no gap between the page numbers (`src/blocks/data-table.html:565-595`)
  - Summary: Every page that lists many results has to build its own page links.
  - Recommended: Fix. It needs no script, and the data-table block already shows the markup.
  - Fix: a `.ui-pagination` class on a `nav` with a list of links, `aria-current="page"` on the current one, an ellipsis item between ranges and Previous and Next links that a missing `href` disables. A `Pagination` component in all five formats takes the current page, the page count and a function or template for the `href`.
- [ ] (2) Table: a table with thousands of rows renders and lays out every row, and the library has no data grid that virtualizes them, so the data-table block shows five rows and pages the rest (`src/blocks/data-table.html:565-567`)
  - Summary: Large tables get slow, since every row renders and lays out at once.
  - Recommended: Fix with option A. A class on table rows can't skip their layout, so it would promise speed it doesn't give.
  - Fix: add `.ui-lazy-rows`, which sets `content-visibility: auto` and `contain-intrinsic-size: auto <row size>` on the `tbody` rows, so the browser skips the layout and paint of rows out of view while find in page and the accessibility tree keep them. Document on the Table page that windowing a data set of tens of thousands of rows belongs to a data grid library, styled with the `.ui-table` classes.
  - Explained: The proposed CSS doesn't work: `content-visibility` needs layout and size containment, which don't apply to internal table boxes, so `tbody` rows in table layout are never skipped. Measured in Chromium with 20,000 rows: `content-visibility: auto` on `tr` left the table height and the relayout time unchanged (about 230 ms) and made the first layout far slower. Rows only skip once they leave table layout: as `display: grid` rows the height followed `contain-intrinsic-size` and a relayout took about half as long, but the table loses its column sizing and changes `display` on table elements, the Safari question the To check item about `.ui-overflow-scroll` asks.
  - Options:
    - A (recommended): Add no class. The Table page says to page a large data set, as the data-table block does, or to window it with a data grid library styled with the `.ui-table` classes.
    - B: Add `.ui-lazy-rows`: the table becomes a grid, each body row a `display: grid` row with `grid-template-columns: subgrid` and `content-visibility: auto; contain-intrinsic-size: auto <row size>`. It skips off-screen rows, but needs fixed or declared column widths and a VoiceOver check of the table roles, decided with the `.ui-overflow-scroll` To check item.
- [ ] (2) Web components: composite widgets have no shared arrow-key navigation: the Menu documents that the arrow keys do nothing, and the planned tree view and toolbars need the same roving focus, which each element would otherwise write on its own (`src/component-api/menu/api.ts:28-31`, `src/docs/components/menu.astro:174-178`, `packages/opui/react/elements.ts:8-12`)
  - Summary: Keyboard users Tab through every item of a menu instead of moving with the arrow keys, and each future widget would solve this on its own.
  - Recommended: Fix with option A. It follows the platform where it ships, keeps the markup working without the script and writes the key handling once.
  - Fix: A custom element can do it, the way `Toaster`, `SortableTable` and the password toggle already add behavior to working markup: in the light DOM, it keeps one item in the tab order (roving `tabindex`), moves with Up and Down (Left and Right in a horizontal group), Home and End, typeahead and wrap, and moves focus to the first item when its popover opens. Three things decide the design. First, the arrow keys and `role="menu"` with `menuitem` must arrive together: the role without the keys promises a pattern that doesn't work, and the keys without the role surprise a screen reader user in a list, which is why the open Menu item asks for a decision first. So the roles are added only where the keys work. Second, Chrome 150 ships the `focusgroup` attribute (detect it with `'focusgroup' in HTMLElement.prototype`): `focusgroup="menu"` gives the arrow keys and one tab stop that remembers the last item without a script, and infers `menu` and `menuitem` only on elements without their own semantics, so a `<menu>`, which is a list, keeps its list role. It has no spec text yet (whatwg/html#11723), and testers found gaps such as `focusgroup="none"`, so e2e tests check it before the docs rely on it. Third, React, Svelte and Vue render the attribute as a plain string, but their types need `focusgroup` next to `commandfor` in `react/elements.ts`, `svelte/elements.ts` and `env.d.ts`, and the element only sets attributes (`tabindex`, `role`) on nodes a framework renders, never adds or moves nodes, so hydration stays intact. A combobox or listbox keeps focus in its input and moves `aria-activedescendant` instead, so it can share the key handling but not the roving `tabindex`. Tests: interaction tests in every framework in Chromium (native `focusgroup`) and in Firefox and WebKit (the element), and accessibility tree checks with and without the script.
  - Options:
    - A (recommended): the markup carries the standard `focusgroup` attribute, and one shared module in `elements/` gives `<opui-menu>`, and later the tree view and toolbars, the same keys where the browser lacks it. Where the browser has it, the element only adds the roles. Without the script the markup stays a list of buttons that Tab moves through.
    - B: only the `focusgroup` attribute, no script: Chrome 150 gets the arrow keys and Firefox and Safari keep Tab, following the feature-first policy. The `<menu>` keeps its list role in every browser, so Chrome users get arrow keys in a list.
    - C: one element per widget (`<opui-menu>`, `<opui-tree>`), each with its own key handling and no `focusgroup`.
- [ ] (2) Tokens: there is no Figma component kit. The Figma files, the plugin and `sync.js` carry variables, effect styles and text styles, but no components, so a designer draws buttons, fields and cards again (`packages/opui/figma/sync.js:1-331`, `src/utils/figma-tokens.ts:454`)
  - Summary: Designers get opui's variables and styles in Figma, but no ready-made components.
  - Recommended: Fix with option B. The plugin runs it without Figma MCP calls, which the Starter plan caps at six a month.
  - Options:
    - A: build the kit with the Figma MCP server's `use_figma` and `/figma-generate-library` from the `api.ts` props and slots (enum props as variant properties, booleans as boolean properties, slots as text or instance swap properties), starting with Button, TextField, Select, Checkbox, Radio, Switch, Card, Dialog, Tabs and Callout. It takes a Professional plan with a Full seat.
    - B (recommended): a component script next to `sync.js` that builds the same components from the `api.ts` data with the synced variables bound, run by the plugin, with one `use_figma` run and a screenshot per component to check it.
    - C: wait until someone asks for components.
- [ ] (3) Web components: there is no combobox: a search field can't suggest or filter options as the user types, so the app shell's search is a plain input and a long Select has no filter (`src/blocks/app-shell.html:94-100`)
  - Summary: Users can't filter a long list of options by typing, and search fields offer no suggestions.
  - Recommended: Fix. A combobox is the most requested control the library lacks, and `<datalist>` gives a fallback without the script.
  - Fix: an `<opui-combobox>` in the light DOM around a `.ui-text-field` input and a `.ui-list` listbox popover anchored to the field. It filters the options as the user types, moves through them with the arrow keys through `aria-activedescendant`, selects with Enter and closes with Escape, and sets `role="combobox"`, `aria-expanded` and `aria-controls` only once it is defined. Without the script the input keeps a `list` pointing at a `<datalist>` with the same options. Add `Combobox` in all five formats.
- [ ] (3) Web components: there is no date picker: the analytics dashboard offers only fixed ranges as toggle buttons, and a custom date or range needs a calendar that a script draws (`src/blocks/analytics-dashboard.html:59-75`)
  - Summary: Users can only pick preset ranges, never a date or a custom range, outside the browser's own date input.
  - Recommended: Fix. A styled native date input covers single dates, and the element adds the range calendar.
  - Fix: style `input[type="date"]` in `.ui-text-field` first. Then an `<opui-calendar>` that renders a month grid with `Intl.DateTimeFormat` in the page's `lang` (week start from `Intl.Locale` `getWeekInfo()`), moves by day with the arrow keys and by month with Page Up and Page Down, and selects a single date or a range into named form inputs. A `DatePicker` puts it in a popover anchored to a text field. Without the script the native date inputs remain.
  - Explained: The first step is done: `TextField` already styles the native date and time inputs (`packages/opui/css/components/text-field.css:95-99`), and the Text field page shows Date and Datetime local in its Input types section (`src/component-examples/text-field/InputTypes.astro:16-17`). What's left is the range calendar: an `<opui-calendar>` with the month grid, the keys and range selection, in a popover anchored to a text field.

## Limitations

- [x] (1) Package: every Vite 8 build (Vite, Astro, SvelteKit, Nuxt) that imports `css/imports.css` or `dist/opui.css` prints 34 lightningcss warnings per CSS bundle, 68 with a server build, such as "'scroll-button' is not recognized as a valid pseudo-element", for `::scroll-button()`, `::scroll-marker`, `::scroll-marker-group` and `:target-current` in the Carousel CSS, also when the page has no Carousel. The rules stay in the output (`packages/opui/css/components/carousel.css:139-393`)
  - Summary: Builds print a few dozen CSS warnings about the Carousel, even in projects that don't use it.
  - Recommended: Fix. One README line tells users the warnings are harmless.
  - Fix: say in the README that lightningcss doesn't know these selectors yet and keeps them, and report them to lightningcss if no issue exists.
  > Fix
  - Fixed: the README's section on builds that rewrite `light-dark()` says Vite 8's lightningcss warns about the Carousel's `::scroll-button()`, `::scroll-marker`, `::scroll-marker-group` and `:target-current`, keeps the rules, and stops once it knows them. No new upstream issue was needed: parcel-bundler/lightningcss#1177, #1072 and #1184 track the selectors, #1321 is an open pull request that adds the three pseudo-elements, which the README links, and `:target-current` support merged in #1185 but still warns in lightningcss 1.33.0.
- [ ] (1) Select: in `vite dev` and `nuxi dev`, the Vue compiler warns "`<button>` cannot be child of `<select>`" and "`<div>` cannot be child of `<select>`" for the customizable select markup, also when the page has no Select, because its HTML nesting rules predate customizable select. Production builds don't warn (`packages/opui/components/Select/Select.vue:124-127`)
  - Summary: Vue projects print two warnings about the Select markup while the dev server runs.
  - Recommended: Fix. Post the drafted comment on vuejs/core#13608; the fix belongs upstream.
  - Fix: report it to Vue (core, the compiler's `isValidHTMLNesting`) if no issue exists, and link it here.
  > help me draft an issue and where that issue should be drafted.
  - Still open: The place is vuejs/core, and it's already reported, so the draft is a comment rather than a new issue: vuejs/core#13608 (open since July 2025) is about exactly these warnings for `button` and `div` in `select`, #13778 and #13158 cover customizable select, and the pull requests that widen `onlyValidChildren.select`, #13720 and #13616, are open (#14975 was closed unmerged in June 2026). Vue 3.5.45, the latest release, still allows only `optgroup`, `option` and `hr`. The comment, with a minimal template, the two warnings, the spec's content model and a nudge on #13720, came with this batch's report. Left: posting it on #13608 with a thumbs up on #13720, which is yours to do, and removing this item once a Vue release widens the rule.
  - Still open: `opui-css/vue` and the deep `opui-css/components/*.vue` imports now resolve to compiled JavaScript, so an app that uses the package no longer compiles the Select template and prints neither warning in `vite dev` or `nuxi dev`. Only this repo's own dev server, which compiles the sources, still warns, so the comment on vuejs/core#13608 is still the fix. `scripts/build-frameworks.mjs` (`KNOWN_VUE_WARNINGS`) lets the package build pass on these two warnings and fails on any other.
  - Explained: Nothing to change in the repo: the fix is upstream. This batch's Select changes moved the cited markup: the `<button>`, `<selectedcontent>` and `.ui-list` lines are now `packages/opui/components/Select/Select.vue:123-126`.
- [x] (1) Table: `.ui-sticky-header` together with `.ui-overflow-scroll` never sticks to the page: `.ui-overflow-scroll` makes the table itself the scroll container, so the sticky `thead` is held by the table's own scrollport, which doesn't scroll in the block axis, while the page says to put the table in a scroll box or let it stick to the page (`packages/opui/css/components/table.css:152-156`, `packages/opui/css/components/table.css:167-175`, `src/docs/components/table.astro:240-254`)
  - Summary: A wide table that scrolls sideways loses its sticky header as soon as the page scrolls.
  - Recommended: Fix with option A. The sticky header example already wraps the table in a scroll box, so the pattern exists.
  - Fix: confirm on a tall page with `<table class="ui-table ui-overflow-scroll ui-sticky-header">`: the header scrolls away with the rows.
  - Options:
    - A (recommended): say under Sticky header that a table that scrolls sideways goes in a scroll box (`role="region"`, `aria-label`, `tabindex="0"`, as in the StickyHeader example) instead of `.ui-overflow-scroll`, so the header sticks to the box.
    - B: leave it undocumented.
  > Fix with option A
  - Fixed: with option A: the Sticky header section says `overflow="scroll"` (`.ui-overflow-scroll`) makes the table its own scroll container, so for a wide table with a sticky header leave it off and put the table in a scroll box like the StickyHeader example, which scrolls both ways.
- [x] (1) Tooling: vitest's module cache in `node_modules/.vitest-cache` keeps a compiled `.vue` component while its own text is unchanged, so a change to the `types.vue-props.ts` it imports, which decides the props Vue declares, leaves the old props in local runs: after dff0dda9 the Vue Carousel and AvatarGroup parity tests still failed locally until the cache was deleted (`vitest.config.ts:1-9`, `packages/opui/components/Carousel/types.vue-props.ts:4`)
  - Summary: Local unit tests can keep failing on a Vue component after its props type is fixed, until the test cache is cleared.
  - Recommended: Fix with option A. A local run that tests stale code costs more time than the cache saves.
  - Fix: until it's fixed, `rm -rf node_modules/.vitest-cache` clears it.
  - Options:
    - A (recommended): turn the module cache off in `vitest.config.ts`.
    - B: keep it and key it on the files a `.vue` file's `defineProps` type reads.
  > Fix with option A
  - Fixed: with option A: `vitest.config.ts` sets `fsModuleCache: false`, so every run compiles the components from their current files. With it, removing `name` from `Select/types.vue-props.ts` fails the Vue `select/Binding` parity test on the next run without deleting a cache. It also covers a change to a Vite plugin option in `astro.config.mjs`, which `vitest.config.ts` loads through `getViteConfig` and which the cache key didn't include either.
- [ ] (1) ControlGroup: the group lines its controls up at the bottom, so a field with end text (help or an error) under it sits higher than the buttons next to it. The docs ask for help and error text after the group instead (`packages/opui/css/components/control-group.css:8`, `src/docs/components/control-group.astro:209-217`)
  - Summary: A field's help or error text inside a control group lifts that field above the buttons beside it.
  - Recommended: Explain further. Lining the boxes up whatever text a field has needs subgrid rows, and a grid can't give the free space to the text fields alone the way flexbox does.
  - Fix: line the rows up with `grid-template-rows: subgrid` on the controls, once a grid can give the free space to the text fields alone.
  - Explained: Measured in Chromium: a field with one line of end text sits 22px above the button beside it. No layout lines the boxes up today: `align-items: last baseline` takes the end text's baseline, an end text taken out of flow needs the group to reserve space of unknown height, and a grid that flows by column can't wrap or give the free space to the text fields alone. The Labels section already puts help and error text after the group. The `align-items: end` citation is now `packages/opui/css/components/control-group.css:26`.
- [ ] (1) ControlGroup: in a group that isn't outlined and has a field, in forced colors, in a tonal or filled group of a theme that sets `--ui-control-border-color-filled`, and in browsers without gap decorations, the line between two controls is the later button's start border, so a button that wraps to a new row starts with a line. A group of buttons draws its lines with `column-rule`, which the browser leaves out at a row start (`packages/opui/css/components/control-group.css:306-316`, `packages/opui/css/compat/control-group.css:15-20`)
  - Summary: A button that wraps onto a new row of a control group with a field starts with a divider line.
  - Recommended: Explain further. What is left needs a rule that stops at the controls' height, which flex gap decorations can't do.
  - Tried: a rule only for buttons after a button, through `.ui-button + *` and `.ui-button + :is([hidden], [popover]) + *`, which saw through one child that doesn't render and lost the line behind two (a menu and a tooltip).
  - Still open: a group whose fields show no label or help text, with no textarea beside its buttons, now draws the lines between its buttons as rules, so a button that wraps after a field starts its row without a line. A field after another control starts `--_divider-gap` earlier and covers the rule, so a field that wraps starts its row one border width before the rows above, as a field at a row end already reaches one border width past it. Forced colors and a theme that sets `--ui-control-border-color-filled` give every button its own border, so a wrapped button starts with its own edge there. Left: a field whose label or help text shows, or a textarea beside the buttons, keeps the start border, since a rule runs the full height of the row and would show above the shorter controls, and browsers without gap decorations (`css/compat/control-group.css`).
  - Explained: Nothing changes for wrapped rows. The forced-colors start border moved onto each button with the start-border item (`--_start-border-color: ButtonBorder`, and `SelectedItem` on the current page), so a wrapped button in forced colors still starts with its own edge. The citations are now `packages/opui/css/components/control-group.css:316-340` and `packages/opui/css/compat/control-group.css:15-24`.
- [ ] (2) Tooling: on the first request after `astro dev` starts, Astro's CSS collector (`ensureModulesLoaded` in `astro/dist/vite-plugin-css/index.js`) compiles every module the page's graph reaches, dynamic imports included, and follows the edge Vite adds from a `?raw` import to its file. `opui-raw-without-module-edge` drops that edge, but the component and Learn routes still reach every docs page and every example in every framework, so their first request compiles about 3,000 modules (`astro.config.mjs:113-134`, `src/utils/examples.ts:8-17`)
  - Summary: The first component or Learn page after the dev server starts takes about 9 seconds, while later pages load almost at once.
  - Recommended: Fix with option A. The draft is ready, and posting it is the last step.
  - Fix: `collectCSSWithOrder` in the same file already stops at `?raw`, so `ensureModulesLoaded` should too.
  - Options:
    - A (recommended): report it to Astro, and remove `opui-raw-without-module-edge` once a release skips `?raw` in `ensureModulesLoaded`.
    - B: also give each component page its own route and let each docs page glob only its own examples, so the first request compiles one component's modules.
  > Fix with option A
  > Help me draft a report issue to Astro.
  - Still open: the report to Astro is drafted but not posted, and `opui-raw-without-module-edge` stays until a release skips `?raw`. Checked on Astro 7.4.5, the latest release (the repo has 7.3.6): `ensureModulesLoaded` still follows `?raw`, and no Astro issue or pull request mentions it. The draft follows Astro's bug report form, with a three-file repro (a page that globs three components as `?raw` compiles all three on the first request) and the one-line fix, `if (rawRE.test(imp.id)) continue`, which leaves nothing compiled and takes a 300-example page from 2.0s to 0.6s. Measured here, the edge costs 2.8s on `/blog/release-6/` (11.5s without the plugin, 8.7s with it) and little on `/html/components/button/` (11.7s and 11.1s), which imports the examples anyway; that remaining cost is option B's. To post it, open a bug report at github.com/withastro/astro with the draft and a StackBlitz made from astro.new/minimal plus the three files. `tests/unit/tooling-bugs.test.ts` now fails once a release skips `?raw` in `ensureModulesLoaded`, the cue to remove the plugin.
  > Fix with option A
  - Still open: Re-drafted with this batch, since the earlier draft lived only in that report: a bug report for withastro/astro with the title, a three-file repro, the one-line fix (`if (rawRE.test(imp.id)) continue` in `ensureModulesLoaded`, matching `collectCSSWithOrder`) and the workaround, ready to post with a StackBlitz from astro.new/minimal. Posting it is yours; `tests/unit/tooling-bugs.test.ts` fails once a release skips `?raw` in `ensureModulesLoaded`, the cue to remove `opui-raw-without-module-edge`.
  > where can i find the draft and all the text i need?
  - Explained: On the `/todo` page, as this item's example (`OPUI_TEST_PAGES=1 pnpm dev`, then Example under this item). It has the Astro bug report field by field, each with a Copy button: the title, Astro Info, Describe the Bug, What's the expected result?, and the page and component files for the StackBlitz, with where to open the issue (github.com/withastro/astro, New issue, Bug report) and how to build the StackBlitz from astro.new/minimal. Before, the draft only lived in a session's report. The Vue comment for the Select item is on the page the same way, as that item's `vue-select-comment` example. Both were checked again against the latest releases, Astro 7.4.5 and Vue 3.5.45. Example: astro-raw-issue
  - Explained: Still open on the latest release. Astro 7.4.9 is out (the repo has 7.4.5) and moved `ensureModulesLoaded` into `@astrojs/vite-plugin-astro` 0.1.0 (`dist/internal/vite-plugin-css/collect.js`), which still descends into `?raw` modules, while `collectCSSWithOrder` next to it returns at `?raw`. The draft's one-line fix goes in that file now. When the repo updates, the repro in `tests/unit/tooling-bugs.test.ts` has to read that file instead of `astro/dist/vite-plugin-css/index.js`, which no longer has the function, or it stops testing anything.
- [x] (2) CSS: in a build that rewrites `light-dark()` for older browsers (the defaults of Vite 8 and Next 16), `.ui-light` or `.ui-dark` on an element inside the page and the `--ui-color-scheme` knob don't switch the colors. The color tokens are declared on `html`, where the rewritten `var(--lightningcss-light, …) var(--lightningcss-dark, …)` resolves to the page's scheme, and a part of the page inherits that result, while `light-dark()` itself resolves where the color is used. The classes on `html` and the OS setting work, and the README gives the build settings that keep `light-dark()` (`packages/opui/css/theme.css:3-13`, `packages/opui/css/theme.css:207`)
  - Summary: In some bundler builds, a light or dark section inside the page keeps the page's colors unless the build keeps light-dark().
  - Recommended: Fix with option B. Option A changes the scope selector every theme uses, in native builds too, to work around a lowered build the README already shows how to avoid.
  - Options:
    - A: derive the color tokens again on `.ui-light` and `.ui-dark`, like on `.ui-palette` (add them to the derived tokens' selector), so a lowered build resolves them on the part. A theme's token overrides on `html` then stop at those parts, as they already do at `.ui-palette`.
    - B: keep it as the README documents it.
  > Explain further
  - Explained: lightningcss turns each `light-dark(a, b)` into `var(--lightningcss-light, a) var(--lightningcss-dark, b)` and each plain `color-scheme: light` or `dark` into the two toggles, so `.ui-dark` on a part does set the toggles there, but `color-scheme: var(--ui-color-scheme)` isn't plain, so the knob alone does nothing. The 34 color tokens in the derived block, and `--ui-shadow-color` among the knobs, are declared on `html`, where the `var()` is substituted at computed-value time, and a part inherits the resolved color; the 24 `light-dark()` in the component stylesheets resolve on the element and follow the part. Option A adds `.ui-dark` and `.ui-light` to `:where(html, .ui-palette, .ui-contrast-more)`, but that is also the selector the example themes and the theming guide use for overrides in `theme.custom`: a theme that sets `--ui-surface` there would stop at every `.ui-dark` part unless it lists the two classes too, in native builds as well. It trades a documented build setting for a change to the documented scope list, and the knob on a part still needs `light-dark()` itself.
  > Fix with option B
  - Fixed: Kept as documented, with no change: the README's Builds that rewrite `light-dark()` section and the theming guide, which links it, give the build settings that keep `light-dark()`, which `.ui-light` or `.ui-dark` on a part of the page and the `--ui-color-scheme` knob need.

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
- [x] (1) Menu: the Menu and Anchor examples put `div` and `p` inside `button` and a `div` card inside `span.ui-floating`, which HTML validators flag. Browsers render it fine, and it mirrors the components' own output (`src/component-examples/menu/Basics.html:12-18`)
  - Summary: Validators flag the Menu and Anchor markup, though browsers render it fine.
  - Recommended: Remove issue. It mirrors the components' output and renders correctly, so treat it as the convention.
  - Options:
    - A (recommended): keep the markup as the convention
    - B: switch to `span`s inside the clickable row and `div` for `.ui-anchor` and `.ui-floating` library-wide, in four frameworks, `list.css` and the parity snapshots
  > Remove issue
  - Removed: the markup mirrors the components' own output and renders correctly, so it stays the convention.
- [x] (1) Spinner: every busy element except a `dialog` or `[popover]` gets `position: relative`, but the spinner `::before` is `display: inline-block` and never positioned, so the declaration only changes the containing block of any absolutely positioned descendant of a busy `section`, `form` or `tr` (`packages/opui/css/components/spinner.css:14-16`)
  - Summary: Marking a region busy can move its absolutely positioned children, with no visible gain for the spinner.
  - Recommended: Fix with option A. Nothing reads the containing block, and the example shows what the rule breaks.
  - Options:
    - A (recommended): delete the `&:not(dialog, [popover]) { position: relative; }` block.
    - B: keep it and name in a comment what needs it, if a fixture breaks without it.
  > Explain further and provide an example
  - Explained: The spinner is an inline-block `::before` in the flow, so it never reads the containing block, and nothing else in the package does either; the rule only changes where an absolutely positioned descendant of a busy element lands. In the example a link card's header is busy while its release loads, and the card link's stretched `::after` covers only the header instead of the whole card until `aria-busy` goes away (318 by 105px of a 320 by 195px card); an absolutely positioned badge or button inside a busy `section`, `form` or `tr` moves the same way. No test or example depends on the rule. Example: spinner-position
  - Fixed: with option A: the `position: relative` block is gone from `spinner.css`.
- [x] (1) Progress: the track outline reads `--ui-field-border-color`, the role for a control that holds a value the user edits, although a progress bar is neither a field nor a control; `--ui-border-color` is the role for a border on anything else, and the two diverge under more contrast (`packages/opui/css/components/progress.css:15`)
  - Summary: Progress bars get the heavier field border in high contrast instead of the border other non-control boxes get.
  - Recommended: Fix. One token swap, and it matches the naming model in the components guide.
  - Fix:
    ```css
    outline: var(--ui-border-width) solid var(--ui-border-color);
    ```
  > Fix
  - Fixed: in the guide rather than the CSS, since the swap would weaken what the outline is for: the tonal track is about 1.1:1 against the page, so the outline is the only edge that shows how far the bar can go, and it needs the 3:1 that `--ui-field-border-color` promises, while `--ui-border-color` is a 17% mix, under 2:1. The Range track and the Stepper markers read the field border for the same reason. The roles list in `packages/opui/components/AGENTS.md` now names `--ui-field-border-color` for a field's border and for any other edge that needs 3:1 to show an extent or a state, the Progress track and a Stepper marker.
- [x] (1) Switch: an invalid switch draws a `--ui-focus-ring-width` halo in `--ui-invalid` around the track and pushes the focus ring out by that width, while Checkbox and Radio color their border and TextField its field border; the track already has `--_track-border-color`, which the validation block leaves at the field border color (`packages/opui/css/components/switch.css:155-166`, `packages/opui/css/components/checkbox.css:56-61`)
  - Summary: An invalid switch gets a red halo instead of a red track border like the other choice controls.
  - Recommended: Fix with option A. It reads the hook the track already has and matches Checkbox, Radio and TextField.
  - Fix: if the border is preferred, set `--_track-border-color: var(--ui-invalid)` in the validation block and drop the box shadow and the `outline-offset` adjustment; `choice.css:139-145` already turns `--_accent` red for the checked track.
  > Explain further
  > i don't like that red halo, suggest improvments
  - Explained: The halo is a 2px `box-shadow` in `--ui-invalid` around the input, the width of the focus ring, with the focus ring pushed out by the same width so the two don't touch, and forced colors drop box shadows, which is why the forced-colors item exists. Checkbox and Radio show invalid by coloring their box border, TextField its field border, and the switch track already reads `--_track-border-color`, which the validation block leaves at the field border color; `choice.css` already fills the on track red through `--_accent`. The example shows today's halo next to two ways without it: A, a red track border at the field border width, which looks like the invalid checkbox beside it but reads faintly on the dark-mode gray track, and B, the same at the thick border width. Both drop the `outline-offset` push; in forced colors the cue then comes from the forced-colors item's fix. Example: switch-invalid
  - Options:
    - A (recommended): In the validation block set `--_track-border-color: var(--ui-invalid)` and drop the `box-shadow` and the `outline-offset` rule, so an invalid switch looks like an invalid checkbox.
    - B: As A, and give the invalid track `border-width: var(--ui-border-width-thick)`, for a stronger cue on the gray track.
  - Fixed: with option A: the validation block sets `--_track-border-color: var(--ui-invalid)` and the halo and its `outline-offset` push are gone, so an invalid switch looks like an invalid checkbox (checked in Chromium); forced colors keep the dashed track border. A Changed entry and a What's new note say so, since 5.4.3 drew a ring.
- [x] (1) Checkbox: a checked `.ui-card` fills with `--ui-primary-tonal`, or a primary tint, instead of the `--ui-selected` role that ToggleButton, Chip and List read for a selected fill, and that m3 and shadcn set to their tonal surface (`packages/opui/css/components/choice.css:220-225`, `packages/opui/css/components/toggle-button.css:9`, `packages/opui/css/components/chip.css:16`, `packages/opui/themes/m3.css:83`, `packages/opui/themes/shadcn.css:70`)
  - Summary: A theme that recolors selected items doesn't recolor a checked choice card.
  - Recommended: Fix with option B. bootstrap and brutalist set `--ui-selected` to the solid primary, which would turn the card into a filled block under label-colored text, so the card needs the `--ui-on-selected` pair or a tint of its own.
  - Options:
    - A: read the pair like ToggleButton: `--_checked-bg-color: var(--ui-selected, ...)` and the label and description colors from `--ui-on-selected` while checked.
    - B (recommended): keep the tint, and say in the custom property description that the card is a tinted surface rather than a selected fill, so `--ui-primary-tonal` is its theme hook.
  > think extra hard on this and what solution is the most future proof, robust and in line with the library.
  - Fixed: with neither option, after weighing both against the model: the card's fill derives from the control's own accent, `--_selected-bg-color: oklch(from var(--_accent) l c h / var(--ui-state-selected-alpha-accent))`. Not `--ui-selected` (option A): that hook is the fill of an item whose fill is its only selection cue, a toggle button, a pressed chip or a list option; a choice card carries its own checked mark, and bootstrap and brutalist set the hook to the solid primary, which would bury the checked checkbox under its own color and force the label, description, end text and control inside to invert. Not `--ui-primary-tonal` (option B, today): that is the tonal button fill (shadcn's gray `secondary`), and it stays primary when `--ui-choice-accent` or `--ui-control-accent` gives the mark and the border another color, so the tint could disagree with its own border. Reading `--_accent` makes the mark, the border and the tint one color in every theme, red when invalid, keeps the more-contrast alpha that holds the label at 7:1, and adds no token; a theme tunes it with `--ui-choice-accent` and `--ui-state-selected-alpha-accent`. m3 and shadcn cards move from their tonal surfaces to a tint of their accent, and `custom-properties/choice.ts`, the token descriptions and the card's Added entry say so.
- [x] (1) OneTimeCode: the three box masks fix `rx='8'` and `stroke-width` 2 and 4 inside the SVG data URIs, so the boxes keep an 8px radius and 2px lines whatever `--ui-field-radius`, `--ui-radius` and `--ui-field-border-width` a theme sets (brutalist is 5px, m3 12px) (`packages/opui/css/components/one-time-code.css:3-4`, `packages/opui/css/components/one-time-code.css:15`)
  - Summary: One-time code boxes keep their own corner radius and line thickness in a theme that changes them.
  - Recommended: Fix with option C. The gradient layers follow the field radius and border width without new markup.
  - Options:
    - A: draw one box per cell with a CSS `mask` built from the `--_box-image` for the stroke and a `border-radius` on a real element instead of the data URI, so the boxes follow the theme.
    - B: keep the data URIs and note on the page that the box radius and stroke are set through `--_box-image`.
    - C (recommended): replace the three SVG masks with the gradient mask layers of the `one-time-code-radius` example, sized by `--ui-field-radius` (else `--ui-radius`) and `--ui-field-border-width`, and draw the slot box as a real border with that radius.
  > Explain further
  > they should use the field corner radius ideally.
  - Explained: The boxes are one `::before` per field, masked by an SVG data URI repeated once per cell, and a data URI can't read a custom property, so its `rx='8'` and clipped stroke (1px visible, 2px with focus) stay put whatever the theme sets: m3's field radius is 4px, brutalist's radius 5px with 2px borders. Today's CSS can draw the same row from the field tokens without new markup: gradient mask layers sized by `--ui-field-radius` (else `--ui-radius`) and `--ui-field-border-width`, per cell a linear gradient for the top edge, one for the bottom and one for both sides, and the four corner arcs as radial-gradient rings cut to the corners by two more gradients with `mask-composite: intersect`, nine layers repeated along the row like the SVG. The radius has to be capped at a quarter of the cell, a third of the box, or a ring reaches into the next corner; in the default cell sizes that still allows 10px. The slot behind the next empty cell is a single box, so it can be a real border with that radius and no mask at all. `corner-shape` doesn't help, since it shapes the corners of a real border and the boxes have none, and one element per character would follow the theme with plain borders but adds markup in five formats. The example draws the prototype next to today's boxes under m3, brutalist and a 16px field radius, with the focus state; at 2x it shows faint dots at the arc centers in Chromium, which a real fix would have to track down. Example: one-time-code-radius
  > Explain further
  - Explained: The faint dots were the corner rings reaching into the opposite corner. Each ring is a radial gradient around its arc center, and at the cap, a quarter of the cell, the box's width minus both radii equals the radius, so the top-left ring passes exactly through the inner corner of the top-right corner square, where the anti-aliased edges of the two corner bands let a sliver through: a tick at every arc center, and only when a theme's radius reaches the cap (the 16px row; m3 and brutalist never did). A cap half a pixel lower removes them. That showed a second artifact: Chromium snaps a mask layer's position to whole pixels, so the side edges, a separate layer that starts at the radius, began up to half a pixel late and left a notch under each top corner. Starting them 1px inside the corners fixes it, since the arc is still vertical within that pixel. With both changes the boxes render clean in Chromium at 1x, 2x and 3x and in WebKit, from a 0 to a 16px radius, with 1 and 2px borders and fractional cell sizes, so option A's box per cell isn't needed: the gradient layers follow `--ui-field-radius` (else `--ui-radius`) and `--ui-field-border-width` without new markup. The cost is nine mask layers instead of one SVG per state, a radius capped half a pixel under a quarter of the cell (11.5px at the default 48px cell), and arcs whose edges fade over a pixel. The slot box behind the next empty cell becomes a real border with the same radius. The example has both changes. Example: one-time-code-radius
  > Fix with option C
  - Fixed: Option C. `one-time-code.css` draws the boxes with the gradient mask layers of the `one-time-code-radius` example in place of the three SVG data URIs: per cell a linear gradient for the top and bottom edges, one for the sides starting 1px inside the corners, and four radial-gradient rings cut to the corners, sized by `--_box-radius` (`--ui-field-radius`, else `--ui-radius`, capped half a pixel under a quarter of the cell) and `--_box-border-width` (`--ui-field-border-width`, doubled while the field has focus). The ring on the next empty box is a real border with the same radius and a 12% accent fill, and in forced colors its border turns Highlight with no fill. `--_box-image`, `--_box-focus-image` and `--_slot-image` give way to `--_box-border-width`, `--_box-feather` (the 0.5px the edges fade over, which also sets the cap and the side edges' 1px overlap), `--_box-radius`, `--_box-start` and `--_box-end` in the custom properties table, the Under the hood text describes the layers, the `ios-one-time-code` todo example no longer resets the old mask, and the OneTimeCode CHANGELOG entry names the tokens. Checked in Chromium at 2x with the default tokens, a 4px, 5px with 2px borders, 16px and 0 radius, unfocused and focused.
- [x] (1) Typography: the `marker` chip shows Safari as unsupported, because web-features' `marker` takes Safari's `::marker` as partial (only color and font properties apply), but the only `::marker` rule in `typography.css` sets `font-variant-numeric: tabular-nums` on `li::marker`, a font property Safari does apply; web-features has no narrower id (`packages/opui/css/components/typography.css:595-597`, `src/docs/components/typography.astro:29-44`)
  - Summary: The Typography page marks Safari as missing `::marker` although the one marker rule works there.
  - Recommended: Fix with option B. The rule works in Safari, and Accordion already ignores the same id.
  - Fix: check `/html/components/typography/` (ordered lists) in Safari for tabular numbers first.
  - Options:
    - A: keep the chip and accept the overstatement.
    - B: add `typography: ["marker"]` to `ignore` in `scripts/check-browser-support.mjs:354` and drop the id from the page, as Accordion does for its hidden marker.
  > Explain further and provide an example
  - Explained: The chip comes from the compat data: web-features' `marker` follows BCD's `css.selectors.marker`, which marks Safari partial with the note "Safari support is limited to `color` and `font-size`", and a partial engine shows as unsupported. That note is out of date: WebKit's list of properties that apply to `::marker` (`Source/WebCore/style/PropertyAllowlist.cpp`) has every font property, `font-variant-numeric` among them, and on the main branch `content` too. Typography's one marker rule sets `font-variant-numeric: tabular-nums` on rich text `ol` markers, and it only lines up the digits, so an engine that ignored it would still number the list. Accordion already drops the same id through `ignore` in `scripts/check-browser-support.mjs`. The example shows two lists starting at 8, with and without the rule, readouts of the marker's computed values, and a `content` test; it needs a look in Safari, since no WebKit runs here. A BCD pull request that drops the stale note would correct the chip upstream. Example: typography-marker-safari
  - Fixed: with option B: `typography: ["marker"]` is in `ignore` in `scripts/check-browser-support.mjs`, the page no longer lists `marker`, and the Accordion entry there is gone, since `accordion.css` no longer uses `::marker`.
- [x] (1) TextField: the file button of a drop zone sits at the start of the dashed area, because Chromium sets `text-align: start !important` on file inputs (`packages/opui/css/components/text-field.css:230-249`)
  - Summary: The file button in a drop zone sits at the start of the dashed area instead of in the middle.
  - Recommended: Fix with option A. The native control keeps showing the chosen files without a script.
  - Options:
    - A (recommended): keep the native control at the start.
    - B: lay the native input over the whole area with `opacity: 0`, show a centered icon and text in the field, and list the chosen files with a script.
  > Fix with option A
  - Fixed: Kept the native control at the start. The Drop zone section of the Text field page now says the browser's file button and the names of the chosen files stay at its start, so the field shows what was picked without a script.
- [x] (2) Dialog, Drawer: the scroll lock's `scrollbar-gutter: stable` leaves an undimmed strip at the inline end under the modal backdrop (10px in headless Chromium, 15 to 17px with classic Windows scrollbars), and block and inline-end drawers stop short of it, because `inline-size: 100dvi` is capped by `max-inline-size: 100%` (`packages/opui/core/utils.css:43-50`, `packages/opui/css/components/drawer.css:32`, `packages/opui/css/components/drawer.css:100`)
  - Summary: An open modal leaves a bright strip at the right edge of the dimmed page, and full-width drawers stop short of it.
  - Recommended: Fix with option A. It keeps the page from shifting and the strip matches the backdrop, which C was meant to do.
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
  > Fix with option C
  - Still open: option C can't be built. Measured in headless Chromium (800px window, 15px gutter): a backdrop with `inset-inline-end: calc(-1 * (100dvi - 100%))` computes to 800px wide, but the gutter pixels stay the page color, and a bottom drawer with `inline-size: 100dvi` and no `max-inline-size` doesn't paint there either. Browsers never paint fixed or top-layer content over the scrollbar area, and a stable gutter is part of it. Only the root's `background-color` reaches the gutter; a root `background-image` doesn't.
  - Options:
    - A (recommended): while a modal is open, set the `html` `background-color` to the backdrop color over `--ui-surface` and paint `--ui-surface` back over the page with a `background-image`, which doesn't reach the gutter. The strip matches the default 50% backdrop and comes close for a theme with another alpha. A block or inline-end drawer still stops short of the gutter.
    - B: drop `stable`, so the backdrop covers the edge and the page shifts by the scrollbar's width when a modal opens.
    - C: keep the strip.
  - Explained: the example builds option A: while one of its modals is open, `html` gets the backdrop composited over the surface as its `background-color`, `color-mix(in srgb, oklch(from var(--ui-backdrop-bg-color) l c h / 1) 50%, var(--ui-surface))`, and the surface back as a `background-image`. Measured in headless Chromium (800px window, 10px gutter): in light mode the strip reads 139, 143, 149, the backdrop's exact color, against today's undimmed 244, 249, 255, and in dark mode 21, 24, 28 against a backdrop of 20, 23, 27; a bottom drawer still stops 10px short of the edge. The `/ 1` matters, since a relative color without an alpha keeps its origin's and the strip then comes out half dimmed. A theme with another backdrop alpha needs that alpha in place of the 50%. Example: dialog-scrollbar-gutter-root
  > Remove issue
  - Removed: The strip stays. It only shows with classic scrollbars, `scrollbar-gutter: stable` keeps the page from shifting when a modal opens, and browsers don't paint the backdrop or a drawer over the gutter. The `dialog-scrollbar-gutter` and `dialog-scrollbar-gutter-root` examples keep the measurements.
- [x] (2) CSS: a tonal fill inside a tonal surface, or inside an elevated surface in dark mode, matches its background, so tonal buttons, the Tabs track and tonal chips disappear there (1.00:1). Dark `--ui-surface-tonal` and `--ui-surface-elevated` are both `--ui-gray-12` (`packages/opui/css/theme.css:515-518`), and a tonal `Card`, `Accordion` or `Callout` paints the same tonal its content reads (`packages/opui/css/components/card.css:42-49`, `packages/opui/css/components/callout.css:3`)
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
- [x] (1) Dialog: `card.css` gives `.ui-dialog` the Card's density and variant classes (`.ui-dense`, `.ui-spacious`, `.ui-transparent`, `.ui-tonal`, `.ui-outlined`), but the Dialog API lists none of them, only the `.ui-elevated` note. On the component, which always adds `.ui-elevated`, a `class` of `ui-tonal` or `ui-transparent` loses to it because they are declared before it, and `ui-outlined` wins because it is declared after (`packages/opui/css/components/card.css:2`, `packages/opui/css/components/card.css:36-77`, `packages/opui/components/Dialog/Dialog.astro:20`, `src/component-api/dialog/api.ts:8-12`)
  - Summary: A dialog takes Card classes the docs never mention, and two of the three variants do nothing on the component.
  - Recommended: Fix with option A. The Dialog documents one surface, and no dialog example or block uses the others.
  - Fix: confirm first that no block or example puts these classes on a `.ui-dialog`; a grep of `src/component-examples/dialog` and `src/blocks` found none. The Accordion API doesn't list density either, so scope option A so that Accordion and Card keep their rules.
  - Options:
    - A (recommended): make the density and variant rules in `card.css` stop matching `.ui-dialog`, keeping `.ui-elevated` for it.
    - B: document them as HTML-only options in the Dialog API, and replace the hard-coded `ui-elevated` in `Dialog` with a `variant` prop.
  - Explained: Option A removes behavior 5.4.3 shipped, so it needs a decision and a Breaking entry: every 5.4.3 `Dialog` rendered `ui-dialog ui-card ui-elevated`, so `class="ui-dense"`, `ui-spacious` or `ui-outlined` on it changed the dialog through the Card rules, and still do through `.ui-dialog`. No example, block, stress test or docs page uses these classes on a dialog. For A, scope the rules with `:where()`, which keeps their specificity, and leave `&.ui-elevated` as it is: `&:where(.ui-accordion, .ui-card).ui-dense`, and the same for `.ui-spacious`, `.ui-transparent`, `.ui-tonal` and `.ui-outlined`. Breaking entry: "`Dialog` takes only `.ui-elevated` from `card.css`. `.ui-dense`, `.ui-spacious`, `.ui-transparent`, `.ui-tonal` and `.ui-outlined` no longer change a dialog, which took them through `.ui-card` in 5.x: set `--_padding` for a denser dialog." Add the same line to MIGRATING's Dialog section.
  - Fixed: with option A in df2dbd42. The density and variant rules in `card.css` match only `:where(.ui-accordion, .ui-card)`, and `.ui-elevated` still styles the dialog (checked in Chromium). It's logged under Removed with a MIGRATING line in the Dialog section; no example, block, stress page or theme used those classes on a dialog.
- [x] (1) Carousel: six layout examples are filled with empty cards but keep content names: "Destinations" on five, and "Plans" on the outlined one. Basics, Peek and Grid layout fill the same "Destinations" carousel with destination cards (`src/component-examples/carousel/ButtonsOutside.astro:4-10`, `src/component-examples/carousel/CustomButtons.astro:4-16`, `src/component-examples/carousel/ItemsPerView.astro:4-11`, `src/component-examples/carousel/PersistentButtons.astro:4-16`, `src/component-examples/carousel/Stretch.astro:5-21`, `src/component-examples/carousel/Vertical.astro:4-18`)
  - Summary: Screen readers hear a carousel named Destinations or Plans whose items are empty boxes.
  - Recommended: Fix with option A. It keeps the short layout examples and gives the page one carousel name and one card look.
  - Explained: The six examples show layout options, and 65d0a710 and 8bcf52cd emptied their cards so the code stays short. The types require `aria-label`, so each still needs a name, and in Chromium the items read as unnamed list items under the name (`list "Destinations"` with five `listitem`). Five of them reuse the name of the Basics carousel, so they read as that carousel with its content left out. Buttons outside is the odd one: "Plans" with outlined cards, where the other five are "Destinations" with tonal cards. Making it match is one name and one variant; putting content back undoes the two commits.
  - Options:
    - A (recommended): Keep the empty cards, and make Buttons outside the same "Destinations" carousel of tonal cards as the other five.
    - B: Put the destination headings from Basics back in every card (`<CardHeader><h3>Kyoto</h3></CardHeader>`), so each item announces a name, at the cost of the longer examples the two commits removed.
    - C: Keep the examples as they are.
  - Fixed: with option A in ce45b29a. Buttons outside is the same "Destinations" carousel of tonal cards as the other five empty-card examples, so the page has one carousel name and one card look. The markup snapshot is re-recorded (intended), and its visual baseline needs the `update-snapshots` label.
- [ ] (1) Examples: the ten pages draw on at least five unrelated settings: a shop (deliveries, refunds, "Past due"), a SaaS workspace (plans, trials, projects), travel (Norway, Kyoto), an issue tracker ("Open", "In review", "Closed") and pizza toppings. Lena Ek is the only person who recurs (`src/component-examples/accordion/Group.astro:12-26`, `src/component-examples/callout/Actions.astro:14-15`, `src/component-examples/card/Media.astro:26-31`, `src/component-examples/chip/Pressed.astro:5-31`, `src/component-examples/checkbox/FieldGroupOrientation.astro:13-17`)
  - Summary: The examples read as many different apps rather than one product with one cast.
  - Recommended: Explain further. Whether the release wants one product across all examples is a call on scope.
- [x] (2) Callout: a close button in a callout only takes its place at the end of the first row: every app writes its own click handler to remove or hide the callout, as the Dismissible example does (`packages/opui/css/components/callout.css:138-163`, `src/component-examples/callout/Dismissible.astro:27-45`)
  - Summary: A close button in a callout does nothing until the app adds a click handler that removes the callout.
  - Recommended: Fix with option B. Build it as an `opui-callout` element that handles `--dismiss`, hides itself with `hidden` and moves the focus, like the package's other elements.
  - Options:
    - A: keep the handler in the app, as the Dismissible example shows.
    - B (recommended): ship a small helper, such as `opui-css/js/dismiss.js`, that handles `command="--dismiss"` on its `commandfor` target and removes or hides it, and let `Callout` render the button from a `closeLabel`.
  > Explain further and provide an example
  - Explained: Today `callout.css` only places a close button: a `.ui-button` that is a direct child goes to the end of the first row. What it does is the app's, and the Dismissible example's handler hides the callout, shows a Show the callout again button in its place and moves the focus there. Option B would follow how the package adds behavior elsewhere, a custom element in `elements/` that handles a custom command, like `opui-copy` with `--copy` and `opui-text-field` with `--toggle-password`: `Callout` would render an `opui-callout` root when it gets a `closeLabel`, with a close button that sends `command="--dismiss"` to it, and the element would hide itself. What it can't decide is what happens next: once the button is hidden the focus falls to the body, and a callout that should stay dismissed after a reload needs the app's storage or server. So the element would fire a cancelable `dismiss` event for the app to move the focus and remember the choice, which leaves about as much app code as the handler today, plus a script to load, a new element and a prop in five formats. The example puts both side by side: A with the app's handler, and B with a prototype element and the listener the page still needs. Example: callout-dismiss
  > Explain further
  > Callouts shouldn’t be dismissed, why?
  - Explained: Callouts can be dismissed: the Dismissible example and the close button's place at the end of the first row are there for that, and option A only means the package doesn't ship the click handler. Two reasons to keep the handler in the app. First, what dismissing means is the app's choice: a callout that comes back on every reload is worse than none, so a real dismiss writes to storage or the server, and once the callout is gone the focus has to go somewhere the app picks. A shipped element could only hide the callout and fire an event for the rest, which leaves about as much app code as the handler today, plus a script, an element and a prop in five formats. Second, not every callout should be dismissible: a warning or an error that still applies, like a failed payment, should stay until the problem is gone, because someone who closes it by accident loses the information with no way back. A close button suits announcements and tips, like the example's new editor notice, and keeping it a deliberate opt-in per callout in the app's markup fits that better than a `closeLabel` prop that makes every severity one prop away from dismissible.
  > Explain further
  > What solution is more inline with the spirit of the library? Also, the solution should be well-engineered, robust and feel future-proof?
  - Explained: B fits the library better than A, built the way the package already adds behavior that HTML lacks. I recommended A on a prototype that left out the part that makes B worth having. The library's idea is native elements with their behavior built in, and where the platform stops, the thinnest layer that reads like it. In HTML a close button is `command` and `commandfor`: `DialogHeader`'s `closeLabel` renders `command="close"`, and `Menu` items `hide-popover`. HTML has no built-in command that hides any element, and custom commands, names that start with `--`, are its extension point for that: the browser fires a `command` event at the target and the page handles it. The package does this four times already (`opui-copy` with `--copy`, `opui-number-field` with `--step-up` and `--step-down`, `opui-text-field` with `--toggle-password`, `opui-toaster` with `--toast`), while A asks every app for a click handler. Built well, B is this. `Callout` takes `closeLabel`, like `DialogHeader`, and then renders an `opui-callout` root with `role="article"` and a close `Button` with `command="--dismiss"` and `commandfor` set to its id, with the dev warning `DialogHeader` gives without an id, the way `TextField` switches its root to `opui-text-field` only with `passwordToggle`. The element sets `hidden` instead of removing the node: React, Svelte and Vue own the nodes they render, and the Dismissible example's `replaceWith` breaks their next update, while a server can render `hidden` from a cookie, so a dismissed callout never flashes. When the focus was inside, it moves to the next focusable element after the callout, else the one before, as `opui-toaster` moves it to the next toast; the earlier prototype left this to the page, which is why it looked no shorter than A. It fires a cancelable `dismiss` event first, so an app that keeps `hidden` in its own state cancels it and takes over. `callout.css` hides the close button until the element is defined, as `copy.css` and `text-field.css` do, so a page without the script shows no dead button. Remembering the choice stays in the app, since how long a dismissal lasts and where it is stored is a product and privacy decision: the app writes one `dismiss` listener when it needs one, and none for a dismissal that lasts the page view. It is future-proof because it stands on platform parts only: invoker commands are Baseline since December 2025 (Chrome 135, Firefox 144, Safari 26.2), the `--` prefix is the namespace HTML leaves to authors, so no built-in command can collide with it, and `hidden` and a custom element need no framework state, so the four frameworks compile to the same markup. A global `--dismiss` handler for any element is the lighter alternative and keeps the `article` root, but it makes every element on the page a dismiss target and has nowhere to put a `dismiss()` method for app code, so it is the weaker contract. The last answer's point still holds: the prop is opt-in per callout, for announcements and tips, not for a warning or error that still applies.
  - Fixed: a variant of option B the maintainer chose, as an element. `Callout` takes `dismissible` and `closeLabel` ("Close", like DrawerHeader and Toaster) in Astro, React, Svelte and Vue, which render an `<opui-callout role="article">` root and a close button with `command="--dismiss"`. `opui-css/elements/callout.js` fires a cancelable `dismiss` event, sets `hidden` and moves focus to the next focusable element after the callout, or else the one before, so the Dismissible example needs no handler of its own. Two e2e tests cover hiding, focus and `preventDefault()` in all five formats in Chromium.
- [x] (2) Tabs: there are no vertical tabs and no tabs made of links: the Tabs page sends page navigation and a settings page with its sections in a column to the App shell block's list of links (`src/docs/components/tabs.astro:139-147`, `packages/opui/css/components/tabs.css:1-30`)
  - Summary: Tabs can't stand in a column at the side or link to other pages, so settings pages and page navigation use a List of links instead.
  - Recommended: Fix with option A. A List of links with `aria-current` covers both cases today, while B and C each add a second layout or selected state to every Tabs variant.
  - Options:
    - A (recommended): keep pointing to the App shell block and a `List` with `aria-current="page"`.
    - B: add `orientation="vertical"` to `Tabs`: the labels in a column at the start and the panel beside them, for every variant, in right-to-left text and in forced colors.
    - C: add a navigation form: links with `aria-current="page"` styled like tabs, without radio inputs or panels.
  > Explain further and provide an example
  - Explained: The tabs are radio inputs, labels and panels in one wrapping flex row: the panel after the checked radio's label shows, and `order` puts the labels before the panels. That is what makes them work without a script, and why both asks are separate builds. Vertical tabs (B) need a two-column grid, the labels in the first column and the panel spanning their rows, and every rule written for a row redone for a column: the track's rounded corners, which sit on the first and last tab's start and end today, the panel's block margin, the line variant's indicator under the tab, the overflow scroll, right-to-left and forced colors, in all five variants. The sliding pill follows on its own, since it anchors to the checked tab, and the radios' arrow keys already move up and down. Tabs made of links (C) can't use the radios: a link to another page has no panel, and `role="tablist"` isn't for navigation, so it would be a `nav` of links with `aria-current="page"` drawn like tabs, a second selected state next to `:checked` with its own focus ring rule. A covers both cases now with a List of links, as the App shell block does. The example shows A, B with only the layout changed and with its corners and gap redone, and C, all on today's CSS. Example: tabs-vertical-links
  > Fix with option B
  > Make an effort here and not just a hotfix.
  - Fixed: Option B. `Tabs` take `orientation="vertical"` (`.ui-vertical`), compiled to React, Svelte and Vue, with its `api.ts` option, a Vertical section and example (a settings page in tonal tabs and a schedule in line tabs) on the Tabs page, a step note in Under the hood, and CHANGELOG and What's new entries. The root becomes a two-column grid: the labels stack in the first column, at most half the width with their text wrapping, and the open panel sits in the second, `--_panel-gap` away, spanning the label rows and one `1fr` row after them, so its height goes to that row and the labels keep theirs. Every rule written for a row is redone for a column: the track's borders and rounded corners move to the first tab's start corners and the last tab's end corners (both on a single tab), the inset padding moves to the column's ends, the line variant's indicator stands at the inline start and its gap becomes a block margin, and where anchor positioning works the sliding pill and line follow the selected tab up and down while each tab's track part covers its column. Checked in Chromium in all four variants, with one tab, in right-to-left, in dark mode and in forced colors. `overflow="scroll"` has no effect on vertical tabs, and tabs made of links stay a List of links, which the Basics section's App shell note now says is for navigation between pages.

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
- [x] (1) Learn: nothing checks the Learn registry's order, and an unknown web-features id in a post's `features` or an Under the hood step only logs a warning and renders as limited availability (`src/utils/blog-posts.ts`, `src/components/UnderTheHood/BuildUp.astro:130`, `src/utils/browser-support.ts:52-56`)
  - Summary: A blog post can show a wrong browser support chip or sit out of order, and only a review notices.
  - Recommended: Fix. Both are a few lines in a unit test.
  - Replaces: the Registry rule in `.claude/agents/blog.md:28`.
  - Fix: a `blog.test.ts` that checks the order and that every `features` id exists in `web-features`, and make the warning an error in the build.
  > Fix
  - Fixed: `tests/unit/blog.test.ts` checks the registry's order (by component, then slug), sorted keys, sorted `features` and `topics` without duplicates, and that every `features` id of a post or Under the hood step is a live web-features id. `getSupportForFeature` throws in production builds, so an unknown id fails the build, and the blog agent's Registry line names the test.
- [x] (1) Tests: the reasons passed to `failingIn` and `test.fail` are separate copies of the strings in `engines.spec.ts`, and the WebKit one is worded differently in the two files, so nothing ties an expected failure to its browser repro (`tests/e2e/engines.spec.ts:4-8`, `tests/e2e/stress-overlays.ts:22-26`)
  - Summary: An expected browser failure can lose its plain-HTML repro without any test noticing.
  - Recommended: Fix. Sharing the strings makes the link explicit.
  - Replaces: the repro clause of `AGENTS.md:57` ("add a plain-HTML repro to `tests/e2e/engines.spec.ts` when it's a browser bug").
  - Fix: export the reasons from one module that `engines.spec.ts` uses for its repro titles, import them in `stress-overlays.ts` and the `test.fail` calls, and fail when a reason has no repro.
  > Fix
  - Fixed: The reasons live in `tests/e2e/engine-bugs.ts` (`ENGINE_BUGS` per engine and `failsIn()`). `engines.spec.ts` titles each repro block with its reason and "every engine bug has a repro" fails on a reason without one; `stress-overlays.ts` and the specs import them, and the WebKit reason has one wording. `AGENTS.md` names the check instead of the repro clause. The Tabs wrap and overflow tests use two new WebKit reasons with repros (`WEBKIT_RADIO_NO_WRAP`, `WEBKIT_ARROW_FOCUS_SCROLL`).
- [x] (1) Tests: the align rule in the components guide (one default per part, wherever the part appears) is only checked for four parts in Astro: `actions-align.test.ts` renders `AccordionActions`, `CardActions`, `DialogFooter` and `DrawerFooter` (`tests/unit/actions-align.test.ts:1-44`, `packages/opui/components/AGENTS.md:231`)
  - Summary: The align default is only checked for four Astro parts.
  - Recommended: Fix. The parts with an align option are listed in their api.ts.
  - Fix: build the part list from the `api.ts` options with `prop: "align"`, and render each part in every framework, the way `parity.test.ts` renders the examples.
  - Replaces: `packages/opui/components/AGENTS.md:231`, which then names the test.
  > Fix
  - Fixed: `tests/unit/actions-align.test.ts` is now `tests/unit/align.test.ts`. It collects every `api.ts` with an `align` option, groups them by their root part (`.ui-actions`, `.ui-carousel`, `.ui-divider`, `.ui-footer`, `.ui-menu`, `.ui-toaster`), fails when the APIs of one part document a different default or values, and renders each component in Astro, React, Svelte and Vue with every `align` value, failing when a framework or container renders another class or misses the value's modifier. Two sample tests feed it a second default and a framework that renders `.ui-align-start` by default. `packages/opui/components/AGENTS.md:231` now names the test.
- [x] (1) Tests: `naming.test.ts` only catches `dense` next to `density` for the rule that a component never has both a boolean and an enum for one concept, not any other boolean named after a value of a concept the component also has (`tests/unit/naming.test.ts:319-320`, `packages/opui/components/AGENTS.md:229`)
  - Summary: Only dense next to density is caught when a component has both forms of one concept.
  - Recommended: Fix. The vocabulary already lists the values of each concept.
  - Fix: report a boolean option whose name is one of the `values` of a `vocabulary` concept that the same `api.ts` also has as an option.
  - Replaces: the first half of `packages/opui/components/AGENTS.md:229`, which then names the test.
  > Fix
  - Fixed: `problemsOf` in `tests/unit/naming.test.ts` now reports every prop without `values` whose kebab-case name is a value of a `vocabulary` concept that the same `api.ts` has as a prop (`has both vertical and orientation, never a boolean and an enum for one concept`), with a new `vertical` next to `orientation` sample beside the `dense` one. No component trips it. The first half of `packages/opui/components/AGENTS.md:229` now names the test.
- [x] (1) Tests: `parity.test.ts` drops `script` and `style` before it compares the markup, so nothing checks the docs guide's rule that HTML examples are as functional as the Astro ones; only the `framework-parity` agent reads the scripts (`tests/unit/normalize.ts:7`, `src/docs/components/AGENTS.md:309`)
  - Summary: Nothing checks that an HTML example ships the script its behavior needs.
  - Recommended: Fix with option A. Every HTML script today follows from a hook in the markup, so a small table covers them.
  - Replaces: `src/docs/components/AGENTS.md:309` (Functional Parity) and the scripts clause of `.claude/agents/framework-parity.md:33`.
  > Explain further
  - Explained: the Astro components ship their behavior in a `<script>` that Astro bundles, so the rendered Astro markup carries no script to compare, and an HTML example has to import the same module itself. Which examples need one follows from three hooks in the markup, which parity already keeps equal across frameworks: an `<opui-name>` element needs `import "opui-css/elements/<name>.js"` (22 HTML examples, all import exactly their elements today); an `output.ui-value[data-live]` in a `.ui-range` needs `opui-css/css/js/range.js` (`range/Value.html`), and an `input[data-indeterminate]` needs `activateIndeterminate()` from `opui-css/css/js/checkbox.js` (`checkbox/Basics.html`, `checkbox/Indeterminate.html`); and an Astro example with its own inline `<script>` needs one in its HTML example (13 examples, such as `range/ValueText`, all have one today). A test over the raw `.html` sources with that hook-to-module table can fail on a missing import and on an import with no hook, and on an Astro example script with no HTML counterpart. What it can't check is that an inline script does the same thing in both, which stays with the `framework-parity` agent or an interaction test that drives both pages.
  - Options:
    - A (recommended): `tests/unit/example-scripts.test.ts` with the hook-to-module table and the inline-script presence check, each with a sample it flags; `src/docs/components/AGENTS.md:309` and the scripts clause of `.claude/agents/framework-parity.md:33` then name the test, and the agent only compares what the inline scripts do.
    - B: Keep it with the `framework-parity` agent and remove the item.
  > Fix with option A
  - Fixed: option A. `tests/unit/example-scripts.test.ts` reads the raw HTML examples: an `<opui-*>` element needs `opui-css/elements/<name>.js`, an `input[data-indeterminate]` needs `css/js/checkbox.js` and an `output.ui-value[data-live]` in a `.ui-range` needs `css/js/range.js`. An import without its element fails, and so does an HTML example without a script of its own when its Astro example has one. It feeds the rule a sample of each problem. The Functional Parity line in `src/docs/components/AGENTS.md` and the HTML completeness line in `.claude/agents/framework-parity.md` name the test, and the agent reads what the inline scripts do.
- [x] (1) Docs site: the code blocks keep their own copy button, with a green "Copied!" label and no message when the copy fails, instead of the library `Copy`, because they leave the removed lines of a diff out of the copied text, which `Copy` can't do (`src/components/Code.astro:69`, `src/components/Code.astro:251-264`, `src/components/Code.astro:292-304`)
  - Summary: Code blocks confirm a copy differently from the Copy component and say nothing when it fails.
  - Recommended: Fix with option A. It keeps the diff behavior and drops the site's own copy script.
  - Fix: switch `Code.astro` to `Copy` with a `Button` once `Copy` can leave elements out of the copied text, and keep `docs.spec.ts` checking that a diff copies without its removed lines.
  - Options:
    - A (recommended): `copy.js` also leaves out elements marked `data-copy-ignore`, and `Code.astro` marks its removed diff lines with it.
    - B: `Copy` takes the text to copy from a `copy-text` attribute when it has one, and `Code.astro` sets it to the code without the removed lines.
  > Fix with option A
  - Fixed: option A. `copy.js` also leaves out elements with `data-copy-ignore`, which the Copy page (Snippet), its `api.ts` and the Unreleased `Copy` entry mention. `Code.astro` wraps the code in `Copy` with a small tonal `Button`, so code blocks show and announce the library's Copied and Copy failed label, and the site's own click handler and green label are gone. Each diff line carries its newline and a removed line has `data-copy-ignore`, so it drops out with its newline. A new test in `docs.spec.ts` copies a diff on the Migrating page and checks the text and the label.
- [x] (1) Tooling: Prettier formats the repo, while oxfmt formats the TS, CSS, Markdown, JSON and YAML files natively and the rest with a bundled Prettier. Its Astro formatting assumes Astro 7's `"jsx"` whitespace by default, but the site sets `compressHTML: true`, so the default config adds spaces the pages didn't have, like "Switch field group ." (`.prettierrc:1-18`, `astro.config.mjs:72`, `package.json:20-21`)
  - Summary: Formatting runs on Prettier, and oxfmt with its default Astro option would put stray spaces before punctuation on almost every docs page.
  - Recommended: Fix with option A. It switches now without changing a rendered page, and option B follows once Astro fixes its compiler.
  - Fix: run `oxfmt --migrate=prettier`, keep `printWidth: 80` (oxfmt defaults to 100), and add `oxfmt` and `@astrojs/compiler-rs` as dev dependencies (oxfmt needs both `svelte` and `@astrojs/compiler-rs` installed to format `.svelte` and `.astro`). Move the `format` and `format:check` scripts, `scripts/check-staged.mjs`, the `.prettierignore` test in `tests/unit/generated-files.test.ts` and `.vscode/extensions.json` to oxfmt, and the `format()` calls in `src/components/Example/Example.astro`, `scripts/build-readme.mjs`, `scripts/released-api.mjs` and `scripts/check-css-vars.mjs` to oxfmt's `format(fileName, source, options)`. Confirm the `prettier-ignore` comments still apply.
  - Options:
    - A (recommended): switch now with `"astro": { "compressHTML": "html" }`, the oxfmt option that mirrors `compressHTML: true`. Measured with oxfmt 0.76.0: 286 files change, the rendered text of every built page stays the same (only whitespace between SVG children and flex items differs), and the parity and unit tests pass.
    - B: once the compiler bug below is fixed, drop `compressHTML: true` and the oxfmt `astro` option, so the site and the formatter both use Astro 7's `"jsx"` default, the same whitespace that projects using the package's `.astro` components get by default. Today 240 of 339 pages change text with it.
  - Blocked: with `compact: "jsx"`, `@astrojs/compiler-rs` 0.5.1 and 0.5.2 drop the line breaks next to tags in elements but keep them in the children of a component and in a `<Fragment slot>`, so `<W><a>group</a>\n  .</W>` renders "group .". The docs prose sits in those children. Reported in [withastro/compiler-rs#216](https://github.com/withastro/compiler-rs/issues/216).
  - Fixed: option A. oxfmt formats the repo with `astro: { compressHTML: "html" }`, `printWidth: 80` and the `ignorePatterns` in `.oxfmtrc.json`, and `scripts/format.mjs` formats the generated components and examples and the other script output through its `format()` API. Prettier, `.prettierrc` and `.prettierignore` are gone. Option B waits on [withastro/compiler-rs#216](https://github.com/withastro/compiler-rs/issues/216).
- [ ] (1) Tooling: the site builds with `compressHTML: true` and oxfmt formats with the matching `compressHTML: "html"`, while Astro 7 and oxfmt both default to `"jsx"` whitespace, the rules projects that use the package's `.astro` components get. Moving both to `"jsx"` waits on withastro/compiler-rs#216, which keeps line breaks in component children (`astro.config.mjs:72`, `.oxfmtrc.json:3`)
  - Summary: The site and its formatter use the older HTML whitespace rules, not Astro 7's default, until an Astro compiler bug is fixed.
  - Recommended: Fix. Once compiler-rs#216 is fixed, the switch is two settings and a reformat.
  - Fix: once [withastro/compiler-rs#216](https://github.com/withastro/compiler-rs/issues/216) is fixed and `@astrojs/compiler-rs` is updated, delete `compressHTML: true` from `astro.config.mjs` and the `astro` option from `.oxfmtrc.json` (keep `"astro": {}` so oxfmt still formats `.astro`), run `pnpm format` and `pnpm build`, and compare the text each built page renders before and after. Measured with 0.5.1 and 0.5.2, 240 of 339 pages rendered different text.
  - Explained: `@astrojs/compiler-rs` 0.5.3 is out (the repo has 0.5.2). Run the before and after comparison with it before waiting longer on compiler-rs#216.
- [x] (1) Callout: the `variant` union is the only variant enum whose values aren't in ascending order, `"tonal" | "outlined"`, while Avatar, Button, Card and Checkbox sort theirs (`packages/opui/components/Callout/types.ts:3`, `packages/opui/components/Avatar/types.ts:4`, `packages/opui/components/Card/types.ts:3`)
  - Summary: The Callout `variant` type lists `tonal` before `outlined`, unlike every other variant union.
  - Recommended: Fix. Swapping two members follows the repo's ascending-order rule.
  - Fix:
    ```ts
    variant?: "outlined" | "tonal"
    ```
  > Fix
  - Fixed: `variant?: "outlined" | "tonal"` in `Callout/types.ts`.
- [x] (1) TextField: the NoLabel HTML example puts `.ui-text-field` on a `div` because there is no label text, while the component always renders a `label` root unless `passwordToggle` is set, so Astro, React, Svelte and Vue render an empty `<label>` around an `aria-label` input, recorded as parity drift (`tests/unit/__snapshots__/text-field/NoLabel.astro.diff:1-9`, `src/component-examples/text-field/NoLabel.html:1-5`, `packages/opui/components/TextField/TextField.astro:41`, `packages/opui/components/TextField/TextField.react.tsx:46-47`, `packages/opui/components/TextField/TextField.svelte:52`, `packages/opui/components/TextField/TextField.vue:87`)
  - Summary: A text field without a label renders a div in HTML but an empty label element in every framework.
  - Recommended: Fix with option A. The root already switches on `passwordToggle`, the CSS already styles a `div` root (the HTML example), and the drift file goes away.
  - Fix: `src/docs/components/text-field.astro:487-500` documents the difference ("The component renders a `<label>`, so name the input with `aria-label`"), so update that sentence with whichever option is chosen.
  - Options:
    - A (recommended): render `div` when neither `label` nor the `label` slot is given: `Root = passwordToggle ? "opui-text-field" : hasLabel ? "label" : "div"` in all four frameworks (`hasLabel` is `label || Astro.slots.has("label")` in Astro, `label` in React and Svelte, `label || $slots.label` in Vue), then delete `NoLabel.astro.diff`. Textarea has no NoLabel example but the same root logic, so give it the same rule.
    - B: keep the `label` root and the recorded drift.
  > Fix with option A
  - Fixed: with option A: TextField renders a `div` root when neither `label` nor the `label` slot is given (and `opui-text-field` with `passwordToggle`), and Textarea gets the same rule, with `class={cx([...])}` as `check-components` asks for a variable root; `pnpm build-components` wrote the React, Svelte and Vue files. `NoLabel.astro.diff` is deleted, the paragraph before the NoLabel example says the root is a `div`, and the CHANGELOG and What's new have a Changed entry for both.
- [x] (1) Select: `types.ts` declares `children?: S` in `Slots`, which the guide reserves for named slots; `children` already comes from `ComponentProps<"select">` and `SvelteHTMLElements["select"]`, and Vue's `Slots` names its own `default` (`packages/opui/components/Select/types.ts:21-30`, `packages/opui/components/Select/types.react.ts:4-6`, `packages/opui/components/Select/types.svelte.ts:5-7`, `packages/opui/components/AGENTS.md:13`)
  - Summary: Select is the only component whose shared `Slots` type names the default slot.
  - Recommended: Fix. Delete the line; the React and Svelte props keep `children` from their element types.
  - Fix:
    ```ts
    export type Slots<S> = {
      bottom?: string | S
      end?: string | S
      endText?: string | S
      label?: string | S
      start?: string | S
      startText?: string | S
      top?: string | S
    }
    ```
  > Fix
  - Fixed: `children?: S` is gone from `Select/types.ts`; React and Svelte keep `children` from `ComponentProps<"select">` and `SvelteHTMLElements["select"]`, and the Svelte type check passes.
- [x] (1) Toaster: every toast, a critical one included, is announced through the one polite `role="status"` region, so "Couldn't save your changes" waits behind other speech like "Changes saved" does (`packages/opui/elements/toaster.js:162-169`, `packages/opui/components/Toaster/Toaster.astro:33`, `src/docs/components/toast.astro:96-104`)
  - Summary: An error toast is announced no more urgently than a success toast, or dropped if the screen reader is busy.
  - Recommended: Fix with option A. A second region costs one element and lets the severity decide the urgency without a change to the API.
  - Options:
    - A (recommended): add a `role="alert"` region next to the `role="status"` one in the markup and the four components, and have `#announce` use it for `critical`.
    - B: keep one polite region and say on the page that every toast is announced politely.
  > Fix with option A
  - Fixed: with option A: the Toaster renders a `<div class="ui-sr-only" role="alert">` after the status region in all four frameworks and the HTML examples, `toaster.js` announces a `critical` toast there and falls back to the status region when the markup lacks it, the API lists the part, and the Basics and Accessibility text, the Toaster Added entry and a What's new note say so. The six toast markup snapshots are re-recorded (intended), and a new interaction test checks which region each severity reaches.
- [x] (1) Menu: a critical item reads `--ui-critical-text` and `--ui-critical`, though `li.ui-critical` and `a.ui-critical` are severity scopes where the guide reads the `--ui-palette-*` roles (`packages/opui/css/components/menu.css:142-148`, `packages/opui/components/AGENTS.md:478`)
  - Summary: Nothing visible by default; a theme that tunes the severity palette doesn't reach the menu's critical item.
  - Recommended: Fix. Two reads.
  - Fix: `color: var(--ui-palette-text)` and `oklch(from var(--ui-palette-accent) l c h / var(--ui-state-hover-alpha-accent))`.
  > Fix
  - Fixed: a critical menu item reads `--ui-palette-text` and its hover `--ui-palette-accent`; the `--_hover-bg-color` description says so.
- [x] (1) Chip: five severity blocks set `--_accent` only to feed one hover color, although a severity class is already a palette scope with `--ui-palette-*` roles derived from the same intent color (`packages/opui/css/components/chip.css:77-80`, `packages/opui/css/components/chip.css:87-105`)
  - Summary: Nothing visible; 19 lines exist for one hover tint.
  - Recommended: Fix. Reading a palette role removes the five blocks and the property.
  - Fix: derive the hover from `--ui-palette-accent` (same intent, hue rotated 8 steps by `--ui-palette-hue-rotate-by`, so compare on `/html/components/chip/`) and delete lines 87-105 and the `--_accent` entry in `custom-properties/chip.ts`.
    ```css
    --_bg-color: light-dark(
      oklch(from var(--ui-palette-accent) 0.92 calc(c * 0.35) h),
      oklch(from var(--ui-palette-accent) 0.35 calc(c * 0.4) h)
    );
    ```
  > Fix
  - Fixed: the hover of a colored button or link chip derives from `--ui-palette-accent`, and the five severity blocks and the `--_accent` output are gone from `chip.css` and `custom-properties/chip.ts`. In a severity scope the palette accent sits 8 degrees of hue from the intent color, so the tint shifts slightly toward the rest of the chip's palette colors.
- [x] (1) Range: the disabled thumb color is a hand-written copy of the `--ui-text-disabled` formula with a literal `50%`, so it doesn't follow `--ui-text-disabled-strength` (60% under more contrast) like every other disabled label does (`packages/opui/css/components/range.css:398-402`, `packages/opui/css/theme.css:522-526`)
  - Summary: A disabled slider thumb stays at the same gray in high contrast while disabled text gets stronger.
  - Recommended: Fix. The role exists and the root already applies `--ui-disabled-opacity`.
  - Fix:
    ```css
    &:disabled {
      --_thumb-bg-color: var(--ui-text-disabled);
    }
    ```
  > Fix
  - Fixed: `--_thumb-bg-color: var(--ui-text-disabled)` on a disabled range.
- [x] (1) List: `kbd` in `.ui-end` dims with `opacity: 0.7` and a contrast block puts it back to 1, where `--_description-text-color` (the role the item's second line reads, swapped to `--ui-on-selected` in a selected item) names the job (`packages/opui/css/components/list.css:400-411`, `packages/opui/css/components/list.css:350-353`)
  - Summary: A shortcut hint is a faded copy of the text instead of the list's secondary text color.
  - Recommended: Fix. Reading the role drops the contrast block, since `--ui-text-subtle` follows the knobs; note the default theme sets it equal to `--ui-text`.
  - Fix: `color: var(--_description-text-color)` and drop `opacity` and the `@container style()` block.
  > Fix
  - Fixed: `kbd` in `.ui-end` reads `color: var(--_description-text-color)`, and the `opacity` and the contrast block are gone.
- [x] (1) ToggleButton: the hovered selected fill always darkens (`calc(l * 0.9)`), in dark mode too and for a `--ui-selected` darker than L 0.3, where the change is invisible; `button.css` lightens dark accents and darkens the rest with `light-dark()` (`packages/opui/css/components/toggle-button.css:103-107`, `packages/opui/css/components/button.css:46-53`)
  - Summary: Hovering a selected toggle button barely changes it on a dark selected color.
  - Recommended: Fix. Reusing the button's formula keeps the two controls hovering alike.
  - Fix:
    ```css
    --_bg-color: light-dark(
      oklch(
        from var(--_selected-bg-color)
          calc(l + 0.05 + 0.15 * clamp(-1, (0.3 - l) * 1000, 1)) c h
      ),
      oklch(from var(--_selected-bg-color) calc(l - 0.1) c h)
    );
    ```
  > Fix
  - Fixed: with the button's formula on `--_selected-bg-color`, and on the pressed Chip's hover too, which used the same `calc(l * 0.9)`.
- [x] (1) Tokens: the palette scope selector list is in no order (`:root, .ui-warning, .ui-critical, .ui-info, .ui-success, .ui-neutral, .ui-palette`), while `theme.css` sorts the same list ascending and uses `html` (`packages/opui/core/palette.css:2-10`, `packages/opui/css/theme.css:684-693`)
  - Summary: Two files list the same scope classes in different orders and with different root selectors.
  - Recommended: Fix. Reordering a selector list changes nothing in the cascade.
  - Fix: `:where(html, .ui-critical, .ui-info, .ui-neutral, .ui-palette, .ui-success, .ui-warning)`.
  > Fix
  - Fixed: `core/palette.css` lists `html, .ui-critical, .ui-info, .ui-neutral, .ui-palette, .ui-success, .ui-warning`, and the list in `theme.css`, which had `.ui-palette` second, is sorted too.
- [x] (1) Tokens: the Borders and State knob groups aren't in ascending order (`--ui-radius`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-radius-round`; `--ui-state-active-alpha-light`, `-accent`, `--ui-state-selected-alpha-accent`, `--ui-state-active-alpha-dark`) while the Contrast group is sorted; `sort-css` doesn't order custom properties (`packages/opui/css/theme.css:34-37`, `packages/opui/css/theme.css:164-170`)
  - Summary: Two token groups in the theme are listed out of order.
  - Recommended: Fix. Reordering declarations changes nothing.
  - Fix: sort both groups.
  > Fix
  - Fixed: the Borders knobs go `--ui-border-width`, `--ui-border-width-thick`, `--ui-radius`, `--ui-radius-round`, and the State alphas go active, hover, selected, each accent, dark, light.
- [x] (1) Tokens: `--ui-shadow-elevated` and `--ui-shadow-overlay` are byte-identical five-layer shadows written out twice (`packages/opui/css/theme.css:573-592`)
  - Summary: Two shadow tokens repeat the same twenty lines.
  - Recommended: Fix. The alias keeps both tokens and lets a theme set either.
  - Fix: `--ui-shadow-overlay: var(--ui-shadow-elevated);`.
  > Fix
  - Fixed: `--ui-shadow-overlay: var(--ui-shadow-elevated)`. The four example themes set both, so they look the same; a theme that sets only the elevated shadow now changes the overlay shadow too, which the CHANGELOG notes under Changed.
- [x] (1) CSS: `.ui-contrast-more { --ui-contrast: more }` in `utils.css` repeats what `theme.css` already sets on the same class, next to the knobs (`packages/opui/core/utils.css:14-16`, `packages/opui/css/theme.css:654-655`)
  - Summary: Nothing visible; the same declaration lives in two files.
  - Recommended: Fix with option A. The theme rule already wins nothing and loses nothing without it.
  - Options:
    - A (recommended): drop the `utils.css` rule and keep `.ui-contrast-normal` there.
    - B: move both switches into one file.
  > Fix with option A
  - Fixed: with option A: the `.ui-contrast-more` rule is gone from `core/utils.css`; `theme.css` sets `--ui-contrast: more` next to the knobs.
- [x] (1) Switch: `--_thumb-outline-size` names an outline thickness with `-size`; the components guide reserves `-width` for a border or outline thickness and `-size` for an extent, and `avatar.css` names the same thing `--_outline-width`; `css-properties.test.ts` only bans `-width` outside border and outline, so it can't see this (`packages/opui/css/components/switch.css:17`, `packages/opui/css/components/switch.css:60`, `packages/opui/css/components/switch.css:75-77`, `packages/opui/css/components/switch.css:86-88`, `src/component-api/custom-properties/switch.ts:34`, `packages/opui/MIGRATING.md:1256`)
  - Summary: The switch names its thumb outline width like an extent, unlike the avatar ring.
  - Recommended: Fix. The property is new in 6.0.0 (renamed from `--_dot-outline-size`), so the rename only changes the unreleased MIGRATING row and the docs.
  - Fix: rename to `--_thumb-outline-width` in `switch.css`, `custom-properties/switch.ts`, the MIGRATING table row and `packages/opui/skills/opui/references/switch.md:71`.
  > Fix
  - Fixed: `--_thumb-outline-width` in `switch.css`, `custom-properties/switch.ts` and the MIGRATING row (the skill reference regenerates). `tests/unit/css-properties.test.ts` now also fails on a `-border-size` or `-outline-size` name, with `--_thumb-outline-size` as its sample.
- [x] (1) Range: `--_inset` is the padding of the `input` (it is read by `padding` and negated for `margin`), and the guide names an inset `-padding` (`packages/opui/css/components/range.css:247-250`, `packages/opui/css/components/range.css:283-289`, `packages/opui/components/AGENTS.md:514`)
  - Summary: One Range property is named differently from the same kind of value in every other stylesheet.
  - Recommended: Fix. A rename in one file and its `custom-properties/range.ts` entry.
  - Fix: rename `--_inset` to `--_padding` in `range.css` and `src/component-api/custom-properties/range.ts`.
  > Fix
  - Fixed: `--_padding` in `range.css` and `custom-properties/range.ts`. No release shipped Range's `--_inset`, so nothing else changes.
- [x] (1) Copy: `--_hidden` and `--_shown` hold clip-path values but are named by a state, while the guide names a value that is neither a length nor a color by its type or property, like `--_position-area` in Menu (`packages/opui/css/components/copy.css:21`, `packages/opui/css/components/copy.css:24`, `packages/opui/css/components/copy.css:66-71`, `packages/opui/components/AGENTS.md:516`)
  - Summary: Nothing visible; two private names don't follow the naming model.
  - Recommended: Fix. A rename in one file plus `src/component-api/custom-properties/copy.ts`.
  - Fix: `--_hidden-clip-path` and `--_shown-clip-path`.
  > Fix
  - Fixed: `--_hidden-clip-path` and `--_shown-clip-path` in `copy.css` and `custom-properties/copy.ts`.
- [x] (1) Chip: the pressed fill is `--_pressed-bg-color`, while the guide names a checked toggle button's fill `--_selected-bg-color`, which `toggle-button.css` uses for the same hook (`--ui-selected`) and the same hover formula (`packages/opui/css/components/chip.css:16`, `packages/opui/css/components/chip.css:202`, `packages/opui/css/components/chip.css:213`, `packages/opui/css/components/toggle-button.css:9`, `packages/opui/css/components/toggle-button.css:105`, `packages/opui/components/AGENTS.md:512`)
  - Summary: Nothing visible; the same job has two names across Chip and ToggleButton.
  - Recommended: Fix. Rename in `chip.css` and `src/component-api/custom-properties/chip.ts`.
  - Fix: `--_selected-bg-color`.
  > Fix
  - Fixed: `--_selected-bg-color` in `chip.css`, `custom-properties/chip.ts` and the Chip Added entry in the CHANGELOG.
- [x] (1) Checkbox: `--_checked-bg-color` names the checked card's fill with `checked`, while the naming rule and ToggleButton use `selected` for the chosen item (`--_selected-bg-color`); the property shipped in 5.4.3, so a rename is Breaking (`packages/opui/css/components/choice.css:220`, `packages/opui/css/components/choice.css:255`, `packages/opui/css/components/toggle-button.css:9`, `packages/opui/components/AGENTS.md:512`, `tests/unit/released-api.json:275`)
  - Summary: The checked choice card and the checked toggle button name the same state differently.
  - Recommended: Fix. 6.0.0 is a major release and already renames the other choice properties, so the rename costs one more MIGRATING row.
  - Fix: rename to `--_selected-bg-color` in `choice.css`, `custom-properties/choice.ts`, the Breaking CHANGELOG entry, MIGRATING and the Checkbox, Radio and Switch What's new notes.
  > Fix
  - Fixed: and not Breaking: the choice card is new in 6.0.0 and 5.4.3 has no `--_checked-bg-color`; the `inputs` in `released-api.json` were recorded from 6.0.0, so that line isn't a released name. It's `--_selected-bg-color` in `choice.css`, `custom-properties/choice.ts` and the card's Added entry. With the Checkbox card question, the fill is now the control's own accent at `--ui-state-selected-alpha-accent`.
- [x] (1) Checkbox: `--_thumb-scale` names the ripple's scale after a thumb the checkbox and radio don't have; the ripple's own property is `--_ripple-size`, and the naming rule takes the part's prefix (`packages/opui/css/components/choice.css:106-127`, `src/component-api/custom-properties/choice.ts:72-76`, `packages/opui/CHANGELOG.md:40`)
  - Summary: The ripple scale property is named after the wrong part.
  - Recommended: Fix. The 6.0.0 entry that introduced the `--_` name is unreleased, so the rename only updates that entry.
  - Fix: `--_ripple-scale` in `choice.css`, `custom-properties/choice.ts` and the CHANGELOG and MIGRATING rows that map `--thumb-scale`.
  > Fix
  - Fixed: `--_ripple-scale` in `choice.css`, `custom-properties/choice.ts`, the CHANGELOG Breaking entry, both MIGRATING rows and the Checkbox and Radio What's new notes.
- [x] (1) CSS: the required asterisk block (`content: "*"`, the `@supports (content: "*" / "")` alternative text and its color) is copied into four stylesheets; `form.css` already targets `:where(legend, .ui-legend)::after` under a fieldset root (`packages/opui/css/components/text-field.css:175-185`, `packages/opui/css/components/choice.css:60-70`, `packages/opui/css/components/form.css:69-79`, `packages/opui/css/components/rating.css:166-174`)
  - Summary: Four form stylesheets carry the same ten-line asterisk rule.
  - Recommended: Remove issue. The copies keep each component stylesheet importable on its own, and the color is already one token.
  - Fix: list `fieldset.ui-rating` in the root `:where()` of the `form.css` rule that owns the legend marker and delete `rating.css:165-173`; the checkbox and text field copies apply to `.ui-label`, so they stay unless a shared `:where(.ui-label, legend, .ui-legend)::after` rule in `form.css` is wanted, with every root listed.
  > Explain further
  - Explained: Each copy marks a different label under its own root: the `.ui-label` of a text field, textarea, select and number field (`text-field.css`, `components.extended`) and of a checkbox, radio and switch (`choice.css`, `components.root`), the `legend` or `.ui-legend` of a `.ui-fieldset` (`form.css`) and the `legend` of a `fieldset.ui-rating` (`rating.css`). One shared rule needs a file that all of those components load, and the README lets a project import `css/components/<name>.css` files one by one, so moving it into `form.css` would make Checkbox, Rating and TextField lose the asterisk without that file. The part a theme changes is already one token, `--ui-field-required-text-color`. While checking: a required radio group shows an asterisk on its legend and on every option (FieldGroupRequired on the Radio page marks Personal, Business and Nonprofit), because `choice.css` marks any label whose input is `required`, which is how a radio group is made required; that deserves its own item.
  > Remove issue
  - Removed: Each copy marks a different label under its own root, and the copies keep each component stylesheet importable on its own. The part a theme changes is already one token, `--ui-field-required-text-color`.
- [x] (1) Select, Text field: the mask chevron is drawn three times with the same declarations (`background-color`, `block-size`, `content`, `inline-size`, `mask`, `pointer-events`, forced-colors `ButtonText`): on `::picker-icon`, on the `.ui-select::after` of a plain select and on the `.ui-field::after` of an autosuggest field (`packages/opui/css/components/select.css:7-23`, `packages/opui/css/components/select.css:189-208`, `packages/opui/css/components/text-field.css:582-597`)
  - Summary: The dropdown arrow is defined three times, so its size or color can drift between a select, a customizable select and an autosuggest field.
  - Recommended: Fix. One shared rule in `text-field.css` for the paint, with only the positioning left per case.
  - Fix: one rule in `text-field.css` for the three pseudo-elements (`:where(.ui-select select)::picker-icon, :where(.ui-select:has(select):not(:has(button)))::after, :where(.ui-text-field:has(input[list])) .ui-field::after`) with the paint declarations and the forced-colors block; `select.css` keeps the grid placement, `inset`, `scale` and `transition`.
  > Fix
  - Fixed: in part: the plain select's `::after` and the autosuggest field's `.ui-field::after` share one paint rule in `text-field.css` (color, size, mask, `pointer-events` and forced colors), and `select.css` keeps only the plain select's placement. `::picker-icon` can't join that rule: a browser that doesn't know a pseudo-element drops the whole selector list, so Firefox and Safari would lose the other two chevrons. It keeps its own block, and all three now paint in `--ui-text-strong` (the plain select used `currentColor`, the root's color).
- [x] (1) Divider: the `margin-block: 0` reset for a divider inside a stack is written in four files (`packages/opui/css/components/divider.css:70-72`, `packages/opui/css/components/form.css:7-9`, `packages/opui/css/components/card.css:305-307`)
  - Summary: Nothing visible; four rules do one job.
  - Recommended: Fix. One selector list in `divider.css` covers the containers, since every rule only sets the margin to 0.
  - Fix: extend `divider.css:70` to `:where(.ui-accordion, .ui-card, .ui-dialog, .ui-form, .ui-content) > :where(hr, .ui-divider)` and drop the three copies (`.ui-content` is the grid stack in card and drawer).
  > Fix
  - Fixed: in part: the Form's `hr, .ui-divider` reset moved into `divider.css` next to the one for an Accordion, Card or Dialog, so the divider's margin and the places that zero it live in one file. Card's reset stays in `card.css`: it applies only where `.ui-content` is a grid stack, and the proposed `.ui-content > .ui-divider` would also strip the margin in rich text and in content that isn't a stack.
- [x] (1) Drawer: the closed `translate` of each placement is written twice, once in the placement rule and once under `@starting-style` (`packages/opui/css/components/drawer.css:81-115`, `packages/opui/css/components/drawer.css:130-150`)
  - Summary: Nothing visible; four translate values are maintained in two places.
  - Recommended: Fix. A private property halves the block.
  - Fix: set `--_closed-translate` per placement, read it in one closed rule and once in `@starting-style`.
    ```css
    &:not(.ui-block-end, .ui-block-start, .ui-inline-end) {
      --_closed-translate: calc(-100% * var(--_direction)) 0;
    }
    &.ui-inline-end {
      --_closed-translate: calc(100% * var(--_direction)) 0;
    }
    &.ui-block-start {
      --_closed-translate: 0 -100%;
    }
    &.ui-block-end {
      --_closed-translate: 0 100%;
    }
    translate: var(--_closed-translate);
    &[open] {
      translate: 0 0;
      @starting-style {
        translate: var(--_closed-translate);
      }
    }
    ```
  > Fix
  - Fixed: `--_closed-translate` is set per placement (inline start on the root, mirrored by `--_direction`), the root reads it for `translate`, and `@starting-style` reads it once; documented in `custom-properties/drawer.ts`.
- [x] (1) Drawer: the transparent-backdrop scroll lock is gated by `@media (width < 500px)`, the only pixel media query in the package, while the layout breakpoints are `rem` container queries, and the number isn't a token or documented (`packages/opui/css/components/drawer.css:155-160`, `packages/opui/css/components/layout.css:96-127`)
  - Summary: A drawer with a transparent backdrop locks the page below an undocumented 500px, whatever the font size.
  - Recommended: Fix. Match the layout breakpoints' unit and name the value.
  - Fix: `@media (width < 31.25rem)` or a documented `--_lock-max-inline-size`, and say in the Drawer page when the page locks.
  > Fix
  - Fixed: `@media (width < 31.25rem)`, 500px at the default font size, and both Drawer paragraphs on scroll locking name the threshold. A custom property can't feed a media query, so the value stays in the query.
- [x] (1) Layout: the grid formula is written twice, once with `auto-fill` and once with `auto-fit` for `.ui-stretch` (`packages/opui/css/components/layout.css:50-72`)
  - Summary: Nothing visible; a 10-line formula exists twice for one keyword.
  - Recommended: Fix. A private property removes the copy.
  - Fix: `--_auto-repeat: auto-fill` on the root, `&.ui-stretch { --_auto-repeat: auto-fit }`, and `repeat(var(--_auto-repeat), minmax(...))` once; document it in `custom-properties/layout.ts`.
  > Fix
  - Fixed: `--_auto-repeat` is `auto-fill` on the root and `auto-fit` with `.ui-stretch`, read once in `repeat()`, and documented in `custom-properties/layout.ts`.
- [x] (1) List: the `&:where(option)` rule repeats seven declarations the parent item rule already sets on the same element (`align-items`, `background-color`, `display`, `gap`, `min-block-size`, `padding-block`, `padding-inline`) (`packages/opui/css/components/list.css:217-231`, `packages/opui/css/components/list.css:173-183`)
  - Summary: Nothing visible; the option rule re-declares the item base.
  - Recommended: Fix. Deleting the copies changes no computed value.
  - Fix: keep `color`, `cursor`, `inline-size`, `margin`, `text-align`, `text-decoration`, `z-index` and the hover in the option rule.
  > Fix
  - Fixed: the option rule keeps `color`, `cursor`, `inline-size`, `margin`, `text-align`, `text-decoration` and `z-index`.
- [x] (1) Menu: `max-block-size: min(var(--_max-block-size), calc(100% - 2 * var(--_offset)))` is written three times, in the `calc-size` gate and both `@position-try` options (`packages/opui/css/components/menu.css:64-68`, `packages/opui/css/components/menu.css:165-177`)
  - Summary: Nothing visible; one cap is maintained in three places.
  - Recommended: Fix. The `@position-try` rules already read `--_offset`, so a private property works there too.
  - Fix: declare `--_fit-max-block-size` once on `.ui-menu` and read it in the three places; document it in `custom-properties/menu.ts`.
  > Fix
  - Fixed: `--_fit-max-block-size` is declared once on `.ui-menu` and read by the `calc-size` gate and both `@position-try` options; its `100%` resolves where it's read. Documented in `custom-properties/menu.ts`.
- [x] (1) Tabs: the inset focus ring and the on-selected ring color for filled tabs are written twice, once for tabs inside a card, accordion or dialog and once for `.ui-overflow-scroll` (`packages/opui/css/components/tabs.css:203-211`, `packages/opui/css/components/tabs.css:229-238`)
  - Summary: Two identical focus ring blocks in the Tabs stylesheet have to be kept in sync by hand.
  - Recommended: Fix. One selector list covers both contexts.
  - Fix: confirm the focus ring in the Tabs In card and Overflow examples is unchanged after merging.
    ```css
    &:is(:where(.ui-accordion, .ui-card, .ui-dialog) > *, .ui-overflow-scroll) {
      & > .ui-input[type="radio"]:focus-visible + .ui-label::before {
        outline-offset: var(--ui-focus-ring-inset);
      }

      &.ui-filled > .ui-input:checked + .ui-label::before {
        --ui-focus-ring-color: var(--ui-on-selected-strong);
      }
    }
    ```
  > Fix
  - Fixed: one `&:where(:is(.ui-accordion, .ui-card, .ui-dialog) > *, .ui-overflow-scroll)` block, which keeps the weight of the in-card rules; the overflow tabs lose one class of weight, which still ties the base ring rule and wins by order.
- [x] (1) Typography: the inline element styles are written twice, once per class in `components.root` (`.ui-abbr`, `.ui-dfn`, `.ui-sup`, `.ui-sub`, `.ui-cite`, `.ui-kbd`, `.ui-var`, `.ui-mark`, `.ui-s`, `.ui-del`, `.ui-ins`, `.ui-blockquote`) and once per bare element in the `.ui-rich-text` scope, while the code block already covers both with one `@scope (pre.ui-code-block, .ui-rich-text)` (`packages/opui/css/components/typography.css:154-249`, `packages/opui/css/components/typography.css:252-276`, `packages/opui/css/components/typography.css:700-815`)
  - Summary: Each inline text style in the Typography stylesheet exists in two copies that can drift, and the blockquote footer already differs.
  - Recommended: Remove issue. The copies sit in different layers on purpose, and their differences are deliberate.
  - Options:
    - A: one `@scope (.ui-kbd, .ui-var, .ui-rich-text) to (.ui-not-rich-text)` per pair, with `:where(:scope.ui-kbd), kbd` selector lists like the code block.
    - B: keep the copies and drop this item.
  > Explain further
  - Explained: The two sets sit in different layers on purpose. The classes (`.ui-kbd`, `.ui-mark` and the rest) are in `components.root`, so they style an element inside any component, while the bare elements of rich text are in `components.prose`, which comes before `components.root`, so any component class beats prose styling inside rich text. The code block can share one `@scope (pre.ui-code-block, .ui-rich-text)` because both of its halves live in `components.root` and no component sits on a bare `pre`. Merging the inline pairs that way (option A) would move rich text `kbd`, `mark`, `del` and the rest into `components.root`, where they beat a component rule of equal weight by source order instead of losing to it, and a scope rooted at `.ui-kbd` would also style the nested `kbd`s of a key combination like `<kbd class="ui-kbd"><kbd>Ctrl</kbd>+<kbd>C</kbd></kbd>`. The differences between the copies are deliberate: the blockquote footer gap reads `--_flow-gap`, which only exists in rich text, `.ui-del` and `.ui-s` spell out the line-through that `del` and `s` get from the browser, and rich text sets a font size and line height that only matter there.
  > Remove issue
  - Removed: The class copies in `components.root` and the bare elements of rich text in `components.prose` sit in different layers on purpose, and the differences between them are deliberate.
- [x] (1) Typography: the blockquote margin resets select any descendant that is a first or last child (`:first-child`, `:last-child` without `>`), so a nested list that starts an item inside a blockquote loses its `margin-block: 0.5em 0` from the nested list rule (`packages/opui/css/components/typography.css:237-243`, `packages/opui/css/components/typography.css:344-350`)
  - Summary: Inside a blockquote, nested lists and other first children deep in the markup lose their top margin.
  - Recommended: Fix. A child combinator is what the rule means, and the rich text `.ui-content` rule at line 408-416 already uses it.
  - Fix: `& > :first-child` and `& > :last-child` in both blocks.
  > Fix
  - Fixed: `& > :first-child` and `& > :last-child` in both blockquote blocks.
- [x] (1) TextField: the spread layout collapses at `@container (inline-size < 400px)`, a pixel breakpoint, while Stepper and Timeline use `rem` (`32rem`, `24rem`), so the field layout doesn't follow the user's font size the way the other two do (`packages/opui/css/components/text-field.css:560`, `packages/opui/css/components/stepper.css:188`, `packages/opui/css/components/timeline.css:169`)
  - Summary: Spread text fields switch to one column at a fixed pixel width instead of scaling with the text size.
  - Recommended: Fix. `25rem` keeps the default layout and follows the reader's text size; change Range and Select with it.
  - Fix: `@container (inline-size < 25rem)`.
  > Explain further and provide an example
  - Explained: A container query in `px` ignores the reader's text size. With the browser's default text size at 24px (150%), a spread field 420px wide stays in two columns about 200px wide each with 24px text, where at the default 16px the same content would be 280px wide and stacked. `rem` in a container query is the root font size, so a `25rem` breakpoint scales with that setting and stays 400px at the default size, so nothing changes for anyone who hasn't changed it. The same `400px` sits in `range.css:192` and `select.css:174` for their spread layouts, so all three should change together; Stepper and Timeline already use `rem`. The example sets the page's root size to 150% and compares the two breakpoints in a 420px box. Example: spread-rem-breakpoint
  - Fixed: `25rem` in `text-field.css`, `range.css` and `select.css`.
- [x] (1) Progress: the indeterminate bar animates `inset-inline-start` and `inset-inline-end`, which relayout every frame, and `will-change` on those two properties promotes nothing (`packages/opui/css/components/progress.css:57-64`, `packages/opui/css/components/progress.css:91-106`)
  - Summary: An indeterminate progress bar costs layout work every frame on pages with many components.
  - Recommended: Fix with option A. It removes a declaration that does nothing; B is only worth it if a profile shows the bar in the frame budget.
  - Options:
    - A (recommended): drop `will-change: inset-inline-start, inset-inline-end`.
    - B: keep `inset-inline: 0` on the `::after` and animate `translate` and `scale` on the inline axis instead, with a reversed keyframe set under `&:dir(rtl)`, so the animation runs on the compositor.
  > Fix with option A
  - Fixed: with option A: the `will-change` is gone.
- [x] (1) Accordion: the summary hides its marker three ways: `display: flex` on the summary already removes the `::marker` box (a marker only exists on `display: list-item`), `display` isn't a property that applies to `::marker`, and `::-webkit-details-marker` is a fallback for older Safari, which the browser support rules keep out of the component CSS (`packages/opui/css/components/accordion.css:106-117`)
  - Summary: The accordion summary carries a no-op marker rule and a Safari-only workaround in the component stylesheet.
  - Recommended: Fix with option A. `display: flex` hides the marker wherever `summary` uses `::marker`, so the three declarations do nothing there.
  - Fix: confirm on `/html/components/accordion/` in current Safari that a summary with a `.ui-marker` shows no disclosure triangle without the vendor rule.
  - Options:
    - A (recommended): drop `list-style: none` and the `::marker` and `::-webkit-details-marker` rules, keeping `display: flex`.
    - B: if a shipped Safari still needs it, move the `::-webkit-details-marker` rule to `css/compat/accordion.css` behind a gate, with the Compat layer and `compat.spec.ts` updates.
  > Explain further and provide an example
  - Explained: A marker box only exists on `display: list-item`, so the summary's `display: flex` already removes the disclosure triangle; `display: none` on `::marker` does nothing, since `display` isn't a property `::marker` takes, and `list-style: none` has no marker left to hide. Safari drew the triangle as `::-webkit-details-marker`, which `display: flex` didn't remove, until WebKit made `summary` a list item with a `::marker` in November 2024 (commit cd2f382; its UA style now reads `display: list-item; list-style: disclosure-closed inside`), so the vendor rule only matters for Safari releases from before that change. The example renders today's accordion, one with the browser's `list-style` put back (still no triangle) and a control with `display: list-item` that shows the triangle that would otherwise be there; it needs a look in a current Safari, since no WebKit runs here. Example: accordion-marker
  - Fixed: with option A, under the browser support rule that keeps old-engine workarounds out of the component CSS: `list-style: none` and the `::marker` and `::-webkit-details-marker` rules (and their Safari fallback comment) are gone, `display: flex` hides the marker. Logged under Removed, since Safari before 18.2 shows its triangle again.
- [x] (1) Button group: `--_divider-border-color` is declared after the regular declarations and a nested `@media` block, separated by a comment, while every other block in the package puts its custom properties first; `sort-css` only orders the first run of declarations, so it passes (`packages/opui/css/components/button-group.css:55-76`)
  - Summary: One private property in the button group sits out of place, below the properties it feeds.
  - Recommended: Fix. Moving the declaration changes nothing in the cascade.
  - Fix: move `--_divider-border-color` and its comment up next to `--_border-color` at line 56.
  > Fix
  - Fixed: `--_divider-border-color` and its comment sit after `--_border-color`, before the regular declarations.
- [x] (1) Button: `-webkit-tap-highlight-color: transparent` is set again on `.ui-button`, which `normalize.css` already sets on `button`, `a[href]` and `[role="button"]` (`packages/opui/css/components/button.css:109`, `packages/opui/core/normalize.css:149-163`)
  - Summary: The button repeats a normalize declaration.
  - Recommended: Fix. Deleting the line changes nothing for a `button` or `a` root.
  - Fix: drop `button.css:109`.
  > Fix
  - Fixed: the declaration is gone from `button.css`. With the box-sizing item, the README now says `dist/opui.components.css` needs `core/normalize.css` or an equivalent reset, which also sets the tap highlight.
- [x] (1) Checkbox: the input sets `box-sizing: border-box`, which `normalize.css` sets on every element (`packages/opui/css/components/checkbox.css:12`, `packages/opui/core/normalize.css:2-8`)
  - Summary: The checkbox input repeats a normalize declaration.
  - Recommended: Fix. Deleting the line changes nothing.
  - Fix: drop `checkbox.css:12`.
  > Fix
  - Fixed: along with the same redundant `box-sizing: border-box` in `radio.css`, `stepper.css` (twice) and `timeline.css`; Carousel's stays, since `normalize.css` doesn't reach `::scroll-marker`. `dist/opui.components.css` documented no reset, so the README now says it needs `core/normalize.css` or a reset that makes every box `border-box`, and the CHANGELOG notes it under Changed.
- [x] (1) Card: the content padding rule matches `:where(:only-child, :first-child)`, and `:only-child` is a subset of `:first-child` (`packages/opui/css/components/card.css:173-175`)
  - Summary: A card selector lists a condition the other one already covers.
  - Recommended: Fix. Write it as `.ui-content:where(:first-child)`, which matches the same and keeps the weight.
  - Fix: `& > .ui-content:first-child`.
  > Explain further and provide an example
  - Explained: An only child is always a first child, so `:where(:only-child, :first-child)` matches the same `.ui-content` as `:where(:first-child)`: the content of a card with nothing else and of a card with actions after it, not the content after a header. The example shows the three cases with the matches and the paddings, identical. One correction to the fix: `.ui-content:first-child` without `:where()` weighs one class more, (0,2,0) instead of (0,1,0); nothing in the package depends on that today, but `& > .ui-content:where(:first-child)` keeps the weight as it is. Example: card-content-padding
  - Fixed: `& > .ui-content:where(:first-child)`.
- [x] (1) TextField: the React port loads its two element modules in two identical `useEffect`s, one per import (`packages/opui/components/TextField/TextField.react.tsx:57-62`, `scripts/component-react.mjs:152-155`)
  - Summary: The React file repeats an effect for each script the Astro file imports.
  - Recommended: Fix. One effect reads like hand-written code and behaves the same.
  - Fix: emit one `useEffect` with a `void import(...)` line per specifier. Found by the `framework-idioms` agent.
  - Fixed: `toReact` emits one `useEffect` with a `void import(...)` line per module (`scripts/component-react.mjs`), with a two-script sample in `tests/unit/build-components.test.ts`.
- [x] (1) TextField: React writes each variable tag as a lowercase const plus a `const Root: ElementType = root` alias, and `ElementType` drops the prop checks that inference of the literal union keeps (`packages/opui/components/TextField/TextField.react.tsx:47-50`, `scripts/component-react.mjs:132-141`)
  - Summary: The React file declares each dynamic tag twice and with a looser type than TypeScript would infer.
  - Recommended: Fix. AGENTS.md prefers inference, and inference catches more here.
  - Fix: when a derived tag yields only string literals, emit `const Root = <expr>`, and keep `ElementType` for a tag that comes from a prop (`as`). Found by the `framework-idioms` agent.
  - Fixed: React writes `const Root = ...` and `const Tag = as || "fieldset"`, inferred, without the lowercase const, the `ElementType` alias or cast and the renamed tags. One correction to the finding: the annotation `const Root: ElementType = root` kept the prop checks, since TypeScript narrows a const of a union type to its initializer; only ListItem's `as ElementType` cast dropped them.
- [x] (1) TextField: the ports call Astro's `createIds(uid, "text-field", id)` with the `useId()` string in place of `Astro.locals`, and Vue keeps the resulting closure in a `computed` it calls as `ids.value("start-text")`, where the components guide writes the base as `` id ?? `text-field-${uid}` `` (`packages/opui/components/TextField/TextField.vue:86-110`, `scripts/component-emit.mjs:91-96`)
  - Summary: The id code in the React, Svelte and Vue files doesn't look like what the components guide describes.
  - Recommended: Fix. The guide already names the form a port should have.
  - Fix: lower `createIds(Astro.locals, prefix, id)` to a `base` const, `computed` or `$derived` (`` id ?? `${prefix}-${uid}` ``), and `ids("x")` to `` `${base}-x` ``. Found by the `framework-idioms` agent.
  - Fixed: the reader (`scripts/component-reader.mjs`) lowers `createIds(Astro.locals, prefix, id)` to a `base` const, `$derived` or `computed` (`` id ?? `${prefix}-${uid}` ``, or `id || ...` for Range's `id || undefined`), `ids("x")` to `` `${base}-x` ``, the inline `createIds(...)("part")` of Dialog and Fieldset to one template, and `createId(Astro.locals)` in Tabs, TabsItem and ToggleGroup to `` `prefix-${uid}` ``, so no port imports `createId` or `createIds`. Any other use of the factories is refused, and `createId` loses its string form, which only the ports used.
- [x] (1) TextField: React destructures `inputMode: inputmode`, keeping the HTML spelling as a local where every other prop uses its React name, the only compiled React file that renames a native prop this way (`packages/opui/components/TextField/TextField.react.tsx:22`, `packages/opui/components/TextField/TextField.react.tsx:95`, `scripts/component-react.mjs:54-60`)
  - Summary: The React file keeps the HTML spelling for the input mode prop inside the component.
  - Recommended: Fix. It is a rename in one emitter and changes no output.
  - Fix: when the React name of a prop the Astro file destructures under its own name is an identifier, destructure it under that name and add `[local, reactProp]` to `rename`, as `class` gets `className`. Names that aren't identifiers keep the quoted key (`"aria-describedby": ariaDescribedBy`). Found by the `framework-idioms` agent.
  - Fixed: `toReact` destructures a native prop that the Astro file takes under its HTML name by its React name when that name is an identifier, and renames it in every expression, as `class` becomes `className`: TextField takes `inputMode`, and a quoted name such as `"aria-describedby": ariaDescribedBy` keeps its local. `tests/unit/build-components.test.ts` checks `inputMode` and `readOnly` and that `aria-describedby` keeps its key.
- [x] (1) TextField: React wraps a label class that is always set in `cx([hideLabel ? "ui-sr-only" : "ui-label"])`, where the hand-written Select writes a plain `className`. The same is in Checkbox, NumberField, Radio, Range, Switch and Textarea (`packages/opui/components/TextField/TextField.react.tsx:78`, `packages/opui/components/Select/Select.react.tsx:69`, `scripts/component-react.mjs:136-139`)
  - Summary: The React form controls pass a label class that is always set through a helper call the hand-written Select leaves out.
  - Recommended: Fix. The output is the same, and the file reads like the hand-written one.
  - Fix: in `toReact`'s `attribute`, emit `className={item}` without `cx` when the class list has one item and `classMayBeEmpty(item)` is false. Keep `cx` for an item that can be empty (`cx([className])`), where it turns an empty string into no attribute. Found by the `framework-idioms` agent.
  - Fixed: `toReact` writes `className={...}` without `cx` when the class is always one non-empty string (`classText` in `scripts/component-shared.mjs`), in Checkbox, NumberField, Radio, Range, Switch, Textarea and TextField. A class that can be empty or holds a list keeps `cx`, which `tests/unit/build-components.test.ts` checks with both kinds.
- [x] (2) Tokens: there is no Figma kit. Peers build one from their tokens: Primer generates Figma variables from its token files, Material has Theme Builder, and Carbon, Spectrum and Nord ship kits. `tokens.json` is the starting point, but its values are CSS expressions (`var()`, `light-dark()`, relative colors), so a kit needs them resolved per mode first (`packages/opui/tokens.json`, `src/utils/tokens-json.ts`)
  - Summary: There is no Figma kit, and tokens.json holds CSS expressions that a kit would need resolved per mode first.
  - Recommended: Fix with option A. A resolved-tokens export is a small script over the existing `tokens.json` and is what every Figma variables importer needs.
  > Explain further
  - Explained: a kit needs values, not CSS expressions. The cheapest path is a build step that opens `theme.css` in Chromium with Playwright, reads `getComputedStyle(document.documentElement)` for every `--ui-*` token in light and dark mode (and once per example theme), and writes a DTCG `tokens.resolved.json` with resolved colors and lengths and the modes as DTCG modes. Figma's variables import (Tokens Studio, or the Variables REST API on Enterprise) reads that, with light and dark as modes of one collection. What it can't do: tokens whose value depends on where they're read (the `.ui-palette` and severity scopes, relative colors over a parent surface) only resolve at the root, so the kit gets the root values and a note; and variables aren't components, a kit with component styles is a design effort on its own.
  - Options:
    - A: a `scripts/resolve-tokens.mjs` export of resolved variables per mode and theme, published next to `tokens.json`.
    - B: a full kit with components, outside this repo.
    - C: nothing until someone asks for Figma.
  - Explained: the example previews option A in the browser: it reads `/tokens.json`, sets each token on a property of its type (`color`, `margin-inline-start`, `box-shadow` and so on) in a `.ui-light` and a `.ui-dark` scope, and prints the file an export would write. Measured in Chromium: 249 of the 251 tokens resolve (the two without a `$type` don't), 123 of them are CSS expressions in `tokens.json`, and 51 differ between light and dark; `--ui-surface`, for one, comes out as `oklch(0.98 0.01 255)` with a dark mode of `oklch(0.27 0.01 255)`. Example: resolved-tokens
  > I want all the bells and whistles, let’s do this right and do this great
  - Fixed: option A and more, checked in a Figma draft. Every theme is recorded from Chromium per mode in `src/figma/` (`tests/e2e/figma.spec.ts`, `pnpm test:e2e:record-figma`), and the build turns the recordings into downloads on the theme tokens page, with the default theme's in `packages/opui/figma/themes/`: a DTCG file per mode for Figma's Import mode, with sRGB colors, a hex fallback and the oklch value, aliases, `var(--ui-*)` code syntax, scopes and hidden palette steps, and a `<theme>.figma.json` that adds effect styles for the shadows and text styles for the type roles. `packages/opui/figma/sync.js` syncs one into a file through the Plugin API. The opui Figma plugin (`packages/figma-plugin`, a download on the theme tokens page) runs it, the Theme builder's Figma button exports the current theme, and the agent skill says how to run it with `use_figma`. A run through `use_figma` with a sample theme on the Starter plan, which allows one mode, made a collection per mode, and the variables, aliases, code syntax, scopes, timing and easing variables, the effect style's bound color and the text styles' bound size, family and weight all came through. A second run updated them in place. The components, Code Connect, the Import mode check and publishing the plugin are new items.
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
- [x] (2) Release: `scripts/release.mjs` publishes from the maintainer's machine with their npm login, so `opui-css` has no provenance statement (npm only signs provenance for a publish from CI, so `--provenance` was dropped) and every release needs a local npm session with 2FA (`scripts/release.mjs:232-236`, `RELEASING.md:73`)
  - Summary: Releases are published from a laptop, so npm shows no provenance for the package and each one needs a local npm login.
  - Recommended: Fix with option A. Trusted publishing needs no token or secret in the repository, only the publisher entry on npmjs.com.
  - Fix: a `publish.yml` workflow on the tag push (the bare versions and the `-rc.N` candidates) with `id-token: write` checks out the tag, runs `pnpm install --frozen-lockfile` and `pnpm check`, and publishes from `packages/opui` with `npm publish --provenance`, `--tag next` for a candidate and `--tag latest` otherwise. `release.mjs` then only prepares the release: it dates the CHANGELOG (not for a candidate), sets `version`, runs `pnpm check`, commits, tags and pushes. Until the workflow has published, the dated heading on `main` already marks the version as released in `src/utils/release.ts`, so the docs deploy that the push starts can claim the release a few minutes early.
  - Options:
    - A (recommended): npm trusted publishing (OIDC). Needs the trusted publisher configured on npmjs.com for `opui-css` (package settings, GitHub Actions, repository `felix-bohlin/ui`, workflow `publish.yml`), which only the package owner can add.
    - B: an npm automation token in an `NPM_TOKEN` repository secret, read by `publish.yml`. Provenance works the same, but the token has to be created, stored and rotated.
  - Fixed: option A. `.github/workflows/publish.yml` runs on a release or candidate tag in the `npm` environment with `id-token: write`: `pnpm install --frozen-lockfile`, `pnpm check`, then `node scripts/release.mjs publish`, which packs with `pnpm pack` (it resolves the `catalog:` versions that `npm publish` would ship as they are) and publishes the tarball with `npm publish --provenance`, `--tag next` for a candidate and `--tag latest` otherwise. A tag pushed by hand starts it, and `release.yml` starts it with `gh workflow run publish.yml --ref <tag>`, since a tag pushed with `GITHUB_TOKEN` starts no workflow and a run of its own keeps `publish.yml` the workflow npm checks. `release.mjs publish` only runs in GitHub Actions on the tag of the `package.json` version. The trusted publisher is on npmjs.com (repository `felix-bohlin/ui`, workflow `publish.yml`, environment `npm`), and `RELEASING.md` lists it in the one-time setup.
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
- [x] (2) CSS: the scroll lock selector `html:has(.ui-dialog:modal, .ui-scroll-lock[open]:not(.ui-backdrop-transparent))` makes Chromium re-resolve the style of the whole document on any DOM insertion, so a readout written with `textContent` costs 15 to 22ms on a page with many components (`packages/opui/core/utils.css:47-54`)
  - Summary: Any script that inserts a node on a page with a modal-capable dialog pays a whole-document style pass.
  - Recommended: Remove issue. Measured, the rule adds no time, and the cost lies in other `:has()` rules.
  - Fix: measure first on `/blog/release-6/` with the rule removed: the hue slider of the contrast lab is the clearest case.
  - Options:
    - A (recommended): scope the lock to a class that the dialog and drawer scripts toggle on `html` when they open and close, so no `:has()` on `html` remains.
    - B: keep the rule and document that live readouts write `Text.data` instead of `textContent`, as `css/js/range.js` does since 6.0.
  - Found while profiling `/blog/release-6/`: deleting every `:has()` rule took a text node replacement from 20ms to 0.5ms, and this rule alone accounted for 22ms to 15ms.
  > Fix with option A
  - Still open: not changed, since measured in Chromium the rule isn't the cost. On `/blog/release-6/` (6,654 elements), with a fresh page per run, a `textContent` write on an `<output>` takes about 60ms inside `main` and 2.4ms directly in `body`, the same with the rule as with it deleted, and a trace shows an element insertion restyles about 4,600 elements with or without it. Removing all 212 `:has()` rules takes the write in `main` to 0.1ms, so the cost lies in the other rules, on the elements around the write rather than on `html`. Option A also assumes scripts that don't exist: no dialog or drawer script ships, so the class needs a new script on every page with a dialog, and a dialog opened with `commandfor` alone would no longer lock the page.
  > Remove issue
  - Removed: as answered, after the measurement in the note above: the rule isn't the cost.
- [x] (2) Drawer: the app-shell, inbox and chat blocks each hide their sidebar with a container query and repeat the same navigation inside a Drawer, so the links exist twice in the DOM, and app-shell has two `nav aria-label="Main"` landmarks (`src/blocks/app-shell.html:181`, `src/blocks/app-shell.html:506`, `src/blocks/inbox.html:106`, `src/blocks/inbox.html:667`, `src/blocks/chat.html:477`)
  - Summary: Three blocks keep two copies of their navigation, one in the page and one in a drawer, and app-shell exposes two Main landmarks.
  - Recommended: Remove issue. The copies never expose two landmarks, and a dialog in the page announces itself as one.
  - Fix: prototype a sidebar mode for `Drawer` in `src/todo-examples/`: one `dialog.ui-drawer` that a container query shows in flow when the container is `56rem` or wider (`display: block; position: static` with the backdrop off) and that opens as a modal drawer when narrower. Check that `showModal()` on the in-flow dialog is a no-op or is skipped, that focus and `inert` behave when the page resizes while it is open, that the drawer closes on resize, and that a screen reader finds one navigation landmark. If it holds, add `sidebar` to `Drawer` with the breakpoint classes of `.ui-layout-columns`, and drop the copies from the three blocks.
  > Explain further and provide an example
  - Explained: the copies cost markup, not landmarks. Measured in Chromium on the app-shell block, the accessibility tree has one Main navigation when wide, none when narrow and one with the drawer open: the drawer's copy is a closed `<dialog>`, so `display: none` until it opens, and the sidebar is `display: none` below 56rem. What the copies cost is upkeep: every link and `aria-current` sits twice in each block (the drawer copies leave out the icons), and a change to the navigation has to be made in both. The example keeps one `dialog.ui-drawer` and shows it in the page with a container query while it is closed and the frame is 56rem or wider (`display: flex; position: static; translate: none`, header hidden), so the links exist once, with no script, and one list serves both, so the sidebar and the drawer can no longer differ in icons or density without more CSS. Measured in Chromium: the links in the page are in the Tab order and form one landmark; `showModal()` on the dialog in the page opens it as a modal drawer, so it isn't a no-op, but the menu button that calls it is hidden when wide; a drawer opened narrow stays a modal drawer when the frame widens and drops into the page when closed, with focus going to `body` since the menu button is hidden, both as today; and the page content needs `grid-column: 2`, since an open drawer leaves the grid. Two catches stand against a `sidebar` prop: in the page, Chromium exposes the closed dialog as a dialog named Fjord around the navigation, so a screen reader announces a dialog that isn't one, and CSS can't change a `<dialog>`'s role; and when the frame narrows past 56rem, the closed drawer runs its exit transition and slides out over the page for 250ms. Example: drawer-sidebar
  > Remove issue
  - Removed: as answered: the copies cost markup, not landmarks, and the sidebar mode the example tried has the two catches the note above lists.
- [x] (2) Tooling: `check-browser-support` exempts every id a core sheet uses (`container-queries`, `has`, `interpolate-size`, `overflow-clip`, `relative-color`, `scrollbar-gutter`, `scrollbar-width`) from the unused check on every page; that is what let the three stale `relative-color` chips through, and it would hide a stale `has` or `container-queries` on any page, while only Dialog and Drawer need the exemption, for the scroll lock in `utils.css` (`scripts/check-browser-support.mjs:371-373`, `scripts/check-browser-support.mjs:387`, `packages/opui/core/utils.css:47-54`, `packages/opui/css/components/drawer.css:35`)
  - Summary: A chip for a feature a component no longer uses stays on its page as long as some core sheet uses the feature.
  - Recommended: Fix. The map mirrors `viaTheme`, which already names the one page that relies on the theme for a feature.
  - Fix: replace `sharedIds` in `available` with an explicit map of the pages that rely on a core rule, and let the unused check cover every other listed id. With this the check reports the Callout, Text field and Textarea `relative-color` chips as unused.
    ```js
    const viaCore = {
      dialog: ["overflow-clip", "scrollbar-gutter"],
      drawer: ["scrollbar-gutter"],
    }
    // ...
    available: new Set([...(viaCore[comp] ?? []), ...(viaTheme[comp] ?? [])]),
    ```
  - Fixed: `viaCore` names the two pages that rely on the scroll lock in `utils.css`, Dialog and Drawer, and the unused check covers every other id.
- [x] (2) Message: the checked reaction pill paints `--ui-primary` directly (a `color-mix` fill and `border-color: var(--ui-primary)`) over ToggleButton's `--_selected-bg-color`, which reads the `--ui-selected` hook, so a theme that sets `--ui-selected` recolors every toggle button except the reactions (`packages/opui/css/components/message.css:122-132`, `packages/opui/css/components/toggle-button.css:9`, `packages/opui/css/components/toggle-button.css:93-101`)
  - Summary: In a theme with its own selected color, chat reactions stay brand-colored while every other toggle follows the theme.
  - Recommended: Fix. The property is already declared on the pill by `toggle-button.css`, so the fix is two reads.
  - Fix:
    ```css
    &:has(input:checked) {
      --ui-focus-ring-color: inherit;

      background-color: oklch(
        from var(--_selected-bg-color) l c h /
          var(--ui-state-selected-alpha-accent)
      );
      border-color: var(--_selected-bg-color);
      color: var(--ui-text-strong);
    }
    ```
  > Fix
  - Fixed: with the hook defaults List uses instead of the proposed translucent fill, which would show the bubble's edge through a pill that overlaps it: the reaction pill sets `--_selected-bg-color` to `--ui-selected`, or the primary mixed into the surface at `--ui-state-selected-alpha-accent` as before, and a checked pill reads it with a `--ui-selected-strong` border and `--ui-on-selected` text, or `--ui-text-strong`. Nothing changes in the default theme; in m3 and shadcn the pill takes their tonal selected fill, and in bootstrap and brutalist the solid primary under on-primary text, like their toggle buttons. Documented in `custom-properties/message.ts` and the Message Added entry.
- [x] (2) Progress: the bar reads `--ui-primary` directly, so neither `--ui-selected-strong` (the role the guide names for "a bar", and what Stepper, Tabs, Carousel and List markers read) nor `--ui-control-accent` recolors it; a theme that sets those hooks gets a progress bar in a different color from its steppers and markers (`packages/opui/css/components/progress.css:4`, `packages/opui/css/components/stepper.css:4`, `packages/opui/components/AGENTS.md:478`)
  - Summary: Theming the selected or control accent recolors steppers and markers but not progress bars.
  - Recommended: Fix. One read, and the `custom-properties/progress.ts` description of `--_accent` changes with it.
  - Fix:
    ```css
    --_accent: var(--ui-selected-strong);
    ```
  > Fix
  - Fixed: `--_accent: var(--ui-selected-strong)` in `progress.css`. The guide's "a bar" meant the selection bar of a List row, so the roles list now names "the done part of a progress bar or track", and the `--ui-selected-strong` description names Progress, Stepper and Timeline. `--ui-control-accent` stays out: a progress bar isn't a control, and Range, which is, keeps reading it. Changed entry and What's new note added.
- [x] (2) Timeline: the current marker, its halo and the tracked line read `--ui-primary` and `--ui-on-primary` directly, while the guide names `--ui-selected-strong` and `--ui-on-selected-strong` for a current marker, which Stepper and Carousel read, so a theme that sets `--ui-selected-strong` recolors the Stepper but not the Timeline; the halo also uses `--ui-state-active-alpha-accent`, the pressed-state alpha, for a resting ring (`packages/opui/css/components/timeline.css:125-135`, `packages/opui/css/components/timeline.css:147-152`, `packages/opui/css/components/stepper.css:4`, `packages/opui/css/components/stepper.css:16`, `src/component-api/custom-properties/timeline.ts:27-30`)
  - Summary: A theme that changes the selected mark color recolors the Stepper's current step but not the Timeline's current item.
  - Recommended: Fix. The default of `--ui-selected-strong` is `--ui-primary`, so nothing changes in the default theme.
  - Fix: read the role, draw the fill from `--_marker-accent` like the severity rule does, and update the `--_line-border-color` description in `custom-properties/timeline.ts` and the `--ui-selected-strong` description in `src/utils/theme-token-descriptions.ts:366-367` to name Timeline (and Stepper, which it also leaves out).
    ```css
    & > li[aria-current] {
      --_marker-accent: var(--ui-selected-strong);

      &::before,
      & > .ui-marker {
        background-color: var(--_marker-accent);
        box-shadow: 0 0 0 var(--ui-space-1)
          oklch(
            from var(--_marker-accent) l c h /
              var(--ui-state-selected-alpha-accent)
          );
        color: var(--ui-on-selected-strong);
      }
    }

    &.ui-tracked > li:has(~ li[aria-current]) {
      --_line-border-color: var(--ui-selected-strong);

      &:not(.ui-critical, .ui-info, .ui-neutral, .ui-success, .ui-warning) {
        --_marker-accent: var(--ui-selected-strong);
      }
    }
    ```
  > Fix
  - Fixed: as proposed: the current marker and its halo read `--_marker-accent`, set to `--ui-selected-strong`, with `--ui-on-selected-strong` text and the halo at `--ui-state-selected-alpha-accent`, and the tracked line and the markers before the current item read `--ui-selected-strong`. The `--_line-border-color` description, the `--ui-selected-strong` and `--ui-on-selected-strong` descriptions and the Timeline Added entry name the role.
- [x] (2) CSS: `html` gets `scroll-behavior: smooth` under `prefers-reduced-motion: no-preference` only, so `.ui-motion-off` or a theme that sets `--ui-motion: 0` keeps smooth page scrolling, while the Carousel stops its own smooth scroll on both; the theming and accessibility guides document the exception (`packages/opui/core/normalize.css:30-32`, `packages/opui/css/components/carousel.css:69-79`, `packages/opui/core/utils.css:2-4`, `src/docs/guide/theming.astro:409-416`, `src/docs/guide/accessibility.astro:178-179`)
  - Summary: Turning motion off with the class or the token still animates anchor jumps and the scroll to a focused element.
  - Recommended: Fix with option A. It follows what the Carousel does, and `html` can't query its own `--ui-motion` with a style query, so the class is the only hook CSS has without a new token.
  - Fix: `html` can't read `--ui-motion` through `@container style()`, so the switch is either the class or a value the root reads directly.
  - Options:
    - A (recommended): stop smooth scrolling under the class and drop the two guide sentences that document the exception.
      ```css
      :where(html) {
        @media (prefers-reduced-motion: no-preference) {
          scroll-behavior: smooth;
        }

        &.ui-motion-off {
          scroll-behavior: auto;
        }
      }
      ```
    - B: a new theme token: an optional `--ui-scroll-behavior` read as `scroll-behavior: var(--ui-scroll-behavior, smooth)` on `html`, set to `auto` next to every `--ui-motion: 0` (the reduced-motion rule in `theme.css` and `.ui-motion-off` in `utils.css`). It would fill the role of the page's scroll behavior for a theme that turns motion off with the token alone; none of the example themes sets `--ui-motion: 0` today, so section 9 of `packages/opui/components/AGENTS.md` doesn't warrant it yet.
    - C: keep it, as documented.
  > Fix with option A
  - Fixed: with option A, both ways: `normalize.css` sets `scroll-behavior: auto` on `html.ui-motion-off` and `smooth` on `html.ui-motion-on`, since `.ui-motion-on` overrides a reduced-motion setting for every transition too. The accessibility guide says the classes turn the page's smooth scrolling off and on; the theming guide keeps one sentence for a theme that sets `--ui-motion: 0` on `html`, which still can't reach it, since `html` can't query its own `--ui-motion`.
- [x] (2) Dialog, Drawer: the header heading, the `.ui-content` scroll shadows with their two `scroll-state` queries, the footer with `.ui-actions`, and the inline-children stack rule are the same blocks in both files (the stack rule a third time in `card.css`), differing only in the anchor name, the footer gap (`--ui-space-2` against `--ui-space-3`) and `color` on the title (`packages/opui/css/components/dialog.css:51-144`, `packages/opui/css/components/drawer.css:62-212`, `packages/opui/css/components/card.css:177-224`)
  - Summary: Dialog and Drawer footers space their buttons differently, and about 120 lines are kept in step by hand.
  - Recommended: Fix. The parts were unified on purpose and the CSS can follow.
  - Fix: one `:where(.ui-dialog, .ui-drawer)` block in `components.root` for `> .ui-header`, `> .ui-content` (with `--_content-anchor` for the anchor name) and `> .ui-footer`, with a shared `--_footer-gap`, and the inline-children `:not(:has(> :is(...)))` list written once for `.ui-content` in card, dialog and drawer. Decide the footer gap first: `--ui-space-2` matches `card.css:172`.
  - Fixed: `card.css` holds the header, content (with the scroll shadows, through a `--_content-anchor` that keeps each anchor name) and footer rules of `:where(.ui-dialog, .ui-drawer)`, and the content stack rule for all four roots. The footer gap is `--ui-space-2` for both. Screenshots of the ten opened dialogs and drawers in both color schemes show no pixel change in Chromium. Drawer now lists `card.css` as a dependency, with a Breaking entry.
- [x] (2) OneTimeCode: `&.ui-one-time-code .ui-field` and `&.ui-one-time-code .ui-field:has(...)` repeat the root class to lift specificity over `text-field.css`, which is imported two lines later in the same `components.extended` layer and styles the same `.ui-field` (the root carries both `ui-text-field` and `ui-one-time-code`) (`packages/opui/css/components/one-time-code.css:24`, `packages/opui/css/components/one-time-code.css:101`, `packages/opui/css/components.css:50-52`, `packages/opui/components/OneTimeCode/OneTimeCode.astro:31-37`)
  - Summary: The one-time code field wins over the text field rules with a doubled class, which is the pattern the guide asks to avoid.
  - Recommended: Fix with option A. Token remaps remove the paint overrides, and the remaining layout overrides can then rely on source order within the file's own root.
  - Fix: confirm the field still has no border, background or focus ring on `/html/components/one-time-code/` after the change.
  - Options:
    - A (recommended): on `:where(.ui-one-time-code)` remap the tokens `text-field.css` reads instead of overriding its declarations: `--ui-field-bg-color: transparent; --ui-field-border-width: 0px; --ui-shadow-field: none;`, which drops `background: none`, `border: 0` and `box-shadow: none`; the grid and focus overrides that remain are the only ones that still need to beat `text-field.css`, so either move `one-time-code.css` after `text-field.css` in `components.css` for them, or drop `ui-text-field` from the root and list `.ui-one-time-code` in the `text-field.css` root `:where()` (as `.ui-number-field` is), so `one-time-code.css` can be imported after it without breaking the ascending import order's intent.
    - B: keep the doubled class and accept the exception.
  > Fix with option A
  - Fixed: with option A by import order: `one-time-code.css` is imported right after `text-field.css`, so its `.ui-field` rules win the ties on the same element and the doubled `&.ui-one-time-code` is gone from both rules. `tests/unit/layers.test.ts` now checks that each group imports in ascending order except a stylesheet in `BUILDS_ON`, which must follow the one it extends, with a sample it must flag, and section 10 of the components guide names the check. The token remap was left out: `--ui-field-bg-color: transparent` would also clear the `:autofill` inset shadow that paints `--_bg-color` over the browser's autofill color, and `--ui-field-border-width: 0px` would hide the theme's border width from the boxes, which the radius question wants to read.
- [x] (2) TextField: React has 8 `{" "}` and Vue 8 `{{ " " }}` between the children of `.ui-text-field` and `.ui-field`, which are grid containers where whitespace never renders, and Svelte and Vue write content edge to edge, so tags hug each other across lines. The same noise is in Textarea, Range, NumberField and Switch (`packages/opui/components/TextField/TextField.vue:135-213`, `scripts/component-layout.mjs:94-118`)
  - Summary: The compiled form controls are full of space placeholders that never render and tags that hug across lines.
  - Recommended: Fix. The tests already treat these spaces as not rendered, so only the noise goes.
  - Fix: in `component-layout.mjs`, drop whitespace between the children of an element that every matching library rule makes a flex or grid container (the inverse of `inlineLevelByCss`), and put an `{#if}` consequent and an element's children on their own lines when they start and end with a tag or block. Rerun the contract and parity tests. Found by the `framework-idioms` agent.
  - Fixed: `shapeWhitespace` (`scripts/component-layout.mjs`) drops the whitespace between the children of an element a rule on its own class makes a flex or grid container, when no rule that reaches it through its own class or without a context gives it another display, unless both neighbours can produce text. 34 of the 46 `{" "}` go. 12 stay where the compiler can't prove they never render: Copy's root and Switch's icon spans can be `display: contents` (the icon spans under Button's CSS), ToggleGroup's shrink layout makes a ToggleButton `display: block`, Stepper and Timeline render items that are components, and no class of their own makes the Badge, AccordionSummary, StepperItem and TimelineItem parents flex or grid. Svelte and Vue put the content of an element or block on its own lines where their compilers drop the edge whitespace, Vue puts `v-else` on its own line, and Svelte renders a snippet its `{#if}` tests without `?.` (14 renders). Vue keeps a hugging tag where the content starts or ends with an interpolation or the element hugs a sibling, since oxfmt would pad it with a space.
- [x] (1) Button: the Accessibility bullet says a `<kbd>` hint is part of the name and the shortcut needs your own script, but it doesn't say to expose the shortcut with `aria-keyshortcuts`. As a result, the Keyboard example's buttons give their keys only inside the name ("Terminal Ctrl+Alt+T") (`src/docs/components/button.astro:153-158`, `src/component-examples/button/Keyboard.html:1-12`)
  - Summary: Screen readers read a button's shortcut as part of its name, not as its shortcut.
  - Recommended: Fix. It is one attribute per button, and the bullet already asks readers to write the script.
  - Fix: add `aria-keyshortcuts` (`Control+Alt+T`, `Meta+Space`, `Meta+L`) to the three buttons in all five formats, and end the bullet with "and name it in `aria-keyshortcuts`".
  - Fixed: The Keyboard example's buttons carry `aria-keyshortcuts` (`Control+S`, `Control+K` and `Control+Alt+M`, the shortcuts from the Keyboard item) in all five formats, and the bullet ends with "and name it in `aria-keyshortcuts`".
- [x] (1) Accordion: `accordion.css` repeats the defaults and the variant blocks that `card.css` already applies to `.ui-accordion`, with the same values. Its base rule sits in `components.extended`, so its `--_bg-color: transparent` and the defaults next to it beat the `card.css` variants, and every variant has to be set again (`packages/opui/css/components/accordion.css:11-31`, `packages/opui/css/components/accordion.css:46-74`, `packages/opui/css/components/card.css:2-26`, `packages/opui/css/components/card.css:47-77`)
  - Summary: A change to a card variant has to be made again in the accordion stylesheet, or the two drift apart.
  - Recommended: Fix. Removing the repeats changes no pixel in the Accordion, Card and Dialog examples.
  - Fix: from `:where(details.ui-accordion)`, delete:
    - the `--_bg-color`, `--_border-color`, `--_border-width` and `--_shadow` defaults;
    - the `background-color`, `border` and `box-shadow` declarations;
    - the `--_bg-color` line in `&:not(.ui-transparent)`;
    - the four variant blocks: `:is(.ui-elevated, .ui-tonal)`, `.ui-elevated`, `.ui-outlined` and `.ui-tonal`.

    `card.css` supplies the same values. The group rule still sets the four properties, so `custom-properties/accordion.ts` keeps them.

    Checked in Chromium on 48 accordions and summaries: five variants in light and dark, in groups, nested in an elevated card, with `--ui-border-color-raised` and with `.ui-contrast-more`. Computed styles and the screenshot were identical. The Accordion, Card and Dialog examples render the same.

  - Fixed: Removed the four defaults, the three declarations, the `--_bg-color` line in `&:not(.ui-transparent)` and the four variant blocks. Checked in Chromium on 180 accordion, summary and actions elements per color scheme (five variants alone, in an elevated card, with `.ui-contrast-more` and with `--ui-border-color-raised`, and groups in every card variant): the computed background, border, shadow, radius, padding, margin and overflow are identical before and after, in light and dark mode, and so are the full-page screenshots. The group rule still sets the four properties, so `custom-properties/accordion.ts` keeps them.
- [x] (1) Accordion: the summary's `background-color: inherit` paints nothing. A `summary` inherits from its slot in the `details` element's internal shadow tree, not from the accordion, so it computes to `transparent` (`packages/opui/css/components/accordion.css:92-93`)
  - Summary: The accordion summary looks the same without its background rule, which never paints.
  - Recommended: Fix. The declaration has no effect, and the accordion's background already shows through the summary.
  - Fix: delete `background-color: inherit` from `& > summary`. Checked in Chromium: a tonal accordion is `oklch(0.93 0.01 255)` and its summary computes to `rgba(0, 0, 0, 0)`, while a plain `div` with the same declaration does inherit its parent's color.
  - Fixed: Deleted. Checked in Chromium: the summary of a tonal accordion computed to `rgba(0, 0, 0, 0)` before, and the computed styles and screenshots of every variant are the same after.
- [x] (1) Badge: `anchor.css` lists `.ui-badge` with the anchors, and `badge.css` cancels what that adds to the always-visible indicator (`position-anchor: auto`, `position-area: none`, its own `translate`) and places the indicator with insets. So `badge.css` is in `components.extended` only to undo `anchor.css`, while the guide and MIGRATING say `anchor.css` positions the badge (`packages/opui/css/components/badge.css:26-34`, `packages/opui/css/components/anchor.css:2-19`, `packages/opui/components/AGENTS.md:152`, `packages/opui/components/AGENTS.md:581`, `packages/opui/MIGRATING.md:132`)
  - Summary: The guide and the migration notes say the anchor stylesheet positions the badge, but the badge undoes it and places itself with insets.
  - Recommended: Fix with option A. It changes no pixel and removes the override.
  - Fix: Option A renders the Badge, Avatar, Tooltip and Anchor examples identically in Chromium, both left to right and right to left. Option B is untested.
  - Options:
    - A (recommended): take `.ui-badge` out of the `anchor.css` root list. In `badge.css`, the floating rule declares the parts it still used from `anchor.css` and drops the cancelling declarations and the comment about engines without `position-area`, and the file declares `components.root` and moves to the root group of `css/components.css`. Drop `anchor` from `css` and the root `anchorName` in `src/component-api/badge/api.ts`, remove the `anchor.css` dependency from `src/docs/components/badge.astro`, and reword the two guide lines (another file becomes the extended example) and the MIGRATING line.
      ```css
      & > .ui-floating {
        block-size: max-content;
        inline-size: max-content;
        inset-block: var(--_inset-block);
        inset-inline: var(--_inset-inline);
        position: absolute;
        translate: calc(var(--_shift-x) * var(--_direction)) var(--_shift-y);
      }
      ```
    - B: place the indicator with `position-area` for real. It is logical, so `--_direction` and the `:dir(rtl)` rule go away, but the round-avatar and dot offsets then need `anchor()` insets or margins.
  - Fixed: Fixed with option A. `anchor.css` no longer lists `.ui-badge`. `badge.css` declares `components.root`, moves to the root group of `css/components.css`, and its floating rule declares `block-size`, `inline-size`, `position` and the insets instead of cancelling `position-anchor` and `position-area`. Option A missed one declaration: the root also needs `inline-size: fit-content` from `anchor.css`, or a badge in a column flex container stretches to the full width (checked in Chromium). The comment above the floating rule stays, since it still says why the badge uses insets. The API drops `anchor` from `css` and the root `anchorName`, the page drops the `anchor.css` tab, `scripts/check-browser-support.mjs` drops the Badge `anchor-positioning` ignore, the guide names Tooltip as the extended example, and MIGRATING, What's new, the CHANGELOG Breaking entry and the BadgeBuild Corner note say `badge.css` positions the badge. The Badge, Avatar, Tooltip and Anchor HTML examples render the same, pixel for pixel, in Chromium, left to right, right to left and dark.
- [x] (1) Badge: `--_size` names the indicator's height and minimum width. The naming rule keeps `--_size` for a control's size and gives a part's size the part's prefix (`--_icon-size`, `--_thumb-size`). The Badge isn't a control and already calls the dot's size `--_dot-size` (`packages/opui/css/components/badge.css:18`, `packages/opui/css/components/badge.css:43-52`, `src/component-api/custom-properties/badge.ts:79-82`, `packages/opui/components/AGENTS.md:516`)
  - Summary: The Badge custom properties table lists `--_size` for the indicator, a name that means a control's size everywhere else.
  - Recommended: Fix with option A. 6.0 already renames private properties with a MIGRATING row, so one more Badge row costs readers nothing new.
  - Fix: rename it `--_indicator-size` in `badge.css` and `src/component-api/custom-properties/badge.ts`, keeping the keys sorted. Confirm 5.4.3 had no Badge `--_size`; if it did, add a MIGRATING row.
  - Explained: 5.4.3 shipped `--_size` in `badge.css` (`--_size: var(--size-4)`), so the rename changes a shipped name and is left for a decision. The Breaking entry on private properties promises that MIGRATING lists every rename, and its table already has Badge rows for `--_badge-inset` and `--_anchor-tx`.
  - Options:
    - A (recommended): Rename it `--_indicator-size` in `badge.css` and `src/component-api/custom-properties/badge.ts`, keeping the keys sorted, and add a row to the private property table in MIGRATING: `| Badge | --_size | --_indicator-size |`.
    - B: Keep `--_size`, and name the Badge indicator in the `--_size` rule of `packages/opui/components/AGENTS.md` as the one part that keeps the bare name.
  - Fixed: with option A in cabf8ba9. The indicator size is `--_indicator-size` in `badge.css`, `custom-properties/badge.ts` and the customizing guide, with a `| Badge | --_size | --_indicator-size |` MIGRATING row, since 5.4.3 shipped `--_size`, and the private-properties Breaking entry names it.
- [x] (1) Button: the current page (`aria-current="page"`) uses `--_current-bg-color`, `--_current-text-color` and `--_tonal-current-bg-color`. `List` names the same state and the same tint `--_selected-bg-color`, and the naming rule gives the chosen item `selected` (`packages/opui/css/components/button.css:28-31`, `packages/opui/css/components/button.css:83-91`, `packages/opui/css/components/button.css:224-227`, `packages/opui/css/components/list.css:279-281`, `packages/opui/components/AGENTS.md:517`)
  - Summary: The Button and List custom property tables name the fill of the current page with two different words.
  - Recommended: Fix. Only the Button stylesheet and its custom properties file use the names.
  - Fix: rename them `--_selected-bg-color`, `--_selected-text-color` and `--_tonal-selected-bg-color` in `button.css` and `src/component-api/custom-properties/button.ts`, keeping the keys sorted. The CHANGELOG and MIGRATING don't name them. Confirm 5.4.3 had none of the three.
  - Fixed: 5.4.3 had none of the three. They are `--_selected-bg-color`, `--_selected-text-color` and `--_tonal-selected-bg-color` in `button.css` and `custom-properties/button.ts`, sorted. The skill references in `packages/opui/skills/opui/references` name the old properties until the build regenerates them.
- [x] (1) Button: `button.css` styles every native `<input type="file">` on the page (`:where(input[type="file"])` gets a field border, radius and shadow), although no Button renders one and the file input is documented and styled under Text field. Importing `button.css` on its own, as the README offers, restyles file inputs that aren't opui's (`packages/opui/css/components/button.css:502-517`, `packages/opui/css/components/text-field.css:201-233`, `packages/opui/README.md:163`)
  - Summary: Importing only the Button stylesheet adds a border to every plain file input on the page, including ones from other libraries.
  - Recommended: Fix with option A. It keeps the look of a plain file input and leaves the Button stylesheet to buttons.
  - Fix: inside a `TextField`, the only thing these rules still set is the input's 5px radius, which no border shows; `text-field.css` sets the rest (checked in Chromium on the File and DropZone examples).
  - Options:
    - A (recommended): move both rules to `core/normalize.css`, next to the `::file-selector-button` font reset, so a plain file input keeps its look as a base style, like `fieldset`. Log it under Changed for anyone importing stylesheets one at a time.
    - B: delete them. A plain file input gets the browser's look, and the `TextField` file field stays as it is.
  - Fixed: Fixed with option A: both rules move unchanged from `button.css` to `core/normalize.css`, after the cursor rule instead of next to the `::file-selector-button` reset, since that rule's `cursor: pointer` would otherwise beat `cursor: initial`. The computed styles and screenshots of a plain file input and the TextField File and DropZone examples are the same in Chromium, light and dark. A `normalize.css` entry under Changed says importing `button.css` on its own no longer restyles file inputs.
- [x] (1) Checkbox, Radio, Switch: the disabled rule sets `-webkit-user-select: none` and `user-select: none` again on the root, which already sets both (`packages/opui/css/components/choice.css:36-37`, `packages/opui/css/components/choice.css:48-57`)
  - Summary: A disabled choice repeats a text-selection rule that its label already has.
  - Recommended: Fix. The two lines do nothing.
  - Fix: delete the two declarations from the `&:has(:disabled, input[aria-disabled="true"])` block. Nothing else sets `user-select` on the root.
  - Fixed: The two declarations are gone from the disabled rule in `choice.css`. Every other `user-select` that can reach a choice root also sets `none`, and screenshots of the choice examples are unchanged.
- [x] (1) Checkbox, Radio, Switch: the layout of a choice with `.ui-card` depends on import order. `card.css` gives `.ui-card` `display: flex` and a `gap` from a zero-specificity root in `components.root`. `choice.css` overrides both from its own zero-specificity root in the same layer, and only the alphabetical import order puts `choice.css` second (`packages/opui/css/components/choice.css:2-37`, `packages/opui/css/components/card.css:2-35`, `packages/opui/css/components.css:14-18`, `packages/opui/css/components/choice.css:227-236`)
  - Summary: Renaming or reordering a stylesheet would turn every choice card into a stacked flex column without a test failing.
  - Recommended: Fix with option A. The repo already uses this import-order rule for `one-time-code.css`, and the layers test guards it.
  - Fix: checked in Chromium: with `choice.css` imported before `card.css`, a checkbox card goes from `inline-grid` at 72.5px tall to `flex` at 124.5px.
  - Options:
    - A (recommended): add `"choice.css": "card.css"` to `BUILDS_ON` in `tests/unit/layers.test.ts` and import `choice.css` right after `card.css`. With that order, the Checkbox, Radio, Switch, Card, Carousel and Chip examples render the same in Chromium.
    - B: declare the layout in the `.ui-card` block, `display: inline-grid` and `row-gap: 0`, so it wins by its class like the `overflow` and `padding` next to it. Choice cards then render the same with either import order.
  - Fixed: Fixed with option B instead of A: the `.ui-card` block in `choice.css` declares `display: inline-grid` and `row-gap: 0`, so they win by class like the `overflow` and `padding` next to them. Option A only fixes the order inside `components.css`, while Getting started tells readers to import only the files they need and the Checkbox page lists `card.css` after `choice.css`. Checked in Chromium: with `choice.css` imported first and `card.css` last, every Checkbox, Radio and Switch example now matches the bundled order pixel for pixel (before, the CardsMatrix examples grew from 297 to 401px). The CHANGELOG Added entry for choice cards says so.
- [x] (1) CSS: the autofill reset repeats each selector with `:hover` and `:focus`. That specificity bump does nothing inside the `normalize` layer, where no other rule sets these properties and the component layers win whatever the specificity, and it forces two exceptions in the Stylelint config (`packages/opui/core/normalize.css:102-114`, `stylelint.config.mjs:68-89`)
  - Summary: The autofill reset lists nine selectors where one does, and the lint config carries two exceptions just for them.
  - Recommended: Fix. The layer makes the specificity bump pointless, and the lint exceptions go with it.
  - Fix: replace the nine selectors with one, and drop the `except` lists of `opui/focus-visible` and `opui/hover-media` for `core/normalize.css`. Confirm by autofilling a plain email input in Chromium, hovered and focused.
    ```css
    :where(input, select, textarea):autofill {
      -webkit-text-fill-color: var(--ui-text);
      box-shadow: 0 0 0px 1e5px var(--ui-field-bg-color, var(--ui-surface))
        inset;
      transition: background-color 5000s ease-in-out 0s;
    }
    ```
  - Fixed: One selector, `:where(input, select, textarea):autofill`, and `stylelint.config.mjs` drops the `except` lists of `opui/focus-visible` and `opui/hover-media` for `core/normalize.css`. Checked in Chromium with `Autofill.trigger` on a card number field: the autofilled input gets the inset box shadow and the text fill at rest, hovered and focused.
- [x] (1) CSS: `html` switches smooth scrolling with a reduced-motion media query and the `.ui-motion-off` and `.ui-motion-on` classes, so a theme that sets `--ui-motion: 0` on `html` still scrolls smoothly. `if(style(--ui-motion: 0))` can read the token on `html` itself (`packages/opui/core/normalize.css:30-40`, `packages/opui/css/theme.css:623-627`, `packages/opui/core/utils.css:6-16`)
  - Summary: A theme that turns motion off with the token still animates anchor jumps and scrolling to a focused element.
  - Recommended: Fix with option B. Chromium then follows the token without taking smooth scrolling away from Firefox and Safari.
  - Fix: the done item on smooth scrolling chose the classes because `html` couldn't query its own `--ui-motion`. `if()` evaluates `style()` against the element itself, which `control-group.css:149-156` already relies on. Checked: `--ui-motion: 0` gives `auto`, and `1` and `10` give `smooth`, with and without reduced motion.
  - Options:
    - A (recommended): one declaration. Firefox and Safari don't run `if()` yet, so they keep the browser default `auto` until they ship it.
      ```css
      :where(html) {
        scroll-behavior: if(style(--ui-motion: 0): auto; else: smooth);
      }
      ```
    - B: keep the three rules for Firefox and Safari and add the declaration after them, so only Chromium also follows a theme's token.
    - C: keep it as is.
  - Fixed: between options A and B. `normalize.css` sets `scroll-behavior: if(style(--ui-motion: 0): auto; else: smooth)` on `html`, and keeps the media query and the two class rules for Firefox and Safari inside `@supports not (inline-size: if(else: 0px))`, since a declaration after nested rules fails `pnpm sort-css:check` and one before them loses to the media query. `tests/e2e/theming.spec.ts` checks it with reduced motion, both classes and a `--ui-motion: 0` set on `html`. The Carousel, the Spinner opacity and the heading group subtitle color read their switch with `if()` too, with the style queries they replaced in the compat layer.
  - Explained: Option A takes away something that works: Firefox and Safari scroll smoothly under no-preference today and would stop until they ship `if()`. Option B keeps that, and the policy allows it, since the three rules change no API and the `if()` declaration after them wins in Chromium, where the motion classes agree with the token anyway. A stricter B puts the three rules in a compat file inside `@supports not (scroll-behavior: if(style(--x: 0): auto; else: smooth))`, so `tests/unit/compat.test.ts` retires them once `if()` is widely available; the compat layer comes after `normalize`, so they still win where they apply, but it needs a compat file for `normalize.css`, which isn't a component. Either way, the 6.0 Changed entry on the motion classes and `src/docs/guide/accessibility.astro:211` describe the scroll rules and need the same update.
- [x] (1) ControlGroup: `.ui-overflow-scroll` sets `scrollbar-width: thin`, which `normalize.css` already sets on every element. `tabs.css`, `table.css`, `toggle-group.css` and the prose `pre` in `typography.css` repeat it too (`packages/opui/css/components/control-group.css:357`, `packages/opui/core/normalize.css:10-12`)
  - Summary: Nothing visible; five component rules repeat a declaration the reset already makes.
  - Recommended: Fix. It follows the done tap highlight and box sizing items, whose copies of normalize declarations were dropped.
  - Fix: drop `scrollbar-width: thin` from `control-group.css:357`, `tabs.css:301`, `table.css:156`, `toggle-group.css:52` and `typography.css:267`.
  - Fixed: Dropped from `control-group.css`, `tabs.css`, `table.css`, `toggle-group.css` and `typography.css`, and `node scripts/check-browser-support.mjs --write` dropped `scrollbar-width` from the browserSupport of the ControlGroup, Table, Tabs, Toggle and Typography pages.
- [x] (1) ControlGroup: `--_divider-border-color-enabled` and `--_divider-border-color-disabled` put the state after the suffix. Every other private property names the state first (`--_button-disabled-border-color`, `--_outlined-hover-border-color`, `--_marker-selected-bg-color`) (`packages/opui/css/components/control-group.css:5-17`, `packages/opui/css/components/control-group.css:263-271`, `src/component-api/custom-properties/control-group.ts:19-28`)
  - Summary: Two ControlGroup property names read differently from every other state name in the package.
  - Recommended: Fix. Both names are new in 6.0, so the rename touches no released API.
  - Fix: rename them to `--_divider-enabled-border-color` and `--_divider-disabled-border-color` in `control-group.css` and `custom-properties/control-group.ts`, then regenerate the skill reference.
  - Fixed: They are `--_divider-enabled-border-color` and `--_divider-disabled-border-color` in `control-group.css`, the compat file and `custom-properties/control-group.ts`, sorted. 5.4.3 had neither: its ButtonGroup used `--_divider-color`. The skill reference regenerates with the build.
- [x] (1) ControlGroup: the start-border rule is written twice, once per axis, and each copy carries the same forced-colors block (`ButtonBorder`, and `SelectedItem` for `aria-current="page"`). Only the property differs (`packages/opui/css/components/control-group.css:306-346`)
  - Summary: Nothing visible; the forced-colors colors of the line between buttons are kept in two places.
  - Recommended: Fix. One custom property replaces the second forced-colors block, and the open wrapped-row item on these lines can land in the same change.
  - Fix: in a `@media (forced-colors: active)` block on the group, set `--_start-border-color: ButtonBorder`, and set `SelectedItem` on `& > .ui-button[aria-current="page"]`. The two axis rules then only read `var(--_start-border-color)`.
  - Fixed: The two axis rules only read `var(--_start-border-color)`. The forced-colors block on each button (`& > .ui-button`) sets it to `ButtonBorder`, and `SelectedItem` on `[aria-current="page"]`, instead of the item's block on the group: the compat layer sets `--_start-border-color` on the group and beats the extended layer there, while a value on the button always wins over the inherited one. Checked in Chromium with forced colors: every edge is `ButtonBorder` and the current page `SelectedItem`, horizontal and vertical.
- [x] (1) Dialog, Drawer: the backdrop is written twice. Both files declare `--_backdrop-bg-color` and `--_backdrop-blur`, the same `::backdrop` rule, the closed `display: none`, and the open backdrop fade with its `@starting-style`. The shared `:where(.ui-dialog, .ui-drawer)` block in `card.css` already holds their parts (`packages/opui/css/components/dialog.css:4-5,31-43,55-74`, `packages/opui/css/components/drawer.css:4-5,46-54,121-141`, `packages/opui/css/components/card.css:333-342`)
  - Summary: Nothing visible; the two overlays' backdrops and open and close rules are kept in step by hand.
  - Recommended: Fix. It finishes the move of the shared overlay rules into `card.css`.
  - Fix: move the backdrop rules into the `card.css` block. Move `--_motion`, `--_duration`, `--_ease` and the open `--_ease` swap with them, because a `components.root` rule can't beat the `--_ease` that `dialog.css` sets in `components.extended`. Each file keeps its own box transition: scale and opacity in `dialog.css`, translate in `drawer.css`. `.ui-backdrop-transparent` stays in `drawer.css`.
  - Fixed: Fixed: `card.css` holds `--_backdrop-bg-color`, `--_backdrop-blur`, the `::backdrop` rule, the closed `display: none` and the open backdrop fade with its `@starting-style` for `.ui-dialog` and `.ui-drawer`. `dialog.css` and `drawer.css` keep their box transitions, and `.ui-backdrop-transparent` stays in `drawer.css`. Moving `--_motion`, `--_duration`, `--_ease` and the open `--_ease` swap wasn't needed: `::backdrop` inherits them from its dialog whatever layer sets them, so they stay in each file. Checked in Chromium by comparing every computed property of both overlays and their backdrops, closed, opening, open and closing, with and without reduced motion: only the order of the drawer backdrop's transition list changed. The backdrop properties are documented in `custom-properties/card.ts`, and the Drawer Breaking entry and MIGRATING say the backdrop and the closed state come from `card.css` too.
- [x] (1) List: the three selected-item blocks declare `--_description-text-color` after `background-color`, `box-shadow` and `color`. They are the only blocks in the package with a private property after regular declarations. `sort-css` only orders private properties among themselves, so it passes (`packages/opui/css/components/list.css:206-217`, `packages/opui/css/components/list.css:237-245`, `packages/opui/css/components/list.css:279-287`)
  - Summary: Nothing visible; three List blocks break the custom-properties-first order every other block follows.
  - Recommended: Fix. Moving the line changes no computed value.
  - Fix: move `--_description-text-color` to the top of each block. To keep it there, `scripts/sort-css.mjs` could move a `--_` property ahead of the regular declarations in its block, the case `button-group.css` had before.
  - Fixed: `--_description-text-color` moved to the top of the three selected-item blocks; no computed value changes. `scripts/sort-css.mjs` doesn't enforce the order yet: after this change no stylesheet in the package has a `--_` property after a regular declaration, so the rule could land with its check later.
- [x] (1) List: in a dense list, `.ui-button:has(> svg:only-child)` in `.ui-start` or `.ui-end` gets `max-inline-size: var(--_start-size)`. The button's own `min-inline-size: var(--_size)` overrides it, so the cap does nothing. Only the `svg` in the same selector list shrinks the icon (`packages/opui/css/components/list.css:150-153`, `packages/opui/css/components/button.css:311-315`)
  - Summary: Nothing visible; a rule meant to narrow icon buttons in dense list rows has no effect.
  - Recommended: Fix. Removing the selector changes nothing; measured, the button is 40px wide with a 16px max.
  - Fix: drop `.ui-button:has(> svg:only-child)` from the list. If dense rows should get a smaller icon button, set `--ui-button-size: var(--ui-button-size-x-small)` in the `components.root` dense block at lines 441-455, where a size class on the button beats it.
  - Fixed: `.ui-button:has(> svg:only-child)` is gone from the dense rule. Measured before: the button stayed 40px wide, only its `svg` shrank to 16px, which the remaining `svg` selector still does. A smaller icon button in dense rows would be a design change and isn't part of this.
- [x] (1) List: two rules undo an `option::before` checkmark that Chromium no longer draws. One is `&::before { display: none }` on every item ("removing checkmark from option"), the other `visibility: visible` on the separator ("override select > option:before style"). The checkmark is `::checkmark` now, and `select.css` hides it (`packages/opui/css/components/list.css:101-111`, `packages/opui/css/components/list.css:194-197`, `packages/opui/css/components/select.css:150-152`)
  - Summary: Nothing visible; two List declarations override a browser style that no longer exists.
  - Recommended: Fix. An option's `::before` has `content: none` in both a customizable and a native picker.
  - Fix: delete the `&::before` block at lines 194-197, and `visibility: visible` with its comment at lines 109-110. The separator sets its own `display: block`.
  - Fixed: The `&::before { display: none }` block and `visibility: visible` with its comment are gone. Checked in Chromium: an option's and an item's `::before` has `content: none`, and the separator rule keeps its own `display: block`.
- [x] (1) Menu: the formula that keeps a submenu of a submenu on its flipped parent's side is waiting for Lightning CSS to parse an `anchored(fallback: flip-inline)` container query, which Chromium 143 supports. No entry in `tooling-bugs.test.ts` fails once it does. Lightning CSS 1.33 still throws `Unexpected token Function("anchored")` (`packages/opui/css/components/menu.css:126-140`, `tests/unit/tooling-bugs.test.ts:72-94`)
  - Summary: Nothing visible; the submenu workaround has no test that says when it can go.
  - Recommended: Fix. The test file already reproduces a Lightning CSS bug the same way.
  - Fix: add a case next to the animation-timeline one.
    ```ts
    test("Lightning CSS rejects an anchored() container query", () => {
      const astro = createRequire(import.meta.url).resolve("astro/package.json")
      const vite = createRequire(astro).resolve("vite")
      const { transform } = createRequire(vite)("lightningcss")
      expect(
        () =>
          transform({
            code: Buffer.from(
              "@container anchored(fallback: flip-inline){.a{color:red}}",
            ),
            filename: "a.css",
          }),
        fixed(
          "packages/opui/css/components/menu.css, the inset formula for submenus of submenus",
        ),
      ).toThrow()
    })
    ```
  - Fixed: Fixed: `tests/unit/tooling-bugs.test.ts` has the case, and it expects the error to name `Function("anchored")`, so another parse error can't pass it.
- [x] (1) Checkbox, Radio: both stylesheets declare the same input block. That is the four properties `--_border-color`, `--_border-width`, `--_mark-bg-color` and `--_rest-border-width`, eleven declarations from `appearance: none` to `transform-style`, and the `:focus-visible` border. The components guide asks a shared stylesheet to declare these once, and `choice.css` already styles both inputs (`packages/opui/css/components/checkbox.css:4-36`, `packages/opui/css/components/checkbox.css:60-69`, `packages/opui/css/components/radio.css:4-37`, `packages/opui/css/components/radio.css:67-76`, `packages/opui/css/components/choice.css:95-135`)
  - Summary: The checkbox and radio inputs share about 25 lines written twice, so their sizing and focus border can drift apart.
  - Recommended: Fix. `choice.css` already holds the shared ripple for the same two inputs.
  - Fix: - Move the four properties, the eleven declarations and the `:focus-visible` block into the `input:is([type="checkbox"], [type="radio"])` rule under `&:where(.ui-checkbox, .ui-radio)` in `choice.css`.
    - Keep `border-radius`, the checkbox's grid and the radio's `--_dot-radius` in their own files.
    - `choice.css` is imported after `checkbox.css`, at the same specificity. Write the checkbox's forced-colors `border-color: CanvasText` as `--_border-color: CanvasText`, as `radio.css` does, or it loses to the moved `border`.
  - Fixed: The four properties, the ten shared declarations (`transform-style` is gone with the halo item) and the `:focus-visible` block are in the `input:is([type="checkbox"], [type="radio"])` rule of `choice.css`; `checkbox.css` keeps `border-radius`, `display`, `font-size` and `place-items`, and `radio.css` `--_dot-radius` and `border-radius`. The forced-colors `CanvasText` border moved to `choice.css` as `--_border-color: CanvasText` as well: a `--_border-color` in `checkbox.css` would lose to the default `choice.css` declares later at the same specificity. Screenshots of every choice example in light, dark and forced colors, hovered, pressed and focused, and with `--ui-choice-checked: mark` and focus border tokens, match the previous CSS pixel for pixel. The custom properties of `choice.ts`, `checkbox.ts` and `radio.ts` follow the move.
- [x] (1) Range: the narrow spread layout sets `grid-column: 1/-1` on every descendant with `*`, then sets it again on each of the six parts it places. The `*` rule changes nothing (`packages/opui/css/components/range.css:192-231`)
  - Summary: The narrow layout of a spread range carries a catch-all rule that every following rule repeats.
  - Recommended: Fix. Deleting the three lines changes no layout.
  - Fix: drop `* { grid-column: 1/-1; }`. TextField's narrow spread layout lists its parts the same way without one.
  - Fixed: Dropped the `*` rule. In Chromium at 360px, every element of the Spread, Tick marks, Value, Hidden label and Start and end text examples, made spread, has the same box with and without it; only the computed `grid-column` of the datalist options and the hidden label changes, and neither is placed by the grid.
- [x] (1) Stat: `.ui-label` and `.ui-description` repeat the same three declarations: `color: var(--ui-text)`, the caption font size and `--ui-line-height` (`packages/opui/css/components/stat.css:13-31`)
  - Summary: The stat label and description styles are written twice, so a change to one can miss the other.
  - Recommended: Fix. One selector list keeps them in step at the same specificity.
  - Fix:
    ```css
    & > :is(.ui-label, .ui-description) {
      color: var(--ui-text);
      font-size: var(--ui-font-size-caption);
      line-height: var(--ui-line-height);
    }
    ```
  - Fixed: `stat.css` styles `.ui-label` and `.ui-description` with one `& > :is(.ui-label, .ui-description)` rule.
- [x] (1) CSS: two state fills are literal black and white instead of colors derived from a role. The dark selected Tabs pill is `oklch(100% 0 0 / var(--ui-state-hover-alpha-dark))`, which also reads a hover knob for a selected state. The hovered ToggleButton is `oklch(0% 0 0 / …)` in light and `oklch(100% 0 0 / …)` in dark, while Button derives the same hover from its accent (`packages/opui/css/components/tabs.css:13-16`, `packages/opui/css/components/toggle-button.css:52-59`, `packages/opui/css/components/button.css:36-39`)
  - Summary: The selected tab and the hovered toggle button stay neutral gray when a theme tints its grays.
  - Recommended: Fix. Deriving from the strong text role stays close to today's look and follows the gray knobs.
  - Fix: derive both from `--ui-text-strong`.
    ```css
    /* tabs.css */
    --_selected-bg-color: light-dark(
      var(--ui-surface),
      oklch(from var(--ui-text-strong) l c h / var(--ui-state-hover-alpha-dark))
    );

    /* toggle-button.css */
    --_bg-color: light-dark(
      oklch(
        from var(--ui-text-strong) l c h / var(--ui-state-hover-alpha-light)
      ),
      oklch(from var(--ui-text-strong) l c h / var(--ui-state-hover-alpha-dark))
    );
    ```
  - Explained: Measured in Chromium with the default theme: the hovered toggle button goes from `oklch(0 0 0 / 0.1)` to `oklch(0.16 0.01 255 / 0.1)` in light mode and from white to `oklch(0.98 0.01 255 / 0.2)` in dark mode, and the dark selected tab moves the same way, so the default look barely changes. The default grays are already a little blue (`c 0.01`, `h 255`), which the fix picks up. Since it changes how every theme with tinted grays looks, the example puts today and the fix side by side, with the default grays and with simulated violet grays. Example: state-fill-tint
  - Fixed: in 1a60e3f1. The dark selected Tabs pill is `--ui-text-strong` at `--ui-state-selected-alpha-accent` (25%, 15% with more contrast) and the hovered ToggleButton is `--ui-text-strong` at the hover alphas. Both follow tinted theme grays such as m3, and selected text keeps at least 5.14:1 on the dark pill in every theme.
- [x] (1) Package: the `clamp()` heading sizes for browsers without `progress()` sit in `theme.css` instead of the `components.compat` layer. As a result, `dist/opui.no-compat.css`, documented as having no fallbacks, ships them; `dist/opui.baseline-2026.css` keeps them although `progress()` is Baseline 2026; and `compat.test.ts` won't flag them once `progress()` is widely available (`packages/opui/css/theme.css:270-291`, `packages/opui/scripts/features.mjs:19-29`, `packages/opui/scripts/features.mjs:160-165`, `tests/unit/compat.test.ts:93-114`, `src/docs/guide/browser-support.astro:164`)
  - Summary: The no-fallbacks bundle still carries one fallback, and the 2026 bundle keeps one its browsers don't need.
  - Recommended: Fix with option A. It keeps the fallback next to the tokens it sets and lets the existing build and test rules retire it.
  - Fix: checked on the bundles in `packages/opui/dist`: every `opui.baseline-<year>.css` and `opui.no-compat.css` contains `@supports not (font-size: calc(1rem * progress(1, 0, 1)))`, and `keepsFallback` returns false for it from 2026.
  - Options:
    - A (recommended): let `withoutCompat()` and `baselineYear()` also strip the `@supports not (...)` blocks of the theme layers, and run the one-feature, not-widely-available check of `tests/unit/compat.test.ts` on them too.
    - B: move the block into `css/compat/typography.css` as token overrides on `:where(html, .ui-palette, .ui-contrast-more)`. In browsers without `progress()` they then beat a theme's own heading sizes, since `components.compat` comes after the theme layers.
    - C: keep it, and say in the README and the browser support guide that `theme.css` keeps one fallback in every bundle.
  - Fixed: Option A: `themeFallbacks()` in `packages/opui/scripts/features.mjs` finds the `@supports not (...)` blocks of the `theme.*` layers. `withoutCompat()` removes them, and `baselineYear()` removes the ones `keepsFallback()` drops. Checked on bundles built with the plugins: `opui.css` and `opui.baseline-2025.css` keep the `progress()` fallback, `opui.baseline-2026.css` and `opui.no-compat.css` don't. `tests/unit/compat.test.ts` runs the one-feature, not-widely-available check on the theme's conditions too, with a sample. The README's compat paragraph names the theme's fallbacks, and the 6.0 Breaking entry on the heading sizes says which bundles leave out the `clamp()` sizes.
- [x] (1) Stepper: the completed and the error marker repeat `color: transparent` and the same five mask declarations, differing only in `--_check-image` and `--_error-image` (`packages/opui/css/components/stepper.css:138-145`, `packages/opui/css/components/stepper.css:162-169`)
  - Summary: The completed and error step markers are drawn by two copies of one rule that have to be kept in step by hand.
  - Recommended: Fix. One rule with a private image property matches how the component already passes its colors.
  - Fix: set a `--_marker-image` in each state's existing block, draw the mask once, and document the property in `custom-properties/stepper.ts`. The `.ui-icon-checked` rule that sets `mask: none` still wins on specificity.
    ```css
    & > li:has(~ [aria-current="step"]),
    & > li.ui-complete {
      --_marker-image: var(--_check-image);
    }

    & > li.ui-error {
      --_marker-image: var(--_error-image);
    }

    &
      > :is(
        li:has(~ [aria-current="step"]),
        li.ui-complete,
        li.ui-error
      )::before {
      color: transparent;
      mask-composite: exclude;
      mask-image: var(--_marker-image), linear-gradient(oklch(0% 0 0) 0 0);
      mask-position: center;
      mask-repeat: no-repeat;
      mask-size: var(--_icon-size), 100%;
    }
    ```
  - Fixed: `stepper.css` sets `--_marker-image` in the complete and error blocks and draws the mask once, and `custom-properties/stepper.ts` documents it. Checked in Chromium: complete steps get the check, error steps, complete ones included, the exclamation mark, and `.ui-icon-checked` keeps `mask: none`.
- [x] (1) TextField: the small and x-small file field repeats the whole `--_file-button-inset` formula only to swap `--ui-space-2` for `--ui-space-1` (`packages/opui/css/components/text-field.css:206-212`, `packages/opui/css/components/text-field.css:241-253`)
  - Summary: The file button's inset formula exists twice in the text field stylesheet, so a change has to be made in both.
  - Recommended: Fix. One formula with the preferred gap as its only size input matches how the field padding already works.
  - Fix: keep the formula once and let the sizes set its cap, the way `--_field-padding-block` feeds `--_field-padding-block-fit`. Document the new input in `custom-properties/text-field.ts`.
    ```css
    input {
      --_file-button-inset: max(
        0px,
        min(
          var(--_file-button-padding, var(--ui-space-2)),
          (var(--_size) - var(--ui-field-border-width) * 2 - 1lh) / 2
        )
      );
    }

    &.ui-small,
    &.ui-x-small,
    :where(.ui-control-group:is(.ui-small, .ui-x-small)) > & {
      --_file-button-padding: var(--ui-space-1);
    }
    ```
  - Fixed: The file field root sets `--_file-button-padding` to `--ui-space-2`, and it feeds the one `--_file-button-inset` formula. The small and x-small rule only sets it to `--ui-space-1`. `custom-properties/text-field.ts` documents it. Checked in Chromium: the button's margin and height are the same as before at every size, in a drop zone and in small and x-small control groups.
- [x] (1) TextField: small and x-small fields switch to `--ui-font-size-control` under `@media (pointer: coarse)`. This works around iOS Safari's zoom on focused text under 16px, sits in the component CSS, and also applies on Android and touch laptops, which don't zoom (`packages/opui/css/components/text-field.css:573-578`, `packages/opui/CHANGELOG.md:251`, `packages/opui/CHANGELOG.md:420`)
  - Summary: Small fields show default-size text on every touch screen, though only iPhone and iPad zoom in on small text.
  - Recommended: Fix with option A. It follows the browser support rules, which keep engine workarounds in the compat layer.
  - Fix: with either option, the rule only stops the zoom when `--ui-font-size-control` is at least 16px. The m3, shadcn and brutalist themes set it to `0.875rem`.
  - Options:
    - A (recommended): move the declaration to a new `css/compat/text-field.css` under `@supports (-webkit-touch-callout: none)`, the iOS gate `css/compat/menu.css` and `css/compat/one-time-code.css` use. Add what the Browser support section of `AGENTS.md` asks for a compat file: the Compat layer list in `src/docs/guide/browser-support.astro`, the engine lists in `tests/e2e/compat.spec.ts` and a `## To check` item for iOS. Say "on iPhone and iPad" in the two CHANGELOG entries.
    - B: keep it for every touch screen and name the exception in the Browser support section of `AGENTS.md`.
  - Explained: Not fixed here: option A needs an iPhone or iPad to confirm, and a `## To check` item in `TODO.md`, which this pass doesn't edit. Corrections: the rule (`text-field.css:568-573`) sits in the size rule shared by TextField, Textarea, Select and NumberField. `tests/e2e/compat.spec.ts` needs no change, because its engine lists only name conditions that apply in Chromium, Firefox or desktop WebKit, and `-webkit-touch-callout` applies in none of them, as for the Menu and OneTimeCode iOS gates. The What's new notes for Text field and Textarea also say "On touch screens". For option A, drop the `@media (pointer: coarse)` block, add `@import "./compat/text-field.css";` after `tabs.css` in `css/compat.css` and add this file:
    ```css
    @layer components.compat {
      @supports (-webkit-touch-callout: none) {
        :where(.ui-number-field, .ui-select, .ui-text-field, .ui-textarea) {
          &.ui-small,
          &.ui-x-small,
          :where(.ui-control-group:is(.ui-small, .ui-x-small)) > & {
            --_font-size: var(--ui-font-size-control);
          }
        }
      }
    }
    ```
    Then add a TextField item to the Compat layer list in `src/docs/guide/browser-support.astro` and the `## To check` item. Say "on iPhone and iPad" in both CHANGELOG entries and both What's new notes. With the m3, shadcn and brutalist themes, `--ui-font-size-control` is `0.875rem`, so iOS zooms into every field, not only small ones. Neither option changes that.
  - Fixed: option A. The rule moved to a new `css/compat/text-field.css` under `@supports (-webkit-touch-callout: none)`, so it only applies on iPhone and iPad, and it now covers fields of every size (`.ui-text-field`, `.ui-textarea`, `.ui-select` and `.ui-number-field`) with `max(16px, var(--ui-font-size-control))`, so the m3, shadcn and brutalist themes, which set `--ui-font-size-control` to `0.875rem`, no longer zoom either (found in Fredahead, felix-bohlin/ui#443). Listed in the Compat layer section of `src/docs/guide/browser-support.astro`, the two CHANGELOG entries and the three What's new notes say "on iPhone and iPad", and `--_font-size` names the floor. The gate is already in the conditions `tests/e2e/compat.spec.ts` sees and applies in no desktop engine, so its engine lists don't change. A `## To check` item covers iOS.
- [x] (1) Timeline: `--_icon-size` is the size of the whole marker that holds an icon (`--ui-space-5`), while in Stepper, Button, Switch and the other components `--_icon-size` is the size of the icon itself; the timeline icon is `0.625 * --_marker-size` (`packages/opui/css/components/timeline.css:3-6`, `packages/opui/css/components/timeline.css:34-40`, `packages/opui/css/components/timeline.css:162-167`, `src/component-api/custom-properties/timeline.ts:14-18`)
  - Summary: Setting the Timeline's icon size property resizes the whole marker circle, unlike the same property elsewhere.
  - Recommended: Fix. Timeline is new in 6.0, so the rename needs no Breaking entry.
  - Fix: rename it `--_icon-marker-size` in `timeline.css` (the root, `:has(> .ui-marker)`, `:has(+ li > .ui-marker)` and `.ui-small`) and in `custom-properties/timeline.ts`, including the `--_marker-size` description.
  - Fixed: Renamed to `--_icon-marker-size` in `timeline.css` and `custom-properties/timeline.ts`, including the `--_marker-size` description.
- [x] (1) Tooltip: `tooltip.css` sets `overflow: visible` and `position-visibility: anchors-visible` on `.ui-floating`, which `anchor.css` already sets on the `.ui-floating[popover]` of every `.ui-tooltip`, and a tooltip's floating part is always a popover (`trigger="hover"` in `Tooltip.astro`) (`packages/opui/css/components/tooltip.css:25-26`, `packages/opui/css/components/tooltip.css:37`, `packages/opui/css/components/anchor.css:28`, `packages/opui/css/components/anchor.css:36`)
  - Summary: Two Tooltip declarations repeat the shared anchor rules, so a change to either has to be made twice.
  - Recommended: Fix. The shared rule already applies to every tooltip.
  - Fix: drop both declarations from `tooltip.css`, and move the comment that explains `overflow: visible` to the declaration in `anchor.css`.
  - Fixed: Fixed: both declarations are gone from `tooltip.css`, and the comment moved to the `overflow: visible` in `anchor.css`, naming the Tooltip arrow. Chromium computes the same `overflow` and `position-visibility` on the tooltip.
- [x] (1) Tabs: the Icons and counts example writes its count chips by hand as `<span class="ui-chip ui-x-small"><span class="ui-text">12</span></span>`. `Chip`'s `as` accepts only `div`, `a` or `button`, and a `div` isn't allowed in the tab's `<label>` (`src/component-examples/tabs/IconsAndCounts.astro:21`, `src/component-examples/tabs/IconsAndCounts.astro:55`, `packages/opui/components/Chip/types.ts:8-23`, `packages/opui/components/Chip/Chip.astro:25`)
  - Summary: Readers who copy the tab counts get hand-written chip markup instead of the Chip component used everywhere else.
  - Recommended: Fix with option A. A span chip is valid phrasing content, so it also fits in labels and buttons.
  - Options:
    - A (recommended): add `"span"` to the `as` of the `div` branch in `Chip/types.ts` and run `pnpm build-components`. Use `<Chip as="span" label="12" size="x-small" />` in the example, run `pnpm build-examples`, and add an `Added` CHANGELOG entry and What's new note.
    - B: keep the markup, and say in the Icons and counts section that a count in a tab is a `span.ui-chip`.
  - Fixed: Option A. `Chip` takes `as="span"` (a span branch in `Chip/types.ts` and `types.astro.ts`, and the compiled React, Svelte and Vue type files), the `as` row documents it, and the Icons and counts example uses `<Chip as="span" label="12" size="x-small" />`, which renders the same HTML as before. Added CHANGELOG entry and a components What's new note on the Chip page.
- [x] (1) Carousel: the class list's state object is the only one in the package whose keys aren't in ascending order (`ui-persistent-buttons`, `ui-peek`, `ui-stretch`, `ui-vertical`, `ui-markers`). The compiled React, Svelte and Vue files, the docs playground and the copied HTML all follow it (`class="ui-carousel ui-peek ui-markers ui-align-center ui-buttons-none"`) (`packages/opui/components/Carousel/Carousel.astro:29-35`, `src/docs/components/carousel.astro:384-388`, `src/component-examples/carousel/Peek.html:2`)
  - Summary: The Carousel's modifier classes come out in an unsorted order in every framework and in the HTML examples.
  - Recommended: Fix. Badge, Checkbox and Chip already sort their state keys.
  - Fix: sort the keys in `Carousel.astro`, sort the playground's list the same way, and run `pnpm build-components` and `pnpm build-examples`. Then re-record the Carousel Peek parity snapshot and say in the commit message that the class order change is intended.
    ```astro
    {
      "ui-markers": markers,
      "ui-peek": peek,
      "ui-persistent-buttons": persistentButtons,
      "ui-stretch": stretch,
      "ui-vertical": orientation === "vertical",
    },
    ```
  - Fixed: The state keys in `Carousel.astro` and the playground's class list are sorted (`ui-markers`, `ui-peek`, `ui-persistent-buttons`, `ui-stretch`, `ui-vertical`), and the compiled files and HTML examples follow (`class="ui-carousel ui-markers ui-peek ui-align-center ui-buttons-none"` in Peek). The parity snapshots sort classes, so the order alone changed none of them.
- [x] (1) Tooling: the `attr` pattern matches every `attr(`. A plain `content: attr(data-label)` is the widely available `attr-contents` in web-features, yet it would make the check require `attr`, the typed form that Safari lacks. Every `attr()` in the sheets is typed today (`packages/opui/scripts/features.mjs:66`, `tests/unit/check-scripts.test.ts:164-171`)
  - Summary: A future label drawn with plain attr() would add a chip marking Safari unsupported for a feature Safari has had for years.
  - Recommended: Fix. The pattern and a near-miss sample are two lines.
  - Fix: match `attr(` outside a `content` declaration or with `type(`, and add `.a::before { content: attr(data-label); }` to the near misses. Checked against the current sample, the five typed uses and an untyped custom property: all match, and the near miss doesn't.
    ```js
    {
      id: "attr",
      pattern: /(?<!\bcontent:[^;{}]*)\battr\(|\battr\([^()]*\btype\(/,
    },
    ```
  - Fixed: The item's pattern, and the near miss `.a::before { content: attr(data-label); }`. Checked: the typed uses in the sheets, an `@supports` test with `type(*)` and an untyped `attr()` in a custom property still match. No page list changed.
- [x] (2) Checkbox, Radio: the hover ripple is put behind the input with 3D transforms: `transform: translateZ(0)` on every label, `transform-style: preserve-3d` on the input, and `translateZ(-1px)` plus `will-change: transform` on the `::before`. Chromium creates about four compositor layers per control, 405 for a page of 100 checkboxes (`packages/opui/css/components/choice.css:95-135`, `packages/opui/css/components/checkbox.css:36`, `packages/opui/css/components/radio.css:37`, `scripts/css-vars-allowlist.json:6-9`, `packages/opui/css/components/choice.css:95-133`)
  - Summary: Every checkbox and radio adds several compositor layers, which adds up in long lists and tables.
  - Recommended: Fix. 2D stacking draws the same ripple, brings the count back to four layers per page and removes the allowlisted `translateZ(-1px)` literal.
  - Fix: checked in Chromium through the CDP layer tree, with 100 checkboxes:
    - Today: 405 layers.
    - With the change below but `will-change` kept: 204 layers.
    - With the change below and no `will-change`: 4 layers.

    Screenshots of a hovered checkbox and radio match today's rendering. The steps:
    - In `choice.css`, replace `transform: translateZ(0)` on `&:where(.ui-checkbox, .ui-radio)` with `isolation: isolate`.
    - Drop `transform-style: preserve-3d` from both inputs.
    - Remove the `css/components/choice.css` entry from `scripts/css-vars-allowlist.json`.
    - Change the ripple to the following (the hover and active `--_ripple-scale` rules stay):

    ```css
    &::before {
      --_ripple-scale: 0.01;

      background-color: var(--ui-choice-ripple-bg-color);
      clip-path: circle(50%);
      content: "";
      inset: calc((100% - var(--_ripple-size)) / 2);
      position: absolute;
      scale: var(--_ripple-scale);
      transition: scale var(--_duration) var(--_ease);
      z-index: -1;
    }
    ```

  - Fixed: Applied as written: `isolation: isolate` on the label, no `transform-style` on the inputs, and a ripple drawn with `scale` and `z-index: -1` without `will-change`; the `choice.css` entry is gone from `scripts/css-vars-allowlist.json`. A page with 100 checkboxes and 100 radios goes from 738 compositor layers to 4 in Chromium 153, and hovered, pressed and focused screenshots match the old rendering (only edge antialiasing differs). The CHANGELOG has a Fixed entry.
- [ ] (4) New components the blocks point to. Each block currently draws these with its own CSS:
  - Summary: Blocks draw charts, breadcrumbs, steppers, timelines, ratings, pagination and stat cards with their own CSS for lack of components.
  - Recommended: Fix. Breadcrumb, empty state and pagination are left, and their blocks already show the markup each needs.
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
  - Fixed: `Timeline`, `OneTimeCode`, `Message` and `Rating` came over from PR felix-bohlin/ui#418 on `feat/new-components-and-fixes`, reworked to the current tokens, naming and checks, next to the `Stat` and `NumberStepper` already added there. The changelog, project-overview, server-status, two-factor, chat, product-detail, testimonials and hero blocks use them. Still open: the bar chart (skipped on purpose), breadcrumb, empty state, pagination (a ButtonGroup example for now) and stepper.
  - Still open: breadcrumb, empty state and pagination. `Stepper` (`ol.ui-stepper` with `StepperItem`) came over from PR felix-bohlin/ui#418, reworked to the current tokens, naming and checks: each step takes `complete` and `error`, screen readers hear the state as `.ui-sr-only` text after the label (`completedLabel`, `errorLabel`), and `orientation` is `auto`, `horizontal` or `vertical`. The checkout block shows it above the form (Cart, Details, Confirmation). The onboarding checklist keeps its accordion, since its steps are done in any order. `NumberStepper` is `NumberField` now, so the two names don't clash.
  - Still open: re-checked: of the eleven, Message, NumberField, OneTimeCode, Rating, Stat, Stepper and Timeline exist now, and the bar chart was skipped on purpose. The file-manager and product-detail breadcrumbs, the empty-states and error-page layouts and the data-table pagination still use their blocks' own CSS.
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
  - Fixed: option A. `--ui-on-accent` is `--ui-on-fill`, the text on an intent fill kept within `--ui-accent-fill-max-lightness` (Button and Badge fills) or `--ui-choice-fill-max-lightness` (choice marks), and its description says why `--ui-palette-on-strong` isn't a drop-in. Every reader (`theme.css`, `badge.css`, `button.css`, `choice.css`, the Under the hood builds, the checkbox blog post, the token page, the contrast promises and tests) moved; it equals the old value in every scope and mode. It wasn't released (not in `released-tokens.json`), so the four Unreleased entries that named it changed instead of a Breaking one.
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
- [x] (1) Tabs: with `.ui-overflow-scroll` the panel sits inside the scroll container, so a focus ring on a control at the panel's inline edge is clipped by `overflow-inline: auto` (outlines add no scrollable overflow); the Overflow example panels hold only text, so add a `Button` first in a panel on `/html/components/tabs/` (Overflow), Tab to it and check whether the ring's outer edge is cut (`packages/opui/css/components/tabs.css:213-220`, `packages/opui/css/components/tabs.css:234-241`)
  - Summary: Focus rings on controls at the edge of a scrolling tab panel may be cut off.
  - Recommended: Fix. The check is quick, and the padding fix is contained to the overflow variant.
  - Fix: if the ring is cut, give `.ui-overflow-scroll > .ui-panel` an inline padding of `--ui-focus-ring-width` plus `--ui-focus-ring-offset`.
  - Fixed: checked in Chromium with a button first in a panel of a 320px overflow tab set, the ring's start edge was cut. `.ui-overflow-scroll > .ui-panel` gets `--_panel-padding`, `--ui-focus-ring-offset` plus `--ui-focus-ring-width`, as inline and block-end padding (the scroll container clips the bottom edge too), and the ring now draws whole; documented in `custom-properties/tabs.ts` and the Tabs Added entry.
- [ ] (1) Tooltip: in Firefox and Safari with reduced motion, the compat fallback may hide the tooltip while the pointer crosses the `--_offset` gap to it. `:has(> :hover)` stops matching in the gap, and only the fade keeps the tooltip shown until the pointer arrives. That fade lasts `--_duration`, which is 0 under `--ui-motion: 0` (`packages/opui/css/compat/tooltip.css:14-25`, `packages/opui/css/components/tooltip.css:96-116`)
  - Summary: With reduced motion on, a tooltip in Firefox or Safari may vanish before the pointer can reach it.
  - Recommended: Fix. A forced compat layer in Chromium loses the tooltip in the gap with and without reduced motion, and the bridge keeps it in both.
  - Fix: on `/html/components/tooltip/` (Basics) in Firefox and Safari with reduced motion on, move the pointer slowly from Save onto the tooltip. If it vanishes, keep the fallback shown briefly after the hover ends with a `transition-delay` that `--ui-motion` doesn't scale. A transparent `::after` on `.ui-floating` that bridges the gap also works.
  - Explained: Checked in Chromium with the compat rules forced on and `interestfor` removed, moving the pointer from Save onto the tooltip across its 8px gap in 3px steps: the tooltip is lost with and without reduced motion. In the gap `:has(> :hover)` stops matching, and Chromium doesn't hit-test an element while its display transitions to `none`, so neither the fade nor a hide delay (`transition-delay`) catches the pointer. It also shows a second bug: the compat rules set `position-anchor: --anchor` only while the tooltip shows, so as it fades out it loses its anchor and jumps below its trigger (from 162,167 to 208,248 on the test page). A transparent `::after` that bridges the gap kept the tooltip in every run. Fix both in `css/compat/tooltip.css`, then check in Firefox and Safari:
    ```css
    @supports not selector(:interest-source) {
      :where(.ui-tooltip) > .ui-floating[popover] {
        position-anchor: --anchor;

        &::after {
          content: "";
          inset: calc(-1 * var(--_offset));
          position: absolute;
        }
      }
    }
    ```
    The citations moved: the hover rule is now `packages/opui/css/compat/tooltip.css:16-29` and the fade `packages/opui/css/components/tooltip.css:93-114`.
- [ ] (1) TextField: the color input's swatch is only styled through `::-webkit-color-swatch` and `::-webkit-color-swatch-wrapper`. Firefox draws it through `::-moz-color-swatch`, which no rule reaches, so its default swatch border may show inside the square field there. Check in Firefox on `/html/components/text-field/` (Input types) (`packages/opui/css/components/text-field.css:303-327`)
  - Summary: In Firefox the color field's swatch may keep a border and inset that Chromium and Safari drop.
  - Recommended: Explain further. It needs a look in Firefox before choosing a fix.
  - Fix: open the Input types example in Firefox and compare the color field with Chromium.
  - Options if the swatch differs:
    - A: add `&::-moz-color-swatch { border: none; }` next to the WebKit rules. It is a native control part with no standard pseudo-element, like `::-moz-range-track`.
    - B: keep it.
- [ ] (1) TextField: the autosuggest field hides the browser's own datalist arrow only through Chromium's `::-webkit-calendar-picker-indicator`. Safari draws its arrow as `::-webkit-list-button`, which no rule reaches, so Safari may show it next to the drawn chevron. Check in Safari on `/html/components/text-field/` (Autosuggest) (`packages/opui/css/components/text-field.css:651-656`, `packages/opui/css/components/text-field.css:670-682`)
  - Summary: In Safari an autosuggest field may show two dropdown arrows, the browser's and the library's.
  - Recommended: Explain further. It needs a look in Safari before choosing a fix.
  - Fix: open the Autosuggest example in Safari and compare it with Chromium.
  - Options if Safari shows both:
    - A: hide the native part with `input[list]::-webkit-list-button { display: none; }` next to the Chromium rule. It is a native control part with no standard pseudo-element.
    - B: keep it.
- [ ] (1) TextField: on iPhone and iPad, the compat rule sets every field's text to `--ui-font-size-control` or 16px, whichever is larger, so iOS Safari doesn't zoom in on focus. Playwright's WebKit doesn't take the `(-webkit-touch-callout: none)` gate, so no test runs it. Open `/tests/forms/?theme=brutalist` on an iPhone, tap a default, small and x-small TextField, a Textarea and a Select, and check that the page doesn't zoom (`packages/opui/css/compat/text-field.css:1-7`)
  - Summary: Whether iPhone and iPad stop zooming in on fields under every theme is only checked by hand.
  - Recommended: Explain further. It needs a run on an iPhone before it can be confirmed.
  - Fix: if the page still zooms, check the computed font size of the focused control in Web Inspector, and that the compat layer loaded.
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
  - Still open: checked in headless Chromium 153, which has interest invokers, on the docs page: Tab to "felix-bohlin/ui" opens the card after the delay with focus staying on the link, the next Tab moves into the card to "Star" while the card stays open, and Esc closes it and puts focus back on the link. In the accessibility tree the open card is a `group`, not a tooltip, and CDP reports no expanded state or `details` relation on the link, so the note above may describe an older build; only a screen reader run can tell what NVDA and VoiceOver say. Android's "Show details" also needs a device.
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
  - Recommended: Fix with option A. Use `aria-disabled` instead of `disabled`, since `disabled` moves focus off the button.
  > Explain further
  - Explained: support data (a11ysupport.io, TPGi) says NVDA and VoiceOver ignore `aria-busy` entirely, so the button keeps its name and nothing says "busy". JAWS is the one that acts on it: it holds back the content of a busy element in Chrome and Firefox, so the button may lose its name there. ARIA only lets assistive technology "wait until the modifications are complete", so neither behavior is a bug. The visually hidden labels in the second row help nothing while JAWS hides the content.
  - Options:
    - A (recommended): keep `aria-busy` as the spinner trigger and say on the Spinner page that only JAWS acts on it (it may hide the button's content), and pair it with `disabled` and a live status message for waits that matter.
    - B: trigger the spinner from a class instead and keep `aria-busy` off buttons.
  - Still open: re-checked: the Spinner page's Basics section now says `aria-busy` announces nothing and to say what is happening in text or a `role="status"` element, which is half of option A. The Buttons section still only says to add `aria-busy="true"`, with no word on JAWS holding back a busy button's name or on pairing it with `disabled` (`src/docs/components/spinner.astro:55-80`).
  - Explained: Re-checked: Basics says `aria-busy` announces nothing, and the Buttons section has no text yet. One correction to option A: checked in Chromium, a focused button that gets `disabled` loses focus to `body` (the focus fixup rule), while `aria-disabled="true"` keeps it focused and still exposes it as disabled and busy. So pair `aria-busy` with `aria-disabled`, and move the Buttons example's busy `disabled` button to it. Text for Buttons once a JAWS run confirms the claim: "JAWS may hold back a busy button's text. Add `aria-disabled="true"` to block a second click without moving focus, and say what is happening in a `role="status"` element."
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
  - Still open: the Tooltip item about the command pair is fixed with option A, so the triggers have `interestfor` only. Checked in headless Chromium 153: Save is a button named "Save" with the description "Save your changes" and no expanded state, so screen readers in Chrome should say the name and the description. A correction to the notes above: Firefox and Safari now show the tooltip on hover and keyboard focus through `css/compat/tooltip.css`, but without interest invokers nothing ties its text to the button, so a screen reader there should hear only "Save". On iOS there is neither hover nor `interestfor`, so the tooltip doesn't show. Left: the words NVDA, JAWS and VoiceOver use in Chrome.
  - Explained: One more case for the screen reader check, from the new Icon button example: in headless Chromium 153 a trigger named with `aria-label` ("Save to wishlist") also gets the tooltip text as its description once the tooltip opens after the focus delay, and `aria-labelledby` pointing at the tooltip gives the same name and description at once. Check whether NVDA, JAWS and VoiceOver read the Icon button example's name twice.
- [ ] (2) Typography: rich text tables are `display: block` so they can scroll. Chromium keeps the table, column header and cell roles. Check with VoiceOver in Safari on `/html/components/typography/` (Default) that the table is still announced as a table with headers (`packages/opui/css/components/typography.css:640-645`)
  - Summary: VoiceOver in Safari may stop announcing rich text tables as tables because they are display block for scrolling.
  - Recommended: Fix with option A. Keeping the table a table is the only way that is safe in Safari, and a scroll wrapper costs one documented `div`.
  > Explain further
  - Explained: Safari has a long record of dropping table semantics when `display` changes (Roselli's 2022 survey, a 2020 VoiceOver test where cells stopped being navigable once `display: table` was gone, fixed in Chrome 80 but not in Safari), so `display: block` on the rich text `table` is likely to turn it into plain text for VoiceOver. Only a run in Safari can confirm it on the current version.
  - Options:
    - A (recommended): keep the table a table and scroll a wrapper: `.ui-rich-text` documents `<div class="ui-table-scroll">` (or `tabindex="0"` on a wrapping `div`) for wide tables, and the `table:not([class])` rule drops `display: block` and `overflow-inline`.
    - B: keep `display: block` and accept the Safari loss, since Chromium is the target.
  - Explained: the example puts today's rich text table, `display: block`, next to option A, the same table kept a table inside a scrolling `div` with `role="region"`, `tabindex="0"` and the caption as its name. Chromium exposes both as a table with column headers, so only VoiceOver in Safari can tell them apart: if it reads the first as a table too, the item can go. Example: rich-text-table
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
- [x] (2) Tabs: the Keyboard support list says Right and Left Arrow "follow the reading direction. In right-to-left text, Left Arrow moves to the next tab." That is the browser's native radio-group behavior, which the library doesn't control, and no e2e test covers RTL. Check on `/html/components/tabs/` with `dir="rtl"` on the `.ui-tabs` in Chromium, Firefox and Safari; if it differs per browser, reword the row to "Right and Left Arrow move between tabs; which way depends on the browser in right-to-left text" (`src/component-api/tabs/api.ts:11-15`, `tests/e2e/interaction.spec.ts:578-654`)
  - Summary: The docs say Left Arrow moves to the next tab in right-to-left text, which may not hold in every browser.
  - Recommended: Remove issue. The row now says what each browser does, and Chromium matches it.
  - Explained: the arrows are the browser's radio group navigation, which the library doesn't touch. Chromium's radio code flips Left and Right in a right-to-left group, so the row matches the target browser. Firefox and Safari decide on their own, and only a run there tells; the example puts a left-to-right and a right-to-left set side by side to try it. If they differ, reword the row as the item says. Example: tabs-rtl

  > Explain further and provide an example
  - Explained: the row now reads "Left and Right follow the reading direction in Chromium and Firefox; Safari always takes Left as the previous tab" (3e07547), the per-browser wording this item asked for. Checked in headless Chromium 153 on the example: in the right-to-left set, Left Arrow from the first tab selects the second and Right Arrow wraps to the third, so the Chromium half holds. The Firefox and Safari halves come from that commit's reading of their sources, not from a run, and the example is there to confirm them. Example: tabs-rtl
  - Fixed: the Keyboard support row now says Left and Right follow the reading direction in Chromium and Firefox and that Safari always takes Left as the previous tab (`src/component-api/tabs/api.ts:13`). `tests/e2e/interaction.spec.ts` checks it in every framework: "tabs in right-to-left text move to the next tab with Left Arrow" sets `dir="rtl"` on the Basics tabs and expects Left Arrow to select the next tab, expected to fail in WebKit with `WEBKIT_RADIO_RTL_ARROWS`, which `tests/e2e/engines.spec.ts` reproduces with plain radios. Both pass in Chromium; the `firefox` and `webkit` projects run them in CI on `main` and on pull requests with the `e2e-engines` label, and fail there if an engine behaves otherwise.

- [ ] (2) Menu: the iOS submenu anchor in the compat layer is an engine gate for iOS WebKit, which the e2e projects don't run, so no test fails the day iOS Safari places a submenu at its trigger item. Remove the block locally, open `/tests/overlays/` in iOS Safari and check whether submenus sit at their trigger item. If they do, remove the block (`packages/opui/css/compat/menu.css:8-25`)
  - Summary: Nothing says when iOS Safari places submenus right, so the iOS fix could stay longer than it's needed.
  - Recommended: Fix with option A. Only a device can tell, and a release check repeats the look every release.
  > Explain further
  - Explained: on iPhone and iPad, Safari doesn't place a submenu at the item that opened it (the implicit anchor its `commandfor` button gives it). The block in `css/compat/menu.css` works around it by anchoring each submenu to its parent menu instead, so on iOS a submenu sits next to the whole menu rather than level with its item. It is gated with `@supports (-webkit-touch-callout: none)`, a property only iOS Safari has, so no other browser gets it. Nothing tells us when iOS fixes this, because the e2e projects run desktop WebKit on Linux, which fails that gate, so the day iOS Safari places submenus correctly the block keeps running and no test notices. Only a real iPhone or iPad can tell. The quickest check, without changing the code: open `/tests/overlays/` (a Netlify preview works) on the device, connect it to a Mac, open the page in Safari's Develop menu, select a submenu (`.ui-menu .ui-menu[popover]`) in Web Inspector, untick `position-anchor: --ui-menu` from `compat/menu.css`, and open the submenu again. If it now opens level with its item, the block can go; the Bugs item above fixed how the block behaves three levels deep in the meantime.
  - Still open: the check on a device.
  - Options:
    - A (recommended): add the check to the iOS line of the release checks in `docs/releases/6.0.0.md`, so it runs with every release, and remove this item.
    - B: keep the item open until someone runs it.
  - Explained: the example turns the device check into opening a page. It has two copies of the Submenu example: the first with the iOS block, the second with three rules that undo it (`anchor-name` back to `--ui-menu-root` on the root menu only, and `position-anchor: auto` on the submenu, so Export is its implicit anchor again). Open both on an iPhone or iPad: if the second submenu opens level with Export, the block can go, no Web Inspector needed. Checked in Chromium with the block forced on: the first submenu moves up to the menu's top (209px against Export at 294px) and the second stays level with Export. Example: ios-submenu-anchor
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
  - Explained: the example has the report's test case and the library's Menu, each in a right-to-left block of this left-to-right page, with a readout of how far the popover lands below its button and how far its right edge sits from the button's. In Chromium the plain popover reads 0px and 0px and the Menu 5px and -3px, its usual offset from the button, so in desktop Firefox a readout in the hundreds confirms the bug. Example: firefox-rtl-menu
- [x] (2) Tokens: a severity class on the same element as `.ui-palette`, or on a direct child of `.ui-contrast-more`, loses its palette. `--ui-red`, `--ui-blue`, `--ui-green` and `--ui-orange` are declared again on those elements from `--ui-color-N`, which comes from the `--ui-palette-source` the severity scope derives from them, so Chromium drops the whole cycle as guaranteed-invalid. `.ui-neutral` keeps a fixed source for this reason, so a theme can't recolor neutral through `--ui-neutral` (`packages/opui/css/theme.css:275-278,321,483-486,543-554`, `packages/opui/core/palette.css:2-18,89-136`)
  - Summary: A severity class on a palette element or on a direct child of a high-contrast scope loses its color.
  - Recommended: Fix with option A. It is marked recommended, and the theme still declares the named colors from palette steps that the severity source derives from, so the cycle is in the code.
  - Fix: confirm with `<div class="ui-contrast-more"><span class="ui-chip ui-critical">` and `<span class="ui-palette ui-chip ui-critical">`.
  - Options:
    - A (recommended): give the named colors and `--ui-neutral` the step's lightness as a number (steps 7, 9 and 11 have the same lightness in every palette), so they stop depending on the element's own palette, then derive `.ui-neutral` from `--ui-neutral` like the other scopes.
    - B: keep today's values and document that a severity class can't sit on a `.ui-palette` element or a direct child of `.ui-contrast-more`.
  > Fix with option A
  - Fixed: option A. Only the same-element cases broke (`.ui-palette.ui-critical` and `.ui-contrast-more.ui-critical` had no palette source and a transparent chip); a direct child of `.ui-contrast-more` never did. `--ui-blue`, `--ui-green` and `--ui-red` use the lightness `0.53` and `--ui-orange` `0.66` as numbers, `--ui-neutral` is `oklch(0.53 var(--ui-gray-chroma) var(--ui-gray-hue))` (still capped in light mode), and `.ui-neutral` derives its source from `--ui-neutral` (`oklch(from var(--ui-neutral) 0.58 c h)`), so a theme can recolor it. Computed colors are unchanged in the default theme and all four example themes, light and dark, with and without more contrast, across every component example and stress page; only bootstrap's `.ui-neutral` palette steps move, because bootstrap sets `--ui-neutral` and the scope now follows it. A `theming.spec.ts` check compares the palette on the same element with a child for every severity on both scopes. The unreleased CHANGELOG entry about severity scopes and a Callout What's new note say so. The same-element case in the example themes is a separate item under Bugs.
- [ ] (2) OneTimeCode: the iOS fixed width in the compat layer is an engine gate for iOS WebKit, which the e2e projects don't run, so no test fails the day iOS Safari shows the last typed character in an input sized with `field-sizing: content` and wide `letter-spacing`. Remove the block locally, type a code on `/html/components/one-time-code/` (Basics) in iOS Safari and check whether every character shows in its box while the input has focus. If it does, remove the block (`packages/opui/css/compat/one-time-code.css:1-20`)
  - Summary: Nothing says when iOS Safari shows the last typed character, so the iOS fixed width could stay longer than it's needed.
  - Recommended: Fix with option A. Only a device can tell, and a release check repeats the look every release.
  - Options:
    - A (recommended): add the check to the iOS line of the release checks, so it runs with every release, and remove this item.
    - B: keep the item open until someone runs it.
  - Explained: the example has two copies of the Basics field: the first with the iOS block, the second with rules that put back the `field-sizing: content` values from `one-time-code.css`. Type a code in both on an iPhone or iPad: if every digit, the last too, shows in its box in the second, the block can go. Checked in Chromium with the block forced on: the first input switches to the fixed width (336px, `field-sizing: fixed`) while the second keeps exactly the values Chromium has without the block. Example: ios-one-time-code
- [x] (2) Range: under `forced-colors: active` the range source sets its fill to `SelectedItem`, but in Chromium the filled part of the track rendered black. The theming guide now names only the thumb (`packages/opui/css/components/range.css:413`)
  - Summary: The filled part of a range may not use the selected color in forced colors mode.
  - Recommended: Fix with option A. One declaration brings the fill back, and its colors stay the system's.
  - Fix: open `/html/components/range/` with forced colors emulated in Chromium and in Windows High Contrast, and see which color the fill uses
  - Explained: confirmed in headless Chromium 153 with forced colors emulated: on `/html/components/range/` both sides of the thumb are 31, 31, 31, while `SelectedItem` is 25, 103, 210 and the thumb shows it. Forced colors mode keeps only `url()` background images, as the Color Adjust spec says, and the WebKit track draws the fill as a `linear-gradient`, so the fill is dropped; Firefox fills `::-moz-range-progress` with a plain `background`, which forced colors keeps. With `forced-color-adjust: none` on `::-webkit-slider-runnable-track`, the filled part shows `SelectedItem` and the rest `CanvasText`, and since both are system colors the user's theme still picks them. Windows High Contrast itself is unchecked. Example: range-forced-colors
  - Options:
    - A (recommended): add `forced-color-adjust: none` to `&::-webkit-slider-runnable-track` in the forced colors block of `range.css`, and name the fill in the theming guide again.
    - B: keep it, and leave the theming guide naming only the thumb.
  - Fixed: with option A: `forced-color-adjust: none` on `::-webkit-slider-runnable-track` in the forced-colors block, and the theming guide names the fill again (with the dashed invalid border). Windows High Contrast itself is still unchecked.
- [ ] (2) Table: `.ui-overflow-scroll` sets `display: block` on the `table` element so it can scroll sideways, and the In a card example puts `tabindex="0"` on that table; Chromium and Firefox keep the table, row and cell roles, Safari has a record of dropping them when `display` changes, the same question the open Typography item asks about rich text tables (`packages/opui/css/components/table.css:152-165`, `src/component-examples/table/InCard.html:6`, `src/docs/components/table.astro:211-214`)
  - Summary: VoiceOver in Safari may read a sideways-scrolling table as plain text because the table is display block.
  - Recommended: Fix with option A. It keeps the table a table in every engine, and the Sticky header example already shows the scroll box.
  - Fix: check with VoiceOver in Safari on `/html/components/table/` (In a card) that the table is still announced as a table with headers.
  - Options:
    - A (recommended): if VoiceOver loses the table, make `.ui-overflow-scroll` keep `display: table` and document a scroll box (`role="region"`, `aria-label`, `tabindex="0"`) around wide tables instead, with `white-space: nowrap` on the cells as the class's remaining job, decided together with the Typography item.
    - B: keep `display: block` and accept the Safari loss, together with the Typography item.
- [x] (2) List, Layout, Menu, Message: `.ui-list`, `.ui-menu`, `ol.ui-messages` and `ul`/`ol` with the layout classes set `list-style: none`, and WebKit demotes a list with no markers outside `nav` to a group, so VoiceOver in Safari may announce neither the list nor its item count, which `role="list"` restores; no component, docs page or example sets it, and the Message page promises the count (`packages/opui/css/components/list.css:43`, `packages/opui/css/components/layout.css:164-168`, `packages/opui/css/components/message.css:7`, `src/component-examples/layout/List.html:1`, `src/docs/components/message.astro:236-238`, `packages/opui/components/Message/Messages.astro:7`)
  - Summary: VoiceOver in Safari may not announce lists, menus, layout grids and conversations as lists, because their bullets are removed.
  - Recommended: Fix with option A. A redundant `role="list"` on a `ul` or `ol` costs nothing, passes axe, and is what other libraries do for the same reason.
  - Fix: check with VoiceOver in Safari on `/html/components/list/` (Basics), `/html/components/layout/` (Lists), `/html/components/menu/` (Basics, open) and `/html/components/message/` (Basics) whether each is announced as a list with its item count.
  - Options:
    - A (recommended): `List` and `Messages` render `role="list"` in all four frameworks, the HTML List, Layout list and Message examples add it, and the List, Layout and Message pages say why in one sentence.
    - B: a sentence on the List, Layout and Message pages only.
  - Fixed: with option A without the VoiceOver check, since a redundant `role="list"` costs nothing where Safari keeps the list and restores it where Safari drops it: `List` and `Messages` render it in all four frameworks, the Layout list example and the five other examples with a `ul` layout list carry it, and the List, Layout and Message pages say why. 31 markup snapshots are re-recorded (intended). The Menu's `menu` element keeps no role, as the option said.
- [ ] (2) Table: `table.css` keeps focus rings inside the clipped table with `overflow-clip-margin`, which Safari doesn't support, so the outer edge of a focus ring on a control in an edge cell may be cut off there (`packages/opui/css/components/table.css:16-19`)
  - Summary: In Safari the focus ring of a link or button in an edge cell of a Table may be clipped.
  - Recommended: Explain further. It needs a look in Safari before choosing a fix.
  - Fix: open `/html/components/table/` in Safari and Tab to a link or button in the first or last column.
  - Options if the ring is cut:
    - A: mark it as an expected failure in `tests/e2e/engine-bugs.ts` with a plain-HTML repro, and wait for Safari.
    - B: draw the ring inside with `--ui-focus-ring-inset` for controls in edge cells.
- [ ] (2) Tooltip: in Firefox, `getComputedStyle` keeps reporting a tooltip's opacity from partway through its fade, while the tooltip paints fully opaque, when a position-try fallback moves it after the compat hover rule started the fade. The top start, sticky header and three drawer header tooltips of `/tests/overlays/` read between 0.09 and 0.99 for good, so their axe tests, which wait for opacity 1 and whose contrast check reads it, are expected to fail in Firefox (`FIREFOX_STALE_FALLBACK_OPACITY`). Report it to Mozilla (`packages/opui/css/compat/tooltip.css:14-24`, `tests/e2e/engines.spec.ts:121-157`, `tests/e2e/stress-overlays.ts:189,352,408-422`)
  - Summary: Firefox tells scripts some tooltips are still faint after their fade, so their contrast checks can't run there.
  - Recommended: Fix with option A. The repro is confirmed in Firefox 155, so only the report is left.
  - Fix: found in Playwright's Firefox 155: the opacity transition runs and finishes on time (`getAnimations()` empties after it), but the computed value stays at the one read first, and a screenshot of the same tooltip is fully opaque. Each of the three parts alone reads 1: the hover rule's fade, the popover opening (`showPopover()` or the command pair) and a `flip-block` fallback. The `engines.spec.ts` repro has all three without the library, and a report to paste under Core :: CSS Transitions and Animations:
    ```text
    Summary: getComputedStyle keeps a mid-transition opacity on a popover that a position-try fallback moved after a :hover rule started the transition

    Steps:
    1. Open the test case below and hover "Open".
    2. In the console, run document.getElementById("popover").showPopover(), wait a second, then run getComputedStyle(document.getElementById("popover")).opacity.

    Expected: "1", the opacity the popover paints, as in Chrome.
    Actual: a value between 0 and 1 from partway through the transition, which never updates, though the popover paints fully opaque and getAnimations() is empty.

    <!doctype html>
    <style>
      body { margin: 0 }
      .center { display: flex; justify-content: center }
      #wrap { anchor-name: --wrap; display: inline-block }
      #popover { inset: auto; margin: 0; opacity: 0; position-anchor: --wrap; position-area: block-start; position-try-fallbacks: flip-block; transition: display 0.3s allow-discrete, opacity 0.3s, overlay 0.3s allow-discrete }
      #popover:popover-open { opacity: 1; @starting-style { opacity: 0 } }
      #wrap:has(> :hover) > #popover { display: block; opacity: 1; @starting-style { opacity: 0 } }
    </style>
    <div class="center"><span id="wrap"><button id="trigger">Open</button><span id="popover" popover="hint">Tip</span></span></div>
    ```
  - Options:
    - A (recommended): file the report above, add its link to `FIREFOX_STALE_FALLBACK_OPACITY` in `engine-bugs.ts`, and remove this item.
    - B: keep the item open until someone files it.
- [ ] (2) Tokens: the mode files (`<theme>/<mode>.tokens.json`) haven't been through Figma's Import mode, so whether it reads their sRGB color objects, aliases, `com.figma` code syntax, scopes, hidden flag and descriptions is unconfirmed (`src/utils/figma-tokens.ts:631`)
  - Summary: Whether Figma's own variables import reads the opui mode files is unconfirmed.
  - Recommended: Fix. Only an import in the Figma app can confirm it.
  - Fix: in a draft, add a variable collection, right-click its mode, choose Import mode and pick `light.tokens.json` from the theme tokens page. Check a color (`surfaces/ui-surface`), an alias (`typography/ui-font-size-body`), the code syntax, scopes and hidden flag of a palette step, and the descriptions, then change `figmaModeFiles` to what Figma reads.
- [x] (2) Copy: when the clipboard is blocked and the content isn't a field, `copy.js` selects every child of `opui-copy`. Then it writes "Copy failed" into the visually hidden status and into the label it shows, both inside that selection. So copying by hand likely takes that text along with the snippet (`packages/opui/elements/copy.js:53-61`, `packages/opui/elements/copy.js:81-89`, `packages/opui/components/Copy/Copy.astro:21-23`, `src/docs/components/copy.astro:159-166`)
  - Summary: Copying a snippet by hand after a failed copy may paste the words Copy failed along with it.
  - Recommended: Explain further. It needs a browser with the clipboard blocked before choosing a fix.
  - Fix: on `/html/components/copy/` (Snippet), make `navigator.clipboard.writeText` and `document.execCommand` fail. Press Copy, then Ctrl+C, and paste. If the status or label text comes along, end the selection before the status span (`range.selectNodeContents(this)`, then `range.setEndBefore(status)`) instead of `selectAllChildren(this)`.
  - Fixed: Confirmed and fixed. In Chromium, a failed copy on the Snippet example selected "npm install opui-css" followed by "Copy failedCopy failed" (the status and the label), and Ctrl+C pasted all of it. `#select()` in `packages/opui/elements/copy.js` now selects the element's contents up to the status or the label, whichever comes first, so the paste is the snippet alone. A new e2e test on the Snippet example checks the selection. A `[data-copy-ignore]` inside the snippet, like the new `$ ` prompt, is still part of a manual selection; `user-select: none` on it would leave it out in Chromium, but that also stops readers from selecting it by hand.
- [ ] (2) Menu: Esc in a submenu closes it and leaves focus on the page instead of on the submenu's item, and no e2e test covers it. The keyboard table blames Chromium, but the HTML show-popover steps may only restore focus for an auto popover opened while no other is open, so Firefox and Safari may do the same (`src/component-api/menu/api.ts:32-35`, `src/component-examples/menu/Submenu.html:24-44`)
  - Summary: Pressing Esc in a submenu drops keyboard focus to the page instead of the item that opened it.
  - Recommended: Explain further. It needs a check in Firefox and Safari before choosing between a docs fix and a script.
  - Fix: on `/html/components/menu/` (Submenu), in Chromium, Firefox and WebKit:
    1. Open File.
    2. Tab to Export and press Enter.
    3. Tab into the submenu and press Esc.
    4. Note `document.activeElement` and where the next Tab lands.
  - Options if every engine does it:
    - A: drop "Chromium" from the Esc row. Have the planned `<opui-menu>` element (the open Web components arrow-key item) move focus back to the submenu's item when the submenu closes.
    - B: only correct the Esc row.
  - Explained: Checked in headless Chromium 153 on the Submenu example: Tab to Export and Enter opens the submenu, Tab moves to PDF, and Esc closes only the submenu, leaves the root menu open and puts focus on `<body>`; the next Tab lands on New, the root menu's first item. So in Chromium focus is lost, but the next Tab stays in the menu. Firefox and WebKit are still to check.
- [ ] (2) Message: check with NVDA (Chrome, Firefox) and VoiceOver (Safari) whether the typing indicator is announced when an app adds it. The component renders the `role="status"` bubble together with its hidden text, and many screen readers only announce changes in a live region that was already on the page (`packages/opui/components/Message/Message.astro:31-36`, `src/component-examples/message/Typing.html:12-17`, `src/docs/components/message.astro:142-153`)
  - Summary: Screen reader users may never hear that the other person is typing.
  - Recommended: Fix. The check decides whether the page needs a sentence or the conversation a lasting status region.
  - Fix: on `/html/components/message/` (Typing), remove the typing `li` and add it back with a script, then listen. If it isn't announced, say on the page to keep one status region per conversation and change its text. If the list becomes a log (the Message item in Accessibility), also check that the indicator isn't read twice.
  - Explained: Checked in Chromium: the typing bubble is a `status` live region (`atomic=true`) that arrives with its text already in it, the case some screen readers skip. If NVDA or VoiceOver stay silent, the fix touches the component: `Message` renders the typing bubble without `role="status"`, and the page says to keep one lasting region per conversation, such as `<p class="ui-sr-only" role="status"></p>` next to the list, whose text the app sets to "Saga is typing..." and clears. With the list in a `role="log"` (the Message item in Accessibility), the added typing `li` is a log addition too, so also check that it isn't read twice.
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
  - Still open: re-checked: the expected failure is `WEBKIT_TOP_LAYER_ANCHOR` now, renamed from `WEBKIT_SCROLLED_ANCHOR`, still in `tests/e2e/engine-bugs.ts` with its repro in `engines.spec.ts`, so the notes above hold under the new name.
