<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
</script>

<List>
  <ListItem headline="Save all">
    {#snippet end()}
      <div><kbd>CTRL+ALT+DEL</kbd></div>
    {/snippet}
  </ListItem>
  <ListItem headline="Save">
    {#snippet end()}
      <div><kbd>CTRL+S</kbd></div>
    {/snippet}
  </ListItem>
</List>
