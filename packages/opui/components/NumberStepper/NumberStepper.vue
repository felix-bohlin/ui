<script setup lang="ts">
import "../../elements/number-stepper.js"
import { computed, inject, useId } from "vue"
import { useInputAttrs } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import Button from "../Button/Button.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { createIds, idRefs } from "../id"
import { minusPath, plusPath } from "./icons"
import type { Props, Slots } from "./types.vue-props"

const {
  decreaseLabel = "Decrease",
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
  value,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

const modelValue = defineModel<number | string>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const field = inject(FieldGroupKey, undefined)

const uid = useId()

const ids = computed(() => createIds(uid, "number-stepper", id))

const inputId = computed(() => ids.value())

const startTextId = computed(() =>
  startText || slots["start-text"] ? ids.value("start-text") : undefined,
)

const endTextId = computed(() =>
  endText || slots["end-text"] ? ids.value("end-text") : undefined,
)
</script>

<template>
  <component
    is="opui-number-stepper"
    :class="[
      'ui-number-stepper',
      { 'ui-filled': variant === 'filled', 'ui-spread': spread },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <label
      v-if="label || $slots.label"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :for="inputId"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></label>
    <span
      v-if="startText || $slots['start-text']"
      class="ui-start-text"
      :id="startTextId"
      >{{ startText }}<slot name="start-text"></slot
    ></span>
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
            <path fill="currentColor" :d="minusPath" />
          </svg>
        </Button> </span
      >{{ " "
      }}<input
        v-bind="attrs"
        :aria-describedby="
          idRefs(startTextId, endTextId, attrs['aria-describedby'])
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="inputId"
        :name="name ?? field?.name"
        type="number"
        v-model="model"
      />{{ " "
      }}<span class="ui-end">
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
            <path fill="currentColor" :d="plusPath" />
          </svg>
        </Button>
      </span>
    </span>
    <span
      v-if="endText || $slots['end-text']"
      class="ui-end-text"
      :id="endTextId"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </component>
</template>
