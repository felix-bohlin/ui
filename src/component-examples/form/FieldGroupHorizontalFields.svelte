<script lang="ts">
  import { Button, FieldGroup, Form, TextField } from "opui-css/svelte"
</script>

<Form>
  <FieldGroup orientation="horizontal">
    <TextField for="form-field-group-horizontal-fields-1" label="Discount code">
      <input id="form-field-group-horizontal-fields-1" name="discount" />
    </TextField>
    <Button variant="outlined">Apply</Button>
  </FieldGroup>
</Form>
