<script setup lang="ts">
import StepperItem from "./StepperItem.vue"
import type { Props, Slots } from "./types.vue-props"

const {
  complete,
  completedLabel,
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
      $props.class,
    ]"
  >
    <StepperItem
      v-for="(item, index) in items"
      :key="index"
      :completedLabel="completedLabel"
      :errorLabel="errorLabel"
      v-bind="item"
      :complete="
        item.complete || complete || (current !== undefined && index < current)
      "
      :current="item.current || index === current"
    />
    <slot></slot>
  </ol>
</template>
