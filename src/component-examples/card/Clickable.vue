<script setup lang="ts">
import { Button, Card } from "opui-css/vue"
</script>

<template>
  <Card variant="outlined">
    <template #header>
      <h3><a class="ui-card-link" href="#clickable">Pricing</a></h3>
    </template>
    <template #content>
      Plans for any team. Click anywhere on the card.
    </template>
  </Card>

  <Card variant="outlined">
    <template #header>
      <h3><a class="ui-card-link" href="#clickable">Changelog</a></h3>
    </template>
    <template #content>Every release in one place.</template>
    <template #actions>
      <Button>Subscribe</Button>
    </template>
  </Card>
</template>
