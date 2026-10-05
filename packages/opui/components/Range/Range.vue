<script setup lang="ts">
import type { RangeProps, Slots } from "./types.d.vue"
import {
  computed,
  inject,
  onMounted,
  useAttrs,
  useId,
  useSlots,
  useTemplateRef,
  watch,
} from "vue"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

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

const attrs = useAttrs()
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
const currentFieldName = inject(CurrentFieldNameKey, undefined)
const hasValue = computed(
  () => props.valueSuffix !== undefined || !!slots.value,
)
const inputId = computed(() => props.id || (hasValue.value ? uid : undefined))

const input = useTemplateRef<HTMLInputElement>("input")
const fillTrack = () => {
  if (!input.value) return
  const min = Number(input.value.min || 0)
  const max = Number(input.value.max || 100)
  const fill = ((Number(input.value.value) - min) / (max - min || 1)) * 100
  input.value.style.setProperty("--_track-fill", `${fill}%`)
}
onMounted(fillTrack)
watch(model, fillTrack, { flush: "post" })
const labelId = useId()
const startTextId = useId()
const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'ui-range',
      props.variant && `ui-${props.variant}`,
      { 'ui-spread': props.spread },
      props.class,
    ]"
    :data-invalid="props.error ? '' : undefined"
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
      <slot name="value"
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
      :aria-describedby="
        [
          props.startText || $slots['start-text'] ? startTextId : undefined,
          props.endText || $slots['end-text'] ? endTextId : undefined,
        ]
          .filter(Boolean)
          .join(' ') || undefined
      "
      :aria-invalid="props.error ? 'true' : undefined"
      :aria-labelledby="props.label || $slots.default ? labelId : undefined"
      :id="inputId"
      :list="props.list"
      :name="currentFieldName"
      ref="input"
      type="range"
      v-bind="$attrs"
      v-model.number="model"
    />

    <datalist v-if="props.options || $slots.datalist" :id="props.list">
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
