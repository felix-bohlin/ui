<script setup lang="ts">
import { TrimmedSlot } from "../whitespace.vue"
import type { Props, Slots } from "./types.vue-props"

const {
  endText,
  for: htmlFor,
  grouped,
  hideLabel,
  label,
  size,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

const hasLabel = () => Boolean(label || slots.label)

const hasEndText = () => Boolean(endText || slots["end-text"])

const endTextId = () => (hasEndText() ? `${htmlFor}-end-text` : undefined)
</script>

<template>
  <div
    :class="[
      'ui-one-time-code',
      { 'ui-grouped': grouped },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
  >
    <label
      v-if="hasLabel()"
      :class="hideLabel ? 'ui-sr-only' : 'ui-label'"
      :for="htmlFor"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></label>
    <span class="ui-field-container">
      <slot></slot>
    </span>
    <span v-if="hasEndText()" class="ui-end-text" :id="endTextId()"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </div>
</template>
