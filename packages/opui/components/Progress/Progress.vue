<script setup lang="ts">
import type { Props } from './types'

const {
  'aria-busy': ariaBusy,
  'aria-describedby': ariaDescribedby,
  'aria-label': ariaLabel,
  class: className,
  id,
  max,
  value,
  variant,
} = defineProps<Props>()
</script>

<template>
  <progress
    :aria-busy="ariaBusy"
    :aria-describedby="ariaDescribedby"
    :aria-label="ariaLabel"
    :class="['progress', className, variant]"
    :id="id"
    :max="max"
    :value="value"
  >
    <slot></slot>
  </progress>
</template>
