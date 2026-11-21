<script setup lang="ts">
import "../../elements/character-count.js"
import "../../elements/text-field.js"
import { computed } from "vue"
import { TrimmedSlot } from "../whitespace.vue"
import type { Props, Slots } from "./types.vue-props"

const {
  autoFit,
  characterCount,
  characterCountLabel,
  dropZone,
  endText,
  for: htmlFor,
  hideLabel,
  label,
  passwordToggle,
  passwordToggleLabel = "Show password",
  size,
  spread,
  startText,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

const hasLabel = () => Boolean(label || slots.label)

const Root = computed(() => (passwordToggle ? "opui-text-field" : "div"))

const hasStartText = () => Boolean(startText || slots["start-text"])

const hasEndText = () => Boolean(endText || slots["end-text"] || characterCount)

const startId = () => (slots.start ? `${htmlFor}-start` : undefined)

const endId = () => (slots.end ? `${htmlFor}-end` : undefined)

const topId = () => (slots.top ? `${htmlFor}-top` : undefined)

const bottomId = () => (slots.bottom ? `${htmlFor}-bottom` : undefined)

const startTextId = () => (hasStartText() ? `${htmlFor}-start-text` : undefined)

const endTextId = () => (hasEndText() ? `${htmlFor}-end-text` : undefined)
</script>

<template>
  <component
    :is="Root"
    :class="[
      'ui-text-field',
      {
        'ui-auto-fit': autoFit,
        'ui-drop-zone': dropZone,
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
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
      <span v-if="$slots.end || passwordToggle" class="ui-end" :id="endId()">
        <slot name="end"></slot
        ><button
          v-if="passwordToggle"
          class="ui-button ui-round"
          type="button"
          :aria-label="passwordToggleLabel"
          aria-pressed="false"
          command="--toggle-password"
          :commandfor="htmlFor"
        >
          <span
            v-if="$slots['icon-unchecked']"
            aria-hidden="true"
            class="ui-icon-unchecked"
            ><slot name="icon-unchecked"></slot
          ></span>
          <svg
            v-else
            aria-hidden="true"
            class="ui-icon-unchecked"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          ></svg
          ><span
            v-if="$slots['icon-checked']"
            aria-hidden="true"
            class="ui-icon-checked"
            ><slot name="icon-checked"></slot
          ></span>
          <svg
            v-else
            aria-hidden="true"
            class="ui-icon-checked"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          ></svg>
        </button>
      </span>
      <span v-if="$slots.bottom" class="ui-bottom" :id="bottomId()">
        <slot name="bottom"></slot>
      </span>
    </span>
    <span v-if="hasEndText()" class="ui-end-text" :id="endTextId()"
      >{{ endText }}<slot name="end-text"></slot
      ><component
        is="opui-character-count"
        v-if="characterCount"
        aria-hidden="true"
        class="ui-value"
        :label="characterCountLabel"
      ></component
    ></span>
  </component>
</template>
