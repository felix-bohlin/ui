<script setup lang="ts">
import "../../elements/number-stepper.js"
import {
  computed,
  inject,
  type InputHTMLAttributes,
  useAttrs,
  useId,
} from "vue"
import Button from "../Button/Button.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { useInputAttrs } from "../vue"
import { minusPath, plusPath } from "./icons"
import type { Props, Slots } from "./types.vue-props"

defineOptions({
  inheritAttrs: false,
})

const {
  decreaseLabel = "Decrease",
  endText,
  error,
  hideLabel,
  id,
  increaseLabel = "Increase",
  label,
  size,
  spread,
  startText,
  value,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const inputAttrs = useInputAttrs()
const modelValue = defineModel<number | string>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const generatedId = useId()
const inputId = computed(() => id ?? generatedId)
const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <component
    is="opui-number-stepper"
    :class="[
      'ui-number-stepper',
      {
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <label
      v-if="label || $slots.label"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :for="inputId"
    >
      {{ label }}<slot name="label"></slot>
    </label>

    <span v-if="startText || $slots['start-text']" class="ui-start-text">
      {{ startText }}<slot name="start-text"></slot>
    </span>

    <span class="ui-field">
      <span class="ui-start">
        <Button
          :aria-label="decreaseLabel"
          command="--step-down"
          :commandfor="inputId"
          round
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" :d="minusPath"></path>
          </svg>
        </Button>
      </span>
      <input
        v-bind="inputAttrs"
        v-model="model"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="inputId"
        :name="attrs.name ?? field?.name"
        type="number"
      />
      <span class="ui-end">
        <Button
          :aria-label="increaseLabel"
          command="--step-up"
          :commandfor="inputId"
          round
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" :d="plusPath"></path>
          </svg>
        </Button>
      </span>
    </span>

    <span v-if="endText || $slots['end-text']" class="ui-end-text">
      {{ endText }}<slot name="end-text"></slot>
    </span>
  </component>
</template>
