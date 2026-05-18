<script setup lang="ts">
import { inject } from 'vue'
import {
  CurrentTabIdKey,
  type TabsTabProps,
} from './types'

const { class: className, tabId } = defineProps<TabsTabProps>()

defineOptions({
  inheritAttrs: false,
})

const currentTabId = inject(CurrentTabIdKey, undefined)
</script>

<template>
  <label
    :for="tabId || currentTabId"
    :class="['tab-label', className]"
    role="tab"
    v-bind="$attrs"
  >
    <slot></slot>
  </label>
</template>
