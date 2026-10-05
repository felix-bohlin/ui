<script lang="ts">
  import { CheckboxInput, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem type="checkbox" for="checkbox-example-1">
    {#snippet text()}Checkbox 1{/snippet}
    {#snippet end()}<CheckboxInput id="checkbox-example-1" />{/snippet}
  </ListItem>
  <ListItem type="checkbox" for="checkbox-example-2">
    {#snippet text()}Checkbox 2{/snippet}
    {#snippet end()}<CheckboxInput id="checkbox-example-2" />{/snippet}
  </ListItem>
</List>
