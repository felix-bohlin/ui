<script setup lang="ts">
import StepperItem from "./StepperItem.vue"
import type { Props, Slots } from "./types.vue-props"

const {
  complete,
  completeLabel,
  current,
  errorLabel,
  items,
  orientation,
  size,
} = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <ol
    :class="[
      'ui-stepper',
      orientation && orientation !== 'auto' && `ui-${orientation}`,
      size && size !== 'medium' && `ui-${size}`,
    ]"
  >
    <StepperItem
      v-for="(item, index) in items"
      :key="index"
      :completeLabel="completeLabel"
      :errorLabel="errorLabel"
      v-bind="item"
      :current="item.current || index === current"
      :state="
        item.state ??
        (complete || (current !== undefined && index < current)
          ? 'complete'
          : undefined)
      "
    />{{
      " "
    }}<slot></slot>
  </ol>
</template>
