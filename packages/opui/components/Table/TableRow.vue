<script setup lang="ts">
import type { SectionProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tr :class="$props.class">
    <slot></slot>
  </tr>
</template>
