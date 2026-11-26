<script setup lang="ts">
import { computed } from "vue"
import { useRestAttrs } from "../vue"
import { DEV, warnUnnamedControl } from "../dev"
import { disabledLink, tagAttrs } from "../tag"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const { as, disabled, href, label, shape, size, src, variant } =
  defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs()

const Tag = computed(() =>
  disabledLink(as, disabled) ? "a" : as || (href ? "a" : "div"),
)

if (DEV)
  warnUnnamedControl("Avatar", as === "button" || href, {
    ...attrs.value,
    label,
  })
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-avatar',
      shape && shape !== 'circle' && `ui-${shape}`,
      size && size !== 'medium' && `ui-${size}`,
      variant && variant !== 'filled' && `ui-${variant}`,
      $attrs.class,
    ]"
    v-bind="{ ...tagAttrs(Tag, disabled, href), ...defined(attrs) }"
  >
    <img v-if="src" :src="src" :alt="label ?? ''" />
    <span v-else aria-hidden="true"><slot></slot></span
    ><span v-if="!src && label" class="ui-sr-only">{{ label }}</span>
  </component>
</template>
