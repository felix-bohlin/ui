<script lang="ts">
  import {
    FieldDescription,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form as="div">
  <Fieldset aria-describedby="form-adaptive-output-1-description" as="div">
    <FieldLegend as="p">Delivery</FieldLegend>
    <FieldDescription id="form-adaptive-output-1-description"
      >Choose how your order gets to you.</FieldDescription
    >
  </Fieldset>
</Form>
