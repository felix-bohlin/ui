<script setup lang="ts">
import { computed, inject, provide, reactive } from "vue"
import { FieldGroupKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const { name, orientation } = defineProps<Props>()
defineSlots<Slots>()

const parent = inject(FieldGroupKey, undefined)
provide(FieldGroupKey, reactive({ name: computed(() => name || parent?.name) }))
</script>

<template>
  <div
    :class="[
      'ui-field-group',
      orientation && orientation !== 'auto' && `ui-${orientation}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </div>
</template>
