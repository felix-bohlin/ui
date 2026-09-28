<script setup vapor lang="ts">
import { inject, useAttrs } from "vue"
import type { RadioInputProps } from "./types"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

defineProps<RadioInputProps>()
const modelValue = defineModel<string | number | boolean>()
const attrs = useAttrs()
const currentFieldName = inject(CurrentFieldNameKey, undefined)

if (
  modelValue.value === false &&
  attrs.checked !== undefined &&
  attrs.checked !== false
) {
  modelValue.value = (attrs.value as string | number | undefined) ?? "on"
}
</script>

<template>
  <input
    type="radio"
    :name="currentFieldName"
    v-bind="$attrs"
    v-model="modelValue"
  />
</template>
