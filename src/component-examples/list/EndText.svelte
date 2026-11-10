<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Q3 report.pdf">
    {#snippet end()}2.4 MB{/snippet}
  </ListItem>
  <ListItem description="Uploaded by Lena Ek" label="Team photo.jpg">
    {#snippet end()}860 kB{/snippet}
  </ListItem>
  <ListItem
    description="Logo, colors and type in print and on the web, with an example of each in use."
    label="Brand guidelines.pdf"
  >
    {#snippet end()}12 MB{/snippet}
  </ListItem>
</List>
