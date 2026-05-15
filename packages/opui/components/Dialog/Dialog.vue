<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<dialog
  :class="["dialog card elevated", className]"
  closedby={closedby}
  
>
  {
    Astro.slots.has("header") && (
      <hgroup>
        <slot name="header"></slot>
      </hgroup>
    )
  }
  {
    Astro.slots.has("content") && (
      <div class="content">
        <slot name="content"></slot>
      </div>
    )
  }
  <slot></slot>
  {
    Astro.slots.has("actions") && (
      <div :class="["actions", actions?.align && `align-${actions.align"`]}>
        <slot name="actions"></slot>
      </div>
    )
  }
</dialog>
</template>
