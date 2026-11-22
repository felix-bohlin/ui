<script setup lang="ts">
import type { CardHeaderProps as Props, Slots } from "./types.vue-props"

const { as: Tag = "hgroup" } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component :is="Tag" :class="['ui-header', $props.class]">
    <slot></slot>
  </component>
</template>
