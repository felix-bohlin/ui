<script setup lang="ts">
import { computed, provide, reactive } from "vue"
import { CalloutKey, type Props, type Slots } from "./types.d.vue"

const { severity, variant } = defineProps<Props>()
defineSlots<Slots>()

provide(CalloutKey, reactive({ severity: computed(() => severity) }))
</script>

<template>
  <article
    :class="[
      'ui-callout',
      variant && `ui-${variant}`,
      severity && `ui-${severity}`,
      $props.class,
    ]"
  >
    <slot></slot>
  </article>
</template>
