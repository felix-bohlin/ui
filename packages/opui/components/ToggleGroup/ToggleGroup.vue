<script setup lang="ts" generic="Multiple extends boolean = false">
import {
  computed,
  type HTMLAttributes,
  provide,
  reactive,
  useAttrs,
  useId,
} from "vue"
import { selectionOf } from "./selection"
import { ToggleGroupKey } from "./context.vue"
import { warnUnnamedGroup } from "../dev"
import type { Props, Slots } from "./types.vue-props"

type Model = Multiple extends true ? string[] : string

const { multiple, name, orientation, overflow, size } = defineProps<
  Props & { multiple?: Multiple }
>()
defineSlots<Slots>()

const attrs = useAttrs() as HTMLAttributes

const model = defineModel<Model>()

const change = (input: HTMLInputElement) => {
  if (model.value !== undefined)
    model.value = selectionOf(input, multiple) as Model
}

const uid = useId()

const groupName = computed(() => name || `toggle-group-${uid}`)

const inputType = computed(() => (multiple ? "checkbox" : "radio"))

warnUnnamedGroup("ToggleGroup", attrs)

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
