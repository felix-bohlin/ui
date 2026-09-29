<script lang="ts">
  import { Switch } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup direction="row" name="switch-group-required-astro">
      <Switch required>Switch 1</Switch>
      <Switch required>Switch 2</Switch>
      <Switch required>Switch 3</Switch>
    </FieldGroup>
  </FieldSet>
</Form>
