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
      'ui-text-field',
      {
        'ui-auto-fit': props.autoFit,
        'ui-filled': props.filled,
        'ui-spread': props.spread,
        'ui-small': props.small,
      },
      props.class,
    ]"
    :data-invalid="props.error || undefined"
  >
    <span v-if="props.label || $slots.label" class="ui-label">
      <slot name="label">{{ props.label }}</slot>
    </span>

    <span v-if="startTextValue || $slots.description" class="ui-start-text">
      <slot name="description">{{ startTextValue }}</slot>
    </span>

    <span class="ui-field">
      <input
        :id="fieldId"
        :inputmode="props.type === 'numeric' ? 'numeric' : undefined"
        :pattern="props.type === 'numeric' ? '[0-9]*' : undefined"
        :type="props.type === 'numeric' ? 'text' : props.type"
        v-bind="$attrs"
        v-model="modelValue"
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
      v-if="props.endText || $slots['end-text'] || $slots['supporting-text']"
      class="ui-end-text"
    >
      <slot name="end-text">{{ props.endText }}</slot
      ><slot name="supporting-text"></slot>
    </span>

    <slot></slot>
  </label>
</template>
