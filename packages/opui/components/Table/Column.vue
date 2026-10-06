<script setup lang="ts">
import { computed } from "vue"
import type { ColumnProps } from "./types"

const { width } = defineProps<ColumnProps>()

defineOptions({
  inheritAttrs: false,
})

const colStyle = computed(() =>
  width ? (width.includes(":") ? width : `width: ${width}`) : undefined,
)
</script>

<template>
  <col :style="colStyle" v-bind="$attrs" />
</template>
