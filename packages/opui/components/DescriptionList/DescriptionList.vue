<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { border, orientation } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dl
    :class="[
      'ui-description-list',
      border && `ui-border-${border}`,
      orientation && orientation !== 'auto' && `ui-${orientation}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </dl>
</template>
