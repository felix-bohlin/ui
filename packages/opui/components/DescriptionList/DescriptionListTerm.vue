<script setup lang="ts">
import type { TermProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dt :class="['ui-term', $props.class]">
    <slot></slot>
  </dt>
</template>
