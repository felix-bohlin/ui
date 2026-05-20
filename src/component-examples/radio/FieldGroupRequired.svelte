<script lang="ts">
  import { Radio } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"

  const name = "fieldset-required-1-astro"
</script>

<Form>
  <FieldSet>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup direction="row" {name}>
      <Radio {name} required>Radio 1</Radio>
      <Radio {name} required>Radio 2</Radio>
      <Radio {name} required>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
