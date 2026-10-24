<script setup lang="ts">
import type { AccordionActionsProps as Props, Slots } from "./types.d.vue"

const { align } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'ui-actions',
      align && align !== 'end' && `ui-align-${align}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </div>
</template>
