<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue"
import type { Props, Slots } from "./types.vue-props"

const { items, size, tracked } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <ol
    :class="[
      'ui-timeline',
      { 'ui-tracked': tracked },
      size && size !== 'medium' && `ui-${size}`,
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
