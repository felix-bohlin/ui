<script setup lang="ts">
import type { FieldSetProps } from './types.ts'

const props = withDefaults(defineProps<FieldSetProps>(), {
  as: 'fieldset',
})
</script>

<template>
  <component :is="props.as" :class="['fieldset', props.class]" v-bind="$attrs">
    <slot></slot>
  </component>
</template>
