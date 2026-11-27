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
  completeLabel = ", completed",
  current,
  description,
  errorLabel = ", error",
  href,
  label,
  state,
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

const stateLabel = computed(() =>
  state === "error"
    ? errorLabel
    : state === "complete"
      ? completeLabel
      : undefined,
)

const link = computed(() => href && !current && state)
</script>

<template>
  <li
    :aria-current="attrs['aria-current'] ?? (current ? 'step' : undefined)"
    v-bind="{
      ...restAttrs,
      ...classAttrs([state && `ui-state-${state}`, $attrs.class]),
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
        v-if="stateLabel"
        class="ui-sr-only"
        >{{ stateLabel }}</span
      ></a
    >
    <template v-else
      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()" /><span
        v-if="stateLabel"
        class="ui-sr-only"
        >{{ stateLabel }}</span
      ></template
    >{{ " "
    }}<span v-if="description || $slots.description" class="ui-description"
      >{{ description }}<slot name="description"></slot
    ></span>
  </li>
</template>
