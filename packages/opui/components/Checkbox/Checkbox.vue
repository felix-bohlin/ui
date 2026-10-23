<script setup lang="ts">
import CheckboxInput from "./CheckboxInput.vue"
import type { Props, Slots } from "./types.d.vue"
import { computed, type InputHTMLAttributes, useAttrs } from "vue"
import { warnUnnamed } from "../dev"

defineOptions({
  inheritAttrs: false,
})

const { endText, error, hideLabel, indeterminate, orientation, size, spread } =
  defineProps<Props>()
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
  slots.default || attrs["aria-label"] || attrs["aria-labelledby"],
)
</script>

<template>
  <label
    :class="[
      'ui-checkbox',
      {
        'ui-spread': spread,
      },
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
    <span v-if="$slots.default" :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      ><slot></slot
    ></span>
    <span v-if="endText || $slots['end-text']" class="ui-end-text">
      {{ endText }}<slot name="end-text"></slot>
    </span>
  </label>
</template>
