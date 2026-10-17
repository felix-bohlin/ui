<script setup lang="ts">
import { computed, inject } from "vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { ToggleGroupKey } from "../ToggleGroup/context.vue"
import { isSelected } from "../ToggleGroup/selection"
import type { Props, Slots } from "./types.d.vue"

const { disabled, id, label, name, pressed, size, type, value } =
  defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const field = inject(FieldGroupKey, undefined)
const group = inject(ToggleGroupKey, undefined)
const finalName = computed(() => name || group?.groupName || field?.value)
const finalType = computed(() =>
  group?.inputType === "radio"
    ? "radio"
    : type || group?.inputType || "checkbox",
)
const checked = computed(
  () => isSelected(group?.value, value || label) ?? pressed,
)
const change = (event: Event) =>
  group?.change(event.currentTarget as HTMLInputElement)
</script>

<template>
  <label :class="['ui-toggle-button', size && `ui-${size}`, $props.class]">
    <input
      :checked="checked"
      :disabled="disabled"
      :id="id"
      :name="finalName"
      :type="finalType"
      :value="value || label"
      @change="change"
      v-bind="$attrs"
    />
    <slot>{{ label }}</slot>
  </label>
</template>
