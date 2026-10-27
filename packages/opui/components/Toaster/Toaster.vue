<script setup lang="ts">
import "../../elements/toaster.js"
import { warnMissingId } from "../dev"
import type { Props } from "./types.vue-props"

const { closeLabel, duration, id } = defineProps<Props>()

warnMissingId("Toaster", id)
</script>

<template>
  <component
    is="opui-toaster"
    :class="['ui-toaster', $props.class]"
    :close-label="closeLabel"
    :duration="duration"
    :id="id"
  >
    <ol popover="manual"></ol>
    <div class="ui-sr-only" role="status"></div>
  </component>
</template>
