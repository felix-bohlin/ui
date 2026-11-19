<script setup lang="ts">
import "../../elements/number-field.js"
import { computed, inject, useId } from "vue"
import { useBound, useInputAttrs } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import Button from "../Button/Button.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { fieldDescribedBy } from "../id"
import { styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  decreaseLabel = "Decrease",
  disabled,
  endText,
  error,
  hideLabel,
  id,
  increaseLabel = "Increase",
  label,
  name,
  size,
  spread,
  startText,
  stretch,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

const modelValue = defineModel<number | string>()

const bound = useBound()

const field = inject(FieldGroupKey, undefined)

const uid = useId()

const base = computed(() => id || `number-field-${uid}`)

const inputId = computed(() => base.value)

const startTextId = () =>
  startText || slots["start-text"] ? `${base.value}-start-text` : undefined

const endTextId = () =>
  endText || slots["end-text"] ? `${base.value}-end-text` : undefined
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
    v-bind="styleAttrs($attrs.style)"
  >
    <label
      v-if="label || $slots.label"
      :class="hideLabel ? 'ui-sr-only' : 'ui-label'"
      :for="inputId"
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
        <Button
          :aria-controls="inputId"
          :aria-label="decreaseLabel"
          command="--step-down"
          :commandfor="inputId"
          :disabled="disabled"
          round
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
        </Button>
      </span>
      <input
        v-if="bound"
        v-bind="attrs"
        :aria-describedby="
          fieldDescribedBy(
            { endText: endTextId(), startText: startTextId() },
            attrs['aria-describedby'],
          )
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :disabled="disabled"
        :id="inputId"
        :name="name ?? field?.name"
        type="number"
        v-model="modelValue"
      />
      <input
        v-else
        v-bind="attrs"
        :aria-describedby="
          fieldDescribedBy(
            { endText: endTextId(), startText: startTextId() },
            attrs['aria-describedby'],
          )
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :disabled="disabled"
        :id="inputId"
        :name="name ?? field?.name"
        type="number"
      />
      <span class="ui-end">
        <Button
          :aria-controls="inputId"
          :aria-label="increaseLabel"
          command="--step-up"
          :commandfor="inputId"
          :disabled="disabled"
          round
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
        </Button>
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
