<script setup lang="ts">
import type { TableCellProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <td :class="$props.class">
    <slot></slot>
  </td>
</template>
