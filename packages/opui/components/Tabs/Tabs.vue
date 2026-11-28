<script setup lang="ts">
import {
  computed,
  type HTMLAttributes,
  provide,
  reactive,
  useAttrs,
  useId,
} from "vue"
import { useBound } from "../vue"
import { TabsKey } from "./context.vue"
import { DEV, warnUnnamedGroup } from "../dev"
import type { Props, Slots } from "./types.vue-props"

const { name, orientation, overflow, role, variant } = defineProps<Props>()
defineSlots<Slots>()

const attrs = useAttrs() as HTMLAttributes

const model = defineModel<string>()

const bound = useBound()

const uid = useId()

const groupName = computed(() => name || `tabs-${uid}`)

if (DEV && role === "radiogroup") warnUnnamedGroup("Tabs", attrs)

provide(TabsKey, reactive({ bound, groupName, value: model }))
</script>

<template>
  <div
    :class="[
      'ui-tabs',
      orientation === 'vertical' && 'ui-vertical',
      overflow && overflow !== 'scroll' && `ui-overflow-${overflow}`,
      variant && variant !== 'tonal' && `ui-${variant}`,
    ]"
    :role="role"
  >
    <slot></slot>
  </div>
</template>
