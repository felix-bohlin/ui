<script setup lang="ts">
import type { CheckboxInputProps } from "./types"
import { useAttrs, useTemplateRef, watchPostEffect } from "vue"

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const props = defineProps<CheckboxInputProps>()
const modelValue = defineModel<boolean | (string | number)[]>()

const input = useTemplateRef<HTMLInputElement>("input")

if (modelValue.value === undefined && attrs.checked !== undefined) {
  modelValue.value = attrs.checked !== false
}

watchPostEffect(() => {
  if (input.value) input.value.indeterminate = Boolean(props.indeterminate)
})
</script>

<template>
  <input
    ref="input"
    type="checkbox"
    :data-indeterminate="props.indeterminate || undefined"
    v-bind="$attrs"
    v-model="modelValue"
  />
</template>
