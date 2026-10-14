<script setup lang="ts">
import type { AccordionActionsProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-actions', $props.class]">
    <slot></slot>
  </div>
</template>
