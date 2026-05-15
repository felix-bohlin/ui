<script setup lang="ts">
import type { TextareaProps } from './types.ts'
import { useId } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<TextareaProps>()
const modelValue = defineModel<string>()

const fieldId = props.id || useId()
</script>

<template>
  <label
    :class="[
      'textarea',
      {
        'auto-fit': props.autoFit,
        filled: props.filled,
        spread: props.spread,
        small: props.small,
      },
      props.class,
    ]"
    :data-invalid="props.critical || undefined"
    v-bind="$attrs"
  >
    <span v-if="props.label || $slots.label" class="label">
      {{ props.label }}<slot name="label"></slot>
    </span>

    <span v-if="props.description || $slots.description" class="start-text">
      {{ props.description }}<slot name="description"></slot>
    </span>

    <span class="field">
      <textarea
        :cols="props.cols"
        :disabled="props.disabled"
        :id="fieldId"
        :maxlength="props.maxlength"
        :minlength="props.minlength"
        :name="props.name"
        :placeholder="props.placeholder"
        :required="props.required"
        :rows="props.rows"
        v-model="modelValue"
      ></textarea>
      <span class="prefix" v-if="$slots.prefix"><slot name="prefix"></slot></span>
      <span class="suffix" v-if="$slots.suffix"><slot name="suffix"></slot></span>
      <span class="header" v-if="$slots.header"><slot name="header"></slot></span>
      <span class="footer" v-if="$slots.footer"><slot name="footer"></slot></span>
    </span>

    <span v-if="props.endText || $slots['end-text'] || $slots['supporting-text']" class="end-text">
      {{ props.endText }}<slot name="end-text"></slot><slot name="supporting-text"></slot>
    </span>

    <slot></slot>
  </label>
</template>
