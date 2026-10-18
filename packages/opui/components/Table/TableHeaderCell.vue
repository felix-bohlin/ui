<script setup lang="ts">
import type { TableHeaderCellProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <th :class="$props.class">
    <slot></slot>
  </th>
</template>
