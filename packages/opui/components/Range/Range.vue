<script setup lang="ts">
import type { RangeProps } from './types.ts'
import { useId, computed, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RangeProps>()
const modelValue = defineModel<number | string>()

const inputId = props.id || useId()
const labelId = useId()
const startTextId = useId()
const endTextId = useId()


const describedBy = computed(() => {
  return [
    (props.startText || !!useSlots()['start-text']) ? startTextId : undefined,
    (props.endText || !!useSlots()['end-text']) ? endTextId : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined
})

</script>

<template>
  <label :class="['range', props.variant, { spread: props.spread }, props.class]">
    <span v-if="props.label || $slots.default" class="label" :id="labelId">
      <slot>{{ props.label }}</slot>
    </span>
    <output v-if="props.valueSuffix !== undefined || $slots.value" class="value" :for="inputId" :data-suffix="props.valueSuffix">
      <slot name="value">{{ modelValue ?? props.value }}</slot>
    </output>
    <span v-if="props.startText || $slots['start-text']" class="start-text" :id="startTextId">
      <slot name="start-text">{{ props.startText }}</slot>
    </span>

    <input
      :aria-describedby="describedBy"
      :aria-labelledby="labelId"
      :disabled="props.disabled"
      :id="inputId"
      :list="props.list"
      :max="props.max"
      :min="props.min"
      :name="props.name"
      :step="props.step"
      type="range"
      v-bind="$attrs"
      v-model="modelValue"
    />

    <datalist v-if="props.options || $slots.datalist" :id="props.list">
      <template v-for="option in props.options" :key="typeof option === 'object' ? option.value : option">
        <option
          :value="typeof option === 'object' ? option.value : option"
          :label="typeof option === 'object' ? option.label : undefined"
        />
      </template>
      <slot name="datalist"></slot>
    </datalist>

    <span v-if="props.endText || $slots['end-text']" class="end-text" :id="endTextId">
      <slot name="end-text">{{ props.endText }}</slot>
    </span>
  </label>
</template>
