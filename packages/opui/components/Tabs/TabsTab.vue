<script setup lang="ts">
import { inject } from 'vue'
import {
  CurrentTabIdKey,
  type TabsTabProps,
} from './types'

const { tabId } = defineProps<TabsTabProps>()

defineOptions({
  inheritAttrs: false,
})

const currentTabId = inject(CurrentTabIdKey, undefined)
</script>

<template>
  <label
    :for="tabId || currentTabId"
    :class="['tab-label', $props.class]"
    role="tab"
    v-bind="$attrs"
  >
    <slot></slot>
  </label>
</template>
