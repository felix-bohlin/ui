<script setup lang="ts">
import { computed, inject, useAttrs } from "vue"
import { warnGroupedChecked } from "../dev"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { ToggleGroupKey } from "../ToggleGroup/context.vue"
import { isSelected } from "../ToggleGroup/selection"
import type { Props, Slots } from "./types.d.vue"

const {
  checked: checkedProp = undefined,
  label,
  name,
  size,
  type,
  value,
} = defineProps<Props>()
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
const grouped = computed(() => isSelected(group?.value, value))
warnGroupedChecked("ToggleButton", grouped.value, checkedProp)
const checked = computed(() => grouped.value ?? checkedProp)
const change = (event: Event) =>
  group?.change(event.currentTarget as HTMLInputElement)
</script>

<template>
  <label
    :class="[
      'ui-toggle-button',
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :style="$attrs.style"
  >
    <input
      :checked="checked"
      :name="finalName"
      :type="finalType"
      :value="value"
      @change="change"
      v-bind="inputAttrs"
    />
    <slot>{{ label }}</slot>
  </label>
</template>
