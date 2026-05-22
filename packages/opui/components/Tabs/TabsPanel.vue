<script setup lang="ts">
import { inject } from "vue"
import { CurrentPanelIdKey, CurrentTabIdKey, type Slots, type TabsPanelProps } from "./types.d.vue"

const { panelId, tabId } = defineProps<TabsPanelProps>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const currentPanelId = inject(CurrentPanelIdKey, undefined)
const currentTabId = inject(CurrentTabIdKey, undefined)
</script>

<template>
  <div
    :id="panelId || currentPanelId"
    :class="['tab-panel', $props.class]"
    role="tabpanel"
    :aria-labelledby="tabId || currentTabId"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
