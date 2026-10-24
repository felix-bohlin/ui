<script setup lang="ts">
import Anchor from "../Anchor/Anchor.vue"
import type { Props, Slots } from "./types.d.vue"

const { arrow, id, positionArea } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <Anchor
    :class="['ui-tooltip', { 'ui-arrow': arrow }, $props.class]"
    :id="id"
    :positionArea="positionArea"
    trigger="hover"
  >
    <slot></slot>
  </Anchor>
</template>
