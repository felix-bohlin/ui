<script setup lang="ts">
import type { CardHeaderProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <hgroup :class="[$props.class]">
    <slot></slot>
  </hgroup>
</template>
