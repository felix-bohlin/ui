<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List dense>
  <ListItem headline="Headline" />
  <ListItem
    headline="Headline"
    description="Supporting text that truly is quite long enough to fill up multiple lines."
  />
  <ListItem headline="Trailing supporting text">
    {#snippet end()}100+{/snippet}
  </ListItem>
</List>
