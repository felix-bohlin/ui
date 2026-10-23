<script setup lang="ts">
import { computed, provide, reactive, useId } from "vue"
import { TabsKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const { name, overflow, variant } = defineProps<Props>()
defineSlots<Slots>()

const uid = useId()
const groupName = computed(() => name || `tabs-${uid}`)
provide(TabsKey, reactive({ groupName }))
</script>

<template>
  <div
    :class="[
      'ui-tabs',
      overflow && overflow !== 'wrap' && `ui-overflow-${overflow}`,
      variant && variant !== 'tonal' && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </div>
</template>
