<script setup lang="ts">
import type { Slots, TabsPanelProps } from "./types.vue-props"

defineProps<TabsPanelProps>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-panel', $props.class]">
    <slot></slot>
  </div>
</template>
