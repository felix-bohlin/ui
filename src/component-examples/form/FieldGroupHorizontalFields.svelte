<script lang="ts">
  import { Button, Field, FieldGroup, Form } from "opui-css/svelte"
</script>

<Form>
  <FieldGroup orientation="horizontal">
    <Field for="form-field-group-horizontal-fields-1" label="Discount code">
      <input id="form-field-group-horizontal-fields-1" name="discount" />
    </Field>
    <Button variant="outlined">Apply</Button>
  </FieldGroup>
</Form>
