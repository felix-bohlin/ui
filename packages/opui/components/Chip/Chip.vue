<script setup lang="ts">
import { computed } from "vue"
import type { Props, Slots } from "./types.d.vue"

const {
  as,
  color,
  dot,
  href,
  label,
  multiline,
  size,
  variant = "tonal",
} = defineProps<Props>()
defineSlots<Slots>()

const tag = computed(() => as || (href ? "a" : "div"))
</script>

<template>
  <component
    :is="tag"
    :class="[
      'ui-chip',
      {
        'ui-dot': dot,
        'ui-multiline': multiline,
      },
      color && `ui-${color}`,
      size && `ui-${size}`,
      variant && `ui-${variant}`,
      $props.class,
    ]"
    :href="tag === 'a' ? href : undefined"
    :type="tag === 'button' ? 'button' : undefined"
  >
    <slot name="start"></slot>
    <slot></slot>
    <span v-if="label" class="ui-text">{{ label }}</span>
    <slot name="end"></slot>
  </component>
</template>
