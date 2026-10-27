<script setup lang="ts">
import "../../elements/color-field.js"
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
import { channelsFor } from "./channels"
import type { Props, Slots } from "./types.vue-props"

defineOptions({
  inheritAttrs: false,
})

const {
  alpha,
  endText,
  error,
  hideLabel,
  id,
  label,
  pickerLabel = "Pick a color",
  size,
  spread,
  startText,
  value,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const inputAttrs = useInputAttrs()
const modelValue = defineModel<string>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const generatedId = useId()
const inputId = computed(() => id ?? generatedId)
const sliders = computed(() => channelsFor(alpha))
const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <component
    is="opui-color-field"
    :class="['ui-color-field', $props.class]"
    :style="$attrs.style"
  >
    <div
      :class="[
        'ui-text-field',
        {
          'ui-filled': variant === 'filled',
          'ui-spread': spread,
        },
        size && size !== 'medium' && `ui-${size}`,
      ]"
    >
      <label
        v-if="label || $slots.label"
        :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
        :for="inputId"
        :id="`${inputId}-label`"
      >
        {{ label }}<slot name="label"></slot>
      </label>

      <span v-if="startText || $slots['start-text']" class="ui-start-text">
        {{ startText }}<slot name="start-text"></slot>
      </span>

      <span class="ui-field">
        <span class="ui-start">
          <Button
            :aria-label="pickerLabel"
            command="toggle-popover"
            :commandfor="`${inputId}-picker`"
            round
          >
            <span class="ui-indicator"></span>
          </Button>
        </span>
        <input
          autocomplete="off"
          spellcheck="false"
          v-bind="inputAttrs"
          v-model="model"
          :aria-invalid="error ? 'true' : attrs['aria-invalid']"
          :id="inputId"
          :name="attrs.name ?? field?.name"
          type="text"
        />
      </span>

      <span v-if="endText || $slots['end-text']" class="ui-end-text">
        {{ endText }}<slot name="end-text"></slot>
      </span>
    </div>
    <div
      :aria-labelledby="`${inputId}-label`"
      class="ui-floating"
      :id="`${inputId}-picker`"
      popover="auto"
      role="dialog"
    >
      <label
        v-for="slider in sliders"
        :key="slider.name"
        class="ui-range"
        :for="`${inputId}-${slider.name}`"
      >
        <span class="ui-label" :id="`${inputId}-${slider.name}-label`">{{
          slider.label
        }}</span>
        <output
          aria-live="off"
          class="ui-value"
          :for="`${inputId}-${slider.name}`"
        ></output>
        <input
          :aria-describedby="
            slider.channel === 'C' ? `${inputId}-gamut` : undefined
          "
          :aria-labelledby="`${inputId}-${slider.name}-label`"
          :data-channel="slider.channel"
          :id="`${inputId}-${slider.name}`"
          :max="slider.max"
          min="0"
          :step="slider.step"
          type="range"
        />
      </label>
      <p class="ui-description" :id="`${inputId}-gamut`"></p>
    </div>
  </component>
</template>
