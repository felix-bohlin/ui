<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<div
  :class="[
    "toggle-group",
    size !== "default" && size,
    orientation,
    className,
  ]"
  role={selection === "single" ? "radiogroup" : "group"}
  
>
  <Fragment set:html={html} />
</div>
</template>
