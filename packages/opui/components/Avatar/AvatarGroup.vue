<script setup lang="ts">
import type { AvatarGroupProps as Props, Slots } from "./types.vue-props"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-avatar-group', $props.class]" role="group">
    <slot></slot>
  </div>
</template>
