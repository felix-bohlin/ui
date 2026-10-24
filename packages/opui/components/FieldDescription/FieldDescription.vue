<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <p :class="['ui-description', $props.class]">
    <slot></slot>
  </p>
</template>
