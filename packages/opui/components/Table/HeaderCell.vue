<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<th >
  <slot></slot>
</th>
</template>
