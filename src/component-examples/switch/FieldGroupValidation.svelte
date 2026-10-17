<script lang="ts">
  import {
    FieldGroup,
    FieldLegend,
    FieldSet,
    Form,
    Switch,
  } from "opui-css/svelte"
</script>

<Form>
  <FieldSet aria-describedby="switch-group-error">
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="switch-field-group-validation">
      <Switch error>Switch 1</Switch>
      <Switch error>Switch 2</Switch>
      <Switch error>Switch 3</Switch>
    </FieldGroup>
    <span class="ui-end-text" id="switch-group-error"
      >Something went wrong!</span
    >
  </FieldSet>
</Form>
