---
overline: Guide
title: Getting started
---

<script setup>
import Accordion from "../.vitepress/theme/app/components/Accordion.vue";
import Alert from "../.vitepress/theme/app/components/Alert.vue";
</script>

<style scoped>
   .overflow .blocks {
      overflow-y: auto;
      max-block-size: 15lh;
   }
</style>

<span></span>

You can choose between:

- [Manual setup](#manual-setup) (more fun, recommended)
- [NPM installation](#npm-installation) (a lot less fun)
- [CDN](#cdn) (not fun either but good for quick prototyping)

<div class="not-rich-text">

<Alert class="ok outlined">

<p>Open Props UI is <u><strong>just CSS</strong></u>. Therefore you're able to go and <strong>copy and paste</strong> any <a class="link" href="/components">component</a> right now without any installs. You don't even need Open Props! It won't necessarily look and feel as intended, but if that suits your project then skip this page.</p>

</Alert>

</div>

## Manual setup

### 1. Install Open Props

Open Props v2 hasn't dropped yet, which is why this project relies on the OPv2 beta. The difference right now between the OPv1 and the OPv2 beta aren't huge (the way OPUI consumes it), so you should be fine with either version.

```sh
# pnpm
pnpm add opbeta@npm:open-props@2.0.0-beta.5 -S

# npm
npm i opbeta@npm:open-props@2.0.0-beta.5 -S
```

### 2. Base setup

The setup process will differ a bit if you use a framework, but the core principles still apply. You should have no problems getting it to work though :+1: Otherwise, [let me know](https://github.com/felix-bohlin/ui).

This is a nice, recommended folder structure. Feel free to change it to your needs.

```
├─ src
  └─ core
  │  └─ normalize.css
  │  └─ utils.css
  └─ [theme folder name]
    └─ theme.css
    └─ open-props.css
    └─ components
       └─ button.css
       └─ ...
```

<div class="not-rich-text">

<ul class="definition-list dotted">
  <li>
    <span class="term"><code>imports.css</code></span>
    <hr>
    <span class="description">imports all your CSS</span>
  </li>
  <li>
    <span class="term"><code>open-props.css</code></span>
    <hr>
    <span class="description">consists of Open Props imports, only</span>
  </li>
  <li>
   <span class="term"><code>theme.css</code></span>
   <hr>
   <span class="description">OPUI theme setup
</span>
  </li>
</ul>

</div>

<div class="theme-one">

::: code-group
<<< @/../src/themes/theme-one/imports.css [imports.css]
<<< @/../src/open-props.css [open-props.css]
<<< @/../src/themes/theme-one/theme.css [theme.css]

:::

</div>
<div class="theme-two">

::: code-group
<<< @/../src/themes/theme-two/imports.css [imports.css]
<<< @/../src/themes/theme-two/theme.css [theme.css]
<<< @/../src/open-props.css [open-props.css]

:::

</div>

<Accordion variant="tonal" style="margin-block-start: var(--size-3)">

<template #summary>src/core</template>

::: code-group
<<< @/../src/core/normalize.css [normalize.css]
<<< @/../src/core/utils.css [utils.css]
:::

</Accordion>

### 3. Copy & paste

Browse [all the components](/components).

**Copy and paste** the HTML and CSS (see the "Installation" section on each component page) and you're good to go!

## NPM installation

```sh
# pnpm
pnpm add opui-css -S

# npm
npm i opui-css -S
```

### Usage

You can import themes and components directly from the package:

```css
/* Import theme-two (default) */
@import "opui-css";

/* Import theme-one */
@import "opui-css/theme-one";

/* Import just the components for theme-one */
@import "opui-css/theme-one/components";

/* Import only the Open Props setup */
@import "opui-css/open-props";
```

### Bundler setup

If you're using **Vite**, these imports will work out of the box.

For other **PostCSS** environments, you'll need the `postcss-import` plugin to resolve imports from `node_modules`.

::: code-group

```javascript [postcss.config.js]
export default {
  plugins: {
    "postcss-import": {},
  },
}
```

:::

#### Bundled files

<div class="not-rich-text">

<ul class="definition-list dotted">
  <li>
    <span class="term"><code>dist/theme-one/theme-one.css</code></span>
    <hr>
    <span class="description">OP, imports, theme, components</span>
  </li>
  <li>
    <span class="term"><code>dist/theme-one/components.css</code></span>
    <hr>
    <span class="description">all the components for theme-one</span>
  </li>
  <li>
   <span class="term"><code>dist/theme-two/theme-two.css</code></span>
   <hr>
   <span class="description">OP, imports, theme, components</span>
  </li>
  <li>
    <span class="term"><code>dist/theme-two/components.css</code></span>
    <hr>
    <span class="description">all the components for theme-two</span>
  </li>
  <li>
    <span class="term"><code>dist/op.css</code></span>
    <hr>
    <span class="description">all the needed Open Props imports</span>
  </li>
</ul>

</div>

## CDN

https://cdn.jsdelivr.net/npm/opui-css/
