<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { bordered, dense, divided, gutterless, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <ul
    :class="[
      'ui-list',
      {
        'ui-bordered': bordered,
        'ui-dense': dense,
        'ui-divided': divided,
        'ui-gutterless': gutterless,
      },
      variant && `ui-${variant}`,
      $props.class,
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </ul>
</template>
