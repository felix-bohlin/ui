<script setup lang="ts">
import { inject } from "vue"
import { warnReplacedId } from "../dev"
import { DialogKey } from "./context.vue"
import type { DialogTitleProps as Props, Slots } from "./types.vue-props"

const { id } = defineProps<Props>()
defineSlots<Slots>()

const dialog = inject(DialogKey, undefined)
warnReplacedId("DialogTitle", "Dialog", id, dialog?.titleId)
</script>

<template>
  <h2 :class="[$props.class]" :id="dialog?.titleId ?? id">
    <slot></slot>
  </h2>
</template>
