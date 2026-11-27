<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { leader, orientation } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dl
    :class="[
      'ui-description-list',
      leader && `ui-leader-${leader}`,
      orientation && orientation !== 'auto' && `ui-${orientation}`,
    ]"
  >
    <slot></slot>
  </dl>
</template>
