<script setup lang="ts">
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"
import type { ClassicSelectProps, Slots } from "./types.d.vue"
import { inject, useId } from "vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ClassicSelectProps>(), {
  items: () => [],
  variant: "outlined",
})
defineSlots<Slots>()
const modelValue = defineModel<string | number | (string | number)[]>()

const fieldName = inject(CurrentFieldNameKey, undefined)

const selectId = props.id || useId()
const endTextId = useId()
</script>

<template>
  <label
    :class="[
      'ui-select',
      props.size && `ui-${props.size}`,
      {
        'ui-filled': props.variant === 'filled',
      },
      props.class,
    ]"
    :data-invalid="props.error ? '' : undefined"
  >
    <span v-if="props.label" class="ui-label">{{ props.label }}</span>
    <span class="ui-field">
      <select
        :aria-describedby="props.endText ? endTextId : undefined"
        :aria-invalid="props.error ? 'true' : undefined"
        :id="selectId"
        :name="fieldName"
        v-bind="$attrs"
        v-model="modelValue"
      >
        <option
          v-for="item in props.items"
          :key="item.value"
          :value="item.value"
        >
          {{ item.text }}
        </option>
        <slot></slot>
      </select>
    </span>
    <span v-if="props.endText" :id="endTextId" class="ui-end-text">{{
      props.endText
    }}</span>
  </label>
</template>
