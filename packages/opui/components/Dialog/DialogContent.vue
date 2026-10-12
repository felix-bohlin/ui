<script setup lang="ts">
import type { DialogContentProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-content', $props.class]">
    <slot></slot>
  </div>
</template>
