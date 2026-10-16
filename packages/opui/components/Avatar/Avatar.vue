<script setup lang="ts">
import { computed } from "vue"
import { tagAttrs } from "../tag"
import type { Props, Slots } from "./types.d.vue"

const { alt, as, disabled, href, size, src, variant } = defineProps<Props>()
defineSlots<Slots>()

const Tag = computed(() => as || (href ? "a" : "div"))
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-avatar',
      size && `ui-${size}`,
      variant && `ui-${variant}`,
      $props.class,
    ]"
    v-bind="tagAttrs(Tag, disabled, href)"
  >
    <img v-if="src" :src="src" :alt="alt ?? ''" />
    <slot v-else></slot>
  </component>
</template>
