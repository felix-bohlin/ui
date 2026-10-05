<script setup lang="ts">
import type { Slots, TabsPanelProps } from "./types.d.vue"

defineProps<TabsPanelProps>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div :class="['ui-tab-panel', $props.class]" v-bind="$attrs">
    <slot></slot>
  </div>
</template>
