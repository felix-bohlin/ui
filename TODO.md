Severity 1-10, 10 is the most severe.

Findings with a page and section in brackets come from the stress pages in `src/stress-tests/`. Open the section named in brackets to see each one.

## Accessibility

- [?] (3) Badge: a count is announced without context. The `Indicator` example is an icon with "5", so screen readers say just "5" (`src/component-examples/badge/Indicator.{astro,html,vue}`)
  - What I meant: `aria-label` on the indicator `<span>` doesn't fix it. A `<span>` has no role, and ARIA doesn't allow naming generic elements, so screen readers ignore the label and read the text ("5"). Badge used to do this, and now has `srLabel` (visually hidden text) instead.
  - What works: text that is in the content. Either visually hidden (`srLabel` in Astro and Vue, `.ui-sr-only` in HTML), or visible text next to the badge ("Inbox 5"). See the example: all three, with what Chromium's accessibility tree reads.
    ```html
    <span class="ui-badge-indicator"
      >5 <span class="ui-sr-only">unread messages</span></span
    >
    ```
  - Suggestion: use `srLabel` (`.ui-sr-only` in HTML) in the `Indicator` example and add an Accessibility section to the Badge docs that says so.
- [x] (3) FieldSet `as="div"` has no `role="group"` (`FieldSet.astro:6-9`, `FieldSet.vue:11-15`). FieldGroup sets `role="group"` after the spread, so `role="radiogroup"` is impossible in Astro (`FieldGroup.astro:19-20`)
  - Fixed: FieldGroup no longer sets `role="group"`. It's a layout wrapper inside a `<fieldset>`, which is already a group, so screen readers announced two groups. A `role` passed to FieldGroup now renders. FieldSet with `as` set to anything other than `fieldset` gets `role="group"` (before the spread, so it can be overridden). The HTML examples drop `role="group"` from `.ui-field-group`.
- [?] (4) Avatar `<img>` has no `alt` attribute when `alt` is omitted (`Avatar.astro:28`, `Avatar.vue:37`)
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
- [?] (4) Drawer has no accessible name: the `DrawerHeader` heading isn't wired to `aria-labelledby` (`Drawer.astro:21-35`, `Drawer.vue:23-37`, `DrawerHeader.astro:22`, `DrawerHeader.vue:26`)
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
- [?] (4) Divider disappears in forced colors: it's drawn with `background-color` (`divider.css:3`)
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
- [?] (4) Forced colors: the unchecked Switch dot (only `background-color`, outline is `0`) and the selected ToggleButton (only a background tint) are invisible (`switch.css:11,56-66`, `toggle-button.css:73-81`)
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
- [?] (5) Astro ClassicSelect: `aria-labelledby` also points at the label id when only a `label` slot is passed, but the label span only renders for the `label` prop and there is no `label` slot (`ClassicSelect.astro:41-45,51`)
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
- [?] (5) Link hover/focus color `--primary-light` is about 2.8:1 on the default light surface (`link.css:11-14`, `typography.css:317-320`, `theme.css:71`)
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
- [x] (5) Checkbox forced-colors block loses on specificity: `label.ui-checkbox input:checked` (0,2,2) can't beat `input[type="checkbox"]:checked` (0,3,2), so the box isn't `SelectedItem` and the `SelectedItemText` checkmark sits on a forced `Canvas` fill (~1.9:1) (`checkbox.css:145-149,198-212`)
  > Explain further and provide an example
  - Base rule (before the fix): `label.ui-checkbox input[type="checkbox"]:checked` is (0,3,2). Forced block: `label.ui-checkbox input:checked` is (0,2,2). Same layer, and `@media` adds no specificity, so the base `background-color: var(--_accent)` wins and forced colors turn it into `Canvas`. The checkmark rule (`input:checked::after`, (0,2,3)) ties with the base `::after` and comes later, so it does apply: a `SelectedItemText` mark on a `Canvas` box. Measured before the fix with emulation: light `#ffffff` mark on a `#ffffff` box (1:1, a checked box looks unchecked), dark `#3b3b3b` on `#000000` (1.87:1).
  - Fixed: the forced block uses `input[type="checkbox"]` (same selector as the base, later in source, so it wins). Verified: the checked box is `SelectedItem` (`#1967d2` light, `#99c8ff` dark) with a `SelectedItemText` mark, 5.37:1 and 6.43:1. Wrapping the root in `:where(label.ui-checkbox)` doesn't change the outcome on its own: both rules lose the same (0,1,1), so the old `input:checked` (0,1,1) would still lose to `input[type="checkbox"]:checked` (0,2,1). The attribute selector is the fix. Radio already used `input[type="radio"]` in its forced block.
  - See the example: live checkbox plus a simulated before/after.
