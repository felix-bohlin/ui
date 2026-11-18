<script setup lang="ts">
import { useInputAttrs } from "../vue"
import { styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const { max, round, value, variant } = defineProps<Props>()
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
      { 'ui-round': round },
      variant && variant !== 'tonal' && `ui-${variant}`,
      $props.class,
    ]"
    v-bind="styleAttrs($attrs.style)"
  >
    <progress :max="max" :value="value" v-bind="attrs">
      <slot></slot>
    </progress>
  </div>
</template>
