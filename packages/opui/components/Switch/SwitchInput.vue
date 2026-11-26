<script setup lang="ts">
import { type IntrinsicElementAttributes } from "vue"
import { useBound, useRestAttrs } from "../vue"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { SwitchInputProps as Props } from "./types.vue-props"

defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs<IntrinsicElementAttributes["input"]>()

const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

const bound = useBound()
</script>

<template>
  <input
    v-if="bound"
    type="checkbox"
    role="switch"
    v-bind="{ ...defined(attrs), ...classAttrs($attrs.class) }"
    v-model="modelValue"
  />
  <input
    v-else
    type="checkbox"
    role="switch"
    v-bind="{ ...defined(attrs), ...classAttrs($attrs.class) }"
  />
</template>
