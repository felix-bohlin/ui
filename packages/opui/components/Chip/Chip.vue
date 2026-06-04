<script setup lang="ts">
import { computed } from "vue"
import type { Props, Slots } from "./types.d.vue"

const {
  as,
  label,
  multiline,
  size,
  variant = "tonal",
  href,
} = defineProps<Props>()
defineSlots<Slots>()

const tag = computed(() => as || (href ? "a" : "div"))
</script>

<template>
  <component
    :is="tag"
    :class="[
      'ui-chip',
      {
        'ui-multiline': multiline,
      },
      size && `ui-${size}`,
      variant && `ui-${variant}`,
      $props.class,
    ]"
    :href="tag === 'a' ? href : undefined"
  >
    <slot name="start"></slot>
    <slot></slot>
    <span v-if="label" class="ui-text">{{ label }}</span>
    <slot name="end"></slot>
  </component>
</template>
