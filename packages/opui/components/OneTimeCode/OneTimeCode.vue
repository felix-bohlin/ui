<script setup lang="ts">
import { computed, inject } from "vue"
import { useInputAttrs, vSeed } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { defined } from "../attrs"
import { styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  alphanumeric,
  autocapitalize,
  endText,
  error,
  grouped,
  inputmode,
  label,
  length = 6,
  name,
  pattern,
  size,
  spellcheck = undefined,
  value,
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
      'ui-text-field',
      'ui-one-time-code',
      { 'ui-grouped': grouped },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    v-bind="styleAttrs($attrs.style)"
  >
    <span v-if="label || $slots.label" class="ui-label"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></span>
    <span class="ui-field">
      <input
        :autocapitalize="
          autocapitalize ?? (alphanumeric ? 'characters' : undefined)
        "
        autocomplete="one-time-code"
        :inputmode="inputmode ?? (alphanumeric ? undefined : 'numeric')"
        :pattern="
          pattern ??
          (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)
        "
        :spellcheck="spellcheck ?? (alphanumeric ? 'false' : undefined)"
        v-bind="defined(attrs)"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :maxlength="length"
        :name="name ?? field?.name"
        type="text"
        v-seed
        v-model="model"
      />
    </span>
    <span v-if="endText || $slots['end-text']" class="ui-end-text"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </label>
</template>
