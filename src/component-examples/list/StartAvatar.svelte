<script lang="ts">
  import { Avatar, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Ines Hertz">
    {#snippet start()}
      <Avatar>IH</Avatar>
    {/snippet}
  </ListItem>
  <ListItem description="Fretless enthusiast" label="Lou Headstock">
    {#snippet start()}
      <Avatar src="/photos/lou-headstock.png" />
    {/snippet}
  </ListItem>
</List>
