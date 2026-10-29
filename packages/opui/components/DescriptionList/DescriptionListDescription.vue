<script setup lang="ts">
import type {
  DescriptionListDescriptionProps as Props,
  Slots,
} from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dd :class="[$props.class]">
    <slot></slot>
  </dd>
</template>
