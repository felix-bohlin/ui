<script setup lang="ts">
import { useSlots } from "vue"
import type { Props, Slots } from "./types.d.vue"

const { actionsAlign, variant } = defineProps<Props>()
const slots = defineSlots<Slots>()
</script>

<template>
  <div :class="['ui-card', variant && `ui-${variant}`, $props.class]">
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
  </div>
</template>
