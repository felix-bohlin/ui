<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { stickyHeader, variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <table
    :class="[
      'ui-table',
      { 'ui-sticky-header': stickyHeader },
      variant && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </table>
</template>
