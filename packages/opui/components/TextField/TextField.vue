<script setup lang="ts">
import { useId, computed } from "vue"
import type { Props, Slots } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  type: "text",
})
defineSlots<Slots>()
const modelValue = defineModel<string | number>()

const fieldId = props.id || useId()
const startTextValue = computed(() => props.description || props.startText)
</script>

<template>
  <label
    :class="[
      'text-field',
      {
        'auto-fit': props.autoFit,
        filled: props.filled,
        spread: props.spread,
        small: props.small,
      },
      props.class,
    ]"
    :data-invalid="props.critical || undefined"
    v-bind="$attrs"
  >
    <span v-if="props.label || $slots.label" class="label">
      <slot name="label">{{ props.label }}</slot>
    </span>

    <span v-if="startTextValue || $slots.description" class="start-text">
      <slot name="description">{{ startTextValue }}</slot>
    </span>

    <span class="field">
      <input
        :disabled="props.disabled"
        :id="fieldId"
        :inputmode="props.type === 'numeric' ? 'numeric' : undefined"
        :list="props.list"
        :max="props.max"
        :min="props.min"
        :name="props.name"
        :pattern="props.type === 'numeric' ? '[0-9]*' : undefined"
        :placeholder="props.placeholder"
        :required="props.required"
        :step="props.step"
        :type="props.type === 'numeric' ? 'text' : props.type"
        v-model="modelValue"
      />
      <span class="prefix" v-if="$slots.prefix"
        ><slot name="prefix"></slot
      ></span>
      <span class="suffix" v-if="$slots.suffix"
        ><slot name="suffix"></slot
      ></span>
      <span class="header" v-if="$slots.header"
        ><slot name="header"></slot
      ></span>
      <span class="footer" v-if="$slots.footer"
        ><slot name="footer"></slot
      ></span>
    </span>

    <span
      v-if="props.endText || $slots['end-text'] || $slots['supporting-text']"
      class="end-text"
    >
      <slot name="end-text">{{ props.endText }}</slot
      ><slot name="supporting-text"></slot>
    </span>

    <slot></slot>
  </label>
</template>
