<script setup lang="ts">
import { computed } from "vue"
import type { Props, Slots } from "./types.vue-props"

const { as = "legend" } = defineProps<Props>()
defineSlots<Slots>()

const isLegend = computed(() => as === "legend")
</script>

<template>
  <component :is="as" :class="[{ 'ui-legend': !isLegend }, $props.class]"
    ><slot></slot
  ></component>
</template>
