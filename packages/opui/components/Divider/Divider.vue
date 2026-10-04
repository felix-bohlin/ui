<script setup lang="ts">
import { computed } from "vue"
import type { Props } from "./types.d.vue"

const { variant } = defineProps<Props>()
const variantClass = computed(() => (variant ? `border-${variant}` : ""))
</script>

<template>
  <hr
    :class="['ui-divider', variantClass && `ui-${variantClass}`, $props.class]"
  />
</template>
