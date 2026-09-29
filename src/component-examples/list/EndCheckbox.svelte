<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
  import { CheckboxInput } from "@opui/svelte"
</script>

<List>
  <ListItem type="checkbox" for="checkbox-example-1">
    {#snippet text()}
      <div>Checkbox 1</div>
    {/snippet}
    {#snippet end()}
      <CheckboxInput id="checkbox-example-1" />
    {/snippet}
  </ListItem>
  <ListItem type="checkbox" for="checkbox-example-2">
    {#snippet text()}
      <div>Checkbox 2</div>
    {/snippet}
    {#snippet end()}
      <CheckboxInput id="checkbox-example-2" />
    {/snippet}
  </ListItem>
</List>
