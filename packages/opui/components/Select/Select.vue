<script setup lang="ts">
import { useId } from "vue"
import { FieldLabel, FieldStartText, FieldEndText, FieldControl } from "opui-css/vue"
import type { Props, Slots } from "./types.d.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: "outlined",
})
defineSlots<Slots>()
const modelValue = defineModel<string | number | (string | number)[]>()

const selectId = props.id || useId()
const labelId = useId()
const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'ui-select',
      props.size && `ui-${props.size}`,
      {
        'ui-filled': props.variant === 'filled',
        'ui-spread': props.spread,
      },
      props.class,
    ]"
    :data-invalid="props.error || undefined"
  >
    <FieldLabel v-if="props.label || $slots.label" :label="props.label" :id="labelId">
      <slot name="label"></slot>
    </FieldLabel>

    <FieldStartText v-if="props.description || $slots.description" :text="props.description">
      <slot name="description"></slot>
    </FieldStartText>

    <FieldControl>
      <template #prefix v-if="$slots.prefix"><slot name="prefix"></slot></template>
      <template #suffix v-if="$slots.suffix"><slot name="suffix"></slot></template>
      <template #header v-if="$slots.header"><slot name="header"></slot></template>
      <template #footer v-if="$slots.footer"><slot name="footer"></slot></template>

      <select
        :aria-labelledby="props.label ? labelId : undefined"
        :id="selectId"
        v-bind="$attrs"
        v-model="modelValue"
      >
        <button v-pre>
          <selectedcontent></selectedcontent>
        </button>
        <div :class="['ui-list', { 'ui-dense': props.dense }]">
          <option
            v-for="item in props.items"
            :key="item.value"
            :value="item.value"
          >
            {{ item.text }}
          </option>
          <slot></slot>
        </div>
      </select>
    </FieldControl>

    <FieldEndText v-if="props.endText || $slots['end-text']" :text="props.endText" :id="endTextId">
      <slot name="end-text"></slot>
    </FieldEndText>
  </label>
</template>
