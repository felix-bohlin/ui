<script setup lang="ts">
import type { Props } from './types'

const { variant } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <table :class="[variant, $props.class]" v-bind="$attrs">
    <slot></slot>
  </table>
</template>
