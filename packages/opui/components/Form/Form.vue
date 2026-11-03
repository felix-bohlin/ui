<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { as = "form" } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component :is="as" :class="['ui-form', $props.class]">
    <slot></slot>
  </component>
</template>
