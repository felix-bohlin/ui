<script setup lang="ts">
import type { TimelineItemProps, TimelineItemSlots } from "./types.vue-props"

const {
  color,
  current,
  datetime,
  headingLevel = 3,
  label,
  time,
} = defineProps<TimelineItemProps>()
const slots = defineSlots<TimelineItemSlots>()
</script>

<template>
  <li
    :aria-current="current === true ? 'true' : current || undefined"
    :class="[color && `ui-${color}`, $props.class]"
  >
    <span v-if="slots.marker" class="ui-marker">
      <slot name="marker"></slot>
    </span>
    <time v-if="time" :datetime="datetime">{{ time }}</time>
    <component
      :is="`h${headingLevel}`"
      v-if="label || slots.label"
      class="ui-h6"
    >
      {{ label }}<slot name="label"></slot>
    </component>
    <slot></slot>
  </li>
</template>
