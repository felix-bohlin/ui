<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    FieldSet,
    Form,
    Radio,
  } from "opui-css/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup direction="row" name="radio-group-required">
      <Radio value="1" required>Radio 1</Radio>
      <Radio value="2" required>Radio 2</Radio>
      <Radio value="3" required>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
