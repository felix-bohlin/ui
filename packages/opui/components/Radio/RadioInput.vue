<script setup lang="ts">
import {
  computed,
  inject,
  type IntrinsicElementAttributes,
  useAttrs,
} from "vue"
import { vSeed } from "../vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { RadioInputProps as Props } from "./types.vue-props"

const { name } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as IntrinsicElementAttributes["input"]

const modelValue = defineModel<string | number | boolean | undefined>({
  default: undefined,
})

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

const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <input
    type="radio"
    :name="name ?? field?.name"
    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"
    :value="attrs.value"
    v-seed
    v-model="model"
  />
</template>
