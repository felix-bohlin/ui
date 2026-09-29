<script lang="ts">
  import { Radio } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="fieldset-1-astro">
      <Radio checked>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
