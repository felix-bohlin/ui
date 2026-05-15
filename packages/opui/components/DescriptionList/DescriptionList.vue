<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<dl
  :class="[
    "description-list",
    { bordered: bordered, dotted: bordered === "dotted" ",
    className,
  ]}
  
>
  <slot></slot>
</dl>
</template>
