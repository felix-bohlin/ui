<script lang="ts">
  import { Switch } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"
</script>

<Form>
  <FieldSet data-invalid>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="switch-group-validation-astro">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
    <span class="end-text">Something went wrong!</span>
  </FieldSet>
</Form>
