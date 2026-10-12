<script setup lang="ts">
import type { FieldLabelProps as Props, Slots } from "./types.d.vue"

const { visuallyHidden } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <span :class="[visuallyHidden ? 'ui-sr-only' : 'ui-label', $props.class]">
    <slot></slot>
  </span>
</template>
