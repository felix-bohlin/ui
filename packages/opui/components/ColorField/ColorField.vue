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
import { copyPath, eyedropperPath } from "./icons"
import type { Props, Slots } from "./types.vue-props"

defineOptions({
  inheritAttrs: false,
})

const {
  alpha,
  autoFit,
  chromaLabel,
  contrastLabel,
  copiedLabel,
  copyLabel = "Copy",
  endText,
  error,
  eyedropperLabel = "Pick from the screen",
  hideLabel,
  hueLabel,
  id,
  invalidText,
  label,
  lightnessLabel,
  opacityLabel,
  p3Text,
  pickerLabel = "Pick a color",
  size,
  spread,
  srgbText,
  startText,
  value,
  variant,
  wideText,
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
const sliders = computed(() =>
  channelsFor(alpha, {
    chroma: chromaLabel,
    hue: hueLabel,
    lightness: lightnessLabel,
    opacity: opacityLabel,
  }),
)
const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <component
    is="opui-color-field"
    :class="['ui-color-field', $props.class]"
    :contrast-label="contrastLabel"
    :copied-label="copiedLabel"
    :invalid-text="invalidText"
    :p3-text="p3Text"
    :srgb-text="srgbText"
    :style="$attrs.style"
    :wide-text="wideText"
  >
    <div
      :class="[
        'ui-text-field',
        {
          'ui-auto-fit': autoFit,
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
      <div class="ui-header">
        <span aria-hidden="true" class="ui-value"></span>
        <span class="ui-actions">
          <Button
            :aria-label="eyedropperLabel"
            command="--eyedropper"
            :commandfor="inputId"
            hidden
            round
            size="small"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" :d="eyedropperPath"></path>
            </svg>
          </Button>
          <Button
            :aria-label="copyLabel"
            command="--copy"
            :commandfor="inputId"
            round
            size="small"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" :d="copyPath"></path>
            </svg>
          </Button>
        </span>
        <span class="ui-sr-only" role="status"></span>
      </div>
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
      <p class="ui-footer">
        <span aria-hidden="true" data-contrast="light"></span>
        <span aria-hidden="true" data-contrast="dark"></span>
        <span class="ui-sr-only"></span>
      </p>
    </div>
  </component>
</template>
