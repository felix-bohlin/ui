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
    v-if="props.text || $slots.default"
    :class="['ui-start-text', props.class]"
    v-bind="$attrs"
  >
    <slot>{{ props.text }}</slot>
  </span>
</template>