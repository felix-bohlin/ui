<script setup lang="ts">
import type { CheckboxInputProps } from "./types.d.vue"
import {
  computed,
  inject,
  useAttrs,
  useTemplateRef,
  watchPostEffect,
} from "vue"
import { FieldRootKey } from "../Field/types.d.vue"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const currentFieldName = inject(CurrentFieldNameKey, undefined)
const root = inject(FieldRootKey, undefined)
const props = defineProps<CheckboxInputProps>()
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

const input = useTemplateRef<HTMLInputElement>("input")
const inputAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(
      ([key]) => key !== "aria-describedby" && key !== "aria-invalid",
    ),
  ),
)

const model = computed({
  get: () =>
    modelValue.value ??
    (attrs.checked !== undefined && attrs.checked !== false),
  set: (value) => {
    modelValue.value = value
  },
})

watchPostEffect(() => {
  if (input.value) input.value.indeterminate = Boolean(props.indeterminate)
})
</script>

<template>
  <input
    ref="input"
    type="checkbox"
    :aria-describedby="
      [root?.describedBy, attrs['aria-describedby']]
        .filter(Boolean)
        .join(' ') || undefined
    "
    :aria-invalid="
      root?.invalid
        ? 'true'
        : (attrs['aria-invalid'] as 'true' | 'false' | undefined)
    "
    :data-indeterminate="props.indeterminate ? '' : undefined"
    :name="currentFieldName"
    v-bind="inputAttrs"
    v-model="model"
  />
</template>
