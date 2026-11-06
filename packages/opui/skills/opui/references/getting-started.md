# Getting started

Every framework needs the CSS. The HTML section covers the CDN file, the npm imports and the files to copy. The Astro, React, Svelte and Vue sections add their install, CSS import and component import steps.

## HTML

Add the CSS from the CDN, from npm or by copying the files, then write the class names.

Open Props UI is *just CSS*. You can copy any [component](https://open-props-ui.netlify.app/html/components.md) CSS straight from the docs - no install required. Each component page has its CSS under Installation, with the files it depends on and a button that copies them all. It reads tokens from `palette.css` and `theme.css`, so those need to be on the page too, after `layers.css` sets the layer order. `normalize.css` adds the focus ring and `utils.css` adds `.ui-sr-only` and the motion classes. The CDN link below has all of it in one file.

### Install via CDN

The quickest way to get going. One file with the theme, the reset, every component and the utility classes, in the right cascade layers, plus Open Props for your own CSS.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css@6/dist/opui.css" />
```

It includes the [browser fallbacks](https://open-props-ui.netlify.app/html/guide/browser-support.md#compat). `dist/opui.no-compat.css` leaves them out, and `dist/opui.baseline-<year>.css` keeps only the ones that browsers of that Baseline year need.

`@6` loads the newest 6.x release, so a new major version never changes your site. Pin an exact version, such as `@6.0.0`, for full control.

### Install via NPM

For when you have a bundler that resolves CSS `@import`s from `node_modules`, like Vite or webpack. No bundler? Use the CDN or install manually.

`pnpm`

```sh
pnpm add opui-css
```

`npm`

```sh
npm install opui-css
```

#### Import the CSS

Either import everything in your main CSS file:

```css
@import "opui-css/css/imports.css";
```

Or pick and choose the parts you want to include:

```css
@import "opui-css/css/layers.css";
@import "opui-css/core/palette.css";
@import "opui-css/css/theme.css";
@import "opui-css/core/normalize.css";
@import "opui-css/css/components/button.css";
@import "opui-css/css/components/choice.css";
@import "opui-css/css/components/checkbox.css";
@import "opui-css/css/compat.css";
@import "opui-css/core/utils.css";
```

Import `layers.css` first and `utils.css` last, it holds `.ui-sr-only` and the motion classes. Add `choice.css` with `checkbox.css`, `radio.css` or `switch.css`. Import `opui-css/css/components.css` instead of single component files to get every component. `compat.css` holds the [browser fallbacks](https://open-props-ui.netlify.app/html/guide/browser-support.md#compat), and you can leave it out.

### Install manually

The most flexible way to use OPUI, and it works without a build step. Download the package (`npm pack opui-css`, or browse it on [jsDelivr](https://cdn.jsdelivr.net/npm/opui-css@6/)) and drop these files into your project:

```text
opui
├─ core
│  ├─ normalize.css
│  ├─ palette.css
│  └─ utils.css
├─ css
│  ├─ compat
│  │  ├─ avatar.css
│  │  └─ ...
│  ├─ components
│  │  ├─ accordion.css
│  │  └─ ...
│  ├─ js
│  │  ├─ checkbox.js
│  │  └─ range.js
│  ├─ compat.css
│  ├─ components.css
│  ├─ imports.css
│  ├─ layers.css
│  └─ theme.css
├─ dist
│  ├─ op.css
│  ├─ opui.baseline-2023.css
│  ├─ ...
│  ├─ opui.components.css
│  ├─ opui.css
│  └─ opui.no-compat.css
├─ elements
│  ├─ number-field.js
│  └─ ...
├─ themes
│  ├─ bootstrap.css
│  ├─ brutalist.css
│  ├─ m3.css
│  └─ shadcn.css
├─ open-props.css
└─ tokens.json
```

`dist/op.css` is Open Props, pre-bundled in the `openprops` layer, and `open-props.css` imports it from `node_modules` for bundlers. The components don't read it, so both are optional and only there for your own CSS. `dist/opui.css` is the CDN file. `themes/` holds the [example themes](https://open-props-ui.netlify.app/html/guide/customizing.md#example-themes) and `tokens.json` the [design tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md#tokens-json).

Then import the files in your main CSS, in this order:

```css
@import "./opui/css/layers.css";

@import "./opui/core/palette.css";
@import "./opui/css/theme.css";
@import "./opui/core/normalize.css";
@import "./opui/css/components.css";
@import "./opui/css/compat.css";
@import "./opui/core/utils.css";
```

If your own CSS reads Open Props, import `./opui/dist/op.css` right after `layers.css`. Leave out `compat.css` if you don't need the browser fallbacks.

### Your first component

With the CSS on the page, a component is a class on the right element. The modifiers are classes too.

Two things need a bit of JavaScript in plain HTML: indeterminate checkboxes (`css/js/checkbox.js`) and the Range value (`css/js/range.js`). Import them in a `<script type="module">`, from `https://cdn.jsdelivr.net/npm/opui-css@6/css/js/` without a bundler. Components with a custom element, like the Number field, import theirs from `elements/` the same way.

The HTML examples on the component pages import these by package name, `opui-css/css/js/range.js` or `opui-css/elements/character-count.js`, which a bundler resolves. Without one, an import map in the `head`, before the first module script, points the package name at the CDN, so the examples run as you copy them:

```html
<script type="importmap">
  { "imports": { "opui-css/": "https://cdn.jsdelivr.net/npm/opui-css@6/" } }
</script>
```

[Concepts](https://open-props-ui.netlify.app/html/guide/concepts.md#javascript) shows the imports and explains the class names, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/html/components.md). [Theming](https://open-props-ui.netlify.app/html/guide/theming.md) covers colors, density, motion and contrast.

## Astro

OPUI ships first-class Astro components. Install the package, import what you need, and you're set.

### Install via NPM

The components ship as uncompiled `.astro` files, which Astro compiles as they are. They need Astro 7 or later.

### Import the CSS

Astro components ship markup only - the CSS still has to be imported once. The frontmatter of the layout every page uses is a good spot. Import everything:

```astro
---
import "opui-css/css/imports.css"
---
```

Or pick and choose in a CSS file, and import that file in the layout instead:

Same code as in the HTML section.

Import `layers.css` first and `utils.css` last, it holds `.ui-sr-only` and the motion classes. Add `choice.css` with `checkbox.css`, `radio.css` or `switch.css`. Import `opui-css/css/components.css` instead of single component files to get every component. `compat.css` holds the [browser fallbacks](https://open-props-ui.netlify.app/astro/guide/browser-support.md#compat), and you can leave it out.

```astro
---
import "../styles/global.css"
---
```

### How to use

```astro
---
import { Button } from "opui-css/astro"
---

<Button variant="filled">Click me</Button>
```

Containers take parts, such as `CardHeader` and `DialogFooter`. Other components take named slots for rich content, such as `end-text` on a `TextField`.

[Concepts](https://open-props-ui.netlify.app/astro/guide/concepts.md) explains how props map to classes, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/astro/components.md). [Theming](https://open-props-ui.netlify.app/astro/guide/theming.md) covers colors, density, motion and contrast.

### Server runtime

The components pass settings to their parts with `AsyncLocalStorage` from `node:async_hooks`, so they run on Node, Deno and Bun. On Cloudflare, enable the `nodejs_compat` compatibility flag.

#### Ids

Form fields, Tabs, ToggleGroup and the Dialog title read `Astro.locals.$id` when it exists and otherwise generate a random id per render. Components a trigger points at (Anchor, Copy, Dialog, Drawer, Menu, Toaster and Tooltip) need an `id` prop. For stable, per-request ids, useful for snapshot tests, define it in a middleware:

```ts
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

Add `/// <reference types="opui-css/env.d.ts" />` to your `env.d.ts` to type `$id` and the `interestfor` attribute on `a` and `button`.

## React

OPUI ships first-class React 19 components. Install the package, import what you need, and you're set.

### Install via NPM

The components ship as compiled JavaScript with their types, so they work in any React setup without extra configuration, Vite, Next.js and Astro with `@astrojs/react` included. They need React 19 or later, so add `react` and `react-dom` if they aren't installed yet.

### Import the CSS

React components ship markup only - the CSS still has to be imported once, in your root layout or the entry file that renders your app. Import everything:

```tsx
import "opui-css/css/imports.css"
```

Or pick and choose in a CSS file, and import that file in your entry instead:

Same code as in the HTML section.

Import `layers.css` first and `utils.css` last, it holds `.ui-sr-only` and the motion classes. Add `choice.css` with `checkbox.css`, `radio.css` or `switch.css`. Import `opui-css/css/components.css` instead of single component files to get every component. `compat.css` holds the [browser fallbacks](https://open-props-ui.netlify.app/react/guide/browser-support.md#compat), and you can leave it out.

```tsx
import "./styles/main.css"
```

### How to use

```tsx
import { Button } from "opui-css/react"

export default function App() {
  return <Button variant="filled">Click me</Button>
}
```

Containers take parts, such as `CardHeader` and `DialogFooter`. Other slots are props: the default slot is `children` and named slots are camelCased, such as `endText`. Form controls take the native `value` or `defaultValue`, `checked` or `defaultChecked`, and `onChange` props.

[Concepts](https://open-props-ui.netlify.app/react/guide/concepts.md) explains how props map to classes, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/react/components.md). [Theming](https://open-props-ui.netlify.app/react/guide/theming.md) covers colors, density, motion and contrast.

### Server rendering

Components that need context, state or effects are marked `"use client"`: `Anchor`, `Callout`, `Copy`, `Dialog`, `Drawer`, `FieldGroup`, `FieldLegend`, `Fieldset`, `Menu`, `NumberField`, `OneTimeCode`, `Range`, `Rating`, `Select`, `SelectAll`, `SortableTable`, `Tabs`, `TextField`, `Textarea`, `Toaster`, `ToggleButton` and `ToggleGroup`, and the `CheckboxInput`, `RadioInput` and `SwitchInput` parts. The rest also render as React Server Components. This list is read from the component sources.

Without hydration (Astro with `@astrojs/react` and no `client:*` directive, or `renderToString` on its own), every component renders complete HTML. The native controls work and submit with their form. A few things only update on the client:

- [Checkbox](https://open-props-ui.netlify.app/react/components/checkbox.md#indeterminate) `indeterminate`: it's a DOM property, so the box looks unchecked. Or import `opui-css/css/js/checkbox.js` in the page.
- [Range](https://open-props-ui.netlify.app/react/components/range.md#value) value: the `<output>` doesn't follow the thumb. The track fill is CSS, so it's fine.

Hydrate those (`client:load` in Astro) or render them on the client. Component pages say what needs hydration next to the browser support chips, and the API tables mark each prop with a crossed-out server icon.

## Svelte

OPUI ships first-class Svelte 5 components. Install the package, import what you need, and you're set.

### Install via NPM

The components ship as Svelte components (`.svelte`) with their types, so your build has to compile them. They need Svelte 5.57 or later, so add `svelte` if it isn't installed yet. Any setup with Svelte support works, for example SvelteKit, Vite with `@sveltejs/vite-plugin-svelte`, or Astro with `@astrojs/svelte`.

`@sveltejs/vite-plugin-svelte` compiles the components for server rendering too, in SvelteKit and in a Vite setup of your own alike: it picks up the package through its `svelte` export condition.

### Import the CSS

Svelte components ship markup only - the CSS still has to be imported once, in your root layout or the entry file that mounts your app. Import everything:

```svelte
<script lang="ts">
  import "opui-css/css/imports.css"

  let { children } = $props()
</script>

{@render children()}
```

Or pick and choose in a CSS file, and import that file in your layout instead:

Same code as in the HTML section.

Import `layers.css` first and `utils.css` last, it holds `.ui-sr-only` and the motion classes. Add `choice.css` with `checkbox.css`, `radio.css` or `switch.css`. Import `opui-css/css/components.css` instead of single component files to get every component. `compat.css` holds the [browser fallbacks](https://open-props-ui.netlify.app/svelte/guide/browser-support.md#compat), and you can leave it out.

```svelte
<script lang="ts">
  import "../styles/main.css"

  let { children } = $props()
</script>

{@render children()}
```

### How to use

```svelte
<script lang="ts">
  import { Button } from "opui-css/svelte"
</script>

<Button variant="filled">Click me</Button>
```

Containers take parts, such as `CardHeader` and `DialogFooter`. Other slots are snippets: the default slot is `children` and named slots are camelCased, such as `endText`. `TextField`, `Textarea`, `Select`, `Range`, `NumberField`, `OneTimeCode`, `Rating`, `Tabs` and `ToggleGroup` support `bind:value`. `Checkbox` and `Switch` support `bind:checked` and `bind:group`, `ToggleButton` supports `bind:checked`, and `Radio` supports `bind:group`.

[Concepts](https://open-props-ui.netlify.app/svelte/guide/concepts.md) explains how props map to classes, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/svelte/components.md). [Theming](https://open-props-ui.netlify.app/svelte/guide/theming.md) covers colors, density, motion and contrast.

### Server rendering

Without hydration (SvelteKit with `csr = false`, or Astro with `@astrojs/svelte` and no `client:*` directive), every component renders complete HTML. The native controls work and submit with their form. A few things only update on the client:

- [Checkbox](https://open-props-ui.netlify.app/svelte/components/checkbox.md#indeterminate) `indeterminate`: it's a DOM property, so the box looks unchecked. Or import `opui-css/css/js/checkbox.js` in the page.
- [Range](https://open-props-ui.netlify.app/svelte/components/range.md#value) value: the `<output>` doesn't follow the thumb. The track fill is CSS, so it's fine.
- `bind:` on [Checkbox](https://open-props-ui.netlify.app/svelte/components/checkbox.md), [Radio](https://open-props-ui.netlify.app/svelte/components/radio.md), [Range](https://open-props-ui.netlify.app/svelte/components/range.md), [Select](https://open-props-ui.netlify.app/svelte/components/select.md), [Switch](https://open-props-ui.netlify.app/svelte/components/switch.md), [Text field](https://open-props-ui.netlify.app/svelte/components/text-field.md) and [Textarea](https://open-props-ui.netlify.app/svelte/components/textarea.md): the bound state stays put. The native value still changes and submits.

Hydrate those (`client:load` in Astro) or keep client-side rendering on. Component pages say what needs hydration next to the browser support chips, and the API tables mark each prop with a crossed-out server icon.

## Vue

OPUI ships first-class Vue components. Install the package, import what you need, and you're set.

### Install via NPM

The components ship as compiled JavaScript with their types, so they work in any Vue setup without extra configuration, on the server too, Vite, Nuxt and Astro with `@astrojs/vue` included. They need Vue 3.5 or later, so add `vue` if it isn't installed yet.

### Import the CSS

Vue components ship markup only - the CSS still has to be imported once, in the entry file that creates your app. Import everything:

```ts
import { createApp } from "vue"
import "opui-css/css/imports.css"
import App from "./App.vue"

createApp(App).mount("#app")
```

Or pick and choose in a CSS file, and import that file in `main.ts` instead:

Same code as in the HTML section.

Import `layers.css` first and `utils.css` last, it holds `.ui-sr-only` and the motion classes. Add `choice.css` with `checkbox.css`, `radio.css` or `switch.css`. Import `opui-css/css/components.css` instead of single component files to get every component. `compat.css` holds the [browser fallbacks](https://open-props-ui.netlify.app/vue/guide/browser-support.md#compat), and you can leave it out.

In Nuxt, add the file to `css` in `nuxt.config.ts` instead.

```ts
import "./styles/main.css"
```

### How to use

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button variant="filled">Click me</Button>
</template>
```

[Concepts](https://open-props-ui.netlify.app/vue/guide/concepts.md) explains how props map to classes, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/vue/components.md). [Theming](https://open-props-ui.netlify.app/vue/guide/theming.md) covers colors, density, motion and contrast.

### Server rendering

Without hydration (Astro with `@astrojs/vue` and no `client:*` directive, or `renderToString` on its own), every component renders complete HTML. The native controls work and submit with their form. A few things only update on the client:

- [Checkbox](https://open-props-ui.netlify.app/vue/components/checkbox.md#indeterminate) `indeterminate`: it's a DOM property, so the box looks unchecked. Or import `opui-css/css/js/checkbox.js` in the page.
- [Range](https://open-props-ui.netlify.app/vue/components/range.md#value) value: the `<output>` doesn't follow the thumb. The track fill is CSS, so it's fine.
- `v-model` on [Checkbox](https://open-props-ui.netlify.app/vue/components/checkbox.md), [Number field](https://open-props-ui.netlify.app/vue/components/number-field.md), [One-time code](https://open-props-ui.netlify.app/vue/components/one-time-code.md), [Radio](https://open-props-ui.netlify.app/vue/components/radio.md), [Range](https://open-props-ui.netlify.app/vue/components/range.md), [Rating](https://open-props-ui.netlify.app/vue/components/rating.md), [Select](https://open-props-ui.netlify.app/vue/components/select.md), [Switch](https://open-props-ui.netlify.app/vue/components/switch.md), [Tabs](https://open-props-ui.netlify.app/vue/components/tabs.md), [Text field](https://open-props-ui.netlify.app/vue/components/text-field.md), [Textarea](https://open-props-ui.netlify.app/vue/components/textarea.md) and [Toggle](https://open-props-ui.netlify.app/vue/components/toggle.md): the ref stays put. The native value still changes and submits.

Hydrate those (`client:load` in Astro) or use them in a client-rendered Vue app. Component pages say what needs hydration next to the browser support chips, and the API tables mark each prop with a crossed-out server icon.

When the page hydrates, as in Nuxt, a value or choice the user changed before it did (typed, picked, filled in by a password manager or restored by the browser) stays: the form controls take it from the element instead of resetting it, and a form reset still returns to what the server rendered.
