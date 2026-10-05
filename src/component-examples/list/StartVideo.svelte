<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem headline="Headline" description="Supporting text">
    {#snippet start()}<video controls muted>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        /></video
      >{/snippet}
    {#snippet end()}13:37{/snippet}
  </ListItem>
  <ListItem headline="Headline" description="Supporting text">
    {#snippet start()}<video controls muted>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        /></video
      >{/snippet}
    {#snippet end()}90s{/snippet}
  </ListItem>
</List>
