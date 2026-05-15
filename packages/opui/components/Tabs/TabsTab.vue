<script setup lang="ts">
import { inject } from 'vue'
import { CurrentTabIdKey } from './types'

const props = defineProps<{
  class?: any
  tabId?: string
}>()

const currentTabId = inject(CurrentTabIdKey)
</script>

<template>
<label
  :for="props.tabId || currentTabId"
  :class="['tab-label', props.class]"
  role="tab"
>
  <slot></slot>
</label>
</template>
