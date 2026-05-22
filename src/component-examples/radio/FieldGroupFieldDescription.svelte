<script lang="ts">
  import { Radio } from "@opui/svelte"
  import { FieldDescription } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"

  const name = "fieldset-field-description-1-astro"
  const name2 = "fieldset-field-description-2-astro"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup direction="row" {name}>
      <Radio {name} checked>Radio 1</Radio>
      <Radio {name}>Radio 2</Radio>
      <Radio {name}>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>

  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name={name2}>
      <Radio name={name2} checked>Radio 1</Radio>
      <Radio name={name2}>Radio 2</Radio>
      <Radio name={name2}>Radio 3</Radio>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </FieldSet>
</Form>
