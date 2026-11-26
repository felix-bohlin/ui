<script lang="ts">
  import { List, ListItem, SwitchInput } from "opui-css/svelte"
</script>

<List>
  <ListItem type="switch">
    {#snippet label()}Bluetooth{/snippet}
    {#snippet end()}
      <SwitchInput />
    {/snippet}
  </ListItem>
  <ListItem type="switch">
    {#snippet label()}Wi-Fi{/snippet}
    {#snippet end()}
      <SwitchInput />
    {/snippet}
  </ListItem>
</List>
