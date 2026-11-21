<script setup lang="ts">
import "../../elements/sortable-table.js"
import { vHydrated } from "../vue"
import type { Props, Emits, Slots } from "./types.vue-props"

const { ascendingLabel, descendingLabel } = defineProps<Props>()
defineSlots<Slots>()
const emit = defineEmits<Emits>()
</script>

<template>
  <component
    is="opui-sortable-table"
    :ascending-label="ascendingLabel"
    :class="['ui-sortable-table', $props.class]"
    :descending-label="descendingLabel"
    @sort="emit('sort', $event)"
    data-hydrating=""
    v-hydrated
  >
    <slot></slot>{{ " " }}<span class="ui-sr-only" role="status"></span>
  </component>
</template>
