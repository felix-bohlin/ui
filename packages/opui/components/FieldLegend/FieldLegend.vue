<script setup lang="ts">
import { computed } from "vue"
import type { Props, Slots } from "./types.vue-props"

const { as: Tag = "legend" } = defineProps<Props>()
defineSlots<Slots>()

const isLegend = computed(() => Tag === "legend")
</script>

<template>
  <component :is="Tag" :class="[{ 'ui-legend': !isLegend }, $props.class]">
    <slot></slot>
  </component>
</template>
