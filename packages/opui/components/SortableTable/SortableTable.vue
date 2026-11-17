<script setup lang="ts">
import "../../elements/sortable-table.js"
import { type HTMLAttributes, useAttrs } from "vue"
import { defined } from "../attrs"
import type { Props, Emits, Slots } from "./types.vue-props"

const { ascendingLabel, descendingLabel } = defineProps<Props>()
defineSlots<Slots>()
const emit = defineEmits<Emits>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as HTMLAttributes
</script>

<template>
  <component
    is="opui-sortable-table"
    :ascending-label="ascendingLabel"
    :class="['ui-sortable-table', $props.class]"
    :descending-label="descendingLabel"
    v-bind="defined(attrs)"
    @sort="emit('sort', $event)"
  >
    <slot></slot>{{ " " }}<span class="ui-sr-only" role="status"></span>
  </component>
</template>
