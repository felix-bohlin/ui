<script lang="ts">
  import { Avatar, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Mohini Hertz">
    {#snippet start()}
      <Avatar>MH</Avatar>
    {/snippet}
  </ListItem>
  <ListItem description="Fretless enthusiast" label="Kinga Headstock">
    {#snippet start()}
      <Avatar src="/photos/kinga-headstock.png" />
    {/snippet}
  </ListItem>
</List>
