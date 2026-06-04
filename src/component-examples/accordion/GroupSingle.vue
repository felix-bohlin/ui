<script setup lang="ts">
import { Accordion, Card } from "opui-css/vue"
</script>

<template>
  <Card variant="outlined" role="group">
    <Accordion name="example-group">
      <template #summary>Accordion title</template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </Accordion>
    <Accordion name="example-group">
      <template #summary>Accordion title</template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </Accordion>
    <Accordion name="example-group">
      <template #summary>Accordion title</template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </Accordion>
  </Card>
</template>
