<script setup lang="ts">
import { Button, Card } from "opui-css/vue"
</script>

<template>
  <Card variant="elevated" class="anatomy">
    <template #header>
      <p>Overline</p>
      <h2 class="h3">Headline</h2>
      <p>Subhead</p>
    </template>
    <template #content>
      Explain more about the topic shown in the headline and subhead through
      supporting text.
    </template>
    <template #actions>
      <Button>Share</Button>
      <Button>Learn more</Button>
    </template>
  </Card>
</template>
