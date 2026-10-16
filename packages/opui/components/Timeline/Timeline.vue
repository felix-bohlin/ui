<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue"
import type { Props, Slots } from "./types.d.vue"

const { items, progress, size } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <ol
    :class="[
      'ui-timeline',
      { 'ui-with-progress': progress },
      size && `ui-${size}`,
      $props.class,
    ]"
  >
    <TimelineItem
      v-for="({ description, ...item }, index) in items"
      :key="index"
      v-bind="item"
    >
      <p v-if="description">{{ description }}</p>
    </TimelineItem>
    <slot></slot>
  </ol>
</template>
