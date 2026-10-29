<script setup lang="ts">
import type {
  DescriptionListItemProps as Props,
  Slots,
} from "./types.vue-props"

const { total } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="[total && 'ui-total', $props.class]">
    <slot></slot>
  </div>
</template>
