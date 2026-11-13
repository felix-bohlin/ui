<script setup lang="ts">
import "../../elements/character-count.js"
import "../../elements/text-field.js"
import { computed, inject, useId } from "vue"
import { useInputAttrs, vSeed } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import Button from "../Button/Button.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { idRefs } from "../id"
import { hidePath, showPath } from "./icons"
import { styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  autoFit,
  characterCount,
  characterCountLabel,
  dropZone,
  endText,
  error,
  hideLabel,
  id,
  label,
  name,
  passwordToggle,
  passwordToggleLabel = "Show password",
  size,
  spread,
  startText,
  type = "text",
  value,
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useInputAttrs()

const modelValue = defineModel<string | number>()

const model = computed({
  get: () => modelValue.value ?? value,
  set: (value) => {
    modelValue.value = value
  },
})

const field = inject(FieldGroupKey, undefined)

const uid = useId()

const base = computed(() => id || `text-field-${uid}`)

const hasLabel = () => Boolean(label || slots.label)

const Root = () =>
  passwordToggle ? "opui-text-field" : hasLabel() ? "label" : "div"

const Label = computed(() => (passwordToggle ? "label" : "span"))

const hasStartText = () => Boolean(startText || slots["start-text"])

const hasEndText = () => Boolean(endText || slots["end-text"] || characterCount)

const inputId = computed(() => (passwordToggle ? base.value : id))

const named = () => hasLabel() && !passwordToggle

const labelId = () => (named() ? `${base.value}-label` : undefined)

const startId = () =>
  named() && slots.start ? `${base.value}-start` : undefined

const endId = () => (named() && slots.end ? `${base.value}-end` : undefined)

const topId = () => (slots.top ? `${base.value}-top` : undefined)

const bottomId = () => (slots.bottom ? `${base.value}-bottom` : undefined)

const startTextId = () =>
  hasStartText() ? `${base.value}-start-text` : undefined

const endTextId = () => (hasEndText() ? `${base.value}-end-text` : undefined)
</script>

<template>
  <component
    :is="Root()"
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
    v-bind="styleAttrs($attrs.style)"
  >
    <component
      :is="Label"
      v-if="hasLabel()"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :for="passwordToggle ? inputId : undefined"
      :id="labelId()"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></component>
    <span v-if="hasStartText()" class="ui-start-text" :id="startTextId()"
      >{{ startText }}<slot name="start-text"></slot
    ></span>
    <span class="ui-field">
      <input
        v-bind="attrs"
        :aria-describedby="
          idRefs(
            startTextId(),
            topId(),
            bottomId(),
            endTextId(),
            attrs['aria-describedby'],
          )
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :aria-labelledby="
          named()
            ? idRefs(labelId(), startId(), endId())
            : attrs['aria-labelledby']
        "
        :id="inputId"
        :name="name ?? field?.name"
        :type="type"
        v-seed
        v-model="model"
      />
      <span v-if="$slots.start" class="ui-start" :id="startId()">
        <slot name="start"></slot>
      </span>
      <span v-if="$slots.end || passwordToggle" class="ui-end" :id="endId()">
        <slot name="end"></slot
        ><Button
          v-if="passwordToggle"
          :aria-label="passwordToggleLabel"
          aria-pressed="false"
          command="--toggle-password"
          :commandfor="inputId"
          round
          ><span
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
          >
            <path fill="currentColor" :d="showPath" /></svg
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
          >
            <path fill="currentColor" :d="hidePath" /></svg
        ></Button>
      </span>
      <span v-if="$slots.top" class="ui-top" :id="topId()">
        <slot name="top"></slot>
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
    <slot></slot>
  </component>
</template>
