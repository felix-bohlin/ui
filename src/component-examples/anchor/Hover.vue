<script setup lang="ts">
import { Anchor } from "opui-css/vue"
</script>

<template>
  <Anchor trigger="hover" id="anchor-hover">
    <button
      interestfor="anchor-hover"
      commandfor="anchor-hover"
      command="toggle-popover"
    >
      Hover me
    </button>
    <template #anchored
      ><span><div class="card elevated">Tooltip content</div></span></template
    >
  </Anchor>
</template>
