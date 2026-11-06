<script setup lang="ts">
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  useTemplateRef,
} from "vue"
import { useInputAttrs, vSeed } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import type { Props, Slots } from "./types.vue-props"

const {
  alphanumeric,
  endText,
  error,
  grouped,
  label,
  length = 6,
  name,
  size,
  value,
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

const modelValue = defineModel<string>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const modelElement = useTemplateRef<HTMLInputElement>("modelElement")

const initialValue = model.value

let modelForm: HTMLFormElement | null = null

const resetModel = (event: Event) =>
  setTimeout(() => {
    const element = modelElement.value
    if (event.defaultPrevented || !element) return
    model.value = element.value
  })

onMounted(() => {
  const element = modelElement.value
  if (!element) return
  if (!element.hasAttribute("value") && initialValue != null) {
    element.defaultValue = String(initialValue)
  }
  modelForm = element.form
  modelForm?.addEventListener("reset", resetModel)
})

onBeforeUnmount(() => modelForm?.removeEventListener("reset", resetModel))

const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <label
    :class="[
      'ui-text-field',
      'ui-one-time-code',
      { 'ui-grouped': grouped },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <span v-if="label || $slots.label" class="ui-label"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()" /></span
    >{{ " "
    }}<span class="ui-field">
      <input
        :autocapitalize="alphanumeric ? 'characters' : undefined"
        autocomplete="one-time-code"
        :inputmode="alphanumeric ? undefined : 'numeric'"
        :pattern="alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`"
        :spellcheck="alphanumeric ? 'false' : undefined"
        v-bind="attrs"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :maxlength="length"
        :name="name ?? field?.name"
        type="text"
        v-seed
        v-model="model"
        ref="modelElement"
      /> </span
    >{{ " "
    }}<span v-if="endText || $slots['end-text']" class="ui-end-text"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </label>
</template>
