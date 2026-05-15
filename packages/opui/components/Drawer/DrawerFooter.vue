<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<div :class="["footer", className]" >
  <slot></slot>
</div>
</template>
