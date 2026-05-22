<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const props = withDefaults(defineProps<Props>(), {
  as: "legend",
})
defineSlots<Slots>()
</script>

<template>
  <component
    :is="props.as"
    :class="[{ 'ui-legend': props.as !== 'legend' }, props.class]"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>
