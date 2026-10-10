<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    FieldSet,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form as="div">
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="switch-group">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </FieldSet>
</Form>
