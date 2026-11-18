<script setup lang="ts">
import { classAttrs } from "../cx"
import type { TableCaptionProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <caption v-bind="classAttrs($props.class)">
    <slot></slot>
  </caption>
</template>
