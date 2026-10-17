<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-card', variant && `ui-${variant}`, $props.class]">
    <slot></slot>
  </div>
</template>
