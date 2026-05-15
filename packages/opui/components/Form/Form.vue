<script setup lang="ts">
import type { FormProps } from './types.ts'

const props = withDefaults(defineProps<FormProps>(), {
  as: 'form',
})
</script>

<template>
  <component :is="props.as" :class="['form', props.class]" v-bind="$attrs">
    <slot></slot>
  </component>
</template>
