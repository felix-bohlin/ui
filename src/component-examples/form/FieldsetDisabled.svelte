<script lang="ts">
  import {
    Checkbox,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
  } from "opui-css/svelte"
</script>

<Fieldset disabled>
  <FieldLegend>Pet dating</FieldLegend>
  <FieldDescription>You can't change these settings</FieldDescription>
  <FieldGroup name="notifications">
    <Checkbox checked value="horse-tinder">Horse Tinder</Checkbox>
    <Checkbox checked value="onlyhorsefans">OnlyHorseFans</Checkbox>
  </FieldGroup>
</Fieldset>
