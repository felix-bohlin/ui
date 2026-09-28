<script setup vapor lang="ts">
import { inject } from "vue"
import type { RadioInputProps } from "./types"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

defineProps<RadioInputProps>()
const modelValue = defineModel<string | number | boolean>()
const currentFieldName = inject(CurrentFieldNameKey, undefined)
</script>

<template>
  <input
    type="radio"
    :name="currentFieldName"
    v-bind="$attrs"
    v-model="modelValue"
  />
</template>
