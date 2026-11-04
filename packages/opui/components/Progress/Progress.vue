<script setup lang="ts">
import { useInputAttrs } from "../vue"
import type { Props, Slots } from "./types.vue-props"

const { max, value, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()
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
    <progress :max="max" :value="value" v-bind="attrs">
      <slot></slot>
    </progress>
  </div>
</template>
