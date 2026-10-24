<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"
import {
  computed,
  inject,
  type InputHTMLAttributes,
  onBeforeUnmount,
  onMounted,
  useAttrs,
  useId,
  useTemplateRef,
} from "vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { idRefs } from "../id"

defineOptions({
  inheritAttrs: false,
})

const {
  endText,
  error,
  hideLabel,
  id,
  items,
  label,
  list,
  size,
  spread,
  startText,
  value,
  valueSuffix,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()
const modelValue = defineModel<number | string>()

const model = computed({
  get: () => modelValue.value ?? value,
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
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)
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
const field = inject(FieldGroupKey, undefined)
const hasValue = computed(
  () => valueSuffix !== undefined || !!slots["value-text"],
)
const inputId = computed(
  () => id || (hasValue.value ? `range-${uid}` : undefined),
)
const listId = computed(
  () => list ?? (items || slots.datalist ? `range-list-${uid}` : undefined),
)

const labelId = `range-label-${uid}`
const startTextId = `range-start-${uid}`
const endTextId = `range-end-${uid}`
</script>

<template>
  <label
    :class="[
      'ui-range',
      { 'ui-spread': spread },
      size && size !== 'medium' && `ui-${size}`,
      variant && variant !== 'outlined' && `ui-${variant}`,
      $props.class,
    ]"
    :for="hasValue ? inputId : undefined"
    :style="$attrs.style"
  >
    <span
      v-if="label || $slots.label"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :id="labelId"
    >
      {{ label }}<slot name="label"></slot>
    </span>
    <output
      v-if="valueSuffix !== undefined || $slots['value-text']"
      class="ui-value"
      :for="inputId"
      :data-suffix="valueSuffix"
    >
      <slot name="value-text" :value="Number(model ?? defaultValue)"
        >{{ model ?? defaultValue }}{{ valueSuffix }}</slot
      >
    </output>
    <span
      v-if="startText || $slots['start-text']"
      class="ui-start-text"
      :id="startTextId"
    >
      {{ startText }}<slot name="start-text"></slot>
    </span>

    <input
      v-bind="inputAttrs"
      v-model.number="model"
      :aria-describedby="
        idRefs(
          (startText || $slots['start-text']) && startTextId,
          (endText || $slots['end-text']) && endTextId,
          attrs['aria-describedby'],
        )
      "
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      :aria-labelledby="
        label || $slots.label ? labelId : attrs['aria-labelledby']
      "
      :id="inputId"
      :list="listId"
      :name="attrs.name ?? field?.name"
      ref="input"
      type="range"
    />

    <datalist v-if="items || $slots.datalist" aria-hidden="true" :id="listId">
      <template
        v-for="option in items"
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
      v-if="endText || $slots['end-text']"
      class="ui-end-text"
      :id="endTextId"
    >
      {{ endText }}<slot name="end-text"></slot>
    </span>
  </label>
</template>
