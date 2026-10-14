<script setup lang="ts">
import CheckboxInput from "./CheckboxInput.vue"
import type { CheckboxProps, Slots } from "./types.d.vue"
import { useAttrs, useId } from "vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<CheckboxProps>()
const slots = defineSlots<Slots>()
const attrs = useAttrs()
const modelValue = defineModel<boolean | (string | number)[] | undefined>({
  default: undefined,
})

const uid = useId()
const endTextId = `end-text-${uid}`

if (
  import.meta.env.DEV &&
  !slots.default &&
  !attrs["aria-label"] &&
  !attrs["aria-labelledby"]
) {
  console.warn(
    "[OPUI Checkbox] Missing accessible name. Provide a default slot, and set `hideLabel` to hide it visually.",
  )
}
</script>

<template>
  <label
    :class="[
      'ui-checkbox',
      props.size && `ui-${props.size}`,
      {
        'ui-stack': props.stack,
        'ui-spread': props.spread,
      },
      props.class,
    ]"
  >
    <CheckboxInput
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="
        [$slots['end-text'] ? endTextId : undefined, $attrs['aria-describedby']]
          .filter(Boolean)
          .join(' ') || undefined
      "
      :aria-invalid="props.error ? 'true' : $attrs['aria-invalid']"
      :indeterminate="props.indeterminate"
    />
    <span
      v-if="$slots.default"
      :class="[props.hideLabel ? 'ui-sr-only' : 'ui-label']"
      ><slot></slot
    ></span>
    <span :id="endTextId" class="ui-end-text" v-if="$slots['end-text']">
      <slot name="end-text"></slot>
    </span>
  </label>
</template>
