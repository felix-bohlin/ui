---
overline: Components
title: Tab buttons
---

<script setup>
	import {ref,onMounted} from 'vue'
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
	import Alert from "../../.vitepress/theme/app/components/Alert.vue";
</script>

<div class="not-rich-text">
<Alert title="Can't I just use Toggle button group?" severity="ok" variant="outlined">

<div class="rich-text">

<p>Sure, why not? Just don't forget the accessibility stuff.</p>

<a href="/components/actions/toggle-button-group">Toggle button group</a>

</div>
</Alert>

</div>

## Variants

### Underlined

<Example>
<template #example>
<nav class="tabs underlined">
<div
    role="tablist"
    aria-label="Underlined tabs"
  >
    <button
      id="underlined-tab-1"
      role="tab"
      aria-controls="tabpanel-1"
      aria-selected="true"
    >
      Profile
    </button>
    <button
      id="underlined-tab-2"
      role="tab"
      aria-controls="tabpanel-2"
    >
      Settings
    </button>
    <button
      id="underlined-tab-3"
      role="tab"
      aria-controls="tabpanel-3"
    >
      Notifications
    </button>
  </div>
</nav>
</template>
<template #code>

</template>
</Example>

### Filled

<Example>
<template #example>
<nav class="tabs filled">
<div
    role="tablist"
    aria-label="Filled tabs"
  >
    <button
      id="filled-tab-1"
      role="tab"
      aria-controls="tabpanel-1"
      aria-selected="true"
    >
      Korg
    </button>
    <button
      id="filled-tab-2"
      role="tab"
      aria-controls="tabpanel-2"
    >
      Yamaha
    </button>
    <button
      id="filled-tab-3"
      role="tab"
      aria-controls="tabpanel-3"
    >
      Roland
    </button>
  </div>
</nav>
</template>
<template #code>

</template>
</Example>

## Accessibility

There's a lot. Read about it [here](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/#accessibilityfeatures).

## Installation

::: code-group
<<< @/../src/actions/tab-buttons.css [tab-buttons.css]
:::
