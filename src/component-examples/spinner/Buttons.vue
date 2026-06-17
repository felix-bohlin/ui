<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Button aria-busy="true">Text</Button>
    <Button aria-busy="true" disabled variant="outlined"> Outlined </Button>
    <Button aria-busy="true" variant="filled">Filled</Button>
  </div>

  <div class="example-row">
    <Button aria-busy="true">
      <span class="ui-sr-only">Text</span>
    </Button>
    <Button aria-busy="true" disabled variant="outlined">
      <span class="ui-sr-only">Outlined</span>
    </Button>
    <Button aria-busy="true" variant="filled">
      <span class="ui-sr-only">Filled</span>
    </Button>
  </div>
</template>
