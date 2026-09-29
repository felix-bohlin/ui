<script setup lang="ts">
import { computed, inject, useAttrs } from "vue"
import type { SwitchInputProps } from "./types"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

defineProps<SwitchInputProps>()
const attrs = useAttrs()
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})
const currentFieldName = inject(CurrentFieldNameKey, undefined)

const model = computed({
  get: () =>
    modelValue.value ??
    (attrs.checked !== undefined && attrs.checked !== false),
  set: (value) => {
    modelValue.value = value
  },
})
</script>

<template>
  <input
    type="checkbox"
    role="switch"
    :name="currentFieldName"
    v-bind="$attrs"
    v-model="model"
  />
</template>
