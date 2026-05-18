<script setup lang="ts">
import type { Props } from './types'

defineProps<Props>()
</script>

<template>

<dd :class="['description', $props.class]">
  <slot></slot>
</dd>
</template>
