<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <span
    v-if="props.label || $slots.default"
    :class="[props.hideLabel ? 'ui-sr-only' : 'ui-label', props.class]"
    v-bind="$attrs"
  >
    <slot>{{ props.label }}</slot>
  </span>
</template>