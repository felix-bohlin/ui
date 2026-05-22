<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { bordered } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <dl
    :class="[
      'ui-description-list',
      { 'ui-bordered': bordered, 'ui-dotted': bordered === 'dotted' },
      $props.class,
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </dl>
</template>
