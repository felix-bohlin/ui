# Migrating from v5 to v6

`IconButton` is removed. `Button` covers it: a button whose only child is an `svg` is square, `rounded` makes it a circle and `ripple` gives it the hover halo. `IconButton`'s default size matches `size="small"`, and its `small` matches `x-small`.

```diff
- <IconButton aria-label="Edit">
+ <Button ripple rounded size="small" aria-label="Edit">
```

```diff
- <button class="ui-icon-button ui-small">
+ <button class="ui-button ui-rounded ui-ripple ui-x-small">
```

`icon-button.css` is gone, so drop its import if you import single component files.

`TextField` and `Textarea` take a `size` prop like `Select`, with `x-small`, `small` and `large`.

```diff
- <TextField small label="Name" />
+ <TextField size="small" label="Name" />
```

`Switch` takes `size="small"` instead of `small` too.

```diff
- <Switch small>Notifications</Switch>
+ <Switch size="small">Notifications</Switch>
```

`ButtonGroup` variants apply to the whole group. Move a variant from a button inside a group to the group.

```diff
- <div role="group" class="ui-button-group">
-   <button class="ui-button ui-outlined">One</button>
+ <div role="group" class="ui-button-group ui-outlined">
+   <button class="ui-button">One</button>
```

`.ui-icon-only` is removed. A `Button` whose only child is an `svg` is square, so drop the class.

```diff
- <button class="ui-button ui-icon-only" aria-label="Edit">
+ <button class="ui-button" aria-label="Edit">
```

`Button` icon styles only apply to a direct child `svg`. An icon nested in another element is no longer sized, so move it out. Button padding changed too: `x-small` is `1ex`, `small` `1.25ex` and `large` `2.5ex` (was `0.5ex`, `0.75ex` and `4ex`). Override `--_padding-inline` to restore the old values.

```diff
- <button class="ui-button"><span><svg>…</svg></span> Save</button>
+ <button class="ui-button"><svg>…</svg><span class="ui-text">Save</span></button>
```

Wrap the label in `<span class="ui-text">` when a `Button` has an icon. CSS can't see text nodes, so `<button class="ui-button"><svg>…</svg>Save</button>` has an `svg` as its only element and is styled as icon-only (square, no inline padding).

```diff
- <button class="ui-button"><svg>…</svg>Save</button>
+ <button class="ui-button"><svg>…</svg><span class="ui-text">Save</span></button>
```

`Button` in Astro and Vue no longer adds `.ui-disabled` to a disabled `<button>`. Target `:disabled` (or `[aria-disabled="true"]` for links) in your own styles.

```diff
- .ui-button.ui-disabled { /* override */ }
+ .ui-button:disabled { /* override */ }
```

`Accordion` markers only animate with a marker class. In HTML, add `.ui-marker-rotate` to keep the previous rotation, or use `.ui-marker-flip` or `.ui-marker-turn`. Astro and Vue default to `markerAnimation="rotate"`.

```diff
- <details class="ui-accordion">
+ <details class="ui-accordion ui-marker-rotate">
```

`Accordion` renders a chevron marker by default in Astro and Vue. If you put your own chevron in the `summary` slot, you get two: move it to the `marker` slot.

```diff
  <Accordion>
-   <Fragment slot="summary">Title <svg>…</svg></Fragment>
+   <Fragment slot="summary">Title</Fragment>
+   <svg slot="marker">…</svg>
  </Accordion>
```

`Checkbox`, `Chip` and `Radio` internal variables are private. Rename any overrides:

| v5                   | v6               |
| -------------------- | ---------------- |
| `--isLTR`, `--isRTL` | `--_dir-rtl`     |
| `--highlight-size`   | `--_ripple-size` |
| `--ripple` (`Chip`)  | `--_ripple`      |
| `--thumb-scale`      | `--_thumb-scale` |

`List` no longer takes `divided`. Use `bordered` (`.ui-bordered`).

```diff
- <List divided>
+ <List bordered>
```

`Tabs` are restyled as segmented controls. `--_accent-color` and `--_bg-color` are gone: use `--_active-bg-color`, `--_active-text-color`, `--_indicator-color` and `--_track-color`, or a `variant` (`filled`, `line`, `outlined`). The open panel has a `--size-2` top margin, so remove any spacing you added above it.

```diff
- .ui-tabs { --_accent-color: var(--critical); }
+ .ui-tabs { --_active-text-color: var(--critical); }
```

`Tabs` are a radio group without tab roles. Remove `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls` and `aria-labelledby` from HTML tabs, and `panelId` (and `tabId` on the panel) from Astro and Vue. Styles that target `[role="tab"]` or `[role="tabpanel"]` need `.ui-tab-label` and `.ui-tab-panel`.

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

`FieldGroup` no longer sets `role="group"`. Inside a fieldset nothing changes. A FieldGroup without a fieldset can take `role` and `aria-label` itself. In HTML, drop `role="group"` from `.ui-field-group`.

```diff
  <fieldset class="ui-fieldset">
    <legend>Notifications</legend>
-   <div class="ui-field-group" role="group">…</div>
+   <div class="ui-field-group">…</div>
  </fieldset>
```

`Anchor` with `trigger="hover"` and `Tooltip` no longer wrap the trigger in a `<span interestfor>`. Give the anchor an `id` and add `interestfor` with that id to the trigger.

```diff
- <Tooltip label="Save your changes">
-   <Button>Save</Button>
+ <Tooltip label="Save your changes" id="save-tooltip">
+   <Button interestfor="save-tooltip">Save</Button>
  </Tooltip>
```

`Typography` rich text (`.ui-rich-text`) only styles headings without a class. Add a `.ui-h1`–`.ui-h6` class to a heading that has another class. `--font-size-h3` and `--font-size-h4` are fluid with higher minimums and `--font-size-h6` is `--font-size-1`, so check pages that rely on the old heading sizes.

```diff
- <h2 class="intro">Title</h2>
+ <h2 class="intro ui-h2">Title</h2>
```

Rich text styles live in a new `components.prose` layer, below `components.root`. If you declare the layer order yourself, add it:

```diff
- @layer openprops, theme, normalize, components.root, components.extended, utils;
+ @layer openprops, theme, normalize, components.prose, components.root, components.extended, utils;
```

`theme.css` no longer sets `--focus-ring-color` (it was `var(--primary)`). The global focus ring reads it now and keeps the inverted page background color while it's unset. If your styles read `var(--focus-ring-color)`, set it in your theme:

```css
@layer theme {
  :root {
    --focus-ring-color: var(--primary);
  }
}
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

The full list of renamed tokens is in [CHANGELOG.md](./CHANGELOG.md#500). Run a project-wide find/replace per token, then visually smoke test.

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
