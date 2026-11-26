<script setup lang="ts">
import { type HTMLAttributes, useAttrs } from "vue"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const { color, orientation, overflow, size, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes
</script>

<template>
  <div
    :class="[
      'ui-button-group',
      { 'ui-vertical': orientation === 'vertical' },
      color && `ui-${color}`,
      overflow && overflow !== 'wrap' && `ui-overflow-${overflow}`,
      size && size !== 'medium' && `ui-${size}`,
      variant && variant !== 'transparent' && `ui-${variant}`,
      $props.class,
    ]"
    role="group"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </div>
</template>
