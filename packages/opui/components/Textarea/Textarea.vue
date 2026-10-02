<script setup lang="ts">
import { computed, inject, useAttrs, useId } from "vue"
import type { Props, Slots } from "./types.d.vue"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
const slots = defineSlots<Slots>()
const attrs = useAttrs()
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
const endTextId = computed(() => (hasEndText.value ? uid : undefined))
const currentFieldName = inject(CurrentFieldNameKey, undefined)
</script>

<template>
  <label
    :class="[
      'ui-textarea',
      props.size && `ui-${props.size}`,
      {
        'ui-auto-fit': props.autoFit,
        'ui-filled': props.filled,
        'ui-spread': props.spread,
      },
      props.class,
    ]"
    :data-invalid="props.error ? '' : undefined"
  >
    <span v-if="props.label || $slots.label" class="ui-label">
      <slot name="label">{{ props.label }}</slot>
    </span>

    <span v-if="props.description || $slots.description" class="ui-start-text">
      <slot name="description">{{ props.description }}</slot>
    </span>

    <span class="ui-field">
      <textarea
        :aria-describedby="
          [endTextId, $attrs['aria-describedby']].filter(Boolean).join(' ') ||
          undefined
        "
        :aria-invalid="props.error ? 'true' : undefined"
        :id="props.id"
        :name="currentFieldName"
        v-bind="$attrs"
        v-model="model"
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
