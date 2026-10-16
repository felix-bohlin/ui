<script setup lang="ts">
import {
  computed,
  inject,
  type SelectHTMLAttributes,
  useAttrs,
  useId,
} from "vue"
import type { Props, Slots } from "./types.d.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const {
  dense,
  description,
  endText,
  error,
  id,
  items = [],
  label,
  size,
  spread,
  variant = "outlined",
} = defineProps<Props>()
defineSlots<Slots>()
const attrs = useAttrs() as SelectHTMLAttributes
const modelValue = defineModel<string | number | (string | number)[]>()

const multiple = computed(
  () => attrs.multiple !== undefined && attrs.multiple !== false,
)
const selectedItemValues = computed(() =>
  items.filter((item) => item.selected).map((item) => item.value),
)

const model = computed({
  get: () =>
    modelValue.value ??
    (attrs.value as string | number | (string | number)[] | undefined) ??
    (multiple.value ? selectedItemValues.value : selectedItemValues.value[0]),
  set: (value) => {
    modelValue.value = value
  },
})

const isSelected = (value: unknown) =>
  Array.isArray(model.value)
    ? model.value.includes(value as string | number)
    : model.value === value

const uid = useId()
const labelId = `select-label-${uid}`
const descriptionId = `start-text-${uid}`
const endTextId = `end-text-${uid}`
const fieldName = inject(FieldGroupKey, undefined)
</script>

<template>
  <label
    :class="[
      'ui-select',
      size && `ui-${size}`,
      {
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
      $props.class,
    ]"
  >
    <span v-if="label || $slots.label" class="ui-label" :id="labelId">
      <slot name="label">{{ label }}</slot>
    </span>

    <span
      v-if="description || $slots.description"
      class="ui-start-text"
      :id="descriptionId"
    >
      <slot name="description">{{ description }}</slot>
    </span>

    <span class="ui-field">
      <select
        v-bind="$attrs"
        v-model="model"
        :aria-describedby="
          [
            description || $slots.description ? descriptionId : undefined,
            endText || $slots['end-text'] ? endTextId : undefined,
            attrs['aria-describedby'],
          ]
            .filter(Boolean)
            .join(' ') || undefined
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :aria-labelledby="
          label || $slots.label ? labelId : attrs['aria-labelledby']
        "
        :id="id"
        :name="attrs.name ?? fieldName"
      >
        <button v-pre>
          <selectedcontent></selectedcontent>
        </button>
        <div :class="['ui-list', { 'ui-dense': dense }]">
          <option
            v-for="item in items"
            :key="item.value"
            :selected="isSelected(item.value) || undefined"
            :value="item.value"
          >
            {{ item.text }}
          </option>
          <slot></slot>
        </div>
      </select>
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

    <span
      v-if="endText || $slots['end-text']"
      :id="endTextId"
      class="ui-end-text"
    >
      <slot name="end-text">{{ endText }}</slot>
    </span>
  </label>
</template>
