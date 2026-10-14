<script setup lang="ts">
import type { Slots, TabsPanelProps } from "./types.d.vue"

defineProps<TabsPanelProps>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-tab-panel', $props.class]">
    <slot></slot>
  </div>
</template>
