<script lang="ts">
  import { FieldDescription } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"
  import { Form } from "@opui/svelte"
</script>

<Form as="div">
  <FieldSet as="div">
    <FieldLegend as="p">Using as prop</FieldLegend>
    <FieldDescription>Renders as div and p elements.</FieldDescription>
  </FieldSet>
</Form>
