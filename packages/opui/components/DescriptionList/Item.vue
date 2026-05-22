<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['item', $props.class]">
    <slot></slot>
  </div>
</template>
