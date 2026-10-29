<script setup lang="ts">
import type { DialogHeaderProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-header', $props.class]">
    <slot></slot>
  </div>
</template>
