<script setup lang="ts">
import type { SwitchInputProps } from './types.ts'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SwitchInputProps>()
const modelValue = defineModel<boolean | (string | number)[]>()
</script>

<template>
  <input
    type="checkbox"
    role="switch"
    :disabled="props.disabled"
    :id="props.id"
    :name="props.name"
    :required="props.required"
    :value="props.value"
    v-bind="$attrs"
    v-model="modelValue"
  />
</template>
