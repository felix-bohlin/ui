<script setup lang="ts">
import { computed, inject, useAttrs } from "vue"
import { FieldRootKey } from "../Field/types.d.vue"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"
import type { TextFieldInputProps as Props } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  type: "text",
})
const modelValue = defineModel<string | number>()

const attrs = useAttrs()
const inputAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(
      ([key]) => key !== "aria-describedby" && key !== "aria-invalid",
    ),
  ),
)
const model = computed({
  get: () => modelValue.value ?? (attrs.value as string | number | undefined),
  set: (value) => {
    modelValue.value = value
  },
})

const field = inject(FieldRootKey, undefined)
const currentFieldName = inject(CurrentFieldNameKey, undefined)
</script>

<template>
  <input
    :aria-describedby="
      [field?.describedBy, attrs['aria-describedby']]
        .filter(Boolean)
        .join(' ') || undefined
    "
    :aria-invalid="
      field?.invalid
        ? 'true'
        : (attrs['aria-invalid'] as 'true' | 'false' | undefined)
    "
    :class="props.class"
    :inputmode="props.type === 'numeric' ? 'numeric' : undefined"
    :name="currentFieldName"
    :pattern="props.type === 'numeric' ? '[0-9]*' : undefined"
    :type="props.type === 'numeric' ? 'text' : props.type"
    v-bind="inputAttrs"
    v-model="model"
  />
</template>
