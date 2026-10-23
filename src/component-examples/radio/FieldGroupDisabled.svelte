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
    <FieldGroup orientation="horizontal" name="radio-group-disabled">
      <Radio value="1" checked>Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </FieldGroup>
  </Fieldset>
</Form>
