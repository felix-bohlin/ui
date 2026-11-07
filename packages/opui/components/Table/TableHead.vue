<script setup lang="ts">
import { classAttrs } from "../cx"
import type { TableHeadProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <thead v-bind="classAttrs($props.class)">
    <slot></slot>
  </thead>
</template>
