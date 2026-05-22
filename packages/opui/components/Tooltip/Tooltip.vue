<script setup lang="ts">
import Anchor from "../Anchor/Anchor.vue"
import type { Props, Slots } from "./types.d.vue"

const { alignment, arrow, id, label } = defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <Anchor
    :alignment="alignment"
    :class="['tooltip', { 'with-arrow': arrow }, $props.class]"
    :id="id"
    trigger="hover"
  >
    <slot></slot>
    <template #anchored>
      {{ label }}
      <slot name="content"></slot>
    </template>
  </Anchor>
</template>
