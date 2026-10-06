Severity 1-10, 10 is the most severe.

Findings with a page and section in brackets come from the stress pages in `src/stress-tests/`. Open the section named in brackets to see each one.

## Accessibility

- [x] (2) Form: the "Without fieldset" example's `div.ui-fieldset[role="group"]` has no name, since its `.ui-legend` is a `p` that nothing references. `FieldSet as="div"` and `FieldLegend as="p"` don't connect them either (`src/component-examples/form/AdaptiveOutput.html:2-3`, `src/docs/components/form.astro:232-237`, `FieldSet.astro:9-12`, `FieldLegend.astro:8`)
  - Fix:
    ```html
    <div class="ui-fieldset" role="group" aria-labelledby="delivery-legend">
      <p class="ui-legend" id="delivery-legend">Delivery</p>
    </div>
    ```
  > Fix
  - Fixed: the example gives the legend an `id` and points `aria-labelledby` at it, in HTML, Astro and Vue (`form/AdaptiveOutput.*`). The Without fieldset prose (`form.astro`) and the FieldSet `as` row (`field-set/api.ts`) say a `div` needs it. Not wired automatically: Astro would have to rewrite the rendered slot and Vue would need provide/inject plus a generated id, and a nested field set's legend could be picked up by mistake.
- [x] (3) Badge: a count is announced without context. The `Indicator` example is an icon with "5", so screen readers say just "5" (`src/component-examples/badge/Indicator.{astro,html,vue}`)
  - What I meant: `aria-label` on the indicator `<span>` doesn't fix it. A `<span>` has no role, and ARIA doesn't allow naming generic elements, so screen readers ignore the label and read the text ("5"). Badge used to do this, and now has `srLabel` (visually hidden text) instead.
  - What works: text that is in the content. Either visually hidden (`srLabel` in Astro and Vue, `.ui-sr-only` in HTML), or visible text next to the badge ("Inbox 5"). See the example: all three, with what Chromium's accessibility tree reads.
    ```html
    <span class="ui-badge-indicator"
      >5 <span class="ui-sr-only">unread messages</span></span
    >
    ```
  - Suggestion: use `srLabel` (`.ui-sr-only` in HTML) in the `Indicator` example and add an Accessibility section to the Badge docs that says so.
  > Fix
  > Go the ui-badge-indicator route, and make sure to explain (very briefly) why in the docs.
  - Fixed: the `Indicator` example puts the context in the indicator: `srLabel="unread messages"` in Astro and Vue, `5 <span class="ui-sr-only">unread messages</span>` in HTML, so it's read as "5 unread messages". Same for "99+".
  - The Badge docs have an Accessibility section: add visually hidden text inside the indicator (`srLabel` or `.ui-sr-only`), and don't use `aria-label` on the indicator, since a `<span>` without a role isn't named.
- [x] (3) FieldSet `as="div"` has no `role="group"` (`FieldSet.astro:6-9`, `FieldSet.vue:11-15`). FieldGroup sets `role="group"` after the spread, so `role="radiogroup"` is impossible in Astro (`FieldGroup.astro:19-20`)
  - Fixed: FieldGroup no longer sets `role="group"`. It's a layout wrapper inside a `<fieldset>`, which is already a group, so screen readers announced two groups. A `role` passed to FieldGroup now renders. FieldSet with `as` set to anything other than `fieldset` gets `role="group"` (before the spread, so it can be overridden). The HTML examples drop `role="group"` from `.ui-field-group`.
- [x] (3) Avatar: the image examples use `alt="Avatar"`, and the docs have no Accessibility section on naming letter and icon avatars (`src/component-examples/avatar/Image.{astro,html,vue}`, `Variants.{astro,html,vue}`, `src/docs/components/avatar.astro`)
  - Example: `alt="Jane Doe"` on images. For letters, `<div class="ui-avatar" role="img" aria-label="Jane Doe">JD</div>`. For decorative avatars next to a visible name, `alt=""` or `aria-hidden="true"`.
  > Fix
  - Fixed: image avatars use real names in `alt` (`Image.*`, `Variants.*`), letter avatars get `role="img"` and an `aria-label` (`Letter.*`), and Grouped names the group and each avatar (`Grouped.*`). New Accessibility section on the Avatar page: the name as `alt` (or `alt=""` when the name is next to it), `role="img"` + `aria-label` for initials and icons (or `aria-hidden="true"`), and an `aria-label` for link and button avatars and groups.
- [x] (3) Button group examples: `WithIcons` puts `aria-label="Label"` on all three buttons, so the visible "Maybe" is announced as "Label". `Vertical` names the plus icon "Up" and pairs it with "Decrease" (`src/component-examples/button-group/WithIcons.html:2,16,18`, `WithIcons.{astro,vue}`, `Vertical.html:3,37,71,105`, `Vertical.{astro,vue}`)
  - Fix: name the icon buttons "OK" and "No" (`iconOnly label="OK"` in Astro and Vue), drop the label on "Maybe", and rename "Up" to "Increase".
  > Fix
  - Fixed: the icon buttons are "OK" and "No" (`iconOnly label` in Astro and Vue), "Maybe" has no label, and "Up" is "Increase" (`button-group/WithIcons.*`, `Vertical.*`).
