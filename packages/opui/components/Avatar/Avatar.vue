<script setup lang="ts">
import { computed } from "vue"
import type { Props, Slots } from "./types.d.vue"

const { alt, as, disabled, href, isGroup, size, src, variant } =
  defineProps<Props>()
defineSlots<Slots>()

const Tag = computed(() => as || (href ? "a" : "div"))
</script>

<template>
  <component
    :is="Tag"
    :class="[
      { 'ui-avatar': !isGroup, 'ui-avatar-group': isGroup },
      !isGroup && size && `ui-${size}`,
      !isGroup && variant && `ui-${variant}`,
      $props.class,
    ]"
    :disabled="Tag === 'button' ? disabled : undefined"
    :href="href"
    :role="isGroup ? 'group' : undefined"
    :type="Tag === 'button' ? 'button' : undefined"
  >
    <img v-if="src" :src="src" :alt="alt ?? ''" />
    <slot v-else></slot>
  </component>
</template>
