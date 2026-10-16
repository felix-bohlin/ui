<script setup lang="ts">
import type { SectionProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <thead :class="$props.class">
    <slot></slot>
  </thead>
</template>
