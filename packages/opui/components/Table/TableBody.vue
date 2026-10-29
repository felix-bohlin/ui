<script setup lang="ts">
import type { TableBodyProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tbody :class="$props.class">
    <slot></slot>
  </tbody>
</template>
