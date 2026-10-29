<script setup lang="ts">
import type { TableCellProps as Props, Slots } from "./types.vue-props"

const { numeric } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <td :class="[{ 'ui-numeric': numeric }, $props.class]">
    <slot></slot>
  </td>
</template>
