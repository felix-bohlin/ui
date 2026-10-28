<script setup lang="ts">
import { computed } from "vue"
import type { StepperItemProps, StepperItemSlots } from "./types.vue-props"

const {
  complete,
  completedLabel = ", completed",
  current,
  description,
  error,
  errorLabel = ", error",
  href,
  label,
} = defineProps<StepperItemProps>()
const slots = defineSlots<StepperItemSlots>()

const state = computed(() =>
  error ? errorLabel : complete ? completedLabel : undefined,
)
</script>

<template>
  <li
    :aria-current="current ? 'step' : undefined"
    :class="[{ 'ui-complete': complete, 'ui-error': error }, $props.class]"
  >
    <span
      v-if="slots['icon-checked']"
      aria-hidden="true"
      class="ui-icon-checked"
    >
      <slot name="icon-checked"></slot>
    </span>
    <a v-if="href && !current && (complete || error)" :href="href">
      {{ label }}<slot name="label"></slot>{{ state ? " " : ""
      }}<span v-if="state" class="ui-sr-only">{{ state }}</span>
    </a>
    <template v-else>
      {{ label }}<slot name="label"></slot
      >{{ state || description || slots.description ? " " : ""
      }}<span v-if="state" class="ui-sr-only">{{ state }}</span>
    </template>
    <span v-if="description || slots.description" class="ui-description">
      {{ description }}<slot name="description"></slot>
    </span>
  </li>
</template>