- [?] (7) Remaining `color-contrast` entries in `a11y-known-violations.json`: Typography (muted overline and heading group text in dark mode, `typography` stress page), List `kbd`, Badges (`layout` Badges) and `data-display` InlineAlignment
  > Explain further and provide an example
  - Every flagged pair, from axe (all 12px text unless noted, so 4.5:1 is needed):
    - Overline, dark: `.ui-overline` and the first `hgroup` `p` use `oklch(from var(--text-muted) calc(l * 0.75) c h)`, `#858a8f` on `#23272b`, 4.31:1. Covers `dark/stress/typography/{Bidi,EveryElement,HeadingClasses,VerticalRhythm}` and `dark/typography/{Default,HeadingGroup,HeadingGroupClass,Variants}`. Fix: `calc(l * 0.9)` in the dark half of the `light-dark()` (3 places in `typography.css`): 6.9:1 on the page, 5.18:1 on tonal. (`0.85` passes on the page, 5.93:1, but not on tonal, 4.45:1.)
    - Link inside `mark`, dark (`dark/typography/Default`): `#67a9d7` on `Mark` yellow `#ffff00`, 2.37:1 (16px bold). Fix: `mark a[href] { color: inherit }` (MarkText, 19.6:1). The underline still marks it as a link.
    - `code` inside `del`/`ins`, dark (`dark/typography/Default`): `#ff6955` / `#19c15c` on the code tint `#4b4e51`, 2.95:1 / 3.51:1 (14.4px). Fix: `:is(del, ins) code { background-color: transparent }`, 5.3:1 / 6.3:1. The strike and underline already set them apart.
    - `code` in an hgroup body paragraph, dark (`dark/typography/Default`): `#a7acb1` on `#4b4e51`, 3.66:1 (18px). Fix: a lighter code tint in dark, `oklch(1 0 0 / 10%)` instead of `18%`, gives 4.79:1.
    - Linked `code`, light (`light/typography/Default`): `#447b46` on the `a[href] code` tint `#d7dbe0`, 3.62:1 (14.4px bold). Fix: drop the tint on linked code (`a[href] code { background-color: transparent }`), 4.76:1, or use `--primary-dark` for links in light (see the Link item).
    - List `kbd`, light (`light/list/{Default,EndKeyboard}`): `.ui-list .ui-end kbd` is `color: inherit; opacity: 0.6` on the list's `--surface-filled` (`#c6cbd1`), effective `#55595e`, 4.32:1. Fix: `color: var(--text-muted)` and no `opacity`, 9.2:1 (or `opacity: 0.7`, 5.8:1).
    - Link in a List, light (`light/stress/typography/ProseInComponents`): `#447b46` on `--surface-filled` `#c6cbd1`, 3.08:1. `--primary` is only tuned for the page surface. Fix: `.ui-list a[href] { color: light-dark(var(--primary-dark), var(--primary)) }`, 5.5:1.
    - Info badge (`{light,dark}/stress/layout/Badges`, `{light,dark}/stress/data-display/InlineAlignment`): `--gray-1` `#f4f9ff` on `--info` `#0085aa`, 4.02:1. `--info` is `oklch(from var(--color-9) l 0.2 210)`, and cyan at that lightness is too light for white text. Fix in the badge: `--_bg-color: oklch(from var(--info) calc(l * 0.9) c h)`, 5.0:1. Or darken `--blue` globally (`--color-10` lightness, 4.75:1), but that also shifts Callout/Chip info colors, so check those first.
  - See the example: each case current vs proposed, with live ratios. Remove each ledger key with `pnpm test:e2e:record-a11y` once its fix lands.
