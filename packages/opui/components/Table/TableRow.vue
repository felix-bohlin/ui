<script setup lang="ts">
import type { TableRowProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tr :class="$props.class">
    <slot></slot>
  </tr>
</template>
