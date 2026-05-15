<script setup lang="ts">
import type { Props } from './types'
import { useSlots } from 'vue'

const { variant, actions, class: className } = defineProps<Props>()

const slots = useSlots()
</script>

<template>
  <div :class="['card', variant, className]">
    <hgroup v-if="slots.header">
      <slot name="header"></slot>
    </hgroup>

    <div v-if="slots.content" class="content">
      <slot name="content"></slot>
    </div>

    <slot></slot>

    <div v-if="slots.actions" :class="['actions', actions?.align && `align-${actions.align}`]">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
