<script setup lang="ts">
import { provide, inject, useId } from 'vue'
import type { TabsItemProps } from './types'

const props = defineProps<TabsItemProps>()

const tabsGroupName = props.name || inject<string>('tabsGroupName') || useId()
provide('tabsGroupName', tabsGroupName)

const computedTabId = props.tabId || useId()
const computedPanelId = props.panelId || useId()

provide('currentTabId', computedTabId)
provide('currentPanelId', computedPanelId)
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
