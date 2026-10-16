<script setup lang="ts">
import { computed } from "vue"
import { tagAttrs } from "../tag"
import type { Props, Slots } from "./types.d.vue"

const { as, color, disabled, href, round, size, variant } = defineProps<Props>()
defineSlots<Slots>()

const Tag = computed(() => as || (href ? "a" : "button"))
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-button',
      { 'ui-round': round },
      size && `ui-${size}`,
      variant && `ui-${variant}`,
      color && `ui-${color}`,
      $props.class,
    ]"
    v-bind="tagAttrs(Tag, disabled, href)"
  >
    <slot></slot>
  </component>
</template>
