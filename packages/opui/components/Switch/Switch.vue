<script setup lang="ts">
import SwitchInput from "./SwitchInput.vue"
import type { Slots, SwitchProps } from "./types.d.vue"
import { useId } from "vue"

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
    :data-invalid="props.critical || undefined"
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
      :disabled="props.disabled"
      :id="props.id"
      :name="props.name"
      :required="props.required"
      :value="props.value"
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
