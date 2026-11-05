<script setup lang="ts">
import { classAttrs } from "../cx"
import type { TableRowProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <tr v-bind="classAttrs($props.class)">
    <slot></slot>
  </tr>
</template>
