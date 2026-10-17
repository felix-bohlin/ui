<script lang="ts">
  import { List, ListItem, RadioInput } from "opui-css/svelte"
</script>

<List>
  <ListItem type="radio" for="radio-example-1">
    {#snippet text()}Radio 1{/snippet}
    {#snippet end()}<RadioInput
        id="radio-example-1"
        name="radio-example-group"
        value="1"
      />{/snippet}
  </ListItem>
  <ListItem type="radio" for="radio-example-2">
    {#snippet text()}Radio 2{/snippet}
    {#snippet end()}<RadioInput
        id="radio-example-2"
        name="radio-example-group"
        value="2"
      />{/snippet}
  </ListItem>
</List>
