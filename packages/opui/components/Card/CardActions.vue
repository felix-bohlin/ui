<script setup lang="ts">
import type { CardActionsProps as Props, Slots } from "./types.d.vue"

const { align } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'ui-actions',
      align && align !== 'start' && `ui-align-${align}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </div>
</template>
