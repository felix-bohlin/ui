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

```sh
pnpm add opui-css astro@7
```

```sh
npm install opui-css astro@7
```

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

```sh
pnpm add opui-css react@19 react-dom@19
```

```sh
npm install opui-css react@19 react-dom@19
```

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

Components that need context, state or effects are marked `"use client"`. The rest also render as React Server Components. Without hydration (Astro with `@astrojs/react` and no `client:*` directive, or `renderToString` on its own), every component renders complete HTML, and the native controls work and submit with their form. The props in the last column only update on the client. The table is read from the component sources and their API docs.

| Component | Client | Server | Server Component | Needs hydration for |
| --- | --- | --- | --- | --- |
| [`Accordion`](https://open-props-ui.netlify.app/react/components/accordion.md) | Yes | Yes | Yes | - |
| [`AccordionActions`](https://open-props-ui.netlify.app/react/components/accordion.md) | Yes | Yes | Yes | - |
| [`AccordionSummary`](https://open-props-ui.netlify.app/react/components/accordion.md) | Yes | Yes | Yes | - |
| [`Anchor`](https://open-props-ui.netlify.app/react/components/anchor.md) | Yes | Yes | No | - |
| [`Avatar`](https://open-props-ui.netlify.app/react/components/avatar.md) | Yes | Yes | Yes | - |
| [`AvatarGroup`](https://open-props-ui.netlify.app/react/components/avatar.md) | Yes | Yes | Yes | - |
| [`Badge`](https://open-props-ui.netlify.app/react/components/badge.md) | Yes | Yes | Yes | - |
| [`Button`](https://open-props-ui.netlify.app/react/components/button.md) | Yes | Yes | Yes | - |
| [`ButtonGroup`](https://open-props-ui.netlify.app/react/components/button-group.md) | Yes | Yes | Yes | - |
| [`Callout`](https://open-props-ui.netlify.app/react/components/callout.md) | Yes | Yes | No | - |
| [`Card`](https://open-props-ui.netlify.app/react/components/card.md) | Yes | Yes | Yes | - |
| [`CardActions`](https://open-props-ui.netlify.app/react/components/card.md) | Yes | Yes | Yes | - |
| [`CardHeader`](https://open-props-ui.netlify.app/react/components/card.md) | Yes | Yes | Yes | - |
| [`Carousel`](https://open-props-ui.netlify.app/react/components/carousel.md) | Yes | Yes | Yes | - |
| [`Checkbox`](https://open-props-ui.netlify.app/react/components/checkbox.md) | Yes | No | Yes | `indeterminate` |
| [`CheckboxInput`](https://open-props-ui.netlify.app/react/components/checkbox.md) | Yes | No | No | `indeterminate` |
| [`Chip`](https://open-props-ui.netlify.app/react/components/chip.md) | Yes | Yes | Yes | - |
| [`Copy`](https://open-props-ui.netlify.app/react/components/copy.md) | Yes | Yes | No | - |
| [`DescriptionList`](https://open-props-ui.netlify.app/react/components/description-list.md) | Yes | Yes | Yes | - |
| [`DescriptionListItem`](https://open-props-ui.netlify.app/react/components/description-list.md) | Yes | Yes | Yes | - |
| [`Dialog`](https://open-props-ui.netlify.app/react/components/dialog.md) | Yes | Yes | No | - |
| [`DialogFooter`](https://open-props-ui.netlify.app/react/components/dialog.md) | Yes | Yes | Yes | - |
| [`DialogHeader`](https://open-props-ui.netlify.app/react/components/dialog.md) | Yes | Yes | No | - |
| [`Divider`](https://open-props-ui.netlify.app/react/components/divider.md) | Yes | Yes | Yes | - |
| [`Drawer`](https://open-props-ui.netlify.app/react/components/drawer.md) | Yes | Yes | No | - |
| [`DrawerFooter`](https://open-props-ui.netlify.app/react/components/drawer.md) | Yes | Yes | Yes | - |
| [`DrawerHeader`](https://open-props-ui.netlify.app/react/components/drawer.md) | Yes | Yes | No | - |
| [`FieldDescription`](https://open-props-ui.netlify.app/react/components/form.md) | Yes | Yes | Yes | - |
| [`FieldGroup`](https://open-props-ui.netlify.app/react/components/form.md) | Yes | Yes | No | - |
| [`FieldLegend`](https://open-props-ui.netlify.app/react/components/form.md) | Yes | Yes | No | - |
| [`Fieldset`](https://open-props-ui.netlify.app/react/components/form.md) | Yes | Yes | No | - |
| [`Form`](https://open-props-ui.netlify.app/react/components/form.md) | Yes | Yes | Yes | - |
| [`List`](https://open-props-ui.netlify.app/react/components/list.md) | Yes | Yes | Yes | - |
| [`ListItem`](https://open-props-ui.netlify.app/react/components/list.md) | Yes | Yes | Yes | - |
| [`Menu`](https://open-props-ui.netlify.app/react/components/menu.md) | Yes | Yes | No | - |
| [`Message`](https://open-props-ui.netlify.app/react/components/message.md) | Yes | Yes | Yes | - |
| [`Messages`](https://open-props-ui.netlify.app/react/components/message.md) | Yes | Yes | Yes | - |
| [`NumberField`](https://open-props-ui.netlify.app/react/components/number-field.md) | Yes | Yes | No | - |
| [`OneTimeCode`](https://open-props-ui.netlify.app/react/components/one-time-code.md) | Yes | Yes | No | - |
| [`Progress`](https://open-props-ui.netlify.app/react/components/progress.md) | Yes | Yes | Yes | - |
| [`Radio`](https://open-props-ui.netlify.app/react/components/radio.md) | Yes | Yes | Yes | - |
| [`RadioInput`](https://open-props-ui.netlify.app/react/components/radio.md) | Yes | Yes | No | - |
| [`Range`](https://open-props-ui.netlify.app/react/components/range.md) | Yes | No | No | `valueSuffix`, `valueText` |
| [`Rating`](https://open-props-ui.netlify.app/react/components/rating.md) | Yes | Yes | No | - |
| [`Select`](https://open-props-ui.netlify.app/react/components/select.md) | Yes | Yes | No | - |
| [`SelectAll`](https://open-props-ui.netlify.app/react/components/checkbox.md) | Yes | Yes | No | - |
| [`SortableTable`](https://open-props-ui.netlify.app/react/components/table.md) | Yes | Yes | No | - |
| [`Stat`](https://open-props-ui.netlify.app/react/components/stat.md) | Yes | Yes | Yes | - |
| [`Stepper`](https://open-props-ui.netlify.app/react/components/stepper.md) | Yes | Yes | Yes | - |
| [`StepperItem`](https://open-props-ui.netlify.app/react/components/stepper.md) | Yes | Yes | Yes | - |
| [`Switch`](https://open-props-ui.netlify.app/react/components/switch.md) | Yes | Yes | Yes | - |
| [`SwitchInput`](https://open-props-ui.netlify.app/react/components/switch.md) | Yes | Yes | No | - |
| [`Table`](https://open-props-ui.netlify.app/react/components/table.md) | Yes | Yes | Yes | - |
| [`TableCell`](https://open-props-ui.netlify.app/react/components/table.md) | Yes | Yes | Yes | - |
| [`TableColumn`](https://open-props-ui.netlify.app/react/components/table.md) | Yes | Yes | Yes | - |
| [`TableColumnGroup`](https://open-props-ui.netlify.app/react/components/table.md) | Yes | Yes | Yes | - |
| [`TableHeaderCell`](https://open-props-ui.netlify.app/react/components/table.md) | Yes | Yes | Yes | - |
| [`Tabs`](https://open-props-ui.netlify.app/react/components/tabs.md) | Yes | Yes | No | - |
| [`TabsItem`](https://open-props-ui.netlify.app/react/components/tabs.md) | Yes | Yes | No | - |
| [`TabsLabel`](https://open-props-ui.netlify.app/react/components/tabs.md) | Yes | Yes | No | - |
| [`TabsPanel`](https://open-props-ui.netlify.app/react/components/tabs.md) | Yes | Yes | Yes | - |
| [`Textarea`](https://open-props-ui.netlify.app/react/components/textarea.md) | Yes | Yes | No | - |
| [`TextField`](https://open-props-ui.netlify.app/react/components/text-field.md) | Yes | Yes | No | - |
| [`Timeline`](https://open-props-ui.netlify.app/react/components/timeline.md) | Yes | Yes | Yes | - |
| [`TimelineItem`](https://open-props-ui.netlify.app/react/components/timeline.md) | Yes | Yes | Yes | - |
| [`Toaster`](https://open-props-ui.netlify.app/react/components/toast.md) | Yes | Yes | No | - |
| [`ToggleButton`](https://open-props-ui.netlify.app/react/components/toggle.md) | Yes | Yes | No | - |
| [`ToggleGroup`](https://open-props-ui.netlify.app/react/components/toggle.md) | Yes | Yes | No | - |
| [`Tooltip`](https://open-props-ui.netlify.app/react/components/tooltip.md) | Yes | Yes | Yes | - |

Hydrate those (`client:load` in Astro) or render them on the client. Component pages say what needs hydration next to the browser support chips, and the API tables mark each prop with a crossed-out server icon.

## Svelte

OPUI ships first-class Svelte 5 components. Install the package, import what you need, and you're set.

### Install via NPM

```sh
pnpm add opui-css svelte@5
```

```sh
npm install opui-css svelte@5
```

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

Without hydration (SvelteKit with `csr = false`, or Astro with `@astrojs/svelte` and no `client:*` directive), every component renders complete HTML, and the native controls work and submit with their form. The props in the last column only update on the client: a `bind:` value stays put while the native value still changes and submits. The table is read from the component sources and their API docs.

| Component | Client | Server | Needs hydration for |
| --- | --- | --- | --- |
| [`Accordion`](https://open-props-ui.netlify.app/svelte/components/accordion.md) | Yes | Yes | - |
| [`AccordionActions`](https://open-props-ui.netlify.app/svelte/components/accordion.md) | Yes | Yes | - |
| [`AccordionSummary`](https://open-props-ui.netlify.app/svelte/components/accordion.md) | Yes | Yes | - |
| [`Anchor`](https://open-props-ui.netlify.app/svelte/components/anchor.md) | Yes | Yes | - |
| [`Avatar`](https://open-props-ui.netlify.app/svelte/components/avatar.md) | Yes | Yes | - |
| [`AvatarGroup`](https://open-props-ui.netlify.app/svelte/components/avatar.md) | Yes | Yes | - |
| [`Badge`](https://open-props-ui.netlify.app/svelte/components/badge.md) | Yes | Yes | - |
| [`Button`](https://open-props-ui.netlify.app/svelte/components/button.md) | Yes | Yes | - |
| [`ButtonGroup`](https://open-props-ui.netlify.app/svelte/components/button-group.md) | Yes | Yes | - |
| [`Callout`](https://open-props-ui.netlify.app/svelte/components/callout.md) | Yes | Yes | - |
| [`Card`](https://open-props-ui.netlify.app/svelte/components/card.md) | Yes | Yes | - |
| [`CardActions`](https://open-props-ui.netlify.app/svelte/components/card.md) | Yes | Yes | - |
| [`CardHeader`](https://open-props-ui.netlify.app/svelte/components/card.md) | Yes | Yes | - |
| [`Carousel`](https://open-props-ui.netlify.app/svelte/components/carousel.md) | Yes | Yes | - |
| [`Checkbox`](https://open-props-ui.netlify.app/svelte/components/checkbox.md) | Yes | No | `bind:checked`, `bind:group`, `indeterminate` |
| [`CheckboxInput`](https://open-props-ui.netlify.app/svelte/components/checkbox.md) | Yes | No | `bind:checked`, `bind:group`, `indeterminate` |
| [`Chip`](https://open-props-ui.netlify.app/svelte/components/chip.md) | Yes | Yes | - |
| [`Copy`](https://open-props-ui.netlify.app/svelte/components/copy.md) | Yes | Yes | - |
| [`DescriptionList`](https://open-props-ui.netlify.app/svelte/components/description-list.md) | Yes | Yes | - |
| [`DescriptionListItem`](https://open-props-ui.netlify.app/svelte/components/description-list.md) | Yes | Yes | - |
| [`Dialog`](https://open-props-ui.netlify.app/svelte/components/dialog.md) | Yes | Yes | - |
| [`DialogFooter`](https://open-props-ui.netlify.app/svelte/components/dialog.md) | Yes | Yes | - |
| [`DialogHeader`](https://open-props-ui.netlify.app/svelte/components/dialog.md) | Yes | Yes | - |
| [`Divider`](https://open-props-ui.netlify.app/svelte/components/divider.md) | Yes | Yes | - |
| [`Drawer`](https://open-props-ui.netlify.app/svelte/components/drawer.md) | Yes | Yes | - |
| [`DrawerFooter`](https://open-props-ui.netlify.app/svelte/components/drawer.md) | Yes | Yes | - |
| [`DrawerHeader`](https://open-props-ui.netlify.app/svelte/components/drawer.md) | Yes | Yes | - |
| [`FieldDescription`](https://open-props-ui.netlify.app/svelte/components/form.md) | Yes | Yes | - |
| [`FieldGroup`](https://open-props-ui.netlify.app/svelte/components/form.md) | Yes | Yes | - |
| [`FieldLegend`](https://open-props-ui.netlify.app/svelte/components/form.md) | Yes | Yes | - |
| [`Fieldset`](https://open-props-ui.netlify.app/svelte/components/form.md) | Yes | Yes | - |
| [`Form`](https://open-props-ui.netlify.app/svelte/components/form.md) | Yes | Yes | - |
| [`List`](https://open-props-ui.netlify.app/svelte/components/list.md) | Yes | Yes | - |
| [`ListItem`](https://open-props-ui.netlify.app/svelte/components/list.md) | Yes | Yes | - |
| [`Menu`](https://open-props-ui.netlify.app/svelte/components/menu.md) | Yes | Yes | - |
| [`Message`](https://open-props-ui.netlify.app/svelte/components/message.md) | Yes | Yes | - |
| [`Messages`](https://open-props-ui.netlify.app/svelte/components/message.md) | Yes | Yes | - |
| [`NumberField`](https://open-props-ui.netlify.app/svelte/components/number-field.md) | Yes | No | `bind:value` |
| [`OneTimeCode`](https://open-props-ui.netlify.app/svelte/components/one-time-code.md) | Yes | No | `bind:value` |
| [`Progress`](https://open-props-ui.netlify.app/svelte/components/progress.md) | Yes | Yes | - |
| [`Radio`](https://open-props-ui.netlify.app/svelte/components/radio.md) | Yes | No | `bind:group` |
| [`RadioInput`](https://open-props-ui.netlify.app/svelte/components/radio.md) | Yes | No | `bind:group` |
| [`Range`](https://open-props-ui.netlify.app/svelte/components/range.md) | Yes | No | `bind:value`, `valueSuffix`, `valueText` |
| [`Rating`](https://open-props-ui.netlify.app/svelte/components/rating.md) | Yes | No | `bind:value` |
| [`Select`](https://open-props-ui.netlify.app/svelte/components/select.md) | Yes | No | `bind:value` |
| [`SelectAll`](https://open-props-ui.netlify.app/svelte/components/checkbox.md) | Yes | Yes | - |
| [`SortableTable`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`Stat`](https://open-props-ui.netlify.app/svelte/components/stat.md) | Yes | Yes | - |
| [`Stepper`](https://open-props-ui.netlify.app/svelte/components/stepper.md) | Yes | Yes | - |
| [`StepperItem`](https://open-props-ui.netlify.app/svelte/components/stepper.md) | Yes | Yes | - |
| [`Switch`](https://open-props-ui.netlify.app/svelte/components/switch.md) | Yes | No | `bind:checked`, `bind:group` |
| [`SwitchInput`](https://open-props-ui.netlify.app/svelte/components/switch.md) | Yes | No | `bind:checked`, `bind:group` |
| [`Table`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`TableCell`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`TableColumn`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`TableColumnGroup`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`TableHeaderCell`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`Tabs`](https://open-props-ui.netlify.app/svelte/components/tabs.md) | Yes | No | `bind:value` |
| [`TabsItem`](https://open-props-ui.netlify.app/svelte/components/tabs.md) | Yes | Yes | - |
| [`TabsLabel`](https://open-props-ui.netlify.app/svelte/components/tabs.md) | Yes | Yes | - |
| [`TabsPanel`](https://open-props-ui.netlify.app/svelte/components/tabs.md) | Yes | Yes | - |
| [`Textarea`](https://open-props-ui.netlify.app/svelte/components/textarea.md) | Yes | No | `bind:value` |
| [`TextField`](https://open-props-ui.netlify.app/svelte/components/text-field.md) | Yes | No | `bind:value` |
| [`Timeline`](https://open-props-ui.netlify.app/svelte/components/timeline.md) | Yes | Yes | - |
| [`TimelineItem`](https://open-props-ui.netlify.app/svelte/components/timeline.md) | Yes | Yes | - |
| [`Toaster`](https://open-props-ui.netlify.app/svelte/components/toast.md) | Yes | Yes | - |
| [`ToggleButton`](https://open-props-ui.netlify.app/svelte/components/toggle.md) | Yes | No | `bind:checked` |
| [`ToggleGroup`](https://open-props-ui.netlify.app/svelte/components/toggle.md) | Yes | No | `bind:value` |
| [`Tooltip`](https://open-props-ui.netlify.app/svelte/components/tooltip.md) | Yes | Yes | - |

Hydrate those (`client:load` in Astro) or keep client-side rendering on. Component pages say what needs hydration next to the browser support chips, and the API tables mark each prop with a crossed-out server icon.

## Vue

OPUI ships first-class Vue components. Install the package, import what you need, and you're set.

### Install via NPM

```sh
pnpm add opui-css vue@3
```

```sh
npm install opui-css vue@3
```

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

Without hydration (Astro with `@astrojs/vue` and no `client:*` directive, or `renderToString` on its own), every component renders complete HTML, and the native controls work and submit with their form. The props in the last column only update on the client: a `v-model` ref stays put while the native value still changes and submits. The table is read from the component sources and their API docs.

| Component | Client | Server | Needs hydration for |
| --- | --- | --- | --- |
| [`Accordion`](https://open-props-ui.netlify.app/vue/components/accordion.md) | Yes | Yes | - |
| [`AccordionActions`](https://open-props-ui.netlify.app/vue/components/accordion.md) | Yes | Yes | - |
| [`AccordionSummary`](https://open-props-ui.netlify.app/vue/components/accordion.md) | Yes | Yes | - |
| [`Anchor`](https://open-props-ui.netlify.app/vue/components/anchor.md) | Yes | Yes | - |
| [`Avatar`](https://open-props-ui.netlify.app/vue/components/avatar.md) | Yes | Yes | - |
| [`AvatarGroup`](https://open-props-ui.netlify.app/vue/components/avatar.md) | Yes | Yes | - |
| [`Badge`](https://open-props-ui.netlify.app/vue/components/badge.md) | Yes | Yes | - |
| [`Button`](https://open-props-ui.netlify.app/vue/components/button.md) | Yes | Yes | - |
| [`ButtonGroup`](https://open-props-ui.netlify.app/vue/components/button-group.md) | Yes | Yes | - |
| [`Callout`](https://open-props-ui.netlify.app/vue/components/callout.md) | Yes | Yes | - |
| [`Card`](https://open-props-ui.netlify.app/vue/components/card.md) | Yes | Yes | - |
| [`CardActions`](https://open-props-ui.netlify.app/vue/components/card.md) | Yes | Yes | - |
| [`CardHeader`](https://open-props-ui.netlify.app/vue/components/card.md) | Yes | Yes | - |
| [`Carousel`](https://open-props-ui.netlify.app/vue/components/carousel.md) | Yes | Yes | - |
| [`Checkbox`](https://open-props-ui.netlify.app/vue/components/checkbox.md) | Yes | No | `indeterminate`, `v-model` |
| [`CheckboxInput`](https://open-props-ui.netlify.app/vue/components/checkbox.md) | Yes | No | `indeterminate`, `v-model` |
| [`Chip`](https://open-props-ui.netlify.app/vue/components/chip.md) | Yes | Yes | - |
| [`Copy`](https://open-props-ui.netlify.app/vue/components/copy.md) | Yes | Yes | - |
| [`DescriptionList`](https://open-props-ui.netlify.app/vue/components/description-list.md) | Yes | Yes | - |
| [`DescriptionListItem`](https://open-props-ui.netlify.app/vue/components/description-list.md) | Yes | Yes | - |
| [`Dialog`](https://open-props-ui.netlify.app/vue/components/dialog.md) | Yes | Yes | - |
| [`DialogFooter`](https://open-props-ui.netlify.app/vue/components/dialog.md) | Yes | Yes | - |
| [`DialogHeader`](https://open-props-ui.netlify.app/vue/components/dialog.md) | Yes | Yes | - |
| [`Divider`](https://open-props-ui.netlify.app/vue/components/divider.md) | Yes | Yes | - |
| [`Drawer`](https://open-props-ui.netlify.app/vue/components/drawer.md) | Yes | Yes | - |
| [`DrawerFooter`](https://open-props-ui.netlify.app/vue/components/drawer.md) | Yes | Yes | - |
| [`DrawerHeader`](https://open-props-ui.netlify.app/vue/components/drawer.md) | Yes | Yes | - |
| [`FieldDescription`](https://open-props-ui.netlify.app/vue/components/form.md) | Yes | Yes | - |
| [`FieldGroup`](https://open-props-ui.netlify.app/vue/components/form.md) | Yes | Yes | - |
| [`FieldLegend`](https://open-props-ui.netlify.app/vue/components/form.md) | Yes | Yes | - |
| [`Fieldset`](https://open-props-ui.netlify.app/vue/components/form.md) | Yes | Yes | - |
| [`Form`](https://open-props-ui.netlify.app/vue/components/form.md) | Yes | Yes | - |
| [`List`](https://open-props-ui.netlify.app/vue/components/list.md) | Yes | Yes | - |
| [`ListItem`](https://open-props-ui.netlify.app/vue/components/list.md) | Yes | Yes | - |
| [`Menu`](https://open-props-ui.netlify.app/vue/components/menu.md) | Yes | Yes | - |
| [`Message`](https://open-props-ui.netlify.app/vue/components/message.md) | Yes | Yes | - |
| [`Messages`](https://open-props-ui.netlify.app/vue/components/message.md) | Yes | Yes | - |
| [`NumberField`](https://open-props-ui.netlify.app/vue/components/number-field.md) | Yes | No | `v-model` |
| [`OneTimeCode`](https://open-props-ui.netlify.app/vue/components/one-time-code.md) | Yes | No | `v-model` |
| [`Progress`](https://open-props-ui.netlify.app/vue/components/progress.md) | Yes | Yes | - |
| [`Radio`](https://open-props-ui.netlify.app/vue/components/radio.md) | Yes | No | `v-model` |
| [`RadioInput`](https://open-props-ui.netlify.app/vue/components/radio.md) | Yes | No | `v-model` |
| [`Range`](https://open-props-ui.netlify.app/vue/components/range.md) | Yes | No | `v-model`, `valueSuffix` |
| [`Rating`](https://open-props-ui.netlify.app/vue/components/rating.md) | Yes | No | `v-model` |
| [`Select`](https://open-props-ui.netlify.app/vue/components/select.md) | Yes | No | `v-model` |
| [`SelectAll`](https://open-props-ui.netlify.app/vue/components/checkbox.md) | Yes | Yes | - |
| [`SortableTable`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`Stat`](https://open-props-ui.netlify.app/vue/components/stat.md) | Yes | Yes | - |
| [`Stepper`](https://open-props-ui.netlify.app/vue/components/stepper.md) | Yes | Yes | - |
| [`StepperItem`](https://open-props-ui.netlify.app/vue/components/stepper.md) | Yes | Yes | - |
| [`Switch`](https://open-props-ui.netlify.app/vue/components/switch.md) | Yes | No | `v-model` |
| [`SwitchInput`](https://open-props-ui.netlify.app/vue/components/switch.md) | Yes | No | `v-model` |
| [`Table`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`TableCell`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`TableColumn`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`TableColumnGroup`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`TableHeaderCell`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`Tabs`](https://open-props-ui.netlify.app/vue/components/tabs.md) | Yes | No | `v-model` |
| [`TabsItem`](https://open-props-ui.netlify.app/vue/components/tabs.md) | Yes | Yes | - |
| [`TabsLabel`](https://open-props-ui.netlify.app/vue/components/tabs.md) | Yes | Yes | - |
| [`TabsPanel`](https://open-props-ui.netlify.app/vue/components/tabs.md) | Yes | Yes | - |
| [`Textarea`](https://open-props-ui.netlify.app/vue/components/textarea.md) | Yes | No | `v-model` |
| [`TextField`](https://open-props-ui.netlify.app/vue/components/text-field.md) | Yes | No | `v-model` |
| [`Timeline`](https://open-props-ui.netlify.app/vue/components/timeline.md) | Yes | Yes | - |
| [`TimelineItem`](https://open-props-ui.netlify.app/vue/components/timeline.md) | Yes | Yes | - |
| [`Toaster`](https://open-props-ui.netlify.app/vue/components/toast.md) | Yes | Yes | - |
| [`ToggleButton`](https://open-props-ui.netlify.app/vue/components/toggle.md) | Yes | No | `v-model` |
| [`ToggleGroup`](https://open-props-ui.netlify.app/vue/components/toggle.md) | Yes | No | `v-model` |
| [`Tooltip`](https://open-props-ui.netlify.app/vue/components/tooltip.md) | Yes | Yes | - |

Hydrate those (`client:load` in Astro) or use them in a client-rendered Vue app. Component pages say what needs hydration next to the browser support chips, and the API tables mark each prop with a crossed-out server icon.

When the page hydrates, as in Nuxt, a value or choice the user changed before it did (typed, picked, filled in by a password manager or restored by the browser) stays: the form controls take it from the element instead of resetting it, and a form reset still returns to what the server rendered.
