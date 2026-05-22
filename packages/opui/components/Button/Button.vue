<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { as, color, disabled, href, size, variant } = defineProps<Props>()
defineSlots<Slots>()

const Tag = as || (href ? "a" : "button")
const isButton = Tag === "button"
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'button',
      { disabled: isButton && disabled },
      size,
      variant,
      color,
      $props.class,
    ]"
    :disabled="isButton ? disabled : undefined"
    :href="href"
  >
    <slot></slot>
  </component>
</template>
