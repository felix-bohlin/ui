<script setup lang="ts">
import { classAttrs } from "../cx"
import type { TableCellProps as Props, Slots } from "./types.vue-props"

const { numeric } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <td v-bind="classAttrs([{ 'ui-numeric': numeric }, $props.class])">
    <slot></slot>
  </td>
</template>
