<script setup lang="ts" generic="Multiple extends boolean = false">
import { computed, provide, reactive, useId } from "vue"
import { selectionOf } from "./selection"
import { ToggleGroupKey } from "./context.vue"
import { createId } from "../id"
import type { Props, Slots } from "./types.vue-props"

type Model = Multiple extends true ? string[] : string

const { multiple, name, orientation, overflow, size } = defineProps<
  Props & { multiple?: Multiple }
>()
defineSlots<Slots>()

const model = defineModel<Model>()

const change = (input: HTMLInputElement) => {
  if (model.value !== undefined)
    model.value = selectionOf(input, multiple) as Model
}

const uid = useId()

const idOf = computed(() => createId(uid))

const groupName = computed(() => name || idOf.value("toggle-group"))

const inputType = computed(() => (multiple ? "checkbox" : "radio"))

provide(
  ToggleGroupKey,
  reactive({ change, groupName, inputType, value: model }),
)
</script>

<template>
  <div
    :class="[
      'ui-toggle-group',
      { 'ui-vertical': orientation === 'vertical' },
      overflow && overflow !== 'wrap' && `ui-overflow-${overflow}`,
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
    :role="multiple ? 'group' : 'radiogroup'"
  >
    <slot></slot>
  </div>
</template>
