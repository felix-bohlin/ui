<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { alt, as, href, isGroup, src, variant } = defineProps<Props>()
defineSlots<Slots>()

const Tag = as || (href ? "a" : "div")
</script>

<template>
  <component
    :is="Tag"
    :class="[
      { 'ui-avatar': !isGroup },
      !isGroup && variant && `ui-${variant}`,
      $props.class,
    ]"
    :href="href"
    :role="isGroup ? 'group' : undefined"
  >
    <img v-if="src" :src="src" :alt="alt" />
    <slot v-else></slot>
  </component>
</template>
