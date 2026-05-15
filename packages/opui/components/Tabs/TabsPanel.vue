<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps<{
  class?: any
  panelId?: string
  tabId?: string
}>()

const currentPanelId = inject<string>('currentPanelId')
const currentTabId = inject<string>('currentTabId')
</script>

<template>
<div
  :id="props.panelId || currentPanelId"
  :class="['tab-panel', props.class]"
  role="tabpanel"
  :aria-labelledby="props.tabId || currentTabId"
>
  <slot></slot>
</div>
</template>
