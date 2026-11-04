<script setup lang="ts">
import type { MessagesProps as Props, MessagesSlots } from "./types.vue-props"

defineProps<Props>()
defineSlots<MessagesSlots>()
</script>

<template>
  <ol :class="['ui-messages', $props.class]">
    <slot></slot>
  </ol>
</template>
