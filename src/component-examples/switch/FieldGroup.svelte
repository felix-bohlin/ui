<script lang="ts">
  import { Switch } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"
</script>

<Form as="div">
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="switch-group-astro">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </FieldSet>
</Form>
