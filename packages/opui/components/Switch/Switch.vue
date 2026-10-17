<script setup lang="ts">
import SwitchInput from "./SwitchInput.vue"
import type { Slots, SwitchProps } from "./types.d.vue"
import { useAttrs, useId } from "vue"
import { warnUnnamed } from "../dev"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SwitchProps>()
const slots = defineSlots<Slots>()
const attrs = useAttrs()
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
      props.size && `ui-${props.size}`,
      {
        'ui-stack': props.stack,
        'ui-spread': props.spread,
      },
      props.class,
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
        [$slots['end-text'] ? endTextId : undefined, $attrs['aria-describedby']]
          .filter(Boolean)
          .join(' ') || undefined
      "
      :aria-invalid="props.error ? 'true' : $attrs['aria-invalid']"
    />

    <span
      v-if="$slots.default"
      :class="[props.hideLabel ? 'ui-sr-only' : 'ui-label']"
    >
      <slot></slot>
    </span>

    <span v-if="$slots['end-text']" :id="endTextId" class="ui-end-text">
      <slot name="end-text"></slot>
    </span>
  </label>
</template>
