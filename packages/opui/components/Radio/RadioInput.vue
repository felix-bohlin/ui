<script setup lang="ts">
import { computed, inject, useAttrs } from "vue"
import type { RadioInputProps } from "./types"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

defineProps<RadioInputProps>()
const attrs = useAttrs()
const modelValue = defineModel<string | number | boolean | undefined>({
  default: undefined,
})
const currentFieldName = inject(CurrentFieldNameKey, undefined)

const checked = computed(() =>
  modelValue.value === undefined
    ? attrs.checked !== undefined && attrs.checked !== false
    : modelValue.value === (attrs.value ?? true),
)
const select = () => {
  modelValue.value = (attrs.value as string | number | undefined) ?? true
}
</script>

<template>
  <input
    type="radio"
    :name="currentFieldName"
    v-bind="$attrs"
    :checked="checked || undefined"
    @change="select"
  />
</template>
