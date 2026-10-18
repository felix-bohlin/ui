<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <div class="ui-flow">
    <div class="ui-cluster ui-x-small">
      <Button variant="outlined">One</Button>
      <Button variant="outlined">Two</Button>
      <Button variant="outlined">Three</Button>
    </div>
    <div class="ui-cluster ui-small">
      <Button variant="outlined">One</Button>
      <Button variant="outlined">Two</Button>
      <Button variant="outlined">Three</Button>
    </div>
    <div class="ui-cluster">
      <Button variant="outlined">One</Button>
      <Button variant="outlined">Two</Button>
      <Button variant="outlined">Three</Button>
    </div>
    <div class="ui-cluster ui-large">
      <Button variant="outlined">One</Button>
      <Button variant="outlined">Two</Button>
      <Button variant="outlined">Three</Button>
    </div>
  </div>
</template>