- [x] (8) Dark mode: `--border-color`, `--surface-tonal` and `--surface-elevated` are the same gray, so borders (field borders too) vanish on tonal and elevated surfaces and tonal/elevated cards look the same (`layout` Surfaces, SidebarLayout)
  > borders on tonal and elevated should have the same color as the background
  - Fixed: tonal and elevated cards (and dialogs, which are elevated cards) have a border in the page background color, so a tonal card on a tonal surface stays visible. Inside them, `--border-color` and `--field-border-color` are the page background in dark mode, so dividers and field borders show too (`theme.css` "Raised surfaces"). Light mode only changes the card's own border. The theme generator copies the block from `theme.css`.
- [?] (8) Accordion `summary` focus ring is mostly invisible: the accordion is a `.ui-card` with `overflow: hidden`, which clips the outward `outline-offset: 2px` ring on the top and sides (`card.css:30`, `accordion.css:71`)
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
- [?] (2) Classes emitted with no CSS: `ui-tonal` (`Callout.astro:20`), `ui-title` (`Callout.astro:79`), `ui-default` (`Accordion.astro:22`), `ui-align-start` (`Card.astro:28`, `Dialog.astro:39`), `ui-column` (`FieldGroup.astro:17`), `ui-description` (`Description.astro:7`). On Dialog it's a real bug: `dialog.css:43-46` always sets `justify-content: end`, so `actionsAlign="start"` does nothing
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
- [?] (2) HTML Range shows no track fill in Chromium/Safari (only Firefox has `::-moz-range-progress`): only the Astro/Vue components set `--_track-fill` with JS, and the Range docs don't say HTML users need to (`range.css:215,243`, `Range.astro:133`, `Range.vue:40`)
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
- [?] (3) Docs theme: the first visit saves the OS preference to `localStorage` (`setTheme` always writes), so the site never follows OS changes after that. The `localStorage` calls have no try/catch (`Header.astro:53-65,74,112-114`)
  > i don't see the problem, if you chose your preference it shouldn't follow the OS preference the next time you visit the page.
  - Agree: an explicit choice should stick. The issue is that a choice gets saved without the user ever making one. `Header.astro` on load:
    ```js
    const storedTheme = window.themeUtils.getStoredTheme() // null on the first visit
    const initialTheme = storedTheme || window.themeUtils.getSystemPreference() // "dark" (OS is dark)
    window.themeUtils.setTheme(initialTheme) // also runs localStorage.setItem("theme", "dark")
    ```
    1. First visit with the OS in dark mode, no clicks: `theme = "dark"` is stored.
    2. Later the OS switches to light (manually, or automatically at sunrise).
    3. Next visit: `getStoredTheme()` returns "dark", so the site stays dark, although the user never picked dark.
  - Fix: split applying from saving. The initial load only applies, and only the theme toggle (`setTheme`) saves:
    ```js
    applyTheme(theme) { /* class swap + applyCustomTheme */ },
    setTheme(theme) { this.applyTheme(theme); try { localStorage.setItem("theme", theme) } catch {} },
    // on load
    window.themeUtils.applyTheme(getStoredTheme() || getSystemPreference())
    ```
    Optionally listen to `matchMedia("(prefers-color-scheme: dark)")` `change` while nothing is stored, so it also follows the OS live.
  - try/catch: `localStorage` throws (`SecurityError`) when site data is blocked (cookies/site data off in Chrome or Firefox, some sandboxed iframes), and older Safari private mode threw `QuotaExceededError` on `setItem`. This inline script runs before the header, so an exception stops it: `getStoredTheme()` throws, no theme class or custom theme is applied, and the toggle throws on every click after swapping the class. Wrap `getItem`/`setItem` (also in `applyCustomTheme`) and treat a failure as "nothing stored".

---

- [x] (3) `<button>` rendered without `type="button"` submits surrounding forms: Button (`Button.astro:21`, `Button.vue:9`), Chip/Avatar `as="button"` (`Chip.astro:7`, `Avatar.astro:17`), DrawerHeader close (`DrawerHeader.astro:24`, `DrawerHeader.vue:28`)
  > Fix
  - Fixed: Button, Chip and Avatar with `as="button"` render `type="button"` by default (Astro and Vue). A `type` you pass wins, e.g. `<Button type="submit">`. The DrawerHeader close button gets it through Button.
  - HTML examples got `type="button"` on their buttons so the markup still matches.
