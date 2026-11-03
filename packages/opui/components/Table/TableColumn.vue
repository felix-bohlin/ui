<script setup lang="ts">
import { mergeStyle } from "../style"
import type { TableColumnProps as Props } from "./types.vue-props"

const { width } = defineProps<Props>()
</script>

<template>
  <col :style="mergeStyle({ width }, {})" :class="$props.class" />
</template>
