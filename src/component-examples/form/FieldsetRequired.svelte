<script lang="ts">
  import {
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Textarea,
    TextField,
  } from "opui-css/svelte"
</script>

<Fieldset aria-describedby="form-fieldset-required-1-description">
  <FieldLegend>Delivery</FieldLegend>
  <FieldDescription id="form-fieldset-required-1-description"
    >Where should we send your order?</FieldDescription
  >
  <FieldGroup>
    <TextField for="form-fieldset-required-2" label="Recipient">
      <input id="form-fieldset-required-2" name="recipient" />
    </TextField>
    <Textarea label="Address" name="address" required />
  </FieldGroup>
</Fieldset>
