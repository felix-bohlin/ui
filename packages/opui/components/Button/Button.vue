<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { as, color, disabled, href, label, ripple, rounded, size, variant } =
  defineProps<Props>()
defineSlots<Slots>()

const Tag = as || (href ? "a" : "button")
const isButton = Tag === "button"
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-button',
      {
        'ui-ripple': ripple,
        'ui-rounded': rounded,
      },
      size && `ui-${size}`,
      variant && `ui-${variant}`,
      color && `ui-${color}`,
      $props.class,
    ]"
    :aria-disabled="!isButton && disabled ? 'true' : undefined"
    :aria-label="label"
    :disabled="isButton ? disabled : undefined"
    :href="href"
  >
    <slot></slot>
  </component>
</template>
