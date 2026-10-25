<script setup lang="ts">
import { useAttrs } from "vue"
import { useInputAttrs } from "../vue"
import type { Props, Slots } from "./types.vue-props"

const { max, value, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const progressAttrs = useInputAttrs()
</script>

<template>
  <div
    :class="[
      'ui-progress',
      variant && variant !== 'tonal' && `ui-${variant}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <progress v-bind="progressAttrs" :max="max" :value="value">
      <slot></slot>
    </progress>
  </div>
</template>
