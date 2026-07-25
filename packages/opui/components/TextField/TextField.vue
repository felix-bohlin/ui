<script setup lang="ts">
import { useId, computed } from "vue"
import { FieldLabel, FieldStartText, FieldEndText, FieldControl } from "opui-css/vue"
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
    <FieldLabel v-if="props.label || $slots.label" :label="props.label">
      <slot name="label" v-if="$slots.label"></slot>
    </FieldLabel>

    <FieldStartText v-if="startTextValue || $slots.description" :text="startTextValue">
      <slot name="description" v-if="$slots.description"></slot>
    </FieldStartText>

    <FieldControl>
      <template #prefix v-if="$slots.prefix"><slot name="prefix"></slot></template>
      <template #suffix v-if="$slots.suffix"><slot name="suffix"></slot></template>
      <template #header v-if="$slots.header"><slot name="header"></slot></template>
      <template #footer v-if="$slots.footer"><slot name="footer"></slot></template>

      <input
        :id="fieldId"
        :inputmode="props.type === 'numeric' ? 'numeric' : undefined"
        :pattern="props.type === 'numeric' ? '[0-9]*' : undefined"
        :type="props.type === 'numeric' ? 'text' : props.type"
        v-bind="$attrs"
        v-model="modelValue"
      />
    </FieldControl>

    <FieldEndText v-if="props.endText || $slots['end-text'] || $slots['supporting-text']" :text="props.endText">
      <slot name="end-text" v-if="$slots['end-text']"></slot>
      <slot name="supporting-text" v-if="$slots['supporting-text']"></slot>
    </FieldEndText>

    <slot></slot>
  </label>
</template>
