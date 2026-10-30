<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionSummary,
    Card,
  } from "opui-css/svelte"
</script>

<Card role="group" variant="outlined">
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
