<script setup lang="ts">
import { classAttrs } from "../cx"
import type { TableFootProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tfoot v-bind="classAttrs($props.class)">
    <slot></slot>
  </tfoot>
</template>
