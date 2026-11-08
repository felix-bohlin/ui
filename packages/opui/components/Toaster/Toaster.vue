<script setup lang="ts">
import "../../elements/toaster.js"
import { type HTMLAttributes, useAttrs } from "vue"
import { warnMissingId } from "../dev"
import { defined } from "../attrs"
import type { Props } from "./types.vue-props"

const { align, closeLabel, duration, id, side } = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes

warnMissingId("Toaster", id)
</script>

<template>
  <component
    is="opui-toaster"
    :class="[
      'ui-toaster',
      side && side !== 'block-end' && `ui-${side}`,
      align && align !== 'end' && `ui-align-${align}`,
      $props.class,
    ]"
    :close-label="closeLabel"
    :duration="duration"
    :id="id"
    v-bind="defined(attrs)"
  >
    <ol popover="manual"></ol>
    <div class="ui-sr-only" role="status"></div>
    <div class="ui-sr-only" role="alert"></div>
  </component>
</template>
