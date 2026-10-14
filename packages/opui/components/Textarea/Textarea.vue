<script setup lang="ts">
import {
  computed,
  inject,
  type TextareaHTMLAttributes,
  useAttrs,
  useId,
} from "vue"
import type { Props, Slots } from "./types.d.vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const slots = defineSlots<Slots>()
const attrs = useAttrs() as TextareaHTMLAttributes
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)
const modelValue = defineModel<string>()

const model = computed({
  get: () => modelValue.value ?? (attrs.value as string | undefined),
  set: (value) => {
    modelValue.value = value
  },
})

const uid = useId()
const hasEndText = computed(
  () => !!props.endText || !!slots["end-text"] || !!slots["supporting-text"],
)
const endTextId = computed(() =>
  hasEndText.value ? `end-text-${uid}` : undefined,
)
const fieldName = inject(FieldGroupKey, undefined)
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

    <span v-if="props.description || $slots.description" class="ui-start-text">
      <slot name="description">{{ props.description }}</slot>
    </span>

    <span class="ui-field">
      <textarea
        v-bind="inputAttrs"
        v-model="model"
        :aria-describedby="
          [endTextId, attrs['aria-describedby']].filter(Boolean).join(' ') ||
          undefined
        "
        :aria-invalid="props.error ? 'true' : attrs['aria-invalid']"
        :id="props.id"
        :name="attrs.name ?? fieldName"
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

    <span
      v-if="props.endText || $slots['end-text'] || $slots['supporting-text']"
      :id="endTextId"
      class="ui-end-text"
    >
      <slot name="end-text">{{ props.endText }}</slot
      ><slot name="supporting-text"></slot>
    </span>

    <slot></slot>
  </label>
</template>
