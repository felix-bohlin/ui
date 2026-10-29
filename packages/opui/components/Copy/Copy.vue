<script setup lang="ts">
import "../../elements/copy.js"
import { warnMissingId } from "../dev"
import type { Props, Slots } from "./types.vue-props"

const { copiedLabel, failedLabel, id } = defineProps<Props>()
defineSlots<Slots>()

warnMissingId("Copy", id)
</script>

<template>
  <component
    is="opui-copy"
    :class="['ui-copy', $props.class]"
    :copied-label="copiedLabel"
    :failed-label="failedLabel"
    :id="id"
  >
    <slot></slot>
    <span class="ui-sr-only" role="status"></span>
    <span aria-hidden="true" class="ui-floating" popover=""></span>
  </component>
</template>
