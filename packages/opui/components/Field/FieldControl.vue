<script setup lang="ts">
import type { FieldControlProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <span :class="['ui-field', $props.class]">
    <slot></slot>
  </span>
</template>
