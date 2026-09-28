<script setup lang="ts">
import { inject } from "vue"
import type { SwitchInputProps } from "./types"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

defineProps<SwitchInputProps>()
const modelValue = defineModel<boolean | (string | number)[]>()
const currentFieldName = inject(CurrentFieldNameKey, undefined)
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
