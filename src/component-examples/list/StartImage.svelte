<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem description="48 photos" label="Summer in Lisbon">
    {#snippet start()}
      <img
        src="/photos/lena-handen.png"
        alt=""
        decoding="async"
        loading="lazy"
      />
    {/snippet}
  </ListItem>
  <ListItem description="112 photos" label="Team offsite">
    {#snippet start()}
      <img
        src="/photos/lena-handen.png"
        alt=""
        decoding="async"
        loading="lazy"
      />
    {/snippet}
  </ListItem>
</List>
