<script setup lang="ts">
import { computed, inject, useId } from "vue"
import { useBound, useInputAttrs } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { fieldDescribedBy } from "../id"
import { styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  alphanumeric,
  autocapitalize,
  autocomplete,
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
} = defineProps<Props>()
const slots = defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

const modelValue = defineModel<string>()

const bound = useBound()

const field = inject(FieldGroupKey, undefined)

const uid = useId()

const hasLabel = () => Boolean(label || slots.label)

const hasEndText = () => Boolean(endText || slots["end-text"])

const base = computed(() => id || `one-time-code-${uid}`)

const inputId = () => (hasLabel() ? base.value : id)

const endTextId = () => (hasEndText() ? `${base.value}-end-text` : undefined)
</script>

<template>
  <div
    :class="[
      'ui-one-time-code',
      { 'ui-grouped': grouped },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    v-bind="styleAttrs($attrs.style)"
  >
    <label v-if="hasLabel()" class="ui-label" :for="inputId()"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></label>
    <span class="ui-field">
      <input
        v-if="bound"
        :autocapitalize="
          autocapitalize ?? (alphanumeric ? 'characters' : undefined)
        "
        :autocomplete="autocomplete ?? 'one-time-code'"
        :inputmode="inputmode ?? (alphanumeric ? undefined : 'numeric')"
        :pattern="
          pattern ??
          (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)
        "
        :spellcheck="spellcheck ?? (alphanumeric ? 'false' : undefined)"
        v-bind="attrs"
        :aria-describedby="
          fieldDescribedBy({ endText: endTextId() }, attrs['aria-describedby'])
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :aria-labelledby="attrs['aria-labelledby']"
        :id="inputId()"
        :maxlength="length"
        :name="name ?? field?.name"
        type="text"
        v-model="modelValue"
      />
      <input
        v-else
        :autocapitalize="
          autocapitalize ?? (alphanumeric ? 'characters' : undefined)
        "
        :autocomplete="autocomplete ?? 'one-time-code'"
        :inputmode="inputmode ?? (alphanumeric ? undefined : 'numeric')"
        :pattern="
          pattern ??
          (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)
        "
        :spellcheck="spellcheck ?? (alphanumeric ? 'false' : undefined)"
        v-bind="attrs"
        :aria-describedby="
          fieldDescribedBy({ endText: endTextId() }, attrs['aria-describedby'])
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :aria-labelledby="attrs['aria-labelledby']"
        :id="inputId()"
        :maxlength="length"
        :name="name ?? field?.name"
        type="text"
      />
    </span>
    <span v-if="hasEndText()" class="ui-end-text" :id="endTextId()"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </div>
</template>
