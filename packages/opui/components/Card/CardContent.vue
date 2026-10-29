<script setup lang="ts">
import type { CardContentProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-content', $props.class]">
    <slot></slot>
  </div>
</template>
