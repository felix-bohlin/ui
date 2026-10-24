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
    <Checkbox value="horse-tinder" checked>Horse Tinder</Checkbox>
    <Checkbox value="onlyhorsefans" checked>OnlyHorseFans</Checkbox>
  </FieldGroup>
</Fieldset>
