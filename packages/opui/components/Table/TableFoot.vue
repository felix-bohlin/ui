<script setup lang="ts">
import type { TableFootProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tfoot :class="$props.class">
    <slot></slot>
  </tfoot>
</template>
