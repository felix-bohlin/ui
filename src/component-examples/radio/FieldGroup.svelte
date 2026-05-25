<script lang="ts">
  import { Radio } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Form } from "@opui/svelte"

  const name = "fieldset-1-astro"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup {name}>
      <Radio {name} checked>Radio 1</Radio>
      <Radio {name}>Radio 2</Radio>
      <Radio {name}>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
