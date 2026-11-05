<script setup lang="ts">
import { mergeStyle } from "../style"
import { classAttrs } from "../cx"
import type { TableColumnProps as Props } from "./types.vue-props"

const { width } = defineProps<Props>()
</script>

<template>
  <col :style="mergeStyle({ width }, {})" v-bind="classAttrs($props.class)" />
</template>
