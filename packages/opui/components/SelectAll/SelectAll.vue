<script setup lang="ts">
import "../../elements/select-all.js"
import type { Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component is="opui-select-all" :class="['ui-select-all', $props.class]">
    <slot></slot>
  </component>
</template>
