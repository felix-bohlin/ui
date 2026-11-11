# Getting started

Every framework needs the CSS. The HTML section covers the CDN file, the npm imports and the files to copy. The Astro, React, Svelte and Vue sections add their install, CSS import and component import steps.

## HTML

Add the CSS from the CDN, from npm or by copying the files, then write the class names.

### Quick start

#### Add the CSS

One file with the theme, the reset and every component.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css@6/dist/opui.css" />
```

#### Write the classes

A class on a native element. Options are classes too.

```html
<button class="ui-button ui-filled ui-primary" type="button">
  Save
</button>
```

| Class | Sets |
| --- | --- |
| `.ui-button` | Component |
| `.ui-filled` | Variant |
| `.ui-primary` | Color |

#### Make it yours

Load the `theme.css` the Theme builder exports after opui-css.

[Theme builder](https://open-props-ui.netlify.app/theme-builder.md)

### What's in the CSS

Each component page lists the files it needs under Installation.

1. `css/layers.css` The layer order First
2. `dist/op.css` Open Props for your own CSS Optional
3. `core/palette.css` 16 color steps from your hue
4. `css/theme.css` The knobs and roles components read
5. `core/normalize.css` Reset and focus ring
6. `css/components.css` Every component, or one file each from css/components/
7. `css/compat.css` Browser fallbacks Optional
8. `core/utils.css` Screen reader, motion and contrast classes Last

Import them top to bottom. `dist/opui.css` on the CDN holds all of them, and `css/imports.css` all but Open Props.

### Pick an install

#### [CDN](#cdn)

One link with every component. No build step.

#### [Copy the files](#manual-setup)

The files in your project, yours to change. No build step.

#### [npm](#installation)

Everything or only the parts you use, through your bundler.

### Install via CDN

One file with everything, in the right cascade layers.

Use `dist/opui.no-compat.css` without the [browser fallbacks](https://open-props-ui.netlify.app/html/guide/browser-support.md#compat), or `dist/opui.baseline-<year>.css` for one Baseline year. Pin an exact version, like `@6.0.0`, for full control.

### Install manually

No build step needed. Download the package (`npm pack opui-css`, or browse it on [jsDelivr](https://cdn.jsdelivr.net/npm/opui-css@6/)) as `opui`, and import the files:

```css
@import "./opui/css/layers.css";

@import "./opui/core/palette.css";
@import "./opui/css/theme.css";
@import "./opui/core/normalize.css";
@import "./opui/css/components.css";
@import "./opui/css/compat.css";
@import "./opui/core/utils.css";
```

If your own CSS reads Open Props, import `./opui/dist/op.css` right after `layers.css`.

The files in the package

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

`dist/op.css` and `open-props.css` are Open Props, optional, for your own CSS. `themes/` holds the [example themes](https://open-props-ui.netlify.app/html/guide/customizing.md#example-themes) and `tokens.json` the [design tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md#tokens-json).

### Install via NPM

For a bundler that resolves CSS `@import`s, like Vite, on Node 26.10 or later.

`pnpm`

```sh
pnpm add opui-css
```

`npm`

```sh
npm install opui-css
```

`yarn`

```sh
yarn add opui-css
```

`bun`

```sh
bun add opui-css
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

