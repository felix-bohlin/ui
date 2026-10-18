<script setup lang="ts">
import SwitchInput from "./SwitchInput.vue"
import type { Slots, SwitchProps } from "./types.d.vue"
import { type InputHTMLAttributes, useAttrs, useId } from "vue"
import { warnUnnamed } from "../dev"
import { idRefs } from "../id"

defineOptions({
  inheritAttrs: false,
})

const { endText, error, hideLabel, size, spread, stack } =
  defineProps<SwitchProps>()
const slots = defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

const uid = useId()
const endTextId = `end-text-${uid}`

warnUnnamed(
  "Switch",
  slots.default || attrs["aria-label"] || attrs["aria-labelledby"],
)
</script>

<template>
  <label
    :class="[
      'ui-switch',
      size && `ui-${size}`,
      {
        'ui-stack': stack,
        'ui-spread': spread,
      },
      $props.class,
    ]"
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
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="
        idRefs(
          (endText || $slots['end-text']) && endTextId,
          attrs['aria-describedby'],
        )
      "
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
    />

    <span
      v-if="$slots.default"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
    >
      <slot></slot>
    </span>

    <span
      v-if="endText || $slots['end-text']"
      :id="endTextId"
      class="ui-end-text"
    >
      <slot name="end-text">{{ endText }}</slot>
    </span>
  </label>
</template>
