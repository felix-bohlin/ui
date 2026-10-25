<script setup lang="ts">
import { computed } from "vue"
import type { TableColumnProps as Props } from "./types.vue-props"

const { width } = defineProps<Props>()

const colStyle = computed(() => (width ? { width } : undefined))
</script>

<template>
  <col :class="$props.class" :style="colStyle" />
</template>
