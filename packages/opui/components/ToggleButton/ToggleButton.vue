<script setup lang="ts">
import { computed, inject, watchEffect } from "vue"
import { useBound, useInputAttrs } from "../vue"
import { ToggleGroupKey } from "../ToggleGroup/context.vue"
import { isSelected } from "../ToggleGroup/selection"
import { DEV, warnGroupedChecked } from "../dev"
import { defined } from "../attrs"
import { styleAttrs } from "../style"
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

const bound = useBound()

const group = inject(ToggleGroupKey, undefined)

const finalName = computed(() => name || group?.groupName)

const finalType = computed(() =>
  group?.inputType === "radio" ? "radio" : (type ?? "checkbox"),
)

const grouped = computed(() => isSelected(group?.value, value))

if (DEV)
  watchEffect(() =>
    warnGroupedChecked(
      "ToggleButton",
      grouped.value,
      checked ?? model.value,
      "ToggleGroup",
    ),
  )

const target = computed({
  get: () => (group?.bound ? group.value : model.value),
  set: (next) => {
    if (group?.bound) group.value = next as typeof group.value
    else model.value = next as typeof model.value
  },
})
</script>

<template>
  <label
    :class="[
      'ui-toggle-button',
      size && size !== 'medium' && `ui-${size}`,
      $attrs.class,
    ]"
    v-bind="styleAttrs($attrs.style)"
  >
    <input
      v-if="group?.bound || bound"
      :name="finalName"
      :type="finalType"
      :value="value"
      v-bind="attrs"
      v-model="target"
    />
    <input
      v-else
      :name="finalName"
      :type="finalType"
      :value="value"
      v-bind="{
        ...defined({ checked: grouped ?? model ?? checked }),
        ...attrs,
      }"
    />{{ " " }}<slot v-if="$slots.default"></slot>
    <template v-else>{{ label }}</template>
  </label>
</template>
