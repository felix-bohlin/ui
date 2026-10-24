<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Headline" />
  <ListItem
    label="Headline"
    description="Supporting text that truly is quite long enough to fill up multiple lines."
  />
  <ListItem label="Trailing supporting text">
    {#snippet end()}100+{/snippet}
  </ListItem>
</List>
