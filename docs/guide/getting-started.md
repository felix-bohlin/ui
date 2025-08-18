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

This guide will set you up with:

- Open Props
- a normalize
- some util classes
- base theme setup

<div class="not-rich-text">

<Alert>
<p>Open Props UI is <strong>just CSS</strong>. Therefore you're able to go and <strong>copy and paste</strong> any <a class="link" href="/components/actions/button">component</a> right now without any installs. You don't even need Open Props! It won't necessarily look and feel as intended, but if that suits your project then skip this page.</p>
</Alert>
</div>

## 1. Install Open Props

Open Props v2 hasn't dropped yet, which is why this project relies on the OPv2 beta. The difference right now between the OPv1 and the OPv2 beta aren't huge (the way OPUI consumes it), so you should be fine with either version.

```sh
# pnpm
pnpm i opbeta@npm:open-props@2.0.0-beta.5 -S

# npm
npm i opbeta@npm:open-props@2.0.0-beta.5 -S
```

## 2. Base setup

The setup process will differ a bit if you use a framework, but the core principles still apply. You should have no problems getting it to work though :+1: Otherwise, [let me know](https://github.com/felix-bohlin/ui).

<div class="not-rich-text">


`main.css` is the home of all your CSS.
::: code-group [main.css]
<<< @/../node_modules/opui-css/src/main.css [main.css]
:::

`index.css` consists of OPUI imports, only.
::: code-group [index.css]
<<< @/../node_modules/opui-css/src/index.css [index.css]
:::


<Accordion variant="tonal" style="margin-block-start: var(--size-3)">
<template #summary>OPUI core</template>

::: code-group
<<< @/../node_modules/opui-css/src/core/normalize.css [normalize.css]
<<< @/../node_modules/opui-css/src/core/utils.css [utils.css]
<<< @/../node_modules/opui-css/src/core/theme.css [theme.css]
<<< @/../node_modules/opui-css/src/core/components.css [components.css]
:::

</Accordion>
</div>

### Folder structure

This is the folder structure that comes out of the box. Feel free to change it to your needs.

```
├─ main.css
├─ index.css
├─ core
│  └─ normalize.css
│  └─ theme.css
│  └─ utils.css
│  └─ components.css
├─ components
│  └─ button.css
│  └─ ...

```

<div class="not-rich-text">
<Alert severity="warning">
<p>While many components will work as intended in modern browsers - some are using features that haven't landed outside Chromium with <strong>experimental feature flags</strong> enabled.</p>

<a href="/guide/what-is-open-props-ui" class="link">About Open Props UI.</a>
</Alert>

</div>

## 3. Copy & paste

Browse [all the components](/components/actions/button).

**Copy and paste** the HTML and CSS (see the "Installation" section on each component page) and you're good to go!
