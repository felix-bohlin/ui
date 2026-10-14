<script setup lang="ts">
import {
  computed,
  inject,
  type InputHTMLAttributes,
  useAttrs,
  useId,
} from "vue"
import type { Props, Slots } from "./types.d.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const {
  autoFit,
  description,
  endText,
  error,
  id,
  label,
  size,
  spread,
  startText,
  type = "text",
  variant,
} = defineProps<Props>()
const slots = defineSlots<Slots>()
const attrs = useAttrs() as InputHTMLAttributes
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)
const modelValue = defineModel<string | number>()

const model = computed({
  get: () => modelValue.value ?? (attrs.value as string | number | undefined),
  set: (value) => {
    modelValue.value = value
  },
})

const uid = useId()
const hasEndText = computed(
  () => !!endText || !!slots["end-text"] || !!slots["supporting-text"],
)
const endTextId = computed(() =>
  hasEndText.value ? `end-text-${uid}` : undefined,
)
const fieldName = inject(FieldGroupKey, undefined)
</script>

<template>
  <label
    :class="[
      'ui-text-field',
      size && `ui-${size}`,
      {
        'ui-auto-fit': autoFit,
        'ui-filled': variant === 'filled',
        'ui-spread': spread,
      },
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <span v-if="label || $slots.label" class="ui-label">
      <slot name="label">{{ label }}</slot>
    </span>

    <span
      v-if="startText || description || $slots.description"
      class="ui-start-text"
      >{{ startText }}<slot name="description">{{ description }}</slot></span
    >

    <span class="ui-field">
      <input
        v-bind="inputAttrs"
        v-model="model"
        :aria-describedby="
          [endTextId, attrs['aria-describedby']].filter(Boolean).join(' ') ||
          undefined
        "
        :aria-invalid="error ? 'true' : attrs['aria-invalid']"
        :id="id"
        :inputmode="
          attrs.inputmode ?? (type === 'numeric' ? 'numeric' : undefined)
        "
        :name="attrs.name ?? fieldName"
        :pattern="attrs.pattern ?? (type === 'numeric' ? '[0-9]*' : undefined)"
        :type="type === 'numeric' ? 'text' : type"
      />
      <span class="ui-prefix" v-if="$slots.prefix"
        ><slot name="prefix"></slot
      ></span>
      <span class="ui-suffix" v-if="$slots.suffix"
        ><slot name="suffix"></slot
      ></span>
      <span class="ui-header" v-if="$slots.header"
        ><slot name="header"></slot
      ></span>
      <span class="ui-footer" v-if="$slots.footer"
        ><slot name="footer"></slot
      ></span>
    </span>

    <span
      v-if="endText || $slots['end-text'] || $slots['supporting-text']"
      :id="endTextId"
      class="ui-end-text"
    >
      <slot name="end-text">{{ endText }}</slot
      ><slot name="supporting-text"></slot>
    </span>

    <slot></slot>
  </label>
</template>
