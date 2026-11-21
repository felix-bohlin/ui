<script lang="ts">
  import {
    Button,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset aria-describedby="form-basics-1-description">
    <FieldLegend>Contact</FieldLegend>
    <FieldDescription id="form-basics-1-description"
      >How can we reach you?</FieldDescription
    >
    <FieldGroup>
      <Field for="form-basics-2" label="Name">
        <input autocomplete="name" id="form-basics-2" />
      </Field>
      <Field for="form-basics-3" label="Email">
        <input autocomplete="email" id="form-basics-3" type="email" />
      </Field>
    </FieldGroup>
  </Fieldset>
  <FieldGroup>
    <Button type="submit" variant="filled">Send</Button>
  </FieldGroup>
</Form>
