<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List aria-label="Top readers this month" as="ol" bordered>
  <ListItem description="42 books" label="Ines Moreau">
    {#snippet start()}
      <span>1</span>
    {/snippet}
  </ListItem>
  <ListItem description="37 books" label="Tomás Ekberg">
    {#snippet start()}
      <span>2</span>
    {/snippet}
  </ListItem>
  <ListItem description="31 books" label="Priya Natarajan">
    {#snippet start()}
      <span>3</span>
    {/snippet}
  </ListItem>
</List>
