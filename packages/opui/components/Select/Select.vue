<script setup lang="ts">
import { TrimmedSlot } from "../whitespace.vue"
import {
  computed,
  inject,
  type ObjectDirective,
  type SelectHTMLAttributes,
  useAttrs,
  useId,
} from "vue"
import { useBound, useInputAttrs } from "../vue"
import type { Props, Slots } from "./types.vue-props"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { fieldDescribedBy } from "../id"
import { sameValue } from "./selection"
import { styleAttrs } from "../style"

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
const slots = defineSlots<Slots>()
const attrs = useAttrs() as SelectHTMLAttributes
const inputAttrs = useInputAttrs()
const modelValue = defineModel<string | number | (string | number)[]>()
const bound = useBound()

const isSelected = (item: (typeof items)[number]) => {
  const current = bound ? modelValue.value : value
  return current === undefined
    ? item.selected
    : Array.isArray(current)
      ? current.some((selected) => sameValue(selected, item.value))
      : sameValue(item.value, current)
}

const setValue = (select: HTMLSelectElement, value: unknown) => {
  if (value === undefined) return
  for (const option of select.options) {
    option.selected = [value]
      .flat()
      .some((selected) => sameValue(selected, option.value))
  }
}

const vValue: ObjectDirective<HTMLSelectElement, unknown> = {
  mounted: (select, { value }) => setValue(select, value),
  updated: (select, { oldValue, value }) => {
    if (value !== oldValue) setValue(select, value)
  },
}

const vServerSelected: ObjectDirective<HTMLOptionElement, boolean | undefined> =
  {
    getSSRProps: ({ value }) => (value ? { selected: true } : {}),
  }

const uid = useId()
const base = computed(() => id || `select-${uid}`)
const hasLabel = () => Boolean(label || slots.label)
const selectId = () => (hasLabel() ? base.value : id)
const startTextId = computed(() => `${base.value}-start-text`)
const endTextId = computed(() => `${base.value}-end-text`)
const startId = computed(() => `${base.value}-start`)
const endId = computed(() => `${base.value}-end`)
const topId = computed(() => `${base.value}-top`)
const bottomId = computed(() => `${base.value}-bottom`)
const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <div
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
    v-bind="styleAttrs($attrs.style)"
  >
    <label
      v-if="hasLabel()"
      :class="hideLabel ? 'ui-sr-only' : 'ui-label'"
      :for="selectId()"
    >
      {{ label }}<TrimmedSlot :nodes="$slots.label?.()" />
    </label>

    <span
      v-if="startText || $slots['start-text']"
      class="ui-start-text"
      :id="startTextId"
    >
      {{ startText }}<slot name="start-text"></slot>
    </span>

    <span class="ui-field">
      <span class="ui-top" :id="topId" v-if="$slots.top"
        ><slot name="top"></slot
      ></span>
      <span class="ui-start" :id="startId" v-if="$slots.start"
        ><slot name="start"></slot
      ></span>
      <select
        v-if="bound"
        v-bind="inputAttrs"
        v-model="modelValue"
        :aria-describedby="
          fieldDescribedBy(
            {
              bottom: $slots.bottom && bottomId,
              end: $slots.end && endId,
              endText: (endText || $slots['end-text']) && endTextId,
              start: $slots.start && startId,
              startText: (startText || $slots['start-text']) && startTextId,
              top: $slots.top && topId,
            },
            attrs['aria-describedby'],
          )
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :aria-labelledby="attrs['aria-labelledby']"
        :id="selectId()"
        :name="name ?? field?.name"
      >
        <button inert v-pre>
          <selectedcontent></selectedcontent>
        </button>
        <div :class="['ui-list', { 'ui-dense': dense }]">
          <option
            v-for="item in items"
            :key="item.value"
            v-server-selected="isSelected(item)"
            :value="item.value"
          >
            {{ item.label }}
          </option>
          <slot></slot>
        </div>
      </select>
      <select
        v-else
        v-bind="inputAttrs"
        v-value="value"
        :aria-describedby="
          fieldDescribedBy(
            {
              bottom: $slots.bottom && bottomId,
              end: $slots.end && endId,
              endText: (endText || $slots['end-text']) && endTextId,
              start: $slots.start && startId,
              startText: (startText || $slots['start-text']) && startTextId,
              top: $slots.top && topId,
            },
            attrs['aria-describedby'],
          )
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :aria-labelledby="attrs['aria-labelledby']"
        :id="selectId()"
        :name="name ?? field?.name"
      >
        <button inert v-pre>
          <selectedcontent></selectedcontent>
        </button>
        <div :class="['ui-list', { 'ui-dense': dense }]">
          <option
            v-for="item in items"
            :key="item.value"
            :selected="isSelected(item) || undefined"
            :value="item.value"
          >
            {{ item.label }}
          </option>
          <slot></slot>
        </div>
      </select>
      <span class="ui-end" :id="endId" v-if="$slots.end"
        ><slot name="end"></slot
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
  </div>
</template>
