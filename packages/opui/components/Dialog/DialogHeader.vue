<script setup lang="ts">
import { inject } from "vue"
import { warnReplacedId } from "../dev"
import { DialogKey } from "./context.vue"
import type { DialogHeaderProps as Props, Slots } from "./types.d.vue"

const { id } = defineProps<Props>()
defineSlots<Slots>()

const dialog = inject(DialogKey, undefined)
warnReplacedId("DialogHeader", "Dialog", id, dialog?.headerId)
</script>

<template>
  <hgroup :class="[$props.class]" :id="dialog?.headerId ?? id">
    <slot></slot>
  </hgroup>
</template>
