<script lang="ts">
  import { List, ListItem, SwitchInput } from "opui-css/svelte"
</script>

<List>
  <ListItem type="switch">
    {#snippet text()}Switch 1{/snippet}
    {#snippet end()}<SwitchInput />{/snippet}
  </ListItem>
  <ListItem type="switch">
    {#snippet text()}Switch 2{/snippet}
    {#snippet end()}<SwitchInput />{/snippet}
  </ListItem>
</List>
