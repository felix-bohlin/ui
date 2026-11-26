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
    <FieldLegend>Interests</FieldLegend>
    <FieldGroup name="checkbox-group-validation" orientation="horizontal">
      <Checkbox defaultChecked error>Design</Checkbox>
      <Checkbox error>Engineering</Checkbox>
      <Checkbox error>Marketing</Checkbox>
    </FieldGroup>
    <span class="ui-end-text" id="checkbox-field-group-validation-1-error"
      >Pick at least two to continue.</span
    >
  </Fieldset>
</Form>
