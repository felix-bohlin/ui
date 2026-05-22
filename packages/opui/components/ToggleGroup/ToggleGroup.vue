<script setup lang="ts">
import { provide, useId } from "vue"
import { ToggleGroupKey, type Props, type Slots } from "./types.d.vue"

const {
  name,
  orientation,
  selection = "multiple",
  size = "default",
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const groupName = name || useId()
const inputType = selection === "single" ? "radio" : "checkbox"

provide(ToggleGroupKey, { name: groupName, type: inputType })
</script>

<template>
  <div
    :class="[
      'ui-toggle-group',
      size !== 'default' && size && `ui-${size}`,
      orientation && `ui-${orientation}`,
      $props.class,
    ]"
    :role="selection === 'single' ? 'radiogroup' : 'group'"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
