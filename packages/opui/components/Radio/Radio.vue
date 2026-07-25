<script setup lang="ts">
import RadioInput from "./RadioInput.vue"
import type { RadioProps, Slots } from "./types.d.vue"
import { useId } from "vue"
import { FieldLabel, FieldEndText } from "opui-css/vue"

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
      'ui-radio',
      props.size && `ui-${props.size}`,
      {
        'ui-stack': props.stack,
      },
      props.class,
    ]"
    :data-invalid="props.error || undefined"
  >
    <RadioInput
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
