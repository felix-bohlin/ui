<script setup lang="ts">
import RadioInput from "./RadioInput.vue"
import type { RadioProps, Slots } from "./types.d.vue"
import { useId } from "vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RadioProps>()
defineSlots<Slots>()
const modelValue = defineModel<string | number | boolean>()

const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'radio',
      props.size,
      {
        stack: props.stack,
      },
      props.class,
    ]"
    :data-invalid="props.critical || undefined"
  >
    <RadioInput
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="endTextId"
      :disabled="props.disabled"
      :id="props.id"
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
