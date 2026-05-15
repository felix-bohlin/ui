<script setup lang="ts">
import { provide, inject, useId } from 'vue'
import { TabsGroupNameKey, CurrentTabIdKey, CurrentPanelIdKey, type TabsItemProps } from './types'

const props = defineProps<TabsItemProps>()

const tabsGroupName = props.name || inject(TabsGroupNameKey) || useId()
provide(TabsGroupNameKey, tabsGroupName)

const computedTabId = props.tabId || useId()
const computedPanelId = props.panelId || useId()

provide(CurrentTabIdKey, computedTabId)
provide(CurrentPanelIdKey, computedPanelId)
</script>

<template>
  <input
    :aria-controls="computedPanelId"
    :checked="props.open"
    :class="['tab-input', props.class]"
    :id="computedTabId"
    :name="tabsGroupName"
    type="radio"
  />
  <slot />
</template>
