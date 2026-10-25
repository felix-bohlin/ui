<script setup lang="ts">
import { computed, inject, type InputHTMLAttributes, useAttrs } from "vue"
import type { SwitchInputProps } from "./types.vue-props"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

defineProps<SwitchInputProps>()
const attrs = useAttrs() as InputHTMLAttributes
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})
const field = inject(FieldGroupKey, undefined)

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
    :class="$props.class"
    v-bind="$attrs"
    :name="attrs.name ?? field?.name"
    v-model="model"
  />
</template>
