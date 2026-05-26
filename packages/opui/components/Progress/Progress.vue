<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

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
  <div :class="['ui-progress', variant && `ui-${variant}`, $props.class]">
    <progress
      v-bind="$attrs"
      :aria-busy="ariaBusy"
      :aria-describedby="ariaDescribedby"
      :aria-label="ariaLabel"
      :id="id"
      :max="max"
      :value="value"
    >
      <slot></slot>
    </progress>
  </div>
</template>
