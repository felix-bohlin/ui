<script setup lang="ts">
import { computed, inject, useAttrs } from "vue"
import type { RadioInputProps } from "./types.d.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RadioInputProps>()
const attrs = useAttrs()
const modelValue = defineModel<string | number | boolean | undefined>({
  default: undefined,
})
const fieldName = inject(FieldGroupKey, undefined)

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
    :class="props.class"
    :name="fieldName"
    v-bind="$attrs"
    :checked="checked || undefined"
    @change="select"
  />
</template>
