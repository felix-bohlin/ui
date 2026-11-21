<script setup lang="ts">
import { inject, type IntrinsicElementAttributes, useAttrs } from "vue"
import { useBound } from "../vue"
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

const bound = useBound()

const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <input
    v-if="bound"
    type="checkbox"
    role="switch"
    :name="name ?? field?.name"
    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"
    v-model="modelValue"
  />
  <input
    v-else
    type="checkbox"
    role="switch"
    :name="name ?? field?.name"
    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"
  />
</template>
