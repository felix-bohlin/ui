<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps<{
  class?: any
  tabId?: string
}>()

const currentTabId = inject<string>('currentTabId')
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
