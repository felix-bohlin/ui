<script lang="ts">
  import { Avatar, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Inga Halonen">
    {#snippet start()}
      <Avatar aria-hidden="true">IH</Avatar>
    {/snippet}
  </ListItem>
  <ListItem description="Product designer" label="Lena Handén">
    {#snippet start()}
      <Avatar>
        <img
          src="/photos/lena-handen.png"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </Avatar>
    {/snippet}
  </ListItem>
</List>
