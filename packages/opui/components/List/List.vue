<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<ul
  :class="[
    "list",
    {
      bordered,
      dense,
      gutterless,
    ",
    variant,
    className,
  ]}
  
>
  <slot></slot>
</ul>
</template>
