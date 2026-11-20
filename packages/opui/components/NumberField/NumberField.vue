<script setup lang="ts">
import "../../elements/number-field.js"
import { TrimmedSlot } from "../whitespace.vue"
import type { Props, Slots } from "./types.vue-props"

const {
  decreaseLabel = "Decrease",
  endText,
  for: htmlFor,
  hideLabel,
  increaseLabel = "Increase",
  label,
  size,
  spread,
  startText,
  stretch,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

const startTextId = () =>
  startText || slots["start-text"] ? `${htmlFor}-start-text` : undefined

const endTextId = () =>
  endText || slots["end-text"] ? `${htmlFor}-end-text` : undefined
</script>

<template>
  <component
    is="opui-number-field"
    :class="[
      'ui-number-field',
      {
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
        'ui-stretch': stretch,
      },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
  >
    <label
      v-if="label || $slots.label"
      :class="hideLabel ? 'ui-sr-only' : 'ui-label'"
      :for="htmlFor"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></label>
    <span
      v-if="startText || $slots['start-text']"
      class="ui-start-text"
      :id="startTextId()"
      >{{ startText }}<slot name="start-text"></slot
    ></span>
    <span class="ui-field">
      <span class="ui-start">
        <button
          class="ui-button ui-round"
          type="button"
          :aria-controls="htmlFor"
          :aria-label="decreaseLabel"
          command="--step-down"
          :commandfor="htmlFor"
        >
          <slot v-if="$slots['decrease-icon']" name="decrease-icon"></slot>
          <svg
            v-else
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          ></svg>
        </button>
      </span>
      <slot></slot>
      <span class="ui-end">
        <button
          class="ui-button ui-round"
          type="button"
          :aria-controls="htmlFor"
          :aria-label="increaseLabel"
          command="--step-up"
          :commandfor="htmlFor"
        >
          <slot v-if="$slots['increase-icon']" name="increase-icon"></slot>
          <svg
            v-else
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          ></svg>
        </button>
      </span>
    </span>
    <span
      v-if="endText || $slots['end-text']"
      class="ui-end-text"
      :id="endTextId()"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </component>
</template>
