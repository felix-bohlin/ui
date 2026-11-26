<script setup lang="ts">
import { computed } from "vue"
import { classAttrs } from "../cx"
import type { Props, Slots } from "./types.vue-props"

const { items, overflow, size } = defineProps<Props>()
defineSlots<Slots>()

const lastIndex = computed(() => (items ? items.length - 1 : -1))
</script>

<template>
  <nav
    :class="[
      'ui-breadcrumb',
      overflow && overflow !== 'wrap' && `ui-overflow-${overflow}`,
      size && size !== 'medium' && `ui-${size}`,
    ]"
  >
    <ol>
      <li v-for="({ current, href, label }, index) in items" :key="index">
        <span
          v-if="index > 0 && $slots.separator"
          aria-hidden="true"
          class="ui-separator"
        >
          <slot name="separator"></slot> </span
        ><component
          :is="href ? 'a' : 'span'"
          :aria-current="(current ?? index === lastIndex) ? 'page' : undefined"
          v-bind="classAttrs([href && 'ui-link'])"
          :href="href"
          >{{ label }}</component
        >
      </li>
      <slot></slot>
    </ol>
  </nav>
</template>
