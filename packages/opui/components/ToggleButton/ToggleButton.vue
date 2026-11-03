<script setup lang="ts">
import { computed, inject, watchEffect } from "vue"
import { useInputAttrs } from "../vue"
import { FieldGroupKey } from "../FieldGroup/context.vue"
import { ToggleGroupKey } from "../ToggleGroup/context.vue"
import { isSelected } from "../ToggleGroup/selection"
import { warnGroupedChecked } from "../dev"
import type { Props, Slots } from "./types.vue-props"

const {
  checked = undefined,
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

const attrs = useInputAttrs()

const model = defineModel<boolean | undefined>({
  default: undefined,
})

const field = inject(FieldGroupKey, undefined)

const group = inject(ToggleGroupKey, undefined)

const finalName = computed(() => name || group?.groupName || field?.name)

const finalType = computed(() =>
  group?.inputType === "radio" ? "radio" : (type ?? "checkbox"),
)

const grouped = computed(() => isSelected(group?.value, value))

watchEffect(() =>
  warnGroupedChecked(
    "ToggleButton",
    grouped.value,
    checked ?? model.value,
    "ToggleGroup",
  ),
)

const change = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement
  if (grouped.value === undefined) model.value = input.checked
  group?.change?.(input)
}
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
      :checked="grouped ?? model ?? checked"
      :name="finalName"
      :type="finalType"
      :value="value"
      v-bind="attrs"
      @change="change"
    />{{ " " }}<slot v-if="$slots.default"></slot
    ><template v-else>{{ label }}</template>
  </label>
</template>
