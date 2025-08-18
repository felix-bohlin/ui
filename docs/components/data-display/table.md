---
overline: Components
title: Table
---

<script setup>
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
    import Alert from "../../.vitepress/theme/app/components/Alert.vue";
</script>

Nothing fancy, just the standard HTML `<table>`.

<Example hideCode>
<template #example>

<table>
    <caption>Nordic Countries Overview</caption>
    <colgroup>
        <col>
        <col>
        <col>
    </colgroup>
    <thead>
        <tr>
            <th rowspan="2">Country</th>
            <th colspan="3">Major Cities</th>
            <th colspan="2">Nature</th>
        </tr>
        <tr>
            <th>Capital</th>
            <th>2nd Largest</th>
            <th>3rd Largest</th>
            <th>National Animal</th>
            <th>National Bird</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Norway</td>
            <td>Oslo</td>
            <td>Bergen</td>
            <td>Trondheim</td>
            <td>Elk</td>
            <td>White-throated Dipper</td>
        </tr>
        <tr>
            <td>Sweden</td>
            <td>Stockholm</td>
            <td>Göteborg</td>
            <td>Malmö</td>
            <td>Elk</td>
            <td>Common Blackbird</td>
        </tr>
        <tr>
            <td>Denmark</td>
            <td>København</td>
            <td>Aarhus</td>
            <td>Odense</td>
            <td>Mute Swan</td>
            <td>Mute Swan</td>
        </tr>
        <tr>
            <td>Finland</td>
            <td>Helsinki</td>
            <td>Espoo</td>
            <td>Tampere</td>
            <td>Brown Bear</td>
            <td>Whooper Swan</td>
        </tr>
        <tr>
            <td>Iceland</td>
            <td>Reykjavík</td>
            <td>Kópavogur</td>
            <td>Hafnarfjörður</td>
            <td>Gyrfalcon</td>
            <td>Gyrfalcon</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="6">Scandinavia != The Nordics</td>
        </tr>
    </tfoot>
</table>
</template>

<template #code>

```html
<table>
  <caption>
    Nordic Countries Overview
  </caption>
  <colgroup>
    <col />
    <col />
    <col />
  </colgroup>
  <thead>
    <tr>
      <th rowspan="2">Country</th>
      <th colspan="3">Major Cities</th>
      <th colspan="2">Nature</th>
    </tr>
    <tr>
      <th>Capital</th>
      <th>2nd Largest</th>
      <th>3rd Largest</th>
      <th>National Animal</th>
      <th>National Bird</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Norway</td>
      <td>Oslo</td>
      <td>Bergen</td>
      <td>Trondheim</td>
      <td>Elk</td>
      <td>White-throated Dipper</td>
    </tr>
    <tr>
      <td>Sweden</td>
      <td>Stockholm</td>
      <td>Göteborg</td>
      <td>Malmö</td>
      <td>Elk</td>
      <td>Common Blackbird</td>
    </tr>
    <tr>
      <td>Denmark</td>
      <td>København</td>
      <td>Aarhus</td>
      <td>Odense</td>
      <td>Mute Swan</td>
      <td>Mute Swan</td>
    </tr>
    <tr>
      <td>Finland</td>
      <td>Helsinki</td>
      <td>Espoo</td>
      <td>Tampere</td>
      <td>Brown Bear</td>
      <td>Whooper Swan</td>
    </tr>
    <tr>
      <td>Iceland</td>
      <td>Reykjavík</td>
      <td>Kópavogur</td>
      <td>Hafnarfjörður</td>
      <td>Gyrfalcon</td>
      <td>Gyrfalcon</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="6">Scandinavia != The Nordics</td>
    </tr>
  </tfoot>
</table>
```

</template>
</Example>

## Dense

<Example>
<template #example>

<table class="dense">
    <caption>CSS Units Dating Profile</caption>
    <thead>
        <tr>
            <th>Unit</th>
            <th>Personality</th>
            <th>Dating Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>px</td>
            <td>Fixed mindset, refuses to change</td>
            <td>In a committed relationship with legacy code</td>
        </tr>
        <tr>
            <td>rem</td>
            <td>Flexible, but dependent on parents</td>
            <td>Popular in the modern dating scene</td>
        </tr>
        <tr>
            <td>vw</td>
            <td>Goes with the flow, sometimes too much</td>
            <td>In an open relationship with responsive design</td>
        </tr>
        <tr>
            <td>ch</td>
            <td>Typography nerd</td>
            <td>Looking for meaningful connections</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Swipe right for responsive design!</td>
        </tr>
    </tfoot>
</table>

</template>
<template #code>

```html
<table class="dense">
  <!--  -->
</table>
```

</template>
</Example>

## Sticky header

<div class="not-rich-text">
<Alert title="When applying sticky header...">
<div class="rich-text">

If you inspect the page you can see that I cheated a bit with the `inset-block-start` value. That's because these docs already have sticky elements. But you get the point - you might have to do the same.

</div>
</Alert>
</div>

<style scoped>
	.sticky-header thead {
		inset-block-start: 119px;
	}
</style>

<Example>
<template #example>

<table class="sticky-header">
    <caption>Most Controversial CSS Properties of All Time</caption>
    <colgroup>
        <col style="width: 30%">
        <col style="width: 40%">
        <col style="width: 30%">
    </colgroup>
    <thead>
        <tr>
            <th>Property</th>
            <th>Drama Level</th>
            <th>Famous Battles</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>!important</td>
            <td>Nuclear ☢️</td>
            <td>The Great Specificity Wars of 2012</td>
        </tr>
        <tr>
            <td>z-index</td>
            <td>Astronomical 🌌</td>
            <td>"Why is my modal behind everything?!"</td>
        </tr>
        <tr>
            <td>float</td>
            <td>Legacy Nightmare 👻</td>
            <td>The Pre-Flexbox Dark Ages</td>
        </tr>
        <tr>
            <td>box-sizing</td>
            <td>Mathematical Chaos 🧮</td>
            <td>Border-box Revolution of 2011</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Yes I had AI generate the cringy table contents. I chuckled a little though.</td>
        </tr>
    </tfoot>
</table>
</template>
<template #code>

```html
<table class="sticky-header">
  <!--  -->
</table>
```

</template>
</Example>

## API

<!--@include: ./table-api.md -->

## Browser compatibility

<Baseline :ids="['container-queries']" />

## Installation

::: code-group
<<< @/../node_modules/opui-css/src/components/table.css [table.css]
:::
