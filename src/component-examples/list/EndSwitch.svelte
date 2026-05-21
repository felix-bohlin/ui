<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
  import { SwitchInput } from "@opui/svelte"
</script>

<List>
  <ListItem type="switch" for="switch-example-1" text="switch 1">
    {#snippet end()}
      <SwitchInput id="switch-example-1" name="switch-example-group" />
    {/snippet}
  </ListItem>
  <ListItem type="switch" for="switch-example-2" text="switch 2">
    {#snippet end()}
      <SwitchInput id="switch-example-2" name="switch-example-group" />
    {/snippet}
  </ListItem>
</List>
