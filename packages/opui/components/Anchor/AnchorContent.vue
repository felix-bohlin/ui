<script setup lang="ts">
import { computed, inject } from "vue"
import {
  AnchorKey,
  type AnchorContentProps as Props,
  type Slots,
} from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()

const anchor = inject(AnchorKey, undefined)
const floatingId = computed(() => anchor?.value.floatingId)
const popover = computed(() => anchor?.value.popover)
</script>

<template>
  <span
    :class="['ui-anchor-floating', $props.class]"
    :id="floatingId"
    :popover="popover"
  >
    <slot></slot>
  </span>
</template>
