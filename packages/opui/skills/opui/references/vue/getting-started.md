# Getting started

OPUI ships first-class Vue components. Install the package, import what you need, and you're set.

## Install via NPM

The components ship as uncompiled single-file components (`.vue` and `.ts`), so your build has to compile them. Any setup with Vue SFC support works, for example Vite with `@vitejs/plugin-vue`, Nuxt, or Astro with `@astrojs/vue`.

`pnpm`

```sh
pnpm add opui-css open-props vue -S
```

`npm`

```sh
npm install opui-css open-props vue -S
```

## Import the CSS

Vue components ship markup only - the CSS still has to be imported once, in the entry file that creates your app. Import everything:

```ts
import { createApp } from "vue"
import "opui-css/css/imports.css"
import App from "./App.vue"


createApp(App).mount("#app")
```

Or pick and choose in a CSS file, and import that file in `main.ts` instead:

```css
@import "opui-css/css/layers.css";
@import "opui-css/open-props.css";
@import "opui-css/core/palette.css";
@import "opui-css/css/theme.css";
@import "opui-css/core/normalize.css";
@import "opui-css/css/components.css";
@import "opui-css/core/utils.css";
```

```ts
import "./styles/main.css"
```

In Nuxt, add the file to `css` in `nuxt.config.ts` instead.

## How to use

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
  <Button variant="filled">Click me</Button>
</template>
```

[Concepts](https://open-props-ui.netlify.app/vue/guide/concepts.md) explains how props map to classes, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/vue/components.md). [Theming](https://open-props-ui.netlify.app/vue/guide/theming.md) covers colors, density, motion and contrast.

## Server rendering

Without hydration (Nuxt, or Astro with `@astrojs/vue` and no `client:*` directive), every component renders complete HTML. The native controls work and submit with their form. A few things only update on the client:

- [Checkbox](https://open-props-ui.netlify.app/vue/components/checkbox.md#indeterminate) `indeterminate`: it's a DOM property, so the box looks unchecked. Or call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.
- [Range](https://open-props-ui.netlify.app/vue/components/range.md#value) value: the `<output>` doesn't follow the thumb. The track fill is CSS, so it's fine.
- `v-model` on [Checkbox](https://open-props-ui.netlify.app/vue/components/checkbox.md), [Classic select](https://open-props-ui.netlify.app/vue/components/select.md#classic-select), [Radio](https://open-props-ui.netlify.app/vue/components/radio.md), [Range](https://open-props-ui.netlify.app/vue/components/range.md), [Select](https://open-props-ui.netlify.app/vue/components/select.md), [Switch](https://open-props-ui.netlify.app/vue/components/switch.md), [Text field](https://open-props-ui.netlify.app/vue/components/text-field.md) and [Textarea](https://open-props-ui.netlify.app/vue/components/textarea.md): the ref stays put. The native value still changes and submits.

Hydrate those (`client:load` in Astro) or use them in a client-rendered Vue app. Component pages say what needs hydration next to the browser support chips, and the API tables mark each prop with a crossed-out server icon.
