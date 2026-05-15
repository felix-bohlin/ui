<script setup lang="ts">
import type { FieldGroupProps } from './types.ts'
import { provide } from 'vue'

const props = defineProps<FieldGroupProps>()

if (props.name) {
  provide('currentFieldName', props.name)
}
</script>

<template>
  <div :class="['field-group', props.direction, props.class]" v-bind="$attrs" role="group">
    <slot></slot>
  </div>
</template>
