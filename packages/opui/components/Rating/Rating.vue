<script setup lang="ts">
import type { Props } from "./types.d.vue"
import { computed } from "vue"

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
  >
    <legend v-if="label">{{ label }}</legend>
    <input
      v-if="!required"
      :aria-invalid="error ? 'true' : undefined"
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
      :aria-invalid="error ? 'true' : undefined"
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
    :value="modelValue ?? value"
  ></meter>
</template>
