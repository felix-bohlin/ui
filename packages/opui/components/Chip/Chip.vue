<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue"
import { tagAttrs } from "../tag"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const {
  as,
  disabled,
  dot,
  href,
  label,
  multiline,
  severity,
  size,
  variant = "tonal",
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const Tag = computed(() => as || (href ? "a" : "div"))
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-chip',
      { 'ui-dot': dot, 'ui-multiline': multiline },
      severity && `ui-${severity}`,
      size && size !== 'medium' && `ui-${size}`,
      variant !== 'tonal' && `ui-${variant}`,
      $props.class,
    ]"
    v-bind="{ ...tagAttrs(Tag, disabled, href), ...defined(attrs) }"
  >
    <slot name="start"></slot
    ><span v-if="label || $slots.label" class="ui-text"
      >{{ label }}<slot name="label"></slot></span
    ><slot name="end"></slot>
  </component>
</template>
