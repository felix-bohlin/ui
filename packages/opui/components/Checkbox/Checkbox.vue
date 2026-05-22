<script setup lang="ts">
import CheckboxInput from "./CheckboxInput.vue"
import type { CheckboxProps, Slots } from "./types.d.vue"
import { useId } from "vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<CheckboxProps>()
defineSlots<Slots>()
const modelValue = defineModel<boolean | (string | number)[]>()

const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'checkbox',
      props.size,
      {
        stack: props.stack,
        spread: props.spread,
      },
      props.class,
    ]"
    :data-invalid="props.critical || undefined"
  >
    <CheckboxInput
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="endTextId"
      :disabled="props.disabled"
      :id="props.id"
      :indeterminate="props.indeterminate"
      :name="props.name"
      :required="props.required"
      :value="props.value"
    />
    <span :class="[props.hideLabel ? 'sr-only' : 'label']"><slot></slot></span>
    <span :id="endTextId" class="end-text" v-if="$slots['end-text']">
      <slot name="end-text"></slot>
    </span>
  </label>
</template>
