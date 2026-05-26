<script lang="ts">
  import { Radio } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"

  const name = "fieldset-disabled-1-astro"
</script>

<Form>
  <FieldSet disabled>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" {name}>
      <Radio {name} checked>Radio 1</Radio>
      <Radio {name}>Radio 2</Radio>
      <Radio {name}>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
