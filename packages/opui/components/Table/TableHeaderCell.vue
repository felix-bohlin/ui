<script setup lang="ts">
import type { TableHeaderCellProps as Props, Slots } from "./types.vue-props"

const { numeric } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <th :class="[{ 'ui-numeric': numeric }, $props.class]">
    <slot></slot>
  </th>
</template>
