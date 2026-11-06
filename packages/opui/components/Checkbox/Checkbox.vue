<script setup lang="ts">
import { useInputAttrs } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import CheckboxInput from "./CheckboxInput.vue"
import { hasName, warnUnnamed } from "../dev"
import type { Props, Slots } from "./types.vue-props"

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

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

warnUnnamed("Checkbox", hasName({ ...attrs.value, label }, slots.default))
</script>

<template>
  <label
    :class="[
      'ui-checkbox',
      { 'ui-card': card, 'ui-spread': spread },
      card && variant && variant !== 'outlined' && `ui-${variant}`,
      orientation && orientation !== 'horizontal' && `ui-${orientation}`,
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <CheckboxInput
      v-bind="attrs"
      :indeterminate="indeterminate"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      v-model="modelValue"
    />
    <span
      v-if="label || $slots.default"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      >{{ label }}<TrimmedSlot :nodes="$slots.default?.()"
    /></span>
    <span v-if="endText || $slots['end-text']" class="ui-end-text"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </label>
</template>
