<script setup lang="ts">
import { Callout } from "opui-css/vue"
</script>

<template>
  <Callout>
    <template #title>Note</template>
    <p>
      This is a tonal Callout. Notice the lack of icons - it's not really needed
      here.
    </p>
  </Callout>
  <Callout variant="outlined">
    <template #title>Another Callout</template>
    <p>
      This is an outlined Callout. Why not use a
      <a class="ui-link" href="/components/card">Card</a> since they look very
      similar? For one, the Callout is a more focused component with different
      properties.
    </p>
  </Callout>
</template>
