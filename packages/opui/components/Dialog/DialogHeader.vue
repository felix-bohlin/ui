<script setup lang="ts">
import { inject } from "vue"
import { DialogKey } from "./context.vue"
import type { DialogHeaderProps as Props, Slots } from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const headerId = inject(DialogKey, undefined)
</script>

<template>
  <hgroup
    :class="[$props.class]"
    v-bind="$attrs"
    :id="headerId ?? ($attrs.id as string | undefined)"
  >
    <slot></slot>
  </hgroup>
</template>
