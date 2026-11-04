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
  <Fieldset disabled>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="radio-group-disabled" orientation="horizontal">
      <Radio checked value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>One by one</FieldLegend>
    <FieldGroup name="radio-group-disabled-single" orientation="horizontal">
      <Radio checked value="1">Enabled</Radio>
      <Radio disabled value="2">Disabled</Radio>
      <Radio aria-disabled="true" value="3">Aria-disabled</Radio>
    </FieldGroup>
  </Fieldset>
</Form>
