<script setup lang="ts">
import "../../elements/sortable-table.js"
import type { Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component
    is="opui-sortable-table"
    :class="['ui-sortable-table', $props.class]"
  >
    <slot></slot>
  </component>
</template>
