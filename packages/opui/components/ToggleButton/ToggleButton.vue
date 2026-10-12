<script setup lang="ts">
import { computed, inject } from "vue"
import { CurrentFieldNameKey } from "../FieldGroup/types.d.vue"
import { ToggleGroupKey } from "../ToggleGroup/types.d.vue"
import type { Props, Slots } from "./types.d.vue"

const { disabled, id, label, name, pressed, size, type, value } =
  defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const group = inject(ToggleGroupKey, undefined)
const currentFieldName = inject(CurrentFieldNameKey, undefined)
const finalName = computed(() => name || group?.name || currentFieldName)
const finalType = computed(() =>
  group?.type === "radio" ? "radio" : type || group?.type || "checkbox",
)
</script>

<template>
  <label :class="['ui-toggle-button', size && `ui-${size}`, $props.class]">
    <input
      :checked="pressed"
      :disabled="disabled"
      :id="id"
      :name="finalName"
      :type="finalType"
      :value="value || label"
      v-bind="$attrs"
    />
    <slot>{{ label }}</slot>
  </label>
</template>
