<script setup lang="ts">
import { Accordion, AccordionContent, AccordionSummary } from "opui-css/vue"
</script>

<template>
  <Accordion>
    <AccordionSummary>Transparent</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>

  <Accordion variant="elevated">
    <AccordionSummary>Elevated</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>

  <Accordion variant="outlined">
    <AccordionSummary>Outlined</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>

  <Accordion variant="tonal">
    <AccordionSummary>Tonal</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>
</template>
