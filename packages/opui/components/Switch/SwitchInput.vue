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
import type { SwitchInputProps as Props } from "./types.vue-props"

const { name } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as IntrinsicElementAttributes["input"]

const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

const model = computed({
  get: () =>
    modelValue.value ??
    (attrs.checked !== undefined && attrs.checked !== false),
  set: (value) => {
    modelValue.value = value
  },
})

const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <input
    type="checkbox"
    role="switch"
    :name="name ?? field?.name"
    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"
    v-seed
    v-model="model"
  />
</template>
