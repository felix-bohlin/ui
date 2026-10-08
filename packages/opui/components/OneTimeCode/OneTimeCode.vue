<script setup lang="ts">
import { computed, useAttrs, useId } from "vue"
import type { Props, Slots } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  length: 6,
})
const slots = defineSlots<Slots>()
const attrs = useAttrs()
const inputAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(
      ([key]) => key !== "aria-describedby" && key !== "style",
    ),
  ),
)
const modelValue = defineModel<string>()

const model = computed({
  get: () => modelValue.value ?? (attrs.value as string | undefined),
  set: (value) => {
    modelValue.value = value
  },
})

const uid = useId()
const endTextId = computed(() =>
  props.endText || slots["end-text"] ? uid : undefined,
)
const pattern = computed(() =>
  props.alphanumeric
    ? `[A-Za-z0-9]{${props.length}}`
    : `[0-9]{${props.length}}`,
)
</script>

<template>
  <label
    :class="[
      'ui-text-field',
      'ui-one-time-code',
      {
        'ui-grouped': props.grouped,
      },
      props.size && `ui-${props.size}`,
      props.class,
    ]"
    :style="$attrs.style"
  >
    <span v-if="props.label || $slots.label" class="ui-label">
      <slot name="label">{{ props.label }}</slot>
    </span>

    <span class="ui-field">
      <input
        :autocapitalize="props.alphanumeric ? 'characters' : undefined"
        autocomplete="one-time-code"
        :inputmode="props.alphanumeric ? undefined : 'numeric'"
        :pattern="pattern"
        :spellcheck="props.alphanumeric ? 'false' : undefined"
        v-bind="inputAttrs"
        :aria-describedby="
          [endTextId, $attrs['aria-describedby']].filter(Boolean).join(' ') ||
          undefined
        "
        :aria-invalid="props.error ? 'true' : undefined"
        :id="props.id"
        :maxlength="props.length"
        type="text"
        v-model="model"
      />
    </span>

    <span
      v-if="props.endText || $slots['end-text']"
      :id="endTextId"
      class="ui-end-text"
    >
      <slot name="end-text">{{ props.endText }}</slot>
    </span>
  </label>
</template>
