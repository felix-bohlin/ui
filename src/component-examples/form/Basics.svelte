<script lang="ts">
  import {
    Button,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    TextField,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset aria-describedby="form-basics-1-description">
    <FieldLegend>Contact</FieldLegend>
    <FieldDescription id="form-basics-1-description"
      >How can we reach you?</FieldDescription
    >
    <FieldGroup>
      <TextField autocomplete="name" label="Name" />
      <TextField autocomplete="email" label="Email" type="email" />
    </FieldGroup>
  </Fieldset>
  <FieldGroup>
    <Button type="submit" variant="filled">Send</Button>
  </FieldGroup>
</Form>
