<script setup lang="ts">
import { type IntrinsicElementAttributes } from "vue"
import { useBound, useRestAttrs } from "../vue"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { RadioInputProps as Props } from "./types.vue-props"

defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs<IntrinsicElementAttributes["input"]>()

const modelValue = defineModel<string | number | boolean | undefined>({
  default: undefined,
})

const bound = useBound()
</script>

<template>
  <input
    v-if="bound"
    type="radio"
    v-bind="{ ...defined(attrs), ...classAttrs($attrs.class) }"
    :value="attrs.value"
    v-model="modelValue"
  />
  <input
    v-else
    type="radio"
    v-bind="{ ...defined(attrs), ...classAttrs($attrs.class) }"
  />
</template>
