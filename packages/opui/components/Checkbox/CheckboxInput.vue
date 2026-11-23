<script setup lang="ts">
import type { CheckboxInputProps } from "./types"
import {
  computed,
  inject,
  useAttrs,
  useTemplateRef,
  watchPostEffect,
} from "vue"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const currentFieldName = inject(CurrentFieldNameKey, undefined)
const props = defineProps<CheckboxInputProps>()
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

const input = useTemplateRef<HTMLInputElement>("input")

const model = computed({
  get: () =>
    modelValue.value ??
    (attrs.checked !== undefined && attrs.checked !== false),
  set: (value) => {
    modelValue.value = value
  },
})

watchPostEffect(() => {
  if (input.value) input.value.indeterminate = Boolean(props.indeterminate)
})
</script>

<template>
  <input
    ref="input"
    type="checkbox"
    :data-indeterminate="props.indeterminate ? '' : undefined"
    :name="currentFieldName"
    v-bind="$attrs"
    v-model="model"
  />
</template>