- [?] (3) ToggleGroup (Astro) forces every input to `type="radio"` in single mode, even an explicit `type="checkbox"`. Vue keeps an explicit `type` (`ToggleGroup.astro:29-33`, `ToggleButton.vue:16`)
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
- [x] (3) Peer ranges pinned to dev versions: `astro ^7.0.6`, `vue ^3.5.39`, `svelte ^5.56.4`, `solid-js ^1.9.13`, while the README says `^7` and `^3.5` (`packages/opui/package.json:77-83`, `packages/opui/README.md:16-19`)
  > Fix
  - Fixed: peers are `astro ^7`, `solid-js ^1.9`, `svelte ^5`, `vue ^3.5` (`open-props ^1.7.23` unchanged). README lists the same ranges, including `open-props` `^1.7.23` and the missing `solid-js` line.
  - `pnpm install --frozen-lockfile` passes, no lockfile change.
- [?] (3) `p.ui-p.ui-small` renders 12px, not `--font-size-1`: `:where(p, span).ui-small` has the same specificity as `:where(.ui-p).ui-small` and comes later (`typography.css:5-6,151-152`)
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
- [?] (3) RTL: the required asterisk in stacked Checkbox and Radio uses physical `inset: 0 -0.25ex auto auto`, so it sits before the label (`radio.css:90`, `checkbox.css:115`)
  > Explain further and provide an example
  - The base rule is already logical: `.ui-label::after { inset-block: 0 auto; inset-inline: auto -0.25ex }`.
  - The stacked override (`.ui-stack .ui-label::after { inset: 0 -0.25ex auto auto }`, now `checkbox.css:119` and `radio.css:94`) is its physical copy. In RTL it pins the asterisk to the right, which is before the text: LTR shows `Accept terms *`, RTL shows `* قبول الشروط`.
  - Fix: delete the `/* Required dot */ &::after` block inside `.ui-stack .ui-label` in both files, so the logical base rule applies. The example's "Fixed" column applies exactly the base values.
  - Example: `rtl-required-asterisk` (LTR, RTL now, RTL fixed).
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
- [?] (4) `.ui-dot` sets fixed `--_anchor-tx`/`--_anchor-ty` after the alignment rules, so it overrides the offsets for every alignment (e.g. `.ui-end-end.ui-dot` is pushed further down instead of into the corner) (`badge.css:105-108`)
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
- [?] (4) Callout icon color is set with `stroke`, but the example icons use `fill="currentColor"`, so they get the text color with a colored outline (`callout.css:112`)
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
- [?] (5) FieldGroup `name`: the Astro regex also names `type="submit"`, `button` and hidden inputs. Vue only reaches components that inject `CurrentFieldNameKey`, so native inputs and ClassicSelect get no name (`FieldGroup.astro:9-13`, `FieldGroup.vue:8-10`)
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
- [x] (5) ListItem `href` without `as` (allowed by the types): Astro spreads it onto the `li` (`<li href>`), Vue drops it (`ListItem.astro:21,33`, `ListItem.vue:23,39,67`, `ListItem/types.ts:11-12`)
  > Fix
  - Fixed: `href` without `as` renders an `<a>` inside the `li` in both Astro (`as` defaults to `"a"` when `href` is set) and Vue (`Tag` is `props.as ?? (props.href ? "a" : undefined)`).
- [?] (5) `.ui-abbr`/`.ui-dfn` underline uses the primary `--color-9`, because the info palette scope only matches `abbr`/`dfn` elements (`typography.css:129-131`, `core/palette.css:10-25`, `theme.css:214`)
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
- [?] (5) Vertical ButtonGroup squares any button that contains an `svg`, icon + label included: `&:has(svg)` should be `&:has(> svg:only-child)` (`button-group.css:153-156`)
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
- [?] (6) Rich text still styles component parts that the component doesn't set itself. `.ui-description-list dd` gets the prose `padding-inline-start: 1.625em`, and List/Menu row links (`li > a`, no class) get the bold prose link `font-weight` (`typography.css:307-321,652-664`, `description-list.css:39-41`, `list.css:194-210`)
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
- [x] (6) Invalid Range keeps the primary thumb: the input resets `--_thumb-bg: var(--primary)` on itself, overriding the value inherited from `.ui-range[data-invalid]`/`:has(:user-invalid)`, and only `--_track-fill-color` is re-set on the input (`range.css:193-198,209,300-303`)
  > Fix
  - Fixed: `--_thumb-bg` and `--_thumb-highlight-color` for invalid ranges are set on the input, next to `--_track-fill-color`, and removed from the root where the input overrode them.
