<script lang="ts">
  import {
    Checkbox,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-required">
      <Checkbox required>Checkbox 1</Checkbox>
      <Checkbox required>Checkbox 2</Checkbox>
      <Checkbox required>Checkbox 3</Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
