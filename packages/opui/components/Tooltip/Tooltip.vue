<script setup lang="ts">
import type { Props } from './types'
import Anchor from '../Anchor/Anchor.vue'

const { alignment, arrow, class: className, id, label } = defineProps<Props>()
</script>

<template>
  <Anchor
    :alignment="alignment"
    :class="['tooltip', { 'with-arrow': arrow }, className]"
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
