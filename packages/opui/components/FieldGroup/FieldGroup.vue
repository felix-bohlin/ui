<script setup lang="ts">
import { computed, inject, provide, reactive } from "vue"
import { FieldGroupKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const { direction, name } = defineProps<Props>()
defineSlots<Slots>()

const parent = inject(FieldGroupKey, undefined)
provide(FieldGroupKey, reactive({ name: computed(() => name || parent?.name) }))
</script>

<template>
  <div
    :class="['ui-field-group', direction && `ui-${direction}`, $props.class]"
  >
    <slot></slot>
  </div>
</template>
