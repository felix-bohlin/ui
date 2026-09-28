<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
  import { SwitchInput } from "@opui/svelte"
</script>

<List>
  <ListItem type="switch" for="switch-example-1" text="Switch 1">
    {#snippet end()}
      <SwitchInput id="switch-example-1" />
    {/snippet}
  </ListItem>
  <ListItem type="switch" for="switch-example-2" text="Switch 2">
    {#snippet end()}
      <SwitchInput id="switch-example-2" />
    {/snippet}
  </ListItem>
</List>
