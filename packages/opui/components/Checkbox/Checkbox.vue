<script setup lang="ts">
import CheckboxInput from "./CheckboxInput.vue"
import type { Props, Slots } from "./types.vue-props"
import { type InputHTMLAttributes, useAttrs } from "vue"
import { useInputAttrs } from "../vue"
import { hasName, warnUnnamed } from "../dev"

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
const inputAttrs = useInputAttrs()
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

warnUnnamed("Checkbox", hasName({ ...attrs, label }, slots.default))
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
