# Migrating from v5 to v6

v6 has breaking changes for most components. If you only use the Astro or Vue components, most of them are prop renames. If you write the HTML yourself or override component styles, check the class and custom property changes too. The notes are sorted by component, followed by the theme, typography and package changes. Every change is listed in the [changelog](https://github.com/felix-bohlin/ui/blob/main/packages/opui/CHANGELOG.md).

## Accordion

Markers only animate with a marker class. In HTML, add `.ui-marker-rotate` to keep the previous rotation, or use `.ui-marker-flip` or `.ui-marker-turn`. Astro and Vue default to `markerAnimation="rotate"`.

```diff
- <details class="ui-accordion">
+ <details class="ui-accordion ui-marker-rotate">
```

Astro and Vue render a chevron marker by default. If you put your own chevron in the `summary` slot, you get two: move it to the `marker` slot.

```diff
  <Accordion>
-   <Fragment slot="summary">Title <svg>…</svg></Fragment>
+   <Fragment slot="summary">Title</Fragment>
+   <svg slot="marker">…</svg>
  </Accordion>
```

## Anchor

`Anchor` with `trigger="hover"` no longer wraps the trigger in a `<span interestfor>`. Give the anchor an `id` and add `interestfor` with that id to the trigger, like `Tooltip`.

## Avatar

`alt` is required when `src` is set (types). Use `alt=""` for decorative images.

`Avatar` with `as="button"` renders `type="button"` by default in Astro and Vue, so it no longer submits a form. Pass `type="submit"` if it should.

Text uses `--primary-contrast`, and sizes follow `--control-size` and `--button-size-*`.

## Badge

Text uses `--primary-contrast`.

## Button

`.ui-icon-only` is removed. A `Button` whose only child is an `svg` is square, so drop the class.

```diff
- <button class="ui-button ui-icon-only" aria-label="Edit">
+ <button class="ui-button" aria-label="Edit">
```

Icon styles only apply to a direct child `svg`. An icon nested in another element is no longer sized, so move it out. Button padding changed too: `x-small` is `1ex`, `small` `1.25ex` and `large` `2.5ex` (was `0.5ex`, `0.75ex` and `4ex`). Override `--_padding-inline` to restore the old values.

```diff
- <button class="ui-button"><span><svg>…</svg></span> Save</button>
+ <button class="ui-button"><svg>…</svg><span class="ui-text">Save</span></button>
```

Wrap the label in `<span class="ui-text">` when a `Button` has an icon. CSS can't see text nodes, so `<button class="ui-button"><svg>…</svg>Save</button>` has an `svg` as its only element and is styled as icon-only (square, no inline padding).

```diff
- <button class="ui-button"><svg>…</svg>Save</button>
+ <button class="ui-button"><svg>…</svg><span class="ui-text">Save</span></button>
```

In Astro and Vue, `Button` no longer adds `.ui-disabled` to a disabled `<button>`. It sets `disabled`, and `aria-disabled="true"` on links. Target `:disabled` (or `[aria-disabled="true"]` for links) in your own styles.

```diff
- .ui-button.ui-disabled { /* override */ }
+ .ui-button:disabled { /* override */ }
```

In Astro and Vue, `Button` renders `type="button"` by default, so it no longer submits a form. Pass `type="submit"` for submit buttons.

```diff
- <Button>Save</Button>
+ <Button type="submit">Save</Button>
```

Colors changed: critical buttons keep light text on their fill, tonal primary and critical buttons use dark text on a light container in light mode and light text on a dark container in dark mode, and text and outlined buttons use a lighter accent for text in dark mode.

## Button group

Variants apply to the whole group. Move a variant from a button inside a group to the group.

```diff
- <div role="group" class="ui-button-group">
-   <button class="ui-button ui-outlined">One</button>
+ <div role="group" class="ui-button-group ui-outlined">
+   <button class="ui-button">One</button>
```

Groups wrap onto more rows when they don't fit, instead of overflowing. Use `scrollable` (`.ui-scrollable`) or `shrink` (`.ui-shrink`) to keep them on one row. Small buttons are `--button-size-small` (32px) instead of 30px.

## Card

Tonal and elevated cards have a border in the page background color, so they stay visible on tonal surfaces. In dark mode, borders and field borders inside them use the page background too. Actions stick to the bottom of stretched cards and wrap.

## Checkbox

Internal variables are private. Rename any overrides:

| v5                   | v6               |
| -------------------- | ---------------- |
| `--isLTR`, `--isRTL` | `--_dir-rtl`     |
| `--highlight-size`   | `--_ripple-size` |
| `--thumb-scale`      | `--_thumb-scale` |

The root selector is wrapped in `:where()`, like other components, so your own selectors win more easily. The input lines up with the first line of the label. In dark mode the marker stays light on a darkened fill.

Without a visible label the checkbox aligns to the middle, so it centers in table cells. Give it a hidden label (`hideLabel`, or `.ui-sr-only` in HTML). Astro and Vue no longer render an empty `.ui-label` without a default slot, and warn in dev when there's no accessible name.

## Chip

The `--ripple` variable is private. Rename overrides to `--_ripple`.

`Chip` with `as="button"` renders `type="button"` by default in Astro and Vue. Pass `type="submit"` if it should submit a form.

Chips use `--border-radius` (8px) instead of Open Props `--radius-2` (5px), small chips are `--chip-size-small` (28px) instead of 24px, and labels truncate with an ellipsis unless the chip is `multiline`.

## Classic select

`ClassicSelect` no longer sets `aria-labelledby` or a label `id`. The wrapping `<label>` names the select, so `endText` is part of its accessible name, like `TextField`. The arrow is a chevron instead of a triangle.

## Description list

In Vue, the description part is exported as `DescriptionListDescription` instead of `Description`, like Astro.

```diff
- import { Description } from "opui-css/vue"
+ import { DescriptionListDescription } from "opui-css/vue"
```

## Dialog

Dialogs have a maximum height. The header and actions stay in place and the content scrolls. Dialogs also get a border in the page background color.

## Divider

A divider that is a direct child of a card has no margin, since the card's gap spaces it.

The variant classes drop the `border-` prefix. The `variant` prop is unchanged.

```diff
- <hr class="ui-divider ui-border-tonal" />
+ <hr class="ui-divider ui-tonal" />
```

`.ui-border-filled` and `.ui-border-primary` are `.ui-filled` and `.ui-primary`.

## Drawer

The backdrop dims and blurs like `Dialog`, through `--backdrop-color` and `--backdrop-blur`. `.ui-backdrop-transparent` still removes it. Header headings take the free space, so several header actions line up at the end.

## Field group and field set

`FieldGroup` no longer sets `role="group"`. Inside a fieldset nothing changes. A `FieldGroup` without a fieldset can take `role` and `aria-label` itself. In HTML, drop `role="group"` from `.ui-field-group`.

```diff
  <fieldset class="ui-fieldset">
    <legend>Notifications</legend>
-   <div class="ui-field-group" role="group">…</div>
+   <div class="ui-field-group">…</div>
  </fieldset>
```

`FieldSet` with another element in `as` gets `role="group"`.

## Icon button

`IconButton` is removed. `Button` covers it: a button whose only child is an `svg` is square, `rounded` makes it a circle and `ripple` gives it the hover halo. The old default size (28px) is `size="x-small"`. The old `small` (20px) has no preset: use `x-small` with `--_min-height: var(--size-4)`.

```diff
- <IconButton aria-label="Edit">
+ <Button ripple rounded size="x-small" aria-label="Edit">
```

```diff
- <button class="ui-icon-button">
+ <button class="ui-button ui-rounded ui-ripple ui-x-small">
```

Icons are smaller than before. Set `--_icon-size: var(--size-5)` to get the old 24px back. The icon color is the button's accent instead of the inherited text color.

`icon-button.css` is gone, so drop its import if you import single component files.

## List

`List` no longer takes `divided`. Use `bordered` (`.ui-bordered`).

```diff
- <List divided>
+ <List bordered>
```

Only direct `li`/`option` children (and options in a `[role="group"]`) are styled as rows, so nested lists inside a row stay normal lists. Headings and paragraphs in `.ui-text` have no margin. Dense rows keep the default inline padding, sizes follow `--control-size`, and rich text links in a list are `--primary-dark` in light mode.

`variant="default"` (`.ui-default`, the page surface) is gone. On the page, `transparent` looks the same. Without a variant a list is filled.

```diff
- <List variant="default" />
+ <List variant="transparent" />
```

```diff
- <ul class="ui-list ui-default">
+ <ul class="ui-list ui-transparent">
```

## List item

`as` only accepts `"a"`, `"button"` or `"div"` (types).

## Menu

Critical items keep readable text in light and dark mode, like `Button`. The menu has a subtle light gray border in dark mode, is capped to the space on its side and only flips when that side has less than `12rem`.

## Progress

Without a visible label the progress bar aligns to the middle. Give it a hidden label (`.ui-sr-only` in HTML).

`variant="default"` (`.ui-default`, the page surface) is gone. Use no variant, `filled` or `tonal`.

```diff
- <Progress variant="default" />
+ <Progress variant="tonal" />
```

```diff
- <div class="ui-progress ui-default">
+ <div class="ui-progress ui-tonal">
```

## Radio

Internal variables are private. Rename any overrides:

| v5                   | v6               |
| -------------------- | ---------------- |
| `--isLTR`, `--isRTL` | `--_dir-rtl`     |
| `--highlight-size`   | `--_ripple-size` |
| `--thumb-scale`      | `--_thumb-scale` |

Radios are `--choice-size` (20px) like `Checkbox`, instead of 18px. The root selector is wrapped in `:where()`, the input lines up with the first line of the label, and the marker stays light on a darkened fill in dark mode.

Without a visible label the radio aligns to the middle. Give it a hidden label (`hideLabel`, or `.ui-sr-only` in HTML). Astro and Vue no longer render an empty `.ui-label` without a default slot.

## Range

Astro and Vue no longer set `--_track-fill` from script. The track fill is a scroll-driven animation in CSS, so remove any script that sets it.

With `spread`, the label and the range split the container into equal columns, and the fixed `25ch` minimum is gone. The invalid state uses `--invalid-color`.

`variant="default"` (`.ui-default`, the page surface) is gone. Use no variant, `filled` or `tonal`.

```diff
- <Range variant="default" />
+ <Range variant="tonal" />
```

```diff
- <label class="ui-range ui-default">
+ <label class="ui-range ui-tonal">
```

## Select

Astro and Vue no longer generate an `id` for the select. Pass `id` when something outside the component references it.

With `spread`, label and field split the container into equal columns. Selects keep a `12ch` minimum width in table cells, and the arrow is a chevron instead of a triangle.

## Switch

`Switch` takes `size="small"` instead of `small`.

```diff
- <Switch small>Notifications</Switch>
+ <Switch size="small">Notifications</Switch>
```

The switch lines up with the first line of its label, keeps a light marker in dark mode and uses `--invalid-color` for the invalid state. Without a visible label it aligns to the middle, so give it a hidden label (`hideLabel`, or `.ui-sr-only` in HTML).

## Table

Dense cells have less block padding.

## Tabs

Tabs look like segmented controls: the tabs sit on a rounded track and the selected tab is a raised pill. `--_accent-color` and `--_bg-color` are gone: use `--_active-bg-color`, `--_active-text-color`, `--_indicator-color` and `--_track-color`, or a `variant` (`filled`, `line`, `outlined`). The open panel has a `--size-2` top margin, so remove any spacing you added above it.

```diff
- .ui-tabs { --_accent-color: var(--critical); }
+ .ui-tabs { --_active-text-color: var(--critical); }
```

Tabs are a radio group without tab roles. Remove `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls` and `aria-labelledby` from HTML tabs, and `panelId` (and `tabId` on the panel) from Astro and Vue. Styles that target `[role="tab"]` or `[role="tabpanel"]` need `.ui-tab-label` and `.ui-tab-panel`.

```diff
- <div class="ui-tabs" role="tablist">
-   <input type="radio" name="tabs" id="tab-1" class="ui-tab-input" aria-controls="panel-1" checked />
-   <label for="tab-1" class="ui-tab-label" role="tab">Profile</label>
-   <div id="panel-1" class="ui-tab-panel" role="tabpanel" aria-labelledby="tab-1">…</div>
+ <div class="ui-tabs">
+   <input type="radio" name="tabs" id="tab-1" class="ui-tab-input" checked />
+   <label for="tab-1" class="ui-tab-label">Profile</label>
+   <div class="ui-tab-panel">…</div>
```

Tabs that don't fit can stay on one row and scroll sideways with `scrollable` (`.ui-scrollable`).

## Text field

`TextField` takes a `size` prop like `Select`, with `x-small`, `small` and `large`.

```diff
- <TextField small label="Name" />
+ <TextField size="small" label="Name" />
```

Astro and Vue no longer generate an input `id`. Pass `id` when something outside the component references the input.

In Astro, extra attributes go to the `<input>` instead of the `<label>`. `class` and `style` stay on the label. In Vue, `style` now goes to the label instead of the input. Check selectors and tests that look for attributes on the label.

The `startText` slot is gone (it was never rendered). The `startText` prop stays.

With `spread`, label and field split the container into equal columns. Fields keep a `12ch` minimum width in table cells, the invalid state uses `--invalid-color`, and the auto-suggest arrow is a chevron with the `Select` arrow size.

The boolean `filled` is gone. Use `variant="filled"` like `Select`. The class is still `.ui-filled`.

```diff
- <TextField filled label="Name" />
+ <TextField variant="filled" label="Name" />
```

## Textarea

`Textarea` takes a `size` prop instead of `small`, like `TextField`.

```diff
- <Textarea small label="Message" />
+ <Textarea size="small" label="Message" />
```

Astro and Vue no longer generate an `id`, extra attributes go to the `<textarea>` in Astro (`class` and `style` stay on the label), and in Vue `style` goes to the label. The `startText` slot is gone, the prop stays.

The minimum height is three lines plus padding at every size (small was a fixed 64px). With `spread`, the fixed `30ch` minimum is gone and label and field split the container into equal columns. Textareas keep a `12ch` minimum width in table cells.

The boolean `filled` is gone. Use `variant="filled"` like `Select`. The class is still `.ui-filled`.

```diff
- <Textarea filled label="Name" />
+ <Textarea variant="filled" label="Name" />
```

## Toast

Severity icons are masks filled with `--success`, `--info`, `--warning` and `--critical` instead of hardcoded hex colors. `Toast` is still HTML only, as in v5.5.

The keyframes are `ui-toast-enter`, `ui-toast-hold` and `ui-toast-exit`, and `toast.js` listens for `ui-toast-exit`. Rename them if your CSS or scripts reference `toast-enter`, `toast-hold` or `toast-exit`.

## Toggle button and toggle group

Text shrinks with the size like `Button`: `--font-size-05` when small and `--font-size-0` when x-small. Groups wrap onto more rows when they don't fit; use `scrollable` or `shrink` to keep them on one row.

`ToggleGroup` no longer exports the unused `ToggleContext` type.

## Tooltip

`Tooltip` no longer wraps the trigger in a `<span interestfor>`. Give the tooltip an `id` (now required in the types) and add `interestfor` with that id to the trigger.

```diff
- <Tooltip label="Save your changes">
-   <Button>Save</Button>
+ <Tooltip label="Save your changes" id="save-tooltip">
+   <Button interestfor="save-tooltip">Save</Button>
  </Tooltip>
```

Tooltips use `--surface-inverse` and `--text-inverse`, and tooltips with an arrow shift along the edge like other tooltips.

## Theme and tokens

`theme.css` no longer sets `--focus-ring-color` (it was `var(--primary)`). The global focus ring reads it now and keeps the inverted page background color while it's unset. If your styles read `var(--focus-ring-color)`, set it in your theme:

```css
@layer theme {
  :root {
    --focus-ring-color: var(--primary);
  }
}
```

`--primary` is `--color-9` in light mode and `--color-6` in dark mode, and `--primary-contrast` is derived from `--primary` with relative color. If you set your own `--primary`, its text color now follows it.

`palette.css` no longer registers `--color-*`, `--gray-*`, `--palette-source` and `--palette-hue` with `@property`, so they can't be animated as colors anymore.

`--motion` and its `prefers-reduced-motion` default moved from `core/normalize.css` to `theme.css`, and the `.ui-motion-*` classes moved to `core/utils.css`. `theme.css` also declares `--palette-hue-rotate-by`, `--gray-hue` and `--gray-chroma`. If you import single files, import `theme.css` and `utils.css` too.

Component borders read `--border-width` (`Accordion`, `ButtonGroup`, `Callout`, `Card`, `Chip`, `DescriptionList`, `List`, `Table`, `ToggleButton`, `ToggleGroup`) and `--field-border-width` (`Checkbox`, `Radio`, `Switch`, `TextField`) instead of a hardcoded `1px`.

Links (`.ui-link` and rich text links) darken in light mode and lighten in dark mode on hover and focus, and their underline gets `3px` thick.

Private custom properties (`--_*`) follow one scheme: `--_accent` for the accent color, `--_text-color` for text, `--_bg-color` for the component's own background (a sub-part keeps a prefix, like `--_thumb-bg-color`), `--_duration` and `--_ease` for motion, `--_size` and `--_min-height` for sizes. Rename them where you set them:

| Component                   | Old                                                                   | New                                                                |
| --------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Accordion                   | `--_transition`                                                       | `--_duration`                                                      |
| Accordion                   | `--_svg-transition`                                                   | removed, the chevron uses `--_duration` and `--_ease`              |
| Avatar                      | `--_color`                                                            | `--_text-color`                                                    |
| Avatar                      | `--_width`                                                            | `--_size`                                                          |
| Badge                       | `--_badge-inset-block`, `--_badge-inset-inline`                       | `--_inset-block`, `--_inset-inline`                                |
| Button                      | `--_color`, `--_color-contrast`, `--_color-tonal`                     | `--_accent`, `--_accent-contrast`, `--_accent-tonal`               |
| Callout                     | `--_color`                                                            | `--_text-color`                                                    |
| Callout                     | `--_outlined-color`                                                   | `--_outlined-text-color`                                           |
| Callout                     | `--_surface-bg`                                                       | `--_surface-bg-color`                                              |
| Card                        | `--_card-bg-color`                                                    | `--_bg-color`                                                      |
| Card                        | `--_card-border-color`                                                | `--_border-color`                                                  |
| Card                        | `--_card-border-width`                                                | `--_border-width`                                                  |
| Card                        | `--_card-shadow`                                                      | `--_shadow`                                                        |
| Card                        | `--_border-color` (outlined border)                                   | `--_outlined-border-color`                                         |
| Card                        | `--_bg-surface`, `--_bg-tonal`, `--_bg-elevated`                      | `--_surface-bg-color`, `--_tonal-bg-color`, `--_elevated-bg-color` |
| Chip                        | `--_color`                                                            | `--_text-color`                                                    |
| Drawer                      | `--_color`                                                            | `--_text-color`                                                    |
| Drawer                      | `--_transition-duration`, `--_transition-timing`                      | `--_duration`, `--_ease`                                           |
| List, Menu                  | `--_bg-color-hover`                                                   | `--_hover-bg-color`                                                |
| Menu                        | `--_transition-duration`                                              | `--_duration` (and `--_ease`)                                      |
| Progress                    | `--_accent-color`                                                     | `--_accent`                                                        |
| Range                       | `--_thumb-bg`                                                         | `--_thumb-bg-color`                                                |
| Switch                      | `--_accent-color`                                                     | `--_accent`                                                        |
| Switch                      | `--_transition-time`, `--_transition-tf`                              | `--_duration`, `--_ease`                                           |
| Table                       | `--_table-border-radius`                                              | `--_border-radius`                                                 |
| TextField, Textarea, Select | `--_accent-color`                                                     | `--_accent`                                                        |
| TextField, Textarea, Select | `--_height`                                                           | `--_min-height`                                                    |
| Toast                       | `--_anim-enter`, `--_anim-exit`                                       | `--_enter-duration`, `--_exit-duration`                            |
| Toast                       | `--_duration` (hold time)                                             | `--_hold-duration`                                                 |
| ToggleButton                | `--_button-bg-color`                                                  | `--_bg-color`                                                      |
| Tooltip                     | `--_tooltip-bg`, `--_tooltip-color`                                   | `--_bg-color`, `--_text-color`                                     |
| Tooltip                     | `--_tooltip-min-inline-size`, `--_tooltip-offset`, `--_tooltip-shift` | `--_min-inline-size`, `--_offset`, `--_shift`                      |

`--info` and `--blue` use `--hue-blue` (240), the same blue as the `.ui-info` palette, so info badges, toasts and callouts match. If you relied on the old cyan-ish blue (hue 210), set `--blue` in your theme.

## Typography and rich text

Rich text (`.ui-rich-text`) only styles headings without a class, like lists. Add a `.ui-h1`–`.ui-h6` class to a heading that has another class. Component parts such as the `Callout` title keep their own styles.

```diff
- <h2 class="intro">Title</h2>
+ <h2 class="intro ui-h2">Title</h2>
```

`--font-size-h3` is fluid with a higher minimum (`--font-size-3`), `--font-size-h4` scales between `--font-size-2` and `--font-size-3` instead of a fixed `--font-size-3`, and `--font-size-h6` is `--font-size-1`, so check pages that rely on the old heading sizes.

Rich text styles live in a new `components.prose` layer, below `components.root`, so component styles inside rich text win over prose styles. If you declare the layer order yourself, add it:

```diff
- @layer openprops, theme, normalize, components.root, components.extended, utils;
+ @layer openprops, theme, normalize, components.prose, components.root, components.extended, utils;
```

Spacing changed, so rich text pages look a bit different:

- Spacing derives from one flow space (`1.25em` of the body text) and snaps to `--rhythm-step`. Headings get more space above than below.
- Headings share one line height, `1em + 0.5rem` rounded to `--rhythm-step`, in rich text and in the `.ui-h1`–`.ui-h6` classes. Heading group subtitles snap to `--rhythm-step` too.
- Headings, `pre` and `small` scale with the inherited font size.
- List gutters are measured in `ch`, and bulleted and numbered list text starts at the same position.
- `sup` and `sub` are `0.75em` and no longer change the line height.
- Figure captions are muted and start-aligned under quotes, code blocks and tables.

Rich text tables scroll sideways in a narrow column instead of breaking words letter by letter, and a table with short content no longer stretches to full width.

## Package and imports

Import `opui-css/css/layers.css` first when you import single component files, so the layers keep their order:

```css
@import "opui-css/css/layers.css";
@import "opui-css/css/components/button.css";
```

# Migrating from v5.4 to v5.5

`Toast` is no longer exported from `opui-css/astro` or `opui-css/vue`. It is still available in HTML as an alpha: import `opui-css/css/components/toast.css` and `opui-css/css/js/toast.js`, and call `initToastManager()` once.

# Migrating from v5.0 to v5.1

In v5.1.0, the `critical` prop has been renamed to `error` on all form components (`TextField`, `Checkbox`, `Radio`, `Switch`, `Select`, `ClassicSelect`, `Textarea`).

```diff
- <TextField critical label="Name" />
+ <TextField error label="Name" />
```

Note: Components that use `critical` for severity styling (such as `Button`, `Callout`, `Badge`) still use the `critical` prop.

# Migrating from v4 to v5

v5 prefixes every OPUI-owned class with `ui-`. The component prop API is unchanged; only the rendered class names change.

If you use the framework component (e.g. `<Button size="small" variant="outlined">`), you don't need to do anything - the component emits the prefixed classes for you.

If you use raw HTML or write CSS that targets library classes, you must rename every reference:

```diff
- <button class="button outlined small">Save</button>
+ <button class="ui-button ui-outlined ui-small">Save</button>
```

```diff
- .button.filled { /* override */ }
+ .ui-button.ui-filled { /* override */ }
```

The full list of renamed tokens is in [CHANGELOG.md](./CHANGELOG.md#500---2026-05-21). Run a project-wide find/replace per token, then visually smoke test.

CSS custom properties (`--primary`, `--surface-default`, `--size-3`, …) are unchanged.

# Migrating from v3 to v4

v4 is a full re-platform.

## 1. `import "opui-css"` still works

The default export still resolves to a complete, ready-to-use stylesheet - just under a different filename. No code change needed unless you want one.

```diff
- import "opui-css"          // resolved to dist/theme-two/theme-two.css
+ import "opui-css"          // now resolves to dist/opui.css (single theme)
```

If you imported `theme-one` specifically, you need to either accept the new theme or vendor the v3 stylesheet into your repo:

```diff
- import "opui-css/theme-one"
- import "opui-css/theme-one/components"
+ import "opui-css"          // or your own override layer
```

## 2. `opui-css/open-props` is unchanged

```js
import "opui-css/open-props" // still points at compiled Open Props tokens
```

## 3. The other `dist/` subpaths

| v3                                       | v4                                  |
| ---------------------------------------- | ----------------------------------- |
| `opui-css/dist/theme-two/theme-two.css`  | `opui-css/dist/opui.css`            |
| `opui-css/dist/theme-two/components.css` | `opui-css/dist/opui.components.css` |
| `opui-css/dist/theme-one/theme-one.css`  | removed                             |
| `opui-css/dist/theme-one/components.css` | removed                             |
| `opui-css/dist/op.css`                   | `opui-css/dist/op.css` (unchanged)  |

## 4. Source layout moved

If you were importing from `src/`:

```diff
- @import "opui-css/src/components/button.css";
+ @import "opui-css/css/components/button.css";
```

The component CSS now lives under `css/`. The pre-bundled output stays in `dist/`.

## 5. Pick a theme - there's only one

`theme-one` and `theme-two` are removed. The shipped theme lives in `css/theme.css`. To customise, override variables in a layer:

```css
@layer theme {
  :root {
    --primary: oklch(60% 0.2 250);
  }
}
```

## 6. `open-props` is now a peer dependency

v3 had `open-props` as a regular dependency. v4 makes it a peer so you control the version:

```bash
pnpm add open-props
```

## 7. New: Astro components

```astro
---
import { Button, Dialog, Tabs } from "opui-css/astro"
---

<Button color="primary">Save</Button>
```

`astro` is an _optional_ peer - only required if you actually import from `opui-css/astro`. Pure-CSS consumers won't see a peer warning.

Astro components emit prefixed `ui-` classes (see [Migrating from v4 to v5](#migrating-from-v4-to-v5) above). Raw HTML and CSS overrides must use those prefixed names.

## 8. Cascade layers

v4 declares the layer order in `css/imports.css` / `dist/opui.css`:

```css
@layer openprops, theme, normalize, components.root, components.extended, utils;
```

Put your overrides in a later layer or unlayered. If your app already declared `@layer` with a different order, reconcile or import `dist/opui.components.css` and own the layer order yourself.

## 9. Copy/paste is still supported

The source files under `components/` and `css/components/` are unminified and free to vendor in - the license is unchanged (MIT).

## 10. Pinning v3

If you're not ready to migrate, pin the last v3 release:

```json
{ "dependencies": { "opui-css": "3.3.5" } }
```

v3 will not receive further updates.
