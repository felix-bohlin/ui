<script setup lang="ts">
import { classAttrs } from "../cx"
import type {
  DescriptionListItemProps as Props,
  Slots,
} from "./types.vue-props"

const { total } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div v-bind="classAttrs([total && 'ui-total', $props.class])">
    <slot></slot>
  </div>
</template>
