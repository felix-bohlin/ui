<script setup lang="ts">
import "../../elements/character-count.js"
import "../../elements/text-field.js"
import {
  computed,
  inject,
  type InputHTMLAttributes,
  useAttrs,
  useId,
  useSlots,
} from "vue"
import Button from "../Button/Button.vue"
import { idRefs } from "../id"
import { useInputAttrs } from "../vue"
import { hidePath, showPath } from "./icons"
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
  passwordToggle,
  passwordToggleLabel = "Show password",
  size,
  spread,
  startText,
  type = "text",
  value,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const inputAttrs = useInputAttrs()
const slots = useSlots()
const modelValue = defineModel<string | number>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const uid = useId()
const hasStartText = computed(() => Boolean(startText || slots["start-text"]))
const hasEndText = computed(() =>
  Boolean(endText || slots["end-text"] || characterCount),
)
const inputId = computed(() =>
  passwordToggle ? (id ?? `${uid}-text-field`) : id,
)
const startTextId = computed(() =>
  passwordToggle && hasStartText.value ? `${uid}-start-text` : undefined,
)
const endTextId = computed(() =>
  passwordToggle && hasEndText.value ? `${uid}-end-text` : undefined,
)

const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <component
    :is="passwordToggle ? 'opui-text-field' : 'label'"
    :class="[
      'ui-text-field',
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
    <component
      :is="passwordToggle ? 'label' : 'span'"
      v-if="label || $slots.label"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :for="passwordToggle ? inputId : undefined"
    >
      {{ label }}<slot name="label"></slot>
    </component>

    <span v-if="hasStartText" class="ui-start-text" :id="startTextId">
      {{ startText }}<slot name="start-text"></slot>
    </span>

    <span class="ui-field">
      <input
        v-bind="inputAttrs"
        v-model="model"
        :aria-describedby="
          idRefs(startTextId, endTextId, attrs['aria-describedby'] as string)
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="inputId"
        :inputmode="
          attrs.inputmode ?? (type === 'numeric' ? 'numeric' : undefined)
        "
        :name="attrs.name ?? field?.name"
        :pattern="attrs.pattern ?? (type === 'numeric' ? '[0-9]*' : undefined)"
        :type="type === 'numeric' ? 'text' : type"
      />
      <span class="ui-start" v-if="$slots.start"
        ><slot name="start"></slot
      ></span>
      <span class="ui-end" v-if="$slots.end || passwordToggle"
        ><slot name="end"></slot
        ><Button
          v-if="passwordToggle"
          :aria-label="passwordToggleLabel"
          aria-pressed="false"
          command="--toggle-password"
          :commandfor="inputId"
          round
        >
          <svg
            aria-hidden="true"
            class="ui-icon-unchecked"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" :d="showPath" />
          </svg>
          <svg
            aria-hidden="true"
            class="ui-icon-checked"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" :d="hidePath" />
          </svg> </Button
      ></span>
      <span class="ui-top" v-if="$slots.top"><slot name="top"></slot></span>
      <span class="ui-bottom" v-if="$slots.bottom"
        ><slot name="bottom"></slot
      ></span>
    </span>

    <span v-if="hasEndText" class="ui-end-text" :id="endTextId">
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
  </component>
</template>
