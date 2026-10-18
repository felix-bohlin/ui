<script setup lang="ts">
import { computed, inject, useAttrs } from "vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { ToggleGroupKey } from "../ToggleGroup/context.vue"
import { isSelected } from "../ToggleGroup/selection"
import type { Props, Slots } from "./types.d.vue"

const { label, name, pressed, size, type, value } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const inputAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style")),
)

const field = inject(FieldGroupKey, undefined)
const group = inject(ToggleGroupKey, undefined)
const finalName = computed(() => name || group?.groupName || field?.name)
const finalType = computed(() =>
  group?.inputType === "radio" ? "radio" : (type ?? "checkbox"),
)
const checked = computed(
  () => isSelected(group?.value, value || label) ?? pressed,
)
const change = (event: Event) =>
  group?.change(event.currentTarget as HTMLInputElement)
</script>

<template>
  <label
    :class="['ui-toggle-button', size && `ui-${size}`, $props.class]"
    :style="$attrs.style"
  >
    <input
      :checked="checked"
      :name="finalName"
      :type="finalType"
      :value="value || label"
      @change="change"
      v-bind="inputAttrs"
    />
    <slot>{{ label }}</slot>
  </label>
</template>
