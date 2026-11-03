<script setup lang="ts">
import type {
  AccordionSummaryProps as Props,
  AccordionSummarySlots,
} from "./types.vue-props"
import { markerPath } from "./icons"

defineProps<Props>()
defineSlots<AccordionSummarySlots>()
</script>

<template>
  <summary :class="[$props.class]">
    <slot></slot>{{ " "
    }}<slot name="marker"
      ><svg
        aria-hidden="true"
        class="ui-marker"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" :d="markerPath"></path></svg
    ></slot>
  </summary>
</template>
