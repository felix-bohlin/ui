<script setup lang="ts">
import type { FieldLegendProps } from './types.ts'

const props = withDefaults(defineProps<FieldLegendProps>(), {
  as: 'legend',
})
</script>

<template>
  <component :is="props.as" :class="[{ legend: props.as !== 'legend' }, props.class]" v-bind="$attrs">
    <slot></slot>
  </component>
</template>
