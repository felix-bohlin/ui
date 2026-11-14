<script lang="ts">
  import { Avatar, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Ines Hertz">
    {#snippet start()}
      <Avatar aria-hidden="true">IH</Avatar>
    {/snippet}
  </ListItem>
  <ListItem description="Fretless enthusiast" label="Lou Headstock">
    {#snippet start()}
      <Avatar>
        <img
          src="/photos/lou-headstock.png"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </Avatar>
    {/snippet}
  </ListItem>
</List>
