<script setup lang="ts">
import type { FieldSuffixProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <span :class="['ui-suffix', $props.class]">
    <slot></slot>
  </span>
</template>
