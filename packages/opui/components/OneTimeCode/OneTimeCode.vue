<script setup lang="ts">
import { computed, inject, useId } from "vue"
import { useInputAttrs, vSeed } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { idRefs } from "../id"
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

const hasLabel = () => Boolean(label || slots.label)

const hasEndText = () => Boolean(endText || slots["end-text"])

const base = computed(() => id || `one-time-code-${uid}`)

const labelId = () => (hasLabel() ? `${base.value}-label` : undefined)

const endTextId = () => (hasEndText() ? `${base.value}-end-text` : undefined)
</script>

<template>
  <label
    :class="[
      'ui-one-time-code',
      { 'ui-grouped': grouped },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    v-bind="styleAttrs($attrs.style)"
  >
    <span v-if="hasLabel()" class="ui-label" :id="labelId()"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></span>
    <span class="ui-field">
      <input
        :autocapitalize="
          autocapitalize ?? (alphanumeric ? 'characters' : undefined)
        "
        :inputmode="inputmode ?? (alphanumeric ? undefined : 'numeric')"
        :pattern="
          pattern ??
          (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)
        "
        :spellcheck="spellcheck ?? (alphanumeric ? 'false' : undefined)"
        v-bind="attrs"
        :aria-describedby="idRefs(endTextId(), attrs['aria-describedby'])"
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :aria-labelledby="hasLabel() ? labelId() : attrs['aria-labelledby']"
        autocomplete="one-time-code"
        :id="id"
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
  </label>
</template>
