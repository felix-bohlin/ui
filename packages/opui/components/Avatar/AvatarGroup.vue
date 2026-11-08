<script setup lang="ts">
import { type HTMLAttributes, useAttrs } from "vue"
import { defined } from "../attrs"
import type { AvatarGroupProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes
</script>

<template>
  <div
    :class="['ui-avatar-group', $props.class]"
    role="group"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </div>
</template>
