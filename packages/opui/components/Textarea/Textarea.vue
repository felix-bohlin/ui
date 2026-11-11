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

const named = () => Boolean(label || slots.label)

const Root = () => (named() ? "label" : "div")

const hasStartText = () => Boolean(startText || slots["start-text"])

const hasEndText = () => Boolean(endText || slots["end-text"] || characterCount)

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
      v-if="named()"
      :class="[hideLabel ? 'ui-sr-only' : 'ui-label']"
      :id="labelId()"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></span>
    <template v-else
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"
    /></template>
    <span v-if="hasStartText()" class="ui-start-text" :id="startTextId()"
      >{{ startText }}<slot name="start-text"></slot
    ></span>
    <span class="ui-field">
      <textarea
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
        :id="id"
        :name="name ?? field?.name"
        v-seed
        v-model="model"
      ></textarea>
      <span v-if="$slots.start" class="ui-start" :id="startId()">
        <slot name="start"></slot>
      </span>
      <span v-if="$slots.end" class="ui-end" :id="endId()">
        <slot name="end"></slot>
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
