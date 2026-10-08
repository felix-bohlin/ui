<script setup lang="ts">
import { computed } from "vue"
import { cssString } from "./css-string"
import type { Props, Slots } from "./types.d.vue"

const { completedLabel, current, items, label, orientation, size } =
  defineProps<Props>()
const slots = defineSlots<Slots>()

const completedLabelStyle = computed(() =>
  completedLabel
    ? { "--_completed-label": cssString(completedLabel) }
    : undefined,
)
</script>

<template>
  <ol
    :aria-label="label"
    :class="[
      'ui-stepper',
      { 'ui-vertical': orientation === 'vertical' },
      size && `ui-${size}`,
      $props.class,
    ]"
    :style="completedLabelStyle"
  >
    <li
      v-for="({ description, href, label: stepLabel }, index) in items"
      :key="index"
      :aria-current="index === current ? 'step' : undefined"
    >
      <span v-if="slots.check" aria-hidden="true" class="ui-check"
        ><slot name="check"></slot></span
      ><a
        v-if="href && current !== undefined && index < current"
        :href="href"
        >{{ stepLabel }}</a
      ><template v-else>{{ stepLabel }}</template
      ><span v-if="description" class="ui-description">{{ description }}</span>
    </li>
    <slot></slot>
  </ol>
</template>
