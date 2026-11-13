<script setup lang="ts">
import { type HTMLAttributes, useAttrs } from "vue"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const { as: Tag = "ul", bordered, dense, flush, variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes
</script>

<template>
  <component
    :is="Tag"
    :class="[
      'ui-list',
      { 'ui-bordered': bordered, 'ui-dense': dense, 'ui-flush': flush },
      variant && variant !== 'filled' && `ui-${variant}`,
      $props.class,
    ]"
    role="list"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </component>
</template>
