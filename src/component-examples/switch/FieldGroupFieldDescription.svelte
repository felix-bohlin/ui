<script lang="ts">
  import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup direction="row" name="switch-group-field-description-1">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </FieldSet>

  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="switch-group-field-description-2">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </FieldSet>
</Form>
