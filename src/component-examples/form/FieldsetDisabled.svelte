<script lang="ts">
  import {
    Checkbox,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
  } from "opui-css/svelte"
</script>

<Fieldset aria-describedby="form-fieldset-disabled-1-description" disabled>
  <FieldLegend>Security alerts</FieldLegend>
  <FieldDescription id="form-fieldset-disabled-1-description"
    >Your administrator manages these settings.</FieldDescription
  >
  <FieldGroup>
    <Checkbox defaultChecked name="alerts" value="email">Email</Checkbox>
    <Checkbox defaultChecked name="alerts" value="sms">SMS</Checkbox>
  </FieldGroup>
</Fieldset>
