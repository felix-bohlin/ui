<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { as = "legend" } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <component
    :is="as"
    :class="[{ 'ui-legend': as !== 'legend' }, $props.class]"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>
