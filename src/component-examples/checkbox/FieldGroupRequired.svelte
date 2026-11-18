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
    <FieldLegend>Agreements</FieldLegend>
    <FieldGroup name="checkbox-group-required" orientation="horizontal">
      <Checkbox required>Terms of service</Checkbox>
      <Checkbox required>Privacy policy</Checkbox>
      <Checkbox required>Data processing</Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
