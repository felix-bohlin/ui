<script setup lang="ts">
import { inject } from "vue"
import {
  DialogHeaderIdKey,
  type DialogHeaderProps as Props,
  type Slots,
} from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()

const headerId = inject(DialogHeaderIdKey, undefined)
</script>

<template>
  <hgroup :class="[$props.class]" :id="headerId">
    <slot></slot>
  </hgroup>
</template>
