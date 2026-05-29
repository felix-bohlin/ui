<script lang="ts">
  import { Checkbox } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-required-astro">
      <Checkbox required>Checkbox 1</Checkbox>
      <Checkbox required>Checkbox 2</Checkbox>
      <Checkbox required>Checkbox 3</Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
-->
