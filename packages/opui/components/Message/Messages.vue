<script setup lang="ts">
import type { MessagesProps, MessagesSlots } from "./types.d.vue"

const { label } = defineProps<MessagesProps>()
defineSlots<MessagesSlots>()
</script>

<template>
  <ol :aria-label="label" :class="['ui-messages', $props.class]">
    <slot></slot>
  </ol>
</template>
