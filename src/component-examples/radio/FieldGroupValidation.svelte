<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Radio,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset aria-describedby="radio-field-group-validation-1-error">
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="radio-group-validation" orientation="horizontal">
      <Radio checked error value="1">Radio 1</Radio>
      <Radio error value="2">Radio 2</Radio>
      <Radio error value="3">Radio 3</Radio>
    </FieldGroup>
    <span class="ui-end-text" id="radio-field-group-validation-1-error"
      >Radio 1 is sold out, pick another.</span
    >
  </Fieldset>
</Form>
