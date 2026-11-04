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
  <Fieldset aria-describedby="checkbox-field-group-validation-1-error">
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="checkbox-group-validation" orientation="horizontal">
      <Checkbox checked error>Checkbox 1</Checkbox>
      <Checkbox error>Checkbox 2</Checkbox>
      <Checkbox error>Checkbox 3</Checkbox>
    </FieldGroup>
    <span class="ui-end-text" id="checkbox-field-group-validation-1-error"
      >Pick at least two to continue.</span
    >
  </Fieldset>
</Form>
