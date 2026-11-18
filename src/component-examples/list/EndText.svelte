<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Slap lesson 3.pdf">
    {#snippet end()}2.4 MB{/snippet}
  </ListItem>
  <ListItem description="Uploaded by Lou Headstock" label="Band photo.jpg">
    {#snippet end()}860 kB{/snippet}
  </ListItem>
  <ListItem
    description="Every root note of the setlist, with a tiny drawing of where the drummer should look when it changes."
    label="Bass charts.pdf"
  >
    {#snippet end()}12 MB{/snippet}
  </ListItem>
</List>
