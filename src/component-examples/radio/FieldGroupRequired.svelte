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
  <Fieldset>
    <FieldLegend>Account type</FieldLegend>
    <FieldGroup orientation="horizontal">
      <Radio name="radio-group-required" required value="bassist">Bassist</Radio
      >
      <Radio name="radio-group-required" required value="band">Band</Radio>
      <Radio name="radio-group-required" required value="shop">Bass shop</Radio>
    </FieldGroup>
  </Fieldset>
</Form>
