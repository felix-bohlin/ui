<script setup lang="ts">
import { computed, provide, reactive, useId } from "vue"
import { ToggleGroupKey } from "./context.vue"
import { selectionOf } from "./selection"
import type { Props, Slots } from "./types.d.vue"

const { multiple, name, orientation, overflow, size } = defineProps<Props>()
defineSlots<Slots>()
const model = defineModel<string | string[]>()

const uid = useId()
const groupName = computed(() => name || `toggle-group-${uid}`)
const inputType = computed(() => (multiple ? "checkbox" : "radio"))
const change = (input: HTMLInputElement) => {
  if (model.value !== undefined) model.value = selectionOf(input, multiple)
}

provide(
  ToggleGroupKey,
  reactive({ change, groupName, inputType, value: model }),
)
</script>

<template>
  <div
    :class="[
      'ui-toggle-group',
      {
        'ui-vertical': orientation === 'vertical',
      },
      overflow && overflow !== 'wrap' && `ui-overflow-${overflow}`,
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :role="multiple ? 'group' : 'radiogroup'"
  >
    <slot></slot>
  </div>
</template>
