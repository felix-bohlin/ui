<script setup lang="ts">
import type { DescriptionListItemProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-item', $props.class]">
    <slot></slot>
  </div>
</template>
