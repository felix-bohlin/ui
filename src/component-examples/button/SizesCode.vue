<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <Button size="x-small">X-small</Button>
  <Button size="small">Small</Button>
  <Button>Default</Button>
  <Button size="large">Large</Button>

  <Button variant="filled" size="x-small">X-small</Button>
  <Button variant="filled" size="small">Small</Button>
  <Button variant="filled">Default</Button>
  <Button variant="filled" size="large">Large</Button>

  <Button size="x-small" variant="outlined">
    <span class="ui-text">X-small</span>
    <svg><!-- --></svg>
  </Button>
  <Button size="small" variant="outlined">
    <span class="ui-text">Small</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="outlined">
    <span class="ui-text">Default</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="outlined" size="large">
    <span class="ui-text">Large</span>
    <svg><!-- --></svg>
  </Button>
</template>
