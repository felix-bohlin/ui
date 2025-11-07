---
overline: Components
title: Table
---

<script setup>
	import Example from "../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../.vitepress/theme/app/components/Baseline.vue"
    import Alert from "../.vitepress/theme/app/components/Alert.vue";
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

## API

<!--@include: ./table-api.md -->

## Browser compatibility

<Baseline :ids="['container-queries']" />

## Installation

::: code-group
<<< @/../src/themes/theme-one/components/table.css [table.css]
:::
