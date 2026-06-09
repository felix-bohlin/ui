# Open Props UI

A CSS UI library exploring how next-gen HTML & CSS features can change the way we create components. Built on top of [Open Props](https://open-props.style/) and ships HTML, [Astro](https://astro.build/) and [Vue](https://vuejs.org/) components alongside framework-agnostic CSS.

- Docs: [open-props-ui.netlify.app](https://open-props-ui.netlify.app/)
- Source: [github.com/felix-bohlin/ui](https://github.com/felix-bohlin/ui)

## Install

```bash
pnpm add opui-css open-props
```

Peer dependencies:

- `astro` `^6` (only required if you use the Astro components)
- `open-props` `^1`

## Usage

### Astro components

```astro
---
import "opui-css/css/imports.css"
import { Button, Card } from "opui-css/astro"
---

<Card>
  <Button variant="primary">Click me</Button>
</Card>
```

### Plain HTML + CSS (no build step)

Drop a pre-bundled stylesheet into any page and use the documented class names:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css"
/>

<button class="ui-button ui-primary">Click me</button>
```

`dist/opui.css` is a single self-contained file (Open Props + normalize + theme + every component + utils, in the correct cascade layers). `dist/opui.components.css` is the same minus tokens and reset for users who already have those.

If you do have a bundler that resolves CSS `@import`s (Vite, Astro, webpack, …), import the source instead so you only ship what you use:

```css
@import "opui-css/css/imports.css"; /* same content as dist/opui.css */
@import "opui-css/css/components/button.css"; /* or pick à la carte */
```

### Cascade layers

The library defines this layer order:

```css
@layer openprops, theme, normalize, components.root, components.extended, utils;
```

Wrap your own styles in a layer above `utils` (or unlayered) to override.

## Entry points

| Import                              | What it gives you                             |
| ----------------------------------- | --------------------------------------------- |
| `opui-css`                          | Pre-bundled: everything in one file (default) |
| `opui-css/open-props`               | Pre-bundled: Open Props tokens only           |
| `opui-css/dist/opui.css`            | Same as default — explicit path               |
| `opui-css/dist/opui.components.css` | Pre-bundled: components only                  |
| `opui-css/dist/op.css`              | Same as `opui-css/open-props` — explicit path |
| `opui-css/css/imports.css`          | Source: everything (resolved by your bundler) |
| `opui-css/css/components.css`       | All component styles (no tokens / reset)      |
| `opui-css/css/components/*.css`     | One component at a time                       |
| `opui-css/core/normalize.css`       | CSS reset                                     |
| `opui-css/core/palette.css`         | Extra OKLCH palette                           |
| `opui-css/core/utils.css`           | Utility classes                               |
| `opui-css/astro`                    | All Astro components                          |
| `opui-css/components/*`             | Individual Astro component sources            |

## License

[MIT](./LICENSE) © Felix Bohlin
