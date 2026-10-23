<script lang="ts">
  import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Radio,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup orientation="horizontal" name="radio-group-field-description-1">
      <Radio value="1" checked>Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </FieldGroup>
  </Fieldset>

  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup orientation="horizontal" name="radio-group-field-description-2">
      <Radio value="1" checked>Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </Fieldset>
</Form>
