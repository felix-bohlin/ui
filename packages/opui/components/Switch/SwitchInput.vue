<script setup lang="ts">
import { computed, inject, useAttrs } from "vue"
import type { SwitchInputProps } from "./types.d.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SwitchInputProps>()
const attrs = useAttrs()
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
    :class="props.class"
    :name="field?.name"
    v-bind="$attrs"
    v-model="model"
  />
</template>
