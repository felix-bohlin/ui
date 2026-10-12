<script setup lang="ts">
import type { FieldPrefixProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <span :class="['ui-prefix', $props.class]">
    <slot></slot>
  </span>
</template>
