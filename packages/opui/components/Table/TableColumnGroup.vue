<script setup lang="ts">
import { classAttrs } from "../cx"
import type { TableColumnGroupProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <colgroup v-bind="classAttrs($props.class)">
    <slot></slot>
  </colgroup>
</template>
