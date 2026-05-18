<script setup lang="ts">
import SwitchInput from './SwitchInput.vue'
import type { SwitchProps } from './types.ts'
import { useId, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<SwitchProps>()
const modelValue = defineModel<boolean | (string | number)[]>()

const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'switch',
      {
        small: props.small,
        stack: props.stack,
        spread: props.spread,
      },
      props.class,
    ]"
    :data-invalid="props.critical || undefined"
  >
    <span v-if="$slots['icon-unchecked']" class="icon-unchecked" aria-hidden="true">
      <slot name="icon-unchecked"></slot>
    </span>

    <span v-if="$slots['icon-checked']" class="icon-checked" aria-hidden="true">
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

    <span v-if="$slots.default" :class="[props.hideLabel ? 'sr-only' : 'label']">
      <slot></slot>
    </span>

    <span v-if="$slots['end-text']" :id="endTextId" class="end-text">
      <slot name="end-text"></slot>
    </span>
  </label>
</template>
