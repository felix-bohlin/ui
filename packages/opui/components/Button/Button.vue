<script setup lang="ts">
import { computed } from "vue"
import type { Props, Slots } from "./types.d.vue"

const { as, color, disabled, href, ripple, rounded, size, variant } =
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
    :disabled="isButton ? disabled : undefined"
    :href="href"
  >
    <slot></slot>
  </component>
</template>
