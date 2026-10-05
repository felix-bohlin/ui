<script lang="ts">
  import { Accordion, Card } from "opui-css/svelte"
</script>

<Card variant="outlined" role="group">
  <Accordion name="example-group">
    {#snippet summary()}Accordion title{/snippet}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
  <Accordion name="example-group">
    {#snippet summary()}Accordion title{/snippet}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
  <Accordion name="example-group">
    {#snippet summary()}Accordion title{/snippet}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </Accordion>
</Card>
