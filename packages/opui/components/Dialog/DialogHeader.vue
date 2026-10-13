<script setup lang="ts">
import { inject } from "vue"
import {
  DialogHeaderIdKey,
  type DialogHeaderProps as Props,
  type Slots,
} from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const headerId = inject(DialogHeaderIdKey, undefined)
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