Keep the order from [What's in the CSS](#whats-in-the-css), and add `choice.css` with `checkbox.css`, `radio.css` or `switch.css`.

### Scripts

A few features need a script in plain HTML:

| Feature | What it does | Import |
| --- | --- | --- |
| [Character count](https://open-props-ui.netlify.app/html/components/text-field.md#character-count) | Counts the characters left, in Text field and Textarea | `opui-css/elements/character-count.js` |
| [Copy](https://open-props-ui.netlify.app/html/components/copy.md) | Copies text or a field's value | `opui-css/elements/copy.js` |
| [Indeterminate checkbox](https://open-props-ui.netlify.app/html/components/checkbox.md#indeterminate) | Sets `indeterminate` from `data-indeterminate` | `opui-css/css/js/checkbox.js` |
| [Number field](https://open-props-ui.netlify.app/html/components/number-field.md) | Steps the value with its buttons | `opui-css/elements/number-field.js` |
| [Password toggle](https://open-props-ui.netlify.app/html/components/text-field.md#password-toggle) | Shows and hides the password | `opui-css/elements/text-field.js` |
| [Range value](https://open-props-ui.netlify.app/html/components/range.md#value) | Writes the value to the `output`, with `data-live` | `opui-css/css/js/range.js` |
| [Select all](https://open-props-ui.netlify.app/html/components/checkbox.md#select-all) | Checks or clears a group of checkboxes from one | `opui-css/elements/select-all.js` |
| [Sortable table](https://open-props-ui.netlify.app/html/components/table.md#sorting) | Sorts the rows by a column | `opui-css/elements/sortable-table.js` |
| [Toast](https://open-props-ui.netlify.app/html/components/toast.md) | Shows toasts and dismisses them | `opui-css/elements/toaster.js` |

Without a bundler, add this import map to the `head`:

```html
<script type="importmap">
  { "imports": { "opui-css/": "https://cdn.jsdelivr.net/npm/opui-css@6/" } }
</script>
```

### Next steps

#### [AI assistants](https://open-props-ui.netlify.app/html/llms.txt)

`npx opui-css skill` copies the agent skill into your project, and every page has a Markdown version.

#### [Blocks](https://open-props-ui.netlify.app/blocks.md)

36 pages and sections built from the components.

#### [Components](https://open-props-ui.netlify.app/html/components.md)

41 components, each with HTML examples and its API.

#### [Concepts](https://open-props-ui.netlify.app/html/guide/concepts.md)

Cascade layers, token tiers, props and classes, and what needs JavaScript.

#### [Theme builder](https://open-props-ui.netlify.app/theme-builder.md)

Colors, density, corners and fonts, exported as one CSS file.

## Astro

OPUI ships first-class Astro 7 components. Install the package, import what you need, and you're set.

### Quick start

#### Install and import the CSS

Needs Node 26.10 or later. Import the CSS once, where your app starts.

```sh
pnpm add opui-css astro@7
```

```sh
npm install opui-css astro@7
```

```sh
yarn add opui-css astro@7
```

```sh
bun add opui-css astro@7
```

```astro
---
import "opui-css/css/imports.css"
---
```

#### Use a component

Each prop renders one class.

```astro
---
import { Button } from "opui-css/astro"
---

<Button color="primary" variant="filled">Save</Button>
```

| You write | It renders |
| --- | --- |
| `<Button>` | `.ui-button` |
| `color="primary"` | `.ui-primary` |
| `variant="filled"` | `.ui-filled` |

#### Make it yours

### What's in the CSS

### Import only what you use

List the files in a CSS file, and import that file in the layout instead of `imports.css`:

Same code as in the HTML section.

```astro
---
import "../styles/global.css"
---
```

### How to use

Named slots take rich content, like `end-text`.

### Server runtime

Runs on Node, Deno and Bun. On Cloudflare, enable `nodejs_compat`.

#### Ids

Components a trigger points at need an `id`. For stable generated ids, define `Astro.locals.$id`:

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

Add `/// <reference types="opui-css/env.d.ts" />` to `env.d.ts` for the types.

### Next steps

#### [AI assistants](https://open-props-ui.netlify.app/astro/llms.txt)

#### [Blocks](https://open-props-ui.netlify.app/blocks.md)

#### [Components](https://open-props-ui.netlify.app/astro/components.md)

41 components, each with Astro examples and its API.

#### [Concepts](https://open-props-ui.netlify.app/astro/guide/concepts.md)

#### [Theme builder](https://open-props-ui.netlify.app/theme-builder.md)

## React

OPUI ships first-class React 19 components. Install the package, import what you need, and you're set.

### Quick start

#### Install and import the CSS

```sh
pnpm add opui-css react@19 react-dom@19
```

```sh
npm install opui-css react@19 react-dom@19
```

```sh
yarn add opui-css react@19 react-dom@19
```

```sh
bun add opui-css react@19 react-dom@19
```

```tsx
import "opui-css/css/imports.css"
```

#### Use a component

```tsx
import { Button } from "opui-css/react"

export default function App() {
  return <Button color="primary" variant="filled">Save</Button>
}
```

#### Make it yours

### What's in the CSS

### Import only what you use

List the files in a CSS file, and import that file in your entry instead of `imports.css`:

Same code as in the HTML section.

```tsx
import "./styles/main.css"
```

### Builds

Vite 8, which SvelteKit and Nuxt build with, and Next 16 rewrite `light-dark()` for older browsers by default. The colors still follow the OS, and `.ui-light` or `.ui-dark` on `html` still works, but on a part of the page it stops switching after a build. Target browsers that have `light-dark()`:

```js
experimental: {
  lightningCssFeatures: {
    exclude: ["light-dark"]
  }
}
```

```js
// vite.config, or under `vite` in nuxt.config
build: {
  cssTarget: ["chrome123", "edge123", "firefox120", "safari17.5"]
}
```

Vite also prints warnings like `'scroll-button' is not recognized as a valid pseudo-element` for the Carousel, even without one on the page. They're harmless: the rules stay in the output.

### How to use

Slots are props: `children`, and camelCased names like `endText`.

### Server rendering

Every component renders full HTML on the server. Components with state or effects are marked `"use client"`, the rest are Server Components. The props in the last column need hydration.

- **66** of 69 need no hydration
- **3** hydrate for `indeterminate`, `valueSuffix`, `valueText`
- **39** are Server Components

| Component | Client | Server | Server Component | Needs hydration |
| --- | --- | --- | --- | --- |
| [`Accordion`](https://open-props-ui.netlify.app/react/components/accordion.md) | Yes | Yes | Yes | - |
| [`AccordionActions`](https://open-props-ui.netlify.app/react/components/accordion.md) | Yes | Yes | Yes | - |
| [`AccordionSummary`](https://open-props-ui.netlify.app/react/components/accordion.md) | Yes | Yes | Yes | - |
| [`Anchor`](https://open-props-ui.netlify.app/react/components/anchor.md) | Yes | Yes | No | - |
| [`Avatar`](https://open-props-ui.netlify.app/react/components/avatar.md) | Yes | Yes | Yes | - |
| [`AvatarGroup`](https://open-props-ui.netlify.app/react/components/avatar.md) | Yes | Yes | Yes | - |
| [`Badge`](https://open-props-ui.netlify.app/react/components/badge.md) | Yes | Yes | Yes | - |
| [`Button`](https://open-props-ui.netlify.app/react/components/button.md) | Yes | Yes | Yes | - |
| [`Callout`](https://open-props-ui.netlify.app/react/components/callout.md) | Yes | Yes | No | - |
| [`Card`](https://open-props-ui.netlify.app/react/components/card.md) | Yes | Yes | Yes | - |
| [`CardActions`](https://open-props-ui.netlify.app/react/components/card.md) | Yes | Yes | Yes | - |
| [`CardHeader`](https://open-props-ui.netlify.app/react/components/card.md) | Yes | Yes | Yes | - |
| [`Carousel`](https://open-props-ui.netlify.app/react/components/carousel.md) | Yes | Yes | Yes | - |
| [`Checkbox`](https://open-props-ui.netlify.app/react/components/checkbox.md) | Yes | No | Yes | `indeterminate` **Needs hydration** A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component loads the module once it hydrates, so the box looks unchecked until then. Import `opui-css/css/js/checkbox.js` in the page. |
| [`CheckboxInput`](https://open-props-ui.netlify.app/react/components/checkbox.md) | Yes | No | No | `indeterminate` **Needs hydration** A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component loads the module once it hydrates, so the box looks unchecked until then. Import `opui-css/css/js/checkbox.js` in the page. |
| [`Chip`](https://open-props-ui.netlify.app/react/components/chip.md) | Yes | Yes | Yes | - |
| [`ControlGroup`](https://open-props-ui.netlify.app/react/components/control-group.md) | Yes | Yes | No | - |
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
| [`Range`](https://open-props-ui.netlify.app/react/components/range.md) | Yes | No | No | `valueSuffix` **Needs hydration** The value `<output>` follows the thumb through `opui-css/css/js/range.js`, which runs once the component's script loads. The track fill is CSS, so it works. Import `opui-css/css/js/range.js` in the page. , `valueText` **Needs hydration** The `valueText` content is yours, so it follows the thumb when your own state changes, which takes hydration. Update the content on `input` yourself, or use `valueSuffix`. |
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

### Next steps

#### [AI assistants](https://open-props-ui.netlify.app/react/llms.txt)

#### [Blocks](https://open-props-ui.netlify.app/blocks.md)

#### [Components](https://open-props-ui.netlify.app/react/components.md)

41 components, each with React examples and its API.

#### [Concepts](https://open-props-ui.netlify.app/react/guide/concepts.md)

#### [Theme builder](https://open-props-ui.netlify.app/theme-builder.md)

## Svelte

OPUI ships first-class components for Svelte 5.57 and later. Install the package, import what you need, and you're set.

### Quick start

#### Install and import the CSS

```sh
pnpm add opui-css svelte@5
```

```sh
npm install opui-css svelte@5
```

```sh
yarn add opui-css svelte@5
```

```sh
bun add opui-css svelte@5
```

```svelte
<script lang="ts">
  import "opui-css/css/imports.css"

  let { children } = $props()
</script>

{@render children()}
```

#### Use a component

```svelte
<script lang="ts">
  import { Button } from "opui-css/svelte"
</script>

<Button color="primary" variant="filled">Save</Button>
```

#### Make it yours

### What's in the CSS

### Import only what you use

List the files in a CSS file, and import that file in your layout instead of `imports.css`:

Same code as in the HTML section.

```svelte
<script lang="ts">
  import "../styles/main.css"

  let { children } = $props()
</script>

{@render children()}
```

### Builds

### How to use

Slots are snippets: `children`, and camelCased names like `endText`. Form controls bind their value:

| Binding | Components |
| --- | --- |
| `bind:checked` | - [Checkbox](https://open-props-ui.netlify.app/svelte/components/checkbox.md)
- [CheckboxInput](https://open-props-ui.netlify.app/svelte/components/checkbox.md)
- [Switch](https://open-props-ui.netlify.app/svelte/components/switch.md)
- [SwitchInput](https://open-props-ui.netlify.app/svelte/components/switch.md)
- [ToggleButton](https://open-props-ui.netlify.app/svelte/components/toggle.md)                                                                                                                                                                                                                                                                                                                  |
| `bind:group` | * [Checkbox](https://open-props-ui.netlify.app/svelte/components/checkbox.md)
* [CheckboxInput](https://open-props-ui.netlify.app/svelte/components/checkbox.md)
* [Radio](https://open-props-ui.netlify.app/svelte/components/radio.md)
* [RadioInput](https://open-props-ui.netlify.app/svelte/components/radio.md)
* [Switch](https://open-props-ui.netlify.app/svelte/components/switch.md)
* [SwitchInput](https://open-props-ui.netlify.app/svelte/components/switch.md)                                                                                                                                                                                                                                             |
| `bind:value` | - [NumberField](https://open-props-ui.netlify.app/svelte/components/number-field.md)
- [OneTimeCode](https://open-props-ui.netlify.app/svelte/components/one-time-code.md)
- [Range](https://open-props-ui.netlify.app/svelte/components/range.md)
- [Rating](https://open-props-ui.netlify.app/svelte/components/rating.md)
- [Select](https://open-props-ui.netlify.app/svelte/components/select.md)
- [Tabs](https://open-props-ui.netlify.app/svelte/components/tabs.md)
- [Textarea](https://open-props-ui.netlify.app/svelte/components/textarea.md)
- [TextField](https://open-props-ui.netlify.app/svelte/components/text-field.md)
- [ToggleGroup](https://open-props-ui.netlify.app/svelte/components/toggle.md) |

### Server rendering

Every component renders full HTML on the server. The props in the last column need hydration.

- **53** of 69 need no hydration
- **16** hydrate for `bind:checked`, `bind:group`, `bind:value`, `indeterminate`, `valueSuffix`, `valueText`

| Component | Client | Server | Needs hydration |
| --- | --- | --- | --- |
| [`Accordion`](https://open-props-ui.netlify.app/svelte/components/accordion.md) | Yes | Yes | - |
| [`AccordionActions`](https://open-props-ui.netlify.app/svelte/components/accordion.md) | Yes | Yes | - |
| [`AccordionSummary`](https://open-props-ui.netlify.app/svelte/components/accordion.md) | Yes | Yes | - |
| [`Anchor`](https://open-props-ui.netlify.app/svelte/components/anchor.md) | Yes | Yes | - |
| [`Avatar`](https://open-props-ui.netlify.app/svelte/components/avatar.md) | Yes | Yes | - |
| [`AvatarGroup`](https://open-props-ui.netlify.app/svelte/components/avatar.md) | Yes | Yes | - |
| [`Badge`](https://open-props-ui.netlify.app/svelte/components/badge.md) | Yes | Yes | - |
| [`Button`](https://open-props-ui.netlify.app/svelte/components/button.md) | Yes | Yes | - |
| [`Callout`](https://open-props-ui.netlify.app/svelte/components/callout.md) | Yes | Yes | - |
| [`Card`](https://open-props-ui.netlify.app/svelte/components/card.md) | Yes | Yes | - |
| [`CardActions`](https://open-props-ui.netlify.app/svelte/components/card.md) | Yes | Yes | - |
| [`CardHeader`](https://open-props-ui.netlify.app/svelte/components/card.md) | Yes | Yes | - |
| [`Carousel`](https://open-props-ui.netlify.app/svelte/components/carousel.md) | Yes | Yes | - |
| [`Checkbox`](https://open-props-ui.netlify.app/svelte/components/checkbox.md) | Yes | No | `bind:checked` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. , `bind:group` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. , `indeterminate` **Needs hydration** A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component imports the module, so the box looks unchecked until its script runs. Import `opui-css/css/js/checkbox.js` in the page. |
| [`CheckboxInput`](https://open-props-ui.netlify.app/svelte/components/checkbox.md) | Yes | No | `bind:checked` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. , `bind:group` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. , `indeterminate` **Needs hydration** A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component imports the module, so the box looks unchecked until its script runs. Import `opui-css/css/js/checkbox.js` in the page. |
| [`Chip`](https://open-props-ui.netlify.app/svelte/components/chip.md) | Yes | Yes | - |
| [`ControlGroup`](https://open-props-ui.netlify.app/svelte/components/control-group.md) | Yes | Yes | - |
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
| [`NumberField`](https://open-props-ui.netlify.app/svelte/components/number-field.md) | Yes | No | `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`OneTimeCode`](https://open-props-ui.netlify.app/svelte/components/one-time-code.md) | Yes | No | `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Progress`](https://open-props-ui.netlify.app/svelte/components/progress.md) | Yes | Yes | - |
| [`Radio`](https://open-props-ui.netlify.app/svelte/components/radio.md) | Yes | No | `bind:group` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`RadioInput`](https://open-props-ui.netlify.app/svelte/components/radio.md) | Yes | No | `bind:group` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Range`](https://open-props-ui.netlify.app/svelte/components/range.md) | Yes | No | `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. , `valueSuffix` **Needs hydration** The value `<output>` follows the thumb through `opui-css/css/js/range.js`, which runs once the component's script loads. The track fill is CSS, so it works. Import `opui-css/css/js/range.js` in the page. , `valueText` **Needs hydration** The `valueText` content is yours, so it follows the thumb when your own state changes, which takes hydration. Update the content on `input` yourself, or use `valueSuffix`. |
| [`Rating`](https://open-props-ui.netlify.app/svelte/components/rating.md) | Yes | No | `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Select`](https://open-props-ui.netlify.app/svelte/components/select.md) | Yes | No | `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`SelectAll`](https://open-props-ui.netlify.app/svelte/components/checkbox.md) | Yes | Yes | - |
| [`SortableTable`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`Stat`](https://open-props-ui.netlify.app/svelte/components/stat.md) | Yes | Yes | - |
| [`Stepper`](https://open-props-ui.netlify.app/svelte/components/stepper.md) | Yes | Yes | - |
| [`StepperItem`](https://open-props-ui.netlify.app/svelte/components/stepper.md) | Yes | Yes | - |
| [`Switch`](https://open-props-ui.netlify.app/svelte/components/switch.md) | Yes | No | `bind:checked` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. , `bind:group` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`SwitchInput`](https://open-props-ui.netlify.app/svelte/components/switch.md) | Yes | No | `bind:checked` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. , `bind:group` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Table`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`TableCell`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`TableColumn`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`TableColumnGroup`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`TableHeaderCell`](https://open-props-ui.netlify.app/svelte/components/table.md) | Yes | Yes | - |
| [`Tabs`](https://open-props-ui.netlify.app/svelte/components/tabs.md) | Yes | No | `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`TabsItem`](https://open-props-ui.netlify.app/svelte/components/tabs.md) | Yes | Yes | - |
| [`TabsLabel`](https://open-props-ui.netlify.app/svelte/components/tabs.md) | Yes | Yes | - |
| [`TabsPanel`](https://open-props-ui.netlify.app/svelte/components/tabs.md) | Yes | Yes | - |
| [`Textarea`](https://open-props-ui.netlify.app/svelte/components/textarea.md) | Yes | No | `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`TextField`](https://open-props-ui.netlify.app/svelte/components/text-field.md) | Yes | No | `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Timeline`](https://open-props-ui.netlify.app/svelte/components/timeline.md) | Yes | Yes | - |
| [`TimelineItem`](https://open-props-ui.netlify.app/svelte/components/timeline.md) | Yes | Yes | - |
| [`Toaster`](https://open-props-ui.netlify.app/svelte/components/toast.md) | Yes | Yes | - |
| [`ToggleButton`](https://open-props-ui.netlify.app/svelte/components/toggle.md) | Yes | No | `bind:checked` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`ToggleGroup`](https://open-props-ui.netlify.app/svelte/components/toggle.md) | Yes | No | `bind:value` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Tooltip`](https://open-props-ui.netlify.app/svelte/components/tooltip.md) | Yes | Yes | - |

### Next steps

#### [AI assistants](https://open-props-ui.netlify.app/svelte/llms.txt)

#### [Blocks](https://open-props-ui.netlify.app/blocks.md)

#### [Components](https://open-props-ui.netlify.app/svelte/components.md)

41 components, each with Svelte examples and its API.

#### [Concepts](https://open-props-ui.netlify.app/svelte/guide/concepts.md)

#### [Theme builder](https://open-props-ui.netlify.app/theme-builder.md)

## Vue

OPUI ships first-class components for Vue 3.5.2 and later. Install the package, import what you need, and you're set.

### Quick start

#### Install and import the CSS

```sh
pnpm add opui-css vue@3
```

```sh
npm install opui-css vue@3
```

```sh
yarn add opui-css vue@3
```

```sh
bun add opui-css vue@3
```

```ts
import { createApp } from "vue"
import "opui-css/css/imports.css"
import App from "./App.vue"

createApp(App).mount("#app")
```

#### Use a component

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button color="primary" variant="filled">Save</Button>
</template>
```

#### Make it yours

### What's in the CSS

### Import only what you use

List the files in a CSS file, and import that file in `main.ts` instead of `imports.css`:

Same code as in the HTML section.

In Nuxt, add the file to `css` in `nuxt.config.ts` instead.

```ts
import "./styles/main.css"
```

### Builds

### How to use

### Server rendering

- **53** of 69 need no hydration
- **16** hydrate for `indeterminate`, `v-model`, `valueSuffix`

| Component | Client | Server | Needs hydration |
| --- | --- | --- | --- |
| [`Accordion`](https://open-props-ui.netlify.app/vue/components/accordion.md) | Yes | Yes | - |
| [`AccordionActions`](https://open-props-ui.netlify.app/vue/components/accordion.md) | Yes | Yes | - |
| [`AccordionSummary`](https://open-props-ui.netlify.app/vue/components/accordion.md) | Yes | Yes | - |
| [`Anchor`](https://open-props-ui.netlify.app/vue/components/anchor.md) | Yes | Yes | - |
| [`Avatar`](https://open-props-ui.netlify.app/vue/components/avatar.md) | Yes | Yes | - |
| [`AvatarGroup`](https://open-props-ui.netlify.app/vue/components/avatar.md) | Yes | Yes | - |
| [`Badge`](https://open-props-ui.netlify.app/vue/components/badge.md) | Yes | Yes | - |
| [`Button`](https://open-props-ui.netlify.app/vue/components/button.md) | Yes | Yes | - |
| [`Callout`](https://open-props-ui.netlify.app/vue/components/callout.md) | Yes | Yes | - |
| [`Card`](https://open-props-ui.netlify.app/vue/components/card.md) | Yes | Yes | - |
| [`CardActions`](https://open-props-ui.netlify.app/vue/components/card.md) | Yes | Yes | - |
| [`CardHeader`](https://open-props-ui.netlify.app/vue/components/card.md) | Yes | Yes | - |
| [`Carousel`](https://open-props-ui.netlify.app/vue/components/carousel.md) | Yes | Yes | - |
| [`Checkbox`](https://open-props-ui.netlify.app/vue/components/checkbox.md) | Yes | No | `indeterminate` **Needs hydration** A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component imports the module, so the box looks unchecked until its script runs. Import `opui-css/css/js/checkbox.js` in the page. , `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`CheckboxInput`](https://open-props-ui.netlify.app/vue/components/checkbox.md) | Yes | No | `indeterminate` **Needs hydration** A DOM property, which `opui-css/css/js/checkbox.js` sets from `data-indeterminate`. The component imports the module, so the box looks unchecked until its script runs. Import `opui-css/css/js/checkbox.js` in the page. , `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Chip`](https://open-props-ui.netlify.app/vue/components/chip.md) | Yes | Yes | - |
| [`ControlGroup`](https://open-props-ui.netlify.app/vue/components/control-group.md) | Yes | Yes | - |
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
| [`NumberField`](https://open-props-ui.netlify.app/vue/components/number-field.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`OneTimeCode`](https://open-props-ui.netlify.app/vue/components/one-time-code.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Progress`](https://open-props-ui.netlify.app/vue/components/progress.md) | Yes | Yes | - |
| [`Radio`](https://open-props-ui.netlify.app/vue/components/radio.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`RadioInput`](https://open-props-ui.netlify.app/vue/components/radio.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Range`](https://open-props-ui.netlify.app/vue/components/range.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. , `valueSuffix` **Needs hydration** The value `<output>` follows the thumb through `opui-css/css/js/range.js`, which runs once the component's script loads. The track fill is CSS, so it works. Import `opui-css/css/js/range.js` in the page. |
| [`Rating`](https://open-props-ui.netlify.app/vue/components/rating.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Select`](https://open-props-ui.netlify.app/vue/components/select.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`SelectAll`](https://open-props-ui.netlify.app/vue/components/checkbox.md) | Yes | Yes | - |
| [`SortableTable`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`Stat`](https://open-props-ui.netlify.app/vue/components/stat.md) | Yes | Yes | - |
| [`Stepper`](https://open-props-ui.netlify.app/vue/components/stepper.md) | Yes | Yes | - |
| [`StepperItem`](https://open-props-ui.netlify.app/vue/components/stepper.md) | Yes | Yes | - |
| [`Switch`](https://open-props-ui.netlify.app/vue/components/switch.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`SwitchInput`](https://open-props-ui.netlify.app/vue/components/switch.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Table`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`TableCell`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`TableColumn`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`TableColumnGroup`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`TableHeaderCell`](https://open-props-ui.netlify.app/vue/components/table.md) | Yes | Yes | - |
| [`Tabs`](https://open-props-ui.netlify.app/vue/components/tabs.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`TabsItem`](https://open-props-ui.netlify.app/vue/components/tabs.md) | Yes | Yes | - |
| [`TabsLabel`](https://open-props-ui.netlify.app/vue/components/tabs.md) | Yes | Yes | - |
| [`TabsPanel`](https://open-props-ui.netlify.app/vue/components/tabs.md) | Yes | Yes | - |
| [`Textarea`](https://open-props-ui.netlify.app/vue/components/textarea.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`TextField`](https://open-props-ui.netlify.app/vue/components/text-field.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Timeline`](https://open-props-ui.netlify.app/vue/components/timeline.md) | Yes | Yes | - |
| [`TimelineItem`](https://open-props-ui.netlify.app/vue/components/timeline.md) | Yes | Yes | - |
| [`Toaster`](https://open-props-ui.netlify.app/vue/components/toast.md) | Yes | Yes | - |
| [`ToggleButton`](https://open-props-ui.netlify.app/vue/components/toggle.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`ToggleGroup`](https://open-props-ui.netlify.app/vue/components/toggle.md) | Yes | No | `v-model` **Needs hydration** The bound value only updates on the client. The native control still changes and submits with its form. Read the value from the form instead. |
| [`Tooltip`](https://open-props-ui.netlify.app/vue/components/tooltip.md) | Yes | Yes | - |

### Next steps

#### [AI assistants](https://open-props-ui.netlify.app/vue/llms.txt)

#### [Blocks](https://open-props-ui.netlify.app/blocks.md)

#### [Components](https://open-props-ui.netlify.app/vue/components.md)

41 components, each with Vue examples and its API.

#### [Concepts](https://open-props-ui.netlify.app/vue/guide/concepts.md)

#### [Theme builder](https://open-props-ui.netlify.app/theme-builder.md)
