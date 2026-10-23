<script setup lang="ts">
import { computed, provide, reactive } from "vue"
import { CalloutKey } from "./context.vue"
import type { Props, Slots } from "./types.d.vue"

const { severity, variant } = defineProps<Props>()
defineSlots<Slots>()

provide(CalloutKey, reactive({ severity: computed(() => severity) }))
</script>

<template>
  <article
    :class="[
      'ui-callout',
      severity && `ui-${severity}`,
      variant && variant !== 'tonal' && `ui-${variant}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </article>
</template>
