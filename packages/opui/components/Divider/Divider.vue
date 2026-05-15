<script setup lang="ts">
import type { Props } from './types'

const { class: className, variant } = defineProps<Props>()
const variantClass = variant ? `border-${variant}` : ''
</script>

<template>
  <hr :class="['divider', className, variantClass]" />
</template>
