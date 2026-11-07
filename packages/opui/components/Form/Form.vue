<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { as: Tag = "form" } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component :is="Tag" :class="['ui-form', $props.class]">
    <slot></slot>
  </component>
</template>
