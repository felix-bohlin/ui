<script setup lang="ts">
import { inject } from "vue"
import { AnchorKey } from "./context.vue"
import type { AnchorContentProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()

const anchor = inject(AnchorKey, undefined)
</script>

<template>
  <span
    :class="['ui-floating', $props.class]"
    :id="anchor?.floatingId"
    :popover="anchor?.popover"
  >
    <slot></slot>
  </span>
</template>
