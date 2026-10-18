<script setup lang="ts">
import { markerPath } from "./icons"
import type {
  AccordionSummaryProps as Props,
  AccordionSummarySlots as Slots,
} from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <summary :class="[$props.class]">
    <slot></slot><slot v-if="$slots.marker" name="marker"></slot
    ><svg
      v-else
      aria-hidden="true"
      class="ui-marker"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" :d="markerPath"></path>
    </svg>
  </summary>
</template>
