<script setup lang="ts">
import type { CheckboxInputProps } from "./types.vue-props"
import {
  computed,
  inject,
  type InputHTMLAttributes,
  useAttrs,
  useTemplateRef,
  watchPostEffect,
} from "vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as InputHTMLAttributes
const field = inject(FieldGroupKey, undefined)
const { indeterminate } = defineProps<CheckboxInputProps>()
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
  if (input.value) input.value.indeterminate = Boolean(indeterminate)
})
</script>

<template>
  <input
    ref="input"
    type="checkbox"
    :class="$props.class"
    :data-indeterminate="indeterminate ? '' : undefined"
    v-bind="$attrs"
    :name="attrs.name ?? field?.name"
    v-model="model"
  />
</template>
