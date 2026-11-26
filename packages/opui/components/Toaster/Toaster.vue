<script setup lang="ts">
import "../../elements/toaster.js"
import { DEV, warnMissingId } from "../dev"
import type { Props } from "./types.vue-props"

const { align, closeLabel, duration, id, limit, side } = defineProps<Props>()

if (DEV) warnMissingId("Toaster", id)
</script>

<template>
  <component
    is="opui-toaster"
    :class="[
      'ui-toaster',
      side && side !== 'block-end' && `ui-${side}`,
      align && align !== 'end' && `ui-align-${align}`,
    ]"
    :close-label="closeLabel"
    :duration="duration"
    :id="id"
    :limit="limit"
  >
    <ol popover="manual"></ol>
    <div class="ui-sr-only" role="status"></div>
    <div class="ui-sr-only" role="alert"></div>
  </component>
</template>
