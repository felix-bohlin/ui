<script lang="ts">
  import {
    Button,
    CheckboxInput,
    ListItem,
    Menu,
    RadioInput,
  } from "opui-css/svelte"
</script>

<Button
  command="toggle-popover"
  commandfor="menu-checkable-1"
  variant="outlined"
>
  View
</Button>
<Menu id="menu-checkable-1">
  <ListItem type="checkbox">
    {#snippet label()}Show hidden files{/snippet}
    {#snippet end()}
      <CheckboxInput />
    {/snippet}
  </ListItem>
  <ListItem type="checkbox">
    {#snippet label()}Show file extensions{/snippet}
    {#snippet end()}
      <CheckboxInput checked />
    {/snippet}
  </ListItem>
  <li class="ui-border-top ui-heading" id="menu-checkable-1-sort">Sort by</li>
  <ListItem type="radio">
    {#snippet label()}Name{/snippet}
    {#snippet end()}
      <RadioInput
        aria-describedby="menu-checkable-1-sort"
        checked
        name="menu-checkable-1-sort"
        value="name"
      />
    {/snippet}
  </ListItem>
  <ListItem type="radio">
    {#snippet label()}Date modified{/snippet}
    {#snippet end()}
      <RadioInput
        aria-describedby="menu-checkable-1-sort"
        name="menu-checkable-1-sort"
        value="date"
      />
    {/snippet}
  </ListItem>
  <ListItem type="radio">
    {#snippet label()}Size{/snippet}
    {#snippet end()}
      <RadioInput
        aria-describedby="menu-checkable-1-sort"
        name="menu-checkable-1-sort"
        value="size"
      />
    {/snippet}
  </ListItem>
</Menu>
