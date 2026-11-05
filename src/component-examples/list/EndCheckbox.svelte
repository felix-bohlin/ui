<script lang="ts">
  import { CheckboxInput, List, ListItem } from "opui-css/svelte"
</script>

<List>
  <ListItem type="checkbox">
    {#snippet label()}Email notifications{/snippet}
    {#snippet end()}
      <CheckboxInput />
    {/snippet}
  </ListItem>
  <ListItem type="checkbox">
    {#snippet label()}Push notifications{/snippet}
    {#snippet end()}
      <CheckboxInput />
    {/snippet}
  </ListItem>
</List>
