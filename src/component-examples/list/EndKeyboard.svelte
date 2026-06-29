<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
</script>

<List>
  <ListItem headline="Save all">
    {#snippet end()}
      <kbd>CTRL+ALT+DEL</kbd>
    {/snippet}
  </ListItem>
  <ListItem headline="Save">
    {#snippet end()}
      <kbd>CTRL+S</kbd>
    {/snippet}
  </ListItem>
</List>
