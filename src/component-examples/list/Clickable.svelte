<script lang="ts">
  import { CheckboxInput, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem as="button" headline="Button list item" />
  <ListItem as="button" disabled headline="Archived" />
  <ListItem as="a" href="#clickable-list-item" headline="Link list item" />
  <ListItem type="checkbox" headline="Checkbox list item">
    {#snippet end()}<CheckboxInput />{/snippet}
  </ListItem>
</List>
