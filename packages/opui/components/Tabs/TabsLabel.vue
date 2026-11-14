<script setup lang="ts">
import { inject } from "vue"
import { TabsKey } from "./context.vue"
import type { TabsLabelProps as Props, Slots } from "./types.vue-props"

const { for: htmlFor } = defineProps<Props>()
defineSlots<Slots>()

const tabs = inject(TabsKey, undefined)
</script>

<template>
  <label :for="htmlFor || tabs?.tabId" :class="['ui-label', $props.class]">
    <slot></slot>
  </label>
</template>
