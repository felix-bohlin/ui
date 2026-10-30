<script lang="ts">
  import { CheckboxInput, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem as="button" label="Button list item" />
  <ListItem as="button" disabled label="Archived" />
  <ListItem href="#clickable-list-item" label="Link list item" />
  <ListItem label="Checkbox list item" type="checkbox">
    {#snippet end()}<CheckboxInput />{/snippet}
  </ListItem>
</List>
