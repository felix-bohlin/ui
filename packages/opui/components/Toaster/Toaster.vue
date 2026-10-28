<script setup lang="ts">
import "../../elements/toaster.js"
import { warnMissingId } from "../dev"
import type { Props } from "./types.vue-props"

const { align, closeLabel, duration, id, side } = defineProps<Props>()

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
  >
    <ol popover="manual"></ol>
    <div class="ui-sr-only" role="status"></div>
  </component>
</template>
