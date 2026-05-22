<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dd :class="['description', $props.class]">
    <slot></slot>
  </dd>
</template>
