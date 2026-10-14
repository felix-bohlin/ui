<script setup lang="ts">
import { computed, useAttrs } from "vue"
import type { HTMLAttributes } from "vue"
import type { Props } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const {
  clearLabel = "No rating",
  disabled,
  error,
  label,
  max = 5,
  name,
  required,
  size,
  starLabel = (value: number) => (value === 1 ? "1 star" : `${value} stars`),
  value,
} = defineProps<Props>()
const attrs = useAttrs() as HTMLAttributes
const fieldsetAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== "aria-describedby"),
  ),
)
const modelValue = defineModel<number | string>()

const count = computed(() => Number(max))
const stars = computed(() =>
  Array.from({ length: count.value }, (_, index) => index + 1),
)
const current = computed(() => Number(modelValue.value ?? value))
const select = (star: number) => {
  modelValue.value = star
}
</script>

<template>
  <fieldset
    v-if="name"
    :class="['ui-rating', size && `ui-${size}`, $props.class]"
    :disabled="disabled"
    v-bind="fieldsetAttrs"
  >
    <legend>{{ label }}</legend>
    <input
      v-if="!required"
      :aria-describedby="attrs['aria-describedby']"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      :aria-label="clearLabel"
      :checked="current === 0"
      :name="name"
      type="radio"
      value="0"
      @change="select(0)"
    />
    <input
      v-for="star in stars"
      :key="star"
      :aria-describedby="attrs['aria-describedby']"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      :aria-label="starLabel(star)"
      :checked="current === star"
      :name="name"
      :required="required"
      type="radio"
      :value="star"
      @change="select(star)"
    />
  </fieldset>
  <meter
    v-else
    :aria-label="label"
    :class="['ui-rating', size && `ui-${size}`, $props.class]"
    :max="max"
    :style="count === 5 ? undefined : { '--_max': count }"
    :value="modelValue ?? value ?? 0"
    v-bind="attrs"
  ></meter>
</template>
