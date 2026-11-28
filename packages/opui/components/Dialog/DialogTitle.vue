<script setup lang="ts">
import { inject } from "vue"
import { DialogKey } from "./context.vue"
import { DEV, warnReplacedId } from "../dev"
import type { DialogTitleProps as Props, Slots } from "./types.vue-props"

const { id } = defineProps<Props>()
defineSlots<Slots>()

const dialog = inject(DialogKey, undefined)

if (DEV) warnReplacedId("DialogTitle", "Dialog", id, dialog?.titleId)
</script>

<template>
  <h2 :id="dialog?.titleId ?? id">
    <slot></slot>
  </h2>
</template>
