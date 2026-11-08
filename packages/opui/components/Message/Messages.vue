<script setup lang="ts">
import { type HTMLAttributes, useAttrs } from "vue"
import { defined } from "../attrs"
import type { MessagesProps as Props, MessagesSlots } from "./types.vue-props"

defineProps<Props>()
defineSlots<MessagesSlots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes
</script>

<template>
  <ol
    :class="['ui-messages', $props.class]"
    role="list"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </ol>
</template>
