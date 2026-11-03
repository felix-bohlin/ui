<script setup lang="ts">
import { computed, provide, reactive, useAttrs, useId } from "vue"
import { autoLabelledBy } from "../id"
import { DialogKey } from "./context.vue"
import type { Props, Slots } from "./types.vue-props"

const { closedby } = defineProps<Props>()
defineSlots<Slots>()

const attrs = useAttrs()
const uid = useId()
const labelledBy = computed(() =>
  autoLabelledBy(attrs, `${attrs.id ?? `dialog-${uid}`}-title`),
)

provide(DialogKey, reactive({ titleId: labelledBy }))
</script>

<template>
  <dialog
    :aria-labelledby="labelledBy"
    :class="['ui-dialog', 'ui-elevated', $props.class]"
    :closedby="closedby"
  >
    <slot></slot>
  </dialog>
</template>
