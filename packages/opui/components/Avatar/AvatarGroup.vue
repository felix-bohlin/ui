<script setup lang="ts">
import type { AvatarGroupProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-avatar-group', $props.class]" role="group">
    <slot></slot>
  </div>
</template>
