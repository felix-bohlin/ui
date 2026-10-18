<script setup lang="ts">
import type { TableBodyProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tbody :class="$props.class">
    <slot></slot>
  </tbody>
</template>
