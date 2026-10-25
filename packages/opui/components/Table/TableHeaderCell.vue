<script setup lang="ts">
import type { TableHeaderCellProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <th :class="$props.class">
    <slot></slot>
  </th>
</template>
