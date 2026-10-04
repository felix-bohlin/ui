<script setup lang="ts">
import { computed, inject, provide, useId } from "vue"
import {
  CurrentPanelIdKey,
  CurrentTabIdKey,
  TabsGroupNameKey,
  type Slots,
  type TabsItemProps,
} from "./types.d.vue"

const { name, open, panelId, tabId } = defineProps<TabsItemProps>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const groupUid = useId()
const tabUid = useId()
const panelUid = useId()
const parentGroupName = inject(TabsGroupNameKey, undefined)
const tabsGroupName = computed(() => name || parentGroupName?.value || groupUid)
provide(TabsGroupNameKey, tabsGroupName)

const computedTabId = tabId || tabUid
const computedPanelId = panelId || panelUid

provide(CurrentTabIdKey, computedTabId)
provide(CurrentPanelIdKey, computedPanelId)
</script>

<template>
  <input
    :aria-controls="computedPanelId"
    :checked="open"
    :class="['ui-tab-input', $props.class]"
    :id="computedTabId"
    :name="tabsGroupName"
    type="radio"
    v-bind="$attrs"
  />
  <slot></slot>
</template>
