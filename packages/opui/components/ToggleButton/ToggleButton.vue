<script setup lang="ts">
import { inject, useId } from "vue"
import { ToggleGroupKey } from "../ToggleGroup/types.d.vue"
import type { Props, Slots } from "./types.d.vue"

const { disabled, id, label, name, pressed, size, type, value } =
  defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const group = inject(ToggleGroupKey, undefined)
const finalName = name || group?.name
const finalType = type || group?.type || "checkbox"
const inputId = id || useId()
</script>

<template>
  <label
    :class="[
      'toggle-button',
      { selected: pressed, disabled },
      size,
      $props.class,
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
