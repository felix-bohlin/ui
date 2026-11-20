<script setup lang="ts">
import { inject, type IntrinsicElementAttributes, useAttrs } from "vue"
import { useBound } from "../vue"
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

const bound = useBound()

const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <input
    v-if="bound"
    type="radio"
    :name="name ?? field?.name"
    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"
    :value="attrs.value"
    v-model="modelValue"
  />
  <input
    v-else
    type="radio"
    :name="name ?? field?.name"
    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"
  />
</template>
