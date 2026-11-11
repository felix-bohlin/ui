<script setup lang="ts">
import { inject } from "vue"
import { PopoverKey } from "./context.vue"
import { warnReplacedId } from "../dev"
import { classAttrs } from "../cx"
import type { PopoverTitleProps as Props, Slots } from "./types.vue-props"

const { id } = defineProps<Props>()
defineSlots<Slots>()

const popover = inject(PopoverKey, undefined)

warnReplacedId("PopoverTitle", "Popover", id, popover?.titleId)
</script>

<template>
  <h2 v-bind="classAttrs([$props.class])" :id="popover?.titleId ?? id">
    <slot></slot>
  </h2>
</template>
