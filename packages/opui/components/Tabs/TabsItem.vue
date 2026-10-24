<script setup lang="ts">
import { computed, inject, provide, reactive, useId } from "vue"
import { warnGroupedChecked } from "../dev"
import { isSelected } from "../ToggleGroup/selection"
import { TabsKey } from "./context.vue"
import type { Slots, TabsItemProps } from "./types.d.vue"

const { checked = undefined, id, name, value } = defineProps<TabsItemProps>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const uid = useId()
const parent = inject(TabsKey, undefined)
const groupName = computed(() => name || parent?.groupName || `tabs-${uid}`)
const tabId = computed(() => id || `tab-${uid}`)
const grouped = computed(() => isSelected(parent?.value, value))
warnGroupedChecked("TabsItem", grouped.value, checked, "Tabs")
const change = (event: Event) =>
  parent?.change?.(event.currentTarget as HTMLInputElement)

provide(TabsKey, reactive({ groupName, tabId }))
</script>

<template>
  <input
    :checked="grouped ?? checked"
    :class="['ui-input', $props.class]"
    :id="tabId"
    :name="groupName"
    type="radio"
    :value="value"
    @change="change"
    v-bind="$attrs"
  />
  <slot></slot>
</template>