- [x] (3) Switch: an invalid switch barely shows focus. `&[data-invalid] input` and `&:has(:user-invalid) input` set `outline` with higher specificity than the `:focus-visible` rule, so on focus the red ring only moves out by `--focus-ring-offset` (`switch.css:48-52,263-269`)
  - Fix: give the invalid ring an offset and a different width, or only apply it with `:not(:focus-visible)`.
  > Explain further and provide an example
  - Why: the focus rule `:where(.ui-switch) :where(input[type="checkbox"][role="switch"]):focus-visible` is (0,1,0). The invalid rules `:where(.ui-switch)[data-invalid] input` and `:where(.ui-switch):has(:user-invalid) input` are (0,1,1), so they win the `outline` shorthand. Focus only adds `outline-offset`. `form.css:85-90` has the same pattern for `.ui-fieldset[data-invalid] .ui-switch input`.
  - Measured in Chromium:

    |                  | `outline`                       | `outline-offset` |
    | ---------------- | ------------------------------- | ---------------- |
    | Valid, rest      | none                            | 0                |
    | Valid, focused   | `2px solid` inverted page color | 2px              |
    | Invalid, rest    | `2px solid oklch(0.53 0.2 25)`  | 0                |
    | Invalid, focused | `2px solid oklch(0.53 0.2 25)`  | 2px              |

    Focus only shifts the red ring 2px, and invalid switches ignore `--focus-ring-color` and `--focus-ring-style`. In forced colors the red ring turns `CanvasText`, so an invalid switch at rest looks focused.

  - Options:
    - A (recommended): draw the invalid ring as a `box-shadow` and leave `outline` to focus, pushed outside the red ring. It looks the same at rest. Forced colors drop the shadow, so it no longer looks focused there (the end text still says it's invalid). Same change in `form.css`.
      ```css
      &[data-invalid],
      &:has(:user-invalid) {
        input {
          border-radius: var(--radius-round);
          box-shadow: 0 0 0 var(--focus-ring-width) var(--invalid-color);
        }

        input:focus-visible {
          outline-offset: calc(
            var(--focus-ring-offset) + var(--focus-ring-width)
          );
        }
      }
      ```
    - B: apply the red ring only with `input:not(:focus-visible)`. Simpler, but the red ring disappears exactly while the user fixes the field.
    - C: color the track border. It's only 1px, and checked switches already use the accent there.
  - See the example: focus rings forced on (current vs proposed), plus real switches to Tab through.
  > Fix
  - Fixed with option A: the invalid ring is a `box-shadow` (`0 0 0 var(--focus-ring-width) var(--invalid-color)`), so `outline` is left to focus, and a focused invalid switch pushes the focus ring outside the red one (`outline-offset: calc(var(--focus-ring-offset) + var(--focus-ring-width))`). Same in `form.css` for an invalid fieldset (`switch.css`, `form.css`).
  - Checked in Chromium, light and dark: at rest the same 2px red ring as before, on focus a 2px focus ring 4px out with the red ring still visible. More contrast: 3px rings, 5px offset. Valid switches are unchanged. In forced colors the red ring is dropped, so an invalid switch no longer looks focused at rest (the end text still says it's invalid).
  - Side finding: the focus ring on a valid switch is square, since the input only gets `border-radius` when it's invalid.
- [x] (3) Badge: success fills are too light for white text, 4.47:1 (needs 4.5:1). Info was the same (4.02:1) and passes now that `--info` uses hue 240 (4.58:1), but the margin is thin, and the stress pages only use info, so axe never sees success (`badge.css`, `theme.css`)
  - Fix: cap the lightness of the fills with white text, the same pattern as the `min(l, 0.45)` Badge uses with more contrast. A theme with darker severity colors is unchanged.
    ```css
    &.ui-success {
      --_bg-color: oklch(from var(--success) min(l, 0.48) c h);
      --_border-color: var(--_bg-color);
    }
    ```
    Measured before the hue change: info 4.95:1, success 5.44:1, critical 6.75:1 with `min(l, 0.48)`.
  - The four info badge `color-contrast` keys are gone from `a11y-known-violations.json` (re-recorded with `pnpm test:e2e:record-a11y`).
  > Fix
  - Fixed: critical, info and success fills use `oklch(from var(--…) min(l, 0.48) c h)`, and the border follows the fill. With more contrast, light mode uses the same cap and dark mode keeps `min(l, 0.45)`. Warning (dark text) is unchanged (`badge.css`).
  - Measured in Chromium with white text, light and dark: critical 5.54 → 6.77:1, info 4.58 → 5.66:1, success 4.44 → 5.45:1. More contrast: unchanged in light (already darker), 6.14–7.37:1 in dark. Badge visual baselines change in CI.
- [x] (4) Avatar `<img>` has no `alt` attribute when `alt` is omitted (`Avatar.astro:28`, `Avatar.vue:37`)
  > at least in the types alt on images shouldn't be optional. Also, on icon-only buttons label should be non-optional too.
  - Fixed (Avatar): `alt` is required in the types whenever `src` is set (`{ alt: string; src: string } | { alt?: never; src?: never }` in `Avatar/types.ts`, used by Astro, Vue, Svelte and Solid). `alt=""` is still allowed for decorative images. The `<img>` always renders `alt`.
  - Icon-only buttons: Button can't know it is icon-only. The icon is slot content, and neither Astro nor Vue can type slot content or tie a prop to it, so a union keyed on "icon-only" isn't sound. Options:
    1. An `iconOnly` discriminant: `{ iconOnly: true; label: string } | { iconOnly?: false; label?: string }`. Type-only (styling already comes from `:has(> svg:only-child)`), and only checked when people remember to set it.
    2. A small `IconButton` component whose `label` is required, rendering `<Button aria-label={label}>` with the icon as its only child:
       ```astro
       <IconButton label="Close" commandfor="drawer" command="close">
         <svg>…</svg>
       </IconButton>
       ```
  - Recommendation: 2. It's the only option where TypeScript catches a missing name, and the e2e axe run (`button-name`) still catches plain `<Button>` without a label.
  > option 1 - we have to trust users a little bit here
  - Fixed with option 1: Button's types take `iconOnly`. `{ iconOnly: true; label: string } | { iconOnly?: false; label?: string }` in `Button/types.ts` (Astro, Vue, Svelte, Solid), so `iconOnly` without `label` is a type error. Types only: Astro drops the prop, nothing is rendered for it, and styling still comes from `:has(> svg:only-child)`.
  - The `IconOnly` examples use `iconOnly label="Edit"` (Astro) and `icon-only label="Edit"` (Vue). Button API has an `iconOnly` row.
- [x] (4) Drawer has no accessible name: the `DrawerHeader` heading isn't wired to `aria-labelledby` (`Drawer.astro:21-35`, `Drawer.vue:23-37`, `DrawerHeader.astro:22`, `DrawerHeader.vue:26`)
  > propose a solution
  - Today `<dialog class="ui-drawer">` gets no name at all (CDP name `""`), so screen readers announce just "dialog".
  - Dialog's approach (wrap the header slot in `hgroup id` and point `aria-labelledby` at it) doesn't fit Drawer: the header also holds the close button, so the name becomes "Settings Close". Point at the heading instead:
    ```html
    <dialog
      class="ui-drawer ui-inline-start"
      id="settings"
      aria-labelledby="settings-heading"
      closedby="any"
    >
      <div class="ui-header">
        <h2 id="settings-heading">Settings</h2>
        <button
          class="ui-button ui-rounded ui-ripple ui-small"
          aria-label="Close"
          commandfor="settings"
          command="close"
        >
          …
        </button>
      </div>
    </dialog>
    ```
    That's what HTML users write (and what the HTML examples should show). Name: "Settings".
  - Astro: `Drawer` renders the header slot to a string and gives the first heading an id, the way `TabsItem.astro` already injects `for`/`id`. Skipped when `aria-label`/`aria-labelledby` is passed, and a heading that already has an id is reused:
    ```js
    const named = rest["aria-label"] || rest["aria-labelledby"]
    let header = Astro.slots.has("header")
      ? await Astro.slots.render("header")
      : undefined
    let labelledBy
    if (header && !named) {
      header = header.replace(
        /<(h[1-6])\b(?![^>]*\sid=)/,
        (_, tag) => `<${tag} id="${drawerId}-heading"`,
      )
      labelledBy = header.match(/<h[1-6]\b[^>]*\sid="([^"]+)"/)?.[1]
    }
    ```
    then `aria-labelledby={labelledBy}` on `dialog` and `<Fragment set:html={header} />` instead of `<slot name="header" />`. Prototyped with the Astro container: `heading="Settings"` gives `aria-labelledby="settings-heading"` + `<h2 id="settings-heading">`, a custom `<h3 id="mine">` gives `aria-labelledby="mine"`, and `aria-label="Menu"` leaves the header untouched.
  - Vue: `provide`/`inject` like Tabs. `Drawer` provides `${drawerId}-heading` and sets `aria-labelledby` to it when `slots.header` exists and no `aria-label`/`aria-labelledby` attr is passed. `DrawerHeader` renders `<h2 v-if="heading" :id="headingId">`. A custom heading in the default slot can't be detected during SSR, so docs say: with your own heading, pass `aria-labelledby` (or `aria-label`) to `Drawer`.
  - Recommendation: do both, update the HTML examples, and add a line to the Drawer accessibility docs.
  > Fix
  - Fixed as proposed. Astro: `Drawer` renders the `header` slot and points `aria-labelledby` at its first heading, reusing the heading's `id` or adding `<drawer id>-heading`. Skipped when `aria-label` or `aria-labelledby` is passed.
  - Vue: `Drawer` provides `<drawer id>-heading` (`DrawerHeadingIdKey`), and `DrawerHeader` puts it on its `h2`. `Drawer` sets `aria-labelledby` when the `header` slot has a `DrawerHeader` with `heading`, or a heading element with an `id`. A heading anywhere else can't be found during SSR, so the docs say to pass `aria-labelledby` or `aria-label` then.
  - The HTML examples (`drawer/Usage`, `drawer/Blurred`) have `aria-labelledby` and a heading `id`. The Drawer accessibility docs explain it per framework. Parity snapshots updated (intended).
- [x] (4) Divider disappears in forced colors: it's drawn with `background-color` (`divider.css:3`)
  > show me with an example
  - Forced colors replace every author `background-color` with `Canvas` (keeping alpha). `.ui-divider` is a 1px box with only a background (`border: 0` from normalize), so it becomes `Canvas` on `Canvas`: measured `#ffffff` on `#ffffff` (light) and `#000000` on `#000000` (dark). Borders and system colors aren't overridden, which is why other components survive.
  - See the example: the second row simulates it. For the real thing, DevTools > Ctrl/Cmd+Shift+P > "Show Rendering" > "Emulate CSS media feature forced-colors: active".
  - Fix (author system colors are kept in forced colors):
    ```css
    @media (forced-colors: active) {
      :where(.ui-divider) {
        background-color: CanvasText;
      }
    }
    ```
    Verified: the line is black in light and white in dark high contrast. Covers the `.ui-border-*` variants too, since they only change `background-color`.
  > Fix
  - Already fixed by the high contrast commit (`3728408`): in forced colors the divider is a `CanvasText` top border with no height (`divider.css`), so the `.ui-border-*` variants show too.
- [x] (4) Forced colors: the unchecked Switch dot (only `background-color`, outline is `0`) and the selected ToggleButton (only a background tint) are invisible (`switch.css:11,56-66`, `toggle-button.css:73-81`)
  > show me with an example
  - Same cause as Divider: forced colors turn author backgrounds into `Canvas` but keep borders and outlines (as `CanvasText`). Measured with emulation:
    - Switch off: the track keeps its border, but the dot (`::after`, background only, `--_dot-outline-size: 0`) is `Canvas`, so the off switch is an empty pill. On works by accident: the checked dot has a 3px outline, so it shows as a ring.
    - ToggleButton: the selected tint `oklch(from var(--primary) l c h / 25%)` becomes `Canvas`, so "Bold (on)" and "Italic (off)" look identical, and the selected item in a ToggleGroup is invisible. Also, the group's separators are `box-shadow`, which forced colors drop.
  - Fix with system colors (verified in emulation, light and dark):
    ```css
    @media (forced-colors: active) {
      :where(.ui-switch) {
        --_accent-color: SelectedItem;
        --_accent-contrast: SelectedItemText;
        --_dot-bg-color: CanvasText;
      }

      :where(.ui-toggle-button):has(
        :where(input[type="checkbox"], input[type="radio"]):checked
      ) {
        --_button-bg-color: SelectedItem;

        color: SelectedItemText;
        forced-color-adjust: none;
      }
    }
    ```
    The off dot becomes `CanvasText`, the on track `SelectedItem` with a `SelectedItemText` dot. `forced-color-adjust: none` is needed on the selected toggle: without it Chromium paints its `Canvas` text backplate behind the label, and the `SelectedItemText` label disappears into it.
  - See the example (live row with emulation on, simulated row without).
  > Fix
  - Switch and ToggleButton were already fixed by the high contrast commits (`3728408`, `abafd84`): the Switch uses `SelectedItem`/`SelectedItemText`/`CanvasText` (and `GrayText` when disabled), and a selected ToggleButton is `SelectedItem` with `SelectedItemText` and `forced-color-adjust: none`.
  - New: the ToggleGroup separators were still `box-shadow`, which forced colors drop. In forced colors they're `CanvasText` start borders with a matching negative margin (`toggle-group.css`). Checked in Chromium with `forcedColors: "active"`: the group is the same width, and each item gets a 1px separator.
- [] (4) Dialog and Drawer docs: the Tab and Shift+Tab rows say focus wraps from the last element to the first, as in the APG custom dialog. A native modal `<dialog>` doesn't trap focus. Tab moves on to the browser UI (`dialog.astro:342-367`, `drawer.astro:364-389`)
  > Explain further and provide an example
  - A native modal `<dialog>` doesn't trap focus. `showModal()` puts it in the top layer and makes the rest of the document inert (HTML spec, "blocked by a modal dialog"), so focus can't reach the page behind it. But nothing keeps focus in the document: after the last element, Tab goes to the browser's own UI (address bar, toolbar), and the next Tab comes back to the first element in the dialog.
  - Measured in Chromium 141 with two buttons in a modal and one page button before and after it: Tab went "One" → "Two" → browser UI (`document.hasFocus()` false) → "One". The page buttons were never reached. Shift+Tab mirrors it. Not checked in Firefox or Safari.
  - Also native, so the docs can rely on it: opening focuses the first focusable element (or `autofocus`), Esc closes unless `closedby="none"`, and closing returns focus to the element that was focused before.
  - The current rows describe the APG custom dialog, which wraps focus with a script the library doesn't ship. Proposed rows (Drawer the same, with "drawer"):

    | Key         | Function                                                                                                                                                                                                                  |
    | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Tab         | Moves focus to the next focusable element in the dialog. After the last one, focus moves to the browser's own controls (like the address bar), then back to the first element in the dialog. The page behind it is inert. |
    | Shift + Tab | Moves focus to the previous focusable element. Before the first one, focus moves to the browser's controls, then to the last element in the dialog.                                                                       |
    | Esc         | Closes the dialog, unless `closedby="none"`, and returns focus to the element that opened it.                                                                                                                             |

    Point "Source:" at MDN's `<dialog>` accessibility section, and keep the APG link only for the pattern.

  - See the example: open the dialog and Tab past the end, with a log of where focus goes ("Open in a new tab" shows the browser UI case).
  > Explain further
  > this is what I get:
  >
  > Tab: focus on "Subscribe"
  > Tab out: focus on outside the page (browser UI)
  > Tab back in: focus on "Not now"
  > close: focus on "Open dialog"
  - That's exactly the behavior this item is about: the browser does the right thing, the docs describe something else. Your steps next to the current rows:

    | Your step                | What happened | What the docs say                         |
    | ------------------------ | ------------- | ----------------------------------------- |
    | Tab to the last button   | "Subscribe"   | Same                                      |
    | Tab past the last button | Browser UI    | Focus wraps straight to the first element |
    | Tab again                | "Not now"     | Not mentioned                             |
    | Close                    | "Open dialog" | Only mentioned for Esc                    |

  - So there's no focus trap. `showModal()` makes the page behind the dialog inert, which is why Tab never reached "Behind the dialog (inert)", but the browser's own UI stays in the tab order. That's fine, and keyboard users can still reach the address bar. The APG pattern wraps focus with a script, which the library doesn't ship and doesn't need.
  - Fix: docs only. Replace the Tab and Shift+Tab rows on both pages with the proposed rows above, and say that closing returns focus to the opener. No component or CSS change.
- [x] (4) Drawer docs: the "Role & attributes" table still lists `role="dialog"` and `aria-modal="true"`. Dialog's table now says not to add them, because `<dialog>` has the role and `showModal()` makes it modal (`drawer.astro:305-345`, `dialog.astro:282-287`)
  - Fix: copy Dialog's paragraph and keep only the `aria-labelledby` and `aria-describedby` rows.
  > Fix
  - Fixed: Dialog's paragraph (don't add `role="dialog"` or `aria-modal="true"`), and only the `aria-labelledby` and optional `aria-describedby` rows (`drawer.astro`).
- [x] (5) Astro ClassicSelect: `aria-labelledby` also points at the label id when only a `label` slot is passed, but the label span only renders for the `label` prop and there is no `label` slot (`ClassicSelect.astro:41-45,51`)
  > show me the issue with an example
  - `ClassicSelect.astro` renders the label span only for the `label` prop (`label && <span class="ui-label" id={labelId}>`), and the template has no `<slot name="label" />`. But `aria-labelledby` is set for `label || Astro.slots.has("label")`. Rendered with the Astro container:
    ```html
    <!-- <ClassicSelect label="Fruit"> -->
    <label class="ui-select"
      ><span class="ui-label" id="select-label-9fb5af6a">Fruit</span
      ><span class="ui-field"
        ><select aria-labelledby="select-label-9fb5af6a" id="select-f1be905d">
          …
        </select></span
      ></label
    >

    <!-- <ClassicSelect><Fragment slot="label">Fruit</Fragment>…</ClassicSelect> -->
    <label class="ui-select"
      ><span class="ui-field"
        ><select aria-labelledby="select-label-fb105439" id="select-e49c93c2">
          …
        </select></span
      ></label
    >
    ```
  - With the slot, "Fruit" is silently dropped (no visible label) and `aria-labelledby` points at an id that doesn't exist. Chromium marks it invalid and the name is `""`: the combobox is unlabeled. The wrapping `<label>` doesn't rescue it, since it has no text left.
  - Dropping `aria-labelledby` isn't the fix either: then the name comes from the wrapping `<label>` and includes the end text ("Fruit Pick one"), which is why the id is there.
  - Fix: support the slot the way `Select.astro` already does (`(label || Astro.slots.has("label")) && <span class="ui-label" id={labelId}>{label}<slot name="label" /></span>`), and add a `label` slot to `ClassicSelect.vue` (`Slots` only has `default`), with `aria-labelledby` set for `props.label || slots.label`. See the example for both markups.
  > why do we need an aria-labelledby here? I think we should remove it. "bad aria attrs is worse than no aria attrs". We wrap everything in a label. I think this should just be cleaned up.
  - Fixed: `ClassicSelect` (Astro and Vue) no longer sets `aria-labelledby` or a label `id`. The name comes from the wrapping `<label>`, like TextField. The `select/Classic` HTML example drops them too (snapshot updated).
  - Side effect: with `endText`, the name now includes it ("Fruit Pick one"), like TextField. It's also still the description through `aria-describedby`.
- [x] (5) Docs Search: the input has no label, the dialog has no name, filter chips are non-focusable `div`s, and results use `aria-selected` without listbox/option roles (`Search.astro:6-13,37-64,228,407-412`)
  > Fix
  - Fixed: the dialog has `aria-label="Search docs"`, the input is a `role="combobox"` with `aria-label`, `aria-autocomplete="list"`, `aria-controls` (recent or results list), `aria-expanded` and `aria-activedescendant` that follows ↑/↓.
  - Results and recent searches are `role="listbox"` with `role="option"` items (`aria-selected="true"/"false"`, stable ids). Result categories are `ul[role="group"]` labelled by their heading. Items no longer contain a focusable link (axe `nested-interactive`): clicking or Enter navigates, Ctrl/⌘-click opens a new tab.
  - Filter chips are `<button type="button" aria-pressed>` (`Chip as="button"`) in a `role="group"` labelled "Filter by category", so they're reachable with Tab and work with Enter/Space; ←/→ in the input still switches category.
  - "No recent searches in this category" moved out of the listbox. `.command-list` got `tabindex="0"` (axe `scrollable-region-focusable`, `src/components/Command.astro`).
  - axe (`@axe-core/playwright`) on the open dialog: 0 violations with results, empty, filtered-empty and recent-searches states.
- [x] (5) Tabs accessibility section documents `role="tab"` on `label` inside a radio-based `role="tablist"`, which axe flags (`aria-allowed-role`, `aria-required-children` for every tabs example in `a11y-known-violations.json`) (`tabs.astro:112-153`)
  > explain further what the issue is
  - The tabs are radio buttons: `input[type=radio]` + `label.ui-tab-label` + `div[role=tabpanel]`, all direct children of `.ui-tabs[role=tablist]`. The docs table (and `TabsTab` in Astro/Vue) add `role="tab"` to the `label`.
  - What axe flags on every tabs example (checked on `tabs/Basics.html`):
    - `aria-allowed-role`: `role="tab"` isn't allowed on `label`.
    - `aria-required-children`: a `tablist` may only own `tab`s, but it owns `input[aria-controls]` (radios) and `[role=tabpanel]`.
  - What a screen reader gets (Chromium accessibility tree):
    ```
    tablist
      radio "Profile" (checked, focusable)
      tab "Profile" (selected=false, not focusable)
      tabpanel "Profile"
      radio "Settings"
      tab "Settings" (selected=false)
      …
    ```
    Focus lands on the radios ("Profile, radio button, checked, 1 of 3"), so the tabs are never focused and all report "not selected", even the open one. Browse mode lists every tab twice (radio + tab). The roles promise a widget that the keyboard behavior doesn't deliver.
  - Options:
    - A (recommended): drop `role="tablist"` and `role="tab"`, and describe them as what they are: a radio group that shows a panel. Arrow keys already move and select (like automatic tabs), and screen readers announce a correct, consistent radio group. Optionally `role="radiogroup"` + `aria-label` on `.ui-tabs`, and keep `role="tabpanel"` off too (or `role="region"` with `aria-labelledby` when panels need a landmark). Both axe entries go away for all 10 tabs keys in `a11y-known-violations.json`.
    - B: real ARIA tabs (`button role="tab"` with `aria-selected`, roving `tabindex`). Needs JS, so it's not the CSS-only component anymore.
    - C: keep it and keep the ledger entries. Not recommended: the roles actively misreport state.
  - Fixed (option A): Tabs, TabsTab and TabsPanel render no `tablist`, `tab` or `tabpanel` roles, and TabsItem no `aria-controls`. `panelId` (TabsItem, TabsPanel) and `tabId` (TabsPanel) are gone, since nothing references the panel anymore. `tabs.css` selects by class only. The accessibility docs describe a radio group and say how to name it (`role="radiogroup"` + `aria-label` on `.ui-tabs`). The tabs entries are removed from `a11y-known-violations.json`.
- [x] (5) Link hover/focus color `--primary-light` is about 2.8:1 on the default light surface (`link.css:11-14`, `typography.css:317-320`, `theme.css:71`)
  > Explain further and provide an example
  - `--primary-light` is `oklch(from var(--primary) calc(l * 1.25) c h)`, so in light mode it makes a mid-tone link lighter, toward the light page. Measured with the default palette:

    |                                                   | Default surface `#f4f9ff` | Tonal surface `#e3e8ef` |
    | ------------------------------------------------- | ------------------------- | ----------------------- |
    | Light rest `--primary` `#447b46`                  | 4.76:1                    | 4.09:1                  |
    | Light hover `--primary-light` `#6ba36c`           | 2.80:1                    | 2.41:1                  |
    | Light hover `--primary-dark` `#1c5422` (proposed) | 8.48:1                    | 7.29:1                  |
    | Dark rest `--primary` `#67aad7` on `#23272b`      | 5.95:1                    | 4.46:1 (`#373b40`)      |
    | Dark hover `--primary-light` `#9fe3ff`            | 10.67:1                   | 8.00:1                  |

    Text needs 4.5:1, and hover/focus is exactly when the user is reading the link. Dark mode is fine, since lighter means more contrast there.

  - Fix: darken in light, keep lightening in dark (`link.css` `.ui-link[href]` and `typography.css` rich text `a[href]`):
    ```css
    &:hover,
    &:focus-visible {
      color: light-dark(var(--primary-dark), var(--primary-light));
    }
    ```
  - Side finding: the rest color is also under 4.5:1 on tonal surfaces in light mode (4.09:1). That's a `--primary` choice, not a hover issue. See the example: live ratios per scheme and surface, and hoverable links.
  > Fix
  > ok, and on hover, set text-decoration-thickness: 3px
  - Fixed: `.ui-link[href]` and rich text links use `light-dark(var(--primary-dark), var(--primary-light))` on hover and focus, so they get darker in light mode (8.48:1 on the page) and lighter in dark mode. The underline follows the text color and is `3px` thick (`link.css`, `typography.css`).
  - The thicker underline also marks hover where the color can't change: links on filled surfaces (see the ledger item) are already `--primary-dark` at rest in light mode, and links in a `mark` keep `MarkText`.
  - Checked in Chromium: hover and focus color and thickness in light and dark.
- [x] (5) Checkbox forced-colors block loses on specificity: `label.ui-checkbox input:checked` (0,2,2) can't beat `input[type="checkbox"]:checked` (0,3,2), so the box isn't `SelectedItem` and the `SelectedItemText` checkmark sits on a forced `Canvas` fill (~1.9:1) (`checkbox.css:145-149,198-212`)
  > Explain further and provide an example
  - Base rule (before the fix): `label.ui-checkbox input[type="checkbox"]:checked` is (0,3,2). Forced block: `label.ui-checkbox input:checked` is (0,2,2). Same layer, and `@media` adds no specificity, so the base `background-color: var(--_accent)` wins and forced colors turn it into `Canvas`. The checkmark rule (`input:checked::after`, (0,2,3)) ties with the base `::after` and comes later, so it does apply: a `SelectedItemText` mark on a `Canvas` box. Measured before the fix with emulation: light `#ffffff` mark on a `#ffffff` box (1:1, a checked box looks unchecked), dark `#3b3b3b` on `#000000` (1.87:1).
  - Fixed: the forced block uses `input[type="checkbox"]` (same selector as the base, later in source, so it wins). Verified: the checked box is `SelectedItem` (`#1967d2` light, `#99c8ff` dark) with a `SelectedItemText` mark, 5.37:1 and 6.43:1. Wrapping the root in `:where(label.ui-checkbox)` doesn't change the outcome on its own: both rules lose the same (0,1,1), so the old `input:checked` (0,1,1) would still lose to `input[type="checkbox"]:checked` (0,2,1). The attribute selector is the fix. Radio already used `input[type="radio"]` in its forced block.
  - See the example: live checkbox plus a simulated before/after.
- [x] (8) Dark mode: `--border-color`, `--surface-tonal` and `--surface-elevated` are the same gray, so borders (field borders too) vanish on tonal and elevated surfaces and tonal/elevated cards look the same (`layout` Surfaces, SidebarLayout)
  > borders on tonal and elevated should have the same color as the background
  - Fixed: tonal and elevated cards (and dialogs, which are elevated cards) have a border in the page background color, so a tonal card on a tonal surface stays visible. Inside them, `--border-color` and `--field-border-color` are the page background in dark mode, so dividers and field borders show too (`theme.css` "Raised surfaces"). Light mode only changes the card's own border. The theme generator copies the block from `theme.css`.
- [x] (8) Accordion `summary` focus ring is mostly invisible: the accordion is a `.ui-card` with `overflow: hidden`, which clips the outward `outline-offset: 2px` ring on the top and sides (`card.css:30`, `accordion.css:71`)
  > Explain further and provide an example
  - The focus ring is the global `:focus-visible` outline: `2px` wide at `outline-offset: 2px`, so it's drawn 2–4px outside the `summary`. In a `.ui-card` accordion, the `summary` fills the card edge to edge, and `.ui-card` has `overflow: hidden`, which clips everything outside the padding box. A closed accordion shows no ring at all. An open one only shows the bottom edge, where the content follows.
  - Fix (recommended): draw the ring inside, using the existing token:
    ```css
    :where(details.ui-accordion) > summary:focus-visible {
      outline-offset: var(--focus-ring-inset);
    }
    ```
    All four edges show (verified in light and dark). The corners are clipped slightly by the card's radius. Add `border-radius: inherit` on the summary if that matters.
  - `overflow: clip` + `overflow-clip-margin` on the card also works, but it needs a margin larger than offset + width (4px wasn't enough in Chromium, 6px was). It also lets the ring spill over the card border, and it changes overflow for every card. Not worth it here.
  - See the example: rings forced on (current vs inset) plus real accordions to Tab through.
  > For <summary> I think the outline-offset could be -1 * thickness*2? Or at least when I set it to 4px it looked better and the outline wasn't cut off.
  - Fixed: `summary:focus-visible` has `outline-offset: calc(-2 * var(--focus-ring-width, 2px))` (`-4px` by default, `-6px` with the 3px high contrast ring), so the ring sits a ring-width inside the edge and isn't clipped. It also gets the accordion's `--_border-radius`, so the corners follow the card. `border-radius: inherit` doesn't work there: `summary` is slotted, so it inherits from the details' internal `<slot>` (0px).
  - Checked in Chromium: computed `-4px` once the normalize `outline-offset` transition ends.
- [x] (10) Closed drawers are rendered off-screen and keyboard focusable: `dialog.ui-drawer` needs `display: none` when closed (`overlays` DrawerSides)
  - Fixed: `dialog.ui-drawer:not([open])` is `display: none`. The close transition still runs (`display` transitions with `allow-discrete`).

## Bugs

- [x] (2) Dense list padding doesn't line up with card padding, and `.ui-inset` text offset assumes default gaps (`data-display` ListSurfaces)
  - Fixed: dense rows keep the card's inline padding (`--size-3`). Item gap and leading size are `--_item-gap` and `--_start-size`, which dense sets, and `.ui-inset` uses both.
- [x] (2) Dividers inside cards have very large margins (`--size-fluid-3`) (`layout` SidebarLayout)
  > what is the proposed fix. it should be elegant and scalable.
  - A public token with containers opting into a tighter value. It inherits, so it reaches dividers at any depth:
    ```css
    .ui-divider {
      margin-block: var(--divider-space, var(--size-fluid-3));
    }

    :where(.ui-card, .ui-dialog, .ui-drawer, .ui-callout) {
      --divider-space: var(--size-3);
    }
    ```
    Users can set `--divider-space` on any wrapper. Dividers that are direct children of a flex or grid container with `gap` (like a card) could get `margin-block: 0`, since the gap already spaces them.
  > Fix
  - Fixed: `.ui-divider` uses `margin-block: var(--divider-space, var(--size-fluid-3))`. `--divider-space` is a theme token (`theme.css`, "Divider", default `--size-fluid-3`), and cards, callouts, dialogs and drawers set it to `--size-3` ("Compact surfaces" scope in `theme.css`). It inherits, so it reaches dividers at any depth, and you can set it on any wrapper.
  - A divider that is a direct child of a card gets `margin-block: 0`, since the card's `gap` already spaces it (`divider.css`).
  - Documented in the Divider docs (new "Spacing" section and example) and in the CSS variables table of the Divider API.
- [x] (2) Narrow-container table padding grows instead of shrinking (`data-display` TableOverflow)
  - Fixed: removed with the table container queries (see above).
- [x] (2) `.ui-marker-turn` rotates `90deg` in RTL too, so a mirrored (left-pointing) chevron turns up instead of down (`accordion.css:106-108`)
  > Fix
  - Fixed: `.ui-marker-turn[open]:dir(rtl) > summary svg` rotates `-90deg`, so a mirrored chevron turns down (`accordion.css`).
- [x] (2) Classes emitted with no CSS: `ui-tonal` (`Callout.astro:20`), `ui-title` (`Callout.astro:79`), `ui-default` (`Accordion.astro:22`), `ui-align-start` (`Card.astro:28`, `Dialog.astro:39`), `ui-column` (`FieldGroup.astro:17`), `ui-description` (`Description.astro:7`). On Dialog it's a real bug: `dialog.css:43-46` always sets `justify-content: end`, so `actionsAlign="start"` does nothing
  > Explain further and provide an example
  - Four of the six classes are harmless no-ops. They mirror a prop, and the default look already covers them: `ui-tonal` (Callout's base style is tonal), `ui-default` (Accordion's base style), `ui-title` (Callout styles any `h1`-`h6` in `.ui-content`) and `ui-description` (`description-list.css` styles the `dd` element). They can stay as styling hooks.
  - Two are real bugs:
    1. Dialog `actionsAlign="start"` does nothing. Dialog outputs `<div class="ui-actions ui-align-start">`, but `dialog.css` (`.ui-actions { justify-content: end; padding-inline: var(--size-3) var(--size-1) }`, in `components.extended`) beats everything in `card.css`. Measured computed style: `justify-content: end`.
    2. FieldGroup `direction="column"` is ignored when the group holds only buttons. The buttons-only rule (`form.css`, `&:has(> .ui-button):not(:has(> :not(.ui-button)))`) sets `flex-direction: row`, and `.ui-column` has no rule, so the buttons still sit side by side.
  - Fix:

    ```css
    /* dialog.css */
    .ui-actions {
      justify-content: end;
      padding-inline: var(--size-3) var(--size-1);

      &.ui-align-start {
        justify-content: start;
        padding-inline: var(--size-1) var(--size-3);
      }
    }

    /* form.css: the buttons-only row skips .ui-column */
    &:has(> .ui-button):not(.ui-column, :has(> :not(.ui-button))) {
    ```

  - With the `form.css` change, a column of buttons stretches to full width (the flex column default). Add `align-items: start` to `.ui-column` if they should keep their own width; the example does this.
  - Example: `dialog-actions-align`.
  > Fix
  - Fixed both bugs as proposed: Dialog `.ui-actions.ui-align-start` is `justify-content: start` with mirrored padding (`dialog.css`). The buttons-only FieldGroup row skips `.ui-column` (`form.css`), and a buttons-only `.ui-column` keeps the buttons' own width (`align-items: start`).
  - The other four classes stay as styling hooks.
  - Checked in Chromium: `actionsAlign="start"` is `justify-content: start`, and a buttons-only `direction="column"` group is a column.
- [x] (2) HTML Range shows no track fill in Chromium/Safari (only Firefox has `::-moz-range-progress`): only the Astro/Vue components set `--_track-fill` with JS, and the Range docs don't say HTML users need to (`range.css:215,243`, `Range.astro:133`, `Range.vue:40`)
  > Explain further and provide an example
  - The WebKit/Blink track is painted as `background-size: var(--_track-fill, 0%) 100%` on `::-webkit-slider-runnable-track`. `--_track-fill` is set only by the script in `Range.astro` and `Range.vue`, so this plain HTML shows a gray track with no fill in Chromium and Safari:

    ```html
    <label class="ui-range">
      <span class="ui-label">Volume</span>
      <input type="range" value="60" />
    </label>
    ```

  - Firefox fills the track natively with `::-moz-range-progress`.
  - Option A, a documented one-liner. Checked in Chromium.

    ```html
    <input
      type="range"
      min="0"
      max="100"
      value="60"
      style="--_track-fill: 60%"
      oninput="this.style.setProperty('--_track-fill', (this.value - this.min) / (this.max - this.min) * 100 + '%')"
    />
    ```

    The short formula needs explicit `min`/`max`, because `this.min` is `""` without them. Documenting it means making the property public (for example `--range-fill`), since `--_` properties are private. Inline handlers are blocked under a strict CSP, so the docs should show the `addEventListener` form too.

  - Option B, CSS only with a scroll-driven animation. `--_track-fill` is already registered as `<percentage>`, so it can be animated:

    ```css
    .ui-range input[type="range"] {
      animation: ui-range-fill linear both;
      animation-range: contain;
      animation-timeline: --ui-range-thumb;
      block-size: calc(var(--_thumb-size) + 2 * var(--size-2));
      margin-block: calc(
        var(--size-4) / 2 - var(--_thumb-size) / 2 - var(--size-2)
      );
      overflow: hidden;
      timeline-scope: --ui-range-thumb;

      &:dir(rtl) {
        animation-direction: reverse;
      }

      &::-webkit-slider-thumb {
        view-timeline: --ui-range-thumb inline;
      }
    }

    @keyframes ui-range-fill {
      from {
        --_track-fill: 100%;
      }
      to {
        --_track-fill: 0%;
      }
    }
    ```

    Verified in Chromium at values 0/10/25/60/100 (fill matches the value) and in RTL. Trade-offs:
    - `overflow: hidden` is required, because the input has to be the scroller for the view timeline.
    - That clips the thumb and its hover ring, so the input has to be taller, with negative margins to keep the layout.
    - The ring is still cut off at the inline edges when the value is at min or max.
    - Not tested in Safari.

  - Recommendation: A now (document it on the Range page under HTML and expose a public property). Treat B as a later progressive enhancement, only if the edge clipping is acceptable.
  - Example: `range-track-fill` (plain, A and B side by side).
  > go ahead with fix B - scroll-driven animation. Make sure to document this in the under the hood section too and update the blogpost under /learn.
  - Fixed with option B: a scroll-driven animation on the thumb's view timeline (`view-timeline` on `::-webkit-slider-thumb`, `timeline-scope`, `animation-timeline` on the input) drives the registered `--_track-fill` from `100%` to `0%`. RTL reverses the animation. It's inside `@supports (animation-timeline: view())`, and Firefox keeps `::-moz-range-progress`.
  - Changed from the proposal: instead of a taller input, the input gets padding on every side (`--_inset`), an equal negative margin and `box-sizing: content-box`, with `view-timeline-inset` and a reduced `outline-offset`. The layout and the focus ring stay where they were, and the hover ring is no longer clipped at min or max.
  - `Range.astro` and `Range.vue` no longer set `--_track-fill` from script. The script only updates the value display.
  - Docs: the Range under the hood "Fill" step shows the scroll-driven setup, and the `range-tick-marks` post under /learn describes it instead of the JavaScript. `scroll-driven-animations` is in the Range browser support.
  - Checked in Chromium 141: plain HTML at 0, 25, 60 and 100 (and `min=-50`/`max=150`), RTL, dragging, arrow keys, touch emulation, and every range on the HTML, Astro and Vue docs pages. Not checked in Safari: without support for this there is no fill, but the slider still works.
- [x] (2) Callout: `.ui-info` builds its palette from `--hue-blue` (240), but `--info` (used by Badge, Toast and `.ui-info` buttons) is hue 210, so info is two different blues across components (`theme.css:50,57,229-232`)
  - Pick one hue. Either change the scope or make `--blue` use `--hue-blue`. The second also helps the info badge contrast item.
  - Fix:
    ```css
    :where(.ui-info, abbr, dfn, .ui-abbr, .ui-dfn) {
      --palette-source: oklch(0.58 0.21 var(--hue-cyan));
    }
    ```
  > Fix
  - Fixed: `--blue` uses `--hue-blue` (240), the hue the `.ui-info` palette is built from, also with more contrast (`theme.css`). Info is one blue everywhere. Measured with white `--gray-1` text: the info badge is 4.58:1 (was 4.02:1), 7.31:1/6.39:1 with more contrast. Callout info text is unchanged.
- [x] (2) Dialog: page scroll is locked for non-modal dialogs too (`show()` or `<dialog open>`), because the lock matches any open `.ui-dialog` (`dialog.css:106-111`)
  - Fix:
    ```css
    :where(html:has(.ui-dialog:modal)) { … }
    ```
  > Fix
  - Fixed: the lock matches `:where(html:has(.ui-dialog:modal))` (`dialog.css`). After `show()` the page still scrolls.
- [x] (2) Docs Markdown export and skill references drop the space before `<code>` when the source breaks the line before it: "set on`body`", "the heading's`id`", "with the`actions` slot" (`skills/opui/references/astro/getting-started.md:138`, `html/drawer.md:333`, `astro/accordion.md:186`, `vue/drawer.md:176`; sources `src/docs/guide/getting-started/_theming.astro:185-186`, `src/docs/components/drawer.astro:267-268`, `accordion.astro:136-137`)
  - The converter alone keeps the space (`articleToMarkdown` on `on\n<code>body</code>` gives "on `body`"), so the space is lost before conversion. Compare the built HTML of an affected page with the source.
  > Fix
  - Fixed: the space was missing from the HTML pages too, not only the Markdown. Astro 7 defaults `compressHTML` to `"jsx"`, which drops whitespace containing a newline between text and an element, so `on\n<code>` became `on<code>`. `astro.config.mjs` sets `compressHTML: true`, which keeps it. Skill references are regenerated.
- [x] (3) `.ui-dense` tables are as tall as default ones (only inline padding changes) (`data-display` TableInlineEditing)
  - Fixed: dense cells use half the block padding and a tighter line height.
- [x] (3) `ol[start]` with 4-digit markers overflows: the wider gutter only applies at 100+ items (`typography` DeepLists)
  - Fixed: the `ch` gutter is sized by digit count, the larger of the item count (100+, 1000+) and `start` (read with `attr(start type(<number>))` where supported, 4 digits otherwise).
- [x] (3) Carousel slides aren't equal height when they contain cards (`layout` CarouselOfCards)
  > what's best to do here? The library has no opinion on what to put in the carousel. should we have a stretch modifier? What's most elegant and scalable here?
  - The items (`li`) already stretch to the tallest one, because they're grid items. The card inside an item just doesn't fill it.
  - Recommendation: no modifier. Make every item a grid container: `.ui-carousel > * { display: grid }`. A single child then stretches to the item's height by default (cards, links, anything), and images and videos with an aspect ratio don't stretch, since grid only stretches them when asked to explicitly. It's still unopinionated about content. A modifier would be one more thing to learn for what should be the default.
  > Fix
  > make the stretch an option
  - Fixed: opt-in `.ui-stretch` (`stretch` prop in Astro and Vue) makes every item a grid, so its content (a card, a link) fills the item's height. Media with an aspect ratio keeps it (checked: a 16:9 image stays 16:9 next to a tall card).
  - Docs: "Stretch" section with an example in all three frameworks, API table row. The todo example shows `.ui-stretch` as the fix.
- [x] (3) Label-less checkboxes, switches and progress bars sit off-center in table cells (`vertical-align: baseline`) (`data-display` TableCellContent)
  > what's the fix? it has to be scalable and elegant.
  - Without a label there's no text, so the control's baseline is its bottom edge. It sits on the text baseline and the line box adds the strut's descent below it, so it looks raised in any line of text, not only in tables.
  - Fix: align them to the middle when there's no label. It's per component, so it works in tables, lists and paragraphs alike:
    ```css
    :where(.ui-checkbox, .ui-radio, .ui-switch):not(:has(.ui-label)),
    :where(.ui-progress) {
      vertical-align: middle;
    }
    ```
  > don't forget that labelless inputs needs to have the label tag filled out. fix.
  - Fixed: `.ui-checkbox`, `.ui-radio` and `.ui-switch` get `vertical-align: middle` when they have no visible label (`&:not(:has(.ui-label, .ui-text))`; `.ui-text` keeps list rows out). `.ui-progress` is `vertical-align: middle` instead of `baseline`. Measured in `data-display` TableCellContent: every control is within 1px of the cell middle.
  - The accessible name stays inside the label: hide the text with `.ui-sr-only`, or `hideLabel` in Astro and Vue (Checkbox, Radio and Switch all have it). Checkbox and Radio no longer render an empty `.ui-label` without a default slot, and warn in dev without a name, like Switch. The Switch `Icons` example and the Switch anatomy use `hideLabel` instead of `aria-label`, and the Switch docs and API notes say to use a hidden label instead of `aria-label`.
- [x] (3) Stretched callouts spread title and text apart (needs `align-content: start`), and the `::before` shows lighter corners inside the border (`layout` UnevenGrid, Nesting)
  - Fixed: the icon layout has `align-content: start`. The `::before` radius is the inner radius (`border-radius - border-width`), so it covers the corners.
- [x] (3) Checkbox and Radio root selectors are `label.ui-checkbox`/`label.ui-radio`, the only component roots not wrapped in `:where()` (`checkbox.css:2`, `radio.css:2`)
  > Fix
  - Fixed: the roots are `:where(label.ui-checkbox)` and `:where(label.ui-radio)`. The forced-colors block in `checkbox.css` now targets `input[type="checkbox"]` like the radio one, so it's later in the source with the same specificity as the base `:checked` rule and wins (this also fixes the "Checkbox forced-colors block loses on specificity" item: with `forcedColors: 'active'` a checked box is `SelectedItem` with a `SelectedItemText` checkmark).

---

- [x] (3) `<button>` rendered without `type="button"` submits surrounding forms: Button (`Button.astro:21`, `Button.vue:9`), Chip/Avatar `as="button"` (`Chip.astro:7`, `Avatar.astro:17`), DrawerHeader close (`DrawerHeader.astro:24`, `DrawerHeader.vue:28`)
  > Fix
  - Fixed: Button, Chip and Avatar with `as="button"` render `type="button"` by default (Astro and Vue). A `type` you pass wins, e.g. `<Button type="submit">`. The DrawerHeader close button gets it through Button.
  - HTML examples got `type="button"` on their buttons so the markup still matches.
- [x] (3) ToggleGroup (Astro) forces every input to `type="radio"` in single mode, even an explicit `type="checkbox"`. Vue keeps an explicit `type` (`ToggleGroup.astro:29-33`, `ToggleButton.vue:16`)
  > Explain further and provide an example
  - Same usage in both frameworks:

    ```astro
    <ToggleGroup selection="single" name="view">
      <ToggleButton label="List" />
      <ToggleButton label="Grid" type="checkbox" />
    </ToggleGroup>
    ```

  - Rendered output (container render and Vue SSR):

    ```html
    <!-- Astro -->
    <div class="ui-toggle-group" role="radiogroup">
      <label class="ui-toggle-button"
        ><input
          name="view"
          id="toggle-1"
          type="radio"
          value="List"
        />List</label
      >
      <label class="ui-toggle-button"
        ><input
          name="view"
          id="toggle-2"
          type="radio"
          value="Grid"
        />Grid</label
      >
    </div>
    <!-- Vue -->
    <div class="ui-toggle-group" role="radiogroup">
      <label class="ui-toggle-button"
        ><input id="v-1" name="view" type="radio" value="List" />List</label
      >
      <label class="ui-toggle-button"
        ><input id="v-2" name="view" type="checkbox" value="Grid" />Grid</label
      >
    </div>
    ```

  - Why they differ:
    - `ToggleButton.astro` always writes `type="checkbox"` (`finalType = type || "checkbox"`), so the group's regex can't tell an explicit type from the default and rewrites every input.
    - Vue's `ToggleButton` uses the injected group type only when `type` is unset.
  - Vue's output is the worse one: a checkbox inside `role="radiogroup"` is invalid ARIA, and it doesn't take part in the single selection.
  - Recommendation: single selection always means radio. Make Vue match Astro and document that `type` is ignored in a single-selection group.

    ```ts
    // ToggleButton.vue
    const finalType =
      group?.type === "radio" ? "radio" : type || group?.type || "checkbox"
    ```
  > Fix
  - Fixed as recommended: Vue's `ToggleButton` uses `radio` in a single-selection group, whatever its `type`, like Astro. The Toggle docs say that `type` is ignored in a single-select group.
- [x] (3) Peer ranges pinned to dev versions: `astro ^7.0.6`, `vue ^3.5.39`, `svelte ^5.56.4`, `solid-js ^1.9.13`, while the README says `^7` and `^3.5` (`packages/opui/package.json:77-83`, `packages/opui/README.md:16-19`)
  > Fix
  - Fixed: peers are `astro ^7`, `solid-js ^1.9`, `svelte ^5`, `vue ^3.5` (`open-props ^1.7.23` unchanged). README lists the same ranges, including `open-props` `^1.7.23` and the missing `solid-js` line.
  - `pnpm install --frozen-lockfile` passes, no lockfile change.
- [x] (3) `p.ui-p.ui-small` renders 12px, not `--font-size-1`: `:where(p, span).ui-small` has the same specificity as `:where(.ui-p).ui-small` and comes later (`typography.css:5-6,151-152`)
  > Explain further and provide an example
  - Specificity: `:where(.ui-p).ui-small` is (0,1,0), and `:where(p, span).ui-small` is also (0,1,0). Both are in `components.root`, and the second comes later (`typography.css:151`), so it wins on any `p`.
  - Measured in Chromium:

    | Markup                        | Now     | Proposed |
    | ----------------------------- | ------- | -------- |
    | `<p class="ui-p">`            | 16px    | 16px     |
    | `<div class="ui-p ui-small">` | 16px    | 14px     |
    | `<p class="ui-p ui-small">`   | 12px    | 14px     |
    | `<span class="ui-small">`     | 12px    | 12px     |
    | `<small>`                     | 13.33px | 13.33px  |

  - Fixing only the order doesn't help. `--font-size-1` is `1rem`, the same 16px as body text, so `.ui-p.ui-small` would look exactly like `.ui-p`.
  - The generic rule also reaches components rendered as a `span`: `span.ui-button.ui-small` is 12px, while `button.ui-button.ui-small` is 14px.
  - Fix:

    ```css
    :where(.ui-p) {
      &.ui-small {
        font-size: var(--font-size-05);
      }
    }

    :where(p:not(.ui-p), span).ui-small {
      font-size: max(0.5em, var(--font-size-0, 0.75rem));
    }
    ```

  - `--font-size-05` (14px) is what small buttons and fields already use.
  - Example: `small-paragraph`.
  > Fix
  - Fixed as proposed: `.ui-p.ui-small` is `--font-size-05`, and the generic rule is `:where(p:not(.ui-p), span).ui-small`. Checked in Chromium: `p.ui-p.ui-small` 14px, `p.ui-small` and `span.ui-small` 12px.
- [x] (3) RTL: the required asterisk in stacked Checkbox and Radio uses physical `inset: 0 -0.25ex auto auto`, so it sits before the label (`radio.css:90`, `checkbox.css:115`)
  > Explain further and provide an example
  - The base rule is already logical: `.ui-label::after { inset-block: 0 auto; inset-inline: auto -0.25ex }`.
  - The stacked override (`.ui-stack .ui-label::after { inset: 0 -0.25ex auto auto }`, now `checkbox.css:119` and `radio.css:94`) is its physical copy. In RTL it pins the asterisk to the right, which is before the text: LTR shows `Accept terms *`, RTL shows `* قبول الشروط`.
  - Fix: delete the `/* Required dot */ &::after` block inside `.ui-stack .ui-label` in both files, so the logical base rule applies. The example's "Fixed" column applies exactly the base values.
  - Example: `rtl-required-asterisk` (LTR, RTL now, RTL fixed).
  > Fix
  - Fixed: removed the physical `inset` override in `.ui-stack .ui-label::after` (`checkbox.css`, `radio.css`), so the logical base rule applies in stacked labels too.
- [x] (3) Checkbox and Radio: the hover/active halo lives in the `utils` layer, so `opui.components.css` and single-file `checkbox.css`/`radio.css` imports have no halo (`core/utils.css:53-93`, `checkbox.css:117`, `radio.css:92`)
  - Fix: move the block into `components.root`, in `checkbox.css` and `radio.css` or a shared file. The `--_ripple-size: 175%` they set already works through the `var(--_ripple-size, 150%)` fallback.
  > Explain further and provide an example
  - The halo is one block in `core/utils.css`, in `@layer utils`: a `::before` on `.ui-checkbox input` and `.ui-radio input`, scaled from 0.01 to 1 on hover and 1.1 on press, plus `position: relative`, `transform-style: preserve-3d` and the RTL `--_dir-rtl`. `checkbox.css` and `radio.css` only set `--_ripple-size: 175%`.
  - Who loses it: anyone who imports components without `core/utils.css`. Nothing errors, the controls just have no hover or press feedback. That's `dist/opui.components.css` (the README suggests it to users who already have tokens and a reset), `css/components.css`, and single-file `checkbox.css`/`radio.css` imports (what the install tabs show). Full imports (`opui-css`, `dist/opui.css`, `css/imports.css`) are fine.
  - Second effect: `utils` is the last layer, so the halo beats every component-layer rule. A tint set in `@layer components…` is ignored, only unlayered CSS gets through.
  - Fix: move the block into `@layer components.root`, inside each file, so single-file imports work (a shared file would be one more required import). Nothing else uses `::before` on these inputs.
    ```css
    /* checkbox.css, inside :where(label.ui-checkbox) */
    input[type="checkbox"] {
      --_dir-rtl: -1;
      --_ripple-size: 175%;

      position: relative;
      transform-style: preserve-3d;

      &:dir(rtl) {
        --_dir-rtl: 1;
      }

      &:not([disabled]) {
        &::before {
          /* the utils.css ::before block */
        }

        @media (hover: hover) {
          &:hover::before {
            --_thumb-scale: 1;
          }
        }

        &:active::before {
          --_thumb-scale: 1.1;
        }
      }
    }
    ```
    The README line about `opui.components.css` then no longer needs to mention the halo.
  - See the example: the full import, a simulated components-only import, and a tint in `@layer components.root` that has no effect.
  > Fix
  > ok bake it into the respective components
  - Fixed: the halo (`::before`, `--_dir-rtl`, `transform-style: preserve-3d`) moved from `core/utils.css` into the input rule of `checkbox.css` and `radio.css` (`components.root`), and is gone from `utils.css`. The README line about `opui.components.css` no longer mentions it (`packages/opui/README.md`).
  - Checked in Chromium, LTR and RTL, with the full import, a components-only import without `utils.css`, and only `checkbox.css`/`radio.css`: `--_thumb-scale` is 0.01 at rest, 1 on hover and 1.1 on press, and the halo is centered on the input. A disabled radio gets no halo.
- [x] (3) Radio: on touch screens `.ui-small` and `.ui-large` radios are forced to `--size-4`. The `pointer: coarse` block sets `block-size`/`inline-size` on the input, while the label offset still uses `--_input-size`, so the label is misaligned. Checkbox has no such block (`radio.css:55-57,131-137,149-155`)
  - Fix: delete the block (`--size-4` is already `--choice-size`), or set the variable instead:
    ```css
    @media (pointer: coarse) {
      &:not(.ui-small, .ui-large) {
        --_input-size: var(--size-4);
      }
    }
    ```
  > Explain further and provide an example
  - `--choice-size-small` is 16px, `--choice-size` 20px, `--choice-size-large` 24px. The `@media (pointer: coarse)` block sets `block-size`/`inline-size: var(--size-4)` on the input. Same specificity as the base rule and later, so it wins. It doesn't touch `--_input-size`, which the label offset `calc((var(--_input-size) - 1lh) / 2 + var(--choice-label-offset))` reads.
  - Measured with the rule copied into the page (box size, then the label's first line relative to the box center):

    |         | Mouse     | Touch now                   |
    | ------- | --------- | --------------------------- |
    | Small   | 16px, 0px | 20px, −2px (label too high) |
    | Default | 20px, 0px | 20px, 0px                   |
    | Large   | 24px, 0px | 20px, +2px (label too low)  |

    For the default size it does nothing. It grows small radios and shrinks large ones, so `size` quietly stops working on phones and the label sits 2px off. Checkbox has no such block, so a mixed form gets different box sizes on touch.

  - The whole `label.ui-radio`, text included, is the tap target, so the box size isn't what makes a radio tappable.
  - Recommendation: delete the block. For bigger boxes on touch later, override `--choice-size*` under `@media (pointer: coarse)` in `theme.css`, which changes Checkbox and Radio together and keeps the label aligned.
  - See the example: live measurements with the touch rule simulated (Chromium's device toolbar emulates `pointer: coarse` in a new tab).
  > Fix
  - Fixed: the `@media (pointer: coarse)` block is deleted (`radio.css`). Checked with touch emulation in Chromium: small, default and large radios are 16, 20 and 24px, the same as with a mouse.
- [x] (3) README says to add `/// <reference types="opui-css/env.d.ts" />`, but `env.d.ts` isn't in `exports`, so TypeScript can't find it (TS2688) (`packages/opui/package.json:51-64`, `packages/opui/README.md:80`)
  - Example:
    ```json
    "./env.d.ts": "./env.d.ts",
    ```
  > Fix
  - Fixed: `"./env.d.ts": "./env.d.ts"` in `exports` (`packages/opui/package.json`).
- [x] (4) A tooltip at the inline-end edge squeezes into a narrow column instead of flipping (no minimum width) (`overlays` EdgeTriggers)
  - Fixed: tooltips have `min-inline-size: calc-size(max-content, min(size, 10rem))` and shift along the edge instead (`@position-try --ui-tooltip-shift-start`/`-end`, also flipped to the other side). Tooltips with `--anchor-position-area: inline-start`/`inline-end` try `flip-inline` first.
  - Tooltips with an arrow only flip, like before, so the arrow never ends up off-center. Moving the arrow with the shift needs anchored container queries, which break the build for now (see Submenus).
  - Chromium only tries the first five fallbacks, so the list is kept at five.
- [x] (4) Components ship `types.solid.ts` importing `solid-js`, but `solid-js` isn't an optional peer dependency like `svelte`, `vue` and `astro`
  - Fixed.
- [x] (4) Drawer header can't hold two icon buttons: every icon-only button gets `margin-inline-start: auto` (`overlays` DrawerNesting)
  > what's the suggested solution? it should be scalable and easy to use.
  - Push from the heading instead of the buttons: the heading takes the free space and every action after it lines up at the end, however many there are.
    ```css
    .ui-drawer .ui-header {
      gap: var(--size-1);

      :where(h1, h2, h3, h4, h5, h6) {
        flex: 1;
      }
    }
    ```
    ```html
    <div class="ui-header">
      <h2>Settings</h2>
      <button class="ui-button"><svg>…pin…</svg></button>
      <button class="ui-button" commandfor="drawer" command="close">
        <svg>…close…</svg>
      </button>
    </div>
    ```
  - Nothing to learn: the markup is the same as today. A header without a heading can use any element with `flex: 1`, or a single `margin-inline-start: auto` on the first action.
  > Fix
  - Fixed: the heading takes the free space (`flex: 1`) and the header has `gap: var(--size-1)`, so any number of actions line up at the end. In a header without a heading, the first icon-only button gets `margin-inline-start: auto`, so headers with only text or only buttons still put them at the end (`drawer.css`).
- [x] (4) Rich text headings, `pre` and `small` don't follow the inherited font size (`typography` InheritedSizes)
  - Fixed: headings scale by `1em / 1rem` (typed arithmetic, behind `@supports`), so they're unchanged at 16px and scale with the text around them. `pre` is `0.875em`, `small` is `max(0.75em, var(--font-size-0))`.
- [x] (4) Vue derived values are plain consts, not `computed`, so they don't update when props change: Anchor (`Anchor.vue:8-25`), Badge (`Badge.vue:9`), Divider (`Divider.vue:5`), Table Column (`Table/Column.vue:10`), ToggleButton (`ToggleButton.vue:15-18`), ToggleGroup (`ToggleGroup.vue:20-21`), Menu (`Menu.vue:20`), Tabs (`Tabs.vue:13`), Drawer (`Drawer.vue:19`)
  > Fix
  - Fixed: derived values are `computed` in Anchor (`isHover`, `id`, `positionArea`), Badge (`positionArea`), Divider (`variantClass`), Table Column (`colStyle`), ToggleButton (`finalName`, `finalType`, `inputId`), ToggleGroup (`groupName`, `inputType`, provided as a `reactive` object), Menu (`menuId`), Tabs (`groupName`; `TabsGroupNameKey` provides a ref that `TabsItem` reads in a `computed`) and Drawer (`drawerId`). `Divider.vue` also puts `class` last, like Astro.
- [x] (4) Anchor takes `id` as a prop for the floating element and drops it unless `trigger="hover"`, so a user `id` on Anchor or Badge never renders (`Anchor.astro:7-17`, `Anchor.vue:5-10`, `Badge.astro:16`)
  > Fix
  - Fixed: with `trigger="hover"` the `id` still goes on the floating element (the popover the trigger references). Otherwise it goes on the root, so `<Badge id="…">` and `<Anchor id="…">` render it (Astro and Vue).
- [x] (4) Tooltip `id` is optional, but without it the trigger can't reference the generated id, so the tooltip never opens. Make `id` required (`Tooltip/types.ts:4`, `Tooltip.astro:8-14`, `Tooltip.vue:5-13`)
  > Fix
  - Fixed: `id` is required in `Tooltip/types.ts` (Astro, Vue, Svelte, Solid). All docs examples already pass one.
- [x] (4) Range.vue without `value` or `v-model` shows only the suffix until the user drags, and `v-model` returns a string (no number cast) (`Range.vue:18-25,68,94`)
  > Fix
  - Fixed: without `value` or `v-model` the value display shows the browser's default value (the middle of `min`/`max`, rounded to `step`), so `valueSuffix="%"` renders `50%`. `v-model` uses `.number`. Astro renders the same default text on the server.
- [x] (4) Range.vue and ToggleButton.vue don't inject `CurrentFieldNameKey`, so they get no `name` inside a named FieldGroup (Astro's FieldGroup names every input) (`Range.vue:16`, `ToggleButton.vue:14-15`)
  > Fix
  - Fixed: both inject `CurrentFieldNameKey`. ToggleButton uses its own `name`, then the ToggleGroup's, then the FieldGroup's, the same order as Astro.
- [x] (4) `.ui-dot` sets fixed `--_anchor-tx`/`--_anchor-ty` after the alignment rules, so it overrides the offsets for every alignment (e.g. `.ui-end-end.ui-dot` is pushed further down instead of into the corner) (`badge.css:105-108`)
  > Explain further and provide an example
  - Still a bug after the logical-inset change. `badge.css` now positions the badge with `--_badge-inset-block`/`--_badge-inset-inline` and `--_dir` (RTL is correct), but `.ui-dot` (line 105) still sets the top-end offsets for every alignment: `--_anchor-tx: calc((var(--_dot-size) - 2px) * -1); --_anchor-ty: var(--_dot-size)`.
  - What you see:
    - The default (top-end) is right.
    - `.ui-start-start` is pushed out past the top-left corner.
    - `.ui-end-start` sits outside the bottom-left corner.
    - `.ui-end-end` hangs below the bottom-right corner.
  - Fix: give each alignment a sign and let the dot use it.

    ```css
    :where(.ui-badge) {
      --_sx: -1;
      --_sy: 1;

      &.ui-start-start {
        --_sx: 1;
      }
      &.ui-end-start {
        --_sx: 1;
        --_sy: -1;
      }
      &.ui-end-end {
        --_sy: -1;
      }

      &.ui-dot {
        --_anchor-tx: calc((var(--_dot-size) - 2px) * var(--_sx));
        --_anchor-ty: calc(var(--_dot-size) * var(--_sy));
      }
    }
    ```

    The non-dot offsets can use the same signs (`calc(50% * var(--_sx))`), which removes the per-alignment `--_anchor-tx`/`--_anchor-ty` pairs.

  - Checked in LTR and RTL: the dot sits just inside the matching corner.
  - Example: `badge-dot-alignment`.
  > Fix
  - Fixed as proposed: each alignment sets `--_sign-x`/`--_sign-y`, and both the default and the dot offsets are multiplied by them, so the per-alignment `--_anchor-tx`/`--_anchor-ty` pairs are gone (`badge.css`). Checked in Chromium: the dot sits at the same spot in its corner for all four alignments, and the default badge is unchanged.
- [x] (4) Callout icon color is set with `stroke`, but the example icons use `fill="currentColor"`, so they get the text color with a colored outline (`callout.css:112`)
  > Explain further and provide an example
  - `callout.css:112` sets `& > svg { stroke: var(--_icon-color) }`. The built-in icons (and the docs icons) draw with `fill="currentColor"`, so:
    - the fill takes the text color (dark);
    - `stroke` adds a 1px outline in the severity color around every shape, which makes the icon look bold and two-toned.
  - Stroke-based icons (`fill="none" stroke="currentColor"`) are the only ones that look right today.
  - Fix:

    ```css
    & > svg {
      color: var(--_icon-color);
      margin-block-start: 0.15rem;
    }
    ```

    Both fill and stroke icons use `currentColor`, so both take the severity color, and stroke icons look the same as now.

  - Example: `callout-icon-color` (info, outlined warning and a stroke icon, current vs proposed).
  > Fix
  - Fixed: the icon `svg` sets `color: var(--_icon-color)` instead of `stroke`, so fill and stroke icons both take the severity color (`callout.css`).
- [x] (4) Switch, Tabs and ToggleButton overwrite `--focus-ring-color` on focus, so a theme's `--focus-ring-color` is ignored there (`switch.css:49`, `tabs.css:63`, `toggle-button.css:51`)
  > Fix
  - Fixed: they use `var(--focus-ring-color, <fallback>)` like the normalize focus ring (`currentColor` for Switch, `var(--text-muted)` for Tabs and ToggleButton), so a theme's `--focus-ring-color` wins.
- [x] (4) ToggleButton disabled styles only apply with `.ui-disabled`, not `:has(input:disabled)`, so plain HTML with a disabled input looks enabled (`toggle-button.css:42,59`)
  > Fix
  - Fixed: the disabled styles and the hover exclusion also match `:has(input:disabled)`.
- [x] (4) Tooltip arrow is always on the block-end edge, so it points away from the trigger after `flip-block` and with `inline-start`/`inline-end` positions (`tooltip.css:57-73`)
  > Fix
  - Fixed: the arrow is placed with anchor functions instead of a fixed edge. It is `position: fixed` and sits on the tooltip edge that faces the trigger, at the trigger's center, clamped to the tooltip:
    ```css
    left: clamp(
      anchor(--ui-tooltip left),
      anchor(--anchor center),
      anchor(--ui-tooltip right)
    );
    top: clamp(
      anchor(--ui-tooltip top),
      anchor(--anchor center),
      anchor(--ui-tooltip bottom)
    );
    ```
    The rotated square is half hidden behind the tooltip, so the visible half always points at the trigger. This works for every `position-area`, after `flip-block`/`flip-inline`, and in RTL. No anchored container queries.
  - Because the arrow follows the trigger, arrow tooltips now use the same fallbacks as plain tooltips (shift along the edge instead of overflowing). Checked in Chromium: block-start, block-end, inline-start, inline-end, flipped at the top edge, flipped at the inline end, and shifted at the start edge.
- [x] (5) A menu in a dialog blends into it in dark mode (`overlays` DialogNesting)
  > give it the same border treatment as the carousel prev/next buttons, ie a light gray border. that way it's consistent with the theme.
  - Fixed: menus use a subtle light gray border in dark mode (`--gray-6` at 40% opacity), in dialogs and everywhere else.
- [x] (5) Avatars shrink in flex rows (no `flex-shrink: 0`), and avatar group overflow counts like "+128" don't fit (`data-display` TableCellContent, InlineAlignment)
  > fix the avatar shrikage. don't worry about "+128", but if you have a scalable and elegant solution for it let me know.
  - Fixed: avatars have `flex-shrink: 0`.
  - "+128": the scalable fix is in the content, not CSS: cap overflow counts at "99+", like most avatar groups and notification badges do. If CSS has to handle any length, size the text with container units: `.ui-avatar { container-type: inline-size }` and `font-size: clamp(0.5rem, 100cqi / 3, 1rem)` on the text inside. That fits about 4 characters at any avatar size, but every initials avatar gets the same smaller text.
- [x] (5) Callout `.ui-content` grid gap doubles rich text margins, and a classless `h3` in a callout is full size (`typography` ProseInComponents)
  > is the solution to set gap: 0 on .ui-content.ui-rich-text? what's the plan?
  - The `h3` is fixed: rich text is in a lower layer now, so the callout's title size wins.
  - Gap: close. `gap: 0` alone isn't enough, because margins don't collapse between grid items, so two paragraphs still get both margins. Make the content a block where rich text applies, so the flow margins collapse like everywhere else in prose. Only where rich text applies, otherwise a callout with plain children loses its spacing. A callout can be rich text itself (`.ui-content.ui-rich-text`) or sit inside a rich text article, so use the same scope as rich text instead of a class check:
    ```css
    @layer components.root {
      @scope (.ui-rich-text) to (.ui-not-rich-text) {
        .ui-callout > .ui-content {
          display: block;
        }
      }
    }
    ```
    The first and last child margins are already trimmed inside `.ui-content`.
  > Fix
  - Fixed: where rich text applies, the callout content is a block, so flow margins collapse like elsewhere in prose (`callout.css`):
    ```css
    @scope (.ui-rich-text) to (.ui-not-rich-text) {
      .ui-callout > .ui-content,
      .ui-callout > :scope.ui-content {
        display: block;
      }
    }
    ```
  - The extra `:scope` selector is needed for `.ui-content.ui-rich-text`: inside `@scope`, a selector without `:scope` only matches descendants of the scope root, not the root itself (checked in Chromium).
- [x] (5) Chip labels wrap and overflow the fixed chip height without `.ui-multiline` (`data-display` TableCellContent)
  > ellipsis ... should solve it
  - Fixed: chips are `max-inline-size: 100%`, and `.ui-text` truncates with an ellipsis unless the chip is `.ui-multiline`.
- [x] (5) Disabled button text color only applies to the text variant: the disabled block is wrapped in `:where()`, so `.ui-filled`/`.ui-tonal`/`.ui-outlined` override its `--_text-color` (only `opacity` dims them). Fix or confirm it's intended
  - Fixed: the disabled block comes after the variants and uses `:is()`, so text and outlined buttons get `--text-disabled` in every color. Filled and tonal keep their own text color and only dim with `--disabled-opacity`, since gray text on a colored fill was unreadable.
- [x] (5) Light mode: `--border-color` and `--surface-filled` are the same gray, so table header borders and filled bordered list dividers vanish (`data-display` TableStructure, ListSurfaces)
  > what is the most scalable and elegant solution for this?
  - The root cause is the same as the dark mode item: one global border color can't contrast with every surface. Borders need to be relative to the surface they sit on. Two ways to do that:
    1. Surface scopes (what dark mode uses now). Each surface re-maps the border tokens for everything inside it, in `theme.css`. Explicit and easy to theme, but every new surface needs an entry:
       ```css
       /* 15. Raised surfaces */
       :where(.ui-card.ui-elevated, .ui-card.ui-tonal) {
         --border-color: light-dark(var(--gray-4), var(--gray-13));
         --field-border-color: var(--border-color);
       }

       /* 16. Filled surfaces */
       :where(
         .ui-list:not(.ui-default, .ui-tonal, .ui-transparent),
         .ui-table th
       ) {
         --border-color: light-dark(var(--gray-6), var(--gray-13));
       }
       ```
    2. A surface context variable. Every surface sets `--surface`, and borders are derived from it with relative color, so they contrast with any surface, including custom ones:
       ```css
       .ui-card.ui-tonal {
         --surface: var(--surface-tonal);
       }

       .ui-table th {
         border-color: light-dark(
           oklch(
             from var(--surface, var(--surface-default)) calc(l - 0.08) c h
           ),
           oklch(from var(--surface, var(--surface-default)) calc(l + 0.08) c h)
         );
       }
       ```
       The catch: the derivation has to live where the border is drawn, in every component, and themes lose the single `--border-color` knob.
  - Recommendation: option 1. It matches how theme.css already works (severity scopes, raised surfaces) and keeps one place to theme borders. Filled is a one-block addition.
  > Fix
  - Fixed with option 1: a "Filled surfaces" scope in `theme.css` sets `--border-color: light-dark(var(--gray-6), var(--gray-12))` on `.ui-list:not(.ui-default, .ui-tonal, .ui-transparent)` and `.ui-table th`. Table header borders and filled bordered list dividers show in light mode. Dark mode keeps `--gray-12`, which already showed on the darker filled surface.
  - The theme generator copies `theme.css` as a whole, so the block is in the generated theme too.
- [x] (5) `pre` inside `dir="rtl"` runs code right to left (`typography` Bidi)
  > in this example I can see code inside RTL run left to right. if that's wrong then fix it.
  - It was wrong. Each line runs left to right, but punctuation at the ends gets moved by the bidi algorithm: `const x = add(1, 2);` showed as `;const x = add(1, 2)`, `x++` as `++x` and `// comment.` as `.comment //`, and lines were right-aligned. Fixed: rich text `pre` and inline `code` are `direction: ltr` with `unicode-bidi: isolate`, unless they have their own `dir`.
- [x] (5) Range fill and the header scroll fade are dead in production builds. lightningcss (the CSS minifier) folds `animation-timeline` into the `animation` shorthand, `animation: linear both ui-range-fill --ui-range-thumb`, which Chromium rejects, so `animation` computes to `none`. Dev isn't minified, so it only shows in builds, and users whose bundler minifies with lightningcss get it too (`range.css:235-237`, `Header.astro:345-347`, `LocalNav.astro:98-100`)
  - See the example: the minified shorthand, the longhands and the library's `.ui-range` side by side.
  - Check: the HTML Range test fixture in `dist-test` has `animation-name: none` on every range in Chromium 141.
  - Fix: write the longhands, which lightningcss leaves alone:
    ```css
    animation-fill-mode: both;
    animation-name: ui-range-fill;
    animation-range: contain;
    animation-timeline: --ui-range-thumb;
    animation-timing-function: linear;
    ```
  > Fix
  - Fixed: `animation-fill-mode`, `animation-name` and `animation-timing-function` longhands instead of the `animation` shorthand (`range.css`, `Header.astro`, `LocalNav.astro`). The Range walkthrough and learn post use longhands too.
  - Checked with lightningcss 1.32: the old shorthand folds into `animation:linear both ui-range-fill --ui-range-thumb`, the new CSS keeps `animation-timeline` separate, with and without targets. In a production build in Chromium every range computes to `ui-range-fill`, `--ui-range-thumb`, `both`, `contain`, and the header and local nav fades run on `scroll()`.
- [x] (5) Rich text `p` overrides `.ui-p.ui-large`, `.ui-p.ui-small` and `.ui-caption` inside `.ui-rich-text` (`typography` HeadingClasses)
  - Fixed by the `components.prose` layer.
- [x] (5) Second-level submenus don't keep the flipped direction, and the submenu arrow doesn't mirror in RTL (`overlays` Submenus, Rtl)
  - Fixed: the end icon of an item that holds a submenu (`li:has(> .ui-menu)`) mirrors in RTL.
  - Blocked: keeping the flipped direction needs anchored container queries (Chromium 143+). It worked in Chromium with experimental features on, but lightningcss, Vite's CSS minifier, can't parse `@container anchored(…)` and fails the whole build, so the docs build and any Vite user would break. Removed until lightningcss supports it. The CSS for later:
    ```css
    .ui-menu[popover] {
      container-type: anchored;
    }

    .ui-menu.ui-inline-end {
      --_side: var(--_submenu-inline-end, inline-end);
    }

    .ui-menu.ui-inline-start {
      --_side: var(--_submenu-inline-start, inline-start);
    }

    @container anchored(fallback: flip-inline) or anchored(fallback: flip-block flip-inline) {
      .ui-menu .ui-menu {
        --_submenu-inline-end: inline-start;
        --_submenu-inline-start: inline-end;
      }
    }
    ```
    Submenus of a flipped menu open on the same side, and deeper levels inherit it.
  > Fix
  - Still blocked for the anchored-query version: lightningcss 1.32.0 (installed) and 1.33.0 (latest on npm) both fail on `@container anchored(…)`.
  - Fixed another way, without container queries: the root menu is an anchor (`--ui-menu-root`, scoped to itself). Second-level and deeper submenus shrink their inline-end edge to the root menu's start edge when the root menu is on that side:
    ```css
    & .ui-menu .ui-menu[popover] {
      inset-inline-end: max(
        0px,
        min(
          anchor(--ui-menu-root start),
          (anchor(end) - anchor(--ui-menu-root start)) * 1000
        )
      );
    }
    ```
    When the parent submenu has flipped, the inline-end side no longer fits, so the submenu flips too and keeps the direction. `flip-inline` mirrors the expression, so a submenu also won't flip back over the root menu. It builds with lightningcss.
  - Checked in Chromium (`overlays` Submenus): Edit > Transform > Rotate now opens at the inline start (it opened over the Edit menu before), File > Export > Image still opens at the inline end, and the same holds in an RTL document.
  - Fixed: in newer browsers Edit > Transform > Rotate opened at the far start edge of the viewport. With only one inset set, the menu aligns toward that inset instead of toward its anchor, and after `flip-inline` that inset is on the start side. The submenu also sets `inset-inline-start: 0`, so the alignment comes from `position-area`.
- [x] (5) FieldGroup `name`: the Astro regex also names `type="submit"`, `button` and hidden inputs. Vue only reaches components that inject `CurrentFieldNameKey`, so native inputs and ClassicSelect get no name (`FieldGroup.astro:9-13`, `FieldGroup.vue:8-10`)
  > Explain further and provide an example
  - Rendered output of the same slot content:

    ```astro
    <FieldGroup name="plan">
      <input type="hidden" value="csrf-token" />
      <label><input type="radio" value="free" /> Free</label>
      <select><option>Monthly</option></select>
      <button type="submit">Save</button>
      <input type="submit" value="Send" />
    </FieldGroup>
    ```

    ```html
    <!-- Astro -->
    <input name="plan" type="hidden" value="csrf-token" />
    <label><input name="plan" type="radio" value="free" /> Free</label>
    <select name="plan">
      …
    </select>
    <button type="submit">Save</button>
    <input name="plan" type="submit" value="Send" />
    <!-- Vue -->
    <input type="hidden" value="csrf-token" />
    <label><input type="radio" value="free" /> Free</label>
    <select>
      …
    </select>
    <button type="submit">Save</button>
    <input type="submit" value="Send" />
    ```

  - Astro names the hidden input and the submit input, so the form posts `plan=csrf-token` and `plan=Send` along with the radio. `<button>` elements are not touched; the regex only matches `input|select|textarea`, so "button" in the item means `input type="button"`.
  - Vue reaches only the components that inject `CurrentFieldNameKey`: TextField, Textarea, Select, CheckboxInput, RadioInput and SwitchInput. Native elements and ClassicSelect get no name.
  - Fix for Astro: skip non-data input types (checked):

    ```js
    ;/<(input|select|textarea)\b(?![^>]*\sname=)(?![^>]*\stype="(?:button|hidden|image|reset|submit)")/g
    ```

  - Fix for Vue: inject `CurrentFieldNameKey` in ClassicSelect too, and document that in Vue `name` applies only to opui components, not native elements. Vue can't name native elements during SSR.
  > Fix
  - Fixed: Astro's regex skips `type="button|hidden|image|reset|submit"`. Vue's `ClassicSelect` injects `CurrentFieldNameKey`. The API and Form docs say that in Vue `name` only reaches OPUI fields, not native elements.
- [x] (5) ListItem `href` without `as` (allowed by the types): Astro spreads it onto the `li` (`<li href>`), Vue drops it (`ListItem.astro:21,33`, `ListItem.vue:23,39,67`, `ListItem/types.ts:11-12`)
  > Fix
  - Fixed: `href` without `as` renders an `<a>` inside the `li` in both Astro (`as` defaults to `"a"` when `href` is set) and Vue (`Tag` is `props.as ?? (props.href ? "a" : undefined)`).
- [x] (5) `.ui-abbr`/`.ui-dfn` underline uses the primary `--color-9`, because the info palette scope only matches `abbr`/`dfn` elements (`typography.css:129-131`, `core/palette.css:10-25`, `theme.css:214`)
  > Explain further and provide an example
  - The palette is recomputed only on elements that match the scope lists:
    - `core/palette.css` lists `abbr` and `dfn`, but not `.ui-abbr`/`.ui-dfn`;
    - the `theme.css` info scope is `:where(.ui-info, abbr, dfn)`.
  - So the underline color depends on the element, not the class. Measured:
    - `<abbr class="ui-abbr">`: `oklch(0.53 0.2 248)` (info blue).
    - `<span class="ui-abbr">`: `oklch(0.53 0.1 145)` (the primary green of the docs theme).
    - `dfn` and `span.ui-dfn` behave the same way.
  - Fix: add `.ui-abbr, .ui-dfn` to both scope lists, next to `abbr, dfn`. The example's last row simulates the fix by adding `.ui-info` to the span, and gives the blue result.
  - Example: `abbr-underline`.
  > Fix
  - Fixed: `.ui-abbr` and `.ui-dfn` are in the palette scope (`core/palette.css`) and the info scope (`theme.css`). Checked in Chromium: `span.ui-abbr` and `abbr.ui-abbr` both underline in `oklch(0.53 0.2 248)`.
- [x] (5) Vertical ButtonGroup squares any button that contains an `svg`, icon + label included: `&:has(svg)` should be `&:has(> svg:only-child)` (`button-group.css:153-156`)
  > Explain further and provide an example
  - `button-group.css:153`: `.ui-vertical > button:has(svg) { aspect-ratio: 1; padding: var(--size-1) }`.
  - In a column the buttons stretch to the widest one. `aspect-ratio: 1` then makes an icon + label button as tall as it is wide: a 90px wide "Move down" button becomes about 90px tall.
  - Fix: `&:has(> svg:only-child)` squares only icon-only buttons. Icon + label rows then get normal height and padding.

    ```html
    <div class="ui-button-group ui-outlined ui-vertical" role="group">
      <button class="ui-button"><svg … /><span>Move up</span></button>
      <button class="ui-button"><svg … /><span>Move down</span></button>
    </div>
    ```

  - The same selector can't see text nodes, so `<button><svg/>Move up</button>` would still be squared. See the sev-9 "unwrapped text" item.
  - Example: `vertical-button-group-icons` (icon-only, icon + label, label-only, current vs proposed).
  > Fix
  - Fixed: `.ui-vertical > button:has(> svg:only-child)`. Icon + label rows get normal height and padding (checked: 46px instead of square).
- [x] (6) `.ui-list` styles nested classless lists as list rows (descendant `li` selector), and rich text `p` margins make list rows tall (`typography` ProseInComponents)
  > what is the proposed solution? Honestly it's weird to expect rich-text inside ui-list to begin with. It has constraints for a reason.
  - Agreed. We shouldn't support rich text inside list rows. Two small changes would just stop it from breaking:
    1. Only style direct children: `& > :where(li, option)` instead of `:where(li, option)`. A nested list inside a row then stays a normal list, and a nested `.ui-list` already styles its own rows.
    2. Reset margins on the text parts the list already styles: `.ui-text :where(h1, h2, h3, h4, h5, h6, p) { margin: 0 }`. Rich text is now in a lower layer, so this wins.
  - No rich text support beyond that.
  > Fix
  - Fixed both: rows are direct children only (`& > :where(li, option)`, plus `& > :where([role="group"]) > :where(label, option)` for grouped Select options), also in `.ui-dense`, `.ui-gutterless` and `.ui-bordered`. A nested list inside a row stays a normal list.
  - Headings, paragraphs and spans in `.ui-text` get `margin: 0`, so rich text margins don't make rows tall (`list.css`).
- [x] (6) Badge indicators on primary avatars blend in, badges don't mirror in RTL, and a badge on a direct card child is clipped (`layout` Badges, RightToLeft)
  > 1. fix badge mirroring in RTL
  > 2. should ui-list end item icon mirroring be fixed too in RTL? the chevron isn't mirrored but maybe we shouldn't mess with icons? Thoughts?
  > 3. regarding color - that's not our problem. Badge has a lot of colors to choose from. Users can just choose another.
  - Fixed 1: badge insets are logical (`inset-block`/`inset-inline`) and the horizontal offset flips with `:dir(rtl)`, for every alignment and the dot.
  - 2: Don't mirror icons in `.ui-end` automatically. Only directional icons (chevrons, arrows, "back") should mirror. A checkmark, a logo or a play icon must not, and CSS can't tell them apart. The submenu arrow is the exception because we know what it means, so that one mirrors now (see Submenus below). If you want, a small opt-in utility would cover the rest:
    ```css
    .ui-mirror:dir(rtl) {
      scale: -1 1;
    }
    ```
    ```html
    <span class="ui-end"><svg class="ui-mirror">…chevron…</svg></span>
    ```
  - 3: Agreed, left as is.
- [x] (6) Callout switches to the icon layout when any nested `svg` exists: `&:has(svg)` should be `&:has(> svg)` (`layout` Nesting)
  - Fixed. The icon styles only target the direct child `svg` too.
- [x] (6) DescriptionList and Table container queries resolve against `body` (a size container in `normalize.css`), not their own column (`layout` DescriptionListContainer, `data-display` DescriptionLists, TableOverflow)
  - Fixed: `.ui-description-list` is its own `inline-size` container. Its items query it, and item spacing moved from the list's `gap` to the items, since a container can't query itself.
  - Fixed: the table's container queries are gone. Tables can't be size containers, and the narrow rules either did nothing (spacious, dense) or made padding bigger (default).
- [x] (6) Fields and selects collapse to a few characters in auto-layout tables (`data-display` TableInlineEditing)
  > what's the proposed solution?
  - Cause: fields are `inline-size: 100%` with `min-inline-size: 0`. In an auto-layout table the column is sized from its content's min-content width, which is about 0 for a field, so the column collapses.
  - Proposal: give fields a minimum inline size through a private custom property that defaults to `0`, and set it in table cells. Fields keep shrinking everywhere else:
    ```css
    :where(.ui-text-field, .ui-textarea, .ui-select) {
      min-inline-size: var(--_min-inline-size, 0);
    }

    .ui-table :where(td, th) > :where(.ui-text-field, .ui-select) {
      --_min-inline-size: 12ch;
    }
    ```
  - For exact widths, `<col>` / `Table.Column width` already works.
  > Fix
  - Fixed: `text-field.css` gives `.ui-text-field`, `.ui-textarea` and `.ui-select` a `12ch` minimum when they're a direct child of a `.ui-table` cell (`:where(.ui-table) :where(td, th) > &`, zero specificity, so a class overrides it). I left out the private `--_min-inline-size` with a `0` default: setting `min-inline-size: 0` on every field root would also let fields shrink below their label in flex rows, so fields outside tables are unchanged.
- [x] (6) List rows can't shrink below their longest word: `li .ui-text` needs `min-inline-size: 0` (`layout` Columns)
- [x] (6) Long description list terms squeeze values into one word per line, and unbroken values overflow (`data-display` DescriptionLists)
  - Fixed: wide items use `auto auto` columns with `justify-content: space-between`, so a long term and a long value share the space. Items get `overflow-wrap: anywhere`, so unbroken values wrap.
- [x] (6) Rich text `kbd` overrides the `kbd` inside `.ui-button`, and a `.ui-checkbox` first in a classless `li` matches the task list rule (`typography` ComponentsInProse)
  - Fixed: the `kbd` part by the `components.prose` layer. The task list rule only matches a classless `label`, so a `.ui-checkbox` keeps its bullet and its own styles.
- [x] (6) `span.ui-mark` has no background, and `.ui-del`/`.ui-ins` don't get the critical/success palette (`typography` HeadingClasses)
  - Fixed: `.ui-mark` uses `Mark`/`MarkText` like `<mark>`. `.ui-del` and `.ui-ins` join `del`/`ins` in the palette and severity scopes (`palette.css`, `theme.css`). Their text uses `--color-11` in light mode and `--color-6` in dark mode, so `del`, `ins` and both classes pass contrast (the old `--color-9` failed). With the `components.prose` layer this also removed three color-contrast entries for the typography stress page from the a11y ledger.
- [x] (6) Rich text still styles component parts that the component doesn't set itself. `.ui-description-list dd` gets the prose `padding-inline-start: 1.625em`, and List/Menu row links (`li > a`, no class) get the bold prose link `font-weight` (`typography.css:307-321,652-664`, `description-list.css:39-41`, `list.css:194-210`)
  > Explain further and provide an example
  - Checked after the move to `components.prose`. The prose layer now loses to every property a component sets itself, so only properties a component leaves unset leak.
  - Method: every `src/component-examples/*.html` was rendered inside and outside `.ui-rich-text`, and the computed styles were compared.
  - Still leaking:
    1. `.ui-description-list dd` gets `padding-inline-start: 1.625em` (26px) from prose `:where(dl) dd`; `description-list.css` sets only `margin: 0`.
    2. List/Menu row links (`li > a`) get `font-weight: bold` from `a[href]:where(:not([class*="ui-"]))`. `.ui-text p` resets it, so labels look fine, but anything else in the link turns bold: `.ui-end` counts, text in `.ui-start`, bare text.
  - New, not in the item: 3. Card and Dialog `hgroup` gets prose `margin-block-start: calc(var(--_flow-space) * 3)` (60px empty space above the card title). `hgroup + *` gives Dialog's `.ui-content` 52px. The heading inside gets `margin-block-end` (16px) whenever it isn't the last child. 4. `.ui-field-description` in a FieldSet gets the 20px paragraph margins. 5. `kbd` and `code` inside Button, List `.ui-end`, Range label and Tooltip get the prose font, padding and background. A Button with a `kbd` grows by 4px.
  - The radio, tab and toggle differences in the diff came from duplicate names in the test, not from prose.
  - Fix: each component sets the property it owns, in its own layer, so prose can't reach it:

    ```css
    /* description-list.css */
    dd {
      margin: 0;
      padding: 0;
    }
    /* list.css */
    & > a,
    & > button,
    & > label {
      font-weight: inherit;
    }
    /* card.css */
    & > :where(hgroup, .ui-content, .ui-actions) {
      margin-block: 0;
    }
    & > hgroup > :where(h1, h2, h3, h4, h5, h6) {
      margin-block: 0;
    }
    /* form.css */
    :where(.ui-field-description) {
      margin: 0;
    }
    ```

  - Narrowing the `@scope` limit to component roots would also stop intended prose inside `.ui-content`, so I wouldn't do that.
  - Example: `rich-text-component-leaks` (outside vs inside, items 1-4).
  > Fix
  - Fixed as proposed: `.ui-description-list dd` has `padding: 0`; List row links, buttons and labels have `font-weight: inherit`; card `hgroup` and `.ui-content` have `margin-block: 0`, and so do the headings and paragraphs in the card `hgroup` (this covers Dialog too); `.ui-field-description` has `margin: 0`. Normalize already zeroes these margins, so nothing changes outside rich text.
  - Point 5: Button and List `kbd` set their own `font-family`, `padding` (and `border-radius` in Button), so prose doesn't change them. Button `kbd` now gets the small padding and radius it has in rich text everywhere, instead of none. `code` in a Range label or a Tooltip still gets the prose code style, since that's content.
  - Checked in Chromium: `dd` padding is `0px`, row link and `.ui-end` weight `400`, and the card title margin `0px` inside rich text.
- [x] (6) Invalid Range keeps the primary thumb: the input resets `--_thumb-bg: var(--primary)` on itself, overriding the value inherited from `.ui-range[data-invalid]`/`:has(:user-invalid)`, and only `--_track-fill-color` is re-set on the input (`range.css:193-198,209,300-303`)
  > Fix
  - Fixed: `--_thumb-bg` and `--_thumb-highlight-color` for invalid ranges are set on the input, next to `--_track-fill-color`, and removed from the root where the input overrode them.
- [x] (6) Astro TextField/Textarea spread extra attributes onto the `<label>` (Vue binds `$attrs` to the input), so `autocomplete`, `readonly`, `pattern` and `aria-*` can't reach the input (`TextField.astro:51`, `Textarea.astro:48`)
  > Fix
  - Fixed: extra attributes go to the `<input>`/`<textarea>` in Astro, like Vue. `class` and `style` stay on the root `<label>` in both frameworks (Vue used to put `style` on the input), `id` stays on the input. A passed `aria-describedby` is merged with the end text id in both (Vue's `$attrs` used to overwrite it). The `Attributes` drift files are gone. The Astro types are now input/textarea attributes instead of label attributes.
- [x] (7) Cards clip long unbroken words instead of wrapping them (`layout` UnevenGrid)
  - Fixed: cards have `overflow-wrap: break-word` and `min-inline-size: 0`, so they also stop growing their grid column.
- [x] (7) Rich text tables break short words letter by letter: `overflow-wrap: anywhere` lowers the min-content width (`typography` EveryElement)
  - Not fixed, needs a decision. `anywhere` is there so a table never pushes the article wider than the screen. Every fix trades something:
    1. Scroll: `display: block; overflow-x: auto` on the classless `table` plus `overflow-wrap: break-word` on cells. Words stay whole and the table scrolls when it doesn't fit (tried it, checked at 390px and 1100px). But axe flags the scroll region (`scrollable-region-focusable`): Chromium and Firefox make scrollers keyboard focusable, Safari doesn't, and classless markup can't add `tabindex`. Tables also stop stretching to full width when their content is short.
    2. `display: grid` keeps the full width, but splits `thead` and `tbody` into separate tables, so columns don't line up. Not usable.
    3. `hyphens: auto` with `overflow-wrap: break-word`: breaks at syllables instead of letters, but only where the browser has a hyphenation dictionary, and long URLs and numbers would overflow again.
    4. Keep `anywhere` (current). Never overflows, breaks short words on narrow screens.
  - Recommendation: 1, if you accept the Safari keyboard gap for wide tables (it would go in the a11y ledger), otherwise 4. Authors can always wrap a table in a focusable scroll container themselves.
  > Explain further and provide an example
  - Example `rich-text-table-wrapping` shows the same 5-column table in a 20rem (phone) column with each option:
    - 4 (current): "Pla/n", "Sto/rag/e", "Bus/ine/ss", "€1,/200/.00". Never wider than the column.
    - 1 (scroll): words stay whole, and the table scrolls inside the column (320px box, 646px content).
    - 3 (`hyphens: auto` + `break-word`): `break-word` doesn't lower the min-content width, so the table grows to 646px and spills out of the column. In Chromium on Linux (no hyphenation dictionary) it didn't hyphenate at all, and the URL can never hyphenate.
    - Author opt-in: a wrapper `<div tabindex="0" role="region" aria-label="…" style="overflow-x: auto">` looks like 1 and is keyboard reachable in Safari too.
  - The last box shows the side effect of 1: a two-column table in a 36rem column no longer stretches to full width.
  - Recommendation: 1. Readable words matter more than the full-width stretch. Record the Safari `scrollable-region-focusable` gap in the a11y ledger, and document the focusable wrapper for authors who need Safari keyboard access. Drop 3. Keep 4 only if the ledger entry is not acceptable.

    ```css
    table:not([class]) {
      display: block;
      max-inline-size: 100%;
      overflow-x: auto;

      :where(th, td) {
        overflow-wrap: break-word;
      }
    }
    ```

  - Your reply is the same as the one above, which is already answered with the `rich-text-table-wrapping` example. Still needs a decision: option 1 (scroll, Safari keyboard gap in the a11y ledger) or 4 (keep `anywhere`).
  > Fix
  - Fixed (option 1): classless rich text tables are `display: block; overflow-x: auto` at `inline-size: 100%`, and cells use `overflow-wrap: break-word` instead of `anywhere` (`typography.css`). Words stay whole and wide tables scroll inside the column (checked at 390px). A table with short content no longer stretches to full width. Safari doesn't make the scroll box keyboard focusable, so wrap a wide table in `<div role="region" aria-label="…" tabindex="0">` when that matters.
  - axe flags `scrollable-region-focusable` on the `typography` stress page (Columns, HostileContent), light and dark. Recorded in `a11y-known-violations.json` as intended; see the Accessibility item "Rich text tables that scroll".
- [x] (7) Sticky table headers don't stick: `.ui-table { overflow: hidden }` should be `overflow: clip` (`data-display` TableStickyHeader)
  > remove the ability to do sticky table headers - they need to be rethought. create a todo for doing a second pass on sticky headers. skip this for now.
  - Removed the leftover `thead { z-index: 1 }`. Sticky headers were never documented. Follow-up below.
- [x] (7) Sticky table headers: second pass. Needs `overflow: clip` instead of `hidden` on `.ui-table` (or a scroll wrapper that is the sticky container), a header background and border that survive `border-collapse: separate`, and an opt-in class. See the scroll-state suggestion for the stuck shadow.
  > Explain further and provide an example
  - Why it fails today: `.ui-table { overflow: hidden }` (`table.css:11`) makes the table its own scroll container, and the table never scrolls, so a sticky `th` never sticks. The example's left table scrolls its header away.
  - What works (checked in Chromium, inside a scroll wrapper and against the page):

    ```css
    .ui-table {
      overflow: clip;

      &.ui-sticky-header > thead {
        container-type: scroll-state;
        inset-block-start: var(--table-sticky-offset, 0);
        position: sticky;
        z-index: 1;
      }

      &.ui-sticky-header > thead tr:hover > th {
        background-color: var(--surface-filled);
      }
    }

    @container scroll-state(stuck: top) {
      .ui-table.ui-sticky-header > thead th {
        box-shadow: 0 var(--size-1) var(--size-2) -0.25rem oklch(0 0 0 / 30%);
      }
    }
    ```

  - Notes:
    - `overflow: clip` still clips to the rounded corners but doesn't create a scroll container. The header's bottom border belongs to the `th` (`border-collapse: separate`), so it moves with it.
    - The hover override is needed. `tr:hover > th` uses a 75% alpha background, and rows showed through the stuck header on hover.
    - `thead` is sticky (not `th`) so that the scroll-state query can style the cells. A query can't style its own container. If Safari has trouble with a sticky `thead`, fall back to sticky `th` without the shadow.
  - Opt-in API:
    - HTML `class="ui-table ui-sticky-header"`; Astro/Vue `<Table stickyHeader>`.
    - `--table-sticky-offset` for pages with a fixed top bar.
    - For a scrolling box, wrap the table: `<div class="ui-table-scroll" tabindex="0" role="region" aria-label="…">` with `max-block-size` and `overflow: auto`.
  - Example: `sticky-table-header` (current vs proposed, scrolled; the proposed header shows the stuck shadow).
  - Fixed: `.ui-table` uses `overflow: clip`. `stickyHeader` (`.ui-sticky-header`) makes `thead` sticky and a `scroll-state` container, keeps the header opaque on hover and gives it the Dialog/Drawer scroll shadow (`--shadow-4`, clipped to below the header) once it's stuck. Offset it with `--_sticky-offset` on the table (a private variable, like Carousel's `--_block-size`, instead of `--table-sticky-offset`). No `.ui-table-scroll` class: the docs example and the `data-display` TableStickyHeader stress test wrap the table in their own scroll box. Multi-row headers stick as one block.
- [x] (7) Select can't preselect. Astro passes `value` through `...rest` onto `<select>`, and options get no `selected`. Vue SSR outputs no `selected` because the `v-model` select transform only handles direct `option`/`optgroup` children, not options inside `div.ui-list`. `Item` has no `selected` field (`Select.astro:64,70`, `Select.vue:63-75`, `Select/types.ts:13-16`)
  > Fix
  - Fixed: `Item` has `selected`. Astro takes `value` (a string or an array for `multiple`) and marks matching options `selected`; without `value`, items with `selected: true` are selected. Vue renders `selected` on item options from the `v-model`/`value`, falling back to `selected` items, so SSR output matches Astro. New `select/Preselected` example.
- [x] (8) A tall menu runs off the viewport when neither side has `60dvb` of space (`menu.css` `--_max-block-size`) (`overlays` LongContent)
  > give a better example
  - Example: a laptop viewport 700px tall. A toolbar button sits in the middle of the page, at `y = 330`, and opens a 12-item menu (about 480px of items).
    - The menu is capped at `60dvb` = 420px.
    - Below the trigger there are about 330px, above it about 320px. 420px fits on neither side.
    - No `position-try-fallbacks` option fits, so the browser keeps the first one (`block-end`). The menu runs about 90px past the bottom of the viewport. It's `position: fixed` in the top layer, so scrolling the page doesn't reveal the last items. They can only be reached with the keyboard, if at all.
  - Proposed fix: cap the menu to the space on its side and let the browser pick the roomier side:
    ```css
    .ui-menu[popover] {
      /* % resolves against the position-area cell */
      max-block-size: min(var(--_max-block-size), 100%);
      position-try-order: most-block-size;
    }
    ```
  > Fix
  - Fixed, with one change to the proposal: `position-try-order: most-block-size` also moved short menus. A 3-item menu in the lower half opened upward even though it fit below. Instead, the menu is capped to the space on its side, with a minimum before it flips:
    ```css
    .ui-menu[popover] {
      max-block-size: min(var(--_max-block-size), calc(100% - var(--_offset)));
      min-block-size: calc-size(fit-content, min(size, var(--_min-block-size)));
    }
    ```
    `--_min-block-size` is `12rem`. The menu stays on its preferred side if it has `12rem` (or the whole menu) of space, and scrolls inside that space. Otherwise it flips as before. The rule is inside `@supports (calc-size)`, so browsers without `calc-size()` behave as before.
  - Checked in Chromium at 1200×700 with a 12-item menu opened from `y = 330`: before, 374–794px (94px off-screen). Now 374–700px and it scrolls. A 3-item menu at `y = 520` still opens below.
- [x] (8) Card actions don't stick to the bottom of stretched cards, never wrap, and get clipped by the card's `overflow: hidden` (`layout` UnevenGrid)
  - Fixed: `.ui-actions` gets `margin-block-start: auto` and `flex-wrap: wrap`. Its top spacing moved from margin to padding, so non-stretched cards look the same.
- [x] (8) Rich text link styles apply to component links inside prose: `a.ui-button`, `a.ui-chip` and `a.ui-avatar` get underlined primary text (`typography` ComponentsInProse)
  - Fixed: rich text moved to a new `components.prose` layer, below `components.root`, so component styles always beat classless prose styles. Layer order is now `openprops, theme, normalize, components.prose, components.root, components.extended, utils` (README, getting started and skill updated). Rich text links also skip elements with a `ui-` class, so `a.ui-chip` isn't bold.
- [x] (9) Tooltips more than one viewport down the page never show: `position-visibility: anchors-visible` in `tooltip.css` (`overlays` LongContent, `tests/e2e/stress-overlays.spec.ts`)
  > fix it. what I also noticed was that dialogs that are scrollable should have fixed header and footer - fix that too.
  - Fixed: the cause was `position: absolute` on hover popovers in `anchor.css` (top-layer boxes below the initial containing block are not painted). They are `position: fixed` now. `anchors-visible` stays, so a tooltip hides when its trigger scrolls out of view.
  - Fixed: `Dialog` already had a max height (`85dvb - var(--size-4)`), but the whole dialog scrolled. Now the header and actions stay put and only `.ui-content` scrolls.
- [x] (9) Button with an icon and unwrapped text renders as icon-only (`padding-inline: 0`, square min size): `:has(> svg:only-child)` ignores text nodes, so v5 markup `<button><svg/>Save</button>` breaks, and MIGRATING doesn't mention it (`button.css:178-182`)
  > Explain further and provide an example
  - `button.css:178` `&:where(:has(> svg:only-child))` only sees elements. In `<button class="ui-button"><svg/>Save</button>` the `svg` is the only element child, so the button gets:
    - `padding-inline: 0` (the text touches the border);
    - `min-inline-size` set to the button height;
    - a 24px icon instead of 20px.
  - Measured: unwrapped 79px wide with 0 padding; `<svg/><span>Save</span>` 98px with 10px/13.5px padding.
  - Astro/Vue `<Button><Icon/>Save</Button>` renders the same markup. The icon-side padding rule (`> svg:first-child + *`) also needs an element after the icon.
  - Options:
    1. Keep the CSS and require a wrapper (`<span>`) around the label. Add a MIGRATING note.
    2. Bring back an explicit `.ui-icon-only` opt-in. MIGRATING removed it in this release, so this reverses that.
    3. Make the square depend on an accessible name too. An icon-only button must have one, and `Button`'s `label` prop already renders `aria-label`:

       ```css
       &:where(:has(> svg:only-child):is([aria-label], [aria-labelledby], [title])) {
       ```

       Unwrapped text then gets normal padding (example, second row). A text button with an `aria-label` would still square, but that is already a label-in-name problem.
  - Recommendation: 3 plus the MIGRATING note from 1, because the asymmetric icon padding needs a wrapper anyway. Note for MIGRATING.md:

    ```md
    Wrap button text in an element when the button has an icon. `<button class="ui-button"><svg/>Save</button>` renders as an icon-only button (no inline padding); use `<button class="ui-button"><svg/><span>Save</span></button>`.
    ```

  - Example: `button-unwrapped-text` (unwrapped, wrapped, icon-only, small unwrapped; current vs option 3).
  > Fix
  > ok, add the <span class="ui-text">. That will probably save many headaches in the future.
  - Fixed: `<span class="ui-text">` is the Button label part. The CSS still accepts any wrapper (the icon padding rules use `*`), so plain `<span>` keeps working.
  - Examples, stress tests and todo examples wrap button labels in `<span class="ui-text">` (Button `IconAndLabel`, `Sizes`, `Disabled`, ButtonGroup `WithIcons`). No example had unwrapped text next to an icon. Parity snapshots updated (intended).
  - The Button docs say to always wrap the label in `<span class="ui-text">`, and the API part is `.ui-button > .ui-text`.
  - MIGRATING: the old diff showed `<svg>…</svg> Save` (the broken markup). It now uses `.ui-text`, and a new note explains that unwrapped text next to an icon renders as icon-only.

---

- [x] (10) Astro TextField, Textarea and Dialog still crash for package users: they destructure `Astro.locals.$id` directly instead of using `createId`, so a TextField/Textarea with end text or a Dialog with a `header` slot throws when no middleware sets `$id` (`TextField.astro:32`, `Textarea.astro:29`, `Dialog.astro:8`, `components/id.ts`)
  > Fix
  - Fixed: TextField, Textarea and Dialog use `createId(Astro.locals)`. No component reads `Astro.locals.$id` directly anymore.

## Docs

- [x] (1) Card walkthrough: the hgroup margin reset lives in the demo `<style>`, though `card.css` does it now, and a card without actions has no bottom padding (`CardBuild.astro:24-30,139-141`, `card.css:62-68,75-77,96-98`)
  - Fix: `margin-block: 0` on `.card > :is(hgroup, .content)`, plus `.card > :is(hgroup, .content):last-child { padding-block-end: 0.75rem; }`
  > Fix
  - Fixed: step 1 has `margin-block: 0` on `.card > :is(hgroup, .content)`, `.card > hgroup > * { margin-block: 0; }` (moved out of the demo `<style>`) and `.card > :is(hgroup, .content):last-child { padding-block-end: 0.75rem; }`, with a note (`CardBuild.astro`).
- [x] (1) Checkbox and Radio: the HTML Validation sentence has no closing period ("…`<fieldset class="ui-fieldset">` element") (`checkbox.astro:268`, `radio.astro:136`)
  > Fix
  - Fixed (`checkbox.astro`, `radio.astro`).
- [x] (1) Divider: `<h2 class="default">` should be `id="default"`, so the section has no anchor (`divider.astro:32`)
  > Fix
  - Fixed: `id="default"` (`divider.astro`).
- [x] (1) MIGRATING links `./CHANGELOG.md#500`, but the heading's anchor is `#500---2026-05-21`. CHANGELOG calls Carousel "CSS only" though it has Astro and Vue components, say "No JavaScript" (`MIGRATING.md:198`, `CHANGELOG.md:46,348`)
  > Fix
  - Fixed: `./CHANGELOG.md#500---2026-05-21`. Carousel already says "No JavaScript needed" in the CHANGELOG.
- [x] (1) Package README: `cp -r … .claude/skills/opui` fails when `.claude/skills` doesn't exist, and MIGRATING.md isn't linked (`packages/opui/README.md:144-146`)
  - Example:
    ```bash
    mkdir -p .claude/skills && cp -r node_modules/opui-css/skills/opui .claude/skills/opui
    ```
  > Fix
  - Fixed: `mkdir -p .claude/skills && cp -r …`, and a new Upgrading section links MIGRATING.md, the Migrating page and CHANGELOG.md (`packages/opui/README.md`).
- [x] (1) Root README Project Structure misses `core/`, `skills/` and `vue/` in the package, and `src/component-api`, `src/component-examples`, `src/docs` and `tests/` in the site (`README.md:18-28`)
  > Fix
  - Fixed: lists every package folder (`astro/`, `components/`, `core/`, `css/`, `scripts/`, `skills/`, `vue/`), the site folders under `src/`, and `scripts/` and `tests/` (`README.md`).
- [x] (1) Stale IconButton mentions: the DocLink comment, the `--button-size-x-small` description, and `--icon-size-large` described as "IconButton, Avatar and List" when only List reads it (`src/components/DocLink.astro:8`, `src/utils/theme-token-descriptions.ts:17,89`, `packages/opui/css/components/list.css:13,342`)
  > Fix
  - Fixed: the DocLink comment says "Button, Chip, ListItem", `--button-size-x-small` is the `Button` and `ButtonGroup` `.ui-x-small` height, and `--icon-size-large` is the icon size in `Avatar` and `List` (`avatar.css` reads it too) (`DocLink.astro`, `theme-token-descriptions.ts`). `list.css` has no IconButton mention left.
- [x] (1) Textarea: leftover empty `<div class="ui-not-rich-text"></div>` (`textarea.astro:169`)
  > Fix
  - Fixed: removed (`textarea.astro`).
- [x] (1) TextField walkthrough: affixes keep `--text-muted` when the field is invalid. The library colors them with `--_label-color`, which the invalid rule switches, and the learn post's snippet has `--label` (`TextFieldBuild.astro:77,125-129`, `text-field.css:76,102,351`, `text-field-user-invalid.astro:60`)
  - Fix: `--label: var(--text-muted)` on `.text-field`, `color: var(--label)` on the affixes, `--label: var(--invalid-text-color)` in step 4
  > Fix
  - Fixed: `.text-field` sets `--label: var(--text-muted)`, the affixes use `color: var(--label)`, and the Validation step sets `--label: var(--invalid-text-color)`, so the affixes turn red with the border. The learn post snippet already had `--label`. Its bullet "the label, border and helper text all react" now says "the border, affixes and helper text", since the library never recolors the label. Checked in Chromium (`TextFieldBuild.astro`, `text-field-user-invalid.astro`).
- [x] (1) Title Case headings: "Keyboard Interaction" (`tabs.astro:165`), "Start text & End text" (`range.astro:51`), "Global Classes", "Local Overrides", "Custom Values", "Forced Colors" (`_theming.astro:86,105,183,205`), "Classic Select API" (`select.astro:35`). API titles "Button group" and "Button" lack "API" (`button-group.astro:26-27`)
  > Fix
  > dont' use title case
  - Fixed: "Keyboard interaction" (`tabs.astro`), "Start and end text" (`range.astro`), "Global classes", "Local overrides", "Custom values", "Forced colors" (`_theming.astro`), "Classic select API" (`select.astro`), "Button group API" and "Button API" (`button-group.astro`, now `#button-group-api` and `#button-api`), and the Dialog callout "Modal vs dialog".
- [x] (1) Typos: "a `a`" (`list.astro:150`), "a `aria-label`" (`checkbox.astro:309`), "The term "modal" and "dialog" are" (`dialog.astro:69`)
  > Fix
  - Fixed: "an `a`" (`list.astro`), "an `aria-label`" (`checkbox.astro`), "The terms "modal" and "dialog" are" (`dialog.astro`).
- [] (1) Walkthroughs: `features` missing for features the step uses
  - Accordion "Marker": `individual-transforms` (`AccordionBuild.astro:63-84`)
  - Avatar "Group": `logical-properties` (`AvatarBuild.astro:79-99`)
  - Button "Ripple": `clip-path`, `transforms3d` (`ButtonBuild.astro:63-97`)
  - Carousel step 2: `overscroll-behavior`, `scroll-snap`. Step 4: `relative-color`, `scroll-marker-targets` (for `:target-current`), `scrollbar-width` (`CarouselBuild.astro:25-32,99-116`)
  - Dialog "Fade": `display-animation` (`DialogBuild.astro:90-99`)
  - Drawer step 1: `overscroll-behavior`. "Slide": `display-animation`, `individual-transforms` (`DrawerBuild.astro:25-27,80-116`)
  - Form "Groups": `not` (`FormBuild.astro:51-79`)
  - Menu step 3: `anchor-positioning`. Step 4: `overlay` (`MenuBuild.astro:49-58,66-82`)
  - Range "Fill": `dir-pseudo` (`RangeBuild.astro:78-102`)
  - Rhythm "Snap font size": `round-mod-rem` (`RhythmBuild.astro:30-38`)
  - Select steps 2 and 4: `individual-transforms` (`SelectBuild.astro:64,68,120-135`)
  - Table "Corners": `logical-properties` (`TableBuild.astro:56-73`)
  - Tabs: no step lists any. Step 3: `clip-path`, `focus-visible`. Step 4: `isolation`, `nth-child-of` (`TabsBuild.astro:53-97`)
- [] (1) Walkthroughs: button snippets and demos without `type="button"`, which every library button and example has since c393948 (`AnchorBuild.astro:19,33-39,62`, `ButtonBuild.astro:52-59,127-135`, `ButtonGroupBuild.astro:21-25`, `CardBuild.astro:107-108,121-122`, `ChipBuild.astro:26`, `DialogBuild.astro:23-32`, `DrawerBuild.astro:28-35`, `ListBuild.astro:40`, `MenuBuild.astro:17,21,104`, `SpinnerBuild.astro:104`, `ToastBuild.astro:32-38`, `TooltipBuild.astro:27-33`)
  - The Toast HTML examples have the same gap (`src/component-examples/toast/*.html`)
- [] (1) Walkthroughs: fixed durations ignore `--motion`, which the library multiplies in. Menu step 4 (`MenuBuild.astro:66-70`, `menu.css:3,20,50-54`), Progress step 3 (`ProgressBuild.astro:58`, `progress.css:54-55`), Range halo (`RangeBuild.astro:147,152`, `range.css:300-301,316-317`)
  - Fix: `transition: inline-size calc(0.2s * var(--motion, 1)) ease-out`
- [] (1) Walkthroughs: Read more links (`references.ts`, shown on learn posts) miss what the walkthroughs teach
  - anchor: `interestfor`
  - checkbox: links `text-box`, which the library dropped
  - dialog: no `backdrop-filter`, `overlay`, `overscroll-behavior`. Links `:has()` and `scrollbar-gutter` for a scroll lock the walkthrough doesn't show
  - drawer: no `closedby`, Invoker Commands API, `backdrop-filter`, `overscroll-behavior`
  - menu: no `transition-behavior`
  - progress: no `@container style()`
  - rhythm: no `@property`
  - select: no `mask`
  - toast: no Invoker Commands API, Popover API
  - tooltip: no `interestfor`, `anchor()`, `anchor-scope`
- [x] (2) Accordion walkthrough: drift
  - See the example: a summary without an svg, and the turn marker in RTL with a right-pointing and a mirrored chevron.
  - The native marker is always hidden. The library only hides it when the summary has an svg, and the docs promise "Leave it out to fall back to the native arrow" (`AccordionBuild.astro:52-61`, `accordion.css:96-106`, `accordion.astro:162-163`)
  - The turn marker has no RTL rule, `.ui-marker-turn[open]:dir(rtl) > summary svg { rotate: -90deg; }` (`AccordionBuild.astro:77-82`, `accordion.css:127-129`)
  - Library question: the RTL `-90deg` assumes the chevron is mirrored in RTL. The docs examples use a right-pointing chevron that nothing mirrors, so in RTL it opens pointing up. Mirror it (`.ui-marker-turn:dir(rtl) > summary svg { scale: -1 1; }`) or say in the docs that RTL needs a left-pointing icon
  > Fix
  - Fixed: the native marker is only hidden when the summary has an svg (`summary:has(svg)`), and the demo has a "Native" item with no icon (`AccordionBuild.astro`).
  - Library question, fixed in the library: `.ui-marker-turn:dir(rtl) > summary svg { scale: -1 1; }` mirrors the chevron, so with the existing `rotate: -90deg` it points to the inline end when closed and down when open (`accordion.css`). The walkthrough shows both rules and a right-to-left demo item.
  - Checked in Chromium on copies of the Marker animation examples, LTR and RTL: turn is right/down in LTR and left/down in RTL (it opened pointing up before), rotate and flip are unchanged. Someone who already used a left-pointing chevron in RTL now gets it mirrored.
- [] (2) Anchor walkthrough: drift
  - The card sets `position-anchor`, and a note says so. The library's popover variant doesn't: a popover opened by `interestfor` anchors to its invoker. Only the always-visible variant uses `position-anchor` (`AnchorBuild.astro:53-57,66`, `anchor.css:9-35`)
  - No `position-visibility: anchors-visible`, which the library sets and the Read more links point to (`AnchorBuild.astro:73-84`, `anchor.css:33`, `references.ts:49-50`)
  - "Only `<button>` and `<a href>` can be interest invokers" leaves out `<area>` (`AnchorBuild.astro:24`)
- [x] (2) Button group walkthrough: drift
  - See the example: the walkthrough's outlined group, the library's, and the library's without `role="group"`.
  - The selector is `.group`, and the note says `role="group"` is for assistive tech. The library only styles `[role="group"].ui-button-group`, so a group without the role is unstyled (`ButtonGroupBuild.astro:7,29`, `button-group.css:2`)
  - Outlined uses the subtle `--border-color`. The library draws a strong `--_edge-color` (`light-dark(var(--color-16), var(--color-1))`) on an outline that is always there, and dividers take the same color (`ButtonGroupBuild.astro:55-62`, `button-group.css:4,11-25,78-79`)
  - The note says the line is on each button's start edge, but the `box-shadow` is physical, so it's on the left (`ButtonGroupBuild.astro:40-46`, `button-group.css:31-33`)
  > Fix
  - Fixed: the selectors are `[role="group"].group`, like the library, and the note says the styles need the role. The outline is always there (`--edge: transparent`), `.outlined` sets `--edge: light-dark(var(--color-16), var(--color-1))`, and the dividers use the same color (`ButtonGroupBuild.astro`).
  - The divider note says the line is on each button's left (or top) edge. The `box-shadow` stays physical, like `button-group.css`: in RTL the clipped outer edge just switches sides, so it looks the same.
- [] (2) Button walkthrough: `.ripple` sets `border-radius: 50%`, so the step teaches that ripple makes a button round. The circle comes from `.ui-rounded`, and the docs pair them (`ButtonBuild.astro:65-68`, `button.css:288-311`, `button.astro:147-154`)
  - See the example: hover each button, and the icon in a 56px icon-only button.
  - Also drifted:
    - The halo runs on plain `:hover`. The library limits it to `@media (hover: hover)` and enabled buttons, so touch gets no sticky halo (`ButtonBuild.astro:85-91`, `button.css:313-324`)
    - The icon is capped at `1.25em` at every size. The library uses `0.7lh`, and icon-only buttons scale it with the button (`calc(var(--_min-height) * 0.6)`) (`ButtonBuild.astro:19-22`, `button.css:92,153,203-207`)
    - The label wrapper is a plain `<span>`. The docs and examples use `<span class="ui-text">` (`ButtonBuild.astro:52-59,127-135`, `button.astro:104-106`)
    - The base step is tonal with `gap: 1ex` on every button. The default is a text button, and `1ex` only applies with an svg (`ButtonBuild.astro:9-14`, `button.css:88-89,108-109,145-146`). A note ("shown tonal for visibility") would do
  > Explain further and provide an example
  > what is the fix?
  - The library is right, only the walkthrough needs to change. The Ripple step puts two things in one class: the halo (`::before`) and `border-radius: 50%`. So the step teaches that ripple makes a button round. In the library they're separate: `.ui-ripple` only adds the halo, `.ui-rounded` makes the corners round (`--_border-radius: var(--radius-round)`), and the docs use them together on icon-only buttons. A text button with `.ui-ripple` keeps its normal corners.
  - Fix: split the class, and bring the hover rules in line with the library:
    ```css
    .ripple {
      --ripple-scale: 0.01;
      position: relative;
      transform-style: preserve-3d;
    }

    .ripple::before {
      /* unchanged, with calc(0.2s * var(--motion, 1)) as the duration */
    }

    @media (hover: hover) {
      .ripple:not(:disabled):hover {
        --ripple-scale: 1;
      }
    }

    .ripple:not(:disabled):hover:active {
      --ripple-scale: 1.1;
    }

    .rounded {
      border-radius: 50%;
    }
    ```
    The demo button becomes `class="button ripple rounded"`, and a note says: "`.ripple` only adds the halo, the circle comes from `.rounded`. The library pairs `.ui-ripple` with `.ui-rounded` the same way". A second note: "`(hover: hover)` keeps touch screens from getting a halo that sticks after a tap".
  - The other drift bullets can go in the same change: the `0.7lh` icon size (scaled with the button when icon-only), `<span class="ui-text">` around the label, and a "shown tonal for visibility" note on the base step.
  - See the example: the walkthrough button, `.ui-ripple` alone and `.ui-ripple.ui-rounded`.
- [x] (2) Callout docs still say `role="note"` is added automatically (Astro, Vue) and tell HTML users to add it to the `article`, which axe flags as `aria-allowed-role`. Components and examples render `<article class="ui-callout">` without it (`src/docs/components/callout.astro:207-219`, `src/components/UnderTheHood/CalloutBuild.astro:22,149`)
  > Fix
  - Fixed: the Accessibility list says the Callout is an `<article>` (self-contained content) and not to add `role="note"`, on every framework. `CalloutBuild` drops `role="note"` from its code and preview, and its first note is now about `<article>`.
- [x] (2) Carousel walkthrough: drift
  - See the example: 3 per view with a 32px gap in an 18rem track, with the demo's `7rem` minimum and with `0`.
  - Buttons, markers and the hidden scrollbar apply unconditionally. In the library markers need `.ui-with-markers`, HTML buttons need `.ui-with-buttons`, and the scrollbar is only hidden when one of them is on. The note "Scrollbar hidden only where buttons are supported" leaves out the class (`CarouselBuild.astro:42-70,82-115,121`, `carousel.css:111,241,287-291`)
  - The demo slides set `min-inline-size: 7rem`, while the library sets `0`. At 3 per view with a 32px gap on a narrow stage the slides overrun the gap, contradicting the "(track − gaps) ÷ items per view" note (`CarouselBuild.astro:176`, `carousel.css:60-64`)
  - Text glyphs for the arrows: `❮` on the inline-start button points the wrong way in RTL. The library uses SVG chevrons that swap under `:dir(rtl)`. A note is enough (`CarouselBuild.astro:57-65,75`, `carousel.css:15-19,30-31,137-152`)
  > Fix
  - Fixed: buttons need `.with-buttons` and markers `.with-markers`, like the library, and the scrollbar is only hidden for `.carousel:is(.with-buttons, .with-markers)` inside `@supports selector(::scroll-button(*))`, with a note. The slides get `min-inline-size: 0` (with a note), and the demo no longer sets `7rem`. A note says text glyphs don't flip in right-to-left and the library swaps SVG chevrons under `:dir(rtl)` (`CarouselBuild.astro`).
  - Checked in Chromium: at 3 per view with a 32px gap the slides are 125.3px with exactly 32px between them. Button placement couldn't be checked, since Chromium 141 misplaces the library's anchored buttons too.
- [x] (2) Form walkthrough: the "only checkboxes" note (the rule covers checkboxes, radios and switches), the buttons-only rule without the library's `:not(.ui-column)`, and `role="group"` on the demo groups, which FieldGroup dropped (`FormBuild.astro:65-77,111-140`, `form.css:116-127`)
  - Fixed: the note says checkboxes, radios or switches, the rule is `.group:has(> button):not(.column, :has(> :not(button)))` with a note on `.column`, and the demo groups have no role.
- [] (2) Form walkthrough: the demo puts Cancel (`type="reset"`) and Save inside the fieldset. The library puts the action group after it (`FormBuild.astro:137-140`, `src/component-examples/form/Divider.html`)
  - The "Groups" step also leaves out the buttons-only group's top margin (unless an `hr` comes first) and `align-items: start` for `.ui-column`, so the `.column` the note mentions would stretch the buttons (`form.css:129-132,140-142`)
  > Explain further
  - A `<fieldset>` is a group, and its `<legend>` is the group's name. Screen readers announce "Notifications, group" when focus moves into it, and some repeat the legend with the first control. Everything inside reads as part of that group.
  - Cancel and Save don't belong to "Notifications". They act on the whole form. Inside the fieldset they're announced as part of it, and in a form with several fieldsets they look like they only save that one section. `<fieldset disabled>` also disables everything inside, so disabling the section would disable the form's buttons too.
  - The library keeps them outside: `form > fieldset`, then an optional `hr`, then a `.ui-field-group` with the buttons (`form/Divider.html`). `form.css` gives that buttons-only group a top margin, unless an `hr` comes right before it.
  - Proposed fix, walkthrough only:
    ```html
    <form class="form">
      <fieldset class="fieldset">
        <legend>Notifications</legend>
        …
      </fieldset>
      <div class="group">
        <button type="reset">Cancel</button>
        <button type="button">Save</button>
      </div>
    </form>
    ```
    And the two missing rules in the Groups step:
    ```css
    .group:has(> button):not(.column, :has(> :not(button)), hr + .group) {
      margin-block-start: 1rem;
    }

    .group.column:has(> button):not(:has(> :not(button))) {
      align-items: start;
    }
    ```
- [x] (2) List walkthrough: descendant selectors (`.list li`, `.bordered li + li`). The library only styles direct children, so a nested list in a row stays a list (`ListBuild.astro:13-14,59,63,67,91,95`, `list.css:42-43,133-134`)
  - See the example: the walkthrough rules turn the nested items into padded, bordered rows.
  - Fix: `.list > li`, `.list > li > button`, `.list > li:has(> a, > button, > label)`, `.bordered > li + li`
  - Also drifted:
    - `:has(> a, > button)` leaves out `> label` (checkbox, radio and switch rows) (`ListBuild.astro:59,72`, `list.css:155,198-200`)
    - The base background is `--surface-default`. The library list is `--surface-filled` (`ListBuild.astro:8`, `list.css:10`)
    - The shortcut is plain text. The library puts it in `<kbd>` (`ListBuild.astro:46,172`, `list/EndKeyboard.html`)
  > Fix
  - Fixed: `.list > li`, `.list > li > button`, `.list > li:has(> a, > button, > label)` and `.bordered > li + li`, with a note that `>` keeps a nested list a list. The base is `--surface-filled`, and the shortcut is a `<kbd>` (`ListBuild.astro`).
  - Checked in Chromium: nested items stay plain list items, top-level rows look the same as before, and the background matches the library list.
- [] (2) Menu walkthrough: the "Flip" step and its note describe pure flipping. The library caps the menu to the space on its side and scrolls, flips only when that side has less than 12rem, and has two `@position-try` fallbacks that span below or above as a last resort (`MenuBuild.astro:49-58`, `menu.css:28-31,43-48,56-65,177-185`)
  - Also `min-inline-size: max(10rem, …)` vs 12rem, and the demo hover is `--surface-tonal` where real menus use the list's primary tint (`MenuBuild.astro:36,127-129`, `menu.css:14,39`, `list.css:217-219`)
- [] (2) Progress walkthrough: the step's `<progress>` snippets have no accessible name. The demo and docs use `aria-label` (`ProgressBuild.astro:8-14`, `progress.astro:98`)
  > Explain further and provide an example
  - `<progress>` has the `progressbar` role, and a progress bar needs a name (axe `aria-progressbar-name`, WCAG 4.1.2). Without one, a screen reader only says "progress bar, 60%", and the user has no idea what is at 60%.
  - The demo below the steps has `aria-label="Uploading"` and `aria-label="Loading"`, and the Progress docs use `aria-label` too. Only the step 1 snippet, the one people copy, has no name.
  - Fix: name them in the snippet, and add a note:
    ```html
    <div class="progress">
      <progress aria-label="Uploading" max="100" value="60"></progress>
    </div>

    <div class="progress">
      <progress aria-label="Loading"></progress>
    </div>
    ```
    Note: "Give it a name: `aria-label`, or a `<label for>` when the text should be visible".
  - See the example: no name, `aria-label` and a visible `<label>`.
- [x] (2) Radio and Checkbox walkthroughs: dark mode looks the opposite of the library. They use `--primary` and `--primary-contrast` straight, so a light primary gets a dark marker. The library darkens the fill and keeps a light marker for 3:1 (`CheckboxBuild.astro:21-24,35,56-59`, `checkbox.css:3-7,135-143`, `RadioBuild.astro:19-22,38`, `radio.css:3-7,109-117`)
  - See the example: walkthrough and library styles in light and dark.
  - Fix:
    ```css
    .checkbox {
      --accent: light-dark(
        var(--primary),
        oklch(from var(--primary) min(l, 0.62) c h)
      );
      --accent-contrast: light-dark(var(--primary-contrast), var(--gray-1));
    }
    ```
  - Also: both dim the row with `:has(:disabled)`, the library uses `:has([disabled])`. They differ inside `<fieldset disabled>`, where `:disabled` is arguably right, so this may be a library fix instead (`CheckboxBuild.astro:91`, `checkbox.css:27`, `RadioBuild.astro:66`, `radio.css:28`)
  - Radio: the demo radios sit in a bare `div`, with no fieldset or legend (`RadioBuild.astro:105-120`)
  > Fix
  - Fixed: step 1 sets `--accent` (in dark mode the primary with its lightness capped at 0.62) and `--accent-contrast` (`--gray-1` in dark mode), and the fill, check, dash and dot use them. Both steps list `light-dark` and `relative-color`. Rows dim with `:has([disabled])`, like `checkbox.css` and `radio.css`. The Radio demo sits in a `fieldset` with a "Plan" legend, and step 1 shows it (`CheckboxBuild.astro`, `RadioBuild.astro`).
  - Checked in Chromium: in light and dark mode the walkthrough colors are the same as the library inputs on the same page (dark: `oklch(0.62 0.095 240)` fill with an `oklch(0.98 …)` marker).
- [] (2) Select walkthrough: drift
  - See the example: the triangle vs the chevron, and a select without a button forced into `base-select` (open both).
  - The arrow is a border triangle. The library switched to a masked chevron, and What's new says "The arrow is a chevron." (`SelectBuild.astro:55-65,72`, `select.css:7-18`, `whats-new.ts:153`)
  - `appearance: base-select` applies to every select. The library only opts in `select:has(button)`, as the learn post's own snippet shows (`SelectBuild.astro:7-10`, `select.css:181-184`, `select-base-select.astro:47-50`)
  - The demo select has no `aria-labelledby`, which the library sets (`SelectBuild.astro:151-153`, `select/Variants.html:2-4`)
  > Explain further
  > what is the problem and what is the proposed fix?
  - The problem: the Select walkthrough (the "Under the hood" build-up on the Select page, also embedded in its learn post) still teaches the select from before the rework. Copying it gives you something that looks and behaves differently from `.ui-select`:
    1. Arrow: step 2 draws a border triangle in `::picker-icon`. The library draws a chevron: `::picker-icon` is a `currentColor` box cut out with `mask`, so it follows the text color and any SVG can be the arrow (`--_chevron-icon`). What's new says "The arrow is a chevron", so the walkthrough contradicts the docs right above it.
    2. Opt-in: step 1 puts `appearance: base-select` on every `.select`. The library only opts in `select:has(button)`, so a plain `<select>` without the custom `<button>` stays native. With the walkthrough rule, it's switched to `base-select` too, without the markup the rest of the CSS expects (open both in the example).
    3. Name: the demo `<select>` relies on the `<label>` around it. The library points `aria-labelledby` at the label text, as every Select example does.
  - Proposed fix:
    ```css
    .select:has(button),
    .select:has(button)::picker(select) {
      appearance: base-select;
    }

    .select::picker-icon {
      background-color: currentColor;
      block-size: 1rem;
      content: "";
      inline-size: 1rem;
      inset-block: 50% auto;
      inset-inline: auto 0.75rem;
      mask: url("data:image/svg+xml,…chevron…") center / contain no-repeat;
      position: absolute;
      translate: 0 -50%;
    }
    ```
    ```html
    <label class="field">
      <span id="fruit-label">Fruit</span>
      <select aria-labelledby="fruit-label" class="select">
        …
      </select>
    </label>
    ```
    New notes: "`mask` cuts the chevron out of a `currentColor` box, so it follows the text color" and "Only a select with a `<button>` opts in, a plain one stays native". The Read more links already list `mask`.
- [] (2) Table walkthrough: no sticky header. Step 1 lacks `overflow: clip` (not `hidden`, so the table isn't a scroll container), and no step shows `position: sticky` on `thead` with the `scroll-state(stuck: top)` shadow (`TableBuild.astro:7-13`, `table.css:11,119-144`, `table.astro:111-131`)
  > Explain further and provide an example
  > i thought i added sticky header
  - You did, in the library and the docs: `.ui-sticky-header` (`stickyHeader` in Astro and Vue) and the "Sticky header" section on the Table page. This item is only about the "Under the hood" walkthrough at the bottom of that page (`TableBuild.astro`). Its steps are Separate, Cells, Corners and Footer, so it never shows how the sticky header works.
  - Proposed fifth step, "Sticky header", with a scroll box and more rows in the demo:
    ```css
    .table {
      overflow: clip;
    }

    .table > thead {
      container-type: scroll-state;
      inset-block-start: 0;
      position: sticky;
      z-index: 1;
    }

    @container scroll-state(stuck: top) {
      .table > thead th {
        box-shadow: var(--shadow-4);
        clip-path: inset(0 0 -2rem);
      }
    }
    ```
    Notes:
    - "`position: sticky` on `thead` keeps the header at the top of the scroll box"
    - "`overflow: clip`, not `hidden`: `hidden` makes the table a scroll container, so the header would stick to the table and never move"
    - "`scroll-state(stuck: top)` only shows the shadow while the header is stuck, `clip-path` lets it out below"
  - See the example: the walkthrough table and the proposed step, each in a scroll box.
- [x] (2) Tabs walkthrough: drift
  - See the example: the track corners in RTL with physical and logical radii, and the focus ring on the label vs the pill.
  - Physical corners on the track ends (`border-radius: var(--radius) 0 0 var(--radius)`) next to logical insets, so in RTL the rounded ends and the pill are on opposite sides. The library and the learn post use logical radii (`TabsBuild.astro:88,97`, `tabs.css:122-125,136-139`)
  - The focus ring outlines the label rectangle. The library outlines the pill (`+ .ui-tab-label::before`) (`TabsBuild.astro:60-65`, `tabs.css:62-67`)
  - The demo group has no name. The docs say to add `role="radiogroup"` and `aria-label` (`TabsBuild.astro:147`)
  > Fix
  - Fixed: the track ends use logical radii (`border-start-start-radius` and friends). Step 4 moves the focus ring to the pill (`.tab-input:focus-visible + .tab-label::before`). Step 3 keeps the ring on the label, so focus shows before the pill exists. The snippet and demo have `role="radiogroup"` and `aria-label="Account"`. The learn post says the ring is on the pill (`TabsBuild.astro`, `tabs-radio-buttons.astro`).
  - Checked in Chromium: in RTL the rounded ends are on the right sides, and the ring outlines the pill.
- [x] (2) Vue getting started has no preamble (empty meta/search description) and doesn't mention Vite + `@vitejs/plugin-vue` (`src/docs/guide/getting-started/Vue.astro:8-9`)
  > does it have to have vite? Should have to..... Also does it need a preamble? Otherwise just copy what the others have and adjust it, if needed, for Vue.
  - Fixed: same preamble as Astro, adjusted for Vue, so the meta and search descriptions aren't empty. Vite isn't required: the components ship as uncompiled `.vue` SFCs (with `lang="ts"`) and `.ts`, so any build with Vue SFC support works. The install section says that and names Vite with `@vitejs/plugin-vue`, Nuxt, and Astro with `@astrojs/vue` as examples.
- [x] (2) Agent docs are stale. `packages/opui/components/AGENTS.md` is Astro only and points at `src/pages/components/` (gone) and `component-api/[name]/Astro.astro` / `[name]-api.astro`. `src/component-api/AGENT.md` describes `<Label>.astro` tables and `field-api.astro`, and links `../../utils/framework.js` (should be `../utils/framework.js`). `src/docs/components/AGENTS.md` lists Callout severity `ok` (`packages/opui/components/AGENTS.md:3,242-243`, `src/component-api/AGENT.md:53-71`, `src/docs/components/AGENTS.md:175`)
  > Fix
  - Fixed: `packages/opui/components/AGENTS.md` covers Astro and Vue (types, `defineProps`/`defineSlots`, `computed`, `$props.class`, `useId()`, barrel exports, default `type="button"`, no generated input `id`) with current paths. `src/component-api/AGENT.md` presents `api.ts` as the standard (only Menu and Toast still use `.astro` tables), with the right `../utils/framework.js` link and real examples. `src/docs/components/AGENTS.md` lists the real Callout severities.
- [x] (2) Astro and Vue getting started say the CSS has to be imported "somehow" without showing where: a layout's frontmatter in Astro, `main.ts` in Vue (`getting-started/Astro.astro:36-38`, `getting-started/Vue.astro:42-44`)
  - Example:
    ```ts
    // src/main.ts
    import "opui-css/css/imports.css"
    ```
  > Fix
  - Fixed: Astro shows the import in a layout's frontmatter (or a `global.css` imported there). Vue shows `src/main.ts` with `createApp` (or a `main.css`), plus a Nuxt `css` note.
- [] (2) Card: the "Why does a text variant exist?" callout says the accordion group uses the card's text variant. The group items are `.ui-card` with no variant, and the group card is `.ui-outlined` (`card.astro:66-77`, `src/component-examples/accordion/Group.html:1-2`, `accordion.css:151-155`)
  > Explain further and provide an example
  - The callout's claim is wrong. The accordion group is `.ui-card.ui-outlined[role="group"]` with plain `.ui-card` items, which look flat because `accordion.css` makes accordion cards transparent and borderless, not because of `.ui-text`.
  - What the text variant does: a card without a variant gets `--surface-default`, invisible on the page but a page-colored panel on any other surface. `.ui-text` is transparent, with no border or shadow, and keeps only the card's layout (padding, gap, `hgroup`, `.ui-content`, `.ui-actions`). On the default page they look the same, so the `<!-- .ui-text class optional -->` comment in `card/Variants.html` is only true there. They differ on tonal and elevated surfaces, in dialogs and drawers, and on colored sections.
  - Proposed callout:
    > **Why does a text variant exist?** A card without a variant has the page background, so it shows up as a panel on tonal and elevated surfaces. The text variant is transparent: it keeps the card's layout (header, content and actions) without a surface of its own. Use it for card-structured content inside another surface, such as a tonal section or a dialog, or for an accordion group that should sit flush on it.
  - Side finding: `accordion.css` treats a group without a variant like a text group (`:not(.ui-tonal, .ui-outlined, .ui-elevated)` sets `--_item-summary-padding-inline: 0`), so on a tonal surface it's a page-colored panel with summaries touching its edge.
  - See the example: both variants on the page and on a tonal surface, plus three accordion groups.
  > Explain further
  > propose five different versions of the callout texts. keep the tone relaxed like I'm doing in the rest of the library and keep it quite short and to the point.
  - All five drop the accordion claim. Pick one, or mix:
    1. **Why does a text variant exist?** For cards that already sit on something. It keeps the card's layout and drops the background, so it blends into a tonal section, a dialog or a drawer.
    2. **Why does a text variant exist?** It's a card with the paint scraped off. Same header, content and actions, but no background, border or shadow, so it sits flush on whatever's underneath.
    3. **Why does a text variant exist?** On the page you won't see a difference. Put a card on a tonal surface or in a dialog, though, and the default one turns into a page-colored box. The text variant stays see-through.
    4. **Why does a text variant exist?** Cards inside cards get boxy fast. The text variant keeps the structure and lets the surface underneath do the talking.
    5. **Why does a text variant exist?** Sometimes you want the card's spacing, not the card. Use the text variant for card-shaped content inside another surface.
  - Recommendation: 3, since it also explains why the two look the same on the page. 2 if you'd rather keep it to one line.
- [x] (2) CHANGELOG and MIGRATING say `--font-size-h3` and `--font-size-h4` got "higher minimums", but h4 went from a fixed `--font-size-3` (1.25rem) to `clamp(var(--font-size-2), 3vw, var(--font-size-3))`, so its minimum dropped to 1.1rem (`CHANGELOG.md:21`, `MIGRATING.md:141`, `packages/opui/css/theme.css:117`)
  > Fix
  - Fixed: both say `--font-size-h3` has a higher minimum (`--font-size-3`) and `--font-size-h4` scales between `--font-size-2` and `--font-size-3` instead of a fixed `--font-size-3`.
- [x] (2) Informal tone: "It's just a line." (`divider.astro:29`), "on stuff" (`anchor.astro:47`), "Yes of course" (`button-group.astro:128`), "Just add" (`list.astro:364`), "Simply add" (`spinner.astro:45`), "for free" (`tabs.astro:123`, `text-field.astro:384`), "They pop up like... toast." (`toast.astro:13`), "famous last words" (`tooltip.astro:103`), "Let's put everything together" (`typography.astro:196`)
  - Example: "It's just a line." → "Separates content with a horizontal or vertical line."
  > informal tone is great. that is my voice. I want this sprinkled in here and there. this is more than fine.
  - Won't fix: the informal voice stays.
- [x] (2) Package README says `dist/opui.components.css` is `opui.css` "minus tokens and reset", but it also leaves out `palette.css` (required by the components), `theme.css` and `utils.css` (`.ui-sr-only`, the checkbox/radio halo) (`packages/opui/README.md:95,124,128`, `packages/opui/scripts/build.mjs:11-15`)
  > Fix
  - Fixed: it has only the layer order and the component styles, and needs Open Props, `palette.css` and `theme.css`. `utils.css` holds `.ui-sr-only` and the motion and contrast classes. The entry-points table matches.
  - Side finding, fixed: `build.mjs` read the layer order from `css/imports.css`, which has no `@layer` line, so `dist/opui.components.css` started with `undefined` and dropped the layer order and the Anchor styles. `components.css` already imports `layers.css`, so the prepend is gone (`build.mjs`).
- [x] (2) Site: the getting started install heading is `#installation` on Astro/Vue but `#npm-installation` on HTML. FrameworkPicker keeps the hash, so switching framework lands on no heading. Theme generator and Acknowledgments have no preamble, so they have no meta description (`HTML.astro:89`, `Astro.astro:16`, `Vue.astro:16`, `FrameworkPicker.astro:52`, `theme-generator.astro:6-7`, `acknowledgments.astro:7-8`, `Layout.astro:54`)
  - Example: `<h2 id="installation">Install via NPM</h2>` on the HTML page, plus a preamble such as "Edit the design tokens visually and download a `theme.css`."
  > Fix
  - Fixed: the install heading is `#installation` on every framework (`#css` and `#usage` match too). Theme generator and Acknowledgments have preambles, so they get meta descriptions.
- [x] (2) Spinner: the prose never says that elements with `aria-describedby` get no spinner. Only the HTML API note says so. "When not to use" lists `input`, `select`, `textarea`, `html` and `progress` only (`spinner.astro:74-81`, `spinner.css:2-9`, `src/component-api/spinner/api.ts:9`)
  - Fix: add `<li>Elements with <code>aria-describedby</code></li>`, and say in section 1 that this is how the progress pattern opts out.
  > Explain further and provide an example
  > why does elements with aria-describedby get no spinner?
  - Why: it's for the progress pattern from the Progress accessibility section and MDN's `<progress>` page. A loading region gets `aria-busy="true"` plus `aria-describedby` pointing at its progress bar, and without the exclusion it would show a spinner next to the bar. CSS can't follow an IDREF, so "described by a progress bar" became "described by anything". It came with the v4 rewrite (`67a0a49`) and hasn't changed since.
  - Too broad: it also catches things that should spin, like a busy button with a hint, error or tooltip linked by `aria-describedby`, a busy alert dialog (`dialog/AlertDialog.html` uses it), or anything a form library describes. Buttons and links are the main use for spinners, and they never carry the progress pattern.
  - Options:
    - A (recommended): `[aria-describedby]:not(button, a)` in the `:not()` list. The progress pattern keeps working, and busy buttons and links always spin (a Changed entry).
    - B: drop `[aria-describedby]` and add an opt-out class such as `.ui-no-spinner`. Clear, but breaking for the documented progress pattern.
    - C: detect the bar with `:has(progress, + .ui-progress)`. Covers the docs' markup but misses a bar placed elsewhere.
    - D: keep it and only document it.
  - Wording with A, for "When not to use":
    > A section that's being updated points at its progress bar with `aria-describedby` while `aria-busy="true"` marks it as busy. Busy elements with `aria-describedby` get no spinner, so you don't see a spinner and a progress bar. Buttons and links always get one.
  - See the example: a busy button with a hint (current vs proposed), and the region plus progress pattern.
  > Fix
  > why does elements with aria-describedby get no spinner?
  - Why (short version of the notes above): for the progress pattern. A loading region gets `aria-busy="true"` plus `aria-describedby` pointing at its progress bar, and it shouldn't show a spinner next to the bar. CSS can't check what the IDREF points to, so the rule skipped anything with `aria-describedby`, which also caught busy buttons with a hint.
  - Fixed with option A: the opt-out is `[aria-describedby]:not(button, a)`, so the progress pattern still gets no spinner, and busy buttons and links always get one. "When not to use" uses the proposed wording, and the HTML API note names the exception. The walkthrough and the learn post show the same selector (`spinner.css`, `spinner.astro`, `spinner/api.ts`, `SpinnerBuild.astro`, `spinner-aria-busy.astro`).
  - Specificity goes from (0,2,0) to (0,2,1). No other library CSS targets `aria-busy`, so nothing it used to beat changes.
  - Checked in Chromium: the Progress page's busy region still has no spinner, a busy `button.ui-button` and a busy link with `aria-describedby` get one, and a plain `div` with both attributes doesn't.
- [x] (2) Toggle: `changelogPaths` points at `src/component-api/toggle`, which doesn't exist. The API folders are `toggle-button` and `toggle-group` (`toggle.astro:48`)
  > Fix
  - Fixed: `toggle-button` and `toggle-group` (`toggle.astro`).
- [x] (3) Badge walkthrough: drift
  - See the example: dots in all four corners, walkthrough math vs library.
  - The indicator snippet and demo are a bare count, read as "5". The docs now require hidden context (`5 <span class="ui-sr-only">unread messages</span>`) (`BadgeBuild.astro:20-24,126`, `badge.astro:178-196`)
  - The dot offset hardcodes its sign. The library derives it from `--_sign-x` and `--_sign-y`, which alignments flip, so the note "alignments only swap values" is the pre-fix version (`BadgeBuild.astro:72,78-82,92`, `badge.css:4-13,110-132`)
    ```css
    .badge {
      --sign-x: -1;
      --sign-y: 1;
    }

    .badge.dot {
      --tx: calc((var(--dot) - 2px) * var(--sign-x));
      --ty: calc(var(--dot) * var(--sign-y));
    }
    ```
  > Fix
  - Fixed: the indicator snippet and demo have hidden context (`5 <span class="ui-sr-only">unread messages</span>`), with a note. Direction sets `--sign-x: -1` and `--sign-y: 1`, the translate and the dot offset are derived from them, and the note says alignments only flip the signs (`BadgeBuild.astro`).
  - Checked in Chromium: the indicators read "5 unread messages" and so on, and the dot sits right in all four corners and in RTL.
- [x] (3) Checkbox and Radio walkthroughs teach `text-box: trim-start cap` with a `1cap` offset, which c393948 replaced with `margin-block-start: calc((var(--_input-size) - 1lh) / 2 + var(--choice-label-offset))`. Firefox has no `text-box`, so the demo label sits low there (`CheckboxBuild.astro:96-105`, `checkbox.css:49-59`, `RadioBuild.astro:71-80`, `radio.css:55-57`)
  - See the example: label alignment side by side. In Chromium they look alike. Open it in Firefox to see the walkthrough labels sit low.
  - Same leftover `text-box` in `browserSupport` (`checkbox.astro:21`, `radio.astro:20`, `switch.astro:20`), the learn post (`checkbox-appearance-none.astro:38,85-86`) and the Read more links (`references.ts:169`)
  - Fix:
    ```css
    .label > span {
      margin-block-start: calc((var(--size) - 1lh) / 2);
    }
    ```
  > Fix
  - Fixed: the Label step uses `margin-block-start: calc((var(--size) - 1lh) / 2)` (Radio: `calc((1.25rem - 1lh) / 2)`), and lists `has` and `lh` instead of `text-box`. The learn post explains the `lh` offset, has a dark mode bullet with the `--accent` lines, and drops the `@supports` bullet. Its description and `features` in `learn-posts.ts` no longer mention `text-box`. The Read more link to `text-box` is gone (`references.ts`). `browserSupport` had already dropped it. Checked in Chromium: the label gets the same `-4px` as the library (`CheckboxBuild.astro`, `RadioBuild.astro`, `checkbox-appearance-none.astro`, `learn-posts.ts`).
- [x] (3) Checkbox walkthrough: no forced-colors step. With `appearance: none` the fill and the `clip-path` check are backgrounds, which forced colors erase. The library brings them back with system colors (`checkbox.css:188-202`)
  - See the example: turn on forced colors emulation (steps on the page). The walkthrough's checked box then looks unchecked.
  ```css
  @media (forced-colors: active) {
    .checkbox {
      border-color: CanvasText;
    }

    .checkbox:is(:checked, :indeterminate) {
      background-color: SelectedItem;
      border-color: SelectedItem;
    }

    .checkbox:is(:checked, :indeterminate)::after {
      background-color: SelectedItemText;
    }
  }
  ```
  > Fix
  - Fixed: new step 5, "Forced colors", with the CSS above (`CanvasText` border, `SelectedItem` fill, `SelectedItemText` mark), listing `forced-colors` and `system-color` (`CheckboxBuild.astro`).
  - Checked with forced colors emulated in Chromium: at step 4 the checked box is white with a white mark, at step 5 checked and indeterminate boxes are filled with a visible mark.
  - Not done: the Radio walkthrough has the same gap (its dot is a background too). This item only named Checkbox.
- [] (3) Dialog and Drawer walkthroughs: the step snippets show an unnamed `<dialog>`. Both components set `aria-labelledby`, and both docs pages tell readers to (`DialogBuild.astro:23-32`, `DrawerBuild.astro:28-35`, `Dialog.astro:10-17`, `Drawer.astro:20-37,51`, `dialog.astro:120-131`, `drawer.astro:257-277`)
  - Neither shows the scroll shadow (`container-type: scroll-state` with `scroll-state(scrollable: top|bottom)`), and Dialog doesn't show the page scroll lock (`html:has(.ui-dialog[open])`) (`dialog.css:39-80,106-111`, `drawer.css:75-118`)
  - Dialog's border is `--border-color`. The dialog is an elevated card, whose border matches the page (`DialogBuild.astro:10`, `card.css:49-54`)
- [x] (3) Range walkthrough: the fill is reversed in RTL, but the gradient still starts at the left edge, so it's painted on the wrong side of the thumb in Chromium and Safari. The library adds `&:dir(rtl)::-webkit-slider-runnable-track { background-position: right; }` (`RangeBuild.astro:87-91,126`, `range.css:269-271`)
  - See the example: the walkthrough CSS at 25% in RTL, without and with the fix.
  - Also drifted:
    - The demo label wraps the `<output>`, and the input has no `aria-labelledby`, so its name is "Volume 40" and changes on drag. The library points `aria-labelledby` at the label (`RangeBuild.astro:199-214`, `Range.astro:90`)
    - The scroll-driven fill isn't behind `@supports (animation-timeline: view())`, though the learn post says it is (`RangeBuild.astro:66-85`, `range.css:229-253`, `range-tick-marks.astro:130-134`)
    - The halo also applies to a disabled input. The library uses `:not([disabled])` (`RangeBuild.astro:137-143`, `range.css:330-342`)
    - `--fill` here, `--track-fill` in the learn post that embeds it
  > Fix
  - Fixed: `.range:dir(rtl)::-webkit-slider-runnable-track { background-position: right; }`. Also the drift bullets: the scroll-driven fill is inside `@supports (animation-timeline: view())` and uses `animation-*` longhands (see the lightningcss item), `--fill` is `--track-fill` like the learn post, the halo only applies to `:not([disabled])`, and the demo input uses `aria-labelledby` on the label text instead of a label around the `<output>`. The learn post snippet gets the same gate, longhands and RTL rules (`RangeBuild.astro`, `range-tick-marks.astro`).
  - Checked in Chromium: in RTL at 25% the fill runs from the thumb to the right edge, and a disabled range has no halo on hover.
- [x] (3) Sizes prose: the Button HTML text lists only `.ui-small` and `.ui-large` and skips `.ui-x-small` (the IconButton migration needs it). The Toggle text shows classes on Astro/Vue pages too, not a `Conditional` with the `size` prop (`button.astro:173-176`, `toggle.astro:140-143`)
  > Fix
  - Fixed: Button HTML text lists `.ui-x-small`, `.ui-small` and `.ui-large`. Toggle Sizes is a `Conditional`: the `size` prop (`x-small`, `small`, `large`) on Astro/Vue, classes on HTML.
- [x] (3) Switch walkthrough: the icon-only switch is named with `aria-label` on the input, which the Switch docs reject in favor of a `.ui-sr-only` label (`SwitchBuild.astro:140,181-186`, `switch.astro:62-65,300-305`, `switch/Icons.html`)
  ```html
  <label class="label">
    <span class="icon icon-unchecked" aria-hidden="true">…</span>
    <span class="icon icon-checked" aria-hidden="true">…</span>
    <input class="switch" type="checkbox" role="switch" />
    <span class="ui-sr-only">Light theme</span>
  </label>
  ```
  > Fix
  - Fixed: the step 4 snippet and the demo name the switch with `<span class="ui-sr-only">Light theme</span>` inside the label, with a note saying why. Checked in Chromium: the switch's name is "Light theme" and the layout is unchanged (`SwitchBuild.astro`).
  - Side finding: the Switch walkthrough's Motion step uses `0.2s` without `var(--motion, 1)`, while the learn post says the dot jumps with reduced motion.
- [x] (3) Textarea walkthrough: `--max-block-size` is taught as the override for the 20 line cap, and the knob sets it, but the library reads the private `--_max-block-size`, so users can't override it that way (`TextareaBuild.astro:69,77,106`, `textarea.css:6`)
  - See the example: 12 lines with `--max-block-size: 4lh` and with `--_max-block-size: 4lh`.
  - Fix: expose `--max-block-size` in the library (and the API table), or reword the note
  > Fix
  - Fixed by teaching the library's property: the Limits step reads `var(--_max-block-size, 20lh)`, the note says `--_max-block-size` changes the 20 line cap, and the Max lines knob sets it. The learn post snippet matches. The library is unchanged: the Customizing page already presents `--_` properties as the way to override a component, and a public `--max-block-size` would be the only exception. Checked in Chromium: the knob at 4 makes the textarea 96px (`TextareaBuild.astro`, `textarea-field-sizing.astro`).
- [x] (3) The "Text input API" table (HTML classes, no `source` and no `notes`) shows on Astro/Vue text-field pages and on `/astro/api` and `/vue/api`, with no note. The Text field API table already covers `autoFit` for those frameworks (`text-field.astro:68`, `component-api/text-input/api.ts`, `ApiTables.astro:28`)
  > Fix
  - Fixed: `text-field.astro` only adds the Text input API table on the HTML page. `text-input/api.ts` has Astro/Vue `notes` (CSS-only, the Text field component sets these with `autoFit`, `filled` and `size`), shown on `/astro/api` and `/vue/api`, like Spinner and Typography.
- [x] (3) `browserSupport` drift. Missing: badge (`light-dark`, `relative-color`), button-group (`scrollbar-width`), checkbox and radio (`light-dark`, `relative-color`, `user-pseudos`), switch (`relative-color`, `user-pseudos`), dialog and drawer (`anchor-positioning`, `container-scroll-state-queries`), table (`container-scroll-state-queries`), text-field and range (`user-pseudos`), tooltip (`container-style-queries`). Unused: checkbox, radio and switch (`text-box`, removed from the CSS), dialog (`container-style-queries`), table (`container-queries`) (`badge.astro:30`, `button-group.astro:23`, `checkbox.astro:21`, `radio.astro:20`, `switch.astro:20`, `dialog.astro:33`, `drawer.astro:23`, `table.astro:29`, `text-field.astro:59`, `range.astro:22`, `tooltip.astro:17`)
  - Global `@container style(--contrast: more)` / `style(--motion: 0)` queries left out on purpose: they're progressive enhancement and appear in most components.
  - Could be a check in `scripts/check-browser-support.mjs`: grep each component's CSS for a few feature patterns (`:has(`, `light-dark(`, `from var(`, `scroll-state`, `:user-invalid`, `anchor(`) and warn when the ID is missing or unused.
  > Fix
  - Fixed, after grepping each component's CSS:
    - Added: badge (`light-dark`, `relative-color`), button-group (`scrollbar-width`), checkbox and radio (`light-dark`, `relative-color`, `user-pseudos`), switch (`relative-color`, `user-pseudos`), dialog and drawer (`anchor-positioning`, `container-scroll-state-queries`), table (`container-scroll-state-queries`), text-field, textarea and range (`user-pseudos`), tooltip (`container-style-queries`).
    - Removed: `text-box` (checkbox, radio, switch), `container-style-queries` (dialog), `container-queries` (table).
- [x] (3) Button: the Sizes example has no `x-small` (only the HTML prose mentions it). Disabled doesn't show links, where `href` + `disabled` renders `aria-disabled="true"` (`src/component-examples/button/Sizes.{astro,html,vue}`, `SizesCode.{astro,vue}`, `button.astro:166-213`, `Button.astro:38`, `button.css:124`)
  - Example:
    ```html
    <a class="ui-button" href="/x" aria-disabled="true">Link</a>
    ```
  > Fix
  - Fixed: an `x-small` button starts each row in `button/Sizes.*`, and the prose lists all four sizes. Disabled has a row of links (`href` + `disabled` renders `aria-disabled="true"`) and says a disabled link blocks clicks but can still be focused (`Disabled.*`, `button.astro`).
- [x] (3) Callout: the Icon text ("You can also modify the component so you don't have to do it manually") is out of date, since `info`, `warning` and `critical` now ship default icons. The Severities example has no `success` callout, and `success` has no default icon (`callout.astro:136-142`, `src/component-examples/callout/Severities.{astro,html,vue}`, `Callout.astro:28-75`)
  - Fix: "`info`, `warning` and `critical` have a default icon. Replace it with the `icon` slot."
  > Fix
  - Fixed: "`info`, `success`, `warning` and `critical` have a default icon. Replace it with the `icon` slot." `success` gets a default check icon in Astro and Vue, matching the other three (`Callout.astro`, `Callout.vue`), and the Severities example shows tonal and outlined `success` (`callout/Severities.*`).
- [x] (3) Carousel: most sections are sentence fragments, for example "`perView`." and "`.ui-with-buttons`, and `.ui-with-markers` to navigate." Nothing says that browsers without scroll buttons and markers get a plain scroller (`carousel.astro:73-217`)
  - Example: "Set `perView` to show more than one item at a time." "Browsers without `::scroll-button()` and `::scroll-marker` get a plain scroll-snap list."
  > Fix
  - Fixed: every fragment is a short sentence now, and a line says that browsers without `::scroll-button()` and `::scroll-marker` get a plain scroll-snap list with a scrollbar. Basics stays a `<Conditional>` (buttons are on by default, set `markers`, or the classes in HTML). Per view, Stretch, Peek, Vertical, Buttons outside and Persistent buttons use the new `<PropOrClass>` (`carousel.astro`).
- [x] (3) CHANGELOG files the Accordion default chevron under Added, but it's breaking: a custom chevron in `summary` now shows twice. MIGRATING already covers it (`CHANGELOG.md:43`, `MIGRATING.md:75`)
  > Fix
  - Fixed: it's under Breaking, with the way out (move a custom chevron to the `marker` slot). The What's new note says Breaking too.
- [x] (3) CHANGELOG misses: Astro and Vue TextField, Textarea and Select no longer generate an input `id` (5.5.0 used `id || $id("text-field")`), and Range takes an `error` prop (`TextField.astro:80`, `TextField.vue:70`, `Textarea.astro:79`, `Select.astro:70`, `Range.astro:11,62`, `Range/types.ts`)
  > Fix
  - Fixed: Breaking says TextField, Textarea and Select no longer generate an input `id` (pass `id` when something outside references it), and Added has Range `error`. What's new has notes for both.
- [x] (3) Checkbox: Field group > Required says to set `required` on "at least one" input. Every required checkbox must be checked, and the example requires all three (`checkbox.astro:255-260`, `src/component-examples/checkbox/FieldGroupRequired.html`)
  - Fix: "Each checkbox with `required` must be checked before the form submits. There's no native 'at least one' for checkboxes."
  > Fix
  - Fixed: "Each checkbox with `required` must be checked before the form submits. There's no native "at least one" for checkboxes." (`checkbox.astro`).
- [x] (3) Getting started (HTML) splits the install options with Theming. Order: CDN, NPM (needs a bundler), manual, first component, then Theming. The "no install required" callout doesn't say that copied component CSS needs Open Props, `palette.css` and `theme.css` (`getting-started/HTML.astro:18-28,30-134`)
  > Fix
  - Fixed: CDN, NPM (needs a bundler), manual, "Your first component" (live example, JS helpers, links to Concepts and the components), then Theming. The callout says copied component CSS needs Open Props, `palette.css` and `theme.css`, which the CDN file already has.
- [x] (3) Getting started Theming says `--palette-source` can be overridden "anywhere", but the palette is only derived on elements `core/palette.css` matches (`:root`, severity classes, `.ui-palette`, …). Elsewhere it does nothing (`_theming.astro:43-54`, `packages/opui/core/palette.css:2-27`)
  - Example:
    ```html
    <div style="--palette-source: oklch(0.6 0.2 30)">no effect</div>
    <div class="ui-palette" style="--palette-source: oklch(0.6 0.2 30)">
      works
    </div>
    ```
  > Explain further and provide an example
  - `core/palette.css` declares `--color-1`–`--color-16` and the grays as `oklch(from var(--palette-source) …)`, but only on `:root`, the severity classes, `.ui-del`/`.ui-ins`, `[data-invalid]`, `del`/`ins`, `abbr`/`dfn` and `.ui-palette`. A custom property that references another is computed where it's declared, and children inherit the result. On a plain `div`, `--palette-source` changes but nothing reads it.
  - Second level: `--primary`, `--surface-*`, `--text-*` and the intent colors are declared on `html, .ui-palette` only. On a severity class the steps change but `--primary` stays the page's.
  - Measured with `oklch(0.6 0.2 30)`: plain `div`, nothing changes. `.ui-info`, the steps turn red but the button stays green. `.ui-palette`, both turn red.
  - Proposed wording:

    > You can also set `--palette-source` directly (it must be an `oklch()` color). Set it on `:root`, or on an element with `.ui-palette` to re-theme that part of the page. Anywhere else it has no effect: the palette is computed where `core/palette.css` declares it and only inherited from there.

    Keep the `.ui-warning` snippet, introduced as "This is how the severity classes get their colors:". The same goes for `--palette-hue`, `--palette-chroma` and `--palette-hue-rotate-by`.

  - See the example: three panels that set the same `--palette-source`.
  > Fix
  - Fixed with the proposed wording: set it on `:root` or on an element with `.ui-palette`, anywhere else it has no effect, and the same goes for `--palette-hue`, `--palette-chroma` and `--palette-hue-rotate-by`. The `.ui-warning` snippet is introduced with "This is how the severity classes get their colors:" (`_theming.astro`).
- [x] (3) Progress and Range: no variant isn't the same as `variant="default"`. A Progress without a variant has a tonal track, and a Range without one uses `--field-border-color`, while `.ui-default` is `--surface-default`. Neither page says which look is the default (`progress.css:5,21-23`, `range.css:89-91,209`, `progress.astro:51-69`, `range.astro:113-129`)
  > Fix
  - Fixed: both Variants sections say what you get without a variant. Progress: a tonal track, same as `tonal` (`progress/api.ts` default `"tonal"`). Range: the track uses `--field-border-color`, like a text field border, and the `Surfaces` example shows it first.
- [x] (3) Prop vs class wording without `<Conditional>`: "Visible label" says to wrap the text in `.ui-label` on Astro/Vue pages too, though Checkbox and Switch render the slot in `.ui-label` themselves. Tabs variants and Scrollable show the prop and the class side by side on every framework (`checkbox.astro:58-63`, `switch.astro:72-77`, `tabs.astro:74-106`, `Checkbox.astro:55-57`)
  - Example:
    ```astro
    <Conditional as="p">
      <Fragment slot="astro">The default slot is the label.</Fragment>
      <Fragment slot="html"
        >Render the label text inside an element with a <code>.ui-label</code> class.</Fragment
      >
      <Fragment slot="vue">The default slot is the label.</Fragment>
    </Conditional>
    ```
  > Explain further
  - Every docs page renders once per framework, and `src/docs/components/AGENTS.md` §6 says prop vs class wording goes in a `<Conditional>`. Two places skip it:
    - Checkbox and Switch "Visible label" (`checkbox.astro`, `switch.astro`): "Render the label text inside an element with a `.ui-label` class" shows on Astro and Vue pages too, where it's wrong. The components already wrap the default slot in `<span class="ui-label">`, so following it nests `.ui-label` in `.ui-label`. On a required checkbox that shows two asterisks (checked in Chromium).
    - Tabs Filled, Line, Outlined and Scrollable (`tabs.astro`): "Use `variant="filled"` (`.ui-filled`)" shows both on every framework. On HTML pages `variant="filled"` reads like an attribute that would do something. On Astro and Vue pages the class is noise.
  - Options:
    - A: a `<Conditional>` per sentence. Three slots each, and the Astro and Vue ones are identical.
    - B (recommended for one-liners): a small inline helper that renders the prop on Astro/Vue and the class on HTML, so each sentence is written once:
      ```astro
      <p>
        Use <PropOrClass prop='variant="filled"' class=".ui-filled" /> to fill the
        selected tab with the primary color.
      </p>
      ```
  - "Visible label" differs per framework, so it needs a `<Conditional>`.
  > Fix
  > go through the library and check for instances where this can be applied.
  - Fixed: new `PropOrClass` helper (`src/components/PropOrClass.astro`). It renders `<code>` with the prop on Astro and Vue pages and the class on HTML pages, and is documented next to `<Conditional>` in `src/docs/components/AGENTS.md`.
  - Checkbox and Switch "Visible label" are a `<Conditional>`: "The default slot is the label." on Astro and Vue, the `.ui-label` sentence on HTML.
  - Applied across the docs, after a script stripped `<Conditional>`, code and example blocks from every component and guide page and flagged classes and prop names left in shared prose:
    - Tabs: Filled, Line, Outlined and Scrollable use `PropOrClass`. "To name the group" says `Tabs` instead of `.ui-tabs` on Astro and Vue.
    - Switch: the Basics paragraph and the Labels table cell (`.ui-sr-only`, `.ui-label` and `hideLabel` on every framework) are `<Conditional>`s, and the `aria-label` row uses `PropOrClass`.
    - Select: the End text fragment is "Use `endText` / `.ui-end-text` for supporting text below the select", per framework.
    - Carousel: see the Carousel item.
  - Left as is, since they apply to every framework: native attributes (`role`, `alt`, `command`, `disabled` on a fieldset), utility and typography classes, `.ui-card-link` and the Concepts page, which explains the mapping itself.
- [x] (3) Select: the Affix example lists "EUR" twice and uses a "¢" prefix. The `Dense`, `Grouped` and `Attributes` examples are never rendered, and the docs don't mention `dense` or option groups (`src/component-examples/select/Affix.html:10-11,15`, `Affix.{astro,vue}`, `src/component-examples/select/{Dense,Grouped,Attributes}.*`, `select.astro`)
  > Fix
  - Fixed: Affix lists EUR, SEK and USD with a "¤" prefix. New "Option groups" and "Dense" sections render `Grouped` and `Dense`. `Attributes` is deleted, since the API notes already say other attributes go to the `<select>`.
- [x] (3) Table: dense and spacious are never named in the prose, and the code tabs always show `Default`, whatever the toggle is set to. The `Dense` and `Spacious` examples aren't used (`table.astro:74-97`, `src/component-examples/table/{Dense,Spacious}.{astro,html,vue}`)
  - Fix: "Use `variant="dense"`/`"spacious"` (`.ui-dense`/`.ui-spacious`)", and render the two examples.
  > Fix
  - Fixed: the toggle is gone. Variants names `variant="dense"`/`"spacious"` (`.ui-dense`/`.ui-spacious`) and renders Default, Dense and Spacious, each with its own code (`table.astro`).
- [x] (3) Text field: File says "Use `aria-label` instead of the `<label>` element", but the File example uses a `<label>`. The `NoLabel` example is named only by its placeholder, right under "It's recommended to label your inputs somehow" (`text-field.astro:311-318,378-396`, `src/component-examples/text-field/File.html`, `NoLabel.{astro,html,vue}`)
  - Fix: drop the File sentence, and add `aria-label="Search"` to the `NoLabel` input.
  > Fix
  - Fixed: the File sentence is gone, and `NoLabel` has `aria-label="Search"` in every framework (`text-field.astro`, `NoLabel.{astro,html,vue}`).
- [x] (3) Toggle examples pass `checked` (falls through `...rest` to the input) instead of the `pressed` prop, and no example uses `pressed` (`toggle/Alignment.astro:18`, `Alignment.vue:20`, `Interactive.astro:6`, `Interactive.vue:7`, `Vertical.astro:22`, `Vertical.vue:24`, `ToggleButton/types.ts:3`)
  - Example: `<ToggleButton value="center" pressed aria-label="Align center">`
  > Fix
  - Fixed: `pressed` in `toggle/Alignment`, `Interactive` and `Vertical` (Astro, Vue). Same markup. The single-select prose says to set `pressed` (or `checked` on the input in HTML) on the button that starts pressed.
- [x] (3) Typography: Classless doesn't explain `.ui-not-rich-text`, which ends the rich text scope (`@scope (.ui-rich-text) to (.ui-not-rich-text)`). It also doesn't say that elements with a class (headings, lists, tables) keep their own styles (`typography.astro:183-192`, `typography.css:295,480-560`)
  - Example:
    ```html
    <article class="ui-rich-text">
      <h2>Styled</h2>
      <div class="ui-not-rich-text"><!-- not styled --></div>
    </article>
    ```
  > Fix
  - Fixed: Classless says headings, lists and tables with a class keep their own styles, components look the same inside rich text, and `.ui-not-rich-text` ends the rich text styles, with a code sample (`typography.astro`).
- [x] (4) Callout walkthrough: the icon is colored with `stroke`, which the library dropped. The demo icons are fill icons, so they keep the text color and get a severity-colored outline (`CalloutBuild.astro:105-107`, `callout.css:110-113`)
  - See the example: the info icon with `stroke` and with `color`.
  - Fix: `.callout > svg { color: var(--icon, currentColor); }`
  - The note "here four are inlined" should say seven (`CalloutBuild.astro:113`)
  > Fix
  - Fixed: `.callout > svg { color: var(--icon, currentColor); }`, with a note that fill and stroke icons both follow `currentColor`, and "four are inlined" says seven. Checked in Chromium: the demo icons are severity colored, with no outline (`CalloutBuild.astro`).
- [x] (4) List docs Gutterless and Borders only describe the HTML classes on the Astro and Vue pages too, not the `gutterless`, `bordered` and `borderTop` props (`list.astro:304-326`)
  > Fix
  - Fixed: Gutterless, "On every item" and "On one item" use a `Conditional`: `gutterless` and `bordered` on `List` and `borderTop` on `ListItem` for Astro/Vue, the classes for HTML.
- [x] (4) Drawer docs say the `header` slot includes a close button automatically, but only `DrawerHeader` renders one. `DrawerFooter` has no API table (`drawer.astro:61-63,96-98,32-35`)
  > Fix
  - Fixed: Astro/Vue text says to put a `DrawerHeader` in the `header` slot for a heading and a close button, and actions in the `footer` slot in a `DrawerFooter`.
  - Added `src/component-api/drawer-footer/api.ts` (root `.ui-footer`, default slot), shown as "Drawer footer API" on the drawer page and in the API index.
- [x] (4) Accordion docs: Actions says "in the header" with the `.ui-actions` class on every framework, but actions render after the content and Astro/Vue use an `actions` slot. "`name` prop" shows on the HTML page, and `.ui-card` is listed as a variant class (`accordion.astro:75,115,126-128`)
  > Fix
  - Fixed: Actions is a `Conditional`: the `actions` slot (Astro/Vue) or a `.ui-actions` element after `.ui-content` (HTML), placed below the content.
  - Mutually exclusive is a `Conditional`: same `name` prop (Astro/Vue), same `name` attribute on each `<details>` (HTML).
  - The HTML variant list is `.ui-outlined`, `.ui-elevated`, `.ui-tonal`; `.ui-card` is mentioned separately for the card styles.
- [x] (4) `.ui-link` isn't documented anywhere (`link.css`)
  > Explain further
  > what do you recommend? Don't feel like it deserves it's own docs page really.
  - Agree, it doesn't need its own page. It's a single class for links outside `.ui-rich-text`, where `a[href]` is already styled the same way. Recommendation: a "Link" `h3` in Typography's "Class-based" section, plus a row in "Inline text elements":
    ```html
    <p>Read the <a class="ui-link" href="/guide">guide</a> first.</p>
    ```
    Text: "Use `.ui-link` for links outside `.ui-rich-text`. Inside rich text, links get the same style without a class. Hover and focus change the color." (The hover color has a contrast issue, see the Link hover item.)
  - Also: add `.ui-link` to `src/component-api/typography/api.ts` (`Inline` values or its own `Link` group), and list `link.css` in the Typography installation tabs, since it's a separate file.
  > Fix
  - Fixed as recommended: a "Link" section in Typography's "Class-based" part with an example (HTML, Astro, Vue), a row in "Inline text elements", a `Link` group in the Typography API, and `link.css` in the installation tabs.
- [x] (4) CDN snippets aren't pinned to a major: use `opui-css@6` (`getting-started/HTML.astro:126`, `packages/opui/README.md:88`, `skills/opui/SKILL.md:15`, `skills/opui/references/html/getting-started.md:156`, `src/integrations/llms.mjs:40`)
  > Explain further
  - `https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css` has no version, so jsDelivr serves the `latest` dist-tag (unpkg too, through a redirect). jsDelivr itself says not to use unversioned URLs in production.
  - That's now 5.5.0. The moment 6.0.0 is published (it's what Unreleased is), every page using the snippet gets v6 without changing anything: the Accordion marker animation stops without `.ui-marker-rotate`, renamed private variables stop matching overrides, the Tabs restyle and so on. No error, just a different-looking site. The same happens at v7. jsDelivr also caches unversioned URLs for up to 7 days, so for a while different visitors can get different majors.
  - Before / after:
    ```html
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/opui-css@6/dist/opui.css"
    />
    ```
    `@6` resolves to the newest 6.x.y: fixes and features, no breaking changes. Users who want full control pin an exact version (`@6.0.0`), which can also take an SRI `integrity` hash.
  - Recommendation: `@6` in all five places when v6 ships (`getting-started/HTML.astro`, `packages/opui/README.md`, `skills/opui/SKILL.md`, `skills/opui/references/html/getting-started.md`, `src/integrations/llms.mjs`). Bump the number with each major, as part of the release checklist.
  > Fix
  - Fixed: `opui-css@6` in all five places. The HTML getting started explains `@6` and pinning an exact version.
- [x] (4) Dialog and Drawer: the `closedby` tables (three per page, six in all) are wrong. `any` also closes on Esc, and `none` still closes with `command="close"` or `close()`. Neither page gives the default: Dialog has none (the browser uses `closerequest` for modal, `none` for non-modal), and Drawer defaults to `any` (`dialog.astro:148-262`, `drawer.astro:135-250`, `Drawer.astro:10`, `Dialog.astro:7`)
  - Fix:
    ```
    any: click outside, Esc or the platform's close request (default for Drawer)
    closerequest: Esc or the platform's close request only (default for a modal Dialog)
    none: only your own close button (command="close") or close()
    ```
  > Fix
  > double check with mdn first what's really true.
  - Fixed: one shared `ClosedbyTable.astro` replaces the six tables (`dialog.astro`, `drawer.astro`). `any`: click outside, Esc or the platform's close request, and your own close button. `closerequest`: Esc or the close request, and your own button. `none`: only `command="close"`, `close()` or `<form method="dialog">`. Drawer marks `any` as its default. Dialog says the browser picks `closerequest` for a modal dialog and `none` for a non-modal one.
  - Checked against MDN (`HTMLDialogElement.closedBy`): "`any`: … light dismiss user action, a platform-specific user action, or a developer-specified mechanism. `closerequest`: … a platform-specific user action or a developer-specified mechanism. `none`: … only … a developer-specified mechanism." Without the attribute: "opened with `showModal()`, it behaves as if `closedby="closerequest"` … opened by any other means … `closedby="none"`".
- [x] (4) No Migrating to v6 page on the docs site. MIGRATING.md only lives in the package, and Home doesn't link one (`src/docs/guide/`, `src/docs/Home.astro`, `packages/opui/MIGRATING.md`)
  > Fix
  > write a migration note for each component, plus the theme and whatever else.
  - Fixed: the v5→v6 section of MIGRATING.md has one section per component (A–Z), then Theme and tokens, Typography and rich text, and Package and imports, covering every Breaking, Removed and Changed entry in the CHANGELOG. The new Migrating to v6 page renders that section from MIGRATING.md (single source), and Home and the guide nav link it.
- [x] (4) Rhythm walkthrough: `--flow-space: 1.25em` isn't registered or rounded. Unregistered, the `em` resolves against each heading's own font size, so heading margins grow with the heading and the text after an h2 drifts off the grid, contradicting "One flow space derived from the body text". The library registers `--_flow-space` with `@property` and rounds it to `--rhythm-step`, and the learn post says it does (`RhythmBuild.astro:43-55,86`, `typography.css:288-297`, `vertical-rhythm-round.astro:35,49`)
  - See the example: the same text with both versions. The red block edges sit on the green grid lines only in the second.
  ```css
  @property --flow-space {
    inherits: true;
    initial-value: 0px;
    syntax: "<length>";
  }

  .prose {
    --flow-space: round(1.25em, var(--rhythm-step));
  }
  ```
  - Also: the h2 margins use the h4–h6 ratios (1.5 and 0.5, the real h2 is 3 and 0.75 rounded), and "One rule for every heading level" sits on a `.prose h2` selector (`RhythmBuild.astro:19,26,52`, `typography.css:443-448,508-509,534-535`)
  > Fix
  - Fixed: the Flow space step registers `--flow-space` with `@property` (`<length>`, inherits, `0px`) and sets `round(1.25em, var(--rhythm-step))`, like the library. The h2 margins use the real ratios, `calc(var(--flow-space) * 3)` and `round(var(--flow-space) * 0.75, var(--rhythm-step))`. "Snap line height" targets `.prose :is(h1, h2, h3, h4, h5, h6)`, so "One rule for every heading level" is true now. The body line height is snapped with `round(up, 1.6em, var(--rhythm-step))`, as the library does, since the 28px line drifted off the grid at some knob steps. The learn post snippet has the `@property` block and a bullet on why (`RhythmBuild.astro`, `vertical-rhythm-round.astro`).
  - The `@property` rule can't take effect nested in the gated step CSS, so the page registers it in a global style, like `RangeBuild`.
  - Checked in Chromium with seven font size and step pairs: every p, h2, p edge lands on a multiple of `--rhythm-step`, and the h2 resolves `--flow-space` to the same length as the body text.
- [x] (5) Hand-written API tables left: Spinner, Text input, Toast, Typography
  > They're probably unique and that's why but if they can be not hand written then make it so (if the solution is elegant and scalable).
  - Done for Spinner, Text input and Typography: they're `api.ts` files now. `source` is optional for CSS-only components, which show the HTML tables in every framework plus a note (for example "no Astro component"). Their CSS variables tables come from `css`.
  - Toast stays hand-written, since toasts are on hold. It fits the same model later: `[data-severity]` and `[data-duration]` as attribute options.
- [x] (5) ButtonGroup installation tabs miss the `button.css` dependency (`button-group.astro:41-43`)
  > Fix
  - Fixed: `button.css` tab with `isDependency: true`, like Menu's `list.css`.
- [x] (5) IconButton size mapping is wrong in CHANGELOG and MIGRATING. The old default was 28px (`--size-6`), which is `x-small`, not `small` (32px). The old `small` was 20px (`--size-4`) and has no preset. Icons shrink from 24px to about 17px (`CHANGELOG.md:36`, `MIGRATING.md:3,7,12`, `packages/opui/css/components/button.css:204`)
  - Example:
    ```diff
    - <IconButton aria-label="Edit">
    + <Button ripple rounded size="x-small" aria-label="Edit" style="--_icon-size: var(--size-5)">
    ```
  > Fix
  - Fixed: CHANGELOG (Removed) and MIGRATING say the old default (28px) is `size="x-small"`, the old `small` (20px) has no preset (`x-small` with `--_min-height: var(--size-4)`), `--_icon-size: var(--size-5)` gives the old 24px icon, and the icon color is the accent instead of the inherited text color.
- [] (5) Tooltip walkthrough: the Arrow step is the arrow from before c393948. It sits at a fixed spot and the step swaps the fallbacks for flips only ("A shifted tooltip would point the arrow at nothing"). After `flip-block` the demo arrow points away from the trigger. The library keeps the shift fallbacks, makes the tooltip its own anchor and places the arrow with `clamp(anchor(--ui-tooltip left), anchor(--anchor center), anchor(--ui-tooltip right))` (`TooltipBuild.astro:80-103`, `tooltip.css:50-81`)
  - See the example: the walkthrough arrow and the library arrow, both flipped below the trigger, plus a shifted one.
  - No step shows the fade in and out (`opacity` with `@starting-style` and `allow-discrete`) (`tooltip.css:83-98`)
- [x] (6) CHANGELOG Unreleased leaves out breaking changes or files them outside Breaking. Missing: `.ui-icon-only` removed, Astro/Vue `Button` no longer adds `.ui-disabled`, Anchor/Tooltip hover `interestfor` wrapper removed. Filed elsewhere: Tabs restyle with `--_accent-color`/`--_bg-color` removed and new panel margin (Changed), Button padding scale and direct-child `> svg` icon sizing (Added), class-less rich text headings and heading sizes (Changed), `--focus-ring-color` unset (Fixed) (`CHANGELOG.md:7-14,25,31,65,67,74,106`)
  > Fix
  - Fixed, checked against 5.5.0 (`aeadad7d`): added to Breaking `.ui-icon-only` removed (it was in 5.5.0 `button.css`), Astro/Vue `Button` no longer adding `.ui-disabled` and the Anchor/Tooltip `<span interestfor>` wrapper removed (`318694ee`).
  - Moved to Breaking: Tabs restyle (now also naming the removed `--_accent-color`/`--_bg-color`, their replacements and the new `--size-2` panel margin), the Button padding scale and direct-child `> svg` sizing (with old and new padding values), class-less rich text headings, heading sizes, and `--focus-ring-color` no longer set by `theme.css`.
- [x] (6) Accordion API table shows `.ui-marker-rotate` as the default on the HTML page, but in HTML no marker class means no animation (`src/component-api/accordion/api.ts:22`, `src/component-api/rows.ts:34-43`)
  > Fix
  - Fixed: `ApiOption` takes `htmlDefault` (`null` = no default in HTML), read by `htmlDefault()` in `rows.ts`. The accordion `markerAnimation` option sets `htmlDefault: null`, so the HTML Marker row shows `-` while Astro/Vue keep `"rotate"`.
- [x] (6) Getting started "Install manually": `open-props.css` imports the bare `open-props/src/index.css`, which a browser can't resolve without a bundler, so a manual setup without a build step gets no Open Props tokens (`getting-started/HTML.astro:41-76`, `packages/opui/open-props.css:5-6`)
  - Example: point manual users at the pre-bundled tokens instead (already in the `openprops` layer).
    ```css
    @import "./css/layers.css";
    @import "./op.css"; /* dist/op.css */
    ```
  > Fix
  - Fixed: the file tree and imports use `op.css` (Open Props pre-bundled in the `openprops` layer, from jsDelivr `opui-css@6/dist/op.css` or `dist/` in the package), and the page says `open-props.css` needs a bundler. Plain browser `@import`s work now.
- [x] (7) MIGRATING v5→v6 still misses: Accordion marker class (`.ui-marker-rotate`), the default chevron in Astro/Vue (doubles custom chevrons), Checkbox/Chip/Radio private variable renames, List `divided` → `bordered`, Tabs restyle, Anchor/Tooltip `interestfor` wrapper, `.ui-icon-only` removed, class-less rich text headings and sizes, the new `components.prose` layer, `--focus-ring-color`. "see the v4 → v5 section at the top of this file" is stale, that section isn't at the top (`MIGRATING.md:1-38,157`)
  > Fix
  - Fixed: added, each with a diff or table: `.ui-icon-only` removed, direct-child `svg` and padding, Astro/Vue `Button` without `.ui-disabled`, Accordion marker class, the default chevron (move it to the `marker` slot), Checkbox/Chip/Radio private variable renames, List `divided` → `bordered`, the Tabs restyle, the Anchor/Tooltip `interestfor`, class-less rich text headings and sizes, the `components.prose` layer and `--focus-ring-color`. Each was checked against the code.
  - The stale reference now links to [Migrating from v4 to v5](#migrating-from-v4-to-v5) "above".
- [x] (8) Changelog: `divided` removed from `List`, use `bordered` (#395). Removed after 5.5.0 and missing from Unreleased

## Limitations

- [x] (3) Carousel: vertical orientation
  - Added `.ui-vertical` / `orientation="vertical"`. It scrolls and snaps on the block axis, needs a height (`--_block-size`, default `24rem`), and supports buttons (`::scroll-button(block-start/end)`, rotated icons, also outside), markers and peek. Markers sit in a column at the inline end of the items, centered (anchored to the carousel, so they follow RTL). Docs section and example added.
  - Scroll and snap are checked in Chromium 141. The button positions aren't: Carousel buttons need Chromium 144+. Check them in the docs.

## Questions

- [x] (1) Comments: keep or remove the leftover TODO and stale comments? They're the toggle-button TODO (`toggle-button.css:1-3`), the select checkmark TODO with "psuedo" (`select.css:98`), the tabs mixin TODO (`tabs.css:32`), the commented-out toast cap (`toast.css:26-28`) and the "`.select` class" note, which means `.ui-select` now (`select.css:126`)
  > keep the ones that aren't stale/fixed already. outdated comments can also be removed.
  - Fixed: removed the stale toggle-button TODO (ToggleGroup has `.ui-scrollable`, `.ui-shrink` and wrapping now) and the commented-out toast cap (old `.toast` selector). Kept the select checkmark TODO (`::checkmark` isn't everywhere yet) with "pseudo" spelled right, and the tabs mixin TODO (no CSS mixins yet). The select note says `.ui-select`.
- [x] (1) Select: `select:has(button), ::picker(select) { appearance: base-select }` is the only unscoped rule in `select.css`. It opts every customizable `<select>` on the page into `base-select`, with or without `.ui-select`. Is that intended? (`select.css:181-184`)
  > no, fix that.
  - Fixed: `:where(.ui-select select:has(button))` and its `::picker(select)`. A bare `<select>` with a button stays `appearance: auto`.
- [x] (3) Section comments I added in `carousel.css` and `menu.css` (e.g. `/* Buttons */`): keep or remove per the no-new-comments rule?
  > keep. the comments I don't want are explainers. Headings like /* Buttons */ that make it easier to read the code are ok.
- [x] (4) Naming: `variant="default"` on List and Range isn't the default. No variant gives `--surface-filled`, `default` gives `--surface-default`. Divider maps `variant` to `.ui-border-*`, every other component to `.ui-<variant>` (`List/types.ts:5`, `Range/types.ts:10`, `list.css:10,32-34`, `range.css:85-95`, `Divider.astro:6`, `Divider.vue:6`, `divider.css:12-22`)
  - Example: name the value after the surface, and drop the `border-` prefix
    ```html
    <ul class="ui-list ui-surface">
      …
    </ul>
    <hr class="ui-divider ui-tonal" />
    ```
  > Fix
  - Fixed: the `default` variant is `surface` (`.ui-surface`, `--surface-default`) on List, Range and Progress, with no alias (`List/types.ts`, `Range/types.ts`, `Progress/types.ts`, `list.css`, `range.css`, `progress.css`, `theme.css`).
  > Surface instead of variant: it goes contrary to the rest of the library, correct?
  - Yes: no other component uses `surface` as a variant value, and Card and Accordion get the page background with no variant. Decision: drop the page surface option. List takes `tonal` and `transparent` (filled without a variant), Progress `filled` and `tonal` (tonal without one), Range `filled` and `tonal` (field border without one). A page-colored list on the page looks like `transparent`, and a page-colored track was invisible there anyway. `.ui-default`/`.ui-surface` styles are gone from `list.css`, `progress.css`, `range.css` and `theme.css`, and CHANGELOG, MIGRATING and What's new say what to use instead.
  - Divider renders `.ui-filled`, `.ui-primary` and `.ui-tonal` instead of `.ui-border-*`, also in its `--contrast: more` block. The `variant` values are unchanged (`Divider.astro`, `Divider.vue`, `divider.css`).
  - Types, `api.ts`, examples, docs, stress pages, `ComponentShowcase.astro` and the `filled-borders` todo example use the new names. Nothing in the library styles `.ui-surface`, `.ui-filled`, `.ui-primary` or `.ui-tonal` on its own, so none of them reaches `hr.ui-divider`.
  - CHANGELOG (Breaking), MIGRATING and What's new list the renames.
- [x] (4) Private custom properties and footer parts aren't named the same across components. Settle before 6.0 if `--_` properties are public API (`_theming.astro:105-115` already documents `--_motion`)
  - Accent: `--_accent` (button, checkbox, radio) vs `--_accent-color` (progress, switch, text-field), and Button also has `--_color` as the accent (`button.css:4,8`)
  - Background: `--_bg-color` vs `--_card-bg-color` (card), `--_tooltip-bg` (tooltip), `--_button-bg-color` (carousel, toggle-button)
  - Footer: `.ui-footer` (drawer) vs `.ui-actions` (accordion, card, dialog)
  - Motion: `--_transition` (accordion), `--_transition-time`/`-tf` (`switch.css:17-18`), `--_transition-duration` (drawer, menu), `--_anim-enter`/`-exit` (`toast.css:33-34`)
  - Size: `--_size` (badge, toggle), `--_input-size` (checkbox, radio, list), `--_width` (avatar), `--_height` (text-field), `--_min-height` (button)
  - Text: `--_text-color` (badge, button, button-group, tabs) vs `--_color` (avatar, callout, chip, drawer)
  - Example: one scheme
    ```css
    --_accent: …; /* was --_accent-color, Button --_color */
    --_bg-color: …; /* was --_card-bg-color, --_tooltip-bg, --_button-bg-color */
    --_duration: …; /* was --_transition-time, --_transition-duration, --_anim-* */
    --_ease: …; /* was --_transition-tf */
    --_text-color: …; /* was --_color */
    ```
  > Fix
  - Fixed: one scheme for `--_` properties. Accent is `--_accent` (Button builds it directly, no `--_color`), text is `--_text-color`, the component's own background is `--_bg-color`, and a sub-part keeps a prefix in the same pattern (`--_thumb-bg-color`, Carousel `--_button-bg-color`, `--_hover-bg-color`). Motion is `--_duration`/`--_ease` (Toast: `--_enter-duration`, `--_hold-duration`, `--_exit-duration`). Avatar uses `--_size`, and TextField, Textarea and Select use `--_min-height` like Button. Card, Tooltip, Table and Badge drop their component prefix. The full old → new table is in MIGRATING (Theme and tokens).
  - Footer parts: no rename. `.ui-footer` is a region at the bottom of a component (Drawer, and the TextField/Select/Textarea row with start and end text). `.ui-actions` is a row of buttons (Accordion, Card, Dialog). A Drawer can hold `.ui-actions` inside its `.ui-footer`, so both stay.
- [x] (5) Field variant props: TextField and Textarea take a boolean `filled`, Select and ClassicSelect take `variant="outlined" | "filled"` (`TextField/types.ts:6`, `Textarea/types.ts:6`, `Select/types.ts:10`, `ClassicSelect/types.ts:13`)
  - Example: one shape for every field, with `filled` kept as a deprecated alias until 7.0
    ```astro
    <TextField variant="filled" label="Name" />
    <Select variant="filled" label="Fruit" items={items} />
    ```
  - Size scales also differ: Switch has `small`, Checkbox and Radio have `small | large`, fields have `x-small | small | large` (`Switch/types.ts:4`, `Checkbox/types.ts:5`, `Radio/types.ts:4`). Confirm that's intended.
  > Fix
  > regarding size scales: create a new todo with examples on the inputs. fix the rest.
  - Fixed: TextField and Textarea take `variant?: "outlined" | "filled"` (default outlined), like Select (`TextField.astro`, `TextField.vue`, `Textarea.astro`, `Textarea.vue`, `types.ts`). The API tables have a `variant` row, and examples use `variant="filled"`.
  > Just remove the bool for filled, let’s not wait for 7.0
  - Fixed: the boolean `filled` is gone, no alias. CHANGELOG (Breaking), MIGRATING and What's new say so.
  - Size scales: new item under Suggestions ("Sizes: control size scales differ").

## Suggestions

- [x] (1) Stale types: `ToggleContext` is only re-exported, never used (`ToggleGroup/types.ts:14-17`, `types.svelte.ts:9`), `startText` slot is never rendered (`TextField/types.ts:20`, `Textarea/types.ts:19`), `headline`/`description` slots aren't rendered but show up in the Vue/Svelte/Solid slot types (`ListItem/types.ts:27,29`), Menu `Slots` is unused (`Menu/types.ts:20-22`). Unsorted destructuring in `Select.astro:7-20`, `Textarea.astro:7-24`, `TextField.astro:7-28`
  > Fix
  - Fixed: removed `ToggleContext` (`ToggleGroup/types.ts`, `types.svelte.ts`), the `startText` slot type (`TextField/types.ts`, `Textarea/types.ts`; the `startText` prop stays), the `headline`/`description` slots (`ListItem/types.ts`) and Menu `Slots`. Sorted the destructuring in `Select.astro`, `Textarea.astro` and `TextField.astro`.
- [x] (1) Tarball ships the internal `components/AGENTS.md` (`files` includes `components`, `packages/opui/package.json:36-49`)
  > Fix
  - Fixed: `"!components/AGENTS.md"` in `files`. Checked with `npm pack --dry-run` and `pnpm pack --dry-run`: it's no longer listed.
- [x] (1) Colors: the ripple color `oklch(0.6 0 0 / 0.2)` is copied in two places, and Carousel buttons define their own inverse surface `light-dark(var(--gray-13), var(--gray-3))` instead of `--surface-inverse` (`button.css:293`, `core/utils.css:76`, `carousel.css:5`, `theme.css:91`)
  > Fix
  - Fixed: `--ripple-color` theme token (`theme.css`, State), read by Button's `.ui-ripple` and the Checkbox/Radio halo. Carousel buttons use `--surface-inverse`, and the derived border colors still work.
- [x] (1) Dead CSS: `.ui-form:has(.ui-text-field.ui-row)`. No component or example puts `.ui-row` on a text field (`form.css:55-57`)
  > Explain further and provide an example
  - The rule is actually `.ui-fieldset:has(.ui-text-field.ui-row)` (nested in `:where(.ui-fieldset)`, `form.css:55-57`).
  - History: it came with the v4 rewrite (`67a0a49`) as `&:has(.text-field.row)`. `text-field.css` never had a `.row` modifier (the side-by-side layout was `.spread`, now `.ui-spread`), and v3 didn't either, so it has been dead since it was written.
  - Nothing produces it: TextField emits `ui-text-field`, size, `ui-auto-fit`, `ui-filled` and `ui-spread`. `.ui-row` only exists on `.ui-field-group` (`direction="row"`). A hand-written `class="ui-row"` on a text field doesn't change the field, it only bumps the fieldset's `row-gap` from 4px to 32px.
  - Recommendation: delete the three lines. No example uses it, so no snapshot changes.
  - See the example: the same fieldset with and without `.ui-row` on the text field.
  > Fix
  - Fixed: the rule is deleted (`form.css`). No example used it, so no snapshot changed.
- [x] (1) Docs site: `base.css` puts private `--_gap`, `--_page-gutters` and `--_content-*` on `:root`, and `.container` reuses `.ui-small`, `.ui-large` and `.ui-text` (the Card text variant) for widths (`src/styles/base.css:63-77,89-102`)
  - Nothing breaks today, since only Callout and Carousel read `--_gap` and both set it. Use site-prefixed names, for example `--site-gap` and `.container.is-narrow`.
  > Fix
  - Fixed: `--site-gap`, `--site-page-gutters` and `--site-content-*`, and `.container.is-narrow`, `.is-wide`, `.is-text`, `.is-start` and `.is-end` (`base.css`, `Document.astro`, `Header.astro`, `Footer.astro`, `LocalNav.astro`, `Home.astro`). Callout and Carousel no longer inherit a site `--_gap`.
- [x] (1) Motion: `transition: all` on the accordion and the switch dot, and the toast keyframes aren't prefixed (`toast-enter`, `toast-hold`, `toast-exit`), while the others are `ui-spin`, `ui-indeterminate` and `ui-range-fill` (`accordion.css:28`, `switch.css:99`, `toast.css:134,146,156`)
  - Example:
    ```css
    transition:
      inset-inline-start var(--_transition-time) var(--_transition-tf),
      outline-width var(--_transition-time) var(--_transition-tf);
    ```
  > Fix
  - Fixed: Accordion and the Switch dot list their transitioned properties. Toast keyframes are `ui-toast-enter`, `ui-toast-hold` and `ui-toast-exit`, and `toast.js` checks `ui-toast-exit`.
- [x] (1) Root `package.json` (`open-props-ui-docs`) has no `"private": true`, so a stray `pnpm publish` at the root would publish the docs site (`package.json:1-5`)
  > Fix
  - Fixed: `"private": true`.
- [x] (1) ToggleGroup is in `components.root` but styles `.ui-toggle-button`, while ButtonGroup (styles `.ui-button`) is `components.extended`. Move it to extended to match the "built on top of others" rule (`toggle-group.css:1,39-47`, `button-group.css:1`, `components.css:28`)
  > Fix
  - Fixed: `toggle-group.css` is in `components.extended`, and its import moved to the extended group in `components.css`. Rendering is unchanged.
- [x] (2) `text-box: trim-both cap alphabetic` on Button/Chip/Badge only works if the label is wrapped in its own element (flex/grid containers ignore it)
  > is that a problem? explain more and show examples here in the todo page.
  - `text-box` trims the space above the cap height and below the baseline of a block's first and last line, so text is centered on its letters instead of its line box. It looks optically centered no matter the font's ascender and descender metrics.
  - Why a wrapper is needed: `text-box-trim` isn't inherited and applies to block containers. In `<button class="ui-button">Save</button>` the text sits in an anonymous flex item that we can't select, so this does nothing:
    ```css
    .ui-button {
      text-box: trim-both cap alphabetic; /* no effect: the label is anonymous */
    }
    ```
    It only works on a wrapper:
    ```html
    <button class="ui-button"><span>Save</span></button>
    ```
    ```css
    .ui-button > span {
      text-box: trim-both cap alphabetic;
    }
    ```
  - Not a real problem today. Buttons, chips and badges are centered with `align-items: center` and a fixed height, so the difference is a pixel or so with most fonts. It would matter with fonts that have unusual metrics, or if we wanted padding-based sizing without a fixed height.
  - Requiring a wrapper would break bare-text buttons, and applying it only when a wrapper exists makes wrapped and unwrapped buttons look slightly different. Recommendation: leave it. Revisit if `text-box` starts applying to anonymous flex items, or if Button gets a required label part.
  > don't use text-box-trim just yet them, remove it.
  - Removed: no `text-box` is left in `packages/opui/css`. Button, Chip and Badge never had it. Checkbox, Radio and Switch labels used `text-box: trim-start cap alphabetic` (with a `1cap` offset) in an `@supports` block, plus `text-box: inherit`/`normal` on the required asterisk and stacked labels. They now use the `1lh`-based offset that other browsers already used. Checked in Chromium (`forms` ChoicesAndFields): labels stay centered on the controls.
  - Deleted the todo example `text-box-trim.html`.
- [x] (2) Anchor sets `--_anchor-inset`, which no CSS reads (`Anchor.astro:19-30`, `Anchor.vue:12-23`, also `src/component-examples/badge/Alignment.html:5,45,66`)
  > Explain further and provide an example
  - `Anchor.astro`/`Anchor.vue` map `alignment` to an inset string and write both variables inline:
    ```html
    <span
      class="ui-anchor"
      style="--anchor-position-area: end end; --_anchor-inset: 100% auto auto 100%;"
    ></span>
    ```
    `anchor.css` reads `--anchor-position-area` (in `position-area`) and `--_anchor-tx`/`--_anchor-ty`, but nothing reads `--_anchor-inset` (`grep` over `packages/opui/css` finds no use). It looks like a leftover from an inset-based fallback. Badges now do that with their own `--_badge-inset-block`/`--_badge-inset-inline`, set by `.ui-start-start` etc.
  - Proof: on the Badge Alignment example and a plain anchor, removing `--_anchor-inset` leaves every floating element at the same pixel position. For badges, `--anchor-position-area` is inert too: `badge.css` sets `position-area: none` on the floating part, and the alignment comes from the class.
  - Why remove it: it's dead output in every aligned Anchor/Badge, it puts a private `--_` variable into public markup, and the HTML Badge example teaches users to copy both lines.
  - Fix: delete `insetMap` and the `"--_anchor-inset"` entry in both components. In `src/component-examples/badge/Alignment.html` keep only the class (`class="ui-anchor ui-badge ui-end-end"`, no `style`). This changes the Badge/Anchor parity snapshots (intended).
  > Fix
  - Fixed: `insetMap` and `--_anchor-inset` are gone from `Anchor.astro`/`Anchor.vue`. Badge no longer passes `alignment` to Anchor, since `--anchor-position-area` is inert on badges (`position-area: none`), so aligned badges render no `style`. `badge/Alignment.html` keeps only the class, and the Badge API drops the `--anchor-position-area` note. Parity snapshots updated (intended).
- [x] (2) Vue cleanups: Avatar `class` typed as `string` instead of `HTMLAttributes["class"]` (`Avatar/types.d.vue.ts:7`). FieldSet, FieldLegend, FieldDescription, FieldGroup and Form bind `$attrs` without `inheritAttrs: false`, so attrs and listeners are applied twice (`FieldSet.vue:14`, `FieldLegend.vue:14`, `FieldDescription.vue:9`, `FieldGroup.vue:20`, `Form.vue:11`)
  > Fix
  - Fixed: Avatar `class` is `HTMLAttributes["class"]` (`Avatar/types.d.vue.ts`). FieldSet, FieldLegend, FieldDescription, FieldGroup and Form set `inheritAttrs: false`, so `$attrs` is applied once.
- [x] (2) dist source maps embed `sourcesContent` and `node_modules/.pnpm` paths, a large share of the unpacked size (`packages/opui/scripts/build.mjs:31-35`)
  > Fix
  - Fixed in `scripts/build.mjs`: `sourcesContent: false`, and `node_modules/.pnpm/…/node_modules/open-props/…` sources are rewritten to `../../open-props/…`, which resolves next to `opui-css` in an installed `node_modules`. `opui.components.css.map` also gets a leading `;` so its mappings account for the prepended `@layer` line.
  - Maps went from 285/212/50 kB to 64/48/11 kB (`opui.css`/`opui.components.css`/`op.css`). `dist/` is gitignored.
- [x] (2) Orphans: `src/component-examples/TextFieldInputTypes.vue`, `ToggleGroupInteractive.{astro,vue}` and `definition-list/Anatomy.vue` aren't used by any docs page (only parity snapshots), and the `../pages/components/*.astro` glob matches nothing (`src/utils/components.ts:7,12-18`)
  > Fix
  - Fixed: deleted the four examples and their snapshots (`TextFieldInputTypes.html`, `ToggleGroupInteractive.html`, `definition-list/Anatomy.html`). There were no `.diff` files for them, and nothing else imports them. The dead `../pages/components/*.astro` glob and its loop are gone from `src/utils/components.ts`.
- [x] (2) Dead CSS: `@supports (-moz-appearance: none)` in `link.css:17-19` sets the same `2px` as the base rule, and `margin-block-end: 0` on the last option repeats the list's `margin: 0` (`select.css:95-97`)
  > Fix
  - Fixed: removed the `@supports (-moz-appearance: none)` block from `link.css` and the `margin-block-end: 0` on the last grouped option from `select.css`.
- [x] (2) Hover: many `:hover` rules aren't wrapped in `@media (hover: hover)`, so hover states stick after a tap on touch screens. Button, ButtonGroup and ToggleButton already wrap theirs (`callout.css:97`, `chip.css:47,99`, `link.css:11`, `list.css:184,217`, `range.css:331`, `table.css:15`, `text-field.css:269,368`, `toast.css:62,108`, `core/utils.css:65`)
  - Fix:
    ```css
    @media (hover: hover) {
      &:hover { … }
    }
    ```
  > Fix
  - Fixed: wrapped in `@media (hover: hover)` in `callout.css`, `chip.css`, `link.css`, `list.css`, `range.css`, `table.css`, `text-field.css`, `toast.css` and `core/utils.css`, plus the Menu disabled-hover override and rich text links. `:focus-visible` rules were split out so they still apply. The Chip ripple needs hover, so it no longer plays on touch.
- [x] (2) Menu: disabled items only match `[disabled]` and `[aria-disabled="true"]`, not `.ui-disabled`, which Button, Chip, ButtonGroup and ToggleButton all accept (`menu.css:135`)
  - Fix: `li > :is(a, button):is([disabled], [aria-disabled="true"], .ui-disabled)`
  > Explain further and provide an example
  > where is there a great need for .ui-disabled? I don't want to have it everywhere just to make it consistent. I want to have it only where it makes sense to have an alternative to the other ones.
  - Short answer: almost nowhere. `.ui-disabled` only changes the look, it doesn't disable anything. Checked in Chromium (accessibility tree and real clicks):

    | Markup                                    | Clicks                                     | Focusable | Announced   |
    | ----------------------------------------- | ------------------------------------------ | --------- | ----------- |
    | `<button disabled>`                       | blocked                                    | no        | unavailable |
    | `<button aria-disabled="true">`           | go through (your script ignores them)      | yes       | unavailable |
    | `<button class="ui-disabled">`            | go through                                 | yes       | available   |
    | `<a aria-disabled="true">`                | blocked by `pointer-events`, Enter follows | yes       | unavailable |
    | `<a class="ui-disabled">`                 | blocked by `pointer-events`, Enter follows | yes       | available   |
    | ToggleButton with `<input disabled>`      | blocked                                    | no        | unavailable |
    | ToggleButton with `.ui-disabled` on label | still toggles                              | yes       | available   |

  - Per component:
    - Button and ButtonGroup items: `disabled` on buttons and `aria-disabled="true"` on links, both already styled. `.ui-disabled` adds something that looks disabled, works, and is announced as available. Drop it (Astro/Vue Button already stopped emitting it).
    - ToggleButton: the input takes `disabled`, styled through `:has(input:disabled)`. Astro/Vue still add a redundant `.ui-disabled` to the label. Drop it.
    - Chip: the one real case. A static `div.ui-chip` (Chip's default element) can't take `disabled`, and ARIA 1.2 only allows `aria-disabled` on interactive roles. So a dimmed, inactive tag ("Archived") needs a class. That's a look, not a state.
    - Checkbox/Radio halo (`core/utils.css`): checks `.ui-disabled` on the input, which takes `disabled`. Drop it.
    - Menu: items are `<a>` and `<button>`, already matched by `[disabled]` and `[aria-disabled="true"]`. Don't add it.
  - Recommendation: keep `.ui-disabled` only on Chip, documented as "dims a static chip", drop it everywhere else, and close this item as won't do. That's breaking for HTML users with `.ui-disabled` on buttons, group items or toggle buttons (MIGRATING: `disabled` on buttons and inputs, `aria-disabled="true"` on links). If you'd rather keep it everywhere, say in the docs that it only changes the look and pair it with `aria-disabled="true"`.
  - See the example: every row of the table, with live click counters.
  > Fix
  > I want to have .ui-disabled only where it makes sense to have an alternative to the other ones.
  - Fixed as recommended: `.ui-disabled` stays only on Chip, where a static `div.ui-chip` can't take `disabled`. The Chip docs and API call it a look for static chips. Menu doesn't get it.
  - Dropped from `button.css`, `button-group.css`, `toggle-button.css` and the Checkbox/Radio halo. `ToggleButton.astro`/`.vue` no longer add it, and a disabled toggle still looks disabled through `:has(input:disabled)` (checked in Chromium). Button docs no longer mention it, and the Toggle API says `[disabled]` on the input (`toggle-button/api.ts`, `chip/api.ts`, `button.astro`, `chip.astro`, `src/stress-tests/forms.html`).
  - CHANGELOG: in 5.5.0 only ToggleButton styled `.ui-disabled`, so Button and ButtonGroup support is just taken out of Added. ToggleButton is under Breaking, with a MIGRATING note.
- [x] (2) Radio has no `.ui-spread` layout or `spread` prop, while Checkbox and Switch have both (`radio.css`, `checkbox.css:72-95`, `switch.css:212-243`, `Checkbox/types.ts:6`, `Switch/types.ts:5`)
  > Explain further and provide an example
  - Checkbox (`checkbox.css`) and Switch (`switch.css`) have `.ui-spread` and a `spread` prop: label at the start, control at the end, end text under the label, full width. Radio has neither, and `class="ui-spread"` does nothing.
  - Where it shows: settings-style cards that mix controls. Next to spread Switch and Checkbox rows, a radio group can't line up, and its radios sit on the other side.
  - Fix: copy the Checkbox block into `radio.css` (the grids match), add `spread?: boolean` to `Radio/types.ts`, emit `ui-spread` in `Radio.astro`/`Radio.vue`, add the `api.ts` option, and a Spread example and section like Checkbox's. The label offset works unchanged.
    ```css
    &.ui-spread {
      align-items: start;
      column-gap: var(--size-4);
      grid-auto-flow: unset;
      grid-template-columns: 1fr auto;
      inline-size: 100%;

      .ui-label {
        font-weight: var(--field-label-font-weight);
        grid-column: 1;
        grid-row: 1;
        inline-size: fit-content;
      }

      input {
        grid-column: 2;
        grid-row: 1;
      }

      :where(.ui-end-text) {
        grid-column: 1;
        grid-row: 2;
      }
    }
    ```
  - See the example: a settings card with spread Switch and Checkbox rows and a radio group, current vs proposed.
  > Fix
  - Fixed: Radio takes `spread` (`.ui-spread`): the layout block from Checkbox in `radio.css`, `spread?: boolean` in `Radio/types.ts`, `ui-spread` in `Radio.astro`/`Radio.vue`, the `api.ts` option, a `Spread` example (three spread radios with end text, one disabled) and a Spread section after Direction (`radio.astro`), plus its parity snapshot.
  - Checked in Chromium: a spread radio fills its container with the label at the start, the radio at the end and the end text under the label, and lines up with a spread Checkbox in LTR and RTL.
- [x] (2) Unused examples: no docs page shows them, only the `/<framework>/test/<component>` fixtures and parity snapshots (`src/component-examples/`: `button/{Filled,Outlined,Text,Tonal}`, `dialog/Anatomy`, `drawer/Blurred`, `list/Dense`, `text-field/Attributes`, `textarea/Attributes`, `toggle/Default`, `typography/HeadingGroup`). Select and Table leftovers are in their own Docs items
  - `list.astro:12-14` imports the root `ListDense`/`ListAll` instead of `list/Dense`, so the List examples live in two places.
  - Delete them (or show them) and update the parity snapshots as an intended change.
  > Fix
  - Deleted, since another example already shows the same thing: `button/{Filled,Outlined,Text,Tonal}` (`button/Variants`), `dialog/Anatomy` (an unstyled stub), `drawer/Blurred` (blurred is the default backdrop, `drawer/Usage`), `text-field/Attributes` and `textarea/Attributes` (passthrough is in the API notes), `toggle/Default` (`toggle/Standalone`) and `typography/HeadingGroup` (`typography/Default` has two `hgroup`s). Their parity snapshots and visual baselines are gone too.
  - Kept `list/Dense` as the full dense list, and the List page's Dense section uses it. The shared `ListAll` moved to `list/partials/`, and the root `ListDense` is gone, so the List examples live in one place. The dense switch toggles `.ui-dense` on the preview list.
  - `list/Dense` and the new `card/Clickable` visual baselines need the `update-snapshots` label in CI.
- [x] (3) Scroll-state container queries: sticky Table header shadow, scroll shadows in Dialog/Drawer
  > provide examples here in the todo page how that would work.
  - Scroll-state queries let descendants (and the scroller's own pseudo-elements) react to the scroller's state: `scrollable: top` means there is content scrolled out above.
  - Dialog/Drawer: a shadow under the header that only shows once the content has scrolled. Checked in Chromium:
    ```css
    .ui-dialog > .ui-content {
      container-type: scroll-state;

      &::before {
        block-size: 0;
        content: "";
        display: block;
        inset-block-start: 0;
        margin-inline: calc(-1 * var(--size-3));
        position: sticky;
        transition: box-shadow 0.2s;
      }
    }

    @container scroll-state(scrollable: top) {
      .ui-dialog > .ui-content::before {
        box-shadow: 0 0 12px 6px rgb(0 0 0 / 0.35);
      }
    }
    ```
    The same with `::after`, `inset-block-end: 0` and `scrollable: bottom` gives a shadow above the actions while there's more to read.
  - Sticky table header (for the second pass): the table's scroll wrapper is the container, and the header gets a shadow once it's stuck:
    ```css
    .table-scroll {
      container-type: scroll-state;
    }

    .ui-table thead {
      container-type: scroll-state;
      inset-block-start: 0;
      position: sticky;
    }

    @container scroll-state(stuck: top) {
      .ui-table thead th {
        box-shadow:
          0 1px 0 var(--border-color),
          var(--shadow-2);
      }
    }
    ```
  > Fix
  > i like it, just use a more subtle shadow
  - Fixed: Dialog and Drawer `.ui-content` are `scroll-state` containers. A shadow shows under the header once the content is scrolled, and above the actions/footer while there's more below. It fades in and out.
  - Changed from the proposal: a sticky `::before` in the scroller sits inside the scroller's padding (20px down in the drawer), so the shadow cut through the content. The shadows are `position: absolute` against the dialog/drawer instead, pinned to the content's edges with `anchor(--ui-dialog-content inside)` / `--ui-drawer-content`, with `pointer-events: none`.
  - The sticky table header part is out of scope: sticky headers were removed (see the second-pass item).
  - Updated the todo example to the final look.
  > Scroll shadows in Dialog and Drawer: make sure you're either using shadow values from the library or open props
  - Fixed: the shadow is Open Props `--shadow-4` (`--_scroll-shadow`), the level elevated cards use in light mode, instead of a custom gradient. Each shadow is an 8px pseudo-element just outside the content edge, with `clip-path: inset(100% 0 calc(-1 * var(--size-6)))` so only the part that falls on the content shows. The bottom one is the same element flipped with `scale: 1 -1`.
  - Dark mode: Open Props shadows use a dark gray at 4-8% strength, so they're barely visible on dark surfaces. That's true for every Open Props shadow in the library (cards, drawers, menus), since `props.shadows.dark.css` isn't imported. Importing it, or setting Open Props' dark values (`--shadow-color: 220 40% 2%`, `--shadow-strength: 25%`) on `html` in dark mode in `theme.css`, would fix them all at once.
- [x] (3) Docs sticky `h2` sets `container-name: sticky-heading` / `container-type: scroll-state`, but no `@container` rule uses it, and it has a hard-coded `max-inline-size: 555px` with a TODO comment (`Document.astro:449-456`)
  > Explain further and provide an example
  - Over 1200px, each docs `h2` is `position: sticky` at `--size-4` with `z-index: 22`, so it slides up into the floating header bar and sits next to the logo while you scroll its section. `max-inline-size: 555px` is there so it doesn't cover the nav (Guide, Components, …).
  - Problem 1: 555px only fits around 1400px. The nav sits at the header's inline end and the heading starts at the content column, so the space between them depends on the viewport. At 1250px wide, scrolled into "Buttons with icon and label" on `/html/components/button/`, the stuck heading (240–795px) runs under "Guide" (starts at 695px). It overlaps the text, and a click on "Guide" hits the `h2` (checked with `elementFromPoint`). Without the cap, the same happens at 1400px.
  - Problem 2: `container-name`/`container-type: scroll-state` are unused, since no `@container sticky-heading scroll-state(stuck: top)` rule exists. They make every `h2` a scroll-state container for nothing.
  - Fix: remove the two container lines (or add the rule they were meant for, e.g. a smaller font while stuck, which needs a wrapper because a container can't style itself). Size the heading from the nav instead of a constant, and keep it on one line:
    ```css
    max-inline-size: calc(
      100vw - var(--_nav-inline-size) - var(--_content-start) - var(--_gap)
    );
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ```
    `--_nav-inline-size` (about 515px today) and the column start would be custom properties from `Header.astro`/`Document.astro`, which already define the grid. Alternative: stick the heading below the header instead of inside it, which removes the overlap problem entirely.
  > Fix
  - Fixed: while stuck, `@container sticky-heading scroll-state(stuck: top)` puts the heading on one line with an ellipsis. The 555px cap and its TODO are gone: `max-inline-size` comes from the page grid and the header (`--site-header-end-inline-size`). Checked from 1201px to 2200px: the stuck heading ends before the nav and no longer overlaps it.
- [x] (3) Vue exports `Description` next to `DescriptionListTerm`/`DescriptionListItem`, while Astro exports `DescriptionListDescription` (`packages/opui/vue/index.ts:14`, `packages/opui/astro/index.ts:15-19`)
  > Fix
  - Fixed: Vue exports `DescriptionListDescription`, like Astro. Examples and the API table use the new name. Breaking for Vue users importing `Description`.
- [x] (3) ListItem types allow `as="li"` through `as?: string` (renders `<li><li>`), and `class` is in the base types instead of the framework types (`ListItem/types.ts:3,20-23`)
  > Fix
  - Fixed: `as` is `"a" | "button" | "div"` (`href` requires `"a"` or no `as`), and `class` moved out of `ListItem/types.ts` (framework types already provide it). Astro, Svelte and Solid types no longer accept `as="li"`.
- [x] (3) "When to use" guidance is missing for close pairs: Chip vs Button, Dialog vs Drawer, Menu vs Select, Select vs ClassicSelect (`select.astro:203-210` only says "Bog-standard"), Switch vs Checkbox vs Toggle, Tabs vs ToggleGroup
  - Example: one line in each preamble, linked both ways
    ```html
    Use a Switch for a setting that applies right away. Use a
    <DocLink href="/components/checkbox">Checkbox</DocLink> for choices that are
    submitted with a form.
    ```
  > Fix
  - Fixed: one or two lines in each preamble, linked both ways: Chip ↔ Button, Dialog ↔ Drawer, Menu ↔ Select, Switch ↔ Checkbox ↔ Toggle, Tabs ↔ Toggle group, and Select ↔ Classic select (in the Classic select section, "Bog-standard" stays). Button and Dialog get a short preamble with just that line.
- [x] (3) Composition example: a clickable card. Card has no `href`/`as`, and no page shows one (`src/component-examples/card/`, `Card/types.ts:1-4`)
  - Example: the whole card as a link when it holds nothing else interactive, or a stretched link when it does
    ```html
    <a class="ui-card ui-outlined" href="/pricing">
      <div class="ui-content">
        <h3>Pricing</h3>
        <p>Plans for any team.</p>
      </div>
    </a>

    <article class="ui-card ui-outlined" style="position: relative">
      <div class="ui-content">
        <h3><a href="/pricing" class="stretched">Pricing</a></h3>
      </div>
    </article>
    <style>
      .stretched::after {
        content: "";
        inset: 0;
        position: absolute;
      }
    </style>
    ```
  > clickable cards should probably only use the :after trick. maybe having a ui-card-link on the link in question will do the :after trick?
  - Prototype for `card.css` (`components.root`, in `:where()` like the rest):
    ```css
    .ui-card:has(.ui-card-link) {
      :is(
        a[href],
        button,
        input,
        label,
        select,
        summary,
        textarea,
        [tabindex]
      ):not(.ui-card-link) {
        position: relative;
        z-index: 1;
      }

      &:has(.ui-card-link:hover) {
        border-color: var(--text-muted);
      }

      &:has(.ui-card-link:focus-visible) {
        outline: var(--focus-ring-width) var(--focus-ring-style)
          var(--focus-ring-color, currentColor);
        outline-offset: var(--focus-ring-offset);
      }
    }

    .ui-card-link {
      color: inherit;
      text-decoration: none;

      &::after {
        content: "";
        inset: 0;
        position: absolute;
      }

      &:focus-visible {
        outline: none;
      }

      &:hover {
        text-decoration: underline;
      }
    }
    ```
  - Markup (Astro/Vue need no new prop, the class goes on the link in the `header` slot):
    ```html
    <article class="ui-card ui-outlined">
      <hgroup>
        <h3><a class="ui-card-link" href="/changelog">Changelog</a></h3>
      </hgroup>
      <div class="ui-content"><p>Every release in one place.</p></div>
      <div class="ui-actions">
        <button type="button" class="ui-button">Subscribe</button>
      </div>
    </article>
    ```
  - Why it works: `.ui-card` is already `position: relative`, so the `::after` covers the card. It's part of the link, so navigation, Ctrl/Cmd+click, middle-click and "Open in new tab" work from anywhere on the card. The focus ring moves to the card with `:has(.ui-card-link:focus-visible)`. Other buttons and links get `z-index: 1` and keep their own clicks (checked in Chromium). Screen readers hear just the link text, which is why it beats a wrapping `<a>` (that reads every line as the name and can't hold other interactive elements).
  - Caveats: the `::after` sits above the text, so dragging over the description starts a link drag instead of selecting text (no CSS-only way around it). Only one `.ui-card-link` per card works.
  - Recommendation: add `.ui-card-link` to `card.css` and a "Clickable card" section on the Card page, documenting only this technique.
  - See the example: two cards with a click log. Try selecting text and Ctrl+click.
  > Fix
  - Fixed with the `::after` trick: `.ui-card-link` on a link stretches it over the card (`card.css`, `components.root`, in `:where()`). Other links, buttons, inputs, labels, selects, summaries, textareas and `[tabindex]` elements in that card are lifted above it, so they keep their own clicks. Through `:has()` the card border turns `--text-muted` on hover (`Highlight` in forced colors) and the card gets the focus ring, the link itself none. No transitions, so no `--motion`.
  - New "Clickable card" section (`#clickable`) with a `Clickable` example: a card with only a link, and one with a link and a Subscribe button. A callout says one link per card and that the text can't be selected. The Card API has notes for it (a part would end up in the anatomy diagram) (`card.astro`, `card/Clickable.*`, `card/api.ts`).
  - Checked in Chromium on the docs pages: a click anywhere lands on the link, Subscribe gets its own click, Tab puts the ring on the card, and the accessible name is just the link text.
- [x] (3) Guide order and prev/next: the nav is Getting started, Theme generator, Theme tokens, Why, Browser support, Acknowledgments, and guide pages have no prev/next links like component pages (`Guide.astro:31-38`, `Component.astro:93-94,301-354`)
  - Example:
    ```ts
    const links = [
      { href: "/guide/why-opui", label: "Why Open Props UI?" },
      { href: "/guide/getting-started", label: "Getting started" },
      { href: "/guide/concepts", label: "Concepts" },
      { href: "/guide/theme-tokens", label: "Theme tokens" },
      { href: "/guide/theme-generator", label: "Theme generator" },
      { href: "/guide/customizing", label: "Customizing" },
      { href: "/guide/browser-support", label: "Browser support" },
      { href: "/guide/accessibility", label: "Accessibility" },
      { href: "/guide/migrating", label: "Migrating" },
      { href: "/guide/acknowledgments", label: "Acknowledgments" },
    ]
    ```
  - Prev/next: reuse the `.pagination` markup from `Component.astro` with `links[index ± 1]`. Migrating could render `packages/opui/MIGRATING.md`.
  > Fix
  - Fixed: Why, Getting started, Concepts, Theme tokens, Theme generator, Customizing, Browser support, Migrating to v6, Acknowledgments. Guide pages have Previous/Next cards like component pages (`Guide.astro`). Accessibility joins the nav when the page exists.
- [x] (3) Page structure: component pages have no shared section order, many have no preamble and most have no Accessibility section (`src/docs/components/AGENTS.md` 3.1, 4.2)
  - Missing preamble (only `export const description`, nothing shows on the page): avatar, badge, button, carousel, description-list, dialog, list, range, table, text-field, textarea, toast
  - Missing accessibility: anchor, avatar, button, button-group, card, chip, description-list, divider, form, list, radio, select, spinner, table, textarea, toast, toggle, tooltip, typography
  - Example: order to add to `AGENTS.md`: Preamble, Basics, Variants, Sizes, Parts (slots/affixes), States (disabled, invalid), Layout (spread, orientation), Composition, Accessibility, then the layout's API, Anatomy and Installation
  > Fix
  >
  > - not all pages should have preamble
  > - hold off with accessibility but create a new todo issue about it
  > - anatomy is at the top of the page, fyi, maybe you're listing it as it is written in the astro code?
  - Fixed: `src/docs/components/AGENTS.md` §3.3 gives the order as it renders: title and optional preamble, browser chips and What's new, hero anatomy, then the page's sections (Basics, Variants, Sizes, Parts, States, Layout, Composition), then Accessibility, Anatomy (when not hero), API, Under the hood, Browser support, Installation, See also and Changelog. Preambles stay optional.
  - The first example without a heading sits under "Basics" on checkbox, description-list, list, radio, range, spinner and switch. Sections moved into that order on badge, button, button-group, callout, checkbox, chip, radio, select and switch.
  - Accessibility sections: new item under Docs ("Accessibility sections are missing"). AGENTS.md also lists the real Callout severities now.
- [] (3) Vue SSR: no page says what needs hydration. Checkbox `indeterminate` is set in `watchPostEffect`, the Range value `<output>` and every `v-model` only update on the client (`CheckboxInput.vue:35-37`, `Range.vue:12-25,58-67`, `getting-started/Vue.astro`)
  - Example: a note under "How to use"
    ```md
    Components render complete HTML on the server and work without hydration, except:
    Checkbox `indeterminate` (also set `data-indeterminate`), the Range value output, and `v-model`.
    Hydrate those (`client:load` in Astro) or use them in a client-rendered Vue app.
    ```
  > Explain further
  > maybe there could be a SSR icon that is and isn't crossed over (or something) for framework components?
  - Without hydration (Nuxt, or Astro with `@astrojs/vue` and no `client:*`), every Vue component renders complete HTML, and the native controls work and submit. What needs hydration:
    - Checkbox `indeterminate`: a DOM property set in `watchPostEffect` (`CheckboxInput.vue`). The server renders `data-indeterminate`, but the CSS uses `:indeterminate`, so the box looks unchecked until hydration. Without it, `activateIndeterminate()` from `opui-css/css/js/checkbox.js` sets it.
    - Range value `<output>`: rendered once, only follows the thumb after hydration. The track fill is CSS, so it works.
    - `v-model` (Checkbox, ClassicSelect, Radio, Range, Select, Switch, TextField, Textarea): the ref only updates on the client. The native value still changes and submits.
    - Astro components need nothing: they're server-only and their `<script>`s run anyway.
  - Indicator proposal:
    - Data: a framework-keyed `hydration` field in `api.ts`, like `notes`, so Astro and HTML pages show nothing. `v-model` is counted from `api.model`. No entries means "no hydration needed", and the `[component-api]` check can verify each `prop` exists.
      ```ts
      hydration: {
        vue: [
          {
            description: "A DOM property: the server renders an unchecked box.",
            fallback: "Call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.",
            prop: "indeterminate",
          },
        ],
      },
      ```
    - States, like browser support's full/partial: "SSR: no hydration needed" (a server icon on a tonal chip) and "SSR: hydrate for `indeterminate`" (the icon crossed out, on an outlined chip). No component is broken without hydration, so there's no third state.
    - Where: the Vue page header next to the browser support chips, with a tooltip listing each feature and its fallback, and the crossed icon after each prop in the API table that needs hydration (`role="img" aria-label="Needs hydration"`). Not the sidebar: nearly every component would get the same "fine" icon. The Vue getting started page could link the components that need hydration for something.
    - Header sketch:
      ```astro
      <Tooltip id={tooltipId}>
        <Chip
          as="button"
          type="button"
          size="small"
          variant={needs.length ? "outlined" : "tonal"}
          interestfor={tooltipId}
          commandfor={tooltipId}
          command="toggle-popover"
        >
          <ServerIcon slot="start" crossed={needs.length > 0} />
          <span class="ui-text"
            >{
              needs.length ? (
                <>
                  SSR: hydrate for{" "}
                  <code>{needs.map((n) => n.prop).join(", ")}</code>
                </>
              ) : (
                "SSR: no hydration needed"
              )
            }</span
          >
        </Chip>
        <Fragment slot="content"
          >{
            needs.map((n) => (
              <p>
                <code>{n.prop}</code>: {n.description} {n.fallback}
              </p>
            ))
          }</Fragment
        >
      </Tooltip>
      ```
  - See the example: both header chips and an API table with the marker.
- [] (3) Sizes: control size scales differ. Switch has `small`, Checkbox, Radio and Chip have `small | large`, and fields (TextField, Textarea, Select, ClassicSelect) and Button have `x-small | small | large`. A form row can't set one size on every control, and the stress `[data-size]` rows have no x-small switch, checkbox or radio (`Switch/types.ts:4`, `Checkbox/types.ts:5`, `Radio/types.ts:4`, `Chip/types.ts:6`, `TextField/types.ts:9`, `Textarea/types.ts:9`, `Select/types.ts:8`, `ClassicSelect/types.ts:12`)
  - Switch, `small` only:
    ```astro
    <Switch size="small">Notifications</Switch>
    <Switch>Notifications</Switch>
    ```
  - Checkbox and Radio, `small | large`:
    ```astro
    <Checkbox size="small">Accept</Checkbox>
    <Checkbox>Accept</Checkbox>
    <Checkbox size="large">Accept</Checkbox>
    <Radio name="plan" size="small">Basic</Radio>
    <Radio name="plan" size="large">Pro</Radio>
    ```
  - Fields, `x-small | small | large`:
    ```astro
    <TextField label="Name" size="x-small" />
    <Textarea label="Notes" size="small" />
    <Select items={items} label="Fruit" size="large" />
    ```
  - Example: one scale for every control, `x-small | small | (default) | large`, each matching `--control-size-*` so a row of mixed controls shares one height
    ```astro
    <Switch size="x-small">Notifications</Switch>
    <Checkbox size="x-small">Accept</Checkbox>
    <Radio name="plan" size="x-small">Basic</Radio>
    <TextField label="Name" size="x-small" />
    ```
    ```html
    <label class="ui-switch ui-large">…</label>
    <label class="ui-checkbox ui-x-small">…</label>
    <label class="ui-text-field ui-x-small">…</label>
    ```
  > Explain further and provide an example
  > show me what that unified would look like with all the components side-by-side
  - See the example: one row per size and one column per control (Button, Checkbox, Chip, Radio, Select, Switch, Text field), today and with one scale, plus a form row with `x-small` on everything.
  - Today 5 of the 28 cells don't exist: x-small Checkbox, Chip, Radio and Switch, and large Switch. The class (or prop value) does nothing there, so you silently get the default size. In the `x-small` form row the switch, checkboxes and chip stand out.
  - One scale: every control takes `x-small`, `small`, default and `large`, as a prop and as a class. The names are shared, the sizes stay per family:

    |                   | x-small        | small | default | large      |
    | ----------------- | -------------- | ----- | ------- | ---------- |
    | Button and fields | 28px           | 32px  | 40px    | 46px       |
    | Chip              | 24px (new)     | 28px  | 32px    | 40px       |
    | Checkbox, Radio   | 14px box (new) | 16px  | 20px    | 24px       |
    | Switch track      | 16px (new)     | 20px  | 24px    | 28px (new) |

    The new sizes in the example are simulated with inline CSS. In the library they'd be tokens next to the existing ones in `theme.css` (`--choice-size-x-small`, `--chip-size-x-small`, `--switch-track-height-x-small`, `--switch-track-height-large` and their dot and width tokens), so themes can tune them.

  - Chip stays one step below Button on purpose, since chips sit in text and lists. If you'd rather have chips match control heights, the default chip grows from 32px to 40px, which is breaking.
  - Cost: types (Checkbox, Chip, Radio, Switch), CSS, tokens, `api.ts`, the Sizes examples and docs, and x-small rows on the stress page. Only adds sizes, so nothing breaks.
- [x] (4) No type exports from `opui-css/astro` / `opui-css/vue` (component `Props`, Menu `MenuItem`, Select `Item`) (`astro/index.ts`, `vue/index.ts`)
  > Fix
  - Fixed: both index files export the component `Props` types as `<Component>Props` (e.g. `ButtonProps`, `TabsTabProps`, `TableColumnProps`, `DescriptionListTermProps` in Astro), plus `MenuItem`, `SelectItem` and `ClassicSelectItem`, sorted.
- [x] (4) Accessibility guide page: icon-only labels, Menu keyboard support (Tab and Esc only, `menu.astro:130-132`), focus ring tokens, links to each component's Accessibility section. Contrast and forced colors are only under Getting started (`_theming.astro:131-213`, `theme.css:107-111`)
  - Example:
    ```md
    # Accessibility

    ## Accessible names: icon-only Button needs `aria-label`, Checkbox/Switch use `hideLabel` or `.ui-sr-only`

    ## Keyboard: native where possible (radio-based Tabs/ToggleGroup use arrows), Menu has Tab and Esc, no arrow keys

    ## Focus: `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset`, `--focus-ring-style`

    ## Contrast and forced colors: `--contrast`, `.ui-contrast-more`, system colors

    ## Per component: Accordion, Badge, Callout, Carousel, Checkbox, …
    ```
  > Explain further and provide an example
  - Proposed `src/docs/guide/accessibility.astro`, next to Concepts and Customizing. Short sections that link out, so each topic lives in one place:
    1. Built on native elements: button, `dialog`, `details`, `popover` and inputs give roles, keyboard support and focus. Tabs and ToggleGroup are radio groups, `showModal()` makes the page behind a Dialog or Drawer inert, and there are no ARIA widgets that need JS.
    2. Accessible names: icon-only Button needs `aria-label`. Checkbox, Radio and Switch without visible text use `hideLabel` (`.ui-sr-only` in HTML). Badge counts need hidden context (`srLabel`). Avatar takes the person's name as `alt`, or `alt=""` when the name is shown. Tabs get `role="radiogroup"` + `aria-label`. Carousel gets `aria-label`, and its buttons and markers are named with `--_button-*-label` and `--_marker-label`. Progress takes `aria-label`, plus `aria-describedby` and `aria-busy` on the region it describes.
    3. Keyboard: Accordion Enter/Space. Dialog/Drawer Tab through the dialog and then the browser UI, Esc closes. Menu Tab and Esc only, no arrow keys (say so as a limitation). Tabs/ToggleGroup arrows move and select. Range arrows, Page Up/Down, Home/End. Select native keys.
    4. Focus: the global `:focus-visible` ring from `normalize.css`, set with `--focus-ring-width` (2px, 3px with more contrast), `--focus-ring-style`, `--focus-ring-offset`, `--focus-ring-inset` and `--focus-ring-color` (unset means the inverted page color, e.g. set `var(--primary)`).
    5. Contrast, moved here from Getting started: `--contrast`, `prefers-contrast: more`, `.ui-contrast-more`/`.ui-contrast-normal`, custom values with a style query.
    6. Forced colors: system colors (`SelectedItem`, `CanvasText`, `Highlight`), nothing to configure, and which components have forced-colors styles.
    7. Motion: `prefers-reduced-motion: reduce` sets `--motion: 0`, plus `.ui-motion-off`/`.ui-motion-on`/`.ui-motion-debug` and per-component `--_motion`.
    8. Per component: links to every Accessibility section, and the pages that still need one (see the Accessibility sections item).
    9. Known gaps: what `a11y-known-violations.json` still lists, and Menu's missing arrow keys.
  - Getting started keeps one line pointing to Contrast, Forced colors and Motion on the new page, so there's one copy.
  > Fix
  - Fixed: new Accessibility page (`src/docs/guide/accessibility.astro`, `src/pages/[framework]/guide/accessibility.astro`), after Customizing in the Guide nav (`Guide.astro`). Short sections that link out: built on native elements, accessible names (per framework), keyboard (Dialog and Drawer described as native: Tab goes through the dialog, then the browser UI, then back), focus ring tokens, contrast, forced colors and motion, links to all 14 component Accessibility sections, and known gaps (Menu has no arrow keys). It stays light, as a place to start.
  - Contrast, Forced colors and Motion stay in Getting started (live demo, anchors and search entries keep working). The new page links to them.
  - The Accessibility sections item is removed as asked. Only one statement there was plainly wrong: Checkbox's Labels table said "inside the `label`/`role="checkbox"` element", but the library never uses `role="checkbox"`, so it says "inside the `label` element" now (`checkbox.astro`). Nothing else was.
- [x] (4) Concepts guide page: cascade layers, light and dark, props ↔ classes and the `ui-` prefix, rich text (`.ui-rich-text`/`.ui-not-rich-text`), which components need JS (`css/js/checkbox.js`, `toast.js` are only in the file tree, `HTML.astro:51-53`)
  - Example:
    ```html
    <button class="ui-button ui-outlined ui-small ui-primary">
      <!-- = <Button variant="outlined" size="small" color="primary"> -->
    </button>
    ```
  - Example: layers come from `layers.css`
    ```css
    @layer openprops, theme, normalize, components.prose, components.root, components.extended, utils;
    ```
  > Fix
  - Fixed: new Concepts page (`src/docs/guide/concepts.astro`) with an example per section: cascade layers (order, what each holds, unlayered wins), light and dark (`light-dark()`, live `.ui-light`/`.ui-dark`), props and classes (`ui-` prefix, HTML/Astro/Vue tabs), rich text (`.ui-rich-text`/`.ui-not-rich-text`, live), and what needs JavaScript.
- [x] (4) Customizing guide page: `--_` properties as the API, set on the component (not a parent), unlayered vs your own layer. API tables only list theme tokens (`css`). Carousel `--_per-view` is the only `--_` property documented (`component-api/AGENT.md:101`, `component-api/types.ts:29-44`, `carousel/api.ts:62`)
  - Example:
    ```css
    .toolbar .ui-button {
      --_icon-size: 1.25em;
    }

    @layer openprops, theme, normalize, components.prose, components.root, components.extended, utils, overrides;
    ```
  - Example: a proposed `api.ts` field for a "Custom properties" table
    ```ts
    customProperties: [
      { description: "Icon size.", name: "--_icon-size" },
      { description: "Minimum height.", name: "--_min-height" },
    ],
    ```
  > Fix
  - Fixed: new Customizing page (`src/docs/guide/customizing.astro`): theme tokens vs `--_` properties, set them on the component (not a parent), prefer inputs (`--_accent`) over outputs (`--_bg-color`) so hover and active keep working, and unlayered CSS vs your own `overrides` layer, with live examples.
- [x] (5) `contrast-color()` for `--primary-contrast` so custom primaries get readable text
  > contrast-color() has its limitations - it can only be black or white. it's better to use relative color syntax imo.
  - Agreed. With relative color the text can keep the primary's hue and stay off pure black and white. Lightness flips at a threshold:
    ```css
    --primary-contrast: oklch(
      from var(--primary) clamp(0.15, (0.62 - l) * 1000, 0.98) calc(c * 0.15) h
    );
    ```
    `(0.62 - l) * 1000` is a big positive number for dark primaries (clamped to 0.98, near white) and a big negative one for light primaries (clamped to 0.15, near black). The chroma keeps a hint of the hue.
  - Caveat: the default primary (`--color-8`, L 58%) gets near-white text at about 4:1, so the existing 3.97:1 issue (Tabs, filled Buttons) stays until the threshold or the primary moves. Want me to implement it and tune the threshold against AA?
  > Fix
  - Fixed with relative color in `theme.css`:
    ```css
    --primary-contrast: oklch(
      from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h
    );
    ```
  - Threshold tuned to `0.565`: that's where near-white and near-black text have the same contrast (measured over several hues and chromas: the crossover is 0.515 to 0.585). The old `0.62` gave white text below AA for primaries between about 0.57 and 0.62.
  - Measured with the resolved colors in Chromium: filled primary Button, selected filled Tab and Badge are 4.76:1 in light mode (green `oklch(0.53 0.1 145)` with near-white text) and 7.78:1 in dark mode (blue `oklch(0.71 0.095 240)` with near-black text). Both pass AA, so the earlier 3.97:1 caveat no longer applies to the default primary.
  - Limit: primaries with a lightness of about 0.54 to 0.59 can't reach 4.5:1 with either near-white or near-black text (best is about 4.3:1). Pure white/black would only add about 0.2.
  - No fallback: `theme.css` already needs relative color (`--blue`, `--primary-dark`, etc.), and the docs have no fallback policy.
  - The theme generator and configurator no longer replace `--primary-contrast` with `var(--color-1)` when grays are off, since it's now derived from the primary.

## To check

- [x] (3) Auto-suggest arrow: vertically centered in Chromium, but sits closer to the edge at `x-small`/`small` than at default/`large`. Check Firefox and Safari too
  > honestly auto-suggest should look more like select and the arrow should be any svg you choose. is that possible? if you think so explain how it would work and if it would nicely slot into how other field components, ex select and text field work
  - Yes, and most of it is in place. `text-input.css` already hides the browser's datalist indicator (Chromium only, Firefox has none and Safari draws its own) and draws a CSS triangle with `.ui-field::after`, like Select's `::picker-icon`. The arrow sits closer to the edge at `x-small`/`small` on purpose: the inset drops from `--size-3` to `--size-2` with the field padding.
  - Plan: an `svg` in the suffix slot that text fields already have replaces the triangle. The field grid already has a suffix column (prefix, input, suffix), so the arrow lines up and scales like any other suffix:
    ```html
    <label class="ui-text-field">
      <span class="ui-label">Users</span>
      <span class="ui-field">
        <input type="text" list="users" />
        <span class="ui-suffix" aria-hidden="true"><svg>…any arrow…</svg></span>
      </span>
      <datalist id="users">…</datalist>
    </label>
    ```
    ```css
    :where(.ui-text-field:has(input[list])) .ui-field:has(> .ui-suffix) {
      &::after {
        content: none;
      }

      input[list] {
        padding-inline-end: var(--_field-padding-inline);
      }
    }
    ```
  - It fits how Select and TextField work: the default arrow stays CSS-only, and a custom one uses the same slot as any icon. Astro and Vue get an `arrow` slot that renders into `.ui-suffix`. Select could take the same slot later, hiding `::picker-icon` when it's filled.
  - Trade-off: the arrow is decorative (`pointer-events: none`), like today. Typing or pressing the down arrow key opens the list. A clickable arrow would need `input.showPicker()`, which is JavaScript.
  > Fix
  > use the chevron icon used in the select component
  - Fixed: the auto-suggest arrow is drawn exactly like Select's: `--_arrow-size` and `--_arrow-inset` live on the shared field root in `text-field.css` (moved from `select.css`), and `text-input.css` uses them with `color: var(--text-primary)`. The smaller inset at `x-small`/`small` is gone, so it lines up with Select's arrow at every size (checked in Chromium on `forms` SizeMatrix). The suffix `svg` plan is dropped. Firefox draws no indicator and Safari draws its own, as before; not checked in those browsers.
- [x] (3) Release: `version` is still 5.5.0 and the CHANGELOG heading is `## Unreleased`. Home shows 5.5.0, and the docs' `opui-css@6` CDN snippets don't resolve until 6.0.0 is published (`packages/opui/package.json:3`, `CHANGELOG.md:3`, `src/docs/Home.astro:16,38`)
  > change things to 6.0.0
  - Fixed: `version` is 6.0.0 and the CHANGELOG heading is `## 6.0.0 - Unreleased` (it keeps "Unreleased", which AGENTS.md points to, until you publish). Home shows 6.0.0.
  - Publish with `pnpm publish`, not the `release*` scripts: they run `pnpm version` first and would bump past 6.0.0.
- [] (4) Button `kbd` looks weird on Mac
- [] (6) Review `feat/pixel-style` (Pixel style switcher in theme drawer): check every component in light/dark, no flash on reload, Default unchanged vs main, logo font now uses `--font-heading`. Rebase may conflict in button-group.css and CHANGELOG.md
- [] (6) Test anatomy heroes in Firefox, Safari and with Windows fonts
- [x] (7) Check button changes in the browser: new padding scale, icon side padding with wrapped labels, icon sizing, icon-only, button groups
  > - keyboard on hover is buggy (the kbd disappears on outlined and tonal buttons; the kbd on outlined and tonal buttons don't inherit the button text color)
  - Fixed: the `kbd` color was `oklch(from currentColor …)`. Chromium resolved it once and didn't update it while the button's color transitioned on hover, so it kept the old color. It now inherits `color` and dims with `opacity: 0.8`, and the background is `color-mix()` with `currentColor`.
- [] (8) Test Menu and Carousel in Firefox and Safari (only checked in Chromium)
