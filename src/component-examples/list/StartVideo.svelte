<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
</script>

<List>
  <ListItem headline="Headline" description="Supporting text">
    {#snippet end()}
      <div>13:37</div>
    {/snippet}
    {#snippet start()}
      <video controls muted>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    {/snippet}
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    {#snippet end()}
      <div>90s</div>
    {/snippet}
    {#snippet start()}
      <video controls muted>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    {/snippet}
  </ListItem>
</List>
