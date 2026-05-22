<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { as, color, href, size, variant } = defineProps<Props>()
defineSlots<Slots>()

const Tag = as || (href ? "a" : "button")
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-icon-button',
      size && `ui-${size}`,
      variant && `ui-${variant}`,
      color && `ui-${color}`,
      $props.class,
    ]"
    :href="href"
  >
    <slot></slot>
  </component>
</template>
