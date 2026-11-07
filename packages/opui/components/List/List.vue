<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { bordered, dense, flush, variant } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <ul
    :class="[
      'ui-list',
      { 'ui-bordered': bordered, 'ui-dense': dense, 'ui-flush': flush },
      variant && variant !== 'filled' && `ui-${variant}`,
      $props.class,
    ]"
    role="list"
  >
    <slot></slot>
  </ul>
</template>
