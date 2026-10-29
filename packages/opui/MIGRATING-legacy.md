# Older migration guides

The guides below are kept as they were written for v5.1, v5 and v4, with the names of those versions: theme tokens have no `--ui-` prefix (`--primary` is `--ui-primary` in v6) and the layer order has no `components.prose`. Follow [MIGRATING.md](./MIGRATING.md) for the v6 renames after them.

# Migrating from v5.0 to v5.1

In v5.1.0, the `critical` prop has been renamed to `error` on all form components (`TextField`, `Checkbox`, `Radio`, `Switch`, `Select`, `ClassicSelect`, `Textarea`).

```diff
- <TextField critical label="Name" />
+ <TextField error label="Name" />
```

Note: Components that use `critical` for severity styling (such as `Button`, `Callout`, `Badge`) still use the `critical` prop.

# Migrating from v4 to v5

v5 prefixes every OPUI-owned class with `ui-`. The component props are unchanged apart from the changes at the end of this section, and the components render the prefixed classes.

If you use the framework component (e.g. `<Button size="small" variant="outlined">`), the component emits the prefixed classes for you.

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

CSS custom properties (`--primary`, `--surface-default`, `--size-3`, …) are unchanged in v5. They are renamed in v6, see [Theme and tokens](./MIGRATING.md#theme-and-tokens).

These changes in 5.0.0 and 5.0.1 need a code change too:

- `Avatar` no longer takes `spacing`, and the group gap classes that went with it are removed.
- `ToggleButton` no longer adds an unprefixed `selected` class when pressed. Style the checked input instead, e.g. `.ui-toggle-button:has(input:checked)`.
- `Progress` (5.0.1): `.ui-progress` and its variant classes (`.ui-default`, `.ui-filled`, `.ui-tonal`) go on a wrapper `<div>` around `<progress>`. The Astro component renders the wrapper.

```diff
- <progress class="ui-progress ui-tonal" value="60" max="100"></progress>
+ <div class="ui-progress ui-tonal">
+   <progress value="60" max="100"></progress>
+ </div>
```

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

`theme-one` and `theme-two` are removed. The shipped theme lives in `css/theme.css`. To customise, override variables in a layer (v4 names, `--primary` is `--ui-primary` in v6):

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

v4 declares the layer order in `css/imports.css` / `dist/opui.css` (v6 adds `components.prose` before `components.root`, see [Typography and rich text](./MIGRATING.md#typography-and-rich-text)):

```css
@layer openprops, theme, normalize, components.root, components.extended, utils;
```

Put your overrides in a later layer or unlayered. If your app already declared `@layer` with a different order, reconcile or import `dist/opui.components.css` and own the layer order yourself.

## 9. Copy/paste is still supported

The source files under `components/` and `css/components/` are unminified and free to vendor in - the license is unchanged (MIT).

## 10. Card and Dialog `actionsAlign` (4.1.0)

The Astro `Card` and `Dialog` no longer take an `actions` prop with an `align` field. Set the `actionsAlign` prop (`"start"` or `"end"`) instead.

## 11. Pinning v3

If you're not ready to migrate, pin the last v3 release:

```json
{ "dependencies": { "opui-css": "3.3.5" } }
```

v3 will not receive further updates.
