<script setup lang="ts">
import SwitchInput from "./SwitchInput.vue"
import type { Slots, SwitchProps } from "./types.d.vue"
import { useId } from "vue"
import { FieldLabel, FieldEndText } from "opui-css/vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SwitchProps>()
defineSlots<Slots>()
const modelValue = defineModel<boolean | (string | number)[]>()

const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'ui-switch',
      {
        'ui-small': props.small,
        'ui-stack': props.stack,
        'ui-spread': props.spread,
      },
      props.class,
    ]"
    :data-invalid="props.error || undefined"
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
      :aria-describedby="endTextId"
    />

    <FieldLabel v-if="$slots.default" :hideLabel="props.hideLabel">
      <slot></slot>
    </FieldLabel>

    <FieldEndText v-if="$slots['end-text']" :id="endTextId">
      <slot name="end-text"></slot>
    </FieldEndText>
  </label>
</template>
