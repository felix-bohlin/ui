<script lang="ts">
  import { List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem label="Gig poster.pdf" />
  <ListItem
    description="Our logo in every color, with the bass drawn way bigger than the drum kit, at last."
    label="Band logo pack.pdf"
  />
  <ListItem label="Photos">
    {#snippet end()}100+{/snippet}
  </ListItem>
</List>
