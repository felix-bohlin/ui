<script setup lang="ts">
import { classAttrs } from "../cx"
import type {
  DescriptionListDescriptionProps as Props,
  Slots,
} from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <dd v-bind="classAttrs([$props.class])">
    <slot></slot>
  </dd>
</template>
