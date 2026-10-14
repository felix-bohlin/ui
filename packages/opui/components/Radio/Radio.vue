<script setup lang="ts">
import RadioInput from "./RadioInput.vue"
import type { RadioProps, Slots } from "./types.d.vue"
import { useAttrs, useId } from "vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RadioProps>()
const slots = defineSlots<Slots>()
const attrs = useAttrs()
const modelValue = defineModel<string | number | boolean | undefined>({
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
    "[OPUI Radio] Missing accessible name. Provide a default slot, and set `hideLabel` to hide it visually.",
  )
}
</script>

<template>
  <label
    :class="[
      'ui-radio',
      props.size && `ui-${props.size}`,
      {
        'ui-stack': props.stack,
        'ui-spread': props.spread,
      },
      props.class,
    ]"
  >
    <RadioInput
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="
        [$slots['end-text'] ? endTextId : undefined, $attrs['aria-describedby']]
          .filter(Boolean)
          .join(' ') || undefined
      "
      :aria-invalid="props.error ? 'true' : $attrs['aria-invalid']"
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
