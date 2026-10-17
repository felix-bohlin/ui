<script lang="ts">
  import { CheckboxInput, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem as="button" headline="Button list item" />
  <ListItem as="a" href="#clickable-list-item" headline="Link list item" />
  <ListItem
    type="checkbox"
    for="clickable-checkbox"
    headline="Checkbox list item"
  >
    {#snippet end()}<CheckboxInput id="clickable-checkbox" />{/snippet}
  </ListItem>
</List>
