<script setup lang="ts">
import type { FieldFooterProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <span :class="['ui-footer', $props.class]">
    <slot></slot>
  </span>
</template>
