<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<table :class="[className, variant]" >
  <slot></slot>
</table>
</template>
