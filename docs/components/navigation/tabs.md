---
overline: Components
title: Tabs
---

<script setup>
	import {ref,onMounted} from 'vue'
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
	import Alert from "../../.vitepress/theme/app/components/Alert.vue";

import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'

</script>

<div class="not-rich-text">
<Alert title="Javascript is required" severity="ok" variant="outlined">

You will need Javascript in order to not only switch tabs, but to make sure you can use them in [an accessible way](#accessibility).

</Alert>
</div>

## Variants

### Underlined

<Example>
<template #example>
<nav class="tabs underlined">
 <TabsRoot
    default-value="tab1"
  >
    <TabsList aria-label="tabs example">
      <TabsTrigger value="tab1">
        One
      </TabsTrigger>
      <TabsTrigger value="tab2">
        Two
      </TabsTrigger>
      <TabsTrigger value="tab3">
        Three
      </TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">
      Tab one content
    </TabsContent>
    <TabsContent value="tab2">
      Tab two content
    </TabsContent>
    <TabsContent value="tab3">
      Tab three content
    </TabsContent>
  </TabsRoot>
</nav>

<nav class="tabs underlined">
<div
    role="tablist"
    @keydown="handleKeyDown"
    aria-label="Underlined tabs"
  >
    <button
      id="underlined-tab-1"
      role="tab"
      @click="setActiveTab('profile')"
      :aria-selected="activeTab === 'profile'"
      aria-controls="tabpanel-1"
      :tabindex="activeTab === 'profile' ? 0 : -1"
    >
      Profile
    </button>
    <button
      id="underlined-tab-2"
      role="tab"
      @click="setActiveTab('settings')"
      :aria-selected="activeTab === 'settings'"
      aria-controls="tabpanel-2"
      :tabindex="activeTab === 'settings' ? 0 : -1"
    >
      Settings
    </button>
    <button
      id="underlined-tab-3"
      role="tab"
      @click="setActiveTab('notifications')"
      :aria-selected="activeTab === 'notifications'"
      aria-controls="tabpanel-3"
      :tabindex="activeTab === 'notifications' ? 0 : -1"
    >
      Notifications
    </button>
  </div>

<div v-if="activeTab === 'profile'" role="tabpanel" id="tabpanel-1" aria-labelledby="underlined-tab-1">
	Profile panel
</div>
<div v-if="activeTab === 'settings'" role="tabpanel" id="tabpanel-2" aria-labelledby="underlined-tab-2">
 Settings panel
</div>
<div v-if="activeTab === 'notifications'" role="tabpanel" id="tabpanel-3" aria-labelledby="underlined-tab-3">
 Notifications panel
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
    @keydown="handleKeyDown2"
    aria-label="Filled tabs"
  >
    <button
      id="filled-tab-1"
      role="tab"
      @click="setActiveTab2('korg')"
      :aria-selected="activeTab2 === 'korg'"
      aria-controls="tabpanel-1"
      :tabindex="activeTab2 === 'korg' ? 0 : -1"
    >
      Korg
    </button>
    <button
      id="filled-tab-2"
      role="tab"
      @click="setActiveTab2('yamaha')"
      :aria-selected="activeTab2 === 'yamaha'"
      aria-controls="tabpanel-2"
      :tabindex="activeTab2 === 'yamaha' ? 0 : -1"
    >
      Yamaha
    </button>
    <button
      id="filled-tab-3"
      role="tab"
      @click="setActiveTab2('roland')"
      :aria-selected="activeTab2 === 'roland'"
      aria-controls="tabpanel-3"
      :tabindex="activeTab2 === 'roland' ? 0 : -1"
    >
      Roland
    </button>
  </div>

<div v-if="activeTab2 === 'korg'" role="tabpanel" id="tabpanel-1" aria-labelledby="filled-tab-1">
	Korg panel
</div>
<div v-if="activeTab2 === 'yamaha'" role="tabpanel" id="tabpanel-2" aria-labelledby="filled-tab-2">
 Yamaha panel
</div>
<div v-if="activeTab2 === 'roland'" role="tabpanel" id="tabpanel-3" aria-labelledby="filled-tab-3">
 Roland panel
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
<<< @/../src/navigation/tabs.css [tabs.css]
:::
