<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { align, variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    v-if="$slots.default"
    :class="[
      'ui-divider',
      align && align !== 'center' && `ui-align-${align}`,
      variant && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </div>
  <hr
    v-else
    :class="['ui-divider', variant && `ui-${variant}`, $props.class]"
  />
</template>
