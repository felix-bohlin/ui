<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { density, stickyHeader } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <table
    :class="[
      'ui-table',
      { 'ui-sticky-header': stickyHeader },
      density && density !== 'normal' && `ui-${density}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </table>
</template>
