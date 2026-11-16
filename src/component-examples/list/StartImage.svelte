<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem description="48 photos" label="Gig in a basement">
    {#snippet start()}
      <img
        src="/photos/lou-headstock.png"
        alt=""
        decoding="async"
        loading="lazy"
      />
    {/snippet}
  </ListItem>
  <ListItem description="112 photos" label="Pedalboard glamour shots">
    {#snippet start()}
      <img
        src="/photos/lou-headstock.png"
        alt=""
        decoding="async"
        loading="lazy"
      />
    {/snippet}
  </ListItem>
</List>
