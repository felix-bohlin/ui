<script setup lang="ts">
import CheckboxInput from "./CheckboxInput.vue"
import type { CheckboxProps, Slots } from "./types.d.vue"
import { useId } from "vue"
import { FieldLabel, FieldEndText } from "opui-css/vue"

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
      'ui-checkbox',
      props.size && `ui-${props.size}`,
      {
        'ui-stack': props.stack,
        'ui-spread': props.spread,
      },
      props.class,
    ]"
    :data-invalid="props.error || undefined"
  >
    <CheckboxInput
      v-bind="$attrs"
      v-model="modelValue"
      :aria-describedby="$slots['end-text'] ? endTextId : undefined"
      :indeterminate="props.indeterminate"
    />

    <FieldLabel v-if="$slots.default" :hideLabel="props.hideLabel">
      <slot></slot>
    </FieldLabel>

    <FieldEndText v-if="$slots['end-text']" :id="endTextId">
      <slot name="end-text"></slot>
    </FieldEndText>
  </label>
</template>
