<script setup lang="ts">
import type { Props, Slots } from "./types.d.vue"

const { actionsAlign, closedby } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const slots = defineSlots<Slots>()
</script>

<template>
  <dialog
    :class="['ui-dialog', 'ui-card', 'ui-elevated', $props.class]"
    :closedby="closedby"
    v-bind="$attrs"
  >
    <hgroup v-if="slots.header">
      <slot name="header"></slot>
    </hgroup>

    <div v-if="slots.content" class="ui-content">
      <slot name="content"></slot>
    </div>

    <slot></slot>

    <div
      v-if="slots.actions"
      :class="['ui-actions', actionsAlign && `ui-align-${actionsAlign}`]"
    >
      <slot name="actions"></slot>
    </div>
  </dialog>
</template>
