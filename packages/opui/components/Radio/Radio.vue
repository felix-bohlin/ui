<script setup lang="ts">
import RadioInput from "./RadioInput.vue"
import type { RadioProps, Slots } from "./types.d.vue"
import { type InputHTMLAttributes, useAttrs, useId } from "vue"
import { warnUnnamed } from "../dev"
import { idRefs } from "../id"

defineOptions({
  inheritAttrs: false,
})

const { endText, error, hideLabel, size, spread, stack } =
  defineProps<RadioProps>()
const slots = defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const modelValue = defineModel<string | number | boolean | undefined>({
  default: undefined,
})

const uid = useId()
const endTextId = `end-text-${uid}`

warnUnnamed(
  "Radio",
  slots.default || attrs["aria-label"] || attrs["aria-labelledby"],
)
</script>

<template>
  <label
    :class="[
      'ui-radio',
      size && `ui-${size}`,
      {
        'ui-stack': stack,
        'ui-spread': spread,
      },
      $props.class,
    ]"
  >
    <RadioInput
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
    <span v-if="$slots.default" :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      ><slot></slot
    ></span>
    <span
      v-if="endText || $slots['end-text']"
      :id="endTextId"
      class="ui-end-text"
    >
      <slot name="end-text">{{ endText }}</slot>
    </span>
  </label>
</template>
