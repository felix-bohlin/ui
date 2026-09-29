<script lang="ts">
  import { Accordion } from "@opui/svelte"
  import { Button } from "@opui/svelte"
</script>

<Accordion open class="anatomy" summary="Accordion title">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
    sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti.
    Cras ut ante in libero tempus sodales sed quis dolor.
  </p>
  {#snippet actions()}
    <Button>Cancel</Button>
    <Button>Agree</Button>
  {/snippet}
</Accordion>
