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
- [ ] (1) SortableTable: in React, a sort before the page hydrates (with `opui-css/elements/sortable-table.js` loaded by the page) appends a status span to the element and moves the rows React rendered, so React fails to hydrate the table and renders it again without the sort (`packages/opui/elements/sortable-table.js:70-95`, `packages/opui/components/SortableTable/SortableTable.react.tsx:29-35`)
  - Summary: A React table sorted before the page finishes loading loses the sort and logs a hydration error.
  - Recommended: Fix with option A. It needs a click before hydration with the element loaded early, so it waits for the next SortableTable change.
  - Fix: reproduce with the app tests' `/elements-first/table` route in Next.js: click a sortable header while the app's scripts are held, then release them.
  - Options:
    - A (recommended): render the status region in every framework (`set:html=""` in `SortableTable.astro`, like Copy's) so the element only writes into it, and have the element keep the row order in a `data-` attribute it applies again once the framework has hydrated.
    - B: leave it: name the limitation on the Table page next to the React example.
- [ ] (2) Range: in WebKit, the fill animation (`ui-range-fill` on the `--ui-range-thumb` view timeline) keeps `/theme-builder/` rendering a new frame about every 45 ms while nothing changes: in WebKitGTK 2.52 the main thread is busy for 3.5 s of every 4 s at idle, from the two Range inputs in the preview specimen, 1,900 px below the viewport. With their animation off it is 0.4 s, and Chromium shows no idle cost. A plain page with the same Range markup and `dist/opui.css` costs 0.1 to 0.2 s per 3 s, also inside `.ui-palette`, so the repro still needs the part of the builder that makes it expensive (`packages/opui/css/components/range.css:268-289`, `packages/opui/css/components/range.css:361-362`, `src/components/ThemeBuilder/PreviewSpecimen.astro:185`)
  - Summary: In WebKit the theme builder keeps redrawing while idle because of the Range fill animation, which slows every action there.
  - Recommended: Fix with option A. The cost comes from the engine, so it belongs in an engine bug report with a repro, not a workaround.
  - Fix: add the builder's pieces to the plain page one at a time (the preview's containers, `content-visibility: auto`, the `.ui-palette` panes and the page's custom properties) until the idle cost appears.
  - Options:
    - A (recommended): reduce it to a plain-HTML repro, report it to WebKit, and add the reason to `tests/e2e/engine-bugs.ts` with the repro in `tests/e2e/engines.spec.ts`, marking the theme builder tests slow in WebKit for it.
    - B: pause the preview's Range animations while they are outside the viewport, from the theme builder's script.
- [ ] (2) TextField: in Vue, the form reset handler assigns the input's string `value` to the model, because `numeric()` only sees a static `type="number"` and TextField's type is dynamic, so `<TextField type="number" v-model="n">` hands back a number while the user types (Vue's `vModelText` casts on `vnode.props.type`) and a string after a reset (`packages/opui/components/TextField/TextField.vue:65-70`, `scripts/component-models.mjs:24-31`)
  - Summary: A Vue number TextField's bound value turns from a number into a string after a form reset.
  - Recommended: Fix with option A. It fixes the cast and removes the reset code from five compiled Vue files.
  - Fix: found by the `framework-idioms` agent's blind port of TextField. No test catches it: the app tests' reset scenario and `example-state.spec.ts` read the DOM, not the model's type.
  - Options:
    - A (recommended): move the reset into `vSeed` (`packages/opui/components/vue.ts`, whose `stateOf` already casts on `field.type`): its `mounted` sets `defaultValue` when there's no `value` attribute and listens for `reset` on `field.form`, and `beforeUnmount` removes the listener. The compiled ports then keep only `v-seed v-model`, without `modelElement`, `initialValue`, `modelForm`, `resetModel` or the lifecycle hooks (TextField, Textarea, NumberField, Range, OneTimeCode).
    - B: emit a runtime check in the reset line: `element.type === "number" && !Number.isNaN(element.valueAsNumber) ? element.valueAsNumber : element.value`.
- [ ] (3) TextField: in Svelte, `defaultValue={initialValue}` comes after `{...rest}`, so it replaces a `defaultValue` the caller passes: an SSR probe with `defaultValue: "kept"` renders `value="kept"` in React and no value in Svelte. The same emitter writes it into NumberField, OneTimeCode, Range and Textarea (`packages/opui/components/TextField/TextField.svelte:93-104`, `scripts/component-models.mjs:203-215`)
  - Summary: A Svelte TextField drops the `defaultValue` it's given, so the field renders without it and a reset ignores it.
  - Recommended: Fix. The component merges the value, so it destructures it like the other merged attributes.
  - Fix: when the model can be reset, destructure `defaultValue` next to the bindable and emit `defaultValue={defaultValue ?? initialValue}`. Found by the `framework-idioms` agent.

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
- [ ] (7) Release: the Getting started pages install with `npm install opui-css` and `pnpm add opui-css`, which install 5.4.3 while `latest` points there; its exports map turns every `.css` import on those pages into `*.css.css`, and it has no `./react` or `./svelte` export. 6.0.0-rc.1 on `next` lacks `./elements/*` (`src/docs/guide/getting-started/partials/InstallCommand.astro:24-37`)
  - Summary: Following the install steps today gets 5.4.3, and the imports on the page fail to resolve.
  - Recommended: Fix with option A. The pages stay correct whether or not 6.0.0 ships first.
  - Options:
    - A (recommended): release 6.0.0 with `./elements/*` in its exports before the docs go live; until then show the unreleased note in Install via NPM on all five pages
    - B: change the commands to `opui-css@next` until 6.0.0 is `latest`
  > Fix with option A
  - Still open: The note part is done: `InstallCommand.astro` shows a warning under the install commands on all five Getting started pages while the next major is unreleased. It says the commands install the published version, that `opui-css@next` has the release candidate without the `elements/` scripts, and how to build the package from the repository. It disappears on its own once the release is dated. Left: publishing 6.0.0 with `./elements/*` in its exports, which is yours to do.
  - Still open: Re-checked: nothing is left in the repository. `packages/opui/package.json` (6.0.0-rc.1) exports `./elements/*`, and the unreleased note shows under Install via NPM on the five Getting started pages. npm still has `latest` at 5.4.3 and `next` at 6.0.0-rc.1, which was published before `./elements/*` was added. Left: publishing 6.0.0 as `RELEASING.md` describes, which is yours to do.

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
  - Recommended: Explain further. Arrow keys imply `role="menu"` and `menuitem` to screen readers, which changes the documented list model, so it's a design decision before an element.
  - Fix: an `<opui-menu>` element in the light DOM, like `Toaster` and `Copy`, that on `toggle` to open moves focus to the first item, handles Up and Down with wrap, Home and End, and adds `role="menu"` to the `<menu>` and `role="menuitem"` to its buttons and links only while it is defined, so the markup stays a list of buttons without the script.
  - Options:
    - A: the element above, documented next to the Role & attributes section.
    - B: keep the list of buttons and the current keyboard table.
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
- [ ] (1) Web components: there is no command palette: the app shell has a search field in its header but no dialog that searches commands and pages from anywhere with a keyboard shortcut (`src/blocks/app-shell.html:94-100`)
  - Summary: Apps have no keyboard-first way to jump to a page or run a command.
  - Recommended: Explain further. It builds on the combobox, so it waits for that.
  - Fix: once the combobox exists, a `CommandPalette` that puts it in a `Dialog`, groups the options under headings and opens on a shortcut that the page chooses through `aria-keyshortcuts`.
- [ ] (1) Web components: there are no resizable panels: the chat block gives its sidebar a fixed width, and changing it needs a script and a separator the keyboard can move (`src/blocks/chat.html:5-12`)
  - Summary: Users can't make a sidebar or panel wider or narrower.
  - Recommended: Explain further. Few blocks need it, and CSS `resize` covers simple cases.
  - Fix: an `<opui-splitter>` between two panels with `role="separator"`, `aria-valuenow` and `aria-orientation`, moved by dragging or by the arrow keys, writing the size to a custom property on the container. Without the script the panels keep their default sizes.
- [ ] (1) Web components: there is no tree view: nested items, like the folders in the file manager, can only be nested lists or `<details>`, with no arrow-key navigation or selection (`src/blocks/file-manager.html:55-61`)
  - Summary: Nested folders or categories can't be shown as a tree that the keyboard can move through.
  - Recommended: Explain further. Nested `<details>` lists already cover most uses without a script.
  - Fix: document nested `.ui-list` items in `<details>` as the tree without a script. An `<opui-tree>` then adds `role="tree"`, `treeitem` and `group`, roving tabindex, the arrow keys to move, open and close, typeahead and `aria-selected`, only once it is defined.
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
  - Recommended: Fix. The CSS part costs nothing, and a full data grid stays out of scope.
  - Fix: add `.ui-lazy-rows`, which sets `content-visibility: auto` and `contain-intrinsic-size: auto <row size>` on the `tbody` rows, so the browser skips the layout and paint of rows out of view while find in page and the accessibility tree keep them. Document on the Table page that windowing a data set of tens of thousands of rows belongs to a data grid library, styled with the `.ui-table` classes.
- [ ] (2) Web components: composite widgets have no shared arrow-key navigation: the Menu documents that the arrow keys do nothing, and the planned tree view and toolbars need the same roving focus, which each element would otherwise write on its own (`src/component-api/menu/api.ts:28-31`, `src/docs/components/menu.astro:174-178`, `packages/opui/react/elements.ts:8-12`)
  - Summary: Keyboard users Tab through every item of a menu instead of moving with the arrow keys, and each future widget would solve this on its own.
  - Recommended: Fix with option A. It follows the platform where it ships, keeps the markup working without the script and writes the key handling once.
  - Fix: A custom element can do it, the way `Toaster`, `SortableTable` and the password toggle already add behavior to working markup: in the light DOM, it keeps one item in the tab order (roving `tabindex`), moves with Up and Down (Left and Right in a horizontal group), Home and End, typeahead and wrap, and moves focus to the first item when its popover opens. Three things decide the design. First, the arrow keys and `role="menu"` with `menuitem` must arrive together: the role without the keys promises a pattern that doesn't work, and the keys without the role surprise a screen reader user in a list, which is why the open Menu item asks for a decision first. So the roles are added only where the keys work. Second, Chrome 150 ships the `focusgroup` attribute (detect it with `'focusgroup' in HTMLElement.prototype`): `focusgroup="menu"` gives the arrow keys and one tab stop that remembers the last item without a script, and infers `menu` and `menuitem` only on elements without their own semantics, so a `<menu>`, which is a list, keeps its list role. It has no spec text yet (whatwg/html#11723), and testers found gaps such as `focusgroup="none"`, so e2e tests check it before the docs rely on it. Third, React, Svelte and Vue render the attribute as a plain string, but their types need `focusgroup` next to `commandfor` in `react/elements.ts`, `svelte/elements.ts` and `env.d.ts`, and the element only sets attributes (`tabindex`, `role`) on nodes a framework renders, never adds or moves nodes, so hydration stays intact. A combobox or listbox keeps focus in its input and moves `aria-activedescendant` instead, so it can share the key handling but not the roving `tabindex`. Tests: interaction tests in every framework in Chromium (native `focusgroup`) and in Firefox and WebKit (the element), and accessibility tree checks with and without the script.
  - Options:
    - A (recommended): the markup carries the standard `focusgroup` attribute, and one shared module in `elements/` gives `<opui-menu>`, and later the tree view and toolbars, the same keys where the browser lacks it. Where the browser has it, the element only adds the roles. Without the script the markup stays a list of buttons that Tab moves through.
    - B: only the `focusgroup` attribute, no script: Chrome 150 gets the arrow keys and Firefox and Safari keep Tab, following the feature-first policy. The `<menu>` keeps its list role in every browser, so Chrome users get arrow keys in a list.
    - C: one element per widget (`<opui-menu>`, `<opui-tree>`), each with its own key handling and no `focusgroup`.
- [ ] (3) Web components: there is no combobox: a search field can't suggest or filter options as the user types, so the app shell's search is a plain input and a long Select has no filter (`src/blocks/app-shell.html:94-100`)
  - Summary: Users can't filter a long list of options by typing, and search fields offer no suggestions.
  - Recommended: Fix. A combobox is the most requested control the library lacks, and `<datalist>` gives a fallback without the script.
  - Fix: an `<opui-combobox>` in the light DOM around a `.ui-text-field` input and a `.ui-list` listbox popover anchored to the field. It filters the options as the user types, moves through them with the arrow keys through `aria-activedescendant`, selects with Enter and closes with Escape, and sets `role="combobox"`, `aria-expanded` and `aria-controls` only once it is defined. Without the script the input keeps a `list` pointing at a `<datalist>` with the same options. Add `Combobox` in all five formats.
- [ ] (3) Web components: there is no date picker: the analytics dashboard offers only fixed ranges as toggle buttons, and a custom date or range needs a calendar that a script draws (`src/blocks/analytics-dashboard.html:59-75`)
  - Summary: Users can only pick preset ranges, never a date or a custom range, outside the browser's own date input.
  - Recommended: Fix. A styled native date input covers single dates, and the element adds the range calendar.
  - Fix: style `input[type="date"]` in `.ui-text-field` first. Then an `<opui-calendar>` that renders a month grid with `Intl.DateTimeFormat` in the page's `lang` (week start from `Intl.Locale` `getWeekInfo()`), moves by day with the arrow keys and by month with Page Up and Page Down, and selects a single date or a range into named form inputs. A `DatePicker` puts it in a popover anchored to a text field. Without the script the native date inputs remain.

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
  - Still open: `opui-css/vue` now ships compiled JavaScript, so an app that imports from it no longer compiles the Select template and prints neither warning in `vite dev` or `nuxi dev`. A deep import of `opui-css/components/Select/Select.vue`, and this repo's own dev server, still compile it and still warn, so the comment on vuejs/core#13608 is still the fix. `scripts/build-frameworks.mjs` (`KNOWN_VUE_WARNINGS`) lets the package build pass on these two warnings and fails on any other.
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
- [ ] (1) OneTimeCode: the three box masks fix `rx='8'` and `stroke-width` 2 and 4 inside the SVG data URIs, so the boxes keep an 8px radius and 2px lines whatever `--ui-field-radius`, `--ui-radius` and `--ui-field-border-width` a theme sets (brutalist is 5px, m3 12px) (`packages/opui/css/components/one-time-code.css:3-4`, `packages/opui/css/components/one-time-code.css:15`)
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
- [ ] (2) Callout: a close button in a callout only takes its place at the end of the first row: every app writes its own click handler to remove or hide the callout, as the Dismissible example does (`packages/opui/css/components/callout.css:138-163`, `src/component-examples/callout/Dismissible.astro:27-45`)
  - Summary: A close button in a callout does nothing until the app adds a click handler that removes the callout.
  - Recommended: Fix with option A. A helper would only take over the hiding, and the app would still move the focus and remember the choice.
  - Options:
    - A (recommended): keep the handler in the app, as the Dismissible example shows.
    - B: ship a small helper, such as `opui-css/js/dismiss.js`, that handles `command="--dismiss"` on its `commandfor` target and removes or hides it, and let `Callout` render the button from a `closeLabel`.
  > Explain further and provide an example
  - Explained: Today `callout.css` only places a close button: a `.ui-button` that is a direct child goes to the end of the first row. What it does is the app's, and the Dismissible example's handler hides the callout, shows a Show the callout again button in its place and moves the focus there. Option B would follow how the package adds behavior elsewhere, a custom element in `elements/` that handles a custom command, like `opui-copy` with `--copy` and `opui-text-field` with `--toggle-password`: `Callout` would render an `opui-callout` root when it gets a `closeLabel`, with a close button that sends `command="--dismiss"` to it, and the element would hide itself. What it can't decide is what happens next: once the button is hidden the focus falls to the body, and a callout that should stay dismissed after a reload needs the app's storage or server. So the element would fire a cancelable `dismiss` event for the app to move the focus and remember the choice, which leaves about as much app code as the handler today, plus a script to load, a new element and a prop in five formats. The example puts both side by side: A with the app's handler, and B with a prototype element and the listener the page still needs. Example: callout-dismiss
- [ ] (2) Tabs: there are no vertical tabs and no tabs made of links: the Tabs page sends page navigation and a settings page with its sections in a column to the App shell block's list of links (`src/docs/components/tabs.astro:139-147`, `packages/opui/css/components/tabs.css:1-30`)
  - Summary: Tabs can't stand in a column at the side or link to other pages, so settings pages and page navigation use a List of links instead.
  - Recommended: Fix with option A. A List of links with `aria-current` covers both cases today, while B and C each add a second layout or selected state to every Tabs variant.
  - Options:
    - A (recommended): keep pointing to the App shell block and a `List` with `aria-current="page"`.
    - B: add `orientation="vertical"` to `Tabs`: the labels in a column at the start and the panel beside them, for every variant, in right-to-left text and in forced colors.
    - C: add a navigation form: links with `aria-current="page"` styled like tabs, without radio inputs or panels.
  > Explain further and provide an example
  - Explained: The tabs are radio inputs, labels and panels in one wrapping flex row: the panel after the checked radio's label shows, and `order` puts the labels before the panels. That is what makes them work without a script, and why both asks are separate builds. Vertical tabs (B) need a two-column grid, the labels in the first column and the panel spanning their rows, and every rule written for a row redone for a column: the track's rounded corners, which sit on the first and last tab's start and end today, the panel's block margin, the line variant's indicator under the tab, the overflow scroll, right-to-left and forced colors, in all five variants. The sliding pill follows on its own, since it anchors to the checked tab, and the radios' arrow keys already move up and down. Tabs made of links (C) can't use the radios: a link to another page has no panel, and `role="tablist"` isn't for navigation, so it would be a `nav` of links with `aria-current="page"` drawn like tabs, a second selected state next to `:checked` with its own focus ring rule. A covers both cases now with a List of links, as the App shell block does. The example shows A, B with only the layout changed and with its corners and gap redone, and C, all on today's CSS. Example: tabs-vertical-links

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
- [ ] (1) TextField: the React port loads its two element modules in two identical `useEffect`s, one per import (`packages/opui/components/TextField/TextField.react.tsx:57-62`, `scripts/component-react.mjs:152-155`)
  - Summary: The React file repeats an effect for each script the Astro file imports.
  - Recommended: Fix. One effect reads like hand-written code and behaves the same.
  - Fix: emit one `useEffect` with a `void import(...)` line per specifier. Found by the `framework-idioms` agent.
- [ ] (1) TextField: React writes each variable tag as a lowercase const plus a `const Root: ElementType = root` alias, and `ElementType` drops the prop checks that inference of the literal union keeps (`packages/opui/components/TextField/TextField.react.tsx:47-50`, `scripts/component-react.mjs:132-141`)
  - Summary: The React file declares each dynamic tag twice and with a looser type than TypeScript would infer.
  - Recommended: Fix. AGENTS.md prefers inference, and inference catches more here.
  - Fix: when a derived tag yields only string literals, emit `const Root = <expr>`, and keep `ElementType` for a tag that comes from a prop (`as`). Found by the `framework-idioms` agent.
- [ ] (1) TextField: the ports call Astro's `createIds(uid, "text-field", id)` with the `useId()` string in place of `Astro.locals`, and Vue keeps the resulting closure in a `computed` it calls as `ids.value("start-text")`, where the components guide writes the base as `` id ?? `text-field-${uid}` `` (`packages/opui/components/TextField/TextField.vue:86-110`, `scripts/component-emit.mjs:91-96`)
  - Summary: The id code in the React, Svelte and Vue files doesn't look like what the components guide describes.
  - Recommended: Fix. The guide already names the form a port should have.
  - Fix: lower `createIds(Astro.locals, prefix, id)` to a `base` const, `computed` or `$derived` (`` id ?? `${prefix}-${uid}` ``), and `ids("x")` to `` `${base}-x` ``. Found by the `framework-idioms` agent.
- [ ] (2) Tokens: there is no Figma kit. Peers build one from their tokens: Primer generates Figma variables from its token files, Material has Theme Builder, and Carbon, Spectrum and Nord ship kits. `tokens.json` is the starting point, but its values are CSS expressions (`var()`, `light-dark()`, relative colors), so a kit needs them resolved per mode first (`packages/opui/tokens.json`, `src/utils/tokens-json.ts`)
  - Summary: There is no Figma kit, and tokens.json holds CSS expressions that a kit would need resolved per mode first.
  - Recommended: Fix with option A. A resolved-tokens export is a small script over the existing `tokens.json` and is what every Figma variables importer needs.
  > Explain further
  - Explained: a kit needs values, not CSS expressions. The cheapest path is a build step that opens `theme.css` in Chromium with Playwright, reads `getComputedStyle(document.documentElement)` for every `--ui-*` token in light and dark mode (and once per example theme), and writes a DTCG `tokens.resolved.json` with resolved colors and lengths and the modes as DTCG modes. Figma's variables import (Tokens Studio, or the Variables REST API on Enterprise) reads that, with light and dark as modes of one collection. What it can't do: tokens whose value depends on where they're read (the `.ui-palette` and severity scopes, relative colors over a parent surface) only resolve at the root, so the kit gets the root values and a note; and variables aren't components, a kit with component styles is a design effort on its own.
  - Options:
    - A: a `scripts/resolve-tokens.mjs` export of resolved variables per mode and theme, published next to `tokens.json`.
    - B: a full kit with components, outside this repo.
    - C: nothing until someone asks for Figma.
  - Explained: the example previews option A in the browser: it reads `/tokens.json`, sets each token on a property of its type (`color`, `margin-inline-start`, `box-shadow` and so on) in a `.ui-light` and a `.ui-dark` scope, and prints the file an export would write. Measured in Chromium: 249 of the 251 tokens resolve (the two without a `$type` don't), 123 of them are CSS expressions in `tokens.json`, and 51 differ between light and dark; `--ui-surface`, for one, comes out as `oklch(0.98 0.01 255)` with a dark mode of `oklch(0.27 0.01 255)`. Example: resolved-tokens
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
- [ ] (2) TextField: React has 8 `{" "}` and Vue 8 `{{ " " }}` between the children of `.ui-text-field` and `.ui-field`, which are grid containers where whitespace never renders, and Svelte and Vue write content edge to edge, so tags hug each other across lines. The same noise is in Textarea, Range, NumberField and Switch (`packages/opui/components/TextField/TextField.vue:135-213`, `scripts/component-layout.mjs:94-118`)
  - Summary: The compiled form controls are full of space placeholders that never render and tags that hug across lines.
  - Recommended: Fix. The tests already treat these spaces as not rendered, so only the noise goes.
  - Fix: in `component-layout.mjs`, drop whitespace between the children of an element that every matching library rule makes a flex or grid container (the inverse of `inlineLevelByCss`), and put an `{#if}` consequent and an element's children on their own lines when they start and end with a tag or block. Rerun the contract and parity tests. Found by the `framework-idioms` agent.
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
  - Recommended: Fix with option A. Support data says only JAWS acts on `aria-busy`, so the page should say so and pair it with `disabled` and a status message.
  > Explain further
  - Explained: support data (a11ysupport.io, TPGi) says NVDA and VoiceOver ignore `aria-busy` entirely, so the button keeps its name and nothing says "busy". JAWS is the one that acts on it: it holds back the content of a busy element in Chrome and Firefox, so the button may lose its name there. ARIA only lets assistive technology "wait until the modifications are complete", so neither behavior is a bug. The visually hidden labels in the second row help nothing while JAWS hides the content.
  - Options:
    - A (recommended): keep `aria-busy` as the spinner trigger and say on the Spinner page that only JAWS acts on it (it may hide the button's content), and pair it with `disabled` and a live status message for waits that matter.
    - B: trigger the spinner from a class instead and keep `aria-busy` off buttons.
  - Still open: re-checked: the Spinner page's Basics section now says `aria-busy` announces nothing and to say what is happening in text or a `role="status"` element, which is half of option A. The Buttons section still only says to add `aria-busy="true"`, with no word on JAWS holding back a busy button's name or on pairing it with `disabled` (`src/docs/components/spinner.astro:55-80`).
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
- [ ] (2) Typography: rich text tables are `display: block` so they can scroll. Chromium keeps the table, column header and cell roles. Check with VoiceOver in Safari on `/html/components/typography/` (Default) that the table is still announced as a table with headers (`packages/opui/css/components/typography.css:641-646`)
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
