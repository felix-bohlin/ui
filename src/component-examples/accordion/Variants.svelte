<script lang="ts">
  import { Accordion } from "opui-css/svelte"
</script>

<Accordion>
  {#snippet summary()}Text{/snippet}
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>

<Accordion variant="elevated">
  {#snippet summary()}Elevated{/snippet}
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>

<Accordion variant="outlined">
  {#snippet summary()}Outlined{/snippet}
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>

<Accordion variant="tonal">
  {#snippet summary()}Tonal{/snippet}
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
    nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
    neque ante id justo.
  </p>
</Accordion>
