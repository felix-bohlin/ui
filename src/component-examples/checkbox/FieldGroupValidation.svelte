<script lang="ts">
  import {
    Checkbox,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-validation">
      <Checkbox checked error>Checkbox 1</Checkbox>
      <Checkbox error>Checkbox 2</Checkbox>
      <Checkbox error>Checkbox 3</Checkbox>
    </FieldGroup>
    <span class="ui-end-text">Something went wrong!</span>
  </FieldSet>
</Form>
