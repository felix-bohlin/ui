<script setup lang="ts">
import {
  computed,
  inject,
  type IntrinsicElementAttributes,
  useAttrs,
} from "vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
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
    v-bind="attrs"
    v-model="model"
    :class="$props.class"
  />
</template>
