<script setup lang="ts">
import Anchor from "../Anchor/Anchor.vue"
import type { Props, Slots } from "./types.d.vue"

const { alignment, color, dot, invisible, label } = defineProps<Props>()
defineSlots<Slots>()

const positionArea =
  alignment === "start-start"
    ? "start start"
    : alignment === "end-start"
      ? "end start"
      : alignment === "end-end"
        ? "end end"
        : undefined
</script>

<template>
  <Anchor
    :alignment="positionArea"
    :class="[
      'ui-badge',
      {
        'ui-dot': dot,
        'ui-invisible': invisible,
      },
      alignment && `ui-${alignment}`,
      color && `ui-${color}`,
      $props.class,
    ]"
  >
    <slot></slot>
    <template #anchored>
      <span class="ui-badge-indicator" :aria-label="label?.toString()">{{
        dot ? "" : label
      }}</span>
    </template>
  </Anchor>
</template>
