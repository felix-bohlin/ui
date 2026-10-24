<script setup lang="ts">
import CheckboxInput from "./CheckboxInput.vue"
import type { Props, Slots } from "./types.d.vue"
import { computed, type InputHTMLAttributes, useAttrs } from "vue"
import { warnUnnamed } from "../dev"

defineOptions({
  inheritAttrs: false,
})

const {
  card,
  endText,
  error,
  hideLabel,
  indeterminate,
  label,
  orientation,
  size,
  spread,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

warnUnnamed(
  "Checkbox",
  label || slots.default || attrs["aria-label"] || attrs["aria-labelledby"],
)
</script>

<template>
  <label
    :class="[
      'ui-checkbox',
      {
        'ui-card': card,
        'ui-spread': spread,
      },
      card && variant && variant !== 'outlined' && `ui-${variant}`,
      orientation && orientation !== 'horizontal' && `ui-${orientation}`,
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <CheckboxInput
      v-bind="inputAttrs"
      v-model="modelValue"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      :indeterminate="indeterminate"
    />
    <span
      v-if="label || $slots.default"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      >{{ label }}<slot></slot
    ></span>
    <span v-if="endText || $slots['end-text']" class="ui-end-text">
      {{ endText }}<slot name="end-text"></slot>
    </span>
  </label>
</template>
