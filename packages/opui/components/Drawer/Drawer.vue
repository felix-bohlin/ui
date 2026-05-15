<script setup lang="ts">
import type { Props } from './types'

const props = defineProps<Props>()
</script>

<template>

<dialog
  closedby={closedby}
  :class="[
    "drawer",
    side,
    {
      "backdrop-transparent": backdrop === "transparent",
      "scroll-lock": scrollLock,
    ",
    className,
  ]}
  id={drawerId}
  
>
  {Astro.slots.has("header") && <slot name="header"></slot>}

  <div class="content">
    <slot name="content"></slot>
  </div>

  {Astro.slots.has("footer") && <slot name="footer"></slot>}
</dialog>
</template>
