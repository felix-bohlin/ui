<script setup lang="ts">
import "../../css/js/range.js"
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  useId,
  useTemplateRef,
} from "vue"
import { useInputAttrs } from "../vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { createIds, idRefs } from "../id"
import { defaultValue } from "./value"
import type { Props, Slots } from "./types.vue-props"

const {
  endText,
  error,
  hideLabel,
  id,
  items,
  label,
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

const modelElement = useTemplateRef<HTMLInputElement>("modelElement")

let modelForm: HTMLFormElement | null = null

const resetModel = (event: Event) =>
  setTimeout(() => {
    const element = modelElement.value
    if (event.defaultPrevented || !element) return
    model.value = Number.isNaN(element.valueAsNumber)
      ? element.value
      : element.valueAsNumber
  })

onMounted(() => {
  const element = modelElement.value
  if (!element) return
  if (!element.hasAttribute("value") && model.value != null) {
    element.defaultValue = String(model.value)
  }
  modelForm = element.form
  modelForm?.addEventListener("reset", resetModel)
})

onBeforeUnmount(() => modelForm?.removeEventListener("reset", resetModel))

const field = inject(FieldGroupKey, undefined)

const uid = useId()

const ids = computed(() => createIds(uid, "range", id || undefined))

const hasLabel = computed(() => !!label || slots.label)

const hasStartText = computed(() => !!startText || slots["start-text"])

const hasEndText = computed(() => !!endText || slots["end-text"])

const hasValueText = computed(() => slots["value-text"])

const hasValue = computed(() => valueSuffix !== undefined || hasValueText.value)

const hasDatalist = computed(() => !!items || slots.datalist)

const readout = computed(
  () =>
    `${model.value ?? defaultValue({ max, min, step })}${valueSuffix ?? ""}`,
)

const inputId = computed(() => id || (hasValue.value ? ids.value() : undefined))

const labelId = computed(() =>
  hasLabel.value ? ids.value("label") : undefined,
)

const startTextId = computed(() =>
  hasStartText.value ? ids.value("start-text") : undefined,
)

const endTextId = computed(() =>
  hasEndText.value ? ids.value("end-text") : undefined,
)

const listId = computed(
  () => list ?? (hasDatalist.value ? ids.value("list") : undefined),
)

const describedBy = computed(() =>
  idRefs(startTextId.value, endTextId.value, attrs.value["aria-describedby"]),
)
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
      v-if="hasLabel"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :id="labelId"
      >{{ label }}<slot name="label"></slot></span
    >{{ " "
    }}<output
      v-if="hasValue"
      aria-live="off"
      class="ui-value"
      :data-live="hasValueText ? undefined : ''"
      :for="inputId"
      :data-suffix="valueSuffix"
      ><slot v-if="$slots['value-text']" name="value-text"></slot
      ><template v-else>{{ readout }}</template></output
    >{{ " "
    }}<span v-if="hasStartText" class="ui-start-text" :id="startTextId"
      >{{ startText }}<slot name="start-text"></slot></span
    >{{ " "
    }}<input
      v-bind="attrs"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : attrs['aria-invalid']"
      :aria-labelledby="labelId ?? attrs['aria-labelledby']"
      :aria-valuetext="
        attrs['aria-valuetext'] ??
        (valueSuffix && !hasValueText ? readout : undefined)
      "
      :id="inputId"
      :list="listId"
      :max="max"
      :min="min"
      :name="name ?? field?.name"
      :step="step"
      type="range"
      v-model.number="model"
      ref="modelElement"
    />{{ " "
    }}<datalist v-if="hasDatalist" aria-hidden="true" :id="listId">
      <template v-for="(option, index) in items" :key="index"
        ><option
          v-if="typeof option === 'object'"
          :value="option.value"
          :label="option.label"
        ></option>
        <option v-else :value="option"></option
      ></template>
      <slot name="datalist"></slot></datalist
    >{{ " "
    }}<span v-if="hasEndText" class="ui-end-text" :id="endTextId"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </label>
</template>
