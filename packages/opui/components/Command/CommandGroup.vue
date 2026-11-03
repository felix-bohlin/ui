<script setup lang="ts">
import { computed, useId } from "vue"
import type {
  CommandGroupProps as Props,
  CommandGroupSlots,
} from "./types.vue-props"

const { label } = defineProps<Props>()
const slots = defineSlots<CommandGroupSlots>()

const uid = useId()
const labelId = computed(() =>
  label || slots.label ? `command-group-label-${uid}` : undefined,
)
</script>

<template>
  <div :class="['ui-command-group', $props.class]">
    <p v-if="labelId" class="ui-label" :id="labelId">
      {{ label }}<slot name="label"></slot>
    </p>
    <ul :aria-labelledby="labelId" class="ui-list ui-transparent">
      <slot></slot>
    </ul>
  </div>
</template>
