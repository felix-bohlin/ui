<script setup lang="ts">
import type { DialogFooterProps as Props, Slots } from "./types.vue-props"

const { align } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'ui-footer',
      align && align !== 'end' && `ui-align-${align}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </div>
</template>
