<script setup lang="ts">
import Anchor from "../Anchor/Anchor.vue"
import AnchorContent from "../Anchor/AnchorContent.vue"
import type { Props, Slots } from "./types.d.vue"

const { color, corner, dot, invisible, label, srLabel } = defineProps<Props>()
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
      color && `ui-${color}`,
      corner && corner !== 'start-end' && `ui-${corner}`,
      $props.class,
    ]"
  >
    <slot></slot>
    <AnchorContent>
      <span class="ui-badge-indicator">
        {{ dot ? "" : label }}
        <slot v-if="!dot" name="indicator"></slot>
        <template v-if="srLabel">
          {{ " " }}<span class="ui-sr-only">{{ srLabel }}</span>
        </template>
      </span>
    </AnchorContent>
  </Anchor>
</template>
