<script setup lang="ts">
import { inject } from "vue"
import { AnchorKey } from "./context.vue"
import { warnReplacedAnchorAttributes } from "../dev"
import type { AnchorContentProps as Props, Slots } from "./types.vue-props"

const { id, popover } = defineProps<Props>()
defineSlots<Slots>()

const anchor = inject(AnchorKey, undefined)

warnReplacedAnchorAttributes(id, popover, anchor?.floatingId, anchor?.popover)
</script>

<template>
  <span
    class="ui-floating"
    :id="anchor?.floatingId ?? id"
    :popover="anchor?.popover ?? popover"
  >
    <slot></slot>
  </span>
</template>
