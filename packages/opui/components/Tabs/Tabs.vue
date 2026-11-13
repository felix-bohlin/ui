<script setup lang="ts">
import {
  computed,
  type HTMLAttributes,
  provide,
  reactive,
  useAttrs,
  useId,
} from "vue"
import { TabsKey } from "./context.vue"
import { warnUnnamedGroup } from "../dev"
import type { Props, Slots } from "./types.vue-props"

const { name, orientation, overflow, role, variant } = defineProps<Props>()
defineSlots<Slots>()

const attrs = useAttrs() as HTMLAttributes

const model = defineModel<string>()

const change = (input: HTMLInputElement) => {
  if (model.value !== undefined) model.value = input.value
}

const uid = useId()

const groupName = computed(() => name || `tabs-${uid}`)

if (role === "radiogroup") warnUnnamedGroup("Tabs", attrs)

provide(TabsKey, reactive({ change, groupName, value: model }))
</script>

<template>
  <div
    :class="[
      'ui-tabs',
      orientation === 'vertical' && 'ui-vertical',
      overflow && overflow !== 'scroll' && `ui-overflow-${overflow}`,
      variant && variant !== 'tonal' && `ui-${variant}`,
      $props.class,
    ]"
    :role="role"
  >
    <slot></slot>
  </div>
</template>
