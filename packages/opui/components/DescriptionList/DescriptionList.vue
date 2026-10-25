<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { bordered, dotted, orientation } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dl
    :class="[
      'ui-description-list',
      {
        'ui-bordered': bordered,
        'ui-dotted': dotted,
      },
      orientation && orientation !== 'auto' && `ui-${orientation}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </dl>
</template>
