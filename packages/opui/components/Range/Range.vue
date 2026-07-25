<script setup lang="ts">
import type { RangeProps, Slots } from "./types.d.vue"
import { useId } from "vue"
import { FieldLabel, FieldStartText, FieldEndText } from "opui-css/vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RangeProps>()
defineSlots<Slots>()
const modelValue = defineModel<number | string>()

const inputId = props.id || useId()
const labelId = useId()
const startTextId = useId()
const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'ui-range',
      props.variant && `ui-${props.variant}`,
      { 'ui-spread': props.spread },
      props.class,
    ]"
  >
    <FieldLabel v-if="props.label || $slots.default" :id="labelId" :label="props.label">
      <slot v-if="$slots.default"></slot>
    </FieldLabel>

    <output
      v-if="props.valueSuffix !== undefined || $slots.value"
      class="ui-value"
      :for="inputId"
      :data-suffix="props.valueSuffix"
    >
      <slot name="value">{{ modelValue ?? props.value }}</slot>
    </output>

    <FieldStartText
      v-if="props.startText || $slots['start-text']"
      :id="startTextId"
      :text="props.startText"
    >
      <slot name="start-text" v-if="$slots['start-text']"></slot>
    </FieldStartText>

    <input
      :aria-describedby="
        [
          props.startText || $slots['start-text'] ? startTextId : undefined,
          props.endText || $slots['end-text'] ? endTextId : undefined,
        ]
          .filter(Boolean)
          .join(' ') || undefined
      "
      :aria-labelledby="labelId"
      :id="inputId"
      :list="props.list"
      type="range"
      v-bind="$attrs"
      v-model="modelValue"
    />

    <datalist v-if="props.options || $slots.datalist" :id="props.list">
      <template
        v-for="option in props.options"
        :key="typeof option === 'object' ? option.value : option"
      >
        <option
          :value="typeof option === 'object' ? option.value : option"
          :label="typeof option === 'object' ? option.label : undefined"
        />
      </template>
      <slot name="datalist"></slot>
    </datalist>

    <FieldEndText
      v-if="props.endText || $slots['end-text']"
      :id="endTextId"
      :text="props.endText"
    >
      <slot name="end-text" v-if="$slots['end-text']"></slot>
    </FieldEndText>
  </label>
</template>
