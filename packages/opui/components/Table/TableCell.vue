<script setup lang="ts">
import type { TableCellProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <td :class="$props.class">
    <slot></slot>
  </td>
</template>