- [x] (6) Astro TextField/Textarea spread extra attributes onto the `<label>` (Vue binds `$attrs` to the input), so `autocomplete`, `readonly`, `pattern` and `aria-*` can't reach the input (`TextField.astro:51`, `Textarea.astro:48`)
  > Fix
  - Fixed: extra attributes go to the `<input>`/`<textarea>` in Astro, like Vue. `class` and `style` stay on the root `<label>` in both frameworks (Vue used to put `style` on the input), `id` stays on the input. A passed `aria-describedby` is merged with the end text id in both (Vue's `$attrs` used to overwrite it). The `Attributes` drift files are gone. The Astro types are now input/textarea attributes instead of label attributes.
- [x] (7) Cards clip long unbroken words instead of wrapping them (`layout` UnevenGrid)
  - Fixed: cards have `overflow-wrap: break-word` and `min-inline-size: 0`, so they also stop growing their grid column.
- [?] (7) Rich text tables break short words letter by letter: `overflow-wrap: anywhere` lowers the min-content width (`typography` EveryElement)
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
- [?] (9) Button with an icon and unwrapped text renders as icon-only (`padding-inline: 0`, square min size): `:has(> svg:only-child)` ignores text nodes, so v5 markup `<button><svg/>Save</button>` breaks, and MIGRATING doesn't mention it (`button.css:178-182`)
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

---

- [x] (10) Astro TextField, Textarea and Dialog still crash for package users: they destructure `Astro.locals.$id` directly instead of using `createId`, so a TextField/Textarea with end text or a Dialog with a `header` slot throws when no middleware sets `$id` (`TextField.astro:32`, `Textarea.astro:29`, `Dialog.astro:8`, `components/id.ts`)
  > Fix
  - Fixed: TextField, Textarea and Dialog use `createId(Astro.locals)`. No component reads `Astro.locals.$id` directly anymore.

## Docs

- [x] (2) Callout docs still say `role="note"` is added automatically (Astro, Vue) and tell HTML users to add it to the `article`, which axe flags as `aria-allowed-role`. Components and examples render `<article class="ui-callout">` without it (`src/docs/components/callout.astro:207-219`, `src/components/UnderTheHood/CalloutBuild.astro:22,149`)
  > Fix
  - Fixed: the Accessibility list says the Callout is an `<article>` (self-contained content) and not to add `role="note"`, on every framework. `CalloutBuild` drops `role="note"` from its code and preview, and its first note is now about `<article>`.
- [x] (2) Vue getting started has no preamble (empty meta/search description) and doesn't mention Vite + `@vitejs/plugin-vue` (`src/docs/guide/getting-started/Vue.astro:8-9`)
  > does it have to have vite? Should have to..... Also does it need a preamble? Otherwise just copy what the others have and adjust it, if needed, for Vue.
  - Fixed: same preamble as Astro, adjusted for Vue, so the meta and search descriptions aren't empty. Vite isn't required: the components ship as uncompiled `.vue` SFCs (with `lang="ts"`) and `.ts`, so any build with Vue SFC support works. The install section says that and names Vite with `@vitejs/plugin-vue`, Nuxt, and Astro with `@astrojs/vue` as examples.
- [x] (3) Sizes prose: the Button HTML text lists only `.ui-small` and `.ui-large` and skips `.ui-x-small` (the IconButton migration needs it). The Toggle text shows classes on Astro/Vue pages too, not a `Conditional` with the `size` prop (`button.astro:173-176`, `toggle.astro:140-143`)
  > Fix
  - Fixed: Button HTML text lists `.ui-x-small`, `.ui-small` and `.ui-large`. Toggle Sizes is a `Conditional`: the `size` prop (`x-small`, `small`, `large`) on Astro/Vue, classes on HTML.
- [x] (3) The "Text input API" table (HTML classes, no `source` and no `notes`) shows on Astro/Vue text-field pages and on `/astro/api` and `/vue/api`, with no note. The Text field API table already covers `autoFit` for those frameworks (`text-field.astro:68`, `component-api/text-input/api.ts`, `ApiTables.astro:28`)
  > Fix
  - Fixed: `text-field.astro` only adds the Text input API table on the HTML page. `text-input/api.ts` has Astro/Vue `notes` (CSS-only, the Text field component sets these with `autoFit`, `filled` and `size`), shown on `/astro/api` and `/vue/api`, like Spinner and Typography.
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
- [?] (4) `.ui-link` isn't documented anywhere (`link.css`)
  > Explain further
  > what do you recommend? Don't feel like it deserves it's own docs page really.
  - Agree, it doesn't need its own page. It's a single class for links outside `.ui-rich-text`, where `a[href]` is already styled the same way. Recommendation: a "Link" `h3` in Typography's "Class-based" section, plus a row in "Inline text elements":
    ```html
    <p>Read the <a class="ui-link" href="/guide">guide</a> first.</p>
    ```
    Text: "Use `.ui-link` for links outside `.ui-rich-text`. Inside rich text, links get the same style without a class. Hover and focus change the color." (The hover color has a contrast issue, see the Link hover item.)
  - Also: add `.ui-link` to `src/component-api/typography/api.ts` (`Inline` values or its own `Link` group), and list `link.css` in the Typography installation tabs, since it's a separate file.
- [?] (4) CDN snippets aren't pinned to a major: use `opui-css@6` (`getting-started/HTML.astro:126`, `packages/opui/README.md:88`, `skills/opui/SKILL.md:15`, `skills/opui/references/html/getting-started.md:156`, `src/integrations/llms.mjs:40`)
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
- [x] (5) Hand-written API tables left: Spinner, Text input, Toast, Typography
  > They're probably unique and that's why but if they can be not hand written then make it so (if the solution is elegant and scalable).
  - Done for Spinner, Text input and Typography: they're `api.ts` files now. `source` is optional for CSS-only components, which show the HTML tables in every framework plus a note (for example "no Astro component"). Their CSS variables tables come from `css`.
  - Toast stays hand-written, since toasts are on hold. It fits the same model later: `[data-severity]` and `[data-duration]` as attribute options.
- [x] (5) ButtonGroup installation tabs miss the `button.css` dependency (`button-group.astro:41-43`)
  > Fix
  - Fixed: `button.css` tab with `isDependency: true`, like Menu's `list.css`.
- [x] (6) CHANGELOG Unreleased leaves out breaking changes or files them outside Breaking. Missing: `.ui-icon-only` removed, Astro/Vue `Button` no longer adds `.ui-disabled`, Anchor/Tooltip hover `interestfor` wrapper removed. Filed elsewhere: Tabs restyle with `--_accent-color`/`--_bg-color` removed and new panel margin (Changed), Button padding scale and direct-child `> svg` icon sizing (Added), class-less rich text headings and heading sizes (Changed), `--focus-ring-color` unset (Fixed) (`CHANGELOG.md:7-14,25,31,65,67,74,106`)
  > Fix
  - Fixed, checked against 5.5.0 (`aeadad7d`): added to Breaking `.ui-icon-only` removed (it was in 5.5.0 `button.css`), Astro/Vue `Button` no longer adding `.ui-disabled` and the Anchor/Tooltip `<span interestfor>` wrapper removed (`318694ee`).
  - Moved to Breaking: Tabs restyle (now also naming the removed `--_accent-color`/`--_bg-color`, their replacements and the new `--size-2` panel margin), the Button padding scale and direct-child `> svg` sizing (with old and new padding values), class-less rich text headings, heading sizes, and `--focus-ring-color` no longer set by `theme.css`.
- [x] (6) Accordion API table shows `.ui-marker-rotate` as the default on the HTML page, but in HTML no marker class means no animation (`src/component-api/accordion/api.ts:22`, `src/component-api/rows.ts:34-43`)
  > Fix
  - Fixed: `ApiOption` takes `htmlDefault` (`null` = no default in HTML), read by `htmlDefault()` in `rows.ts`. The accordion `markerAnimation` option sets `htmlDefault: null`, so the HTML Marker row shows `-` while Astro/Vue keep `"rotate"`.
- [x] (7) MIGRATING v5→v6 still misses: Accordion marker class (`.ui-marker-rotate`), the default chevron in Astro/Vue (doubles custom chevrons), Checkbox/Chip/Radio private variable renames, List `divided` → `bordered`, Tabs restyle, Anchor/Tooltip `interestfor` wrapper, `.ui-icon-only` removed, class-less rich text headings and sizes, the new `components.prose` layer, `--focus-ring-color`. "see the v4 → v5 section at the top of this file" is stale, that section isn't at the top (`MIGRATING.md:1-38,157`)
  > Fix
  - Fixed: added, each with a diff or table: `.ui-icon-only` removed, direct-child `svg` and padding, Astro/Vue `Button` without `.ui-disabled`, Accordion marker class, the default chevron (move it to the `marker` slot), Checkbox/Chip/Radio private variable renames, List `divided` → `bordered`, the Tabs restyle, the Anchor/Tooltip `interestfor`, class-less rich text headings and sizes, the `components.prose` layer and `--focus-ring-color`. Each was checked against the code.
  - The stale reference now links to [Migrating from v4 to v5](#migrating-from-v4-to-v5) "above".
- [x] (8) Changelog: `divided` removed from `List`, use `bordered` (#395). Removed after 5.5.0 and missing from Unreleased

## Limitations

- [x] (3) Carousel: vertical orientation
  - Added `.ui-vertical` / `orientation="vertical"`. It scrolls and snaps on the block axis, needs a height (`--_block-size`, default `24rem`), and supports buttons (`::scroll-button(block-start/end)`, rotated icons, also outside), markers and peek. Markers sit in a column at the inline end of the items, centered (anchored to the carousel, so they follow RTL). Docs section and example added.
  - Scroll and snap are checked in Chromium 141. The button positions aren't: Carousel buttons need Chromium 144+. Check them in the docs.
- [?] (7) Menu: arrow key navigation (needs JS or `focusgroup` when it ships)
  > what do you mean? explain.
  - Today a menu is a list of buttons, and each item is its own Tab stop. That's valid, and it's why we don't use `role="menu"`.
  - The ARIA menu pattern works differently: the whole menu is one Tab stop, arrow keys move between items, Home/End jump to the first and last, typing a letter jumps to a matching item, and Tab leaves the menu. Desktop apps behave like that and screen reader users expect it from `role="menu"`.
  - That "roving focus" needs JavaScript today (track the active item, move focus on keydown, toggle `tabindex`). [focusgroup](https://open-ui.org/components/scoped-focusgroup.explainer/) is a proposed HTML attribute that gives arrow key navigation without JS, e.g. `<menu focusgroup="menu">`. It's behind a flag in Chromium. When it ships we can add it to `Menu` and keep it HTML and CSS only.
  > Explain further and provide an example
  - Example added: today's menu next to a roving-focus menu (about 30 lines of JS). In the current menu, ↓ does nothing and Tab walks item by item. In the roving one, opening moves focus to the first item, ↓/↑ wrap, Home/End jump, a letter jumps to the next matching item, disabled items are skipped, and Tab leaves and closes the menu. Verified with Playwright key presses.
  - The JS keeps one item at `tabindex="0"` and the rest at `-1`, and moves focus on `keydown`:
    ```js
    const target = {
      ArrowDown: next,
      ArrowUp: previous,
      Home: first,
      End: last,
    }[event.key]
    for (const item of items) item.tabIndex = item === target ? 0 : -1
    target.focus()
    ```
    With that behavior in place, `role="menu"` / `role="menuitem"` (`li role="none"`) and `aria-haspopup="menu"` on the trigger become correct, so the example uses them. Without the JS they'd be wrong, which is why `Menu` doesn't use them today.
  - With `focusgroup` it's markup only, same as today plus one attribute (syntax from the explainer, may still change):
    ```html
    <menu class="ui-menu ui-list" id="actions" popover focusgroup="menu">
      <li><button type="button">Edit</button></li>
      <li><button type="button">Duplicate</button></li>
    </menu>
    ```

## Questions

- [x] (3) Section comments I added in `carousel.css` and `menu.css` (e.g. `/* Buttons */`): keep or remove per the no-new-comments rule?
  > keep. the comments I don't want are explainers. Headings like /* Buttons */ that make it easier to read the code are ok.

## Suggestions

- [x] (1) Stale types: `ToggleContext` is only re-exported, never used (`ToggleGroup/types.ts:14-17`, `types.svelte.ts:9`), `startText` slot is never rendered (`TextField/types.ts:20`, `Textarea/types.ts:19`), `headline`/`description` slots aren't rendered but show up in the Vue/Svelte/Solid slot types (`ListItem/types.ts:27,29`), Menu `Slots` is unused (`Menu/types.ts:20-22`). Unsorted destructuring in `Select.astro:7-20`, `Textarea.astro:7-24`, `TextField.astro:7-28`
  > Fix
  - Fixed: removed `ToggleContext` (`ToggleGroup/types.ts`, `types.svelte.ts`), the `startText` slot type (`TextField/types.ts`, `Textarea/types.ts`; the `startText` prop stays), the `headline`/`description` slots (`ListItem/types.ts`) and Menu `Slots`. Sorted the destructuring in `Select.astro`, `Textarea.astro` and `TextField.astro`.
- [x] (1) Tarball ships the internal `components/AGENTS.md` (`files` includes `components`, `packages/opui/package.json:36-49`)
  > Fix
  - Fixed: `"!components/AGENTS.md"` in `files`. Checked with `npm pack --dry-run` and `pnpm pack --dry-run`: it's no longer listed.
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
- [?] (2) Anchor sets `--_anchor-inset`, which no CSS reads (`Anchor.astro:19-30`, `Anchor.vue:12-23`, also `src/component-examples/badge/Alignment.html:5,45,66`)
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
- [?] (3) Docs sticky `h2` sets `container-name: sticky-heading` / `container-type: scroll-state`, but no `@container` rule uses it, and it has a hard-coded `max-inline-size: 555px` with a TODO comment (`Document.astro:449-456`)
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
- [x] (3) Vue exports `Description` next to `DescriptionListTerm`/`DescriptionListItem`, while Astro exports `DescriptionListDescription` (`packages/opui/vue/index.ts:14`, `packages/opui/astro/index.ts:15-19`)
  > Fix
  - Fixed: Vue exports `DescriptionListDescription`, like Astro. Examples and the API table use the new name. Breaking for Vue users importing `Description`.
- [x] (3) ListItem types allow `as="li"` through `as?: string` (renders `<li><li>`), and `class` is in the base types instead of the framework types (`ListItem/types.ts:3,20-23`)
  > Fix
  - Fixed: `as` is `"a" | "button" | "div"` (`href` requires `"a"` or no `as`), and `class` moved out of `ListItem/types.ts` (framework types already provide it). Astro, Svelte and Solid types no longer accept `as="li"`.
- [x] (4) No type exports from `opui-css/astro` / `opui-css/vue` (component `Props`, Menu `MenuItem`, Select `Item`) (`astro/index.ts`, `vue/index.ts`)
  > Fix
  - Fixed: both index files export the component `Props` types as `<Component>Props` (e.g. `ButtonProps`, `TabsTabProps`, `TableColumnProps`, `DescriptionListTermProps` in Astro), plus `MenuItem`, `SelectItem` and `ClassicSelectItem`, sorted.
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
- [] (4) Button `kbd` looks weird on Mac
- [] (6) Review `feat/pixel-style` (Pixel style switcher in theme drawer): check every component in light/dark, no flash on reload, Default unchanged vs main, logo font now uses `--font-heading`. Rebase may conflict in button-group.css and CHANGELOG.md
- [] (6) Test anatomy heroes in Firefox, Safari and with Windows fonts
- [x] (7) Check button changes in the browser: new padding scale, icon side padding with wrapped labels, icon sizing, icon-only, button groups
  > - keyboard on hover is buggy (the kbd disappears on outlined and tonal buttons; the kbd on outlined and tonal buttons don't inherit the button text color)
  - Fixed: the `kbd` color was `oklch(from currentColor …)`. Chromium resolved it once and didn't update it while the button's color transitioned on hover, so it kept the old color. It now inherits `color` and dims with `opacity: 0.8`, and the background is `color-mix()` with `currentColor`.
- [] (8) Test Menu and Carousel in Firefox and Safari (only checked in Chromium)
