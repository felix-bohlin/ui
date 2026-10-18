<script setup lang="ts">
import CheckboxInput from "./CheckboxInput.vue"
import type { Props, Slots } from "./types.d.vue"
import { type InputHTMLAttributes, useAttrs, useId } from "vue"
import { warnUnnamed } from "../dev"
import { idRefs } from "../id"

defineOptions({
  inheritAttrs: false,
})

const { endText, error, hideLabel, indeterminate, size, spread, stack } =
  defineProps<Props>()
const slots = defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

const uid = useId()
const endTextId = `end-text-${uid}`

warnUnnamed(
  "Checkbox",
  slots.default || attrs["aria-label"] || attrs["aria-labelledby"],
)
</script>

<template>
  <label
    :class="[
      'ui-checkbox',
      size && `ui-${size}`,
      {
        'ui-stack': stack,
        'ui-spread': spread,
      },
      $props.class,
    ]"
  >
    <CheckboxInput
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="
        idRefs(
          (endText || $slots['end-text']) && endTextId,
          attrs['aria-describedby'],
        )
      "
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      :indeterminate="indeterminate"
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
