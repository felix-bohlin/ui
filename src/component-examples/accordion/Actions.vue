<script setup lang="ts">
import { Accordion, Button } from "opui-css/vue"
</script>

<template>
  <Accordion open variant="elevated">
    <template #summary>Accordion with actions</template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare.
    </p>
    <template #actions>
      <Button>Cancel</Button>
      <Button>Agree</Button>
    </template>
  </Accordion>
</template>
