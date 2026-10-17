<script lang="ts">
  import { List, ListItem, SwitchInput } from "opui-css/svelte"
</script>

<List>
  <ListItem type="switch" for="switch-example-1">
    {#snippet text()}Switch 1{/snippet}
    {#snippet end()}<SwitchInput id="switch-example-1" />{/snippet}
  </ListItem>
  <ListItem type="switch" for="switch-example-2">
    {#snippet text()}Switch 2{/snippet}
    {#snippet end()}<SwitchInput id="switch-example-2" />{/snippet}
  </ListItem>
</List>
