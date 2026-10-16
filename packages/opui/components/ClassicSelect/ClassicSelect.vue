<script setup lang="ts">
import { FieldGroupKey } from "../FieldGroup/context.vue"
import type { ClassicSelectProps, Slots } from "./types.d.vue"
import {
  computed,
  inject,
  type SelectHTMLAttributes,
  useAttrs,
  useId,
} from "vue"

defineOptions({
  inheritAttrs: false,
})

const {
  endText,
  error,
  id,
  items = [],
  label,
  size,
  variant = "outlined",
} = defineProps<ClassicSelectProps>()
defineSlots<Slots>()
const attrs = useAttrs() as SelectHTMLAttributes
const modelValue = defineModel<string | number | (string | number)[]>()
const vSeed = {
  beforeMount: (el: HTMLSelectElement) => {
    modelValue.value ??= el.multiple
      ? [...el.selectedOptions].map((option) => option.value)
      : el.value
  },
}

const fieldName = inject(FieldGroupKey, undefined)

const uid = useId()
const selectId = computed(() => id || `select-${uid}`)
const endTextId = `end-text-${uid}`
</script>

<template>
  <label
    :class="[
      'ui-select',
      size && `ui-${size}`,
      {
        'ui-filled': variant === 'filled',
      },
      $props.class,
    ]"
  >
    <span v-if="label" class="ui-label">{{ label }}</span>
    <span class="ui-field">
      <select
        v-bind="$attrs"
        v-seed
        v-model="modelValue"
        :aria-describedby="
          [endText ? endTextId : undefined, attrs['aria-describedby']]
            .filter(Boolean)
            .join(' ') || undefined
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="selectId"
        :name="attrs.name ?? fieldName"
      >
        <option v-for="item in items" :key="item.value" :value="item.value">
          {{ item.text }}
        </option>
        <slot></slot>
      </select>
    </span>
    <span v-if="endText" :id="endTextId" class="ui-end-text">{{
      endText
    }}</span>
  </label>
</template>
