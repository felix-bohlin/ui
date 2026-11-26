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
    <FieldLegend>Billing cycle</FieldLegend>
    <FieldGroup name="radio-group-disabled" orientation="horizontal">
      <Radio defaultChecked value="monthly">Monthly</Radio>
      <Radio value="quarterly">Quarterly</Radio>
      <Radio value="yearly">Yearly</Radio>
    </FieldGroup>
  </Fieldset>
  <Fieldset>
    <FieldLegend>Delivery</FieldLegend>
    <FieldGroup name="radio-group-disabled-single" orientation="horizontal">
      <Radio defaultChecked value="standard">Standard</Radio>
      <Radio disabled value="same-day">Same day</Radio>
    </FieldGroup>
  </Fieldset>
</Form>
