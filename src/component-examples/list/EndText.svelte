<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
</script>

<List>
  <ListItem headline="Headline">
    {#snippet end()}
      <div>30kB</div>
    {/snippet}
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    {#snippet end()}
      <div>99%</div>
    {/snippet}
  </ListItem>
  <ListItem
    headline="Headline"
    description="Supporting text that truly is quite long enough to fill up multiple lines."
  >
    {#snippet end()}
      <div>100+</div>
    {/snippet}
  </ListItem>
</List>
