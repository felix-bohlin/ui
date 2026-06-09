<script>
  import { Accordion } from "@opui/svelte"
  import { Button } from "@opui/svelte"
</script>

<Accordion open variant="elevated" summary="Accordion with actions">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo. Nam tempor euismod nisi ac ornare.
  </p>
  {#snippet actions()}
    <Button>Cancel</Button>
    <Button>Agree</Button>
  {/snippet}
</Accordion>
