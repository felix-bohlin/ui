<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem description="Supporting text" label="Headline">
    {#snippet start()}
      <img src="/photos/maya-lind.png" alt="" decoding="async" loading="lazy" />
    {/snippet}
  </ListItem>
  <ListItem description="Supporting text" label="Headline">
    {#snippet start()}
      <img src="/photos/maya-lind.png" alt="" decoding="async" loading="lazy" />
    {/snippet}
  </ListItem>
</List>
