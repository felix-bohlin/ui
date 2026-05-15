<script setup lang="ts">
import type { CheckboxInputProps } from './types.ts'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<CheckboxInputProps>()
const modelValue = defineModel<boolean | any[]>()
</script>

<template>
  <input
    type="checkbox"
    :data-indeterminate="props.indeterminate || undefined"
    :disabled="props.disabled"
    :id="props.id"
    :name="props.name"
    :required="props.required"
    :value="props.value"
    v-bind="$attrs"
    v-model="modelValue"
  />
</template>
