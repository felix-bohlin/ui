<script setup lang="ts">
import { computed } from "vue"
import { useRestAttrs } from "../vue"
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

const attrs = useRestAttrs()

const restAttrs = computed(() => {
  const { "aria-current": _ariaCurrent, ...rest } = attrs.value
  return rest
})

const Heading = computed(
  () => `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6",
)
</script>

<template>
  <li
    :aria-current="
      attrs['aria-current'] ??
      (current === true ? 'true' : current || undefined)
    "
    v-bind="{
      ...restAttrs,
      ...classAttrs([color && `ui-${color}`, $attrs.class]),
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
