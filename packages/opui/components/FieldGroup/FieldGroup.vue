<script setup lang="ts">
import { provide } from "vue"
import { CurrentFieldNameKey, type Props, type Slots } from "./types.d.vue"

const props = defineProps<Props>()
defineSlots<Slots>()

if (props.name) {
  provide(CurrentFieldNameKey, props.name)
}
</script>

<template>
  <div
    :class="['field-group', props.direction, props.class]"
    v-bind="$attrs"
    role="group"
  >
    <slot></slot>
  </div>
</template>
