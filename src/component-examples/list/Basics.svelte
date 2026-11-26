<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Headline" />
  <ListItem
    description="Supporting text that truly is quite long enough to fill up multiple lines."
    label="Headline"
  />
  <ListItem label="Trailing supporting text">
    {#snippet end()}100+{/snippet}
  </ListItem>
</List>
