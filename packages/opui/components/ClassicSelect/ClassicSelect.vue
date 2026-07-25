<script setup lang="ts">
import type { ClassicSelectProps, Slots } from "./types.d.vue"
import { useId } from "vue"
import { FieldLabel, FieldEndText } from "opui-css/vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ClassicSelectProps>(), {
  items: () => [],
  variant: "outlined",
})
defineSlots<Slots>()
const modelValue = defineModel<string | number | (string | number)[]>()

const selectId = props.id || useId()
const labelId = useId()
</script>

<template>
  <label
    :class="[
      'ui-select',
      props.size && `ui-${props.size}`,
      {
        'ui-filled': props.variant === 'filled',
      },
      props.class,
    ]"
    :data-invalid="props.error || undefined"
  >
    <FieldLabel v-if="props.label || $slots.label" :label="props.label" :id="labelId">
      <slot name="label" v-if="$slots.label"></slot>
    </FieldLabel>

    <span class="ui-field">
      <select
        :aria-labelledby="props.label ? labelId : undefined"
        :id="selectId"
        v-bind="$attrs"
        v-model="modelValue"
      >
        <option
          v-for="item in props.items"
          :key="item.value"
          :value="item.value"
        >
          {{ item.text }}
        </option>
        <slot></slot>
      </select>
    </span>

    <FieldEndText v-if="props.endText || $slots['end-text']" :text="props.endText">
      <slot name="end-text" v-if="$slots['end-text']"></slot>
    </FieldEndText>
  </label>
</template>
