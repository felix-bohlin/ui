# Open Props UI

Design system. Components. Modern HTML & CSS.

HTML, [Astro](https://astro.build/), [React](https://react.dev/), [Svelte](https://svelte.dev/) and [Vue](https://vuejs.org/) components alongside framework-agnostic CSS. The theme tokens started from [Open Props](https://open-props.style/), and the components don't need it: it ships as an optional companion for your own CSS.

- Docs: [open-props-ui.netlify.app](https://open-props-ui.netlify.app/)
- Source: [github.com/felix-bohlin/ui](https://github.com/felix-bohlin/ui)

## Install

```bash
pnpm add opui-css
```

Peer dependencies:

- `astro` `^7` (only required if you use the Astro components)
- `open-props` `^1.7.23` (only required if you import `opui-css/open-props.css`, the Open Props source)
- `react` and `react-dom` `^19` (only required if you use the React components)
- `svelte` `^5.57` (only required if you use the Svelte components)
- `vue` `^3.5` (only required if you use the Vue components)

## Usage

### Astro components

Import the CSS once, in the layout every page uses, and the components where you need them:

```astro
---
import "opui-css/css/imports.css"
import { Button, Card } from "opui-css/astro"
---

<Card>
  <Button color="primary" variant="filled">Click me</Button>
</Card>
```

### React components

React components ship markup only, so import the CSS once in your app entry: a CSS file that `main.tsx` imports in Vite, or `app/globals.css`, which the root layout imports, in Next.js:

```css
@import "opui-css/css/imports.css";
```

```tsx
import { Button, Card } from "opui-css/react"

export default function App() {
  return (
    <Card>
      <Button color="primary" variant="filled">
        Click me
      </Button>
    </Card>
  )
}
```

Containers take parts, such as `CardHeader` and `DialogFooter`. Other slots are props: `children`, and camelCased names such as `endText`. Form controls take the native `value`/`defaultValue`, `checked`/`defaultChecked` and `onChange` props. Components that need context, state or effects (Anchor, Callout, Copy, Dialog, Drawer, FieldGroup, FieldLegend, Fieldset, Menu, NumberField, OneTimeCode, Range, Rating, Select, SelectAll, SortableTable, Tabs, TextField, Textarea, Toaster, ToggleButton and ToggleGroup, and the CheckboxInput, RadioInput and SwitchInput parts) are marked `"use client"`; the rest also render as React Server Components.

### Svelte components

Svelte components ship markup only, so import the CSS once in your app entry: a CSS file that `src/routes/+layout.svelte` imports in SvelteKit, or that `main.ts` imports in Vite:

```css
@import "opui-css/css/imports.css";
```

```svelte
<script lang="ts">
  import { Button, Card } from "opui-css/svelte"
</script>

<Card>
  <Button color="primary" variant="filled">Click me</Button>
</Card>
```

### Vue components

Vue components ship markup only, so import the CSS once in your app entry: a CSS file that `main.ts` imports in Vite, or add `"opui-css/css/imports.css"` to the `css` array of `nuxt.config` in Nuxt:

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

`opui-css/react` and `opui-css/vue` export compiled JavaScript with `.d.ts` types, so they load in any bundler and in Node without extra configuration, on the server too, Next.js and Nuxt included. `opui-css/svelte` exports the `.svelte` files with their `.d.ts` types, which `@sveltejs/vite-plugin-svelte` compiles through the package's `svelte` export condition, in SvelteKit and in Vite alike. `opui-css/astro` exports the `.astro` sources, which Astro compiles.

The compiled files are ES modules for ES2022, and Node 22 and later can also `require()` them. A test runner that loads `node_modules` as CommonJS, such as Jest in its default setup, has to transform `opui-css` (Jest: leave it out of `transformIgnorePatterns`). Source maps and declaration maps point at the sources the package ships in `components/`, so stack traces and Go to Definition open the `.tsx`, `.vue` or `.svelte` file. The Vue components are compiled in production mode, so Vue doesn't warn at runtime when a prop has the wrong type; your type checker does.

#### One component at a time

`opui-css/components/Dialog/DialogTitle.react`, `opui-css/components/Dialog/DialogTitle.svelte` and `opui-css/components/Dialog/DialogTitle.vue` import one component or part. They resolve to the same compiled files and types as `opui-css/react`, `opui-css/svelte` and `opui-css/vue`, so a part imported on its own and its container imported from the entry point share one module and one context. Everything else in `opui-css/components/*`, the `.astro` files and the type files such as `types` and `types.astro`, is the source.

#### TypeScript

`opui-css/react`, `opui-css/svelte` and `opui-css/vue` ship `.d.ts` files, so `skipLibCheck` skips them and your `compilerOptions` only apply to your own code. They resolve with `moduleResolution: "bundler"`, `"node16"` or `"nodenext"` (not `"node10"`).

The Astro components import their `.ts` sources, which your `tsconfig.json` type-checks with your own `compilerOptions`. They are checked with `strict: true`, `verbatimModuleSyntax` and `isolatedModules`. `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` aren't checked, so they can report errors in the package, and `skipLibCheck` doesn't skip its `.ts` files.

#### Ids in Astro

Form fields, Tabs, ToggleGroup and the Dialog title read `Astro.locals.$id` when it exists and otherwise generate a random id per render. Components a trigger points at (Anchor, Copy, Dialog, Drawer, Menu, Toaster and Tooltip) need an `id` prop. For stable, per-request ids (useful for snapshot tests), define it in a middleware:

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

Add `/// <reference types="opui-css/env.d.ts" />` to `src/env.d.ts` to type `$id` and the `interestfor` attribute on `<a>` and `<button>`. New Astro projects don't have that file, so create it; the `tsconfig.json` of a new project already includes it.

#### Astro runtime

The Astro components pass settings to their parts with `AsyncLocalStorage` (`node:async_hooks`), so they run on Node, Deno and Bun. On Cloudflare, enable the `nodejs_compat` compatibility flag.

### Plain HTML + CSS (no build step)

Drop a pre-bundled stylesheet into any page and use the documented class names:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/opui-css@6/dist/opui.css"
/>

<button class="ui-button ui-primary">Click me</button>
```

`dist/opui.css` is a single self-contained file (Open Props + palette + theme + normalize + every component + browser fallbacks + utils, in the correct cascade layers). `dist/opui.components.css` has only the layer order, the component styles, their browser fallbacks and the `Layout` classes. The components need `core/palette.css` and `css/theme.css` to look right and `core/normalize.css`, or a reset that makes every box `border-box`, to size right, and `core/utils.css` holds `.ui-sr-only` and the motion and contrast classes, so load those yourself when you use it. Nothing in the package reads Open Props: `theme.css` holds its own values, and Open Props is in the bundle for your own CSS.

The browser fallbacks are the `components.compat` layer. A feature test only applies in browsers without the feature, and an engine fix, like the iOS submenu anchor, applies in that engine until it's removed. `dist/opui.no-compat.css` is `dist/opui.css` without them, and `dist/opui.baseline-<year>.css` keeps only the ones that browsers of that Baseline year need ([Compat layer](https://open-props-ui.netlify.app/html/guide/browser-support/#compat)).

If you do have a bundler that resolves CSS `@import`s (Vite, Astro, webpack, …), import the source instead so you only ship what you use:

```css
@import "opui-css/css/imports.css"; /* dist/opui.css without Open Props */
@import "opui-css/css/components/button.css"; /* or pick à la carte */
```

### Cascade layers

The library defines this layer order:

```css
@layer openprops, theme, normalize, components.prose, components.root, components.extended, components.compat, utils;
@layer theme.palette, theme.base, theme.custom, theme.severity;
```

Import `opui-css/css/layers.css` first to set this order when you import single files, and `opui-css/css/compat.css` after the components for the browser fallbacks.

Put your theme tokens in `@layer theme.custom`, which beats the defaults in `theme.base`. `theme.severity` comes after it and only holds the palette source of the severity classes, so a theme that sets `--ui-palette-source` doesn't recolor a `.ui-critical` on the same element. Wrap other overrides in a layer above `utils` (or unlayered).

### Builds that rewrite `light-dark()`

With their default browser targets, Vite 8 (also in SvelteKit and Nuxt) and Next 16 rewrite every `light-dark()` for browsers that lack it, and set the scheme from each plain `color-scheme` in the CSS. The colors still follow the OS, and `.ui-light` or `.ui-dark` on `html` forces a scheme. The `--ui-color-scheme` knob and `.ui-light` or `.ui-dark` on an element inside the page only work with `light-dark()` itself. Vite only rewrites it when it minifies a build, so a part of the page that switches in `vite dev` stops switching after `vite build`. For those, target browsers that have it:

```js
// vite.config, or under `vite` in nuxt.config
build: {
  cssTarget: ["chrome123", "edge123", "firefox120", "safari17.5"]
}
```

```js
// next.config
experimental: {
  lightningCssFeatures: {
    exclude: ["light-dark"]
  }
}
```

Vite 8's lightningcss also prints warnings such as `'scroll-button' is not recognized as a valid pseudo-element` for the Carousel's `::scroll-button()`, `::scroll-marker`, `::scroll-marker-group` and `:target-current`, once per CSS bundle and also when a page has no Carousel. It keeps the rules in the output, so the warnings are harmless, and they stop once lightningcss knows the selectors ([parcel-bundler/lightningcss#1321](https://github.com/parcel-bundler/lightningcss/pull/1321)).

## Upgrading

Breaking changes and how to update your code are in [MIGRATING.md](./MIGRATING.md) (also on the docs site: [Migrating to v6](https://open-props-ui.netlify.app/html/guide/migrating/)), with every change listed in [CHANGELOG.md](./CHANGELOG.md).

## Entry points

| Import                                   | What it gives you                                                                                                                                                                                                                                                                              |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `opui-css`                               | Pre-bundled: everything in one file (default)                                                                                                                                                                                                                                                  |
| `opui-css/open-props`                    | Pre-bundled: Open Props tokens only, for your own CSS (the components don't read them)                                                                                                                                                                                                         |
| `opui-css/open-props.css`                | Source: the Open Props imports (needs `open-props` installed)                                                                                                                                                                                                                                  |
| `opui-css/dist/opui.css`                 | Same as default - explicit path                                                                                                                                                                                                                                                                |
| `opui-css/dist/opui.baseline-<year>.css` | Pre-bundled: everything, with only the browser fallbacks that browsers of that Baseline year need                                                                                                                                                                                              |
| `opui-css/dist/opui.components.css`      | Pre-bundled: components only (no Open Props, palette, theme, reset or utils)                                                                                                                                                                                                                   |
| `opui-css/dist/opui.no-compat.css`       | Pre-bundled: everything but the browser fallbacks                                                                                                                                                                                                                                              |
| `opui-css/dist/op.css`                   | Same as `opui-css/open-props` - explicit path                                                                                                                                                                                                                                                  |
| `opui-css/css/imports.css`               | Source: everything but Open Props (resolved by your bundler)                                                                                                                                                                                                                                   |
| `opui-css/css/layers.css`                | `@layer` order only                                                                                                                                                                                                                                                                            |
| `opui-css/css/compat.css`                | All browser fallbacks, in the `components.compat` layer                                                                                                                                                                                                                                        |
| `opui-css/css/compat/*.css`              | The browser fallbacks of one component                                                                                                                                                                                                                                                         |
| `opui-css/css/components.css`            | All component styles (no Open Props, palette, theme, reset or utils)                                                                                                                                                                                                                           |
| `opui-css/css/components/*.css`          | One component at a time                                                                                                                                                                                                                                                                        |
| `opui-css/css/theme.css`                 | Theme tokens (colors, sizes, motion, state)                                                                                                                                                                                                                                                    |
| `opui-css/core/normalize.css`            | CSS reset                                                                                                                                                                                                                                                                                      |
| `opui-css/core/palette.css`              | OKLCH palette (required by the components)                                                                                                                                                                                                                                                     |
| `opui-css/core/utils.css`                | Utility classes                                                                                                                                                                                                                                                                                |
| `opui-css/css/js/checkbox.js`            | `activateIndeterminate()`, `initCheckbox()` and `syncIndeterminate()` for indeterminate checkboxes without a framework                                                                                                                                                                         |
| `opui-css/css/js/range.js`               | Keeps every `.ui-range` `<output data-live>` in sync with its slider without a framework, once imported                                                                                                                                                                                        |
| `opui-css/elements/*.js`                 | Custom elements, one module per component that needs one, like `number-field.js`                                                                                                                                                                                                               |
| `opui-css/themes/*`                      | Example themes (`bootstrap`, `brutalist`, `m3`, `shadcn`), with or without `.css`                                                                                                                                                                                                              |
| `opui-css/tokens.json`                   | Every theme token in the W3C design tokens format                                                                                                                                                                                                                                              |
| `opui-css/astro`                         | All Astro components                                                                                                                                                                                                                                                                           |
| `opui-css/react`                         | All React components, compiled, with their types                                                                                                                                                                                                                                               |
| `opui-css/svelte`                        | All Svelte components, with their types                                                                                                                                                                                                                                                        |
| `opui-css/vue`                           | All Vue components, compiled, with their types                                                                                                                                                                                                                                                 |
| `opui-css/components/*.react`            | One React component or part, such as `opui-css/components/Dialog/DialogTitle.react`: the compiled file `opui-css/react` exports, with its types                                                                                                                                                |
| `opui-css/components/*.svelte`           | One Svelte component or part: the file `opui-css/svelte` exports, with its types                                                                                                                                                                                                               |
| `opui-css/components/*.vue`              | One Vue component or part: the compiled file `opui-css/vue` exports, with its types                                                                                                                                                                                                            |
| `opui-css/components/*`                  | The Astro component sources and the type files, such as `types` and `types.astro`. The files at the top of `components/` (`cx.ts`, `dev.ts`, `group.ts`, `id.ts`, `style.ts`, `tag.ts`, `vue.ts`, `context.astro.ts` and `content.svelte`) are internal helpers that can change in any release |
| `opui-css/env.d.ts`                      | Astro types for `Astro.locals.$id` and `interestfor` (see [Ids in Astro](#ids-in-astro))                                                                                                                                                                                                       |
| `opui-css/package.json`                  | The package manifest, for tools that read it                                                                                                                                                                                                                                                   |

Importing a React component from `opui-css/components/*.react` skips the type augmentation in `opui-css/react`, which adds `command`, `commandfor` and `interestfor` to React's element types. `Menu` and `DrawerHeader` need it, so add `import type {} from "opui-css/react"` once in your app.

## Themes

Put your own tokens in `@layer theme.custom`, which beats the defaults and loses to everything else. Example themes ship in `themes/`: `bootstrap` (Bootstrap 5), `brutalist` (neobrutalism), `m3` (Material 3) and `shadcn` (shadcn/ui). They name their fonts (DM Sans, Roboto and Geist) but don't load them.

```css
@import "opui-css/css/imports.css";
@import "opui-css/themes/brutalist.css";
```

## Design tokens

`opui-css/tokens.json` lists every theme token in the [W3C design tokens](https://www.designtokens.org/) format: its `$type`, description and default as `$value`, and under `$extensions.opui` its CSS variable, tier (`role`, `component` or `hook`), contrast promise and dark and more-contrast values. A plain number, a `px` or `rem` length and an alias of another token are native values (`0.41`, `{"unit": "px", "value": 1}`, `{typography.ui-font-size-100}`) with the CSS beside them as `$extensions.opui.css`. Every other value is the CSS expression, since a color or size that follows another token or the color scheme has no single resolved value, so a design tool resolves those first. Tokens that are unset by default have no `$value`, only an `example`.

## AI assistants

The package ships an agent skill in `skills/opui`, with one reference per component for every framework, matching the installed version. Agents don't load skills from `node_modules` on their own, so copy it into your project:

```bash
npx opui-css skill
```

It writes `.claude/skills/opui` and prints the version it copied. Pass `--dir <path>` to copy it into another agent's skills folder (`<path>/opui`), and `--force` to replace an older copy after an upgrade. Without the command: `mkdir -p .claude/skills && cp -r node_modules/opui-css/skills/opui .claude/skills/opui`.

The docs are also available as [llms.txt](https://open-props-ui.netlify.app/llms.txt), and every docs page has a Markdown version, e.g. [/html/components/button.md](https://open-props-ui.netlify.app/html/components/button.md).

## License

[MIT](./LICENSE) © Felix Bohlin
