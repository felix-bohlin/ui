<script setup lang="ts">
import { computed, useAttrs, useId } from "vue"
import type { InputHTMLAttributes } from "vue"
import type { Props, Slots } from "./types.d.vue"

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
} = defineProps<Props>()
const slots = defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const inputAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(
      ([key]) => key !== "aria-describedby" && key !== "style",
    ),
  ),
)
const modelValue = defineModel<string>()

const model = computed({
  get: () => modelValue.value ?? (attrs.value as string | undefined),
  set: (value) => {
    modelValue.value = value
  },
})

const uid = useId()
const endTextId = computed(() =>
  endText || slots["end-text"] ? `end-text-${uid}` : undefined,
)
const describedBy = computed(
  () =>
    [endTextId.value, attrs["aria-describedby"]].filter(Boolean).join(" ") ||
    undefined,
)
const pattern = computed(() =>
  alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`,
)
</script>

<template>
  <label
    :class="[
      'ui-text-field',
      'ui-one-time-code',
      {
        'ui-grouped': grouped,
      },
      size && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <span v-if="label || slots.label" class="ui-label">
      <slot name="label">{{ label }}</slot>
    </span>

    <span class="ui-field">
      <input
        :autocapitalize="alphanumeric ? 'characters' : undefined"
        autocomplete="one-time-code"
        :inputmode="alphanumeric ? undefined : 'numeric'"
        :pattern="pattern"
        :spellcheck="alphanumeric ? 'false' : undefined"
        v-bind="inputAttrs"
        :aria-describedby="describedBy"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="id"
        :maxlength="length"
        type="text"
        v-model="model"
      />
    </span>

    <span
      v-if="endText || slots['end-text']"
      :id="endTextId"
      class="ui-end-text"
    >
      <slot name="end-text">{{ endText }}</slot>
    </span>
  </label>
</template>
