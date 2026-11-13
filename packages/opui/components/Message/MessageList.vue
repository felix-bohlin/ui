<script setup lang="ts">
import { type HTMLAttributes, useAttrs } from "vue"
import { defined } from "../attrs"
import type {
  MessageListProps as Props,
  MessageListSlots,
} from "./types.vue-props"

defineProps<Props>()
defineSlots<MessageListSlots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes
</script>

<template>
  <ol
    :class="['ui-message-list', $props.class]"
    role="list"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </ol>
</template>
