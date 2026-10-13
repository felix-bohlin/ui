<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionSummary,
    Card,
  } from "opui-css/svelte"
</script>

<Card variant="outlined" role="group">
  <Accordion name="example-group">
    <AccordionSummary>Accordion title</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>
  <Accordion name="example-group">
    <AccordionSummary>Accordion title</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>
  <Accordion name="example-group">
    <AccordionSummary>Accordion title</AccordionSummary>
    <AccordionContent>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </AccordionContent>
  </Accordion>
</Card>
