# Getting started

OPUI ships first-class Svelte 5 components. Install the package, import what you need, and you're set.

## Install via NPM

The components ship as uncompiled Svelte components (`.svelte` and `.ts`), so your build has to compile them. They need Svelte 5.29 or later. Any setup with Svelte support works, for example SvelteKit, Vite with `@sveltejs/vite-plugin-svelte`, or Astro with `@astrojs/svelte`.

`pnpm`

```sh
pnpm add opui-css open-props svelte -S
```

`npm`

```sh
npm install opui-css open-props svelte -S
```

## Import the CSS

Svelte components ship markup only - the CSS still has to be imported once, in your root layout or the entry file that mounts your app. Import everything:

```svelte
<script lang="ts">
  import "opui-css/css/imports.css"

  let { children } = $props()
</script>

{@render children()}
```

Or pick and choose in a CSS file, and import that file in your layout instead:

```css
@import "opui-css/css/layers.css";
@import "opui-css/open-props.css";
@import "opui-css/core/palette.css";
@import "opui-css/css/theme.css";
@import "opui-css/core/normalize.css";
@import "opui-css/css/components.css";
@import "opui-css/core/utils.css";
```

```svelte
<script lang="ts">
  import "../styles/main.css"

  let { children } = $props()
</script>

{@render children()}
```

## How to use

```svelte
<script lang="ts">
  import { Button } from "opui-css/svelte"
</script>

<Button variant="filled">Click me</Button>
```

Slots are snippets: the default slot is `children` and named slots are camelCased, such as `endText`. `TextField`, `Textarea`, `Select`, `ClassicSelect` and `Range` support `bind:value`. `Checkbox` and `Switch` support `bind:checked` and `bind:group`, and `Radio` supports `bind:group`.

[Concepts](https://open-props-ui.netlify.app/svelte/guide/concepts.md) explains how props map to classes, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/svelte/components.md). [Theming](https://open-props-ui.netlify.app/svelte/guide/theming.md) covers colors, density, motion and contrast.

## Server rendering

Without hydration (SvelteKit with `csr = false`, or Astro with `@astrojs/svelte` and no `client:*` directive), every component renders complete HTML. The native controls work and submit with their form. A few things only update on the client:

- [Checkbox](https://open-props-ui.netlify.app/svelte/components/checkbox.md#indeterminate) `indeterminate`: it's a DOM property, so the box looks unchecked. Or call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.
- [Range](https://open-props-ui.netlify.app/svelte/components/range.md#value) value: the `<output>` doesn't follow the thumb. The track fill is CSS, so it's fine.
- [Drawer](https://open-props-ui.netlify.app/svelte/components/drawer.md) with your own heading in `header`: `aria-labelledby` points at it after hydration. A `DrawerHeader` with `heading` works without it.
- `bind:` on [Checkbox](https://open-props-ui.netlify.app/svelte/components/checkbox.md), [Classic select](https://open-props-ui.netlify.app/svelte/components/select.md#classic-select), [Radio](https://open-props-ui.netlify.app/svelte/components/radio.md), [Range](https://open-props-ui.netlify.app/svelte/components/range.md), [Select](https://open-props-ui.netlify.app/svelte/components/select.md), [Switch](https://open-props-ui.netlify.app/svelte/components/switch.md), [Text field](https://open-props-ui.netlify.app/svelte/components/text-field.md) and [Textarea](https://open-props-ui.netlify.app/svelte/components/textarea.md): the bound state stays put. The native value still changes and submits.

Hydrate those (`client:load` in Astro) or keep client-side rendering on. Component pages say what needs hydration next to the browser support chips, and the API tables mark each prop with a crossed-out server icon.
