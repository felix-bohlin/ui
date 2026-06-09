<script lang="ts">
  import { List } from "@opui/svelte"
  import { ListItem } from "@opui/svelte"
  import { RadioInput } from "@opui/svelte"
</script>

<List>
  <ListItem type="radio" for="radio-example-1" text="Radio 1">
    {#snippet end()}
      <RadioInput id="radio-example-1" name="radio-example-group" />
    {/snippet}
  </ListItem>
  <ListItem type="radio" for="radio-example-2" text="Radio 2">
    {#snippet end()}
      <RadioInput id="radio-example-2" name="radio-example-group" />
    {/snippet}
  </ListItem>
</List>
