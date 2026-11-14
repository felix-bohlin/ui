<script setup lang="ts">
import { useInputAttrs } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import RadioInput from "./RadioInput.vue"
import { hasName, warnUnnamed } from "../dev"
import { styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  card,
  endText,
  error,
  hideLabel,
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

const modelValue = defineModel<string | number | boolean | undefined>({
  default: undefined,
})

warnUnnamed("Radio", hasName({ ...attrs.value, label }, slots.default))
</script>

<template>
  <label
    :class="[
      'ui-radio',
      { 'ui-card': card, 'ui-spread': spread },
      card && variant && variant !== 'outlined' && `ui-${variant}`,
      orientation && orientation !== 'horizontal' && `ui-${orientation}`,
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    v-bind="styleAttrs($attrs.style)"
  >
    <RadioInput
      v-bind="attrs"
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
