<script setup lang="ts">
import type {
  DescriptionListTermProps as Props,
  Slots,
} from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dt>
    <slot></slot>
  </dt>
</template>
