<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <p class="ui-description">
    <slot></slot>
  </p>
</template>
