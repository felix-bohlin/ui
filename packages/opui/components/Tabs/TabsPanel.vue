<script setup lang="ts">
import { inject } from 'vue'
import {
  CurrentPanelIdKey,
  CurrentTabIdKey,
  type TabsPanelProps,
} from './types'

const {
  class: className,
  panelId,
  tabId,
} = defineProps<TabsPanelProps>()

defineOptions({
  inheritAttrs: false,
})

const currentPanelId = inject(CurrentPanelIdKey, undefined)
const currentTabId = inject(CurrentTabIdKey, undefined)
</script>

<template>
  <div
    :id="panelId || currentPanelId"
    :class="['tab-panel', className]"
    role="tabpanel"
    :aria-labelledby="tabId || currentTabId"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
