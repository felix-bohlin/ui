<script setup lang="ts">
import { computed } from "vue"
import { tagAttrs } from "../tag"
import type { Props, Slots } from "./types.d.vue"

const {
  as,
  color,
  disabled,
  dot,
  href,
  label,
  multiline,
  size,
  variant = "tonal",
} = defineProps<Props>()
defineSlots<Slots>()

const Tag = computed<"a" | "button" | "div">(() => as || (href ? "a" : "div"))
</script>

<template>
  <component
    :is="Tag"
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
    v-bind="tagAttrs(Tag, disabled, href)"
  >
    <slot name="start"></slot>
    <slot></slot>
    <span v-if="label" class="ui-text">{{ label }}</span>
    <slot name="end"></slot>
  </component>
</template>
