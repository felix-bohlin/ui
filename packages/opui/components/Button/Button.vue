<script setup lang="ts">
import { computed } from "vue"
import { useRestAttrs } from "../vue"
import { disabledLink, tagAttrs } from "../tag"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const { as, color, disabled, href, round, size, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs()

const Tag = computed(() =>
  disabledLink(as, disabled) ? "a" : as || (href ? "a" : "button"),
)
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-button',
      { 'ui-round': round },
      color && `ui-${color}`,
      size && size !== 'medium' && `ui-${size}`,
      variant && variant !== 'transparent' && `ui-${variant}`,
      $attrs.class,
    ]"
    v-bind="{ ...tagAttrs(Tag, disabled, href), ...defined(attrs) }"
  >
    <slot></slot>
  </component>
</template>
