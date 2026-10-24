<script setup lang="ts">
import { inject } from "vue"
import { warnReplacedId } from "../dev"
import { DrawerKey } from "./context.vue"
import type { DrawerTitleProps as Props, Slots } from "./types.d.vue"

const { id } = defineProps<Props>()
defineSlots<Slots>()

const drawer = inject(DrawerKey, undefined)
warnReplacedId("DrawerTitle", "Drawer", id, drawer?.titleId)
</script>

<template>
  <h2 :class="[$props.class]" :id="drawer?.titleId ?? id">
    <slot></slot>
  </h2>
</template>
