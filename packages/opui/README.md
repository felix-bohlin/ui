# Open Props UI

A CSS UI library exploring how next-gen HTML & CSS features can change the way we create components. Built on top of [Open Props](https://open-props.style/) and ships HTML, [Astro](https://astro.build/) and [Vue](https://vuejs.org/) components alongside framework-agnostic CSS.

- Docs: [open-props-ui.netlify.app](https://open-props-ui.netlify.app/)
- Source: [github.com/felix-bohlin/ui](https://github.com/felix-bohlin/ui)

## Install

```bash
pnpm add opui-css open-props
```

Peer dependencies:

- `astro` `^7` (only required if you use the Astro components)
- `open-props` `^1.7.23`
- `solid-js` `^1.9` (optional; only the Solid type files ship today, there are no Solid components yet)
- `svelte` `^5` (optional; only the Svelte type files ship today, there are no Svelte components yet)
- `vue` `^3.5` (only required if you use the Vue components)

Every component folder also ships `types.solid.ts` and `types.svelte.ts` for projects that port the markup to Solid or Svelte.

## Usage

### Astro components

```astro
---
import "opui-css/css/imports.css"
import { Button, Card } from "opui-css/astro"
---

<Card>
  <Button color="primary" variant="filled">Click me</Button>
</Card>
```

### Vue components

Vue components ship markup only, so import the CSS once in your app entry:

```css
@import "opui-css/css/imports.css";
```

```vue
<script setup lang="ts">
import { Button, Card } from "opui-css/vue"
</script>

<template>
  <Card>
    <Button color="primary" variant="filled">Click me</Button>
  </Card>
</template>
```

Both `opui-css/astro` and `opui-css/vue` export uncompiled sources (`.astro`, `.vue`, `.ts`), so they need a bundler that compiles them, e.g. Astro or Vite with `@vitejs/plugin-vue`.

#### Ids in Astro

Components that link elements with ids (form fields, Tabs, Drawer, Menu, …) read `Astro.locals.$id` when it exists and otherwise generate a random id per render. For stable, per-request ids (useful for snapshot tests), define it in a middleware:

```ts
// src/middleware.ts
import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware((context, next) => {
  const counts = new Map<string, number>()
  context.locals.$id = (prefix) => {
    const count = (counts.get(prefix) ?? 0) + 1
    counts.set(prefix, count)
    return `${prefix}-${count}`
  }
  return next()
})
```

Add `/// <reference types="opui-css/env.d.ts" />` to your `env.d.ts` to type `$id`.

### Plain HTML + CSS (no build step)

Drop a pre-bundled stylesheet into any page and use the documented class names:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/opui-css@6/dist/opui.css"
/>

<button class="ui-button ui-primary">Click me</button>
```

`dist/opui.css` is a single self-contained file (Open Props + palette + theme + normalize + every component + utils, in the correct cascade layers). `dist/opui.components.css` has only the layer order and the component styles. The components need Open Props, `core/palette.css` and `css/theme.css` to look right, and `core/utils.css` holds `.ui-sr-only`, the motion and contrast classes and the `Checkbox`/`Radio` hover halo, so load those yourself when you use it.

If you do have a bundler that resolves CSS `@import`s (Vite, Astro, webpack, …), import the source instead so you only ship what you use:

```css
@import "opui-css/css/imports.css"; /* same content as dist/opui.css */
@import "opui-css/css/components/button.css"; /* or pick à la carte */
```

### Cascade layers

The library defines this layer order:

```css
@layer openprops, theme, normalize, components.prose, components.root, components.extended, utils;
```

Import `opui-css/css/layers.css` first to set this order when you import single files.

Wrap your own styles in a layer above `utils` (or unlayered) to override.

## Upgrading

Breaking changes and how to update your code are in [MIGRATING.md](./MIGRATING.md) (also on the docs site: [Migrating to v6](https://open-props-ui.netlify.app/html/guide/migrating/)), with every change listed in [CHANGELOG.md](./CHANGELOG.md).

## Entry points

| Import                              | What it gives you                                                            |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `opui-css`                          | Pre-bundled: everything in one file (default)                                |
| `opui-css/open-props`               | Pre-bundled: Open Props tokens only                                          |
| `opui-css/open-props.css`           | Source: the Open Props imports (needs `open-props` installed)                |
| `opui-css/dist/opui.css`            | Same as default - explicit path                                              |
| `opui-css/dist/opui.components.css` | Pre-bundled: components only (no Open Props, palette, theme, reset or utils) |
| `opui-css/dist/op.css`              | Same as `opui-css/open-props` - explicit path                                |
| `opui-css/css/imports.css`          | Source: everything (resolved by your bundler)                                |
| `opui-css/css/layers.css`           | `@layer` order only                                                          |
| `opui-css/css/components.css`       | All component styles (no Open Props, palette, theme, reset or utils)         |
| `opui-css/css/components/*.css`     | One component at a time                                                      |
| `opui-css/css/theme.css`            | Theme tokens (colors, sizes, motion, state)                                  |
| `opui-css/core/normalize.css`       | CSS reset                                                                    |
| `opui-css/core/palette.css`         | OKLCH palette (required by the components)                                   |
| `opui-css/core/utils.css`           | Utility classes                                                              |
| `opui-css/css/js/toast.js`          | `initToastManager()` and `showToast()` for the HTML Toast                    |
| `opui-css/css/js/checkbox.js`       | `activateIndeterminate()` for indeterminate checkboxes without a framework   |
| `opui-css/astro`                    | All Astro components                                                         |
| `opui-css/vue`                      | All Vue components                                                           |
| `opui-css/components/*`             | Individual Astro and Vue component sources                                   |

## AI assistants

The package ships an agent skill in `skills/opui` with a reference for every component, matching the installed version. Agents don't load skills from `node_modules` on their own, so copy it into your project:

```bash
mkdir -p .claude/skills && cp -r node_modules/opui-css/skills/opui .claude/skills/opui
```

Use the skills folder your agent reads from if it isn't Claude Code, or point your `AGENTS.md` at `node_modules/opui-css/skills/opui/SKILL.md`.

The docs are also available as [llms.txt](https://open-props-ui.netlify.app/llms.txt), and every docs page has a Markdown version, e.g. [/html/components/button.md](https://open-props-ui.netlify.app/html/components/button.md).

## License

[MIT](./LICENSE) © Felix Bohlin
