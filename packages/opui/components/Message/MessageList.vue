<script setup lang="ts">
import type {
  MessageListProps as Props,
  MessageListSlots,
} from "./types.vue-props"

const { direct, role } = defineProps<Props>()
defineSlots<MessageListSlots>()
</script>

<template>
  <ol
    :class="['ui-message-list', { 'ui-direct': direct }, $props.class]"
    :role="role ?? 'list'"
  >
    <slot></slot>
  </ol>
</template>
