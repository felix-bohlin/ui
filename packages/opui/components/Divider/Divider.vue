<script setup lang="ts">
import type { Props } from "./types.d.vue"

const { variant } = defineProps<Props>()
const variantClass = variant ? `border-${variant}` : ""
</script>

<template>
  <hr
    :class="['ui-divider', $props.class, variantClass && `ui-${variantClass}`]"
  />
</template>
