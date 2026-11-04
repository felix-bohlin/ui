<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Headline">
    {#snippet end()}30kB{/snippet}
  </ListItem>
  <ListItem description="Supporting text" label="Headline">
    {#snippet end()}99%{/snippet}
  </ListItem>
  <ListItem
    description="Supporting text that truly is quite long enough to fill up multiple lines."
    label="Headline"
  >
    {#snippet end()}100+{/snippet}
  </ListItem>
</List>
