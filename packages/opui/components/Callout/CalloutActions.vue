<script setup lang="ts">
import type { CalloutActionsProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-actions', $props.class]">
    <slot></slot>
  </div>
</template>
