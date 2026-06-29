<script lang="ts">
  import { Form } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { Checkbox } from "@opui/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Options</FieldLegend>
    <FieldGroup direction="row">
      <Checkbox>Option 1</Checkbox>
      <Checkbox>Option 2</Checkbox>
      <Checkbox>Option 3</Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
