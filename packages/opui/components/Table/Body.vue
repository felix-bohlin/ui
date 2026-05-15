<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<tbody >
  <slot></slot>
</tbody>
</template>
