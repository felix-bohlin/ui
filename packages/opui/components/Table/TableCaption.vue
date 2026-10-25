<script setup lang="ts">
import type { TableCaptionProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <caption :class="$props.class">
    <slot></slot>
  </caption>
</template>
