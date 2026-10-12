<script setup lang="ts">
import { inject } from "vue"
import {
  FieldRootKey,
  type FieldEndTextProps as Props,
  type Slots,
} from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()

const field = inject(FieldRootKey, undefined)
</script>

<template>
  <span :class="['ui-end-text', $props.class]" :id="field?.endTextId">
    <slot></slot>
  </span>
</template>
