<script setup lang="ts">
import { inject } from 'vue'
import { CurrentPanelIdKey, CurrentTabIdKey } from './types'

const props = defineProps<{
  class?: any
  panelId?: string
  tabId?: string
}>()

const currentPanelId = inject(CurrentPanelIdKey)
const currentTabId = inject(CurrentTabIdKey)
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
