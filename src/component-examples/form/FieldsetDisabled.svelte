<script lang="ts">
  import {
    Checkbox,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
  } from "opui-css/svelte"
</script>

<Fieldset disabled>
  <FieldLegend>Security alerts</FieldLegend>
  <FieldDescription>Your administrator manages these settings.</FieldDescription
  >
  <FieldGroup name="alerts">
    <Checkbox defaultChecked value="email">Email</Checkbox>
    <Checkbox defaultChecked value="sms">SMS</Checkbox>
  </FieldGroup>
</Fieldset>
