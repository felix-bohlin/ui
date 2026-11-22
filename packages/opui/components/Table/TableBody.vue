<script setup lang="ts">
import { classAttrs } from "../cx"
import type { TableBodyProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tbody v-bind="classAttrs($props.class)">
    <slot></slot>
  </tbody>
</template>
