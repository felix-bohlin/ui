<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { orientation } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div
    :class="[
      'ui-field-group',
      orientation && orientation !== 'auto' && `ui-${orientation}`,
    ]"
  >
    <slot></slot>
  </div>
</template>
