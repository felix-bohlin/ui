<script lang="ts">
  import {
    Checkbox,
    CheckboxInput,
    CheckboxLabel,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup direction="row" name="checkbox-group-field-description-1">
      <Checkbox>
        <CheckboxInput checked />
        <CheckboxLabel>Checkbox 1</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput />
        <CheckboxLabel>Checkbox 2</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput />
        <CheckboxLabel>Checkbox 3</CheckboxLabel>
      </Checkbox>
    </FieldGroup>
  </FieldSet>

  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-field-description-2">
      <Checkbox>
        <CheckboxInput checked />
        <CheckboxLabel>Checkbox 1</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput />
        <CheckboxLabel>Checkbox 2</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput />
        <CheckboxLabel>Checkbox 3</CheckboxLabel>
      </Checkbox>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </FieldSet>
</Form>
