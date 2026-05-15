<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<dd :class="["description", className]" >
  <slot></slot>
</dd>
</template>
