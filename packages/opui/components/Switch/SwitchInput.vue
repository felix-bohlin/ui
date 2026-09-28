<script setup vapor lang="ts">
import { inject, useAttrs } from "vue"
import type { SwitchInputProps } from "./types"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

defineProps<SwitchInputProps>()
const modelValue = defineModel<boolean | (string | number)[]>({
  default: undefined,
})
const attrs = useAttrs()
const currentFieldName = inject(CurrentFieldNameKey, undefined)

if (modelValue.value === undefined && attrs.checked !== undefined) {
  modelValue.value = attrs.checked !== false
}
</script>

<template>
  <input
    type="checkbox"
    role="switch"
    :name="currentFieldName"
    v-bind="$attrs"
    v-model="modelValue"
  />
</template>
