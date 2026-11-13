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
import { initialValue, sameValue } from "./selection"
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
    ? initialSelection.some((selected) => sameValue(selected, value))
    : initialSelection !== undefined && sameValue(initialSelection, value)

const uid = useId()
const base = computed(() => id || `select-${uid}`)
// A function, not a computed: slots aren't reactive.
const named = () => Boolean(label || slots.label)
const selectId = () => (named() ? base.value : id)
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
      v-if="named()"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
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
      <select
        v-bind="inputAttrs"
        v-seed
        v-model="model"
        :aria-describedby="
          idRefs(
            (startText || $slots['start-text']) && startTextId,
            $slots.top && topId,
            $slots.start && startId,
            $slots.end && endId,
            $slots.bottom && bottomId,
            (endText || $slots['end-text']) && endTextId,
            attrs['aria-describedby'],
          )
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :aria-labelledby="attrs['aria-labelledby']"
        :id="selectId()"
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
      <span class="ui-start" :id="startId" v-if="$slots.start"
        ><slot name="start"></slot
      ></span>
      <span class="ui-end" :id="endId" v-if="$slots.end"
        ><slot name="end"></slot
      ></span>
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
  </div>
</template>
