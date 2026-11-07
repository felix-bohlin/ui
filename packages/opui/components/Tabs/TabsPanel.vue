<script setup lang="ts">
import type { TabsPanelProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-panel', $props.class]">
    <slot></slot>
  </div>
</template>
