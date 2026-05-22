<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dt :class="['term', $props.class]">
    <slot></slot>
  </dt>
</template>
