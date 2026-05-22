# Migrating from v4 to v5

v5 prefixes every OPUI-owned class with `ui-`. The component prop API is unchanged; only the rendered class names change.

If you use the framework component (e.g. `<Button size="small" variant="outlined">`), you don't need to do anything — the component emits the prefixed classes for you.

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

The default export still resolves to a complete, ready-to-use stylesheet — just under a different filename. No code change needed unless you want one.

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

## 5. Pick a theme — there's only one

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

<Button variant="primary">Save</Button>
```

`astro` is an _optional_ peer — only required if you actually import from `opui-css/astro`. Pure-CSS consumers won't see a peer warning.

Astro components emit prefixed `ui-` classes (see the v4 → v5 section at the top of this file). Raw HTML and CSS overrides must use those prefixed names.

## 8. Cascade layers

v4 declares the layer order in `css/imports.css` / `dist/opui.css`:

```css
@layer openprops, normalize, theme, components.root, components.extended, utils;
```

Put your overrides in a later layer or unlayered. If your app already declared `@layer` with a different order, reconcile or import `dist/opui.components.css` and own the layer order yourself.

## 9. Copy/paste is still supported

The source files under `components/` and `css/components/` are unminified and free to vendor in — the license is unchanged (MIT).

## 10. Pinning v3

If you're not ready to migrate, pin the last v3 release:

```json
{ "dependencies": { "opui-css": "3.3.5" } }
```

v3 will not receive further updates.
