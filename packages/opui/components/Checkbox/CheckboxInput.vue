<script setup vapor lang="ts">
import type { CheckboxInputProps } from "./types"
import { inject, useAttrs, useTemplateRef, watchPostEffect } from "vue"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const currentFieldName = inject(CurrentFieldNameKey, undefined)
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
    :name="currentFieldName"
    v-bind="$attrs"
    v-model="modelValue"
  />
</template>
