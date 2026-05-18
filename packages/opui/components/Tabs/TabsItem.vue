<script setup lang="ts">
import { inject, provide, useId } from 'vue'
import {
  CurrentPanelIdKey,
  CurrentTabIdKey,
  TabsGroupNameKey,
  type TabsItemProps,
} from './types'

const {
  name,
  open,
  panelId,
  tabId,
} = defineProps<TabsItemProps>()

defineOptions({
  inheritAttrs: false,
})

const tabsGroupName = name || inject(TabsGroupNameKey, undefined) || useId()
provide(TabsGroupNameKey, tabsGroupName)

const computedTabId = tabId || useId()
const computedPanelId = panelId || useId()

provide(CurrentTabIdKey, computedTabId)
provide(CurrentPanelIdKey, computedPanelId)
</script>

<template>
  <input
    :aria-controls="computedPanelId"
    :checked="open"
    :class="['tab-input', $props.class]"
    :id="computedTabId"
    :name="tabsGroupName"
    type="radio"
    v-bind="$attrs"
  />
  <slot></slot>
</template>
