<script setup lang="ts">
import { computed } from "vue"
import { TrimmedSlot } from "../whitespace.vue"
import Anchor from "../Anchor/Anchor.vue"
import AnchorContent from "../Anchor/AnchorContent.vue"
import type { Props, Slots } from "./types.vue-props"

const { color, corner, dot, hideLabel, invisible, label } = defineProps<Props>()
defineSlots<Slots>()

const hidden = computed(() => dot || hideLabel)
</script>

<template>
  <Anchor
    :class="[
      'ui-badge',
      { 'ui-dot': dot, 'ui-invisible': invisible },
      color && `ui-${color}`,
      corner && corner !== 'start-end' && `ui-${corner}`,
      $props.class,
    ]"
  >
    <slot></slot>{{ " "
    }}<AnchorContent>
      <span class="ui-indicator">
        <template v-if="hidden"
          ><span v-if="!dot && $slots.indicator" aria-hidden="true"
            ><TrimmedSlot :nodes="$slots.indicator?.()" /></span
          ><span v-if="label" class="ui-sr-only">{{ label }}</span></template
        >{{ hidden ? undefined : label
        }}<TrimmedSlot v-if="!hidden" :nodes="$slots.indicator?.()" />
      </span>
    </AnchorContent>
  </Anchor>
</template>
