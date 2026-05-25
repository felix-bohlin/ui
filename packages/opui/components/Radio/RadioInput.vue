<script setup lang="ts">
import type { RadioInputProps } from "./types"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RadioInputProps>()
const modelValue = defineModel<string | number | boolean>()
</script>

<template>
  <input
    type="radio"
    :disabled="props.disabled"
    :id="props.id"
    :name="props.name"
    :required="props.required"
    :value="props.value"
    v-bind="$attrs"
    v-model="modelValue"
  />
</template>
