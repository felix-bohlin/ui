<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue"
import { mergeStyle } from "../style"
import type { Props } from "./types.vue-props"

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

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const restAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(
      ([key]) => key !== "aria-describedby" && key !== "aria-invalid",
    ),
  ),
)

const modelValue = defineModel<number | string>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const count = computed(() => Number(max))

const stars = computed(() =>
  Array.from({ length: count.value }, (_, index) => index + 1),
)

const current = computed(() => Number(model.value))

const invalid = computed(() => (error ? "true" : attrs["aria-invalid"]))
</script>

<template>
  <fieldset
    v-if="name"
    :class="[
      'ui-rating',
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :disabled="disabled"
    :style="$attrs.style"
    v-bind="restAttrs"
  >
    <legend>{{ label }}</legend>
    <input
      v-if="!required"
      :aria-describedby="attrs['aria-describedby']"
      :aria-invalid="invalid"
      :aria-label="clearLabel"
      :checked="current === 0"
      :name="name"
      type="radio"
      value="0"
      @change="model = '0'"
    /><input
      v-for="(star, index) in stars"
      :key="index"
      :aria-describedby="attrs['aria-describedby']"
      :aria-invalid="invalid"
      :aria-label="starLabel(star)"
      :checked="current === star"
      :name="name"
      :required="required"
      type="radio"
      :value="star"
      @change="model = star"
    />
  </fieldset>
  <meter
    v-else
    :aria-describedby="attrs['aria-describedby']"
    :aria-label="label"
    :class="[
      'ui-rating',
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :max="max"
    :style="mergeStyle({ '--_max': count === 5 ? undefined : count }, {})"
    :value="model ?? 0"
    v-bind="restAttrs"
  ></meter>
</template>
