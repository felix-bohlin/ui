<script setup lang="ts">
import "../../elements/character-count.js"
import { computed, inject } from "vue"
import { useInputAttrs } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import type { Props, Slots } from "./types.vue-props"

const {
  autoFit,
  characterCount,
  characterCountLabel,
  endText,
  error,
  hideLabel,
  id,
  label,
  name,
  size,
  spread,
  startText,
  value,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

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
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></span>
    <span v-if="startText || $slots['start-text']" class="ui-start-text"
      >{{ startText }}<slot name="start-text"></slot
    ></span>
    <span class="ui-field">
      <textarea
        v-bind="attrs"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="id"
        :name="name ?? field?.name"
        v-model="model"
      ></textarea>
      <span v-if="$slots.start" class="ui-start"
        ><slot name="start"></slot
      ></span>
      <span v-if="$slots.end" class="ui-end"><slot name="end"></slot></span>
      <span v-if="$slots.top" class="ui-top"><slot name="top"></slot></span>
      <span v-if="$slots.bottom" class="ui-bottom"
        ><slot name="bottom"></slot
      ></span>
    </span>
    <span
      v-if="endText || $slots['end-text'] || characterCount"
      class="ui-end-text"
      >{{ endText }}<slot name="end-text"></slot
      ><component
        is="opui-character-count"
        v-if="characterCount"
        aria-hidden="true"
        class="ui-value"
        :label="characterCountLabel"
      ></component
    ></span>
    <slot></slot>
  </label>
</template>
