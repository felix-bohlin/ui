<script setup lang="ts">
import { type HTMLAttributes, inject, useAttrs } from "vue"
import { AnchorKey } from "./context.vue"
import { defined } from "../attrs"
import type { AnchorContentProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const anchor = inject(AnchorKey, undefined)
</script>

<template>
  <span
    :class="['ui-floating', $props.class]"
    :id="anchor?.floatingId"
    :popover="anchor?.popover"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </span>
</template>
