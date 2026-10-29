<script lang="ts">
  import { List, ListItem, RadioInput } from "opui-css/svelte"
</script>

<List>
  <ListItem type="radio">
    {#snippet label()}Radio 1{/snippet}
    {#snippet end()}<RadioInput
        name="radio-example-group"
        value="1"
      />{/snippet}
  </ListItem>
  <ListItem type="radio">
    {#snippet label()}Radio 2{/snippet}
    {#snippet end()}<RadioInput
        name="radio-example-group"
        value="2"
      />{/snippet}
  </ListItem>
</List>
