<script lang="ts">
  import { Switch } from "@opui/svelte"
  import { FieldDescription } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup direction="row" name="switch-group-field-description-1-astro">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </FieldSet>

  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="switch-group-field-description-2-astro">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </FieldSet>
</Form>
