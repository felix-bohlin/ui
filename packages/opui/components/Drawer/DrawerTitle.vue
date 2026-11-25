<script setup lang="ts">
import { inject } from "vue"
import { DrawerKey } from "./context.vue"
import { warnReplacedId } from "../dev"
import type { DrawerTitleProps as Props, Slots } from "./types.vue-props"

const { id } = defineProps<Props>()
defineSlots<Slots>()

const drawer = inject(DrawerKey, undefined)

warnReplacedId("DrawerTitle", "Drawer", id, drawer?.titleId)
</script>

<template>
  <h2 :id="drawer?.titleId ?? id">
    <slot></slot>
  </h2>
</template>
