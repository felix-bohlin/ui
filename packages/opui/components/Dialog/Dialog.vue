<script setup lang="ts">
import { computed, useAttrs, useId } from "vue"
import type { Props, Slots } from "./types.d.vue"

const { actionsAlign } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const slots = defineSlots<Slots>()
const attrs = useAttrs()
const uid = useId()
const headerId = computed(() =>
  slots.header && !attrs["aria-labelledby"] ? uid : undefined,
)
</script>

<template>
  <dialog
    :aria-labelledby="headerId"
    :class="['ui-dialog', 'ui-card', 'ui-elevated', $props.class]"
    v-bind="$attrs"
  >
    <hgroup v-if="slots.header" :id="headerId">
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
