<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue"
import { warnUnnamedControl } from "../dev"
import { tagAttrs } from "../tag"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const { as, disabled, href, label, shape, size, src, variant } =
  defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const Tag = computed(() => as || (href ? "a" : "div"))

warnUnnamedControl("Avatar", as === "button" || href, { ...attrs, label })
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
    <img v-if="src" :src="src" :alt="label ?? ''" />
    <span v-else aria-hidden="true"><slot></slot></span
    ><span v-if="!src && label" class="ui-sr-only">{{ label }}</span>
  </component>
</template>
