<script lang="ts">
  import {
    Checkbox,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup name="checkbox-group-required" orientation="horizontal">
      <Checkbox required>Checkbox 1</Checkbox>
      <Checkbox required>Checkbox 2</Checkbox>
      <Checkbox required>Checkbox 3</Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
