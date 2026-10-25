<script setup lang="ts">
import type { CardHeaderProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <hgroup :class="['ui-header', $props.class]">
    <slot></slot>
  </hgroup>
</template>
