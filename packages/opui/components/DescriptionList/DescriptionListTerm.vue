<script setup lang="ts">
import type {
  DescriptionListTermProps as Props,
  Slots,
} from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dt :class="[$props.class]">
    <slot></slot>
  </dt>
</template>
