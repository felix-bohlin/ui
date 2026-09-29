<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
  import { CheckboxInput } from "@opui/svelte"
</script>

<List>
  <ListItem as="button" type="button" headline="Button list item" />
  <ListItem as="a" href="#clickable-list-item" headline="Link list item" />
  <ListItem type="checkbox" for="clickable-checkbox">
    {#snippet text()}
      <div>Checkbox list item</div>
    {/snippet}
    {#snippet end()}
      <CheckboxInput id="clickable-checkbox" name="checkbox" />
    {/snippet}
  </ListItem>
</List>
