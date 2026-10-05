<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem headline="Headline">
    {#snippet end()}30kB{/snippet}
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    {#snippet end()}99%{/snippet}
  </ListItem>
  <ListItem
    headline="Headline"
    description="Supporting text that truly is quite long enough to fill up multiple lines."
  >
    {#snippet end()}100+{/snippet}
  </ListItem>
</List>
