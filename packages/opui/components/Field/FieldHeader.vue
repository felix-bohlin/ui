<script setup lang="ts">
import type { FieldHeaderProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <span :class="['ui-header', $props.class]">
    <slot></slot>
  </span>
</template>
