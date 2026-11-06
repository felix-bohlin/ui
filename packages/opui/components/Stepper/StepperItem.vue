<script setup lang="ts">
import { computed } from "vue"
import { TrimmedSlot } from "../whitespace.vue"
import { classAttrs } from "../cx"
import type {
  StepperItemProps as Props,
  StepperItemSlots,
} from "./types.vue-props"

const {
  complete,
  completedLabel = ", completed",
  current,
  description,
  error,
  errorLabel = ", error",
  href,
  label,
} = defineProps<Props>()
defineSlots<StepperItemSlots>()

const state = computed(() =>
  error ? errorLabel : complete ? completedLabel : undefined,
)

const link = computed(() => href && !current && (complete || error))
</script>

<template>
  <li
    :aria-current="current ? 'step' : undefined"
    v-bind="
      classAttrs([{ 'ui-complete': complete, 'ui-error': error }, $props.class])
    "
  >
    <span
      v-if="$slots['icon-checked']"
      aria-hidden="true"
      class="ui-icon-checked"
      ><slot name="icon-checked"></slot></span
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
