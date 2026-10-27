<script setup lang="ts">
import type { Props, Slots } from "./types.vue-props"

const { description, label, size } = defineProps<Props>()
const slots = defineSlots<Slots>()
</script>

<template>
  <dl
    :class="[
      'ui-stat',
      size && size !== 'medium' && `ui-${size}`,
      $props.class,
    ]"
  >
    <dt class="ui-label">{{ label }}<slot name="label"></slot></dt>
    <dd class="ui-value"><slot></slot></dd>
    <dd v-if="description || slots.description" class="ui-description">
      {{ description }}<slot name="description"></slot>
    </dd>
  </dl>
</template>
