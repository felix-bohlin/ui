<script lang="ts">
  import { CheckboxInput, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem type="checkbox">
    {#snippet label()}Checkbox 1{/snippet}
    {#snippet end()}<CheckboxInput />{/snippet}
  </ListItem>
  <ListItem type="checkbox">
    {#snippet label()}Checkbox 2{/snippet}
    {#snippet end()}<CheckboxInput />{/snippet}
  </ListItem>
</List>
