<script setup lang="ts">
import "../../css/js/checkbox.js"
import { inject, type IntrinsicElementAttributes } from "vue"
import { useBound, useRestAttrs } from "../vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { defined } from "../attrs"
import { classAttrs } from "../cx"
import type { CheckboxInputProps as Props } from "./types.vue-props"

const { indeterminate, name } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs<IntrinsicElementAttributes["input"]>()

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
    :data-indeterminate="indeterminate ? '' : undefined"
    :name="name ?? field?.name"
    v-bind="{ ...defined(attrs), ...classAttrs($attrs.class) }"
    v-model="modelValue"
  />
  <input
    v-else
    type="checkbox"
    :data-indeterminate="indeterminate ? '' : undefined"
    :name="name ?? field?.name"
    v-bind="{ ...defined(attrs), ...classAttrs($attrs.class) }"
  />
</template>
