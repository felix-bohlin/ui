<script setup lang="ts">
import Anchor from "../Anchor/Anchor.vue"
import AnchorContent from "../Anchor/AnchorContent.vue"
import type { Props, Slots } from "./types.vue-props"

const { color, corner, dot, hideLabel, invisible, label } = defineProps<Props>()
const slots = defineSlots<Slots>()
</script>

<template>
  <Anchor
    :class="[
      'ui-badge',
      {
        'ui-dot': dot,
        'ui-invisible': invisible,
      },
      color && `ui-${color}`,
      corner && corner !== 'start-end' && `ui-${corner}`,
      $props.class,
    ]"
  >
    <slot></slot>
    <AnchorContent>
      <span class="ui-indicator">
        <template v-if="dot || hideLabel">
          <span v-if="!dot && slots.indicator" aria-hidden="true">
            <slot name="indicator"></slot>
          </span>
          <span v-if="label" class="ui-sr-only">{{ label }}</span>
        </template>
        <template v-else> {{ label }}<slot name="indicator"></slot> </template>
      </span>
    </AnchorContent>
  </Anchor>
</template>
