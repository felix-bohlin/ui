<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const {
  as: Tag = "ul",
  bordered,
  dense,
  flush,
  role,
  variant,
} = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-list',
      { 'ui-bordered': bordered, 'ui-dense': dense, 'ui-flush': flush },
      variant && variant !== 'filled' && `ui-${variant}`,
    ]"
    :role="role ?? 'list'"
  >
    <slot></slot>
  </component>
</template>
