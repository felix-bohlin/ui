<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { bordered, dense, gutterless, variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <ul
    :class="[
      'ui-list',
      {
        'ui-bordered': bordered,
        'ui-dense': dense,
        'ui-gutterless': gutterless,
      },
      variant && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </ul>
</template>
