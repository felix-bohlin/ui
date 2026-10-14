<script setup lang="ts">
import { computed, inject, provide, reactive, useId } from "vue"
import { TabsKey } from "./context.vue"
import type { Slots, TabsItemProps } from "./types.d.vue"

const { name, open, tabId } = defineProps<TabsItemProps>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const uid = useId()
const parent = inject(TabsKey, undefined)
const groupName = computed(() => name || parent?.groupName || `tabs-${uid}`)
const computedTabId = computed(() => tabId || `tab-${uid}`)

provide(TabsKey, reactive({ groupName, tabId: computedTabId }))
</script>

<template>
  <input
    :checked="open"
    :class="['ui-tab-input', $props.class]"
    :id="computedTabId"
    :name="groupName"
    type="radio"
    v-bind="$attrs"
  />
  <slot></slot>
</template>
