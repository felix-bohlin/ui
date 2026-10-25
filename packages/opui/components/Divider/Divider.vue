<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { align, color, variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    v-if="$slots.default"
    :class="[
      'ui-divider',
      align && align !== 'center' && `ui-align-${align}`,
      color && `ui-${color}`,
      variant && variant !== 'outlined' && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </div>
  <hr
    v-else
    :class="[
      'ui-divider',
      color && `ui-${color}`,
      variant && variant !== 'outlined' && `ui-${variant}`,
      $props.class,
    ]"
  />
</template>
