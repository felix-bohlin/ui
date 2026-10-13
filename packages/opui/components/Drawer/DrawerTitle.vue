<script setup lang="ts">
import { inject } from "vue"
import {
  DrawerKey,
  type DrawerTitleProps as Props,
  type Slots,
} from "./types.d.vue"

defineProps<Props>()
defineSlots<Slots>()

const drawer = inject(DrawerKey, undefined)
</script>

<template>
  <h2 :class="[$props.class]" :id="drawer?.titleId">
    <slot></slot>
  </h2>
</template>
