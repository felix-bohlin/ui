<script setup lang="ts">
import { provide, useId } from "vue"
import { ToggleGroupKey, type Props, type Slots } from "./types.d.vue"

const {
  name,
  orientation,
  scrollable,
  selection = "multiple",
  shrink,
  size = "default",
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const uid = useId()
const groupName = name || uid
const inputType = selection === "single" ? "radio" : "checkbox"

provide(ToggleGroupKey, { name: groupName, type: inputType })
</script>

<template>
  <div
    :class="[
      'ui-toggle-group',
      size !== 'default' && size && `ui-${size}`,
      orientation && `ui-${orientation}`,
      { 'ui-scrollable': scrollable, 'ui-shrink': shrink },
      $props.class,
    ]"
    :role="selection === 'single' ? 'radiogroup' : 'group'"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
