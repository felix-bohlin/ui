<script setup lang="ts">
import { computed } from "vue"
import type { ColumnProps as Props } from "./types.d.vue"

const { width } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const colStyle = computed(() => (width ? { width } : undefined))
</script>

<template>
  <col :class="$props.class" :style="colStyle" v-bind="$attrs" />
</template>
