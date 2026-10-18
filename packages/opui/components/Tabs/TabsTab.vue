<script setup lang="ts">
import { inject } from "vue"
import { TabsKey } from "./context.vue"
import type { Slots, TabsTabProps } from "./types.d.vue"

const { tabId } = defineProps<TabsTabProps>()
defineSlots<Slots>()

const tabs = inject(TabsKey, undefined)
</script>

<template>
  <label :for="tabId || tabs?.tabId" :class="['ui-tab-label', $props.class]">
    <slot></slot>
  </label>
</template>
