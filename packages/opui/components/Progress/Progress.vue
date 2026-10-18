<script setup lang="ts">
import { computed, useAttrs } from "vue"
import type { Props, Slots } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

defineSlots<Slots>()
const props = defineProps<Props>()
const attrs = useAttrs()
const progressAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)
</script>

<template>
  <div
    :class="[
      'ui-progress',
      props.variant && `ui-${props.variant}`,
      props.class,
    ]"
    :style="$attrs.style"
  >
    <progress v-bind="progressAttrs" :max="props.max" :value="props.value">
      <slot></slot>
    </progress>
  </div>
</template>
