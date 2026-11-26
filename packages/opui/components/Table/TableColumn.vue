<script setup lang="ts">
import { mergeStyle, styleAttrs } from "../style"
import type { TableColumnProps as Props } from "./types.vue-props"

const { width } = defineProps<Props>()
</script>

<template>
  <col v-bind="styleAttrs(mergeStyle({ width }, {}))" />
</template>
