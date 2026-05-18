<script setup lang="ts">
import { provide, useId } from 'vue'
import { ToggleGroupKey, type Props } from './types'

const {
  class: className,
  name,
  orientation,
  selection = 'multiple',
  size = 'default',
} = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const groupName = name || useId()
const inputType = selection === 'single' ? 'radio' : 'checkbox'

provide(ToggleGroupKey, { name: groupName, type: inputType })
</script>

<template>
  <div
    :class="[
      'toggle-group',
      size !== 'default' && size,
      orientation,
      className,
    ]"
    :role="selection === 'single' ? 'radiogroup' : 'group'"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>
