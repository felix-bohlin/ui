<script setup lang="ts">
import type { CalloutTitleProps as Props, Slots } from "./types.d.vue"

const { level = 3 } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component :is="`h${level}`" :class="['ui-title', $props.class]">
    <slot></slot>
  </component>
</template>
