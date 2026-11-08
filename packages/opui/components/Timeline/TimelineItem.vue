<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type {
  TimelineItemProps as Props,
  TimelineItemSlots,
} from "./types.vue-props"

const {
  color,
  current,
  datetime,
  headingLevel = 3,
  label,
  time,
} = defineProps<Props>()
defineSlots<TimelineItemSlots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const Heading = computed(
  () => `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6",
)
</script>

<template>
  <li
    :aria-current="current === true ? 'true' : current || undefined"
    v-bind="{
      ...defined(attrs),
      ...classAttrs([color && `ui-${color}`, $props.class]),
    }"
  >
    <span v-if="$slots.marker" class="ui-marker"
      ><slot name="marker"></slot></span
    >{{ " " }}<time v-if="time" :datetime="datetime">{{ time }}</time>
    <component :is="Heading" v-if="label || $slots.label" class="ui-h6"
      >{{ label }}<slot name="label"></slot
    ></component>
    <slot></slot>
  </li>
</template>
