<script setup lang="ts">
import { mergeStyle, styleAttrs } from "../style"
import { classAttrs } from "../cx"
import type { TableColumnProps as Props } from "./types.vue-props"

const { width } = defineProps<Props>()
</script>

<template>
  <col
    v-bind="{
      ...styleAttrs(mergeStyle({ width }, {})),
      ...classAttrs($props.class),
    }"
  />
</template>
