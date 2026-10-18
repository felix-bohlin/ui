<script setup lang="ts">
import { computed, inject, type TextareaHTMLAttributes, useAttrs } from "vue"
import type { Props, Slots } from "./types.d.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
defineSlots<Slots>()
const attrs = useAttrs() as TextareaHTMLAttributes
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)
const modelValue = defineModel<string>()

const model = computed({
  get: () => modelValue.value ?? props.value,
  set: (value) => {
    modelValue.value = value
  },
})

const field = inject(FieldGroupKey, undefined)
</script>

<template>
  <label
    :class="[
      'ui-textarea',
      props.size && `ui-${props.size}`,
      {
        'ui-auto-fit': props.autoFit,
        'ui-filled': variant === 'filled',
        'ui-spread': props.spread,
      },
      props.class,
    ]"
    :style="$attrs.style"
  >
    <span v-if="props.label || $slots.label" class="ui-label">
      <slot name="label">{{ props.label }}</slot>
    </span>

    <span v-if="props.startText || $slots['start-text']" class="ui-start-text">
      <slot name="start-text">{{ props.startText }}</slot>
    </span>

    <span class="ui-field">
      <textarea
        v-bind="inputAttrs"
        v-model="model"
        :aria-invalid="props.error ? 'true' : attrs['aria-invalid']"
        :id="props.id"
        :name="attrs.name ?? field?.name"
      ></textarea>
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

    <span v-if="props.endText || $slots['end-text']" class="ui-end-text">
      <slot name="end-text">{{ props.endText }}</slot>
    </span>

    <slot></slot>
  </label>
</template>
