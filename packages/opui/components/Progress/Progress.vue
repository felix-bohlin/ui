<script setup lang="ts">
import { computed, useAttrs } from "vue"
import type { Props, Slots } from "./types.d.vue"

const { max, value, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const progressAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)
</script>

<template>
  <div
    :class="['ui-progress', variant && `ui-${variant}`, $props.class]"
    :style="$attrs.style"
  >
    <progress v-bind="progressAttrs" :max="max" :value="value">
      <slot></slot>
    </progress>
  </div>
</template>
