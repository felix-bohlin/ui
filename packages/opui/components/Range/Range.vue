<script setup lang="ts">
import "../../css/js/range.js"
import { computed, inject, useId } from "vue"
import { useInputAttrs, vSeed } from "../vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { idRefs } from "../id"
import { formatValue, middleValue } from "./value"
import { styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  endText,
  error,
  hideLabel,
  id,
  items,
  label,
  lang,
  list,
  max,
  min,
  name,
  size,
  spread,
  startText,
  step,
  value,
  valueSuffix,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

const modelValue = defineModel<number | string>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const field = inject(FieldGroupKey, undefined)

const uid = useId()

const base = computed(() => id || `range-${uid}`)

const hasLabel = () => !!label || slots.label

const hasStartText = () => !!startText || slots["start-text"]

const hasEndText = () => !!endText || slots["end-text"]

const hasValueText = () => slots["value-text"]

const hasValue = () => valueSuffix !== undefined || hasValueText()

const hasDatalist = () => !!items || slots.datalist

const current = computed(() => model.value ?? middleValue({ max, min, step }))

const readout = computed(
  () =>
    `${formatValue(current.value, { lang, min, step })}${valueSuffix ?? ""}`,
)

const tick = computed(() =>
  items?.find(
    (option) =>
      typeof option === "object" &&
      Number(option.value) === Number(current.value),
  ),
)

const tickLabel = computed(() =>
  valueSuffix || typeof tick.value !== "object" ? undefined : tick.value.label,
)

const inputId = () => id || (hasValue() ? base.value : undefined)

const labelId = () => (hasLabel() ? `${base.value}-label` : undefined)

const startTextId = () =>
  hasStartText() ? `${base.value}-start-text` : undefined

const endTextId = () => (hasEndText() ? `${base.value}-end-text` : undefined)

const listId = () => list ?? (hasDatalist() ? `${base.value}-list` : undefined)

const describedBy = () =>
  idRefs(startTextId(), endTextId(), attrs.value["aria-describedby"])
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
    :for="hasValue() ? inputId() : undefined"
    :lang="lang"
    v-bind="styleAttrs($attrs.style)"
  >
    <span
      v-if="hasLabel()"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :id="labelId()"
      >{{ label }}<slot name="label"></slot
    ></span>
    <output
      v-if="hasValue()"
      aria-live="off"
      class="ui-value"
      :data-live="hasValueText() ? undefined : ''"
      :for="inputId()"
      :data-suffix="valueSuffix"
    >
      <slot v-if="$slots['value-text']" name="value-text"></slot>
      <template v-else>{{ readout }}</template>
    </output>
    <span v-if="hasStartText()" class="ui-start-text" :id="startTextId()"
      >{{ startText }}<slot name="start-text"></slot
    ></span>
    <input
      v-bind="attrs"
      :aria-describedby="describedBy()"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      :aria-labelledby="labelId() ?? attrs['aria-labelledby']"
      :aria-valuetext="
        attrs['aria-valuetext'] ??
        (valueSuffix && !hasValueText() ? readout : tickLabel)
      "
      :id="inputId()"
      :list="listId()"
      :max="max"
      :min="min"
      :name="name ?? field?.name"
      :step="step"
      type="range"
      v-seed
      v-model.number="model"
    />
    <datalist v-if="hasDatalist()" aria-hidden="true" :id="listId()">
      <template v-for="(option, index) in items" :key="index"
        ><option
          v-if="typeof option === 'object'"
          :value="option.value"
          :label="option.label"
        ></option>
        <option v-else :value="option"></option
      ></template>
      <slot name="datalist"></slot>
    </datalist>
    <span v-if="hasEndText()" class="ui-end-text" :id="endTextId()"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </label>
</template>
