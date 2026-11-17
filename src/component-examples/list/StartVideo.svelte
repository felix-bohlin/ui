<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem description="Uploaded by Lou Headstock" label="Slap tutorial">
    {#snippet start()}
      <video controls muted>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    {/snippet}
    {#snippet end()}1:30{/snippet}
  </ListItem>
  <ListItem description="Uploaded by Percy Groove" label="Drop D in 45 seconds">
    {#snippet start()}
      <video controls muted>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    {/snippet}
    {#snippet end()}0:45{/snippet}
  </ListItem>
</List>
