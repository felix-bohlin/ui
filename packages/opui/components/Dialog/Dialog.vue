<script setup lang="ts">
import { useSlots } from 'vue'
import type { Props } from './types'

const { actions, class: className, closedby } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const slots = useSlots()
</script>

<template>
  <dialog
    :class="['dialog', 'card', 'elevated', className]"
    :closedby="closedby"
    v-bind="$attrs"
  >
    <hgroup v-if="slots.header">
      <slot name="header"></slot>
    </hgroup>

    <div v-if="slots.content" class="content">
      <slot name="content"></slot>
    </div>

    <slot></slot>

    <div
      v-if="slots.actions"
      :class="['actions', actions?.align && `align-${actions.align}`]"
    >
      <slot name="actions"></slot>
    </div>
  </dialog>
</template>
