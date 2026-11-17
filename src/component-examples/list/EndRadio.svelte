<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    List,
    ListItem,
    RadioInput,
  } from "opui-css/svelte"
</script>

<Fieldset>
  <FieldLegend>Theme</FieldLegend>
  <FieldGroup>
    <List>
      <ListItem choice="radio">
        {#snippet label()}Dark mode{/snippet}
        {#snippet end()}
          <RadioInput name="theme" value="dark" />
        {/snippet}
      </ListItem>
      <ListItem choice="radio">
        {#snippet label()}Light mode{/snippet}
        {#snippet end()}
          <RadioInput name="theme" value="light" />
        {/snippet}
      </ListItem>
    </List>
  </FieldGroup>
</Fieldset>
