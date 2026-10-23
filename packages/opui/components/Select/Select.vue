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
import { idRefs } from "../id"

defineOptions({
  inheritAttrs: false,
})

const {
  dense,
  endText,
  error,
  id,
  items = [],
  label,
  size,
  spread,
  startText,
  value,
  variant = "outlined",
} = defineProps<Props>()
defineSlots<Slots>()
const attrs = useAttrs() as SelectHTMLAttributes
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)
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
    value ??
    (multiple.value ? selectedItemValues.value : selectedItemValues.value[0]),
  set: (value) => {
    modelValue.value = value
  },
})

const vSeed = {
  beforeMount: (el: HTMLSelectElement) => {
    model.value ??= el.multiple
      ? [...el.selectedOptions].map((option) => option.value)
      : el.value
  },
}

const isSelected = (value: unknown) =>
  Array.isArray(model.value)
    ? model.value.includes(value as string | number)
    : model.value === value

const uid = useId()
const labelId = `select-label-${uid}`
const startTextId = `start-text-${uid}`
const endTextId = `end-text-${uid}`
const topId = `top-${uid}`
const bottomId = `bottom-${uid}`
const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <label
    :class="[
      'ui-select',
      {
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <span v-if="label || $slots.label" class="ui-label" :id="labelId">
      {{ label }}<slot name="label"></slot>
    </span>

    <span
      v-if="startText || $slots['start-text']"
      class="ui-start-text"
      :id="startTextId"
    >
      {{ startText }}<slot name="start-text"></slot>
    </span>

    <span class="ui-field">
      <select
        v-bind="inputAttrs"
        v-seed
        v-model="model"
        :aria-describedby="
          idRefs(
            $slots.top && topId,
            (startText || $slots['start-text']) && startTextId,
            (endText || $slots['end-text']) && endTextId,
            $slots.bottom && bottomId,
            attrs['aria-describedby'],
          )
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :aria-labelledby="
          label || $slots.label ? labelId : attrs['aria-labelledby']
        "
        :id="id"
        :name="attrs.name ?? field?.name"
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
            {{ item.label }}
          </option>
          <slot></slot>
        </div>
      </select>
      <span class="ui-start" v-if="$slots.start"
        ><slot name="start"></slot
      ></span>
      <span class="ui-end" v-if="$slots.end"><slot name="end"></slot></span>
      <span class="ui-top" :id="topId" v-if="$slots.top"
        ><slot name="top"></slot
      ></span>
      <span class="ui-bottom" :id="bottomId" v-if="$slots.bottom"
        ><slot name="bottom"></slot
      ></span>
    </span>

    <span
      v-if="endText || $slots['end-text']"
      :id="endTextId"
      class="ui-end-text"
    >
      {{ endText }}<slot name="end-text"></slot>
    </span>
  </label>
</template>
