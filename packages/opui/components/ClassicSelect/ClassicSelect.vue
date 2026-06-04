<script setup lang="ts">
import type { ClassicSelectProps, Slots } from "./types.d.vue"
import { useId } from "vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ClassicSelectProps>(), {
  items: () => [],
  variant: "outlined",
})
defineSlots<Slots>()
const modelValue = defineModel<string | number | (string | number)[]>()

const selectId = props.id || useId()
const labelId = useId()
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
    :data-invalid="props.error || undefined"
  >
    <span v-if="props.label" class="ui-label" :id="labelId">{{
      props.label
    }}</span>
    <span class="ui-field">
      <select
        :aria-labelledby="props.label ? labelId : undefined"
        :id="selectId"
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
    <span v-if="props.endText" class="ui-end-text">{{ props.endText }}</span>
  </label>
</template>
