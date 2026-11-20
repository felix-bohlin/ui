<script setup lang="ts">
import { computed, type HTMLAttributes, mergeProps, useAttrs } from "vue"
import { useBound } from "../vue"
import { mergeStyle, pluralLabel, styleAttrs } from "../style"
import { defined } from "../attrs"
import type { Props } from "./types.vue-props"

const {
  clearLabel = "No rating",
  disabled,
  error,
  label,
  lang,
  max = 5,
  name,
  required,
  size,
  starLabel = { one: "{count} star", other: "{count} stars" },
  value,
} = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

const restAttrs = () =>
  Object.fromEntries(
    Object.entries(attrs).filter(
      ([key]) =>
        key !== "aria-describedby" &&
        key !== "aria-invalid" &&
        key !== "aria-label",
    ),
  )

const modelValue = defineModel<number | string>()

const bound = useBound()

const model = computed(() => modelValue.value ?? value)

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
    :aria-label="attrs['aria-label']"
    :class="[
      'ui-rating',
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :disabled="disabled"
    :lang="lang"
    v-bind="mergeProps(styleAttrs($attrs.style), restAttrs())"
  >
    <legend>{{ label }}</legend>
    <template v-if="!required"
      ><input
        v-if="bound"
        :aria-describedby="attrs['aria-describedby']"
        :aria-invalid="invalid"
        :aria-label="clearLabel"
        :name="name"
        type="radio"
        :value="0"
        v-model="modelValue" />
      <input
        v-else
        :aria-describedby="attrs['aria-describedby']"
        :aria-invalid="invalid"
        :aria-label="clearLabel"
        :name="name"
        type="radio"
        :value="0"
        v-bind="defined({ checked: current === 0 })" /></template
    ><template v-for="(star, index) in stars" :key="index"
      ><input
        v-if="bound"
        :aria-describedby="attrs['aria-describedby']"
        :aria-invalid="invalid"
        :aria-label="pluralLabel(starLabel, star, lang)"
        :name="name"
        :required="required"
        type="radio"
        :value="star"
        v-model="modelValue" />
      <input
        v-else
        :aria-describedby="attrs['aria-describedby']"
        :aria-invalid="invalid"
        :aria-label="pluralLabel(starLabel, star, lang)"
        :name="name"
        :required="required"
        type="radio"
        :value="star"
        v-bind="defined({ checked: current === star })"
    /></template>
  </fieldset>
  <meter
    v-else
    :aria-describedby="attrs['aria-describedby']"
    :aria-label="attrs['aria-label'] ?? label"
    :class="[
      'ui-rating',
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :lang="lang"
    :max="max"
    :value="model ?? 0"
    v-bind="
      mergeProps(
        styleAttrs(
          mergeStyle({ '--_max': count === 5 ? undefined : count }, {}),
        ),
        restAttrs(),
      )
    "
  ></meter>
</template>
