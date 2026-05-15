<script setup lang="ts">
import type { RangeProps } from './types.ts'
import { useId, computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RangeProps>()
const modelValue = defineModel<number | string>()

const inputId = props.id || useId()
const labelId = useId()
const startTextId = useId()
const endTextId = useId()

const hasLabel = computed(() => !!props.label || !!useSlots().default)
const hasStartText = computed(() => !!props.startText || !!useSlots()['start-text'])
const hasEndText = computed(() => !!props.endText || !!useSlots()['end-text'])
const hasValue = computed(() => props.valueSuffix !== undefined || !!useSlots().value)

const describedBy = computed(() => {
  return [
    hasStartText.value ? startTextId : undefined,
    hasEndText.value ? endTextId : undefined,
  ]
    .filter(Boolean)
    .join(' ') || undefined
})

import { useSlots } from 'vue'
</script>

<template>
  <label :class="['range', props.variant, { spread: props.spread }, props.class]">
    <span v-if="hasLabel" class="label" :id="labelId">
      {{ props.label }}<slot></slot>
    </span>
    <output v-if="hasValue" class="value" :for="inputId" :data-suffix="props.valueSuffix">
      <slot name="value">{{ modelValue !== undefined ? modelValue : props.value }}</slot>
    </output>
    <span v-if="hasStartText" class="start-text" :id="startTextId">
      {{ props.startText }}<slot name="start-text"></slot>
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

    <span v-if="hasEndText" class="end-text" :id="endTextId">
      {{ props.endText }}<slot name="end-text"></slot>
    </span>
  </label>
</template>
