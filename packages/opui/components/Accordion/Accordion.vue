<script setup lang="ts">
import { useId } from 'vue'
import type { Props } from './types'

const props = defineProps<Props>()

const summaryId = useId()
const contentId = useId()
</script>

<template>
  <details
    :name="name"
    :class="['accordion', 'card', variant, props.class]"
    :open="open"
  >
    <!-- Summary -->
    <summary :id="summaryId" :aria-controls="contentId">
      <slot name="summary"></slot><slot name="marker"></slot>
    </summary>

    <!-- Content -->
    <div :id="contentId" class="content" role="region" :aria-labelledby="summaryId">
      <slot></slot>
    </div>

    <!-- Actions -->
    <div v-if="$slots.actions" class="actions">
      <slot name="actions"></slot>
    </div>
  </details>
</template>
