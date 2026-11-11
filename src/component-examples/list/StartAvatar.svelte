<script lang="ts">
  import { Avatar, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Elif Rahman">
    {#snippet start()}
      <Avatar aria-hidden="true">ER</Avatar>
    {/snippet}
  </ListItem>
  <ListItem description="Product designer" label="Lena Ek">
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
