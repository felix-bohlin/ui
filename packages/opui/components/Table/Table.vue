<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { variant } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <table :class="[variant, $props.class]" v-bind="$attrs">
    <slot></slot>
  </table>
</template>
