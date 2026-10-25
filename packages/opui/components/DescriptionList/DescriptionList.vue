<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { bordered, orientation } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dl
    :class="[
      'ui-description-list',
      bordered && `ui-bordered-${bordered}`,
      orientation && orientation !== 'auto' && `ui-${orientation}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </dl>
</template>
