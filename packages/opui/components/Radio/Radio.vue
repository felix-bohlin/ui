<script setup lang="ts">
import { useBound, useInputAttrs } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import RadioInput from "./RadioInput.vue"
import { DEV, hasName, warnUnnamed } from "../dev"
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

const model = defineModel<string | number | boolean | undefined>({
  default: undefined,
})

const bound = useBound()

if (DEV) warnUnnamed("Radio", hasName({ ...attrs.value, label }, slots.default))
</script>

<template>
  <label
    :class="[
      'ui-radio',
      { 'ui-card': card, 'ui-spread': spread },
      card && variant && variant !== 'outlined' && `ui-${variant}`,
      orientation && orientation !== 'horizontal' && `ui-${orientation}`,
      size && size !== 'medium' && `ui-${size}`,
      $attrs.class,
    ]"
    v-bind="styleAttrs($attrs.style)"
  >
    <RadioInput
      v-if="bound"
      v-bind="attrs"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      v-model="model"
    />
    <RadioInput
      v-else
      v-bind="attrs"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
    />
    <span
      v-if="label || $slots.default"
      :class="hideLabel ? 'ui-sr-only' : 'ui-label'"
      >{{ label }}<TrimmedSlot :nodes="$slots.default?.()"
    /></span>
    <span v-if="endText || $slots['end-text']" class="ui-end-text"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </label>
</template>
