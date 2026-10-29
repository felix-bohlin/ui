<script setup lang="ts">
import type { TableRowProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tr :class="$props.class">
    <slot></slot>
  </tr>
</template>
