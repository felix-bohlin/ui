<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

defineSlots<Slots>()
const {
  "aria-busy": ariaBusy,
  "aria-describedby": ariaDescribedby,
  "aria-label": ariaLabel,
  id,
  max,
  value,
  variant,
} = defineProps<Props>()
</script>

<template>
  <progress
    :aria-busy="ariaBusy"
    :aria-describedby="ariaDescribedby"
    :aria-label="ariaLabel"
    :class="['ui-progress', variant && `ui-${variant}`, $props.class]"
    :id="id"
    :max="max"
    :value="value"
  >
    <slot></slot>
  </progress>
</template>
