<script lang="ts">
  import { Button, FieldGroup, Form, TextField } from "opui-css/svelte"
</script>

<Form>
  <FieldGroup orientation="horizontal">
    <TextField label="Discount code" name="discount" />
    <Button variant="outlined">Apply</Button>
  </FieldGroup>
</Form>
