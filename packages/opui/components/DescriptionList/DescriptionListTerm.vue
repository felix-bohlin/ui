<script setup lang="ts">
import type { DescriptionListTermProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dt :class="[$props.class]">
    <slot></slot>
  </dt>
</template>
