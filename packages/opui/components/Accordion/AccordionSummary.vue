<script setup lang="ts">
import { markerPath } from "./icons"
import { classAttrs } from "../cx"
import type {
  AccordionSummaryProps as Props,
  AccordionSummarySlots,
} from "./types.vue-props"

defineProps<Props>()
defineSlots<AccordionSummarySlots>()
</script>

<template>
  <summary v-bind="classAttrs([$props.class])">
    <slot></slot>{{ " " }}<slot v-if="$slots.marker" name="marker"></slot
    ><svg
      v-else
      aria-hidden="true"
      class="ui-marker"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" :d="markerPath" />
    </svg>
  </summary>
</template>
