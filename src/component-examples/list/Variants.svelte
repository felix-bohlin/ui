<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
</script>

<div class="column" style="gap: var(--size-4);">
  <List>
    <ListItem headline="Filled (default)" />
    <ListItem headline="Second item" />
  </List>

  <List variant="default">
    <ListItem headline="Default" />
    <ListItem headline="Second item" />
  </List>

  <List variant="tonal">
    <ListItem headline="Tonal" />
    <ListItem headline="Second item" />
  </List>

  <List variant="transparent">
    <ListItem headline="Transparent" />
    <ListItem headline="Second item" />
  </List>
</div>
