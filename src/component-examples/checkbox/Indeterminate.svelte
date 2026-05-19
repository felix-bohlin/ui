<script lang="ts">
  import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "@opui/svelte"
  // TODO: Indeterminate demo script
</script>

<FieldSet class="indeterminate-demo">
  <FieldLegend>
    <Checkbox class="parent">Select all</Checkbox>
  </FieldLegend>
  <FieldGroup name="indeterminate-children-astro">
    <Checkbox class="child" checked>Apples</Checkbox>
    <Checkbox class="child">Bananas</Checkbox>
    <Checkbox class="child">Cherries</Checkbox>
  </FieldGroup>
</FieldSet>
