<script lang="ts">
  import { Avatar, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Headline">
    {#snippet start()}
      <Avatar aria-hidden="true">AB</Avatar>
    {/snippet}
  </ListItem>
  <ListItem description="Supporting text" label="Headline">
    {#snippet start()}
      <Avatar>
        <img
          src="/photos/maya-lind.png"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </Avatar>
    {/snippet}
  </ListItem>
</List>
