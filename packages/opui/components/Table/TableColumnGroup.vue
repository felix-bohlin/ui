<script setup lang="ts">
import type { TableColumnGroupProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <colgroup :class="$props.class">
    <slot></slot>
  </colgroup>
</template>
