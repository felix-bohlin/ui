<script lang="ts">
  import {
    Checkbox,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset
    aria-describedby="checkbox-field-group-field-description-1-description"
  >
    <FieldLegend>Notifications</FieldLegend>
    <FieldDescription id="checkbox-field-group-field-description-1-description"
      >How we tell you a bandmate finally replied.</FieldDescription
    >
    <FieldGroup
      name="checkbox-group-field-description-1"
      orientation="horizontal"
    >
      <Checkbox defaultChecked>Email</Checkbox>
      <Checkbox>Push</Checkbox>
      <Checkbox>SMS</Checkbox>
    </FieldGroup>
  </Fieldset>
  <Fieldset
    aria-describedby="checkbox-field-group-field-description-2-description"
  >
    <FieldLegend>Newsletter topics</FieldLegend>
    <FieldGroup
      name="checkbox-group-field-description-2"
      orientation="horizontal"
    >
      <Checkbox defaultChecked>Bassbook news</Checkbox>
      <Checkbox>Events</Checkbox>
      <Checkbox>Gear deals</Checkbox>
    </FieldGroup>
    <FieldDescription id="checkbox-field-group-field-description-2-description"
      >Change these at any time in your account.</FieldDescription
    >
  </Fieldset>
</Form>
