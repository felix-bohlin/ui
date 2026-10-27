<script setup lang="ts">
import "../../elements/character-count.js"
import { computed, inject, type TextareaHTMLAttributes, useAttrs } from "vue"
import { useInputAttrs } from "../vue"
import type { Props, Slots } from "./types.vue-props"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const {
  autoFit,
  characterCount,
  characterCountLabel,
  endText,
  error,
  hideLabel,
  id,
  label,
  size,
  spread,
  startText,
  value,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
const attrs = useAttrs() as TextareaHTMLAttributes
const inputAttrs = useInputAttrs()
const modelValue = defineModel<string>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <label
    :class="[
      'ui-textarea',
      {
        'ui-auto-fit': autoFit,
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <span
      v-if="label || $slots.label"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
    >
      {{ label }}<slot name="label"></slot>
    </span>

    <span v-if="startText || $slots['start-text']" class="ui-start-text">
      {{ startText }}<slot name="start-text"></slot>
    </span>

    <span class="ui-field">
      <textarea
        v-bind="inputAttrs"
        v-model="model"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="id"
        :name="attrs.name ?? field?.name"
      ></textarea>
      <span class="ui-start" v-if="$slots.start"
        ><slot name="start"></slot
      ></span>
      <span class="ui-end" v-if="$slots.end"><slot name="end"></slot></span>
      <span class="ui-top" v-if="$slots.top"><slot name="top"></slot></span>
      <span class="ui-bottom" v-if="$slots.bottom"
        ><slot name="bottom"></slot
      ></span>
    </span>

    <span
      v-if="endText || $slots['end-text'] || characterCount"
      class="ui-end-text"
    >
      {{ endText }}<slot name="end-text"></slot
      ><component
        is="opui-character-count"
        v-if="characterCount"
        aria-hidden="true"
        class="ui-value"
        :label="characterCountLabel"
      ></component>
    </span>

    <slot></slot>
  </label>
</template>
