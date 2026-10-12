<script setup lang="ts">
import type { FieldStartTextProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <span :class="['ui-start-text', $props.class]">
    <slot></slot>
  </span>
</template>
