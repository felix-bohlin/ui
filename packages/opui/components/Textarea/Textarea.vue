<script setup lang="ts">
import "../../elements/character-count.js"
import { computed, inject, useId } from "vue"
import { useInputAttrs, vSeed } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { idRefs } from "../id"
import { styleAttrs } from "../style"
import type { Props, Slots } from "./types.vue-props"

const {
  autoFit,
  characterCount,
  characterCountLabel,
  endText,
  error,
  hideLabel,
  id,
  label,
  name,
  size,
  spread,
  startText,
  value,
  variant,
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

const base = computed(() => id || `textarea-${uid}`)

const Root = () => (label || slots.label ? "label" : "div")

const hasStartText = () => Boolean(startText || slots["start-text"])

const hasEndText = () => Boolean(endText || slots["end-text"] || characterCount)

const linked = () => !(label || slots.label)

const startTextId = () =>
  linked() && hasStartText() ? `${base.value}-start-text` : undefined

const endTextId = () =>
  linked() && hasEndText() ? `${base.value}-end-text` : undefined
</script>

<template>
  <component
    :is="Root()"
    :class="[
      'ui-textarea',
      {
        'ui-auto-fit': autoFit,
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    v-bind="styleAttrs($attrs.style)"
  >
    <span
      v-if="label || $slots.label"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></span>
    <span v-if="hasStartText()" class="ui-start-text" :id="startTextId()"
      >{{ startText }}<slot name="start-text"></slot
    ></span>
    <span class="ui-field">
      <textarea
        v-bind="attrs"
        :aria-describedby="
          idRefs(startTextId(), endTextId(), attrs['aria-describedby'])
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="id"
        :name="name ?? field?.name"
        v-seed
        v-model="model"
      ></textarea>
      <span v-if="$slots.start" class="ui-start">
        <slot name="start"></slot>
      </span>
      <span v-if="$slots.end" class="ui-end">
        <slot name="end"></slot>
      </span>
      <span v-if="$slots.top" class="ui-top">
        <slot name="top"></slot>
      </span>
      <span v-if="$slots.bottom" class="ui-bottom">
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
