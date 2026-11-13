<script setup lang="ts">
import { computed, inject, useId } from "vue"
import { useInputAttrs, vSeed } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { idRefs } from "../id"
import { defined } from "../attrs"
import { styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  alphanumeric,
  autocapitalize,
  endText,
  error,
  grouped,
  id,
  inputmode,
  label,
  length = 6,
  name,
  pattern,
  size,
  spellcheck = undefined,
  value,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

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

const field = inject(FieldGroupKey, undefined)

const uid = useId()

const named = () => Boolean(label || slots.label)

const base = computed(() => id || `one-time-code-${uid}`)

const inputId = () => (named() ? base.value : id)

const hasEndText = () => Boolean(endText || slots["end-text"])

const endTextId = () => (hasEndText() ? `${base.value}-end-text` : undefined)
</script>

<template>
  <div
    :class="[
      'ui-text-field',
      'ui-one-time-code',
      { 'ui-grouped': grouped },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    v-bind="styleAttrs($attrs.style)"
  >
    <label v-if="named()" class="ui-label" :for="inputId()"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></label>
    <span class="ui-field">
      <input
        :autocapitalize="
          autocapitalize ?? (alphanumeric ? 'characters' : undefined)
        "
        autocomplete="one-time-code"
        :inputmode="inputmode ?? (alphanumeric ? undefined : 'numeric')"
        :pattern="
          pattern ??
          (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)
        "
        :spellcheck="spellcheck ?? (alphanumeric ? 'false' : undefined)"
        v-bind="defined(attrs)"
        :aria-describedby="idRefs(endTextId(), attrs['aria-describedby'])"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="inputId()"
        :maxlength="length"
        :name="name ?? field?.name"
        type="text"
        v-seed
        v-model="model"
      />
    </span>
    <span v-if="hasEndText()" class="ui-end-text" :id="endTextId()"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </div>
</template>
