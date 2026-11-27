<script setup lang="ts">
import { computed } from "vue"
import type {
  BreadcrumbItemProps as Props,
  BreadcrumbItemSlots,
} from "./types.vue-props"

const { current, href, label } = defineProps<Props>()
defineSlots<BreadcrumbItemSlots>()

const Tag = computed(() => (href ? "a" : "span"))
</script>

<template>
  <li>
    <span v-if="$slots.separator" aria-hidden="true" class="ui-separator"
      ><slot name="separator"></slot></span
    >{{ " "
    }}<component
      :is="Tag"
      :aria-current="current ? 'page' : undefined"
      :href="href"
      >{{ label }}<slot></slot
    ></component>
  </li>
</template>
