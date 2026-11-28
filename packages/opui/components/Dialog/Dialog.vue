<script setup lang="ts">
import { computed, provide, reactive, useId } from "vue"
import { useRestAttrs } from "../vue"
import { DialogKey } from "./context.vue"
import { autoLabelledBy } from "../id"
import { defined } from "../attrs"
import type { Props, Slots } from "./types.vue-props"

const { closedby } = defineProps<Props>()
defineSlots<Slots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs()

const uid = useId()

const titleId = computed(() => `${attrs.value.id || `dialog-${uid}`}-title`)

const labelledBy = computed(() => autoLabelledBy(attrs.value, titleId.value))

provide(
  DialogKey,
  reactive({
    id: computed(() => attrs.value.id || undefined),
    titleId: labelledBy,
  }),
)
</script>

<template>
  <dialog
    :aria-labelledby="labelledBy"
    :class="['ui-dialog', 'ui-elevated', $attrs.class]"
    :closedby="closedby"
    v-bind="defined(attrs)"
  >
    <slot></slot>
  </dialog>
</template>
