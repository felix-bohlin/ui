<script setup lang="ts">
import { TrimmedSlot } from "../whitespace.vue"
import type { Props, Slots } from "./types.vue-props"

const {
  autoFit,
  dense,
  dropZone,
  endText,
  for: htmlFor,
  hideLabel,
  label,
  size,
  spread,
  startText,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

const hasLabel = () => Boolean(label || slots.label)

const hasStartText = () => Boolean(startText || slots["start-text"])

const hasEndText = () => Boolean(endText || slots["end-text"])

const startId = () => (slots.start ? `${htmlFor}-start` : undefined)

const endId = () => (slots.end ? `${htmlFor}-end` : undefined)

const topId = () => (slots.top ? `${htmlFor}-top` : undefined)

const bottomId = () => (slots.bottom ? `${htmlFor}-bottom` : undefined)

const startTextId = () => (hasStartText() ? `${htmlFor}-start-text` : undefined)

const endTextId = () => (hasEndText() ? `${htmlFor}-end-text` : undefined)
</script>

<template>
  <div
    :class="[
      'ui-field',
      {
        'ui-auto-fit': autoFit,
        'ui-dense': dense,
        'ui-drop-zone': dropZone,
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
      size && size !== 'medium' && `ui-${size}`,
    ]"
  >
    <label
      v-if="hasLabel()"
      :class="hideLabel ? 'ui-sr-only' : 'ui-label'"
      :for="htmlFor"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></label>
    <span v-if="hasStartText()" class="ui-start-text" :id="startTextId()"
      >{{ startText }}<slot name="start-text"></slot
    ></span>
    <span class="ui-field-container">
      <span v-if="$slots.top" class="ui-top" :id="topId()">
        <slot name="top"></slot>
      </span>
      <span v-if="$slots.start" class="ui-start" :id="startId()">
        <slot name="start"></slot>
      </span>
      <slot></slot>
      <span v-if="$slots.end" class="ui-end" :id="endId()">
        <slot name="end"></slot>
      </span>
      <span v-if="$slots.bottom" class="ui-bottom" :id="bottomId()">
        <slot name="bottom"></slot>
      </span>
    </span>
    <span v-if="hasEndText()" class="ui-end-text" :id="endTextId()"
      >{{ endText }}<slot name="end-text"></slot
    ></span>
  </div>
</template>
