<script setup lang="ts">
import type { RangeProps, Slots } from "./types.d.vue"
import {
  computed,
  inject,
  type InputHTMLAttributes,
  onBeforeUnmount,
  onMounted,
  useAttrs,
  useId,
  useSlots,
  useTemplateRef,
} from "vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<RangeProps>()
defineSlots<Slots>()
const modelValue = defineModel<number | string>()

const model = computed({
  get: () => modelValue.value ?? props.value,
  set: (value) => {
    modelValue.value = value
  },
})

const input = useTemplateRef<HTMLInputElement>("input")
let form: HTMLFormElement | null | undefined
const syncAfterReset = () =>
  setTimeout(() => {
    if (input.value) model.value = input.value.valueAsNumber
  })
onMounted(() => {
  form = input.value?.form
  form?.addEventListener("reset", syncAfterReset)
})
onBeforeUnmount(() => form?.removeEventListener("reset", syncAfterReset))

const attrs = useAttrs() as InputHTMLAttributes
const defaultValue = computed(() => {
  const min = Number(attrs.min ?? 0)
  const max = Math.max(min, Number(attrs.max ?? 100))
  const step = attrs.step === "any" ? 0 : Number(attrs.step ?? 1)
  const middle = min + (max - min) / 2
  if (!step) return middle
  const value = min + Math.round((middle - min) / step) * step
  return value > max ? value - step : value
})

const uid = useId()
const slots = useSlots()
const field = inject(FieldGroupKey, undefined)
const hasValue = computed(
  () => props.valueSuffix !== undefined || !!slots.value,
)
const inputId = computed(
  () => props.id || (hasValue.value ? `range-${uid}` : undefined),
)
const listId = computed(
  () =>
    props.list ??
    (props.options || slots.datalist ? `range-list-${uid}` : undefined),
)

const labelId = `range-label-${uid}`
const startTextId = `range-start-${uid}`
const endTextId = `range-end-${uid}`
</script>

<template>
  <label
    :class="[
      'ui-range',
      props.variant && `ui-${props.variant}`,
      { 'ui-spread': props.spread },
      props.class,
    ]"
  >
    <span v-if="props.label || $slots.default" class="ui-label" :id="labelId">
      <slot>{{ props.label }}</slot>
    </span>
    <output
      v-if="props.valueSuffix !== undefined || $slots.value"
      class="ui-value"
      :for="inputId"
      :data-suffix="props.valueSuffix"
    >
      <slot name="value" :value="Number(model ?? defaultValue)"
        >{{ model ?? defaultValue }}{{ props.valueSuffix }}</slot
      >
    </output>
    <span
      v-if="props.startText || $slots['start-text']"
      class="ui-start-text"
      :id="startTextId"
    >
      <slot name="start-text">{{ props.startText }}</slot>
    </span>

    <input
      v-bind="$attrs"
      v-model.number="model"
      :aria-describedby="
        [
          props.startText || $slots['start-text'] ? startTextId : undefined,
          props.endText || $slots['end-text'] ? endTextId : undefined,
          attrs['aria-describedby'],
        ]
          .filter(Boolean)
          .join(' ') || undefined
      "
      :aria-invalid="props.error ? 'true' : attrs['aria-invalid']"
      :aria-labelledby="
        props.label || $slots.default ? labelId : attrs['aria-labelledby']
      "
      :id="inputId"
      :list="listId"
      :name="attrs.name ?? field?.name"
      ref="input"
      type="range"
    />

    <datalist v-if="props.options || $slots.datalist" :id="listId">
      <template
        v-for="option in props.options"
        :key="typeof option === 'object' ? option.value : option"
      >
        <option
          :value="typeof option === 'object' ? option.value : option"
          :label="typeof option === 'object' ? option.label : undefined"
        />
      </template>
      <slot name="datalist"></slot>
    </datalist>

    <span
      v-if="props.endText || $slots['end-text']"
      class="ui-end-text"
      :id="endTextId"
    >
      <slot name="end-text">{{ props.endText }}</slot>
    </span>
  </label>
</template>
