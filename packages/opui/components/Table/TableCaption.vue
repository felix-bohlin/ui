<script setup lang="ts">
import type { TableCaptionProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <caption :class="$props.class">
    <slot></slot>
  </caption>
</template>
