<script setup lang="ts">
import { Anchor } from "opui-css/vue"
</script>

<template>
  <Anchor>
    <button>Hover me</button>
    <template #anchored
      ><span
        style="
          background: var(--surface-2);
          padding: var(--size-2) var(--size-3);
          border-radius: var(--radius-2);
          box-shadow: var(--shadow-3);
        "
        >Floating content</span
      ></template
    >
  </Anchor>
</template>
