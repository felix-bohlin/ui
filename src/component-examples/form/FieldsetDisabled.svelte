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
    <Checkbox checked value="email">Email</Checkbox>
    <Checkbox checked value="sms">SMS</Checkbox>
  </FieldGroup>
</Fieldset>
