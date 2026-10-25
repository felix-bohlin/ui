<script setup lang="ts">
import { computed, inject, type InputHTMLAttributes, useAttrs } from "vue"
import type { RadioInputProps } from "./types.vue-props"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

defineProps<RadioInputProps>()
const attrs = useAttrs() as InputHTMLAttributes
const modelValue = defineModel<string | number | boolean | undefined>({
  default: undefined,
})
const field = inject(FieldGroupKey, undefined)

const unchecked = Symbol()
const model = computed({
  get: () =>
    modelValue.value ??
    (attrs.checked !== undefined && attrs.checked !== false
      ? attrs.value
      : unchecked),
  set: (value: string | number | boolean | undefined) => {
    modelValue.value = value
  },
})
</script>

<template>
  <input
    type="radio"
    :class="$props.class"
    v-bind="$attrs"
    :name="attrs.name ?? field?.name"
    :value="attrs.value"
    v-model="model"
  />
</template>
