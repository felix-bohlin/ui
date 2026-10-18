<script lang="ts">
  import { CheckboxInput, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem type="checkbox">
    {#snippet text()}Checkbox 1{/snippet}
    {#snippet end()}<CheckboxInput />{/snippet}
  </ListItem>
  <ListItem type="checkbox">
    {#snippet text()}Checkbox 2{/snippet}
    {#snippet end()}<CheckboxInput />{/snippet}
  </ListItem>
</List>
