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
    <FieldLegend>Notifications</FieldLegend>
    <FieldGroup name="checkbox-group">
      <Checkbox defaultChecked>Email</Checkbox>
      <Checkbox>Push</Checkbox>
      <Checkbox>SMS</Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
