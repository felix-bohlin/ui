<script setup lang="ts">
import { type HTMLAttributes, useAttrs } from "vue"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { TableHeaderCellProps as Props, Slots } from "./types.vue-props"

const { numeric, sortable } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes
</script>

<template>
  <th
    :data-sort="sortable ? '' : undefined"
    v-bind="{
      ...defined(attrs),
      ...classAttrs([{ 'ui-numeric': numeric }, $props.class]),
    }"
  >
    <button v-if="sortable" type="button">
      <slot></slot>
    </button>
    <slot v-else></slot>
  </th>
</template>
