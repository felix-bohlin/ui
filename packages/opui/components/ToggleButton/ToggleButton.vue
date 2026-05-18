<script setup lang="ts">
import { inject, useId } from 'vue'
import type { Props } from './types'
import { ToggleGroupKey } from '../ToggleGroup/types'

const {
  class: className,
  disabled,
  id,
  label,
  name,
  pressed,
  size,
  type,
  value,
} = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const group = inject(ToggleGroupKey, undefined)
const finalName = name || group?.name
const finalType = type || group?.type || 'checkbox'
const inputId = id || useId()
</script>

<template>
  <label
    :class="[
      'toggle-button',
      { selected: pressed, disabled },
      size,
      className,
    ]"
  >
    <input
      :aria-pressed="finalType === 'checkbox' ? pressed : undefined"
      :checked="pressed"
      :disabled="disabled"
      :id="inputId"
      :name="finalName"
      :type="finalType"
      :value="value || label"
      v-bind="$attrs"
    />
    <slot></slot>
  </label>
</template>
