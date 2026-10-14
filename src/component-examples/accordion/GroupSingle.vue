<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionSummary,
  Card,
} from "opui-css/vue"
</script>

<template>
  <Card variant="outlined" role="group">
    <Accordion name="example-group">
      <AccordionSummary>First</AccordionSummary>
      <AccordionContent>
        <p>Only one accordion in the group is open at a time.</p>
      </AccordionContent>
    </Accordion>
    <Accordion name="example-group">
      <AccordionSummary>Second</AccordionSummary>
      <AccordionContent>
        <p>Only one accordion in the group is open at a time.</p>
      </AccordionContent>
    </Accordion>
  </Card>
</template>
