<script setup lang="ts">
import { inject } from "vue"
import { TabsKey } from "./context.vue"
import type { Slots, TabsLabelProps } from "./types.d.vue"

const { tabId } = defineProps<TabsLabelProps>()
defineSlots<Slots>()

const tabs = inject(TabsKey, undefined)
</script>

<template>
  <label :for="tabId || tabs?.tabId" :class="['ui-label', $props.class]">
    <slot></slot>
  </label>
</template>
