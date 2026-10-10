<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { stickyHeader, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <table
    :class="[
      'ui-table',
      { 'ui-sticky-header': stickyHeader },
      variant && `ui-${variant}`,
      $props.class,
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </table>
</template>
