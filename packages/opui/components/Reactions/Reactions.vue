<script setup lang="ts">
import "../../elements/reactions.js"
import type { Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <component is="opui-reactions" :class="['ui-reactions', $props.class]">
    <slot></slot>
    <span class="ui-sr-only" role="status"></span>
  </component>
</template>
