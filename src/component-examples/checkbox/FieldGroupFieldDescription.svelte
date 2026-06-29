<script lang="ts">
  import { Checkbox } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldDescription } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup direction="row" name="checkbox-group-field-description-1-astro">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
  </FieldSet>

  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-field-description-2-astro">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </FieldSet>
</Form>
-->
