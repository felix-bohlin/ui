<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="['button-group', props.color, props.size, props.variant, props.orientation, props.class]"
    role="group"
  >
    <slot></slot>
  </div>
</template>
