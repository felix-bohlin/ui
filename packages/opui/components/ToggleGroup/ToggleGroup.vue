<script setup lang="ts">
import { computed, provide, reactive, useId } from "vue"
import { ToggleGroupKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const {
  name,
  orientation,
  scrollable,
  selection = "multiple",
  shrink,
  size,
} = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const uid = useId()
const groupName = computed(() => name || `toggle-group-${uid}`)
const inputType = computed(() =>
  selection === "single" ? "radio" : "checkbox",
)

provide(ToggleGroupKey, reactive({ groupName, inputType }))
</script>

<template>
  <div
    :class="[
      'ui-toggle-group',
      size && `ui-${size}`,
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
