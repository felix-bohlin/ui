<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { max, value, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div :class="['ui-progress', variant && `ui-${variant}`, $props.class]">
    <progress v-bind="$attrs" :max="max" :value="value">
      <slot></slot>
    </progress>
  </div>
</template>
