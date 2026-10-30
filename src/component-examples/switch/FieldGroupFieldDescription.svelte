<script lang="ts">
  import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup
      name="switch-group-field-description-1"
      orientation="horizontal"
    >
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </Fieldset>

  <Fieldset>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup
      name="switch-group-field-description-2"
      orientation="horizontal"
    >
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </Fieldset>
</Form>
