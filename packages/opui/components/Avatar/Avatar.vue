<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue"
import { tagAttrs } from "../tag"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const { alt, as, disabled, href, shape, size, src, variant } =
  defineProps<Props>()
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
      'ui-avatar',
      shape && shape !== 'circle' && `ui-${shape}`,
      size && size !== 'medium' && `ui-${size}`,
      variant && variant !== 'filled' && `ui-${variant}`,
      $props.class,
    ]"
    v-bind="{ ...tagAttrs(Tag, disabled, href), ...defined(attrs) }"
  >
    <img v-if="src" :src="src" :alt="alt ?? ''" />
    <slot v-else></slot>
  </component>
</template>
