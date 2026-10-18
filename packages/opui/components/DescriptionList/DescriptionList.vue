<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { bordered, inline } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dl
    :class="[
      'ui-description-list',
      {
        'ui-bordered': bordered,
        'ui-dotted': bordered === 'dotted',
        'ui-inline': inline,
      },
      $props.class,
    ]"
  >
    <slot></slot>
  </dl>
</template>
