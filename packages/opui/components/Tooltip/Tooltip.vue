<script setup lang="ts">
import Anchor from "../Anchor/Anchor.vue"
import { warnMissingId } from "../dev"
import type { Props, Slots } from "./types.vue-props"

const { arrow, id, positionArea } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

warnMissingId("Tooltip", id, "interestfor")
</script>

<template>
  <Anchor
    :class="['ui-tooltip', { 'ui-arrow': arrow }, $props.class]"
    :id="id"
    :positionArea="positionArea"
    trigger="hover"
    v-bind="$attrs"
  >
    <slot></slot>
  </Anchor>
</template>
