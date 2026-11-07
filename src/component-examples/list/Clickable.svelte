<script lang="ts">
  import { CheckboxInput, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem as="button" disabled label="Empty trash" />
  <ListItem as="button" label="New folder" />
  <ListItem href="#clickable-list-item" label="Recent files" />
  <ListItem disabled href="#clickable-list-item" label="Shared drives" />
  <ListItem label="Show hidden files" type="checkbox">
    {#snippet end()}
      <CheckboxInput />
    {/snippet}
  </ListItem>
</List>
