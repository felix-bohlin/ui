<script setup lang="ts">
import { computed, inject, type InputHTMLAttributes, useAttrs } from "vue"
import type { Props, Slots } from "./types.d.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const {
  autoFit,
  endText,
  error,
  id,
  label,
  size,
  spread,
  startText,
  type = "text",
  value,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)
const modelValue = defineModel<string | number>()

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
      'ui-text-field',
      {
        'ui-auto-fit': autoFit,
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
      size && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <span v-if="label || $slots.label" class="ui-label">
      {{ label }}<slot name="label"></slot>
    </span>

    <span v-if="startText || $slots['start-text']" class="ui-start-text">
      {{ startText }}<slot name="start-text"></slot>
    </span>

    <span class="ui-field">
      <input
        v-bind="inputAttrs"
        v-model="model"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="id"
        :inputmode="
          attrs.inputmode ?? (type === 'numeric' ? 'numeric' : undefined)
        "
        :name="attrs.name ?? field?.name"
        :pattern="attrs.pattern ?? (type === 'numeric' ? '[0-9]*' : undefined)"
        :type="type === 'numeric' ? 'text' : type"
      />
      <span class="ui-prefix" v-if="$slots.prefix"
        ><slot name="prefix"></slot
      ></span>
      <span class="ui-suffix" v-if="$slots.suffix"
        ><slot name="suffix"></slot
      ></span>
      <span class="ui-header" v-if="$slots.header"
        ><slot name="header"></slot
      ></span>
      <span class="ui-footer" v-if="$slots.footer"
        ><slot name="footer"></slot
      ></span>
    </span>

    <span v-if="endText || $slots['end-text']" class="ui-end-text">
      {{ endText }}<slot name="end-text"></slot>
    </span>

    <slot></slot>
  </label>
</template>
