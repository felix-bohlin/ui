<script setup lang="ts">
import "../../elements/sortable-table.js"
import type { Props, Slots } from "./types.vue-props"

const { ascendingLabel, descendingLabel } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component
    is="opui-sortable-table"
    :ascending-label="ascendingLabel"
    :class="['ui-sortable-table', $props.class]"
    :descending-label="descendingLabel"
  >
    <slot></slot>
  </component>
</template>
