<script setup lang="ts">
import { computed, inject, type InputHTMLAttributes, useAttrs } from "vue"
import { useInputAttrs } from "../vue"
import type { Props, Slots } from "./types.vue-props"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const {
  alphanumeric,
  endText,
  error,
  grouped,
  id,
  label,
  length = 6,
  size,
  value,
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

const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <label
    :class="[
      'ui-text-field',
      'ui-one-time-code',
      { 'ui-grouped': grouped },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <span v-if="label || $slots.label" class="ui-label">
      {{ label }}<slot name="label"></slot>
    </span>
    <span class="ui-field">
      <input
        :autocapitalize="alphanumeric ? 'characters' : undefined"
        autocomplete="one-time-code"
        :inputmode="alphanumeric ? undefined : 'numeric'"
        :pattern="alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`"
        :spellcheck="alphanumeric ? 'false' : undefined"
        v-bind="inputAttrs"
        v-model="model"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="id"
        :maxlength="length"
        :name="attrs.name ?? field?.name"
        type="text"
      />
    </span>
    <span v-if="endText || $slots['end-text']" class="ui-end-text">
      {{ endText }}<slot name="end-text"></slot>
    </span>
  </label>
</template>
