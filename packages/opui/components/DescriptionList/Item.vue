<script setup lang="ts">
import type { Props } from './types'

defineProps<Props>()
</script>

<template>

<div :class="['item', $props.class]">
  <slot></slot>
</div>
</template>
