<script lang="ts">
  import { List, ListItem, RadioInput } from "opui-css/svelte"
</script>

<List>
  <ListItem type="radio">
    {#snippet label()}Dark mode{/snippet}
    {#snippet end()}
      <RadioInput name="theme" value="dark" />
    {/snippet}
  </ListItem>
  <ListItem type="radio">
    {#snippet label()}Light mode{/snippet}
    {#snippet end()}
      <RadioInput name="theme" value="light" />
    {/snippet}
  </ListItem>
</List>
