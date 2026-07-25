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
    v-if="props.text || $slots.default || $slots['supporting-text']"
    :class="['ui-end-text', props.class]"
    v-bind="$attrs"
  >
    <slot>{{ props.text }}</slot>
    <slot name="supporting-text"></slot>
  </span>
</template>