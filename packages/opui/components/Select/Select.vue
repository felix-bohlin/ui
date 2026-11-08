<script setup lang="ts">
import { TrimmedSlot } from "../whitespace.vue"
import {
  computed,
  inject,
  type SelectHTMLAttributes,
  useAttrs,
  useId,
} from "vue"
import { useInputAttrs, vSeed } from "../vue"
import type { Props, Slots } from "./types.vue-props"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { idRefs } from "../id"
import { initialValue } from "./selection"

defineOptions({
  inheritAttrs: false,
})

const {
  autoFit,
  dense,
  endText,
  error,
  hideLabel,
  id,
  items = [],
  label,
  name,
  size,
  spread,
  startText,
  value,
  variant = "outlined",
} = defineProps<Props>()
defineSlots<Slots>()
const attrs = useAttrs() as SelectHTMLAttributes
const inputAttrs = useInputAttrs()
const modelValue = defineModel<string | number | (string | number)[]>()

const multiple = computed(
  () => attrs.multiple !== undefined && attrs.multiple !== false,
)
const model = computed({
  get: () => modelValue.value ?? value ?? initialValue(items, multiple.value),
  set: (value) => {
    modelValue.value = value
  },
})

const initialSelection = model.value

const selectedAtFirst = (value: unknown) =>
  Array.isArray(initialSelection)
    ? initialSelection.includes(value as string | number)
    : initialSelection === value

const uid = useId()
const base = computed(() => id || `select-${uid}`)
const labelId = computed(() => `${base.value}-label`)
const startTextId = computed(() => `${base.value}-start-text`)
const endTextId = computed(() => `${base.value}-end-text`)
const topId = computed(() => `${base.value}-top`)
const bottomId = computed(() => `${base.value}-bottom`)
const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <label
    :class="[
      'ui-select',
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
    <span
      v-if="label || $slots.label"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :id="labelId"
    >
      {{ label }}<TrimmedSlot :nodes="$slots.label?.()" />
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
        :name="name ?? field?.name"
      >
        <button v-pre>
          <selectedcontent></selectedcontent>
        </button>
        <div :class="['ui-list', { 'ui-dense': dense }]">
          <option
            v-for="item in items"
            :key="item.value"
            :selected="selectedAtFirst(item.value) || undefined"
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
