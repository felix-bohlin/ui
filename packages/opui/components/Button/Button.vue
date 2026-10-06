<script setup lang="ts">
import { computed } from "vue"
import type { Props, Slots } from "./types.d.vue"

const { as, color, disabled, href, label, ripple, rounded, size, variant } =
  defineProps<Props>()
defineSlots<Slots>()

const Tag = computed(() => as || (href ? "a" : "button"))
const isButton = computed(() => Tag.value === "button")
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
    :type="isButton ? 'button' : undefined"
  >
    <slot></slot>
  </component>
</template>
