<script setup lang="ts">
import { computed, inject, type InputHTMLAttributes, useAttrs } from "vue"
import type { RadioInputProps } from "./types.d.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

defineProps<RadioInputProps>()
const attrs = useAttrs() as InputHTMLAttributes
const modelValue = defineModel<string | number | boolean | undefined>({
  default: undefined,
})
const field = inject(FieldGroupKey, undefined)

const checked = computed(() =>
  attrs.checked === undefined
    ? modelValue.value === (attrs.value ?? true)
    : attrs.checked !== false,
)
const select = () => {
  modelValue.value = (attrs.value as string | number | undefined) ?? true
}
</script>

<template>
  <input
    type="radio"
    :class="$props.class"
    v-bind="$attrs"
    :name="attrs.name ?? field?.name"
    :checked="checked || undefined"
    @change="select"
  />
</template>
