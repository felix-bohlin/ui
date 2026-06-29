<script lang="ts">
  import { Radio } from "@opui/svelte"
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
    <FieldGroup direction="row" name="fieldset-field-description-1-astro">
      <Radio checked>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>

  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="fieldset-field-description-2-astro">
      <Radio checked>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </FieldSet>
</Form>
