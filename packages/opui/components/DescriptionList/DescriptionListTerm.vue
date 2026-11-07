<script setup lang="ts">
import { classAttrs } from "../cx"
import type {
  DescriptionListTermProps as Props,
  Slots,
} from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dt v-bind="classAttrs([$props.class])">
    <slot></slot>
  </dt>
</template>
