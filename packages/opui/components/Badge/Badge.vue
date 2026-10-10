<script setup lang="ts">
import Anchor from "../Anchor/Anchor.vue"
import type { Props, Slots } from "./types.d.vue"

const { alignment, color, dot, invisible, label, srLabel } =
  defineProps<Props>()
defineSlots<Slots>()
</script>

<template>
  <Anchor
    :class="[
      'ui-badge',
      {
        'ui-dot': dot,
        'ui-invisible': invisible,
      },
      alignment && alignment !== 'start-end' && `ui-${alignment}`,
      color && `ui-${color}`,
      $props.class,
    ]"
  >
    <slot></slot>
    <template #anchored>
      <span class="ui-badge-indicator">
        {{ dot ? "" : label }}
        <slot v-if="!dot" name="indicator"></slot>
        <span v-if="srLabel" class="ui-sr-only">{{ srLabel }}</span>
      </span>
    </template>
  </Anchor>
</template>
