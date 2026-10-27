<script lang="ts">
  import { Button, ColorField, FieldGroup, Form } from "opui-css/svelte"
</script>

<Form>
  <ColorField
    id="color-field-form-value-1"
    label="Brand color"
    name="brand"
    value="oklch(0.6 0.15 250)"
  />
  <FieldGroup>
    <Button type="reset">Reset</Button>
  </FieldGroup>
</Form>
