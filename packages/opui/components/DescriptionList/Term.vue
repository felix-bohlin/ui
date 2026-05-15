<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<dt :class="["term", className]" >
  <slot></slot>
</dt>
</template>
