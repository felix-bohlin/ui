<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { as, color, href, size, variant } = defineProps<Props>()
defineSlots<Slots>()

const Tag = as || (href ? "a" : "button")
</script>

<template>
  <component
    :is="Tag"
    :class="['icon-button', size, variant, color, $props.class]"
    :href="href"
  >
    <slot></slot>
  </component>
</template>
