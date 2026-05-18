<script setup lang="ts">
import type { Props } from './types'

defineProps<Props>()
</script>

<template>

<dt :class="['term', $props.class]">
  <slot></slot>
</dt>
</template>
