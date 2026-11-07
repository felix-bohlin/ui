<script lang="ts">
  import {
    Checkbox,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Toppings</FieldLegend>
    <FieldGroup name="checkbox-group-orientation" orientation="horizontal">
      <Checkbox checked>Cheese</Checkbox>
      <Checkbox>Mushrooms</Checkbox>
      <Checkbox>Olives</Checkbox>
    </FieldGroup>
  </Fieldset>
</Form>
