<script setup lang="ts">
import { type HTMLAttributes, useAttrs } from "vue"
import { defined } from "../attrs"
import type { Props } from "./types.vue-props"

const { line, shape = "rounded" } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes
</script>

<template>
  <span
    aria-hidden="true"
    :class="[
      'ui-skeleton',
      { 'ui-line': line },
      shape !== 'rounded' && `ui-${shape}`,
      $props.class,
    ]"
    v-bind="defined(attrs)"
  ></span>
</template>
