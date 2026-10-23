<script setup lang="ts">
import SwitchInput from "./SwitchInput.vue"
import type { Props, Slots } from "./types.d.vue"
import { computed, type InputHTMLAttributes, useAttrs } from "vue"
import { warnUnnamed } from "../dev"

defineOptions({
  inheritAttrs: false,
})

const { endText, error, hideLabel, orientation, size, spread } =
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
  "Switch",
  slots.default || attrs["aria-label"] || attrs["aria-labelledby"],
)
</script>

<template>
  <label
    :class="[
      'ui-switch',
      {
        'ui-spread': spread,
      },
      orientation && orientation !== 'horizontal' && `ui-${orientation}`,
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <span
      v-if="$slots['icon-unchecked']"
      class="ui-icon-unchecked"
      aria-hidden="true"
    >
      <slot name="icon-unchecked"></slot>
    </span>

    <span
      v-if="$slots['icon-checked']"
      class="ui-icon-checked"
      aria-hidden="true"
    >
      <slot name="icon-checked"></slot>
    </span>

    <SwitchInput
      v-bind="inputAttrs"
      v-model="modelValue"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
    />

    <span
      v-if="$slots.default"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
    >
      <slot></slot>
    </span>

    <span v-if="endText || $slots['end-text']" class="ui-end-text">
      {{ endText }}<slot name="end-text"></slot>
    </span>
  </label>
</template>
