<script setup lang="ts">
import type { MessagesProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <ol :class="['ui-messages', $props.class]">
    <slot></slot>
  </ol>
</template>
