<script setup lang="ts">
import { classAttrs } from "../cx"
import type { TableHeaderCellProps as Props, Slots } from "./types.vue-props"

const { numeric, sortable } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <th
    v-bind="classAttrs([{ 'ui-numeric': numeric }, $props.class])"
    :data-sort="sortable ? '' : undefined"
  >
    <button v-if="sortable" type="button"><slot></slot></button
    ><slot v-else></slot>
  </th>
</template>
