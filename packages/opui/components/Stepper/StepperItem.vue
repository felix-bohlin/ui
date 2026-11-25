<script setup lang="ts">
import { computed } from "vue"
import { useRestAttrs } from "../vue"
import { TrimmedSlot } from "../whitespace.vue"
import { classAttrs } from "../cx"
import type {
  StepperItemProps as Props,
  StepperItemSlots,
} from "./types.vue-props"

const {
  complete,
  completeLabel = ", completed",
  current,
  description,
  error,
  errorLabel = ", error",
  href,
  label,
} = defineProps<Props>()
defineSlots<StepperItemSlots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useRestAttrs()

const restAttrs = computed(() => {
  const { "aria-current": _ariaCurrent, ...rest } = attrs.value
  return rest
})

const state = computed(() =>
  error ? errorLabel : complete ? completeLabel : undefined,
)

const link = computed(() => href && !current && (complete || error))
</script>

<template>
  <li
    :aria-current="attrs['aria-current'] ?? (current ? 'step' : undefined)"
    v-bind="{
      ...restAttrs,
      ...classAttrs([
        { 'ui-complete': complete, 'ui-error': error },
        $attrs.class,
      ]),
    }"
  >
    <span
      v-if="$slots['icon-complete']"
      aria-hidden="true"
      class="ui-icon-complete"
      ><slot name="icon-complete"></slot></span
    >{{ " "
    }}<a v-if="link" :href="href"
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()" /><span
        v-if="state"
        class="ui-sr-only"
        >{{ state }}</span
      ></a
    >
    <template v-else
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()" /><span
        v-if="state"
        class="ui-sr-only"
        >{{ state }}</span
      ></template
    >{{ " "
    }}<span v-if="description || $slots.description" class="ui-description"
      >{{ description }}<slot name="description"></slot
    ></span>
  </li>
</template>
